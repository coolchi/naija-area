// Launch PREPARATION (10 Oct 2026): health endpoints, configuration validation, the example environment file, backups, deploy files, legal placeholders.
// Nothing here deploys anything or talks to a provider. The Docker, systemd, nginx and Caddy files are only checked for content, NOT run (the tools are not installed).
import test from 'node:test'; import assert from 'node:assert/strict';
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
import Database from 'better-sqlite3';
import { buildServer } from '../server/createServer.js';
import { checkConfig, parseEnvFile, formatReport } from '../server/lib/config-check.js';
import { backupSqlite } from '../scripts/backup-sqlite.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..'); const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const GOOD = { NODE_ENV: 'production', NA_PUBLIC_URL: 'https://play.example.org', NA_TRUST_PROXY: '1', SESSION_SECRET: 'a'.repeat(8) + 'b3f9c1d2e4a5968778695a4b3c2d1e0f1122334455667788', ADMIN_PASSWORD: 'correct-horse-battery-staple-9', NA_DATA_DIR: '/var/lib/naija-area',
  NA_PAYMENTS_PROVIDER: 'monipay', MONIPAY_SECRET_KEY: 'pri_test_abc123', MONIPAY_PUBLIC_KEY: 'pub_test_abc123', MONIPAY_WEBHOOK_SECRET: 'whsec-9f8e7d6c5b4a39281716', NA_AGE_CHECK: 'off', NA_AGE_PROVIDER: 'mock' };
const withEnv = (o) => ({ ...GOOD, ...o }); const errs = (env, opts) => checkConfig(env, opts).errors.join(' | '); const warns = (env, opts) => checkConfig(env, opts).warnings.join(' | ');

async function up(opts = {}) { const s = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'test-admin', ...opts }); await new Promise(r => s.server.listen(0, '127.0.0.1', r)); return { s, base: `http://127.0.0.1:${s.server.address().port}` }; }

