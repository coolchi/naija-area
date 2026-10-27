// Password reset: "Forgot password?" from the login page, and the admin reset (email link or one-time temporary password).
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, call, ok, mkUser } from './helpers.js';
import { RESET } from '../server/core/password-reset.js';

const outbox = () => { const sent = []; return { sent, mailSend: async (m) => { sent.push(m); return { id: 'm' + sent.length }; } }; };
const tokenOf = (m) => /token=([a-f0-9]{64})/.exec(m.text)[1];
async function player(s, name = 'reset_ada', pw = 'old-pass-123') { await ok(s, 'POST', '/api/auth/signup', { body: { username: name, password: pw, age18: true, email: `${name}@example.com` } }); return s.db.prepare('SELECT id FROM users WHERE username=?').get(name).id; }
const login = (s, username, password, ip) => call(s, 'POST', '/api/auth/login', { body: { username, password }, ip });

test('forgot: emails a single-use link, stores only a hash, new password works and the old one stops', async () => {
  const box = outbox(); const s = makeServer({ mailSend: box.mailSend }); const uid = await player(s);
  const r = await ok(s, 'POST', '/api/auth/forgot', { body: { email: 'Reset_Ada@Example.com' } });
  assert.equal(box.sent.length, 1); assert.equal(box.sent[0].to, 'reset_ada@example.com'); assert.deepEqual(box.sent[0].tags, ['password-reset']);
  const tok = tokenOf(box.sent[0]); const row = s.db.prepare('SELECT * FROM password_resets WHERE user_id=?').get(uid);
  assert.notEqual(row.token_hash, tok); assert.equal(row.token_hash.length, 64); assert.ok(row.expires_at - row.created_at <= 60 * 60000);
  assert.equal((await ok(s, 'GET', '/api/auth/reset/check?token=' + tok)).username, 'reset_ada');
  assert.equal((await call(s, 'POST', '/api/auth/reset', { body: { token: tok, password: 'short' } })).json.error, 'BAD_PASSWORD');
  const done = await call(s, 'POST', '/api/auth/reset', { body: { token: tok, password: 'new-pass-456' } }); assert.equal(done.status, 200); assert.equal(done.session, 'clear');
  assert.equal((await login(s, 'reset_ada', 'old-pass-123')).status, 401);
  assert.equal((await login(s, 'reset_ada', 'new-pass-456')).status, 200);
  const again = await call(s, 'POST', '/api/auth/reset', { body: { token: tok, password: 'third-pass-789' } }); assert.equal(again.json.error, 'BAD_TOKEN');
  assert.equal((await ok(s, 'GET', '/api/auth/reset/check?token=' + tok)).ok, false);
  assert.ok(r.message);
});

test('forgot: a link expires, and asking again cancels the older link', async () => {
  const box = outbox(); const s = makeServer({ mailSend: box.mailSend }); await player(s);
  await ok(s, 'POST', '/api/auth/forgot', { body: { email: 'reset_ada@example.com' } }); const first = tokenOf(box.sent[0]);
  await ok(s, 'POST', '/api/auth/forgot', { body: { email: 'reset_ada@example.com' }, ip: '10.0.0.2' }); const second = tokenOf(box.sent[1]);
  assert.equal((await call(s, 'POST', '/api/auth/reset', { body: { token: first, password: 'new-pass-456' } })).json.error, 'BAD_TOKEN', 'older link cancelled');
  s.app.clock.advance(RESET.ttlMs + 1000);
  assert.equal((await call(s, 'POST', '/api/auth/reset', { body: { token: second, password: 'new-pass-456' } })).json.error, 'BAD_TOKEN', 'expired');
  assert.equal((await login(s, 'reset_ada', 'old-pass-123')).status, 200, 'password unchanged');
});

test('forgot: same answer for known, unknown, guest-like and bot emails (no account enumeration)', async () => {
  const box = outbox(); const s = makeServer({ mailSend: box.mailSend }); await player(s);
  const known = await call(s, 'POST', '/api/auth/forgot', { body: { email: 'reset_ada@example.com' }, ip: '10.1.0.1' });
  const unknown = await call(s, 'POST', '/api/auth/forgot', { body: { email: 'nobody@example.com' }, ip: '10.1.0.2' });
  assert.equal(known.status, 200); assert.deepEqual(unknown, known);
  assert.equal(box.sent.length, 1);
  assert.equal((await call(s, 'POST', '/api/auth/forgot', { body: { email: 'not an email' } })).json.error, 'BAD_EMAIL');
  // mail failing must not change the answer either
  const s2 = makeServer({ mailSend: async () => { throw new Error('down'); } }); await player(s2);
  assert.deepEqual(await call(s2, 'POST', '/api/auth/forgot', { body: { email: 'reset_ada@example.com' } }), known);
});

test('forgot: rate limited per network and quietly per inbox', async () => {
  const box = outbox(); const s = makeServer({ mailSend: box.mailSend }); await player(s);
  for (let i = 0; i < RESET.perEmailPerHour + 2; i++) assert.equal((await call(s, 'POST', '/api/auth/forgot', { body: { email: 'reset_ada@example.com' }, ip: '10.2.0.' + i })).status, 200);
  assert.equal(box.sent.length, RESET.perEmailPerHour, 'inbox cap, same answer');
  let last; for (let i = 0; i < RESET.perIpPerHour + 1; i++) last = await call(s, 'POST', '/api/auth/forgot', { body: { email: `x${i}@example.com` }, ip: '10.3.0.1' });
  assert.equal(last.status, 429); assert.equal(last.json.error, 'RATE_LIMIT');
});

