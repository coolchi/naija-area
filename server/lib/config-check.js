// Start-up configuration check (launch preparation, 10 Oct 2026). PURE: give it an env object, get back { errors, warnings, info }. No I/O, so tests and the CLI use the same code.
// In production (NODE_ENV=production) any ERROR stops the server from starting (server/index.js). Warnings are printed. Nothing here talks to a provider or the network.
const PLACEHOLDER = /^(change[-_ ]?me|replace[-_ ]?me|todo|xxx+|your[-_ ].*|<.*>|example.*|password|admin|admin-dev-only|secret|test|dev|default)$/i;
const isPlaceholder = (v) => PLACEHOLDER.test(String(v).trim());
const has = (v) => v !== undefined && v !== null && String(v).trim() !== '';
const int = (v) => (has(v) && /^-?\d+$/.test(String(v).trim()) ? Number(v) : NaN);

export function checkConfig(env = process.env, { production = env.NODE_ENV === 'production' } = {}) {
  const errors = [], warnings = [], info = []; const E = (m) => errors.push(m), W = (m) => warnings.push(m), I = (m) => info.push(m);
  const prodOnlyError = (cond, msg) => { if (cond) (production ? E : W)(msg + (production ? '' : ' (would be an error in production)')); };

  // ---- template placeholders left in
  for (const [k, v] of Object.entries(env)) if (typeof v === 'string' && /CHANGE_ME/.test(v)) E(`${k} still contains CHANGE_ME: fill it in (deploy/env.production.example is a template).`);
  // ---- secrets
  prodOnlyError(!has(env.SESSION_SECRET), 'SESSION_SECRET is not set: the signing key would come from a file in the data directory (or be random per start). Set a 64-character random value so every instance and restart agrees.');
  if (has(env.SESSION_SECRET)) { if (isPlaceholder(env.SESSION_SECRET) || String(env.SESSION_SECRET).length < 32) prodOnlyError(true, 'SESSION_SECRET is a placeholder or shorter than 32 characters.'); }
  if (!has(env.ADMIN_PASSWORD)) prodOnlyError(true, 'ADMIN_PASSWORD is not set: the admin area stays disabled in production (set a long unique password).');
  else if (isPlaceholder(env.ADMIN_PASSWORD) || String(env.ADMIN_PASSWORD).length < 12) prodOnlyError(true, 'ADMIN_PASSWORD is a placeholder or shorter than 12 characters.');
  else if (has(env.SESSION_SECRET) && env.ADMIN_PASSWORD === env.SESSION_SECRET) E('ADMIN_PASSWORD must differ from SESSION_SECRET.');
  // admin second factor, allow-list and metrics (10 Oct 2026)
  { const off = String(env.NA_ADMIN_2FA || '').toLowerCase() === 'off'; const t = String(env.ADMIN_TOTP_SECRET || '').replace(/\s/g, '').toUpperCase();
    if (has(t) && !/^[A-Z2-7]{16,}$/.test(t)) E('ADMIN_TOTP_SECRET is not valid base32 (16+ characters A-Z, 2-7). Create one with: node tools/admin-totp.mjs');
    else if (!has(t)) { if (production && !off) E('ADMIN_TOTP_SECRET is not set: in production the admin login needs a second factor (node tools/admin-totp.mjs creates a secret). NA_ADMIN_2FA=off is the explicit, discouraged opt-out.'); else if (production && off) W('NA_ADMIN_2FA=off: the admin login is password-only. Do not launch like this.'); else W('ADMIN_TOTP_SECRET is not set: the admin login is password-only here (an error in production unless NA_ADMIN_2FA=off).'); }
    if (has(env.NA_ADMIN_ALLOW_IPS)) { const bad = String(env.NA_ADMIN_ALLOW_IPS).split(',').map(x => x.trim()).filter(Boolean).filter(x => !/^(\d{1,3}(\.\d{1,3}){3}(\/\d{1,2})?|[0-9a-fA-F:]+)$/.test(x)); if (bad.length) E(`NA_ADMIN_ALLOW_IPS has entries that are not an IP or an IPv4 range: ${bad.join(', ')}`); else I('NA_ADMIN_ALLOW_IPS: /admin and /api/admin answer only to the listed addresses.'); } else if (production) W('NA_ADMIN_ALLOW_IPS is empty: /admin is reachable by anyone who finds it (use it, or Cloudflare Access, in front).');
    if (has(env.NA_METRICS_TOKEN) && (isPlaceholder(env.NA_METRICS_TOKEN) || String(env.NA_METRICS_TOKEN).length < 24)) prodOnlyError(true, 'NA_METRICS_TOKEN is a placeholder or shorter than 24 characters.'); }

  // ---- modes that must never reach production
  if (env.NA_DEV === '1') (production ? E : W)('NA_DEV=1 turns on dev routes (teleport, time travel). Never set it in production.');
  if (env.NA_PREVIEW_CITIES === '1') W('NA_PREVIEW_CITIES=1 loads preview cities that are not approved for players.');
  if (has(env.NA_CRASH_SEED)) W('NA_CRASH_SEED is a testing aid and makes crash rolls predictable. Remove it.');
  if (production && env.PRACTICE_BOT === '1') W('PRACTICE_BOT is ignored in production (the bot never starts there).');

  // ---- network
  const port = has(env.PORT) ? int(env.PORT) : 3000; if (!(port >= 1 && port <= 65535)) E(`PORT "${env.PORT}" is not a valid port.`);
  const host = env.HOST || '127.0.0.1';
  if (host === '0.0.0.0' || host === '::') { if (production && env.NA_TRUST_PROXY !== '1') W('HOST listens on every interface and NA_TRUST_PROXY is not 1. Put the app behind a reverse proxy on a private network and set NA_TRUST_PROXY=1, or keep HOST=127.0.0.1.'); else I(`HOST=${host}: make sure only the proxy can reach this port (firewall / Docker network).`); }
  if (production && env.NA_TRUST_PROXY !== '1') W('NA_TRUST_PROXY is not 1: behind Cloudflare or nginx every player would share the proxy address, so per-IP rate limits would hit everyone at once.');
  if (production) { if (!has(env.NA_PUBLIC_URL)) E('NA_PUBLIC_URL is not set (used for payment return links).'); else if (!/^https:\/\/[^/\s]+/.test(env.NA_PUBLIC_URL)) E('NA_PUBLIC_URL must start with https:// in production.'); else if (/localhost|127\.0\.0\.1/.test(env.NA_PUBLIC_URL)) E('NA_PUBLIC_URL points at localhost.'); }
  else if (has(env.NA_PUBLIC_URL) && !/^https?:\/\//.test(env.NA_PUBLIC_URL)) W('NA_PUBLIC_URL should start with http:// or https://.');

  // ---- database
  if (has(env.NA_DATABASE_URL)) {
    let u = null; try { u = new URL(env.NA_DATABASE_URL); } catch { E('NA_DATABASE_URL is not a valid URL (postgres://user:password@host:5432/dbname).'); }
    if (u) { if (!/^postgres(ql)?:$/.test(u.protocol)) E('NA_DATABASE_URL must be a postgres:// URL.'); const local = /^(localhost|127\.0\.0\.1|::1|\[::1\]|postgres|db)$/.test(u.hostname); if (!local && env.NA_DB_SSL !== '1') W('The database is not on this machine and NA_DB_SSL is not 1: traffic to it would not be encrypted.'); if (env.NA_DB_SSL === '1' && env.NA_DB_SSL_STRICT === '0') W('NA_DB_SSL_STRICT=0 skips certificate checks on the database connection.'); if (u.password && isPlaceholder(decodeURIComponent(u.password))) prodOnlyError(true, 'The database password in NA_DATABASE_URL is a placeholder.'); }
    if (env.NA_DB_SINGLE_INSTANCE === '0') W('NA_DB_SINGLE_INSTANCE=0: the game keeps the world in one process, so two app instances on one database corrupt state. Run exactly one.');
    if (has(env.NA_DB)) W('NA_DB is ignored when NA_DATABASE_URL is set.');
  } else if (production) { W('No NA_DATABASE_URL: production would use a SQLite file (fine for a small single-server launch). Back up the data directory (scripts/backup-sqlite.mjs) and keep it on a persistent disk.'); if (!has(env.NA_DATA_DIR) && !has(env.NA_DB)) W('NA_DATA_DIR / NA_DB not set: data goes under the app directory, which is lost when a container is replaced. Set NA_DATA_DIR to a mounted volume.'); }
  if (has(env.NA_DATA_DIR) && !String(env.NA_DATA_DIR).startsWith('/')) W('NA_DATA_DIR should be an absolute path.');

  // ---- payments (TEST MODE ONLY in this build)
  const pay = env.NA_PAYMENTS_PROVIDER || 'mock';
  if (pay === 'mock') (production ? E : I)('NA_PAYMENTS_PROVIDER is mock: the server REFUSES to start in production with the mock provider. Use monipay with TEST keys until live payments are built and approved.'); // matches createServer.js
  else if (pay === 'monipay') {
    for (const [k, pre] of [['MONIPAY_SECRET_KEY', 'pri_test_'], ['MONIPAY_PUBLIC_KEY', 'pub_test_']]) { if (!has(env[k])) E(`${k} is not set (payments provider is monipay).`); else if (!String(env[k]).startsWith(pre)) E(`${k} must start with ${pre}: this build is TEST MODE ONLY and refuses live keys.`); }
    if (!has(env.MONIPAY_WEBHOOK_SECRET)) E('MONIPAY_WEBHOOK_SECRET is not set: webhooks cannot be verified.'); else if (isPlaceholder(env.MONIPAY_WEBHOOK_SECRET)) E('MONIPAY_WEBHOOK_SECRET is a placeholder.');
    I('Payments are TEST MODE: no real money moves. Going live needs live keys, a code change that lifts the test-key guard, a lawyer and Monipay approval.');
  } else E(`NA_PAYMENTS_PROVIDER "${pay}" is not known (mock | monipay).`);
  for (const k of ['NA_MONIPAY_FEE_RATE', 'NA_VAT_RATE']) if (has(env[k]) && !(Number(env[k]) >= 0 && Number(env[k]) < 1)) E(`${k} must be a fraction between 0 and 1 (for example 0.075).`);

  // ---- age checks (NO VENDOR CHOSEN)
  const mode = env.NA_AGE_CHECK || 'off', ap = env.NA_AGE_PROVIDER || 'mock';
  if (!['off', 'payments', 'play'].includes(mode)) E(`NA_AGE_CHECK "${mode}" is not known (off | payments | play).`);
  if (ap !== 'mock') E(`NA_AGE_PROVIDER "${ap}" is not known: only the mock stand-in exists, no vendor has been chosen.`);
  if (ap === 'mock' && mode !== 'off') (production ? E : W)('The mock age provider is a stand-in and the server refuses it as the age gate in production.');
  if (mode === 'off') W('NA_AGE_CHECK=off: the only age control is the 18+ tick box. That is NOT a real age check; see docs/AGE.md and the lawyer question in docs/LAUNCH.md.');

  // ---- optional providers
  const sp = env.NA_SCORES_PROVIDER || 'mock'; if (sp === 'api-football' && !has(env.APIFOOTBALL_KEY)) E('NA_SCORES_PROVIDER=api-football needs APIFOOTBALL_KEY.'); if (!['mock', 'api-football'].includes(sp)) W(`NA_SCORES_PROVIDER "${sp}" is not known; the stadium falls back to the fictional league.`);
  if ((has(env.NA_TURN_URLS) || has(env.NA_TURN_USERNAME) || has(env.NA_TURN_CREDENTIAL)) && !(has(env.NA_TURN_URLS) && has(env.NA_TURN_USERNAME) && has(env.NA_TURN_CREDENTIAL))) E('NA_TURN_URLS, NA_TURN_USERNAME and NA_TURN_CREDENTIAL must be set together (voice calls through a TURN relay).');
  if (!has(env.NA_TURN_URLS)) I('No TURN relay set: phone voice calls may fail for players behind strict networks (STUN only).');
  const cost = has(env.NA_BCRYPT_COST) ? int(env.NA_BCRYPT_COST) : 10; if (!(cost >= 4 && cost <= 15)) E('NA_BCRYPT_COST must be a whole number from 4 to 15.'); else if (production && cost < 10) W('NA_BCRYPT_COST below 10 is too weak for production.');
  if (env.NA_REAL_RADIO === '0') I('Real radio stations are switched off (NA_REAL_RADIO=0).');
  return { ok: errors.length === 0, errors, warnings, info, production };
}
/** parse a dotenv-style file text (KEY=value, # comments, optional quotes). Never evaluates anything. */
export function parseEnvFile(text) { const out = {}; for (const raw of String(text).split(/\r?\n/)) { const line = raw.trim(); if (!line || line.startsWith('#')) continue; const m = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)$/); if (!m) continue; let v = m[2].trim(); if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1); else v = v.replace(/\s+#.*$/, ''); out[m[1]] = v; } return out; }
export function formatReport(r) { const L = []; for (const e of r.errors) L.push(`ERROR   ${e}`); for (const w of r.warnings) L.push(`warning ${w}`); for (const i of r.info) L.push(`info    ${i}`); L.push(r.ok ? `RESULT: OK (${r.warnings.length} warnings)` : `RESULT: ${r.errors.length} error(s): the server would not start in production`); return L.join('\n'); }
