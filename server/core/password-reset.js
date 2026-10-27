// Password reset: (1) a player asks for a reset link from the login page, (2) an admin sends a link or makes a one-time temporary password.
// Tokens: 32 random bytes, only the sha256 is stored, single use, short expiry. The request answer is the same whether or not the email exists.
// A new password stamps users.pass_changed_at; session cookies issued before that stamp stop working (see createServer.js).
import { bad, GameError } from './util.js';
import { normalizeEmail } from './auth.js';

export const RESET = { ttlMs: 45 * 60000, perEmailPerHour: 3, perIpPerHour: 10, tempLen: 12 };
const GENERIC = 'If that email is on a player account, a reset link is on its way. Check your inbox (and spam) in the next few minutes.';
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const publicBase = (app) => String(app.payments?.cfg?.publicUrl || process.env.NA_PUBLIC_URL || '').replace(/\/$/, '');
const audit = (app, actor, action, detail) => app.db.prepare('INSERT INTO audit_log(actor,action,detail,created_at) VALUES (?,?,?,?)').run(actor, action, detail, app.clock.now());

/** make a fresh token for a user (older unused tokens are cancelled). Returns the raw token: it is never stored. */
export function issueToken(app, uid, via) {
  const now = app.clock.now(); const raw = app.platform.randomHex(32);
  app.db.prepare('UPDATE password_resets SET used_at=? WHERE user_id=? AND used_at IS NULL').run(now, uid);
  app.db.prepare('INSERT INTO password_resets(user_id, token_hash, via, created_at, expires_at) VALUES (?,?,?,?,?)').run(uid, app.platform.sha256(raw), via, now, now + RESET.ttlMs);
  return raw;
}
export const resetPath = (raw) => `/reset?token=${raw}`;
const resetUrl = (app, raw) => { const b = publicBase(app); return b ? b + resetPath(raw) : resetPath(raw); };

async function mailLink(app, u, raw) {
  const url = resetUrl(app, raw); const mins = Math.round(RESET.ttlMs / 60000); const subject = `Reset your ${app.gameName} password`;
  const text = `Hi @${u.username},\n\nSomeone (hopefully you) asked to reset your ${app.gameName} password. Open this link within ${mins} minutes to choose a new one:\n\n${url}\n\nThe link works once. If you did not ask for this, ignore this email: your password stays the same.`;
  const html = `<p>Hi @${esc(u.username)},</p><p>Someone (hopefully you) asked to reset your <b>${esc(app.gameName)}</b> password. Open this link within ${mins} minutes to choose a new one:</p><p><a href="${esc(url)}">${esc(url)}</a></p><p>The link works once. If you did not ask for this, ignore this email: your password stays the same.</p>`;
  if (typeof app.mail?.send !== 'function') return { sent: false, url };
  const out = await app.mail.send({ to: u.email, subject, text, html, tags: ['password-reset'] });
  return { sent: true, url, mailId: out?.id || null };
}

/** POST /api/auth/forgot {email}. Always the same answer (unless the caller is rate limited or the email is not even an email). */
export async function requestReset(app, { email } = {}, ip) {
  const now = app.clock.now(); const mail = normalizeEmail(email);
  if (!mail) bad('BAD_EMAIL', 'Enter the email address on your account.');
  if (!app.limiter.hit(`forgot-ip:${ip || 'x'}`, RESET.perIpPerHour, 3600000, now)) bad('RATE_LIMIT', 'Too many reset requests. Try again in an hour.', 429);
  const answer = { ok: true, message: GENERIC };
  if (!app.limiter.hit(`forgot-mail:${mail}`, RESET.perEmailPerHour, 3600000, now)) return answer; // silently stop mail-bombing one inbox, without telling the caller the email exists
  const u = app.db.prepare('SELECT id, username, email, pass_hash, is_guest, is_bot FROM users WHERE email=?').get(mail);
  if (!u || u.is_bot || u.is_guest || (app.deletedUsers || new Set()).has(u.id)) return answer;
  const raw = issueToken(app, u.id, 'self');
  try {
    const r = await mailLink(app, u, raw);
    if (!r.sent) console.info(`[password-reset] mail off — reset for user #${u.id}${app.devRoutes ? ' ' + r.url : ' (link not logged outside dev)'}`);
  } catch (e) { console.warn('[password-reset] mail failed for user #' + u.id, e?.message || e); } // still the same answer: the caller must not learn anything
  return answer;
}

