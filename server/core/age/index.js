// Real age checks (queue item 29). A provider tells us ONE thing: over 18, yes or no. We keep the outcome and the date. Nothing else.
//   NDPA (Nigeria Data Protection Act 2023) stance, to be confirmed by a lawyer: data minimisation (only pass/fail + date), purpose limitation (age gating only),
//   explicit consent before a check starts (`consent: true` is required), short retention (finished sessions deleted after 30 days), a way to erase (admin route),
//   and the vendor must act as our data processor under a contract (not signed: no vendor chosen).
import { bad, GameError } from '../util.js';
import { sanitize } from './providers.js';
import { AGE } from '../../config/age.js';
export { AGE_SQL } from './sql.js';

export function createAge(app, { provider, cfg = AGE }) {
  const a = { provider, cfg, app }; app.age = a;
  app.ageGate = (_app, uid) => ageGate(app, uid);                 // payments call this before taking money
  app.agePlayGuard = (uid, path) => playGuard(app, uid, path);     // dispatch calls this when mode is 'play'
  return a;
}
const need = (app) => { if (!app.age) bad('AGE_OFF', 'Age checks are not available here.', 503); return app.age; };
const db = (app) => app.db;

/** The standing outcome for a player: { result: 'pass'|'fail'|null, verifiedAt } */
export function ageState(app, uid) { const r = db(app).prepare('SELECT result, verified_at FROM age_verifications WHERE user_id=?').get(uid); return r ? { result: r.result, verifiedAt: r.verified_at } : { result: null, verifiedAt: null }; }
export function isRequired(app) { return !!app.age && ['payments', 'play'].includes(app.age.cfg.mode); }

/** null if fine, else {code, message}. A confirmed minor can never buy; in 'payments'/'play' mode only a recorded pass can. */
export function ageGate(app, uid) {
  if (!app.age) return null; const st = ageState(app, uid);
  if (st.result === 'fail') return { code: 'AGE_BLOCKED', message: 'This account did not pass the age check, so it cannot buy.' };
  if (['payments', 'play'].includes(app.age.cfg.mode) && st.result !== 'pass') return { code: 'AGE_CHECK_REQUIRED', message: 'Verify your age first (18+).' };
  return null;
}
const ALWAYS = ['/api/age/', '/api/me', '/api/config', '/api/city', '/api/auth/', '/api/health', '/api/payments/config'];
function playGuard(app, uid, path) {
  if (!app.age || app.age.cfg.mode !== 'play' || ALWAYS.some(p => path.startsWith(p))) return null;
  const u = db(app).prepare('SELECT is_bot FROM users WHERE id=?').get(uid); if (!u || u.is_bot) return null;
  const st = ageState(app, uid);
  if (st.result === 'fail') return { code: 'AGE_BLOCKED', message: 'This account did not pass the age check.' };
  return st.result === 'pass' ? null : { code: 'AGE_CHECK_REQUIRED', message: 'Verify your age first (18+).' };
}

export function publicStatus(app, uid) {
  if (!app.age) return { enabled: false };
  const { cfg } = app.age; const st = ageState(app, uid); const now = app.clock.now();
  const open = db(app).prepare("SELECT session_ref, created_at FROM age_sessions WHERE user_id=? AND state='pending' AND created_at>? ORDER BY id DESC LIMIT 1").get(uid, now - cfg.sessionTtlMs);
  const starts = db(app).prepare('SELECT COUNT(*) n FROM age_sessions WHERE user_id=? AND created_at>?').get(uid, now - 86400000).n;
  const fails = db(app).prepare("SELECT COUNT(*) n, MAX(done_at) last FROM age_sessions WHERE user_id=? AND state='fail' AND done_at>?").get(uid, now - 30 * 86400000);
  const wait = st.result === 'fail' && fails.last ? Math.max(0, fails.last + cfg.failCooldownMs - now) : 0;
  return { enabled: true, mode: cfg.mode, provider: app.age.provider.id, required: isRequired(app), status: st.result === 'pass' ? 'pass' : st.result === 'fail' ? 'fail' : open ? 'pending' : 'none', verifiedAt: st.verifiedAt, pendingRef: open?.session_ref || null, startsLeftToday: Math.max(0, cfg.maxStartsPerDay - starts), retryInMs: wait, lockedOut: fails.n >= cfg.maxFailsPer30d };
}
export function publicConfig(app) { return app.age ? { enabled: true, mode: app.age.cfg.mode, provider: app.age.provider.id, required: isRequired(app) } : { enabled: false }; }

/** Player starts a check. Needs explicit consent. Returns where to go. The vendor only ever sees an opaque reference, never the username. */
export async function startCheck(app, uid, { consent } = {}) {
  const { provider, cfg } = need(app); const now = app.clock.now();
  if (consent !== true) bad('CONSENT_REQUIRED', 'Please agree to the age check first. We only keep whether you passed, and the date.');
  const u = db(app).prepare('SELECT id, is_bot FROM users WHERE id=?').get(uid); if (!u || u.is_bot) bad('NO_USER', 'No such player.', 404);
  const st = publicStatus(app, uid);
  if (st.status === 'pass') bad('ALREADY_VERIFIED', 'Your age is already verified.', 409);
  if (st.pendingRef) return { sessionRef: st.pendingRef, resumed: true, url: null };
  if (st.lockedOut) bad('AGE_LOCKED', 'Too many failed checks. Please contact support.', 403);
  if (st.retryInMs > 0) bad('AGE_COOLDOWN', 'Please wait before trying again.', 429, { retryInMs: st.retryInMs });
  if (st.startsLeftToday <= 0) bad('RATE_LIMIT', 'Too many tries today.', 429);
  const userRef = app.platform.sha256(`age:${uid}:${app.platform.secret || ''}`).slice(0, 24); // opaque, stable for this player, not reversible by the vendor
  const r = await provider.start({ userRef, returnUrl: `/play?age=1` });
  db(app).prepare("INSERT INTO age_sessions(user_id,session_ref,provider,state,created_at) VALUES (?,?,?,'pending',?)").run(uid, r.sessionRef, provider.id, now);
  return { sessionRef: r.sessionRef, url: r.url, expiresAt: r.expiresAt };
}

