// Safety and family controls (queue batch 1 item 7). A player (or the adult who shares their phone) can set: who can chat with them, a daily play limit, quiet hours,
// a break reminder, the biggest stake they may play for, no transfers, and their OWN limit on buying ₦ with real money. An optional PIN locks the settings so that
// whoever does not know it cannot loosen them. The SERVER enforces everything (chat paths, stakes, transfers, buying, time); the client only shows it.
// An account whose age check says UNDER 18 is put into RESTRICTED MODE by the server whatever it saved (config/guardian.js `restricted`).
// Import rule: this module must not import account.js, world.js or the payments (they import it); registration with the account download/close happens in routes.js.
import { bad } from './util.js';
import { GUARDIAN as G } from '../config/guardian.js';
import { dayKey, dayStart } from './rewards.js';
import { ageState } from './age/index.js';

const MIN = 60000, HOUR = 3600000, LAG = HOUR;
const RANK = { all: 0, friends: 1, off: 2 };
const eligible = (app, uid) => { if (!G.enabled) return false; const u = app.db.prepare('SELECT is_bot FROM users WHERE id=?').get(uid); return !!u && !u.is_bot; };
const cache = (app) => (app._gd ||= new Map());
export const forget = (app, uid) => cache(app).delete(uid);
export const lagosHour = (ms) => Math.floor((((ms + LAG) % 86400000) + 86400000) % 86400000 / HOUR);
/** is the hour inside quiet hours start..end (end exclusive; start > end wraps past midnight) */
export const inCurfew = (c, hour) => !!c && (c.start < c.end ? hour >= c.start && hour < c.end : hour >= c.start || hour < c.end);
const curfewLen = (s, e) => ((e - s) + 24) % 24;

const rowOf = (app, uid) => app.db.prepare('SELECT * FROM guardian_settings WHERE user_id=?').get(uid) || null;
const ageFailed = (app, uid) => { try { return !!app.age && ageState(app, uid).result === 'fail'; } catch { return false; } };
const compute = (app, uid) => {
  const r = rowOf(app, uid); const restricted = ageFailed(app, uid);
  const s = { chat: r?.chat_mode || 'all', maxStake: r?.max_stake ?? null, transfersOff: !!r?.transfers_off, topupDailyNgn: r?.topup_daily_ngn ?? null, playLimitMin: r?.play_limit_min ?? null,
    curfew: r && r.curfew_start != null && r.curfew_end != null ? { start: r.curfew_start, end: r.curfew_end } : null, breakEveryMin: r?.break_every_min ?? null };
  if (restricted) { const R = G.restricted; if (RANK[R.chat] > RANK[s.chat]) s.chat = R.chat; s.maxStake = s.maxStake == null ? R.maxStake : Math.min(s.maxStake, R.maxStake); s.transfersOff = s.transfersOff || R.transfersOff; s.topupDailyNgn = s.topupDailyNgn == null ? R.topupDailyNgn : Math.min(s.topupDailyNgn, R.topupDailyNgn); }
  return { s, restricted, hasPin: !!r?.pin_hash, saved: !!r };
};
/** the effective settings (saved ones, tightened by restricted mode). Cached 15 s per player; any change drops the cache. */
export function effective(app, uid) {
  const c = cache(app), now = app.clock.now(), hit = c.get(uid); if (hit && now - hit.at < 15000) return hit;
  const e = eligible(app, uid) ? compute(app, uid) : { s: { chat: 'all', maxStake: null, transfersOff: false, topupDailyNgn: null, playLimitMin: null, curfew: null, breakEveryMin: null }, restricted: false, hasPin: false, saved: false, off: true };
  const day = dayKey(now); const usedMs = e.s.playLimitMin != null ? (app.db.prepare('SELECT ms FROM guardian_play WHERE user_id=? AND day=?').get(uid, day)?.ms || 0) : 0;
  const out = { ...e, at: now, day, usedMs }; c.set(uid, out); return out;
}

