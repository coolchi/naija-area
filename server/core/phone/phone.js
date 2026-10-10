// In-game phone (PHONE_V2): friends, persistent 1:1 chats, voice notes and the 1:1 voice-call signalling state machine.
// Friends-only; guests do not get phone features; every action reuses today's mute/block, report, filter and rate-limit code. No call audio ever reaches the server (WebRTC is peer to peer; the server relays signalling only and stores NO call audio).
import { bad, cleanText } from '../util.js';
import { screen } from '../filter.js';
import { isBlocked, chatMuted } from '../safety.js';
import { notify } from '../economy.js';
import { S2C } from './events.js';

const pair = (a, b) => (a < b ? [a, b] : [b, a]);
const P = (app) => app.balance.phone;
const push = (app, uid, msg) => { try { app.pushUser?.(uid, msg); } catch { /* sockets are best-effort; the HTTP poll is the fallback */ } };
export function gate(app, uid) {
  if (!P(app).enabled) bad('PHONE_OFF', 'The phone is switched off in this build.', 404);
  const u = app.db.prepare('SELECT id, username, is_guest, is_bot FROM users WHERE id=?').get(uid); if (!u) bad('NO_USER', 'Not signed in.', 401);
  if (u.is_guest) bad('GUEST_NO_PHONE', 'Create a free account to use friends, chats and calls.', 403); return u;
}
const userByName = (app, name) => app.db.prepare('SELECT id, username, is_guest, is_bot FROM users WHERE username=?').get(String(name || '').replace(/^@/, ''));
const nameOf = (app, id) => app.db.prepare('SELECT username FROM users WHERE id=?').get(id)?.username;

// ---------- settings
export function settingsOf(app, uid) {
  const r = app.db.prepare('SELECT * FROM phone_settings WHERE user_id=?').get(uid) || { user_id: uid, dnd: 0, calls_from: 'friends', messages_from: 'friends', voice_notes_from: 'friends', show_presence: 1, ringtone: 'default', voice_consent_at: null };
  return { dnd: !!r.dnd, callsFrom: r.calls_from, messagesFrom: r.messages_from, voiceNotesFrom: r.voice_notes_from, showPresence: !!r.show_presence, ringtone: r.ringtone, voiceConsent: !!r.voice_consent_at };
}
export function setSettings(app, uid, b = {}) {
  gate(app, uid); const cur = settingsOf(app, uid); const pick = (v, ok, d) => (ok.includes(v) ? v : d);
  const n = { dnd: b.dnd ?? cur.dnd, callsFrom: pick(b.callsFrom, ['friends', 'nobody'], cur.callsFrom), voiceNotesFrom: pick(b.voiceNotesFrom, ['friends', 'nobody'], cur.voiceNotesFrom), showPresence: b.showPresence ?? cur.showPresence, voiceConsent: cur.voiceConsent || !!b.voiceConsent };
  app.db.prepare(`INSERT INTO phone_settings(user_id,dnd,calls_from,messages_from,voice_notes_from,show_presence,voice_consent_at,updated_at) VALUES (?,?,?,?,?,?,?,?)
    ON CONFLICT(user_id) DO UPDATE SET dnd=excluded.dnd, calls_from=excluded.calls_from, voice_notes_from=excluded.voice_notes_from, show_presence=excluded.show_presence, voice_consent_at=COALESCE(phone_settings.voice_consent_at, excluded.voice_consent_at), updated_at=excluded.updated_at`)
    .run(uid, n.dnd ? 1 : 0, n.callsFrom, 'friends', n.voiceNotesFrom, n.showPresence ? 1 : 0, n.voiceConsent ? app.clock.now() : null, app.clock.now());
  return settingsOf(app, uid);
}

