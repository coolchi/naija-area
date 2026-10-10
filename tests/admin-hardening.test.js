// Admin hardening and metrics (10 Oct 2026): TOTP second factor, lock-out, IP allow-list for /admin, the /metrics endpoint.
import test from 'node:test'; import assert from 'node:assert/strict'; import crypto from 'node:crypto';
import { makeServer, ok, call, mkUser } from './helpers.js';
import { buildServer } from '../server/createServer.js';
import * as totp from '../server/lib/totp.js';
import { adminSettings, ipAllowed } from '../server/core/admin-guard.js';
import { renderMetrics } from '../server/core/metrics.js';

const hmac = (k, m) => crypto.createHmac('sha1', Buffer.from(k)).update(Buffer.from(m)).digest();
const SECRET = totp.newSecret(crypto.randomBytes(20).toString('hex'));
const codeNow = (s, off = 0) => totp.codeAt(SECRET, totp.stepOf(s.app.clock.now()) + off, hmac);
const login = (s, body, ip = '10.0.0.1') => call(s, 'POST', '/api/admin/login', { body, ip });

test('TOTP matches the RFC 6238 test vectors (SHA1) and base32 round-trips', () => {
  const k = totp.base32Encode(Buffer.from('12345678901234567890')); assert.equal(k, 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ'); assert.equal(Buffer.from(totp.base32Decode(k)).toString(), '12345678901234567890');
  for (const [t, code] of [[59, '287082'], [1111111109, '081804'], [1111111111, '050471'], [1234567890, '005924'], [2000000000, '279037'], [20000000000, '353130']]) assert.equal(totp.codeAt(k, Math.floor(t / 30), hmac), code, `T=${t}`);
  assert.equal(totp.verify(k, '287082', 59000, hmac), 1); assert.equal(totp.verify(k, '287082', 59000 + 30000, hmac), 1, 'one step of drift allowed'); assert.equal(totp.verify(k, '287082', 59000 + 90000, hmac), null); assert.equal(totp.verify(k, 'abcdef', 59000, hmac), null); assert.equal(totp.verify(k, '287082', 59000, hmac, { lastStep: 1 }), null, 'replay refused');
  assert.match(totp.otpauthUri(k, 'admin'), /^otpauth:\/\/totp\/Naija%20Area:admin\?secret=GEZ/);
});
test('settings: 2FA is required in production unless explicitly switched off; a bad secret is flagged; allow-list parses', () => {
  assert.equal(adminSettings({}, { prod: false }).required, false); assert.equal(adminSettings({}, { prod: true }).required, true); assert.equal(adminSettings({ NA_ADMIN_2FA: 'off' }, { prod: true }).required, false); assert.equal(adminSettings({ ADMIN_TOTP_SECRET: SECRET }, { prod: false }).required, true);
  assert.equal(adminSettings({ ADMIN_TOTP_SECRET: 'short!' }).secretInvalid, true); assert.deepEqual(adminSettings({ NA_ADMIN_ALLOW_IPS: ' 1.2.3.4 , 10.0.0.0/8 ' }).allow, ['1.2.3.4', '10.0.0.0/8']);
  assert.equal(ipAllowed([], '9.9.9.9'), true); assert.equal(ipAllowed(['1.2.3.4'], '1.2.3.4'), true); assert.equal(ipAllowed(['1.2.3.4'], '::ffff:1.2.3.4'), true); assert.equal(ipAllowed(['10.0.0.0/8'], '10.200.1.1'), true); assert.equal(ipAllowed(['10.0.0.0/8'], '11.0.0.1'), false); assert.equal(ipAllowed(['203.0.113.0/24'], '203.0.113.255'), true); assert.equal(ipAllowed(['1.2.3.4'], '1.2.3.5'), false); assert.equal(ipAllowed(['::1'], '::1'), true);
});
test('admin login with 2FA: password alone is refused, a wrong code is refused, the right code works once, the cookie flag comes back', async () => {
  const s = makeServer({ adminEnv: { ADMIN_TOTP_SECRET: SECRET } }); const pw = 'test-admin';
  assert.equal((await login(s, { password: pw })).json.error, 'BAD_LOGIN'); assert.equal((await login(s, { password: pw, code: '000000' })).json.error, 'BAD_LOGIN'); assert.equal((await login(s, { password: 'wrong', code: codeNow(s) })).json.error, 'BAD_LOGIN');
  const good = await login(s, { password: pw, code: codeNow(s) }); assert.equal(good.status, 200); assert.equal(good.admin, true); assert.equal(good.json.twoFactor, true);
  assert.equal((await login(s, { password: pw, code: codeNow(s) })).json.error, 'BAD_LOGIN', 'the same code cannot be used twice'); s.app.clock.advance?.(31000); assert.equal((await login(s, { password: pw, code: codeNow(s, 0) })).status, 200, 'the next step works');
});
test('without a secret (dev) the password alone still works; in production without 2FA the login is locked with a clear message', async () => {
  const s = makeServer(); assert.equal((await login(s, { password: 'test-admin' })).status, 200); const p = makeServer(); p.app.adminCfg = adminSettings({}, { prod: true }); const r = await login(p, { password: 'test-admin' }); assert.equal(r.status, 503); assert.equal(r.json.error, 'ADMIN_2FA_NOT_SET');
});
test('five wrong attempts lock that address for 15 minutes, even for the right password; another address is not affected; the lock lifts', async () => {
  const s = makeServer({ adminEnv: { ADMIN_TOTP_SECRET: SECRET } }); const pw = 'test-admin';
  for (let i = 0; i < 5; i++) assert.equal((await login(s, { password: 'nope', code: '123456' }, '10.9.9.9')).json.error, 'BAD_LOGIN'); const l = await login(s, { password: pw, code: codeNow(s) }, '10.9.9.9'); assert.equal(l.status, 429); assert.equal(l.json.error, 'ADMIN_LOCKED');
  assert.equal((await login(s, { password: pw, code: codeNow(s) }, '10.8.8.8')).status, 200); s.app.clock.advance(16 * 60000); assert.equal((await login(s, { password: pw, code: codeNow(s) }, '10.9.9.9')).status, 200);
});
test('HTTP: /admin and /api/admin answer 404 to addresses outside NA_ADMIN_ALLOW_IPS and normally to listed ones; admin pages are never cached or indexed', async () => {
  for (const [allow, blocked] of [['203.0.113.7', true], ['127.0.0.1', false], ['', false]]) {
    const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'x'.repeat(12), dev: true, adminEnv: { NA_ADMIN_ALLOW_IPS: allow } }); await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
    try { for (const p of ['/admin', '/js/admin.js', '/js/admin-office.js', '/api/admin/overview']) { const r = await fetch(base + p); assert.equal(r.status === 404, blocked || false, `${p} allow=${allow}: ${r.status}`); if (!blocked) { assert.match(r.headers.get('cache-control') || '', /no-store/); assert.match(r.headers.get('x-robots-tag') || '', /noindex/); } }
      assert.equal((await fetch(base + '/healthz')).status, 200, 'health stays open'); assert.equal((await fetch(base + '/')).status, 200, 'the game stays open'); } finally { await s.close(); }
  }
});
test('metrics: hidden (404) without a token or admin session; the bearer token or an admin cookie reads Prometheus text with counts only', async () => {
  const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'x'.repeat(12), dev: true, metricsToken: 'm'.repeat(30) }); await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${s.server.address().port}`;
  try {
    assert.equal((await fetch(base + '/metrics')).status, 404); assert.equal((await fetch(base + '/metrics', { headers: { authorization: 'Bearer wrong' } })).status, 404);
    await fetch(base + '/api/me'); await fetch(base + '/api/nothing-here');
    const r = await fetch(base + '/metrics', { headers: { authorization: 'Bearer ' + 'm'.repeat(30) } }); assert.equal(r.status, 200); assert.match(r.headers.get('content-type'), /text\/plain/); const t = await r.text();
    for (const k of ['na_up 1', 'na_db_ok 1', 'na_ledger_balanced 1', 'na_players_online ', 'na_users_total ', 'na_applications_open ', 'na_reports_open ', 'na_process_rss_bytes ', 'na_api_duration_ms_bucket{le="+Inf"}', 'na_http_requests_total{class="4xx"}']) assert.ok(t.includes(k), k);
    assert.match(t, /na_http_requests_total\{class="4xx"\} [1-9]/); assert.ok(!/username|password|email/i.test(t), 'no personal data');
    const login = await fetch(base + '/api/admin/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password: 'x'.repeat(12) }) }); const cookie = login.headers.get('set-cookie').split(';')[0]; assert.equal((await fetch(base + '/metrics', { headers: { cookie } })).status, 200, 'admin session');
  } finally { await s.close(); }
});
test('metrics reflect the database and flag a broken ledger', () => {
  const s = makeServer(); mkUser(s); const t = renderMetrics(s.app, { version: '1.2.3' }); assert.match(t, /na_build_info\{version="1.2.3"\} 1/); assert.match(t, /na_users_total [1-9]/); assert.match(t, /na_ledger_balanced 1/);
  s.app.db.prepare("UPDATE accounts SET balance = balance + 5 WHERE id LIKE 'u:%'").run(); s.app.metrics.ledger.at = 0; assert.match(renderMetrics(s.app), /na_ledger_balanced 0/);
});
