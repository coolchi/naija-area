import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, HOUR, DAY } from './helpers.js';
import { checkInvariants } from '../server/core/ledger.js';
import { tickCalls, tickVoice } from '../server/core/phone/phone.js';

const uname = (s, id) => s.app.db.prepare('SELECT username FROM users WHERE id=?').get(id).username;
const online = async (s, ...us) => { for (const u of us) { at(s, u, 10 + u, 10); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); } };
const mkPair = async (consent = true) => { const s = makeServer(); const a = mkUser(s), b = mkUser(s); s.pushes = []; const orig = s.app.pushUser; s.app.pushUser = (uid, m) => { s.pushes.push([uid, m]); orig?.(uid, m); };
  const r = await ok(s, 'POST', '/api/phone/friends/request', { uid: a, body: { username: uname(s, b) } }); assert.equal(r.status, 'pending'); const inc = (await ok(s, 'GET', '/api/phone/friends', { uid: b })).incoming[0]; await ok(s, 'POST', '/api/phone/friends/respond', { uid: b, body: { id: inc.id, accept: true } });
  if (consent) for (const u of [a, b]) await ok(s, 'POST', '/api/phone/settings', { uid: u, body: { voiceConsent: true } }); await online(s, a, b); return { s, a, b, an: uname(s, a), bn: uname(s, b) }; };
const wav = (n = 3000) => { const b = Buffer.alloc(n, 7); b[0] = 0x1a; b[1] = 0x45; b[2] = 0xdf; b[3] = 0xa3; return b; }; // looks like WebM (EBML magic)
const vn = (s, uid, to, buf, ms, mime = 'audio/webm;codecs=opus') => call(s, 'POST', `/api/phone/voice?to=${to}`, { uid, raw: buf, headers: { 'content-type': mime, 'x-duration-ms': String(ms) } });

