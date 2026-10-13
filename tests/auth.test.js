import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, call, ok } from './helpers.js';

test('auth: signup requires the 18+ checkbox', async () => {
  const s = makeServer();
  const r = await call(s, 'POST', '/api/auth/signup', { body: { username: 'chidi_k', password: 'longenough1' } });
  assert.equal(r.status, 400); assert.equal(r.json.error, 'AGE_REQUIRED');
  const r2 = await call(s, 'POST', '/api/auth/signup', { body: { username: 'chidi_k', password: 'longenough1', age18: 'yes' } });
  assert.equal(r2.json.error, 'AGE_REQUIRED');
});
test('auth: signup validates username/password; usernames unique case-insensitively; passwords stored hashed', async () => {
  const s = makeServer();
  assert.equal((await call(s, 'POST', '/api/auth/signup', { body: { username: 'a', password: 'longenough1', age18: true } })).json.error, 'BAD_USERNAME');
  assert.equal((await call(s, 'POST', '/api/auth/signup', { body: { username: 'ok_name', password: 'short', age18: true } })).json.error, 'BAD_PASSWORD');
  assert.equal((await call(s, 'POST', '/api/auth/signup', { body: { username: '<script>', password: 'longenough1', age18: true } })).json.error, 'BAD_USERNAME');
  const a = await call(s, 'POST', '/api/auth/signup', { body: { username: 'Tunde_O', password: 'longenough1', age18: true } });
  assert.equal(a.status, 200); assert.ok(a.session);
  assert.equal((await call(s, 'POST', '/api/auth/signup', { body: { username: 'tunde_o', password: 'longenough1', age18: true } })).status, 409);
  const row = s.db.prepare('SELECT pass_hash, age_confirmed_at FROM users WHERE username=?').get('Tunde_O');
  assert.match(row.pass_hash, /^\$2[aby]\$/); assert.ok(!row.pass_hash.includes('longenough1')); assert.ok(row.age_confirmed_at > 0);
});
test('auth: login right/wrong password; unknown user same error', async () => {
  const s = makeServer(); await ok(s, 'POST', '/api/auth/signup', { body: { username: 'ngozi', password: 'secret-pass-1', age18: true } });
  assert.equal((await call(s, 'POST', '/api/auth/login', { body: { username: 'ngozi', password: 'secret-pass-1' } })).status, 200);
  const w = await call(s, 'POST', '/api/auth/login', { body: { username: 'ngozi', password: 'nope' } }); assert.equal(w.status, 401);
  const u = await call(s, 'POST', '/api/auth/login', { body: { username: 'nobody', password: 'nope' } }); assert.equal(u.status, 401); assert.equal(u.json.message, w.json.message);
});
test('auth: guest play is turned off', async () => {
  const s = makeServer();
  const g = await call(s, 'POST', '/api/auth/guest', { body: { age18: true } });
  assert.equal(g.status, 403); assert.equal(g.json.error, 'GUESTS_OFF');
});
test('auth: a new account starts with ₦100,000', async () => {
  const s = makeServer();
  const a = await ok(s, 'POST', '/api/auth/signup', { body: { username: 'ada_n', password: 'longenough1', age18: true } });
  assert.equal(a.user.cash, 100000);
});
test('auth: protected routes need a session; admin routes need admin', async () => {
  const s = makeServer();
  assert.equal((await call(s, 'GET', '/api/me')).status, 401);
  assert.equal((await call(s, 'POST', '/api/heartbeat', { body: {} })).status, 401);
  assert.equal((await call(s, 'GET', '/api/admin/queue')).status, 401);
  assert.equal((await call(s, 'GET', '/api/admin/queue', { admin: true })).status, 200);
});
test('auth: admin login uses env password; wrong password rejected; disabled when no password configured', async () => {
  const s = makeServer(); assert.equal((await call(s, 'POST', '/api/admin/login', { body: { password: 'x' } })).status, 401);
  assert.equal((await call(s, 'POST', '/api/admin/login', { body: { password: 'test-admin' } })).admin, true);
  const s2 = makeServer(); s2.app.adminPassword = null;
  assert.equal((await call(s2, 'POST', '/api/admin/login', { body: { password: 'anything' } })).status, 503);
});
test('auth: login attempts are rate limited per IP', async () => {
  const s = makeServer(); let last;
  for (let i = 0; i < 25; i++) last = await call(s, 'POST', '/api/auth/login', { body: { username: 'x', password: 'y' }, ip: '9.9.9.9' });
  assert.equal(last.status, 429);
});
test('auth: HTTP signed-cookie session round trip + tampered cookie rejected + cross-origin POST blocked', async () => {
  const s = makeServer(); await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
  try {
    const r = await fetch(base + '/api/auth/signup', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ username: 'cookie_user', password: 'longenough1', age18: true }) });
    const cookie = r.headers.get('set-cookie').split(';')[0]; assert.match(r.headers.get('set-cookie'), /HttpOnly/);
    assert.equal((await fetch(base + '/api/me', { headers: { cookie } })).status, 200);
    const bad = cookie.slice(0, -3) + 'xxx'; assert.equal((await fetch(base + '/api/me', { headers: { cookie: bad } })).status, 401);
    const x = await fetch(base + '/api/chat', { method: 'POST', headers: { cookie, 'content-type': 'application/json', origin: 'https://evil.example' }, body: '{"text":"hi"}' }); assert.equal(x.status, 403);
  } finally { await s.close(); }
});
test('dev routes are 404 unless NA_DEV is on', async () => {
  const s = makeServer({ dev: false }); const g = await ok(s, 'POST', '/api/auth/signup', { body: { username: 'dev_off', password: 'longenough1', age18: true } });
  assert.equal((await call(s, 'POST', '/api/dev/teleport', { uid: g.user.id, body: { x: 0, z: 0 } })).status, 404);
});
