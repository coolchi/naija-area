// One place that pays small mission-style rewards through the ledger, with per-day and per-week caps (config/progress.js CAPS).
import { move, cashId, SYS } from './ledger.js';
import { CAPS } from '../config/progress.js';

const DAY = 86400000; const LAG = 3600000; // game days follow Lagos time (UTC+1, no daylight saving)
export const dayKey = (ms) => Math.floor((ms + LAG) / DAY);                     // days since 1970 in Lagos time
export const dayStart = (key) => key * DAY - LAG;
export const weekKey = (ms) => Math.floor((dayKey(ms) + 3) / 7);                // weeks start on Monday (1 Jan 1970 was a Thursday)
export const weekStart = (key) => dayStart(key * 7 - 3);
export const dayLabel = (key) => new Date(dayStart(key) + LAG).toISOString().slice(0, 10);
/** paid so far by missions-style rewards in the window */
export function paidSince(app, uid, since) { return app.db.prepare("SELECT COALESCE(SUM(e.amount),0) s FROM ledger_entries e JOIN ledger_tx t ON t.id=e.tx_id WHERE e.account_id=? AND t.reason LIKE 'mission_%' AND e.amount>0 AND e.created_at>=?").get(cashId(uid), since).s; }
export function capLeft(app, uid, now = app.clock.now()) { return Math.max(0, Math.min(CAPS.perDay - paidSince(app, uid, dayStart(dayKey(now))), CAPS.perWeek - paidSince(app, uid, weekStart(weekKey(now))))); }
/** pay `amount` (reduced to fit the caps unless countCaps is false). Returns what was actually paid (0 if nothing left). Idempotent through idemKey. */
export function grantReward(app, uid, { amount, reason, ref = null, idemKey = null, countCaps = true }) {
  let pay = Math.max(0, Math.floor(amount)); if (countCaps) pay = Math.min(pay, capLeft(app, uid)); if (pay <= 0) return 0;
  move(app, { from: SYS.FAUCET_MISSIONS, to: cashId(uid), amount: pay, reason, ref, userId: uid, idemKey }); return pay;
}