// ---------- friends
const friendRow = (app, a, b) => { const [x, y] = pair(a, b); return app.db.prepare('SELECT * FROM friendships WHERE user_a=? AND user_b=?').get(x, y); };
export const areFriends = (app, a, b) => friendRow(app, a, b)?.status === 'accepted';
export function presenceOf(app, viewerId, otherId) {
  if (!settingsOf(app, otherId).showPresence && viewerId !== otherId) return 'offline'; const w = app.world.players.get(otherId); const cut = app.clock.now() - app.balance.heartbeat.activeWindowMs;
  if (!w || w.lastSeen < cut) return 'offline'; if (callOf(app, otherId)) return 'in_call'; if (settingsOf(app, otherId).dnd) return 'dnd'; return w.inside ? 'home' : 'online';
}
export function friendsView(app, uid) {
  gate(app, uid); const rows = app.db.prepare("SELECT * FROM friendships WHERE (user_a=? OR user_b=?) AND status IN ('pending','accepted')").all(uid, uid);
  const friends = [], incoming = [], outgoing = []; const unread = unreadByThread(app, uid);
  for (const r of rows) { const other = r.user_a === uid ? r.user_b : r.user_a; const username = nameOf(app, other); if (r.status === 'accepted') friends.push({ username, state: presenceOf(app, uid, other), unread: unread.get(other) || 0 }); else if (r.requested_by === uid) outgoing.push({ id: r.id, to: username }); else incoming.push({ id: r.id, from: username }); }
  friends.sort((a, b) => (a.state === 'offline') - (b.state === 'offline') || a.username.localeCompare(b.username)); return { friends, incoming, outgoing };
}
export function friendRequest(app, uid, username) {
  const me = gate(app, uid); const to = userByName(app, username); if (!to) bad('NO_PLAYER', 'No player with that username.', 404); if (to.id === uid) bad('SELF', 'You cannot add yourself.');
  if (to.is_guest || to.is_bot) bad('CANNOT_ADD', 'That player cannot be added as a friend.', 409); if (isBlocked(app, uid, to.id)) bad('CANNOT_ADD', 'You cannot add this player.', 403);
  const now = app.clock.now(); if (!app.limiter.hit(`freq:${uid}`, P(app).friendReqPerHour, 3600000, now)) bad('RATE_LIMIT', 'Too many friend requests. Try again later.', 429);
  const cnt = app.db.prepare("SELECT COUNT(*) n FROM friendships WHERE (user_a=? OR user_b=?) AND status='accepted'").get(uid, uid).n; if (cnt >= P(app).maxFriends) bad('LIST_FULL', 'Your friends list is full.', 409);
  const [a, b] = pair(uid, to.id); const ex = friendRow(app, uid, to.id);
  if (ex?.status === 'accepted') bad('ALREADY_FRIENDS', 'You are already friends.', 409);
  if (ex?.status === 'pending') { if (ex.requested_by === uid) bad('ALREADY_SENT', 'Request already sent.', 409); return respondInternal(app, uid, ex, true); }
  if (ex?.status === 'declined' && ex.requested_by === uid && now - ex.responded_at < P(app).declinedCooldownMs) return { ok: true, status: 'pending' }; // silent: the declined player is not nagged
  if (ex) app.db.prepare("UPDATE friendships SET status='pending', requested_by=?, created_at=?, responded_at=NULL WHERE id=?").run(uid, now, ex.id); else app.db.prepare("INSERT INTO friendships(user_a,user_b,requested_by,status,created_at) VALUES (?,?,?,'pending',?)").run(a, b, uid, now);
  const row = friendRow(app, uid, to.id); notify(app, to.id, 'friend', `@${me.username} sent you a friend request. Open your phone.`); push(app, to.id, { type: S2C.FRIEND_REQUEST, id: row.id, from: me.username, at: now }); return { ok: true, status: 'pending' };
}
function respondInternal(app, uid, row, accept) {
  const now = app.clock.now(); const other = row.user_a === uid ? row.user_b : row.user_a; app.db.prepare('UPDATE friendships SET status=?, responded_at=? WHERE id=?').run(accept ? 'accepted' : 'declined', now, row.id);
  if (accept) { push(app, other, { type: S2C.FRIEND_UPDATE, username: nameOf(app, uid), status: 'accepted' }); notify(app, other, 'friend', `@${nameOf(app, uid)} accepted your friend request.`); } return { ok: true, status: accept ? 'accepted' : 'declined' };
}
export function friendRespond(app, uid, id, accept) {
  gate(app, uid); const row = app.db.prepare('SELECT * FROM friendships WHERE id=?').get(Number(id)); if (!row || row.status !== 'pending' || row.requested_by === uid || (row.user_a !== uid && row.user_b !== uid)) bad('NO_REQUEST', 'That request is not there any more.', 404);
  if (accept && isBlocked(app, uid, row.requested_by)) bad('CANNOT_ADD', 'You cannot add this player.', 403); return respondInternal(app, uid, row, !!accept);
}
export function friendRemove(app, uid, username) {
  gate(app, uid); const o = userByName(app, username); if (!o) bad('NO_PLAYER', 'No player with that username.', 404); const row = friendRow(app, uid, o.id); if (!row || row.status !== 'accepted') bad('NOT_FRIENDS', 'You are not friends.', 409);
  app.db.prepare("UPDATE friendships SET status='removed', responded_at=? WHERE id=?").run(app.clock.now(), row.id); push(app, o.id, { type: S2C.FRIEND_UPDATE, username: nameOf(app, uid), status: 'removed' }); return { ok: true };
}