// ---- play time and quiet hours
/** called by every heartbeat: add the time since the last one (only for players who set a limit, so most players cost nothing) */
export function tickPlay(app, uid) {
  const now = app.clock.now(); const last = (app._gdLast ||= new Map()); const prev = last.get(uid); last.set(uid, now); if (prev === undefined) return;
  const e = effective(app, uid); if (e.s.playLimitMin == null) return; const d = Math.max(0, Math.min(now - prev, G.playTickMaxMs)); if (!d) return;
  const day = dayKey(now); if (day !== e.day) { e.day = day; e.usedMs = 0; }
  e.usedMs += d; app.db.prepare('INSERT INTO guardian_play(user_id,day,ms) VALUES (?,?,?) ON CONFLICT(user_id,day) DO UPDATE SET ms=guardian_play.ms+excluded.ms').run(uid, day, d);
}
const ALWAYS = ['/api/guardian', '/api/me', '/api/config', '/api/city', '/api/auth/', '/api/health', '/api/account/', '/api/age/', '/api/payments/config'];
/** null if fine, else { code, message, extra } when the player is out of time today or inside quiet hours */
export function playGuard(app, uid, path) {
  if (ALWAYS.some(p => path.startsWith(p))) return null; const e = effective(app, uid); if (e.off) return null; const now = app.clock.now();
  if (e.s.curfew && inCurfew(e.s.curfew, lagosHour(now))) return { code: 'BREAK_TIME', message: `Quiet hours: your safety settings keep the game closed from ${hh(e.s.curfew.start)} to ${hh(e.s.curfew.end)} (Lagos time).`, extra: { why: 'curfew', until: nextCurfewEnd(now, e.s.curfew) } };
  if (e.s.playLimitMin != null) { const day = dayKey(now); const used = day === e.day ? e.usedMs : 0; if (used >= e.s.playLimitMin * MIN) return { code: 'BREAK_TIME', message: `You have used your ${e.s.playLimitMin} minutes for today. The game opens again at midnight (Lagos time).`, extra: { why: 'limit', until: dayStart(day + 1) } }; }
  return null;
}
const hh = (h) => `${String(h).padStart(2, '0')}:00`;
const nextCurfewEnd = (now, c) => { let t = Math.floor((now + LAG) / HOUR) * HOUR - LAG; for (let i = 0; i < 26; i++) { t += HOUR; if (!inCurfew(c, lagosHour(t))) return t; } return t; };
/** the small block the heartbeat carries so the client can warn: only for players with a limit, quiet hours or a break reminder */
export function heartbeatInfo(app, uid) {
  const e = effective(app, uid); if (e.off || (e.s.playLimitMin == null && !e.s.curfew && e.s.breakEveryMin == null)) return undefined; const now = app.clock.now(); const out = { br: e.s.breakEveryMin ?? undefined };
  if (e.s.playLimitMin != null) out.left = Math.max(0, Math.ceil((e.s.playLimitMin * MIN - (dayKey(now) === e.day ? e.usedMs : 0)) / MIN));
  if (e.s.curfew && !inCurfew(e.s.curfew, lagosHour(now))) { const t = Math.floor((now + LAG) / HOUR) * HOUR - LAG; for (let i = 1; i <= 24; i++) if (inCurfew(e.s.curfew, lagosHour(t + i * HOUR))) { out.curfewIn = Math.max(0, Math.round((t + i * HOUR - now) / MIN)); break; } }
  return out;
}

// ---- chat
const areFriends = (app, a, b) => { const [x, y] = a < b ? [a, b] : [b, a]; return app.db.prepare("SELECT 1 FROM friendships WHERE user_a=? AND user_b=? AND status='accepted'").get(x, y) !== undefined; };
/** the sender's side. channel: 'public' | 'room' (open to everyone present) | 'private' (to one player, toId given). Throws a 403 when the player's own settings do not allow it. */
export function chatCheck(app, uid, channel, toId = null) {
  const m = effective(app, uid).s.chat; if (m === 'all') return;
  if (m === 'off') bad('CHAT_OFF', 'Chat is switched off in your safety settings.', 403);
  if (channel !== 'private' || !toId || !areFriends(app, uid, toId)) bad('CHAT_FRIENDS', 'Your safety settings only allow messages to and from friends.', 403);
}
/** the recipient's side: false when THEIR settings say they do not take messages from this sender */
export function canReceive(app, fromId, toId) { const m = effective(app, toId).s.chat; return m === 'all' || (m === 'friends' && areFriends(app, fromId, toId)); }
/** for the heartbeat chat feed: null = show everything, otherwise a function(userId) -> show or not */
export function chatFeedFilter(app, uid) {
  const m = effective(app, uid).s.chat; if (m === 'all') return null; if (m === 'off') return () => false;
  const rows = app.db.prepare("SELECT user_a, user_b FROM friendships WHERE status='accepted' AND (user_a=? OR user_b=?)").all(uid, uid); const set = new Set(rows.map(r => (r.user_a === uid ? r.user_b : r.user_a))); return (id) => id === uid || set.has(id);
}

