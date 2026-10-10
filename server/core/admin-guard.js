// Admin hardening: (1) a second factor (TOTP) on top of the admin password, (2) an optional IP allow-list for /admin and /api/admin, (3) lock-out after repeated failures.
// All configuration comes from the environment (see deploy/env.production.example): ADMIN_TOTP_SECRET, NA_ADMIN_2FA=off (explicit opt-out, never in production), NA_ADMIN_ALLOW_IPS.
import { bad } from './util.js';
import * as totp from '../lib/totp.js';

export function adminSettings(env = process.env, { prod = false } = {}) {
  const secret = String(env.ADMIN_TOTP_SECRET || '').replace(/\s/g, '').toUpperCase() || null; let valid = false; if (secret) { try { valid = totp.base32Decode(secret).length >= 10; } catch { valid = false; } }
  const optOut = String(env.NA_ADMIN_2FA || '').toLowerCase() === 'off';
  const allow = String(env.NA_ADMIN_ALLOW_IPS || '').split(',').map(s => s.trim()).filter(Boolean);
  return { secret: valid ? secret : null, secretInvalid: !!secret && !valid, optOut, allow, required: !!valid || (prod && !optOut) };
}
const ip4 = (s) => { const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(s); return m && m.slice(1).every(n => Number(n) < 256) ? ((Number(m[1]) << 24) >>> 0) + (Number(m[2]) << 16) + (Number(m[3]) << 8) + Number(m[4]) : null; };
/** exact IPs (v4 or v6) and IPv4 CIDR ranges. An empty list allows everyone. */
export function ipAllowed(list, ip) {
  if (!list?.length) return true; const addr = String(ip || '').replace(/^::ffff:/, '');
  for (const e of list) { if (e === addr) return true; const m = /^(.+)\/(\d{1,2})$/.exec(e); if (m) { const base = ip4(m[1]), a = ip4(addr), bits = Number(m[2]); if (base !== null && a !== null && bits <= 32) { const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0; if (((a & mask) >>> 0) === ((base & mask) >>> 0)) return true; } } }
  return false;
}
const FAILS = 5, LOCK_MS = 15 * 60000;
/** called by POST /api/admin/login after the password was checked and found right (or wrong: pass passwordOk=false). Throws a GameError on any failure. */
export function checkAdminLogin(app, { passwordOk, code, ip }) {
  const cfg = app.adminCfg || (app.adminCfg = adminSettings({}, {})); const now = app.clock.now(); const st = (app.adminFails ||= new Map()); const key = String(ip || 'x'); const f = st.get(key);
  if (f && f.until > now) bad('ADMIN_LOCKED', 'Too many wrong attempts. Try again in a few minutes.', 429);
  const fail = (code2, msg, status = 401) => { const e = f && now - f.first < LOCK_MS ? f : { n: 0, first: now, until: 0 }; e.n++; if (e.n >= FAILS) { e.until = now + LOCK_MS; e.n = 0; e.first = now; } st.set(key, e); bad(code2, msg, status); };
  if (cfg.required && !cfg.secret) bad('ADMIN_2FA_NOT_SET', 'Admin is locked: set ADMIN_TOTP_SECRET (or NA_ADMIN_2FA=off outside production).', 503);
  let codeStep = null; if (cfg.secret) { codeStep = totp.verify(cfg.secret, code, now, app.platform.hmacSha1, { lastStep: app.adminLastStep ?? -1 }); }
  if (!passwordOk || (cfg.secret && codeStep === null)) fail('BAD_LOGIN', cfg.secret ? 'Wrong password or code.' : 'Wrong password.');
  if (cfg.secret) app.adminLastStep = codeStep; // a code works once
  st.delete(key);
}