test('health: /healthz says ok without a login or a database, /readyz proves the database answers, both are never cached and leak no secrets', async () => {
  const { s, base } = await up();
  try {
    const h = await fetch(`${base}/healthz`); assert.equal(h.status, 200); assert.equal((await h.text()), 'ok'); assert.match(h.headers.get('cache-control'), /no-store/);
    const r = await fetch(`${base}/readyz`); assert.equal(r.status, 200); const j = await r.json(); assert.equal(j.ok, true); assert.equal(j.db, 'sqlite'); assert.ok(j.uptimeSec >= 0); assert.match(r.headers.get('cache-control'), /no-store/);
    assert.deepEqual(Object.keys(j).sort(), ['db', 'ok', 'uptimeSec', 'version'], 'only these fields'); const txt = JSON.stringify(j); assert.ok(!/secret|password|key|token/i.test(txt));
    const a = await (await fetch(`${base}/api/health`)).json(); assert.equal(a.ok, true, 'the older endpoint still works');
    s.db.close(); const bad = await fetch(`${base}/readyz`); assert.equal(bad.status, 503, 'database gone: not ready'); assert.deepEqual(await bad.json(), { ok: false, db: 'sqlite', error: 'DATABASE_UNAVAILABLE' }); assert.equal((await fetch(`${base}/healthz`)).status, 200, 'but the process is still alive');
  } finally { s.timers?.forEach?.(clearInterval); await new Promise(r => s.server.close(r)); }
});
test('NA_TRUST_PROXY is a number of proxies, not "believe everything": 1 trusts one hop, unset trusts none', async () => {
  const old = process.env.NA_TRUST_PROXY; try {
    process.env.NA_TRUST_PROXY = '1'; const a = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'x' }); assert.equal(a.ex.get('trust proxy'), 1); a.db.close();
    process.env.NA_TRUST_PROXY = '2'; const b = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'x' }); assert.equal(b.ex.get('trust proxy'), 2); b.db.close();
    delete process.env.NA_TRUST_PROXY; const c = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'x' }); assert.equal(c.ex.get('trust proxy'), false); c.db.close();
    process.env.NA_TRUST_PROXY = 'true'; const d = buildServer({ dbPath: ':memory:', quiet: true, adminPassword: 'x' }); assert.equal(d.ex.get('trust proxy'), false, 'the word "true" is not accepted (it would trust a faked first address)'); d.db.close();
  } finally { if (old === undefined) delete process.env.NA_TRUST_PROXY; else process.env.NA_TRUST_PROXY = old; }
});
test('config check: a complete production setup passes (with warnings that tell the truth about SQLite, the tick-box age check and test-mode payments)', () => {
  const r = checkConfig(GOOD); assert.equal(r.ok, true, formatReport(r)); assert.equal(r.production, true); assert.match(r.warnings.join('|'), /SQLite/); assert.match(r.warnings.join('|'), /NOT a real age check/); assert.match(r.info.join('|'), /TEST MODE/); assert.match(formatReport(r), /RESULT: OK/);
});
test('config check: production refuses missing or weak secrets, dev mode, an http or localhost public address, and placeholders', () => {
  assert.match(errs(withEnv({ SESSION_SECRET: undefined })), /SESSION_SECRET is not set/); assert.match(errs(withEnv({ SESSION_SECRET: 'short' })), /SESSION_SECRET/); assert.match(errs(withEnv({ SESSION_SECRET: 'changeme' })), /SESSION_SECRET/);
  assert.match(errs(withEnv({ ADMIN_PASSWORD: undefined })), /ADMIN_PASSWORD is not set/); assert.match(errs(withEnv({ ADMIN_PASSWORD: 'admin-dev-only' })), /ADMIN_PASSWORD/); assert.match(errs(withEnv({ ADMIN_PASSWORD: 'tooshort' })), /ADMIN_PASSWORD/); assert.match(errs(withEnv({ ADMIN_PASSWORD: GOOD.SESSION_SECRET })), /must differ/);
  assert.match(errs(withEnv({ NA_DEV: '1' })), /NA_DEV=1/); assert.match(errs(withEnv({ NA_PUBLIC_URL: 'http://play.example.org' })), /https:\/\//); assert.match(errs(withEnv({ NA_PUBLIC_URL: 'https://localhost:3000' })), /localhost/); assert.match(errs(withEnv({ NA_PUBLIC_URL: undefined })), /NA_PUBLIC_URL is not set/);
  assert.match(errs(withEnv({ MONIPAY_SECRET_KEY: 'pri_test_CHANGE_ME' })), /CHANGE_ME/); assert.match(errs(withEnv({ PORT: '99999' })), /PORT/);
  assert.match(warns(withEnv({ NA_TRUST_PROXY: undefined })), /NA_TRUST_PROXY/); assert.match(warns(withEnv({ HOST: '0.0.0.0', NA_TRUST_PROXY: undefined })), /every interface/); assert.match(warns(withEnv({ NA_PREVIEW_CITIES: '1', NA_CRASH_SEED: '5' })), /preview cities.*|NA_CRASH_SEED/s);
  const dev = checkConfig({ NODE_ENV: 'development' }); assert.equal(dev.ok, true, 'development is lenient'); assert.equal(dev.production, false); assert.match(dev.warnings.join('|'), /would be an error in production/);
});
test('config check: payments are TEST MODE only (live keys and the mock provider are refused in production), the age mock cannot be the gate, databases and optional providers are validated', () => {
  assert.match(errs(withEnv({ NA_PAYMENTS_PROVIDER: 'mock' })), /REFUSES to start in production with the mock/); assert.match(errs(withEnv({ MONIPAY_SECRET_KEY: 'pri_live_abc' })), /pri_test_/); assert.match(errs(withEnv({ MONIPAY_PUBLIC_KEY: 'pub_live_abc' })), /pub_test_/); assert.match(errs(withEnv({ MONIPAY_WEBHOOK_SECRET: undefined })), /MONIPAY_WEBHOOK_SECRET is not set/); assert.match(errs(withEnv({ NA_PAYMENTS_PROVIDER: 'stripe' })), /not known/);
  assert.match(errs(withEnv({ NA_VAT_RATE: '7.5' })), /fraction/);
  assert.match(errs(withEnv({ NA_AGE_CHECK: 'play' })), /mock age provider/); assert.match(errs(withEnv({ NA_AGE_CHECK: 'sometimes' })), /NA_AGE_CHECK/); assert.match(errs(withEnv({ NA_AGE_PROVIDER: 'veriff' })), /no vendor has been chosen/); assert.equal(checkConfig(withEnv({ NA_AGE_CHECK: 'play' }), { production: false }).ok, true);
  assert.match(errs(withEnv({ NA_DATABASE_URL: 'mysql://x@y/z' })), /postgres/); assert.match(errs(withEnv({ NA_DATABASE_URL: 'not a url' })), /not a valid URL/); assert.match(warns(withEnv({ NA_DATABASE_URL: 'postgres://u:p@db.example.net:5432/n' })), /be encrypted/); assert.equal(checkConfig(withEnv({ NA_DATABASE_URL: 'postgres://u:pw-9x@db.example.net:5432/n', NA_DB_SSL: '1' })).ok, true);
  assert.match(errs(withEnv({ NA_DATABASE_URL: 'postgres://u:CHANGE_ME@127.0.0.1/n' })), /CHANGE_ME/); assert.match(warns(withEnv({ NA_DATABASE_URL: 'postgres://u:pw-9x@127.0.0.1/n', NA_DB_SINGLE_INSTANCE: '0' })), /exactly one/);
  assert.match(errs(withEnv({ NA_SCORES_PROVIDER: 'api-football' })), /APIFOOTBALL_KEY/); assert.match(errs(withEnv({ NA_TURN_URLS: 'turn:x:3478' })), /set together/); assert.match(errs(withEnv({ NA_BCRYPT_COST: '99' })), /NA_BCRYPT_COST/); assert.match(warns(withEnv({ NA_BCRYPT_COST: '6' })), /too weak/);
});
test('example environment file: it parses, it lists every variable the checker knows, and it FAILS the production check until the placeholders are replaced (then it passes)', () => {
  const text = read('deploy/env.production.example'); const env = parseEnvFile(text); assert.equal(env.NODE_ENV, 'production'); assert.equal(env.NA_PAYMENTS_PROVIDER, 'monipay'); assert.equal(env.NA_TRUST_PROXY, '1'); assert.equal(env.HOST, '127.0.0.1', 'inline comments are stripped');
  const r = checkConfig(env); assert.equal(r.ok, false); assert.ok(r.errors.filter(e => /CHANGE_ME/.test(e)).length >= 5, 'every secret and the domain are placeholders'); assert.ok(!/pri_live_|pub_live_/.test(text));
  const filled = parseEnvFile(text.replace(/SESSION_SECRET=CHANGE_ME/, `SESSION_SECRET=${GOOD.SESSION_SECRET}`).replace(/ADMIN_PASSWORD=CHANGE_ME/, `ADMIN_PASSWORD=${GOOD.ADMIN_PASSWORD}`).replace(/NA_PUBLIC_URL=https:\/\/CHANGE_ME/, 'NA_PUBLIC_URL=https://play.example.org').replace(/pri_test_CHANGE_ME/, 'pri_test_k1').replace(/pub_test_CHANGE_ME/, 'pub_test_k1').replace(/MONIPAY_WEBHOOK_SECRET=CHANGE_ME/, 'MONIPAY_WEBHOOK_SECRET=whsec-9f8e7d6c5b4a39281716'));
  const r2 = checkConfig(filled); assert.equal(r2.ok, true, formatReport(r2));
  for (const k of ['SESSION_SECRET', 'ADMIN_PASSWORD', 'NA_PUBLIC_URL', 'NA_TRUST_PROXY', 'NA_PAYMENTS_PROVIDER', 'MONIPAY_SECRET_KEY', 'MONIPAY_PUBLIC_KEY', 'MONIPAY_WEBHOOK_SECRET', 'NA_AGE_CHECK', 'NA_DATA_DIR']) assert.ok(k in env, `${k} is in the template`);
  assert.deepEqual(parseEnvFile('# c\nA=1\nexport B="two words"\nC=3 # note\n\nbad line'), { A: '1', B: 'two words', C: '3' });
});
test('check-config CLI: exit code 1 for the template, 0 for a good file, never prints secret values', async () => {
  const { spawnSync } = await import('node:child_process'); const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'na-cfg-')); const f = path.join(tmp, 'good.env'); fs.writeFileSync(f, Object.entries(GOOD).map(([k, v]) => `${k}=${v}`).join('\n'));
  const a = spawnSync(process.execPath, ['scripts/check-config.mjs', '--file', 'deploy/env.production.example', '--production'], { cwd: root, encoding: 'utf8' }); assert.equal(a.status, 1); assert.match(a.stdout, /RESULT: \d+ error/);
  const b = spawnSync(process.execPath, ['scripts/check-config.mjs', '--file', f, '--production'], { cwd: root, encoding: 'utf8' }); assert.equal(b.status, 0, b.stdout); assert.ok(!b.stdout.includes(GOOD.SESSION_SECRET) && !b.stdout.includes(GOOD.ADMIN_PASSWORD) && !b.stdout.includes(GOOD.MONIPAY_SECRET_KEY));
  assert.equal(spawnSync(process.execPath, ['scripts/check-config.mjs', '--file', path.join(tmp, 'nope.env')], { cwd: root }).status, 2);
});
test('the server itself refuses to start in production with a bad configuration (and does not print the secrets)', async () => {
  const { spawnSync } = await import('node:child_process'); const r = spawnSync(process.execPath, ['server/index.js'], { cwd: root, encoding: 'utf8', timeout: 20000, env: { PATH: process.env.PATH, NODE_ENV: 'production', SESSION_SECRET: 'tiny', NA_DATA_DIR: fs.mkdtempSync(path.join(os.tmpdir(), 'na-prod-')) } });
  assert.equal(r.status, 1); assert.match(r.stderr, /Refusing to start in production/); assert.match(r.stderr, /SESSION_SECRET/); assert.ok(!r.stderr.includes('tiny'));
});
test('SQLite backup: an online backup opens, passes the integrity check, holds the same rows, files are private, and only the newest N are kept', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'na-bk-')); const src = path.join(tmp, 'game.db'); const db = new Database(src); db.pragma('journal_mode = WAL'); db.exec('CREATE TABLE users(id INTEGER PRIMARY KEY, name TEXT); INSERT INTO users(name) VALUES (\'a\'),(\'b\'),(\'c\')');
  const dest = path.join(tmp, 'bk'); const t0 = Date.UTC(2026, 9, 10, 12, 0, 0); const results = [];
  for (let i = 0; i < 4; i++) { db.exec(`INSERT INTO users(name) VALUES ('x${i}')`); results.push(await backupSqlite(src, dest, { keep: 3, now: new Date(t0 + i * 6 * 3600000) })); } // the database stays open and writable while we back it up
  const r = results.at(-1); assert.equal(r.integrity, 'ok'); assert.equal(r.users, 7); assert.equal(fs.statSync(r.file).mode & 0o077, 0, 'owner only'); assert.equal(fs.readdirSync(dest).length, 3, 'one file per backup, no -wal/-shm leftovers'); assert.equal(results[3].removed.length, 1); assert.match(results[0].file, /naija-area-20261010T120000Z\.db$/);
  const copy = new Database(r.file, { readonly: true }); assert.equal(copy.prepare('SELECT COUNT(*) n FROM users').get().n, 7); copy.close(); db.close();
  await assert.rejects(backupSqlite(path.join(tmp, 'missing.db'), dest), /not found/); const sb = buildServer({ dbPath: path.join(tmp, 'real.db'), quiet: true, adminPassword: 'x' }); sb.db.close(); const rr = await backupSqlite(path.join(tmp, 'real.db'), dest); assert.ok(rr.users === 0 || rr.users >= 0); assert.equal(rr.integrity, 'ok', 'a real game database backs up too');
});
test('deploy files: present, contain no secrets, and say what is not verified; the Docker/systemd/proxy files carry the safety settings that matter', () => {
  const files = fs.readdirSync(path.join(root, 'deploy')); for (const f of ['Dockerfile', 'docker-compose.yml', 'env.production.example', 'naija-area.service', 'naija-area-backup.service', 'naija-area-backup.timer', 'backup-postgres.sh', 'Caddyfile', 'nginx.conf', 'README.md']) assert.ok(files.includes(f), f);
  for (const f of files) { const t = read(`deploy/${f}`); assert.ok(!/pri_live_|pub_live_|BEGIN (RSA |EC )?PRIVATE KEY|[a-f0-9]{48,}/.test(t), `${f}: no secret-looking text`); }
  assert.ok(!fs.readdirSync(path.join(root, 'deploy')).some(f => /\.env$/.test(f)), 'no filled-in env file in git'); assert.match(read('.gitignore'), /deploy\/\*\.env/);
  const d = read('deploy/Dockerfile'); assert.match(d, /USER node/); assert.match(d, /HEALTHCHECK[\s\S]*healthz/); assert.match(d, /npm ci --omit=dev/); assert.match(d, /NOT BUILT OR RUN/); assert.ok(!/COPY\s+.*\.env/.test(d)); assert.ok(!/ENV\s+(SESSION_SECRET|ADMIN_PASSWORD)/.test(d));
  const c = read('deploy/docker-compose.yml'); assert.match(c, /127\.0\.0\.1:3000:3000/); assert.match(c, /no-new-privileges/); assert.match(c, /replicas: 1/); assert.match(c, /read_only: true/); assert.match(c, /NOT RUN/); assert.match(c, /:\?set POSTGRES_PASSWORD/); assert.ok(!/ports:.*5432/.test(c), 'the database port is not published');
  const u = read('deploy/naija-area.service'); for (const k of ['NoNewPrivileges=true', 'ProtectSystem=strict', 'PrivateTmp=true', 'User=naija', 'EnvironmentFile=/etc/naija-area/naija-area.env', 'ReadWritePaths=/var/lib/naija-area', 'NOT INSTALLED']) assert.ok(u.includes(k), k);
  assert.match(read('deploy/naija-area-backup.service'), /backup-sqlite\.mjs/); assert.match(read('deploy/naija-area-backup.timer'), /OnCalendar/);
  const p = read('deploy/backup-postgres.sh'); assert.match(p, /set -euo pipefail/); assert.match(p, /pg_restore --list/); assert.match(p, /NOT RUN/);
  assert.match(read('deploy/Caddyfile'), /reverse_proxy 127\.0\.0\.1:3000/); assert.match(read('deploy/Caddyfile'), /CF-Connecting-IP/); const n = read('deploy/nginx.conf'); assert.match(n, /Upgrade/); assert.match(n, /location \/ws/); assert.match(n, /real_ip_header CF-Connecting-IP/); assert.match(n, /NOT RUN/);
  assert.match(read('deploy/README.md'), /nothing here was deployed/);
});
test('legal page placeholders: terms, privacy, refunds and contact are served, and each says loudly that it is a placeholder, not legal text', async () => {
  const { s, base } = await up();
  try {
    for (const [p, re] of [['/terms', /DRAFT/], ['/privacy', /PLACEHOLDER\. NOT LEGAL TEXT/], ['/refunds', /PLACEHOLDER\. NOT LEGAL TEXT/], ['/contact', /PLACEHOLDER\. NOT LEGAL TEXT/]]) { const r = await fetch(base + p); assert.equal(r.status, 200, p); const t = await r.text(); assert.match(t, re, p); assert.match(t, /lawyer/i, p); }
    const priv = await (await fetch(`${base}/privacy`)).text(); assert.match(priv, /\[LAWFUL BASIS/); assert.match(priv, /Nigeria Data Protection Act/); assert.match(priv, /No ID document/);
  } finally { await new Promise(r => s.server.close(r)); }
});
test('docs/LAUNCH.md exists, covers every required area, and states what is unverified', () => {
  const t = read('docs/LAUNCH.md'); for (const h of ['Hosting options', 'Cloudflare', 'Environment variables and secrets', 'Backups', 'Monitoring and health', 'Admin hardening', 'Legal pages', 'NDPA', 'Age checks', 'Payments', 'Moderation staffing', 'Load test plan', 'Decisions needed from Sherif', 'NOT verified']) assert.ok(t.includes(h), h);
});
