import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, HOUR, DAY } from './helpers.js';
import { AGE } from '../server/config/age.js';
import * as age from '../server/core/age/index.js';
import { mockAgeProvider, sanitize, checkSig } from '../server/core/age/providers.js';
import { buildServer } from '../server/createServer.js';
import { nodePlatform } from '../server/platform-node.js';

const platform = nodePlatform({ secret: 'test' });
const mk = (mode = 'off', cfg = {}, o = {}) => makeServer({ ageConfig: { ...AGE, mode, ...cfg }, ...o });
const start = (s, uid) => ok(s, 'POST', '/api/age/start', { uid, body: { consent: true } });
const decide = (s, uid, ref, outcome) => ok(s, 'POST', '/api/age/mock/decide', { uid, body: { ref, outcome } });
const st = (s, uid) => ok(s, 'GET', '/api/age/status', { uid });
const row = (s, uid) => s.db.prepare('SELECT * FROM age_verifications WHERE user_id=?').get(uid);

test('off by default: the 18+ tick box still rules, nothing changes for players, status says not required', async () => {
  const s = makeServer(); const u = mkUser(s); const r = await st(s, u); assert.equal(r.enabled, true); assert.equal(r.required, false); assert.equal(r.mode, 'off'); assert.equal(r.status, 'none');
  assert.equal((await ok(s, 'GET', '/api/jobs', { uid: u })).jobs.length > 0, true); assert.equal((await ok(s, 'GET', '/api/config')).ageCheck.enabled, true);
});
test('a check needs explicit consent, and the vendor only ever sees an opaque reference', async () => {
  const s = mk(); const u = mkUser(s); const name = s.db.prepare('SELECT username FROM users WHERE id=?').get(u).username;
  assert.equal((await call(s, 'POST', '/api/age/start', { uid: u, body: {} })).json.error, 'CONSENT_REQUIRED'); assert.equal((await call(s, 'POST', '/api/age/start', { uid: u, body: { consent: 'yes' } })).json.error, 'CONSENT_REQUIRED');
  assert.equal((await call(s, 'POST', '/api/age/start', { body: { consent: true } })).status, 401);
  const a = await start(s, u); assert.match(a.url, /age\/mock/); const seen = s.app.age.provider.sessions.get(a.sessionRef);
  assert.ok(!seen.userRef.includes(name) && !seen.userRef.includes(String(u)) || seen.userRef.length === 24); assert.equal(seen.userRef.length, 24); assert.ok(!JSON.stringify(seen).includes(name));
  const b = await start(s, u); assert.equal(b.resumed, true); assert.equal(b.sessionRef, a.sessionRef); // one open check at a time
  assert.equal((await st(s, u)).status, 'pending');
});
test('PASS: stores only pass + date + provider; every personal field the vendor sends is dropped', async () => {
  const s = mk(); const u = mkUser(s); const a = await start(s, u);
  const pr = s.app.age.provider; pr.decide(a.sessionRef, 'over18'); const raw = await pr.result(a.sessionRef); assert.equal(raw.dateOfBirth, '1990-01-01'); // the vendor DID send personal data...
  const r = await decide(s, u, a.sessionRef, 'over18'); assert.equal(r.status, 'pass'); assert.ok(r.verifiedAt);
  const v = row(s, u); assert.deepEqual(Object.keys(v).sort(), ['provider', 'result', 'user_id', 'verified_at']); assert.equal(v.result, 'pass');
  // ...and none of it is anywhere in the database
  const dump = JSON.stringify([s.db.prepare('SELECT * FROM age_verifications').all(), s.db.prepare('SELECT * FROM age_sessions').all(), s.db.prepare('SELECT * FROM users').all(), s.db.prepare('SELECT * FROM audit_log').all(), s.db.prepare('SELECT * FROM notifications').all()]);
  for (const pii of ['1990-01-01', 'Ada Example', '12345678901', 'base64', 'selfie', 'dateOfBirth']) assert.ok(!dump.includes(pii), pii);
  assert.deepEqual(Object.keys(s.db.prepare('SELECT * FROM age_sessions').get()).sort(), ['created_at', 'done_at', 'id', 'provider', 'session_ref', 'state', 'user_id']);
  assert.equal((await call(s, 'POST', '/api/age/start', { uid: u, body: { consent: true } })).json.error, 'ALREADY_VERIFIED');
});
test('sanitize: the provider boundary only lets an over-18 yes/no through', () => {
  assert.deepEqual(sanitize({ state: 'completed', over18: true, dateOfBirth: 'x', name: 'y' }), { state: 'completed', over18: true });
  assert.deepEqual(sanitize({ state: 'completed' }), { state: 'failed' }); assert.deepEqual(sanitize({ state: 'completed', over18: 'yes' }), { state: 'failed' });
  assert.deepEqual(sanitize({ state: 'pending', over18: true }), { state: 'pending' }); assert.deepEqual(sanitize(null), { state: 'failed' }); assert.deepEqual(sanitize({ state: 'weird' }), { state: 'failed' });
});
test('FAIL (under 18): recorded as fail, blocks buying even in the default mode, cooldown, retry, lock-out after 3, admin reopen', async () => {
  const s = mk('off'); const u = mkUser(s); const a = await start(s, u); assert.equal((await decide(s, u, a.sessionRef, 'under18')).status, 'fail'); assert.equal(row(s, u).result, 'fail');
  const buy = await call(s, 'POST', '/api/payments/topup', { uid: u, body: { pack: 'p1000', email: 'a@b.co' } }); assert.equal(buy.json.error, 'AGE_BLOCKED');
  const again = await call(s, 'POST', '/api/age/start', { uid: u, body: { consent: true } }); assert.equal(again.json.error, 'AGE_COOLDOWN'); assert.ok(again.json.retryInMs > 0);
  s.app.clock.advance(DAY + 1000); const b = await start(s, u); await decide(s, u, b.sessionRef, 'under18'); s.app.clock.advance(DAY + 1000); const c = await start(s, u); await decide(s, u, c.sessionRef, 'under18'); s.app.clock.advance(DAY + 1000);
  assert.equal((await call(s, 'POST', '/api/age/start', { uid: u, body: { consent: true } })).json.error, 'AGE_LOCKED'); assert.equal((await st(s, u)).lockedOut, true);
  const name = s.db.prepare('SELECT username FROM users WHERE id=?').get(u).username; await ok(s, 'POST', `/api/admin/age/${name}/reopen`, { admin: true, body: {} }); assert.equal(row(s, u), undefined); assert.equal((await st(s, u)).lockedOut, false);
  const d = await start(s, u); assert.equal((await decide(s, u, d.sessionRef, 'over18')).status, 'pass');
  await ok(s, 'POST', `/api/admin/age/${name}/reopen`, { admin: true, body: {} }); assert.equal(row(s, u).result, 'pass'); // reopen never touches a pass
});
test('a later FAIL can never overwrite a PASS', async () => {
  const s = mk(); const u = mkUser(s); const a = await start(s, u); await decide(s, u, a.sessionRef, 'over18');
  s.db.prepare("INSERT INTO age_sessions(user_id,session_ref,provider,state,created_at) VALUES (?,?,?,?,?)").run(u, 'forced', 'mock', 'pending', s.app.clock.now()); s.app.age.provider.sessions.set('forced', { userRef: 'x', state: 'completed', over18: false, expiresAt: Date.now() + 1e9 });
  await age.completeCheck(s.app, 'forced'); assert.equal(row(s, u).result, 'pass');
});
test('inconclusive (unreadable): nothing is recorded against the player, they can try again', async () => {
  const s = mk(); const u = mkUser(s); const a = await start(s, u); const r = await decide(s, u, a.sessionRef, 'unreadable'); assert.equal(r.status, 'none'); assert.equal(row(s, u), undefined);
  assert.equal(s.db.prepare('SELECT state FROM age_sessions WHERE session_ref=?').get(a.sessionRef).state, 'inconclusive');
  const b = await start(s, u); assert.notEqual(b.sessionRef, a.sessionRef);
});
test('the browser cannot decide: before the vendor decides the check stays pending; nobody can finish someone else\'s check', async () => {
  const s = mk(); const u = mkUser(s); const o = mkUser(s); const a = await start(s, u);
  assert.equal((await ok(s, 'POST', '/api/age/complete', { uid: u, body: { ref: a.sessionRef } })).status, 'pending'); assert.equal(row(s, u), undefined);
  assert.equal((await call(s, 'POST', '/api/age/complete', { uid: o, body: { ref: a.sessionRef } })).status, 404); assert.equal((await call(s, 'POST', '/api/age/mock/decide', { uid: o, body: { ref: a.sessionRef, outcome: 'over18' } })).status, 404);
  assert.equal((await call(s, 'POST', '/api/age/mock/decide', { uid: u, body: { ref: a.sessionRef, outcome: 'whatever' } })).status, 400);
  assert.equal((await call(s, 'POST', '/api/age/complete', { uid: u, body: { ref: 'nope' } })).status, 404);
});
test('mode "payments": buying needs a recorded pass (tick box is not enough); playing is unaffected', async () => {
  const s = mk('payments'); const u = mkUser(s, { cash: 0 }); assert.equal((await st(s, u)).required, true);
  assert.equal((await call(s, 'POST', '/api/payments/topup', { uid: u, body: { pack: 'p1000', email: 'a@b.co' } })).json.error, 'AGE_CHECK_REQUIRED');
  await ok(s, 'GET', '/api/jobs', { uid: u }); const a = await start(s, u); await decide(s, u, a.sessionRef, 'over18');
  assert.equal((await ok(s, 'POST', '/api/payments/topup', { uid: u, body: { pack: 'p1000', email: 'a@b.co' } })).payment.status, 'pending');
});
test('mode "play": an unverified player can only verify; passing opens the game; bots and the public pages are not blocked', async () => {
  const s = mk('play'); const u = mkUser(s); const bot = mkUser(s, { bot: true });
  const blocked = await call(s, 'GET', '/api/jobs', { uid: u }); assert.equal(blocked.status, 403); assert.equal(blocked.json.error, 'AGE_CHECK_REQUIRED');
  assert.equal((await call(s, 'POST', '/api/heartbeat', { uid: u, body: {} })).json.error, 'AGE_CHECK_REQUIRED');
  await ok(s, 'GET', '/api/me', { uid: u }); await ok(s, 'GET', '/api/config'); await ok(s, 'GET', '/api/age/status', { uid: u }); await ok(s, 'GET', '/api/jobs', { uid: bot });
  const a = await start(s, u); await decide(s, u, a.sessionRef, 'over18'); await ok(s, 'GET', '/api/jobs', { uid: u });
  const f = mkUser(s); const b = await start(s, f); await decide(s, f, b.sessionRef, 'under18'); assert.equal((await call(s, 'GET', '/api/jobs', { uid: f })).json.error, 'AGE_BLOCKED');
});
test('webhook: a signed event triggers a server-side result fetch; bad signatures, unknown sessions and replays are harmless', async () => {
  const s = mk(); const u = mkUser(s); const a = await start(s, u); const pr = s.app.age.provider; pr.decide(a.sessionRef, 'over18'); const wh = pr.webhook(a.sessionRef);
  assert.equal((await call(s, 'POST', '/api/age/webhook', { raw: wh.body, headers: { 'x-age-signature': 'bad' } })).status, 401); assert.equal((await call(s, 'POST', '/api/age/webhook', { raw: wh.body, headers: {} })).status, 401); assert.equal(row(s, u), undefined);
  assert.equal((await call(s, 'POST', '/api/age/webhook', { raw: wh.body, headers: wh.headers })).status, 200); assert.equal(row(s, u).result, 'pass'); const t = row(s, u).verified_at;
  s.app.clock.advance(1000); assert.equal((await call(s, 'POST', '/api/age/webhook', { raw: wh.body, headers: wh.headers })).status, 200); assert.equal(row(s, u).verified_at, t);
  const un = pr.webhook('ghost'); assert.equal((await call(s, 'POST', '/api/age/webhook', { raw: un.body, headers: un.headers })).json.ignored, true);
  assert.equal((await call(s, 'POST', '/api/age/webhook', { raw: Buffer.alloc(0), headers: wh.headers })).status, 400); assert.equal(checkSig(platform, 'sha256', 's', Buffer.from('a'), undefined), false);
});
test('expiry: an unfinished check expires and a new one can start; old session rows (no personal data) are deleted after 30 days', async () => {
  const s = mk(); const u = mkUser(s); const a = await start(s, u); s.app.clock.advance(31 * 60000); assert.equal(age.tickAge(s.app), 1);
  assert.equal(s.db.prepare('SELECT state FROM age_sessions WHERE session_ref=?').get(a.sessionRef).state, 'expired'); assert.equal((await st(s, u)).status, 'none');
  const b = await start(s, u); assert.notEqual(b.sessionRef, a.sessionRef); s.app.clock.advance(31 * 86400000); age.tickAge(s.app); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM age_sessions WHERE session_ref=?').get(a.sessionRef).n, 0); // the old finished row is gone
  s.app.clock.advance(31 * 86400000); age.tickAge(s.app); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM age_sessions').get().n, 0);
});
test('daily start limit stops farming the vendor', async () => {
  const s = mk('off', { maxStartsPerDay: 2 }); const u = mkUser(s); for (let i = 0; i < 2; i++) { const a = await start(s, u); await decide(s, u, a.sessionRef, 'unreadable'); }
  assert.equal((await call(s, 'POST', '/api/age/start', { uid: u, body: { consent: true } })).json.error, 'RATE_LIMIT'); s.app.clock.advance(DAY + 1000); await start(s, u);
});
test('erasure (NDPA): admin can delete everything held about a player; they must verify again if the mode needs it', async () => {
  const s = mk('payments'); const u = mkUser(s); const a = await start(s, u); await decide(s, u, a.sessionRef, 'over18'); const name = s.db.prepare('SELECT username FROM users WHERE id=?').get(u).username;
  assert.equal((await call(s, 'POST', `/api/admin/age/${name}/erase`, { body: {} })).status, 401);
  const e = await ok(s, 'POST', `/api/admin/age/${name}/erase`, { admin: true, body: {} }); assert.deepEqual([e.verifications, e.sessions], [1, 1]);
  assert.equal(s.db.prepare('SELECT COUNT(*) n FROM age_verifications').get().n + s.db.prepare('SELECT COUNT(*) n FROM age_sessions').get().n, 0); assert.equal((await st(s, u)).status, 'none');
  const sum = await ok(s, 'GET', '/api/admin/age', { admin: true }); assert.deepEqual([sum.passed, sum.failed, sum.pending], [0, 0, 0]); assert.match(sum.note, /No personal data/);
});
test('the stand-in provider only exists for the stand-in: decide route is 404 for any other provider id', async () => {
  const s = mk('off', {}, { ageProvider: Object.assign(mockAgeProvider({ platform }), { id: 'somevendor' }) }); const u = mkUser(s); const a = await start(s, u);
  assert.equal((await call(s, 'POST', '/api/age/mock/decide', { uid: u, body: { ref: a.sessionRef, outcome: 'over18' } })).status, 404);
});
test('production guards: the mock age provider cannot be the gate, and the mock payment provider cannot run, in production', () => {
  const old = process.env.NODE_ENV; process.env.NODE_ENV = 'production';
  try {
    assert.throws(() => buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'x', ageConfig: { ...AGE, mode: 'payments' } }), /mock age provider cannot be the age gate/);
    assert.throws(() => buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'x', ageConfig: { ...AGE, mode: 'off' } }), /mock payments provider cannot run in production/);
    assert.throws(() => buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'x', ageConfig: { ...AGE, provider: 'acme' }, payments: false }), /no vendor is chosen/);
  } finally { process.env.NODE_ENV = old; }
});
test('age checks off entirely (no app.age): routes answer 503 for actions, status says disabled', async () => {
  const s = makeServer({ age: false }); const u = mkUser(s); assert.equal((await ok(s, 'GET', '/api/age/status', { uid: u })).enabled, false);
  assert.equal((await call(s, 'POST', '/api/age/start', { uid: u, body: { consent: true } })).status, 503); await ok(s, 'GET', '/api/jobs', { uid: u });
});