function liveToken(app, raw) {
  if (typeof raw !== 'string' || !/^[a-f0-9]{64}$/.test(raw)) return null;
  const t = app.db.prepare('SELECT id, user_id, expires_at, used_at FROM password_resets WHERE token_hash=?').get(app.platform.sha256(raw));
  if (!t || t.used_at || t.expires_at < app.clock.now()) return null;
  return t;
}
/** GET /api/auth/reset/check?token= : is the link still good, and for which username (shown on the reset page). */
export function checkToken(app, raw) {
  const t = liveToken(app, raw); if (!t) return { ok: false, message: 'This reset link has expired or was already used. Ask for a new one.' };
  const u = app.db.prepare('SELECT username FROM users WHERE id=?').get(t.user_id); return { ok: true, username: u?.username || '' };
}
/** POST /api/auth/reset {token, password}: sets the new password, burns the token, signs out every old session. */
export async function completeReset(app, { token, password } = {}) {
  if (typeof password !== 'string' || password.length < 8 || password.length > 72) bad('BAD_PASSWORD', 'Password must be 8-72 characters.');
  if (!liveToken(app, token)) bad('BAD_TOKEN', 'This reset link has expired or was already used. Ask for a new one.', 400);
  const hash = await app.platform.hash(password);
  const now = app.clock.now(); const t = liveToken(app, token); // check again after the slow hash: two tabs must not both use one token
  if (!t) bad('BAD_TOKEN', 'This reset link has expired or was already used. Ask for a new one.', 400);
  const r = app.db.prepare('UPDATE password_resets SET used_at=? WHERE id=? AND used_at IS NULL').run(now, t.id); if (!r.changes) bad('BAD_TOKEN', 'This reset link was already used.', 400);
  app.db.prepare('UPDATE password_resets SET used_at=? WHERE user_id=? AND used_at IS NULL').run(now, t.user_id);
  app.db.prepare('UPDATE users SET pass_hash=?, must_change_pw=0, pass_changed_at=? WHERE id=?').run(hash, Date.now(), t.user_id); // wall-clock ms: compared with the cookie's own time
  app.pushUser?.(t.user_id, { type: 'signed_out', reason: 'password_changed' });
  audit(app, `user:${t.user_id}`, 'password_reset_done', `user ${t.user_id}`);
  return { ok: true, message: 'Password changed. Log in with your new password.' };
}

const findUser = (app, who) => { const n = Number(who); const u = Number.isInteger(n) && n > 0 && String(n) === String(who).trim() ? app.db.prepare('SELECT id, username, email, is_guest, is_bot, pass_hash FROM users WHERE id=?').get(n) : app.db.prepare('SELECT id, username, email, is_guest, is_bot, pass_hash FROM users WHERE username=?').get(String(who || '').replace(/^@/, '').trim()); if (!u) bad('NO_USER', 'No such player.', 404); return u; };
const TEMP = 'abcdefghjkmnpqrstuvwxyzACDEFGHJKLMNPQRTUVWXY2345679';
function tempPassword(app) { const b = Buffer.from(app.platform.randomHex(RESET.tempLen), 'hex'); let s = ''; for (const x of b) s += TEMP[x % TEMP.length]; return s; }

/** admin: POST /api/admin/players/password-reset {who, mode: 'email'|'temp'} */
export async function adminReset(app, { who, mode } = {}, actor = 'admin') {
  const u = findUser(app, who);
  if (u.is_bot) bad('BOT', 'That is a bot account.');
  if (mode === 'email') {
    if (!u.email) bad('NO_EMAIL', 'This player has no email on file. Use a temporary password instead.');
    const raw = issueToken(app, u.id, 'admin');
    let r; try { r = await mailLink(app, u, raw); } catch (e) { app.db.prepare('UPDATE password_resets SET used_at=? WHERE token_hash=?').run(app.clock.now(), app.platform.sha256(raw)); throw e; }
    audit(app, actor, 'password_reset_link', `user ${u.id} @${u.username}${r.sent ? ' emailed' : ' link shown (mail off)'}`);
    return r.sent ? { ok: true, sent: true, message: `Reset link emailed to ${u.email}. It works once, for ${Math.round(RESET.ttlMs / 60000)} minutes.` }
      : { ok: true, sent: false, url: r.url, message: `Email is not set up on this server, so nothing was sent. Give this link to @${u.username} privately. It works once, for ${Math.round(RESET.ttlMs / 60000)} minutes.` };
  }
  if (mode === 'temp') {
    const pw = tempPassword(app); const hash = await app.platform.hash(pw); const now = app.clock.now();
    app.db.prepare('UPDATE password_resets SET used_at=? WHERE user_id=? AND used_at IS NULL').run(now, u.id);
    app.db.prepare('UPDATE users SET pass_hash=?, must_change_pw=1, pass_changed_at=?, is_guest=0 WHERE id=?').run(hash, Date.now(), u.id);
    app.pushUser?.(u.id, { type: 'signed_out', reason: 'password_changed' });
    audit(app, actor, 'password_reset_temp', `user ${u.id} @${u.username}`); // never the password itself
    return { ok: true, tempPassword: pw, username: u.username, message: `Temporary password for @${u.username}. It is shown only once. They must choose a new password when they log in.` };
  }
  bad('BAD_MODE', 'Choose email or temp.');
}
/** login hook: a temporary password works once, to reach the "choose a new password" page. */
export function mustChangeGate(app, uid) {
  const u = app.db.prepare('SELECT must_change_pw FROM users WHERE id=?').get(uid); if (!u?.must_change_pw) return;
  const raw = issueToken(app, uid, 'temp');
  throw new GameError('MUST_CHANGE_PASSWORD', 'Your password was reset by support. Choose a new password to continue.', 403, { resetPath: resetPath(raw) });
}
export function adminStatus(app, who) { const u = findUser(app, who); return { hasEmail: !!u.email, email: u.email || null, hasPassword: !!u.pass_hash, guest: !!u.is_guest, bot: !!u.is_bot }; }