// ---------- chats
const threadFor = (app, a, b, create = true) => { const [x, y] = pair(a, b); let t = app.db.prepare('SELECT * FROM phone_threads WHERE user_a=? AND user_b=?').get(x, y); if (!t && create) { const r = app.db.prepare('INSERT INTO phone_threads(user_a,user_b,created_at) VALUES (?,?,?)').run(x, y, app.clock.now()); t = app.db.prepare('SELECT * FROM phone_threads WHERE id=?').get(r.lastInsertRowid); } return t; };
const mutedBy = (app, viewer, other) => !!app.db.prepare('SELECT 1 FROM user_blocks WHERE blocker_id=? AND blocked_id=?').get(viewer, other);
function unreadByThread(app, uid) {
  const out = new Map(); const ts = app.db.prepare('SELECT * FROM phone_threads WHERE user_a=? OR user_b=?').all(uid, uid);
  for (const t of ts) { const other = t.user_a === uid ? t.user_b : t.user_a; if (mutedBy(app, uid, other)) continue; const rd = app.db.prepare('SELECT last_read_message_id l FROM phone_reads WHERE thread_id=? AND user_id=?').get(t.id, uid)?.l || 0;
    const n = app.db.prepare('SELECT COUNT(*) n FROM phone_messages WHERE thread_id=? AND id>? AND sender_id!=? AND deleted_at IS NULL').get(t.id, rd, uid).n; if (n) out.set(other, n); } return out;
}
function msgView(app, m, viewer) {
  const v = { id: m.id, threadId: m.thread_id, from: nameOf(app, m.sender_id), mine: m.sender_id === viewer, kind: m.kind, at: m.created_at };
  if (m.kind === 'voice') { const vn = app.db.prepare('SELECT id,duration_ms,waveform,status,bytes FROM voice_notes WHERE id=?').get(m.voice_id); v.voice = vn && vn.status === 'ready' ? { id: vn.id, durationMs: vn.duration_ms, waveform: vn.waveform ? JSON.parse(vn.waveform) : null } : { id: m.voice_id, gone: true, durationMs: vn?.duration_ms || 0 }; } else v.text = m.body; return v;
}
function addMessage(app, t, from, to, kind, body, voiceId = null, silent = false) {
  const now = app.clock.now(); const r = app.db.prepare('INSERT INTO phone_messages(thread_id,sender_id,kind,body,voice_id,created_at) VALUES (?,?,?,?,?,?)').run(t.id, from, kind, body, voiceId, now);
  app.db.prepare('UPDATE phone_threads SET last_message_id=?, last_message_at=? WHERE id=?').run(r.lastInsertRowid, now, t.id); const m = app.db.prepare('SELECT * FROM phone_messages WHERE id=?').get(r.lastInsertRowid);
  if (!silent && !mutedBy(app, to, from) && !isBlocked(app, from, to)) push(app, to, { type: S2C.MESSAGE, ...msgView(app, m, to), mine: false }); return m;
}
function chatChecks(app, uid, to) {
  if (!to) bad('NO_RECIPIENT', 'No player with that username.', 404); if (to.id === uid) bad('SELF', 'You cannot message yourself.'); if (isBlocked(app, uid, to.id)) bad('CANNOT_MESSAGE', 'You cannot message this player.', 403);
  if (!areFriends(app, uid, to.id)) bad('NOT_FRIENDS', 'You can only chat with friends. Send a friend request first.', 403); if (chatMuted(app, uid)) bad('CHAT_PAUSED', 'Messaging is paused for your account for a little while.', 403);
}
export function sendText(app, uid, toName, text) {
  gate(app, uid); const to = userByName(app, toName); chatChecks(app, uid, to); const t = cleanText(text, P(app).textMax); if (!t) bad('EMPTY', 'Type a message.'); const sc = screen(t); if (!sc.ok) bad(sc.code, sc.message);
  const now = app.clock.now(); const S = app.balance.safety; if (!app.limiter.hit(`pm:${uid}`, P(app).msgPerMin, 60000, now)) bad('RATE_LIMIT', 'Too many messages, slow down.', 429); if (!app.limiter.hit(`pm:${uid}:${to.id}`, P(app).msgPerRecipientPerMin, 60000, now)) bad('RATE_LIMIT', 'Easy now: let them reply first.', 429); void S;
  const th = threadFor(app, uid, to.id); const m = addMessage(app, th, uid, to.id, 'text', t); return { ok: true, message: msgView(app, m, uid) };
}
export function threadsView(app, uid) {
  gate(app, uid); const un = unreadByThread(app, uid); const ts = app.db.prepare('SELECT * FROM phone_threads WHERE (user_a=? OR user_b=?) AND last_message_id IS NOT NULL ORDER BY last_message_at DESC LIMIT 50').all(uid, uid);
  return { threads: ts.filter(t => !isBlocked(app, uid, t.user_a === uid ? t.user_b : t.user_a)).map(t => { const other = t.user_a === uid ? t.user_b : t.user_a; const last = app.db.prepare('SELECT * FROM phone_messages WHERE id=?').get(t.last_message_id); return { id: t.id, with: nameOf(app, other), state: presenceOf(app, uid, other), unread: un.get(other) || 0, last: last && !mutedBy(app, uid, last.sender_id === uid ? -1 : last.sender_id) ? msgView(app, last, uid) : null }; }) };
}
export function threadView(app, uid, withName, after = 0, markRead = true) {
  gate(app, uid); const o = userByName(app, withName); if (!o) bad('NO_PLAYER', 'No player with that username.', 404); if (isBlocked(app, uid, o.id)) bad('CANNOT_MESSAGE', 'You cannot message this player.', 403);
  const t = threadFor(app, uid, o.id, false); if (!t) return { with: o.username, state: presenceOf(app, uid, o.id), friends: areFriends(app, uid, o.id), messages: [], readByThem: 0 };
  const hide = mutedBy(app, uid, o.id); let rows = app.db.prepare('SELECT * FROM phone_messages WHERE thread_id=? AND id>? AND deleted_at IS NULL ORDER BY id DESC LIMIT ?').all(t.id, Number(after) || 0, P(app).threadPage).reverse();
  if (hide) rows = rows.filter(r => r.sender_id === uid); // a muted player's messages are never shown (system lines stay)
  if (markRead && rows.length) { const mx = Math.max(...rows.map(r => r.id)); app.db.prepare('INSERT INTO phone_reads(thread_id,user_id,last_read_message_id) VALUES (?,?,?) ON CONFLICT(thread_id,user_id) DO UPDATE SET last_read_message_id=MAX(phone_reads.last_read_message_id, excluded.last_read_message_id)').run(t.id, uid, mx); push(app, o.id, { type: S2C.MESSAGE_READ, from: nameOf(app, uid), upTo: mx }); }
  const theirRead = app.db.prepare('SELECT last_read_message_id l FROM phone_reads WHERE thread_id=? AND user_id=?').get(t.id, o.id)?.l || 0;
  return { with: o.username, state: presenceOf(app, uid, o.id), friends: areFriends(app, uid, o.id), messages: rows.map(r => msgView(app, r, uid)), readByThem: theirRead };
}