/** Ask the provider for the outcome of a session and record it. The browser is never believed; the vendor is asked server to server. */
export async function completeCheck(app, sessionRef, { uid = null } = {}) {
  const { provider } = need(app); const now = app.clock.now();
  const s = db(app).prepare('SELECT * FROM age_sessions WHERE session_ref=?').get(String(sessionRef || '')); if (!s || (uid != null && s.user_id !== uid)) bad('NO_SESSION', 'No such check.', 404);
  if (s.state !== 'pending') return publicStatus(app, s.user_id);
  let r; try { r = sanitize(await provider.result(s.session_ref)); } catch (e) { if (e instanceof GameError) throw e; throw new GameError('AGE_PROVIDER', 'The age-check service could not be reached.', 502); }
  if (r.state === 'pending') return publicStatus(app, s.user_id);
  const state = r.state === 'completed' ? (r.over18 ? 'pass' : 'fail') : r.state === 'expired' ? 'expired' : 'inconclusive';
  app.db.transaction(() => {
    const ch = db(app).prepare("UPDATE age_sessions SET state=?, done_at=? WHERE id=? AND state='pending'").run(state, now, s.id); if (ch.changes !== 1) return;
    if (state === 'pass') db(app).prepare('INSERT INTO age_verifications(user_id,result,verified_at,provider) VALUES (?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET result=excluded.result, verified_at=excluded.verified_at, provider=excluded.provider').run(s.user_id, 'pass', now, s.provider);
    else if (state === 'fail') db(app).prepare("INSERT INTO age_verifications(user_id,result,verified_at,provider) VALUES (?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET result=excluded.result, verified_at=excluded.verified_at, provider=excluded.provider WHERE age_verifications.result<>'pass'").run(s.user_id, 'fail', now, s.provider);
  })();
  return publicStatus(app, s.user_id);
}
export async function handleWebhook(app, raw, headers) {
  const { provider } = need(app);
  if (!Buffer.isBuffer(raw) || !raw.length) bad('BAD_REQUEST', 'Empty webhook.');
  if (!provider.verifyWebhook?.(raw, headers)) bad('BAD_SIGNATURE', 'Signature check failed.', 401);
  const ev = provider.parseWebhook(raw); if (!ev) bad('BAD_REQUEST', 'Unreadable event.');
  try { await completeCheck(app, ev.sessionRef); } catch (e) { if (e.code === 'NO_SESSION') return { ok: true, ignored: true }; throw e.code === 'AGE_PROVIDER' ? new GameError('RETRY_LATER', 'Retry later.', 503) : e; }
  return { ok: true };
}

/** Housekeeping: unfinished checks expire; finished session rows (no personal data) are deleted after 30 days. */
export function tickAge(app) {
  if (!app.age) return 0; const { cfg } = app.age; const now = app.clock.now();
  const a = db(app).prepare("UPDATE age_sessions SET state='expired', done_at=? WHERE state='pending' AND created_at<?").run(now, now - cfg.sessionTtlMs).changes;
  const b = db(app).prepare("DELETE FROM age_sessions WHERE state<>'pending' AND done_at<?").run(now - cfg.keepFinishedSessionsMs).changes;
  return a + b;
}
/** Right to erasure (NDPA): remove everything we hold about a player's age check. They must verify again if the mode needs it. */
export function erase(app, uid) {
  return app.db.transaction(() => { const a = db(app).prepare('DELETE FROM age_verifications WHERE user_id=?').run(uid).changes; const b = db(app).prepare('DELETE FROM age_sessions WHERE user_id=?').run(uid).changes; return { verifications: a, sessions: b }; })();
}
/** Admin reopen after a lock-out or a mistake: clears a FAIL (never a pass) and the failed sessions. */
export function reopen(app, uid) {
  return app.db.transaction(() => { const a = db(app).prepare("DELETE FROM age_verifications WHERE user_id=? AND result='fail'").run(uid).changes; const b = db(app).prepare("DELETE FROM age_sessions WHERE user_id=? AND state='fail'").run(uid).changes; return { verifications: a, sessions: b }; })();
}
export function adminSummary(app) {
  if (!app.age) return { enabled: false };
  const c = (sql) => db(app).prepare(sql).get().n;
  return { enabled: true, mode: app.age.cfg.mode, provider: app.age.provider.id, passed: c("SELECT COUNT(*) n FROM age_verifications WHERE result='pass'"), failed: c("SELECT COUNT(*) n FROM age_verifications WHERE result='fail'"), pending: c("SELECT COUNT(*) n FROM age_sessions WHERE state='pending'"), note: 'Counts only. No personal data is stored.' };
}
