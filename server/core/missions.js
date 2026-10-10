// Daily and weekly missions plus the login streak. Progress is COUNTED FROM THE PLAYER'S OWN HISTORY (ledger, chat, login days), never reported by the client.
// Rewards are small, paid through the ledger (sys:faucet_missions, reasons mission_daily / mission_weekly / mission_streak) and limited by CAPS in config/progress.js.
import { bad } from './util.js';
import { MISSIONS, STREAK, CAPS } from '../config/progress.js';
import { measure, streakOf } from './progress-metrics.js';
export { streakOf };
import { grantReward, capLeft, dayKey, dayStart, weekKey, weekStart, dayLabel } from './rewards.js';

const mulberry = (a) => () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
/** the same picks for everyone for a given period: seeded shuffle of the pool, first n */
export function pick(pool, n, seed) { const r = mulberry(seed * 2654435761 >>> 0), a = pool.map(p => p); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, n); }
export const dailyOf = (dk) => pick(MISSIONS.daily, MISSIONS.dailyCount, dk * 3 + 1);
export const weeklyOf = (wk) => pick(MISSIONS.weekly, MISSIONS.weeklyCount, wk * 5 + 2);
const eligible = (app, uid) => { const u = app.db.prepare('SELECT is_bot FROM users WHERE id=?').get(uid); return !!u && !u.is_bot && MISSIONS.enabled; };

/** remember that the player opened the game today (cheap: one write per player per day) */
export function recordLogin(app, uid, now = app.clock.now()) {
  const dk = dayKey(now); const seen = (app._loginSeen ||= new Map()); if (seen.get(uid) === dk) return dk; seen.set(uid, dk);
  app.db.prepare('INSERT OR IGNORE INTO login_days(user_id,day) VALUES (?,?)').run(uid, dk); return dk;
}
const streakReward = (n) => STREAK.rewards[(Math.max(1, n) - 1) % STREAK.rewards.length];

function line(app, uid, m, since, sinceDay, period) {
  const progress = Math.min(m.target, measure(app, uid, m.metric, { since, sinceDay })); const claimed = app.db.prepare('SELECT reward FROM mission_claims WHERE user_id=? AND mission_id=? AND period=?').get(uid, m.id, period);
  return { id: m.id, title: m.title, icon: m.icon, target: m.target, progress, reward: m.reward, done: progress >= m.target, claimed: !!claimed, paid: claimed?.reward ?? null };
}
export function view(app, uid) {
  if (!eligible(app, uid)) return { enabled: false };
  const now = app.clock.now(); const dk = recordLogin(app, uid, now), wk = weekKey(now); const sd = dayStart(dk), sw = weekStart(wk), swDay = wk * 7 - 3;
  const st = streakOf(app, uid, now); const claimedToday = app.db.prepare('SELECT reward FROM streak_claims WHERE user_id=? AND day=?').get(uid, dk);
  const nextDay = Math.max(1, st.current); const left = capLeft(app, uid, now);
  return {
    enabled: true, day: dayLabel(dk), resetsInMs: dayStart(dk + 1) - now, weekResetsInMs: weekStart(wk + 1) - now,
    daily: dailyOf(dk).map(m => line(app, uid, m, sd, dk, dk)), weekly: weeklyOf(wk).map(m => line(app, uid, m, sw, swDay, wk)),
    streak: { enabled: STREAK.enabled, current: st.current, best: st.best, claimedToday: !!claimedToday, todayReward: claimedToday ? claimedToday.reward : streakReward(nextDay), ladder: STREAK.rewards, dayInCycle: ((nextDay - 1) % STREAK.rewards.length) + 1 },
    caps: { perDay: CAPS.perDay, perWeek: CAPS.perWeek, leftNow: left }
  };
}
function pay(app, uid, amount, reason, ref, idemKey) {
  const left = capLeft(app, uid); if (left <= 0) bad('CAP_REACHED', 'You have reached today\'s (or this week\'s) mission reward limit. Come back later.', 409);
  const paid = grantReward(app, uid, { amount, reason, ref, idemKey }); return { paid, capped: paid < amount };
}
export function claim(app, uid, id) {
  if (!eligible(app, uid)) bad('OFF', 'Missions are off.', 409); const now = app.clock.now(), dk = dayKey(now), wk = weekKey(now);
  const inDaily = dailyOf(dk).find(m => m.id === id), inWeekly = weeklyOf(wk).find(m => m.id === id); const m = inDaily || inWeekly; if (!m) bad('NOT_TODAY', 'That mission is not active right now.', 404);
  const period = inDaily ? dk : wk, v = inDaily ? line(app, uid, m, dayStart(dk), dk, dk) : line(app, uid, m, weekStart(wk), wk * 7 - 3, wk);
  if (v.claimed) bad('CLAIMED', 'You already collected this one.', 409); if (!v.done) bad('NOT_DONE', `Not done yet: ${v.progress}/${v.target}.`, 409);
  const r = pay(app, uid, m.reward, inDaily ? 'mission_daily' : 'mission_weekly', m.id, `mission:${uid}:${m.id}:${period}`);
  app.db.prepare('INSERT INTO mission_claims(user_id,mission_id,period,reward,claimed_at) VALUES (?,?,?,?,?)').run(uid, m.id, period, r.paid, now);
  return { ...r, view: view(app, uid) };
}
export function claimStreak(app, uid) {
  if (!eligible(app, uid) || !STREAK.enabled) bad('OFF', 'The streak is off.', 409); const now = app.clock.now(), dk = recordLogin(app, uid, now); const st = streakOf(app, uid, now);
  if (app.db.prepare('SELECT 1 FROM streak_claims WHERE user_id=? AND day=?').get(uid, dk)) bad('CLAIMED', 'You already collected today\'s streak bonus.', 409);
  const r = pay(app, uid, streakReward(st.current), 'mission_streak', `streak:${st.current}`, `streak:${uid}:${dk}`); app.db.prepare('INSERT INTO streak_claims(user_id,day,streak,reward,claimed_at) VALUES (?,?,?,?,?)').run(uid, dk, st.current, r.paid, now);
  return { ...r, streak: st.current, view: view(app, uid) };
}
export const exportMine = (app, uid) => ({ loginDays: app.db.prepare('SELECT day FROM login_days WHERE user_id=? ORDER BY day').all(uid).map(r => dayLabel(r.day)), missionClaims: app.db.prepare('SELECT mission_id,period,reward,claimed_at FROM mission_claims WHERE user_id=?').all(uid), streakClaims: app.db.prepare('SELECT day,streak,reward,claimed_at FROM streak_claims WHERE user_id=?').all(uid) });
export const deleteMine = (app, uid) => { for (const t of ['login_days', 'mission_claims', 'streak_claims']) app.db.prepare(`DELETE FROM ${t} WHERE user_id=?`).run(uid); app._loginSeen?.delete(uid); };