// ---- money and places
export function assertStake(app, uid, stake) {
  if (!(stake > 0)) return; const e = effective(app, uid);
  if (e.s.maxStake != null && stake > e.s.maxStake) bad('STAKE_LIMIT', e.s.maxStake === 0 ? (e.restricted ? 'This account cannot play for stakes.' : 'Your safety settings do not allow games for stakes. Friendly games are fine.') : `Your safety settings limit stakes to ₦${e.s.maxStake}.`, 403, { maxStake: e.s.maxStake });
  if (G.stakeNeedsAgePassFrom != null && stake >= G.stakeNeedsAgePassFrom && app.age && ageState(app, uid).result !== 'pass') bad('AGE_CHECK_REQUIRED', `Stakes of ₦${G.stakeNeedsAgePassFrom} or more need a verified age (18+) first.`, 403);
}
export function assertTransfer(app, uid) { const e = effective(app, uid); if (e.s.transfersOff) bad('TRANSFERS_OFF', e.restricted ? 'This account cannot send money.' : 'Your safety settings do not allow sending money to other players.', 403); }
/** a real-money purchase of `totalKobo`, with `spentTodayKobo` already bought in the last 24 h */
export function assertSpend(app, uid, totalKobo, spentTodayKobo) {
  const e = effective(app, uid), lim = e.s.topupDailyNgn; if (lim == null) return;
  if (lim === 0) bad('SPEND_OFF', e.restricted ? 'This account cannot buy ₦.' : 'Your safety settings do not allow buying ₦ with real money.', 403);
  if (spentTodayKobo + totalKobo > lim * 100) bad('SPEND_LIMIT', `That is over your own daily buying limit of ₦${lim.toLocaleString('en-NG')}.`, 403, { limitNgn: lim });
}
export function assertVenue(app, uid, venue) { const e = effective(app, uid); if (e.restricted && venue?.kind && G.adultVenueKinds.includes(venue.kind)) bad('VENUE_RESTRICTED', 'This place is not open to your account.', 403); }

