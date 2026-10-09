import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at } from './helpers.js';
import { screen, profane } from '../server/core/filter.js';
import { checkInvariants } from '../server/core/ledger.js';

const home = async (s, u, name) => { const p = s.app.city.properties.filter(x => x.tier === 1)[0]; at(s, u, p.door.x, p.door.z); await ok(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: p.id, mode: 'rent' } }); if (name) await ok(s, 'POST', '/api/property/name', { uid: u, body: { name } }); return p; };

test('filter: catches evasions, lets innocent words through, blocks contact info and spam', () => {
  for (const bad of ['sh1t', 'f u c k', 'fuuuuck', 'f.u.c.k', 'what the f@ck', 'sh*t', 'you BITCH', 'FÜCK', 'fu ck', 'b1tch']) assert.equal(profane(bad), true, bad);
  for (const good of ['grape', 'class', 'Scunthorpe', 'assistant', 'cocktail', 'shiitake', 'analyst', 'Nigerian', 'pussycat', 'Mama Tunde Place', 'Pass the salt', 'hello @bob', 'my class hit the target']) assert.equal(profane(good), false, good);
  for (const t of ['call 08031234567', 'visit www.example.com', 'mail me a@b.com', 'wa.me/234', '0 8 0 3 1 2 3 4 5 6 7']) assert.equal(screen(t).code, 'NO_CONTACT_INFO', t);
  assert.equal(screen('aaaaaaaaaaaa').code, 'SPAM'); assert.equal(screen('How far? Wetin dey happen?').ok, true); assert.equal(screen('visit shop.com', { links: true }).ok, true);
});
test('chat: filtered, rate limited per minute, duplicates refused, paused users blocked', async () => {
  const s = makeServer(); const u = mkUser(s); at(s, u, 0, 0); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
  assert.equal((await call(s, 'POST', '/api/chat', { uid: u, body: { text: 'you are a sh1t' } })).json.error, 'CLEAN_IT_UP');
  assert.equal((await call(s, 'POST', '/api/chat', { uid: u, body: { text: 'call me 08031234567' } })).json.error, 'NO_CONTACT_INFO');
  await ok(s, 'POST', '/api/chat', { uid: u, body: { text: 'hello there' } }); s.app.clock.advance(2500); assert.equal((await call(s, 'POST', '/api/chat', { uid: u, body: { text: 'Hello There' } })).json.error, 'SPAM');
  let last; for (let i = 0; i < 14; i++) { s.app.clock.advance(2100); last = await call(s, 'POST', '/api/chat', { uid: u, body: { text: 'msg ' + i } }); if (last.status !== 200) break; } assert.equal(last.json.error, 'RATE_LIMIT');
  s.db.prepare('UPDATE users SET chat_muted_until=? WHERE id=?').run(s.app.clock.now() + 60000, u); s.app.clock.advance(61000 * 0 + 2100); assert.equal((await call(s, 'POST', '/api/chat', { uid: u, body: { text: 'paused?' } })).json.error, 'CHAT_PAUSED');
});
test('mute and block: muted chat/ghosts hidden from viewer, blocked users cannot DM or knock, lists and unblock work', async () => {
  const s = makeServer(); const [a, b] = [mkUser(s), mkUser(s)]; const an = s.db.prepare('SELECT username FROM users WHERE id=?').get(a).username, bn = s.db.prepare('SELECT username FROM users WHERE id=?').get(b).username;
  at(s, a, 0, 0); at(s, b, 5, 0); await ok(s, 'POST', '/api/heartbeat', { uid: a, body: {} }); await ok(s, 'POST', '/api/heartbeat', { uid: b, body: {} });
  await ok(s, 'POST', '/api/chat', { uid: b, body: { text: 'hi from b' } }); let hb = await ok(s, 'POST', '/api/heartbeat', { uid: a, body: { chatSince: 0 } }); assert.ok(hb.chat.some(c => c.t === 'hi from b')); assert.equal(hb.players.length, 1);
  await ok(s, 'POST', '/api/social/mute', { uid: a, body: { username: bn, kind: 'mute' } }); hb = await ok(s, 'POST', '/api/heartbeat', { uid: a, body: { chatSince: 0 } }); assert.ok(!hb.chat.some(c => c.t === 'hi from b')); assert.equal(hb.players.length, 0, 'muted player ghost hidden');
  // mute alone does not stop b DMing a, but a never sees it
  const dm = await ok(s, 'POST', '/api/dm', { uid: b, body: { to: an, text: 'are you there' } }); assert.equal(dm.ok, true); assert.equal((await ok(s, 'GET', '/api/notifications', { uid: a })).rows.filter(n => n.kind === 'dm').length, 0);
  await ok(s, 'POST', '/api/social/mute', { uid: a, body: { username: bn, kind: 'block' } }); s.app.clock.advance(61000); assert.equal((await call(s, 'POST', '/api/dm', { uid: b, body: { to: an, text: 'hello?' } })).json.error, 'CANNOT_MESSAGE'); assert.equal((await call(s, 'POST', '/api/dm', { uid: a, body: { to: bn, text: 'hello?' } })).json.error, 'CANNOT_MESSAGE');
  const p = await home(s, a); await ok(s, 'POST', '/api/heartbeat', { uid: a, body: {} }); await ok(s, 'POST', '/api/property/enter', { uid: a }); at(s, b, p.door.x, p.door.z); assert.equal((await call(s, 'POST', '/api/visit/knock', { uid: b, body: { propertyId: p.id } })).json.error, 'CANNOT_VISIT');
  assert.deepEqual((await ok(s, 'GET', '/api/social/blocks', { uid: a })).rows.map(r => [r.username, r.kind]), [[bn, 'block']]); await ok(s, 'POST', '/api/social/mute', { uid: a, body: { username: bn, kind: null } }); assert.equal((await ok(s, 'GET', '/api/social/blocks', { uid: a })).rows.length, 0);
  assert.equal((await call(s, 'POST', '/api/social/mute', { uid: a, body: { username: an, kind: 'mute' } })).json.error, 'SELF');
});
test('rate limits: knocks per minute and per house; DMs per recipient and duplicates', async () => {
  const s = makeServer(); const [a, b] = [mkUser(s), mkUser(s)]; const an = s.db.prepare('SELECT username FROM users WHERE id=?').get(a).username; const bn = s.db.prepare('SELECT username FROM users WHERE id=?').get(b).username;
  await ok(s, 'POST', '/api/dm', { uid: a, body: { to: bn, text: 'one' } }); assert.equal((await call(s, 'POST', '/api/dm', { uid: a, body: { to: bn, text: 'one' } })).json.error, 'SPAM');
  await ok(s, 'POST', '/api/dm', { uid: a, body: { to: bn, text: 'two' } }); await ok(s, 'POST', '/api/dm', { uid: a, body: { to: bn, text: 'three' } }); assert.equal((await call(s, 'POST', '/api/dm', { uid: a, body: { to: bn, text: 'four' } })).json.error, 'RATE_LIMIT');
  const p = await home(s, a); await ok(s, 'POST', '/api/heartbeat', { uid: a, body: {} }); await ok(s, 'POST', '/api/property/enter', { uid: a }); at(s, b, p.door.x, p.door.z); let err = null;
  for (let i = 0; i < 5; i++) { const r = await call(s, 'POST', '/api/visit/knock', { uid: b, body: { propertyId: p.id } }); if (r.status === 200) { await call(s, 'POST', '/api/visit/cancel', { uid: b }); } else { err = r.json.error; break; } } assert.equal(err, 'RATE_LIMIT');
  void an;
});
test('reports: house name, chat, ad creative; validation, duplicates, own-content, auto-hide after 3, admin review actions with audit', async () => {
  const s = makeServer(); const [owner, r1, r2, r3] = [mkUser(s), mkUser(s), mkUser(s), mkUser(s)]; const p = await home(s, owner, 'Villa Ojo');
  assert.equal((await call(s, 'POST', '/api/report', { uid: r1, body: { kind: 'bogus', target: 'x', reason: 'abusive' } })).json.error, 'BAD_KIND'); assert.equal((await call(s, 'POST', '/api/report', { uid: r1, body: { kind: 'house_name', target: p.id, reason: 'nope' } })).json.error, 'BAD_REASON');
  assert.equal((await call(s, 'POST', '/api/report', { uid: owner, body: { kind: 'house_name', target: p.id, reason: 'abusive' } })).json.error, 'SELF');
  await ok(s, 'POST', '/api/report', { uid: r1, body: { kind: 'house_name', target: p.id, reason: 'abusive', detail: 'rude' } }); assert.equal((await call(s, 'POST', '/api/report', { uid: r1, body: { kind: 'house_name', target: p.id, reason: 'abusive' } })).json.error, 'ALREADY_REPORTED');
  await ok(s, 'POST', '/api/report', { uid: r2, body: { kind: 'house_name', target: p.id, reason: 'hate' } }); let card = (await ok(s, 'GET', '/api/properties', { uid: r3 })).properties.find(x => x.id === p.id); assert.equal(card.name, 'Villa Ojo');
  await ok(s, 'POST', '/api/report', { uid: r3, body: { kind: 'house_name', target: p.id, reason: 'sexual' } }); card = (await ok(s, 'GET', '/api/properties', { uid: r3 })).properties.find(x => x.id === p.id); assert.equal(card.name, card.baseName, 'hidden after 3 reporters'); assert.equal(card.nameHidden, true);
  // chat report
  at(s, owner, 0, 0); await ok(s, 'POST', '/api/heartbeat', { uid: owner, body: {} }); await ok(s, 'POST', '/api/chat', { uid: owner, body: { text: 'questionable but allowed' } }); const mid = s.db.prepare('SELECT id FROM chat_messages ORDER BY id DESC LIMIT 1').get().id;
  await ok(s, 'POST', '/api/report', { uid: r1, body: { kind: 'chat', target: mid, reason: 'scam_spam' } }); assert.equal((await call(s, 'POST', '/api/report', { uid: r1, body: { kind: 'chat', target: 99999, reason: 'abusive' } })).json.error, 'NO_TARGET');
  // ad report (needs a live campaign)
  const { createCampaign, decide, tickAds, getOrCreateAdvertiser, uploadCreative } = await import('../server/core/ads.js'); const { png } = await import('./helpers.js'); const adv = getOrCreateAdvertiser(s.app, { email: 'a@b.co', brand: 'Test Foods' });
  const up = uploadCreative(s.app, adv.id, png(), 'image/png'); const cid = createCampaign(s.app, adv.id, { surface: 'road_billboard', tier: 'street', units: 1, days: 1, creativeId: up.creativeId, headline: 'Fresh bread', linkUrl: 'https://example.com/x' }); if (s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(cid).status === 'human_review') decide(s.app, cid, 'approve'); tickAds(s.app);
  assert.equal(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(cid).status, 'live'); await ok(s, 'POST', '/api/report', { uid: r1, body: { kind: 'ad_creative', target: cid, reason: 'misleading' } });
  // admin queue + resolve
  assert.equal((await call(s, 'GET', '/api/admin/reports', {})).status, 401);   const q = await ok(s, 'GET', '/api/admin/reports', { admin: true }); assert.equal(q.rows.length, 3); const hn = q.rows.find(r => r.kind === 'house_name'); assert.equal(hn.count, 3); assert.equal(hn.snapshot.includes('Villa Ojo'), true); assert.ok(q.rows[0].count >= q.rows[1].count);
  await ok(s, 'POST', '/api/admin/reports/resolve', { admin: true, body: { kind: 'house_name', target: p.id, action: 'remove', note: 'rude' } }); assert.equal(s.db.prepare('SELECT custom_name FROM property_owner WHERE property_id=?').get(p.id).custom_name, null);
  await ok(s, 'POST', '/api/admin/reports/resolve', { admin: true, body: { kind: 'chat', target: mid, action: 'remove_and_mute' } }); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM chat_messages WHERE id=?').get(mid).n, 0); assert.ok(s.db.prepare('SELECT chat_muted_until m FROM users WHERE id=?').get(owner).m > s.app.clock.now());
  await ok(s, 'POST', '/api/admin/reports/resolve', { admin: true, body: { kind: 'ad_creative', target: cid, action: 'remove', note: 'misleading claim' } }); assert.equal(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(cid).status, 'completed');
  assert.equal((await call(s, 'POST', '/api/admin/reports/resolve', { admin: true, body: { kind: 'chat', target: mid, action: 'dismiss' } })).json.error, 'NO_REPORT');
  assert.equal(s.db.prepare("SELECT COUNT(*) n FROM audit_log WHERE action LIKE 'report_%'").get().n, 3); assert.equal((await ok(s, 'GET', '/api/admin/reports?status=actioned', { admin: true })).rows.length, 3);
  // owner can rename again after reset; reporters notified? (not required)
  await ok(s, 'POST', '/api/property/name', { uid: owner, body: { name: 'Fresh Name' } }); assert.equal(checkInvariants(s.db).ok, true);
});
test('reports are rate limited per user and migrations are idempotent', async () => {
  const s = makeServer(); const u = mkUser(s); let last; for (let i = 0; i < 12; i++) last = await call(s, 'POST', '/api/report', { uid: u, body: { kind: 'chat', target: i + 1, reason: 'abusive' } }); assert.equal(last.json.error, 'RATE_LIMIT');
  const { migrate } = await import('../server/core/schema.js'); migrate(s.db); migrate(s.db); assert.ok(s.db.prepare('PRAGMA table_info(property_items)').all().some(c => c.name === 'rot'));
});