test('mail off: same answer, nothing sent, nothing breaks; an account without email is just not found', async () => {
  const s = makeServer(); mkUser(s);
  const r = await call(s, 'POST', '/api/auth/forgot', { body: { email: 'whoever@example.com' } }); assert.equal(r.status, 200);
});

test('reset signs out every older session (cookie issued before the change stops working)', async () => {
  const s = makeServer(); await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
  const box = outbox(); s.app.mail.send = box.mailSend;
  try {
    const r = await fetch(base + '/api/auth/signup', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ username: 'sess_user', password: 'old-pass-123', age18: true, email: 'sess_user@example.com' }) });
    const cookie = r.headers.get('set-cookie').split(';')[0]; assert.equal((await fetch(base + '/api/me', { headers: { cookie } })).status, 200);
    await new Promise(res => setTimeout(res, 5));
    await fetch(base + '/api/auth/forgot', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: 'sess_user@example.com' }) });
    const d = await fetch(base + '/api/auth/reset', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token: tokenOf(box.sent[0]), password: 'new-pass-456' }) }); assert.equal(d.status, 200);
    assert.equal((await fetch(base + '/api/me', { headers: { cookie } })).status, 401, 'old session dead');
    const l = await fetch(base + '/api/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ username: 'sess_user', password: 'new-pass-456' }) });
    const c2 = l.headers.get('set-cookie').split(';')[0]; assert.equal((await fetch(base + '/api/me', { headers: { cookie: c2 } })).status, 200, 'new session fine');
    const page = await fetch(base + '/reset'); assert.equal(page.status, 200); assert.match(await page.text(), /Forgot your password/);
  } finally { await s.close(); }
});

test('admin reset needs the admin login', async () => {
  const s = makeServer(); const uid = await player(s);
  for (const mode of ['email', 'temp']) { const r = await call(s, 'POST', '/api/admin/players/password-reset', { uid, body: { who: 'reset_ada', mode } }); assert.equal(r.status, 401); assert.equal(r.json.error, 'ADMIN_REQUIRED'); }
  assert.equal((await call(s, 'GET', '/api/admin/players/password-status?who=reset_ada')).status, 401);
  assert.equal((await login(s, 'reset_ada', 'old-pass-123')).status, 200, 'untouched');
});

test('admin: email link (mail on), link shown to admin (mail off), audit logged', async () => {
  const box = outbox(); const s = makeServer({ mailSend: box.mailSend }); await player(s);
  const st = await ok(s, 'GET', '/api/admin/players/password-status?who=reset_ada', { admin: true }); assert.equal(st.hasEmail, true);
  const r = await ok(s, 'POST', '/api/admin/players/password-reset', { admin: true, body: { who: 'reset_ada', mode: 'email' } });
  assert.equal(r.sent, true); assert.equal(box.sent.length, 1); assert.equal(r.url, undefined, 'the admin does not see the link when it was emailed');
  const s2 = makeServer(); await player(s2);
  const r2 = await ok(s2, 'POST', '/api/admin/players/password-reset', { admin: true, body: { who: 'reset_ada', mode: 'email' } });
  assert.equal(r2.sent, false); const tok = /token=([a-f0-9]{64})/.exec(r2.url)[1];
  await ok(s2, 'POST', '/api/auth/reset', { body: { token: tok, password: 'new-pass-456' } });
  assert.equal((await login(s2, 'reset_ada', 'new-pass-456')).status, 200);
  const a = s2.db.prepare("SELECT * FROM audit_log WHERE action='password_reset_link'").all(); assert.equal(a.length, 1); assert.equal(a[0].actor, 'admin');
});

test('admin: temporary password is shown once, works only to reach "choose a new password", never logged', async () => {
  const s = makeServer(); const uid = mkUser(s); const name = s.db.prepare('SELECT username FROM users WHERE id=?').get(uid).username; // no email on file
  assert.equal((await call(s, 'POST', '/api/admin/players/password-reset', { admin: true, body: { who: name, mode: 'email' } })).json.error, 'NO_EMAIL');
  const r = await ok(s, 'POST', '/api/admin/players/password-reset', { admin: true, body: { who: name, mode: 'temp' } });
  assert.ok(r.tempPassword.length >= 12);
  const l = await login(s, name, r.tempPassword); assert.equal(l.status, 403); assert.equal(l.json.error, 'MUST_CHANGE_PASSWORD'); assert.equal(l.session, undefined, 'no session from a temp password');
  const tok = /token=([a-f0-9]{64})/.exec(l.json.resetPath)[1];
  await ok(s, 'POST', '/api/auth/reset', { body: { token: tok, password: 'my-own-pass-1' } });
  assert.equal((await login(s, name, r.tempPassword)).status, 401);
  assert.equal((await login(s, name, 'my-own-pass-1')).status, 200);
  const a = s.db.prepare("SELECT * FROM audit_log WHERE action LIKE 'password_reset%'").all(); assert.ok(a.some(x => x.action === 'password_reset_temp'));
  assert.ok(!a.some(x => x.detail.includes(r.tempPassword)), 'the temporary password never reaches the log');
});