// ---- the settings themselves
const optionsView = (app) => ({ chatModes: G.chatModes, playLimitOptions: G.playLimitOptions, breakOptions: G.breakOptions, topupDailyOptionsNgn: G.topupDailyOptionsNgn, stakeOptions: app.balance.games.stakes, curfewMaxHours: G.curfewMaxHours, pin: { minLen: G.pin.minLen, maxLen: G.pin.maxLen } });
export function view(app, uid) {
  if (!eligible(app, uid)) return { enabled: false }; const e = effective(app, uid), r = rowOf(app, uid), now = app.clock.now(); const raw = r ? { chat: r.chat_mode, maxStake: r.max_stake ?? null, transfersOff: !!r.transfers_off, topupDailyNgn: r.topup_daily_ngn ?? null, playLimitMin: r.play_limit_min ?? null, curfew: r.curfew_start != null && r.curfew_end != null ? { start: r.curfew_start, end: r.curfew_end } : null, breakEveryMin: r.break_every_min ?? null } : { chat: 'all', maxStake: null, transfersOff: false, topupDailyNgn: null, playLimitMin: null, curfew: null, breakEveryMin: null };
  const used = dayKey(now) === e.day ? e.usedMs : 0;
  return { enabled: true, saved: raw, effective: e.s, restricted: e.restricted, hasPin: e.hasPin, pinLockedUntil: r && r.pin_locked_until > now ? r.pin_locked_until : null, options: optionsView(app),
    today: { playedMin: Math.round(used / MIN), counting: e.s.playLimitMin != null, leftMin: e.s.playLimitMin != null ? Math.max(0, Math.ceil((e.s.playLimitMin * MIN - used) / MIN)) : null, inQuietHours: !!e.s.curfew && inCurfew(e.s.curfew, lagosHour(now)), lagosHour: lagosHour(now) },
    note: e.restricted ? 'This account did not pass the age check (18+), so it is in restricted mode. Some settings are locked.' : null };
}
const intIn = (v, list, what) => { const n = Number(v); if (!Number.isInteger(n) || !list.includes(n)) bad('BAD_VALUE', `${what} must be one of ${list.join(', ')}.`); return n; };
/** body: { pin?, chat?, maxStake?, transfersOff?, topupDailyNgn?, playLimitMin?, curfew?: {start,end}|null, breakEveryMin? }. null clears a limit. While a PIN is set, every change needs it. */
export async function update(app, uid, body = {}) {
  if (!eligible(app, uid)) bad('OFF', 'Safety settings are not available for this account.', 409); const now = app.clock.now(); const r = rowOf(app, uid);
  await needPin(app, uid, r, body.pin);
  const next = { chat_mode: r?.chat_mode || 'all', max_stake: r?.max_stake ?? null, transfers_off: r?.transfers_off || 0, topup_daily_ngn: r?.topup_daily_ngn ?? null, play_limit_min: r?.play_limit_min ?? null, curfew_start: r?.curfew_start ?? null, curfew_end: r?.curfew_end ?? null, break_every_min: r?.break_every_min ?? null };
  const has = (k) => Object.prototype.hasOwnProperty.call(body, k);
  if (has('chat')) { if (!G.chatModes.includes(body.chat)) bad('BAD_VALUE', `chat must be one of ${G.chatModes.join(', ')}.`); next.chat_mode = body.chat; }
  if (has('maxStake')) next.max_stake = body.maxStake === null ? null : intIn(body.maxStake, app.balance.games.stakes, 'maxStake');
  if (has('transfersOff')) next.transfers_off = body.transfersOff ? 1 : 0;
  if (has('topupDailyNgn')) next.topup_daily_ngn = body.topupDailyNgn === null ? null : intIn(body.topupDailyNgn, G.topupDailyOptionsNgn, 'topupDailyNgn');
  if (has('playLimitMin')) next.play_limit_min = body.playLimitMin === null ? null : intIn(body.playLimitMin, G.playLimitOptions, 'playLimitMin');
  if (has('breakEveryMin')) next.break_every_min = body.breakEveryMin === null ? null : intIn(body.breakEveryMin, G.breakOptions, 'breakEveryMin');
  if (has('curfew')) { if (body.curfew === null) { next.curfew_start = null; next.curfew_end = null; } else { const s = Number(body.curfew?.start), e = Number(body.curfew?.end); if (!Number.isInteger(s) || !Number.isInteger(e) || s < 0 || s > 23 || e < 0 || e > 23 || s === e) bad('BAD_VALUE', 'Quiet hours need a start and an end hour (0 to 23) that are different.'); if (curfewLen(s, e) > G.curfewMaxHours) bad('BAD_VALUE', `Quiet hours can be at most ${G.curfewMaxHours} hours long.`); next.curfew_start = s; next.curfew_end = e; } }
  app.db.prepare(`INSERT INTO guardian_settings(user_id,chat_mode,max_stake,transfers_off,topup_daily_ngn,play_limit_min,curfew_start,curfew_end,break_every_min,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)
    ON CONFLICT(user_id) DO UPDATE SET chat_mode=excluded.chat_mode, max_stake=excluded.max_stake, transfers_off=excluded.transfers_off, topup_daily_ngn=excluded.topup_daily_ngn, play_limit_min=excluded.play_limit_min, curfew_start=excluded.curfew_start, curfew_end=excluded.curfew_end, break_every_min=excluded.break_every_min, updated_at=excluded.updated_at`)
    .run(uid, next.chat_mode, next.max_stake, next.transfers_off, next.topup_daily_ngn, next.play_limit_min, next.curfew_start, next.curfew_end, next.break_every_min, now);
  forget(app, uid); return view(app, uid);
}
async function needPin(app, uid, r, pin) {
  if (!r?.pin_hash) return; const now = app.clock.now();
  if (r.pin_locked_until > now) bad('PIN_LOCKED', 'Too many wrong PIN tries. Try again later.', 429, { until: r.pin_locked_until });
  const okPin = typeof pin === 'string' && /^\d+$/.test(pin) && await app.platform.verify(pin, r.pin_hash);
  if (!okPin) { const fails = (r.pin_fails || 0) + 1; const lock = fails >= G.pin.maxFails; app.db.prepare('UPDATE guardian_settings SET pin_fails=?, pin_locked_until=? WHERE user_id=?').run(lock ? 0 : fails, lock ? now + G.pin.lockMs : 0, uid); app.db.prepare('INSERT INTO audit_log(actor,action,detail,created_at) VALUES (?,?,?,?)').run(`user:${uid}`, 'guardian_pin_fail', lock ? 'locked' : `fail ${fails}`, now); bad(pin ? 'BAD_PIN' : 'PIN_REQUIRED', pin ? 'That PIN is not right.' : 'Enter your safety PIN to change these settings.', 403); }
  if (r.pin_fails) app.db.prepare('UPDATE guardian_settings SET pin_fails=0 WHERE user_id=?').run(uid);
}
/** action 'set' (pin = the new one, current = the old when one exists) or 'clear' (current = the PIN) */
export async function setPin(app, uid, { action, pin, current } = {}) {
  if (!eligible(app, uid)) bad('OFF', 'Safety settings are not available for this account.', 409); const now = app.clock.now(); let r = rowOf(app, uid);
  if (!['set', 'clear'].includes(action)) bad('BAD_ACTION', 'action must be set or clear.');
  await needPin(app, uid, r, current);
  if (action === 'clear') { if (!r?.pin_hash) bad('NO_PIN', 'No PIN is set.', 409); app.db.prepare('UPDATE guardian_settings SET pin_hash=NULL, pin_fails=0, pin_locked_until=0, updated_at=? WHERE user_id=?').run(now, uid); }
  else { if (typeof pin !== 'string' || !new RegExp(`^\\d{${G.pin.minLen},${G.pin.maxLen}}$`).test(pin)) bad('BAD_PIN_FORMAT', `A PIN is ${G.pin.minLen} to ${G.pin.maxLen} digits.`); const hash = await app.platform.hash(pin);
    app.db.prepare(`INSERT INTO guardian_settings(user_id,updated_at,pin_hash) VALUES (?,?,?) ON CONFLICT(user_id) DO UPDATE SET pin_hash=excluded.pin_hash, pin_fails=0, pin_locked_until=0, updated_at=excluded.updated_at`).run(uid, now, hash); }
  forget(app, uid); return view(app, uid);
}
/** admin: a player forgot the PIN. Clears only the PIN (not the limits), writes the audit log. */
export function adminResetPin(app, who, actor = 'admin') {
  const u = app.db.prepare('SELECT id, username FROM users WHERE username=?').get(String(who || '').replace(/^@/, '')); if (!u) bad('NO_PLAYER', 'No such player.', 404);
  const r = app.db.prepare('UPDATE guardian_settings SET pin_hash=NULL, pin_fails=0, pin_locked_until=0 WHERE user_id=? AND pin_hash IS NOT NULL').run(u.id); forget(app, u.id);
  app.db.prepare('INSERT INTO audit_log(actor,action,detail,created_at) VALUES (?,?,?,?)').run(actor, 'guardian_pin_reset', `user ${u.id} @${u.username}`, app.clock.now()); return { ok: true, hadPin: r.changes > 0 };
}
export const exportMine = (app, uid) => { const r = rowOf(app, uid); return { settings: r ? { chat: r.chat_mode, maxStake: r.max_stake, transfersOff: !!r.transfers_off, topupDailyNgn: r.topup_daily_ngn, playLimitMin: r.play_limit_min, quietHours: r.curfew_start != null ? { start: r.curfew_start, end: r.curfew_end } : null, breakEveryMin: r.break_every_min, pinSet: !!r.pin_hash } : null, playTime: app.db.prepare('SELECT day, ms FROM guardian_play WHERE user_id=? ORDER BY day').all(uid).map(x => ({ dayKey: x.day, minutes: Math.round(x.ms / MIN) })) }; };
export const deleteMine = (app, uid) => { app.db.prepare('DELETE FROM guardian_settings WHERE user_id=?').run(uid); app.db.prepare('DELETE FROM guardian_play WHERE user_id=?').run(uid); forget(app, uid); app._gdLast?.delete(uid); };