// ---------- voice notes
const sniff = (buf) => (buf.length > 4 && buf[0] === 0x1a && buf[1] === 0x45 && buf[2] === 0xdf && buf[3] === 0xa3 ? 'audio/webm' : buf.slice(0, 4).toString('latin1') === 'OggS' ? 'audio/ogg' : buf.length > 12 && buf.slice(4, 8).toString('latin1') === 'ftyp' ? 'audio/mp4' : null);
export function storeOf(app) { return app.voiceStore ||= { m: new Map(), put(k, b) { this.m.set(k, Buffer.from(b)); }, get(k) { return this.m.get(k) || null; }, del(k) { this.m.delete(k); } }; }
export function sendVoice(app, uid, toName, buf, { durationMs, mime, waveform } = {}) {
  gate(app, uid); const V = P(app).voice; const to = userByName(app, toName); chatChecks(app, uid, to);
  if (!settingsOf(app, uid).voiceConsent) bad('CONSENT_REQUIRED', 'Please accept the voice notice first.', 403, { consent: true });
  const rs = settingsOf(app, to.id); if (rs.voiceNotesFrom === 'nobody') bad('CANNOT_MESSAGE', 'This player is not taking voice notes.', 403);
  if (!Buffer.isBuffer(buf) || !buf.length) bad('NO_AUDIO', 'No audio received.'); if (buf.length > V.maxBytes) bad('TOO_BIG', 'That voice note is too big.', 413); if (buf.length < V.minBytes) bad('TOO_SMALL', 'That voice note is too short.');
  const d = Math.round(Number(durationMs)); if (!Number.isFinite(d) || d < V.minMs) bad('TOO_SHORT', 'Hold a little longer to record.'); if (d > V.maxMs + 500) bad('TOO_LONG', `Voice notes can be ${Math.round(V.maxMs / 1000)} seconds at most.`);
  if (buf.length > d * V.maxBytesPerMs) bad('BAD_AUDIO', 'That audio does not look right.'); const real = sniff(buf); const claimed = String(mime || '').split(';')[0].trim().toLowerCase(); if (!real || !V.mimes.includes(real) || (claimed && claimed !== real)) bad('BAD_FORMAT', 'Unsupported audio format.', 415);
  const now = app.clock.now(); if (!app.limiter.hit(`vn:${uid}`, V.perMin, 60000, now)) bad('RATE_LIMIT', 'Too many voice notes, slow down.', 429);
  const day = app.db.prepare('SELECT COALESCE(SUM(bytes),0) b FROM voice_notes WHERE owner_id=? AND created_at>?').get(uid, now - 86400000).b; if (day + buf.length > V.perDayBytes) bad('DAILY_CAP', 'Voice note limit for today reached.', 429);
  const sha = app.platform.sha256(buf); const key = `vn/${uid}/${sha.slice(0, 20)}-${now}`; storeOf(app).put(key, buf);
  const wf = Array.isArray(waveform) ? JSON.stringify(waveform.slice(0, 48).map(n => Math.max(0, Math.min(100, Math.round(Number(n) || 0))))) : null;
  const th = threadFor(app, uid, to.id); const r = app.db.prepare("INSERT INTO voice_notes(owner_id,thread_id,mime,bytes,duration_ms,storage_key,sha256,waveform,status,created_at,expires_at) VALUES (?,?,?,?,?,?,?,?,'ready',?,?)").run(uid, th.id, real, buf.length, d, key, sha, wf, now, now + V.retentionMs);
  const m = addMessage(app, th, uid, to.id, 'voice', null, r.lastInsertRowid); return { ok: true, message: msgView(app, m, uid) };
}
export function voiceAudio(app, uid, id) {
  gate(app, uid); const v = app.db.prepare('SELECT * FROM voice_notes WHERE id=?').get(Number(id)); if (!v || v.status !== 'ready') bad('GONE', 'That voice note is gone.', 404);
  const th = app.db.prepare('SELECT * FROM phone_threads WHERE id=?').get(v.thread_id); if (!th || (th.user_a !== uid && th.user_b !== uid)) bad('FORBIDDEN', 'Not yours to hear.', 403);
  const other = th.user_a === uid ? th.user_b : th.user_a; if (isBlocked(app, uid, other) || (v.owner_id !== uid && mutedBy(app, uid, other))) bad('FORBIDDEN', 'Not available.', 403);
  const data = storeOf(app).get(v.storage_key); if (!data) bad('GONE', 'That voice note is gone.', 404); return { mime: v.mime, data };
}
export function removeVoice(app, id, reason) { const v = app.db.prepare('SELECT * FROM voice_notes WHERE id=?').get(Number(id)); if (!v) return false; storeOf(app).del(v.storage_key); app.db.prepare("UPDATE voice_notes SET status='removed', removed_at=?, removed_reason=? WHERE id=?").run(app.clock.now(), reason || 'moderation', v.id); return true; }
export function tickVoice(app) { const now = app.clock.now(); const old = app.db.prepare("SELECT id, storage_key FROM voice_notes WHERE status='ready' AND expires_at<=? AND CAST(id AS TEXT) NOT IN (SELECT target_ref FROM reports WHERE kind='voice_note' AND status='open')").all(now); for (const v of old) { storeOf(app).del(v.storage_key); app.db.prepare("UPDATE voice_notes SET status='expired', removed_at=? WHERE id=?").run(now, v.id); } return old.length; }