test('friends: request -> accept -> presence; duplicate/self/guest/block rules; mutual request auto-accepts; remove', async () => {
  const s = makeServer(); const a = mkUser(s), b = mkUser(s), g = mkUser(s, { guest: true }); const an = uname(s, a), bn = uname(s, b);
  assert.equal((await call(s, 'POST', '/api/phone/friends/request', { uid: g, body: { username: bn } })).json.error, 'GUEST_NO_PHONE');
  assert.equal((await call(s, 'POST', '/api/phone/friends/request', { uid: a, body: { username: an } })).json.error, 'SELF'); assert.equal((await call(s, 'POST', '/api/phone/friends/request', { uid: a, body: { username: uname(s, g) } })).json.error, 'CANNOT_ADD');
  await ok(s, 'POST', '/api/phone/friends/request', { uid: a, body: { username: bn } }); assert.equal((await call(s, 'POST', '/api/phone/friends/request', { uid: a, body: { username: bn } })).json.error, 'ALREADY_SENT');
  const bv = await ok(s, 'GET', '/api/phone/friends', { uid: b }); assert.equal(bv.incoming[0].from, an); assert.equal((await call(s, 'POST', '/api/phone/friends/respond', { uid: a, body: { id: bv.incoming[0].id, accept: true } })).json.error, 'NO_REQUEST', 'requester cannot accept their own');
  await ok(s, 'POST', '/api/phone/friends/respond', { uid: b, body: { id: bv.incoming[0].id, accept: true } }); assert.equal((await call(s, 'POST', '/api/phone/friends/request', { uid: b, body: { username: an } })).json.error, 'ALREADY_FRIENDS');
  assert.equal((await ok(s, 'GET', '/api/phone/friends', { uid: a })).friends[0].state, 'offline'); await online(s, b); assert.equal((await ok(s, 'GET', '/api/phone/friends', { uid: a })).friends[0].state, 'online');
  await ok(s, 'POST', '/api/phone/settings', { uid: b, body: { showPresence: false } }); assert.equal((await ok(s, 'GET', '/api/phone/friends', { uid: a })).friends[0].state, 'offline', 'presence hidden when they opt out');
  await ok(s, 'POST', '/api/phone/friends/remove', { uid: a, body: { username: bn } }); assert.equal((await ok(s, 'GET', '/api/phone/friends', { uid: a })).friends.length, 0);
  // blocked players cannot add each other; declined cooldown is silent
  const c = mkUser(s); await ok(s, 'POST', '/api/social/mute', { uid: c, body: { username: an, kind: 'block' } }); assert.equal((await call(s, 'POST', '/api/phone/friends/request', { uid: a, body: { username: uname(s, c) } })).json.error, 'CANNOT_ADD');
  const d = mkUser(s); await ok(s, 'POST', '/api/phone/friends/request', { uid: a, body: { username: uname(s, d) } }); const id = (await ok(s, 'GET', '/api/phone/friends', { uid: d })).incoming[0].id; await ok(s, 'POST', '/api/phone/friends/respond', { uid: d, body: { id, accept: false } });
  assert.equal((await ok(s, 'POST', '/api/phone/friends/request', { uid: a, body: { username: uname(s, d) } })).status, 'pending'); assert.equal((await ok(s, 'GET', '/api/phone/friends', { uid: d })).incoming.length, 0, 'no re-nag after a decline');
});
test('chat: friends only, persistent history, unread + read state, profanity filter, rate limit, mute hides, block stops, report removes', async () => {
  const { s, a, b, an, bn } = await mkPair(false); const stranger = mkUser(s);
  assert.equal((await call(s, 'POST', '/api/phone/messages', { uid: stranger, body: { to: an, text: 'hi' } })).json.error, 'NOT_FRIENDS');
  await ok(s, 'POST', '/api/phone/messages', { uid: a, body: { to: bn, text: 'Wetin dey happen?' } }); await ok(s, 'POST', '/api/phone/messages', { uid: a, body: { to: bn, text: 'You dey?' } });
  const th = await ok(s, 'GET', '/api/phone/threads', { uid: b }); assert.equal(th.threads[0].unread, 2); assert.equal(th.threads[0].with, an); assert.ok(s.pushes.some(([u, m]) => u === b && m.type === 'phone.message'));
  assert.equal((await ok(s, 'GET', '/api/phone/friends', { uid: b })).friends[0].unread, 2);
  const t1 = await ok(s, 'GET', `/api/phone/thread?with=${an}`, { uid: b }); assert.equal(t1.messages.length, 2); assert.equal(t1.messages[0].mine, false); assert.equal((await ok(s, 'GET', '/api/phone/threads', { uid: b })).threads[0].unread, 0);
  const t2 = await ok(s, 'GET', `/api/phone/thread?with=${bn}`, { uid: a }); assert.equal(t2.readByThem, t1.messages[1].id, 'sender sees the read state');
  const bad = await call(s, 'POST', '/api/phone/messages', { uid: a, body: { to: bn, text: 'you fucking idiot' } }); assert.equal(bad.status >= 400, true);
  let limited = 0; for (let i = 0; i < 12; i++) { const r = await call(s, 'POST', '/api/phone/messages', { uid: a, body: { to: bn, text: 'msg number ' + i + ' ok' } }); if (r.json.error === 'RATE_LIMIT') limited++; } assert.ok(limited > 0, 'per-recipient rate limit');
  s.app.clock.advance(70000); await ok(s, 'POST', '/api/social/mute', { uid: b, body: { username: an, kind: 'mute' } }); await ok(s, 'POST', '/api/phone/messages', { uid: a, body: { to: bn, text: 'after the mute' } });
  const t3 = await ok(s, 'GET', `/api/phone/thread?with=${an}`, { uid: b }); assert.ok(!t3.messages.some(m => m.text === 'after the mute'), 'muted sender is hidden from the muter'); assert.equal((await ok(s, 'GET', `/api/phone/thread?with=${bn}`, { uid: a })).messages.some(m => m.text === 'after the mute'), true);
  await ok(s, 'POST', '/api/social/mute', { uid: b, body: { username: an, kind: 'block' } }); assert.equal((await call(s, 'POST', '/api/phone/messages', { uid: a, body: { to: bn, text: 'blocked now' } })).json.error, 'CANNOT_MESSAGE');
  assert.equal(checkInvariants(s.db).ok, true);
});
test('chat reports: a phone message can be reported and an admin removal hides it', async () => {
  const { s, a, b, an, bn } = await mkPair(false); const m = await ok(s, 'POST', '/api/phone/messages', { uid: a, body: { to: bn, text: 'send me your password please' } }); const id = m.message.id;
  assert.equal((await call(s, 'POST', '/api/report', { uid: a, body: { kind: 'phone_message', target: id, reason: 'scam_spam' } })).json.error, 'SELF');
  await ok(s, 'POST', '/api/report', { uid: b, body: { kind: 'phone_message', target: id, reason: 'scam_spam' } }); const q = await ok(s, 'GET', '/api/admin/reports', { admin: true }); assert.ok(q.rows.some(r => r.kind === 'phone_message' && r.snapshot.includes(an)));
  await ok(s, 'POST', '/api/admin/reports/resolve', { admin: true, body: { kind: 'phone_message', target: String(id), action: 'remove' } }); assert.equal((await ok(s, 'GET', `/api/phone/thread?with=${an}`, { uid: b })).messages.length, 0);
});
test('voice notes: consent, allow-listed formats with magic-byte check, size/duration limits, rate and daily caps, participants-only audio, retention, report + removal', async () => {
  const { s, a, b, an, bn } = await mkPair(false); assert.equal((await vn(s, a, bn, wav(), 2000)).json.error, 'CONSENT_REQUIRED');
  for (const u of [a, b]) await ok(s, 'POST', '/api/phone/settings', { uid: u, body: { voiceConsent: true } });
  const r = await vn(s, a, bn, wav(3000), 2500); assert.equal(r.status, 200); const vid = r.json.message.voice.id; assert.equal(r.json.message.voice.durationMs, 2500);
  assert.equal((await vn(s, a, bn, wav(100), 2000)).json.error, 'TOO_SMALL'); assert.equal((await vn(s, a, bn, wav(3000), 100)).json.error, 'TOO_SHORT'); assert.equal((await vn(s, a, bn, wav(3000), 90000)).json.error, 'TOO_LONG');
  assert.equal((await vn(s, a, bn, wav(700 * 1024), 60000)).json.error, 'TOO_BIG'); assert.equal((await vn(s, a, bn, wav(60000), 2000)).json.error, 'BAD_AUDIO', 'implausible bitrate');
  assert.equal((await vn(s, a, bn, Buffer.alloc(3000, 1), 2500)).json.error, 'BAD_FORMAT', 'no magic bytes'); assert.equal((await vn(s, a, bn, wav(3000), 2500, 'audio/ogg')).json.error, 'BAD_FORMAT', 'declared type must match the bytes'); assert.equal((await vn(s, a, bn, wav(3000), 2500, 'video/webm')).json.error, 'BAD_FORMAT');
  const t = await ok(s, 'GET', `/api/phone/thread?with=${an}`, { uid: b }); assert.equal(t.messages[0].kind, 'voice'); const { voiceAudio } = await import('../server/core/phone/phone.js'); const au = voiceAudio(s.app, b, vid); assert.equal(au.mime, 'audio/webm'); assert.equal(au.data.length, 3000);
  const c = mkUser(s); assert.throws(() => voiceAudio(s.app, c, vid), /Not yours|FORBIDDEN|not/i); await ok(s, 'POST', '/api/social/mute', { uid: b, body: { username: an, kind: 'mute' } }); assert.throws(() => voiceAudio(s.app, b, vid));
  await ok(s, 'POST', '/api/social/mute', { uid: b, body: { username: an, kind: null } });
  s.app.clock.advance(61000); let rl = 0; for (let i = 0; i < 8; i++) if ((await vn(s, a, bn, wav(3000), 2500)).json.error === 'RATE_LIMIT') rl++; assert.ok(rl > 0, 'per-minute cap');
  s.app.clock.advance(61000); s.app.balance.phone.voice.perDayBytes = 10000; assert.equal((await vn(s, a, bn, wav(8000), 2500)).json.error, 'DAILY_CAP'); s.app.balance.phone.voice.perDayBytes = 20 * 1024 * 1024;
  // report -> admin removes -> audio is gone
  await ok(s, 'POST', '/api/report', { uid: b, body: { kind: 'voice_note', target: vid, reason: 'abusive' } }); await ok(s, 'POST', '/api/admin/reports/resolve', { admin: true, body: { kind: 'voice_note', target: String(vid), action: 'remove' } }); assert.throws(() => voiceAudio(s.app, b, vid));
  // retention: 24 hours (Sherif, 10 Oct 2026); a note with an OPEN report is frozen until resolved
  assert.equal(s.app.balance.phone.voice.retentionMs, 24 * 3600000);
  const keep = await vn(s, a, bn, wav(3000), 2500); assert.equal(keep.status, 200); const keepId = keep.json.message?.voice?.id ?? keep.json.voice?.id ?? keep.json.id;
  if (keepId) { await ok(s, 'POST', '/api/report', { uid: b, body: { kind: 'voice_note', target: keepId, reason: 'abusive' } }); s.app.clock.advance(25 * 3600000); tickVoice(s.app); assert.equal(s.app.db.prepare('SELECT status FROM voice_notes WHERE id=?').get(keepId).status, 'ready', 'reported note is frozen'); await ok(s, 'POST', '/api/admin/reports/resolve', { admin: true, body: { kind: 'voice_note', target: String(keepId), action: 'dismiss' } }); }
  s.app.clock.advance(31 * DAY); const n = tickVoice(s.app); assert.ok(n >= 1); const gone = await ok(s, 'GET', `/api/phone/thread?with=${an}`, { uid: b }); assert.ok(gone.messages.filter(m => m.kind === 'voice').every(m => m.voice.gone));
  const mx = await ok(s, 'POST', '/api/phone/settings', { uid: b, body: { voiceNotesFrom: 'nobody' } }); assert.equal(mx.voiceNotesFrom, 'nobody'); assert.equal((await vn(s, a, bn, wav(3000), 2500)).json.error, 'CANNOT_MESSAGE');
});
test('calls: ring -> answer -> signalling relayed only to the other side -> hang up, logged as metadata only; decline, cancel, missed (ring timeout), busy, DND, offline, blocked, non-friend', async () => {
  const { s, a, b, an, bn } = await mkPair(); const cs = (u, id, act) => call(s, 'POST', '/api/phone/call/act', { uid: u, body: { callId: id, action: act } });
  const st = await ok(s, 'POST', '/api/phone/call/start', { uid: a, body: { to: bn } }); assert.equal(st.state, 'ringing'); assert.ok(st.iceServers[0].urls[0].startsWith('stun:')); assert.ok(st.ringUntil > s.app.clock.now());
  const inc = s.pushes.find(([u, m]) => u === b && m.type === 'phone.call.incoming'); assert.ok(inc && inc[1].from === an && inc[1].callId === st.callId); assert.equal((await ok(s, 'GET', '/api/phone/call', { uid: b })).call.incoming, true);
  assert.equal((await call(s, 'POST', '/api/phone/call/signal', { uid: b, body: { callId: st.callId, kind: 'answer', sdp: 'x' } })).json.error, 'BAD_SIGNAL', 'cannot answer before picking up');
  await ok(s, 'POST', '/api/phone/call/signal', { uid: a, body: { callId: st.callId, kind: 'offer', sdp: 'v=0 offer' } }); assert.ok(s.pushes.some(([u, m]) => u === b && m.type === 'phone.call.signal' && m.kind === 'offer' && m.sdp === 'v=0 offer'));
  assert.equal((await cs(a, st.callId, 'answer')).json.error, 'NOT_CALLEE'); const ans = await ok(s, 'POST', '/api/phone/call/act', { uid: b, body: { callId: st.callId, action: 'answer' } }); assert.equal(ans.state, 'active');
  await ok(s, 'POST', '/api/phone/call/signal', { uid: b, body: { callId: st.callId, kind: 'answer', sdp: 'v=0 answer' } }); await ok(s, 'POST', '/api/phone/call/signal', { uid: b, body: { callId: st.callId, kind: 'ice', candidate: { candidate: 'c1' } } });
  const stranger = mkUser(s); assert.equal((await call(s, 'POST', '/api/phone/call/signal', { uid: stranger, body: { callId: st.callId, kind: 'ice', candidate: {} } })).json.error, 'NO_CALL', 'only the two people can signal');
  assert.equal((await call(s, 'POST', '/api/phone/call/signal', { uid: a, body: { callId: st.callId, kind: 'ice', candidate: { big: 'x'.repeat(20000) } } })).json.error, 'TOO_BIG');
  assert.equal((await call(s, 'POST', '/api/phone/call/start', { uid: a, body: { to: bn } })).json.error, 'BUSY_SELF'); s.app.clock.advance(65000); const end = await ok(s, 'POST', '/api/phone/call/act', { uid: a, body: { callId: st.callId, action: 'hangup' } }); assert.equal(end.reason, 'completed');
  assert.ok(s.pushes.some(([u, m]) => u === b && m.type === 'phone.call.ended' && m.reason === 'completed')); const row = s.app.db.prepare('SELECT * FROM phone_calls WHERE id=?').get(st.callId); assert.equal(row.end_reason, 'completed'); assert.ok(row.duration_s >= 65); assert.deepEqual(Object.keys(row).filter(k => /audio|sdp|record/i.test(k)), [], 'no audio or SDP stored');
  assert.match((await ok(s, 'GET', `/api/phone/thread?with=${an}`, { uid: b })).messages.at(-1).text, /Call ended · 1:0\d/);
  // decline
  s.app.clock.advance(30000); await online(s, a, b); const c2 = await ok(s, 'POST', '/api/phone/call/start', { uid: a, body: { to: bn } }); assert.equal((await ok(s, 'POST', '/api/phone/call/act', { uid: b, body: { callId: c2.callId, action: 'decline' } })).reason, 'declined'); assert.equal(s.app.db.prepare('SELECT end_reason r FROM phone_calls WHERE id=?').get(c2.callId).r, 'declined');
  // cancel -> missed call for the callee
  const c3 = await ok(s, 'POST', '/api/phone/call/start', { uid: a, body: { to: bn } }); assert.equal((await cs(a, c3.callId, 'cancel')).json.reason, 'cancelled'); assert.match((await ok(s, 'GET', `/api/phone/thread?with=${an}`, { uid: b })).messages.at(-1).text, /Missed call from/);
  // ring timeout -> missed (state machine tick)
  s.app.clock.advance(70000); await online(s, a, b); const c4 = await ok(s, 'POST', '/api/phone/call/start', { uid: a, body: { to: bn } }); s.app.clock.advance(31000); tickCalls(s.app); assert.equal(s.app.db.prepare('SELECT end_reason r FROM phone_calls WHERE id=?').get(c4.callId).r, 'missed');
  assert.equal((await cs(b, c4.callId, 'answer')).json.reason, 'missed', 'cannot answer after it was missed'); assert.ok(s.pushes.some(([u, m]) => u === a && m.type === 'phone.call.ended' && m.reason === 'missed'));
  assert.ok((await ok(s, 'GET', '/api/notifications', { uid: b })).rows.some(n => /Missed call/.test(n.text)));
  // late answer is refused even before the tick
  await online(s, a, b); const c5 = await ok(s, 'POST', '/api/phone/call/start', { uid: a, body: { to: bn } }); s.app.clock.advance(31000); assert.equal((await ok(s, 'POST', '/api/phone/call/act', { uid: b, body: { callId: c5.callId, action: 'answer' } })).reason, 'missed');
  // busy, DND, offline, blocked, not friends
  await online(s, a, b); const third = mkUser(s); await ok(s, 'POST', '/api/phone/friends/request', { uid: third, body: { username: bn } }); await ok(s, 'POST', '/api/phone/friends/respond', { uid: b, body: { id: (await ok(s, 'GET', '/api/phone/friends', { uid: b })).incoming[0].id, accept: true } }); await ok(s, 'POST', '/api/phone/settings', { uid: third, body: { voiceConsent: true } }); await online(s, third);
  const c6 = await ok(s, 'POST', '/api/phone/call/start', { uid: a, body: { to: bn } }); const busy = await ok(s, 'POST', '/api/phone/call/start', { uid: third, body: { to: bn } }); assert.equal(busy.reason, 'busy'); assert.equal(busy.ok, false); await cs(a, c6.callId, 'cancel');
  await ok(s, 'POST', '/api/phone/settings', { uid: b, body: { dnd: true } }); assert.equal((await ok(s, 'POST', '/api/phone/call/start', { uid: a, body: { to: bn } })).reason, 'dnd'); assert.equal((await ok(s, 'GET', '/api/phone/friends', { uid: a })).friends.find(f => f.username === bn).state, 'dnd'); await ok(s, 'POST', '/api/phone/settings', { uid: b, body: { dnd: false } });
  s.app.clock.advance(60 * 60000); assert.equal((await call(s, 'POST', '/api/phone/call/start', { uid: a, body: { to: bn } })).json.error, 'OFFLINE'); await online(s, a, b);
  await ok(s, 'POST', '/api/phone/settings', { uid: b, body: { callsFrom: 'nobody' } }); assert.equal((await call(s, 'POST', '/api/phone/call/start', { uid: a, body: { to: bn } })).json.error, 'CANNOT_CALL'); await ok(s, 'POST', '/api/phone/settings', { uid: b, body: { callsFrom: 'friends' } });
  assert.equal((await call(s, 'POST', '/api/phone/call/start', { uid: stranger, body: { to: bn } })).json.error, 'NOT_FRIENDS');
  s.app.clock.advance(70000); await ok(s, 'POST', '/api/social/mute', { uid: b, body: { username: an, kind: 'block' } }); assert.equal((await call(s, 'POST', '/api/phone/call/start', { uid: a, body: { to: bn } })).json.error, 'CANNOT_CALL');
  const g = mkUser(s, { guest: true }); assert.equal((await call(s, 'POST', '/api/phone/call/start', { uid: g, body: { to: bn } })).json.error, 'GUEST_NO_PHONE');
});
test('calls: mic consent first, ICE servers come from env config (STUN default, TURN only when URLs + user + credential are set), PHONE_V2=false switches the phone off', async () => {
  const { s, a, b, bn } = await mkPair(false); assert.equal((await call(s, 'POST', '/api/phone/call/start', { uid: a, body: { to: bn } })).json.error, 'CONSENT_REQUIRED');
  await ok(s, 'POST', '/api/phone/settings', { uid: a, body: { voiceConsent: true } }); const ice = s.app.balance.phone.ice; assert.deepEqual(ice.stun, ['stun:stun.l.google.com:19302']);
  const c1 = await ok(s, 'POST', '/api/phone/call/start', { uid: a, body: { to: bn } }); assert.equal(c1.iceServers.length, 1); await ok(s, 'POST', '/api/phone/call/act', { uid: a, body: { callId: c1.callId, action: 'cancel' } });
  ice.turnUrls = ['turn:turn.example.test:3478']; ice.turnUser = 'u'; ice.turnCred = 'p'; s.app.clock.advance(30000); await online(s, a, b); const c2 = await ok(s, 'POST', '/api/phone/call/start', { uid: a, body: { to: bn } }); assert.equal(c2.iceServers.length, 2); assert.equal(c2.iceServers[1].username, 'u');
  s.app.balance.phone.enabled = false; assert.equal((await call(s, 'GET', '/api/phone/friends', { uid: a })).json.error, 'PHONE_OFF'); s.app.balance.phone.enabled = true;
});