// ---------- calls
export function iceServers(app) { const I = P(app).ice; const out = []; if (I.stun.length) out.push({ urls: I.stun }); if (I.turnUrls.length && I.turnUser && I.turnCred) out.push({ urls: I.turnUrls, username: I.turnUser, credential: I.turnCred }); return out; }
const calls = (app) => (app.phoneCalls ||= new Map());
export function callOf(app, uid) { for (const c of calls(app).values()) if (c.state !== 'ended' && (c.caller === uid || c.callee === uid)) return c; return null; }
const callView = (app, c, uid) => ({ callId: c.id, state: c.state, with: nameOf(app, c.caller === uid ? c.callee : c.caller), incoming: c.callee === uid, ringUntil: c.ringUntil, answeredAt: c.answeredAt || null, reason: c.reason || null });
function logCall(app, c, text) { const th = threadFor(app, c.caller, c.callee); addMessage(app, th, c.caller, c.callee, 'system', text, null, true); }
function endCall(app, c, reason, by = null) {
  if (c.state === 'ended') return; const now = app.clock.now(); const was = c.state; c.state = 'ended'; c.reason = reason; c.endedAt = now;
  app.db.prepare("UPDATE phone_calls SET state='ended', end_reason=?, ended_at=?, duration_s=? WHERE id=?").run(reason, now, c.answeredAt ? Math.round((now - c.answeredAt) / 1000) : null, c.id);
  const evt = (uid) => ({ type: S2C.CALL_ENDED, callId: c.id, state: 'ended', reason, at: now, with: nameOf(app, uid === c.caller ? c.callee : c.caller) });
  for (const u of [c.caller, c.callee]) if (u !== by) push(app, u, evt(u));
  if (reason === 'missed' || reason === 'cancelled') { logCall(app, c, `Missed call from @${nameOf(app, c.caller)}`); notify(app, c.callee, 'call', `Missed call from @${nameOf(app, c.caller)}`); }
  else if (reason === 'completed') { const s = Math.round((now - c.answeredAt) / 1000); logCall(app, c, `Call ended · ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`); }
  else if (reason === 'declined') logCall(app, c, `Call declined`); else if (reason === 'dnd' || reason === 'busy') { logCall(app, c, `Missed call from @${nameOf(app, c.caller)}`); notify(app, c.callee, 'call', `Missed call from @${nameOf(app, c.caller)}`); }
  void was; setTimeout(() => calls(app).delete(c.id), 60000).unref?.();
}
export function callStart(app, uid, toName) {
  const me = gate(app, uid); const to = userByName(app, toName); if (!to) bad('NO_PLAYER', 'No player with that username.', 404); if (to.id === uid) bad('SELF', 'You cannot call yourself.');
  if (isBlocked(app, uid, to.id) || mutedBy(app, to.id, uid)) bad('CANNOT_CALL', 'You cannot call this player.', 403); if (!areFriends(app, uid, to.id)) bad('NOT_FRIENDS', 'You can only call friends.', 403);
  if (!settingsOf(app, uid).voiceConsent) bad('CONSENT_REQUIRED', 'Please accept the voice notice first.', 403, { consent: true });
  const now = app.clock.now(); if (!app.limiter.hit(`call:${uid}`, P(app).call.startPerMin, 60000, now)) bad('RATE_LIMIT', 'Too many calls, slow down.', 429);
  if (callOf(app, uid)) bad('BUSY_SELF', 'You are already in a call.', 409); const rs = settingsOf(app, to.id); if (rs.callsFrom === 'nobody') bad('CANNOT_CALL', 'This player is not taking calls.', 403);
  const pres = presenceOf(app, uid, to.id); const w = app.world.players.get(to.id); const online = !!w && w.lastSeen >= now - app.balance.heartbeat.activeWindowMs; if (!online) bad('OFFLINE', `@${to.username} is offline. Send a message or voice note instead.`, 409);
  const id = app.db.prepare("INSERT INTO phone_calls(caller_id,callee_id,state,created_at) VALUES (?,?,'ringing',?)").run(uid, to.id, now).lastInsertRowid;
  const c = { id: Number(id), caller: uid, callee: to.id, state: 'ringing', createdAt: now, ringUntil: now + P(app).call.ringMs, sig: { n: 0 } }; calls(app).set(c.id, c); void pres;
  if (callOf(app, to.id) && callOf(app, to.id) !== c) { endCall(app, c, 'busy'); return { ok: false, callId: c.id, state: 'ended', reason: 'busy', text: `@${to.username} is on another call.` }; }
  if (rs.dnd) { endCall(app, c, 'dnd'); return { ok: false, callId: c.id, state: 'ended', reason: 'dnd', text: `@${to.username} is not taking calls right now.` }; }
  push(app, to.id, { type: S2C.CALL_INCOMING, callId: c.id, from: me.username, ringUntil: c.ringUntil, iceServers: iceServers(app) });
  return { ok: true, callId: c.id, state: 'ringing', ringUntil: c.ringUntil, iceServers: iceServers(app) };
}
const mine = (app, uid, id) => { const c = calls(app).get(Number(id)); if (!c || (c.caller !== uid && c.callee !== uid)) bad('NO_CALL', 'That call is not there.', 404); return c; };
export function callAct(app, uid, id, action) {
  gate(app, uid); const c = mine(app, uid, id); const now = app.clock.now();
  if (c.state === 'ended') return { ok: true, ...callView(app, c, uid) };
  if (action === 'answer') {
    if (c.callee !== uid) bad('NOT_CALLEE', 'Only the person being called can answer.', 403); if (c.state !== 'ringing') bad('BAD_STATE', 'Not ringing.', 409); if (now > c.ringUntil) { endCall(app, c, 'missed'); return { ok: true, ...callView(app, c, uid) }; }
    c.state = 'active'; c.answeredAt = now; c.lastSeen = { [c.caller]: now, [c.callee]: now }; app.db.prepare("UPDATE phone_calls SET state='active', answered_at=? WHERE id=?").run(now, c.id); push(app, c.caller, { type: S2C.CALL_STATE, callId: c.id, state: 'active', at: now, iceServers: iceServers(app) });
  } else if (action === 'decline') { if (c.callee !== uid || c.state !== 'ringing') bad('BAD_STATE', 'Nothing to decline.', 409); endCall(app, c, 'declined', uid); }
  else if (action === 'cancel') { if (c.caller !== uid || c.state !== 'ringing') bad('BAD_STATE', 'Nothing to cancel.', 409); endCall(app, c, 'cancelled', uid); }
  else if (action === 'hangup') { if (c.state === 'ringing') { if (c.caller === uid) endCall(app, c, 'cancelled', uid); else endCall(app, c, 'declined', uid); } else endCall(app, c, 'completed', uid); }
  else bad('BAD_ACTION', 'answer | decline | cancel | hangup');
  return { ok: true, ...callView(app, c, uid) };
}
export function callSignal(app, uid, id, sig = {}) {
  gate(app, uid); const c = mine(app, uid, id); if (c.state === 'ended') bad('CALL_ENDED', 'The call has ended.', 409); const K = P(app).call;
  if (!['offer', 'answer', 'ice'].includes(sig.kind)) bad('BAD_SIGNAL', 'Unknown signal.'); const size = JSON.stringify(sig).length; if (size > K.signalMaxBytes) bad('TOO_BIG', 'Signal too large.', 413);
  if (!app.limiter.hit(`sig:${uid}`, K.signalPer10s, 10000, app.clock.now())) bad('RATE_LIMIT', 'Too many signals.', 429);
  if (sig.kind === 'offer' && c.caller !== uid) bad('BAD_SIGNAL', 'Only the caller sends the offer.', 403); if (sig.kind === 'answer' && (c.callee !== uid || c.state !== 'active')) bad('BAD_SIGNAL', 'Answer only after you pick up.', 403);
  if (c.lastSeen) c.lastSeen[uid] = app.clock.now(); const other = c.caller === uid ? c.callee : c.caller;
  push(app, other, { type: S2C.CALL_SIGNAL, callId: c.id, kind: sig.kind, sdp: typeof sig.sdp === 'string' ? sig.sdp : undefined, candidate: sig.candidate && typeof sig.candidate === 'object' ? sig.candidate : undefined }); return { ok: true };
}
export function callState(app, uid) {
  gate(app, uid); const c = callOf(app, uid); if (!c) return { call: null }; if (c.lastSeen) c.lastSeen[uid] = app.clock.now(); return { call: { ...callView(app, c, uid), iceServers: iceServers(app) } };
}
export function reportCallEnded(app, uid, id, icePath) { const c = calls(app).get(Number(id)); if (c && (c.caller === uid || c.callee === uid) && ['host', 'srflx', 'relay'].includes(icePath)) app.db.prepare('UPDATE phone_calls SET ice_path=? WHERE id=?').run(icePath, c.id); return { ok: true }; }
export function tickCalls(app) {
  const now = app.clock.now(); const K = P(app).call;
  for (const c of [...calls(app).values()]) {
    if (c.state === 'ringing' && now >= c.ringUntil) endCall(app, c, 'missed');
    else if (c.state === 'active') { if (now - c.answeredAt > K.maxMs) endCall(app, c, 'completed'); else if (c.lastSeen && Object.values(c.lastSeen).some(t => now - t > K.staleMs * 4)) endCall(app, c, 'failed'); }
  }
}
