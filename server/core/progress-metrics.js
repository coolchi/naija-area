// Counters over the player's own history, used by missions (a time window) and achievements (whole life). Fixed set of query kinds: config can only pick from these, never write SQL.
import { cashId, savId, balanceOf } from './ledger.js';
import { cfgOf, equippedIds } from './wearables.js';
import { dayKey } from './rewards.js';
import { STREAK } from '../config/progress.js';

const inList = (a) => a.map(() => '?').join(',');
export const METRIC_KINDS = ['tx', 'sum', 'chat', 'logins', 'games_won', 'home', 'wealth', 'streak_best', 'wear_owned', 'wear_crown'];
/** consecutive login days ending today (or yesterday if today is not recorded yet), and the best run ever */
export function streakOf(app, uid, now = app.clock.now()) {
  const today = dayKey(now); const rows = app.db.prepare('SELECT day FROM login_days WHERE user_id=? AND day>=? ORDER BY day DESC').all(uid, today - STREAK.maxLookbackDays).map(r => r.day);
  let cur = 0, d = rows[0] === today ? today : today - 1; const set = new Set(rows); while (set.has(d)) { cur++; d--; }
  let best = 0, run = 0, prev = null; for (const x of [...rows].reverse()) { run = prev !== null && x === prev + 1 ? run + 1 : 1; best = Math.max(best, run); prev = x; }
  return { current: set.has(today) || set.has(today - 1) ? cur : 0, best, today: set.has(today) };
}
/** price of what the player is wearing right now (for the best-dressed table) */
export const wornValue = (app, uid) => { const C = cfgOf(app); return equippedIds(app, uid).reduce((s, r) => s + (C.WEARABLES.find(w => w.id === r.item_id)?.price || 0), 0); };
/** spec: { k, reasons? }. since: ms for time-based kinds (0 = ever); for 'logins' sinceDay is a day key. */
export function measure(app, uid, spec, { since = 0, sinceDay = 0 } = {}) {
  const db = app.db;
  switch (spec.k) {
    case 'tx': return db.prepare(`SELECT COUNT(*) n FROM ledger_tx WHERE user_id=? AND reason IN (${inList(spec.reasons)}) AND created_at>=?`).get(uid, ...spec.reasons, since).n;
    case 'sum': return db.prepare(`SELECT COALESCE(SUM(ABS(e.amount)),0) s FROM ledger_entries e JOIN ledger_tx t ON t.id=e.tx_id WHERE e.account_id=? AND t.reason IN (${inList(spec.reasons)}) AND e.created_at>=?`).get(cashId(uid), ...spec.reasons, since).s;
    case 'chat': return db.prepare('SELECT COUNT(*) n FROM chat_messages WHERE user_id=? AND created_at>=?').get(uid, since).n;
    case 'logins': return db.prepare('SELECT COUNT(*) n FROM login_days WHERE user_id=? AND day>=?').get(uid, sinceDay).n;
    case 'games_won': return db.prepare('SELECT COALESCE(SUM(wins),0) n FROM game_scores WHERE user_id=?').get(uid).n;
    case 'home': return db.prepare('SELECT COUNT(*) n FROM property_owner WHERE user_id=?').get(uid).n;
    case 'wealth': return balanceOf(db, cashId(uid)) + balanceOf(db, savId(uid));
    case 'streak_best': return streakOf(app, uid).best;
    case 'wear_owned': return db.prepare('SELECT COUNT(*) n FROM wearables_owned WHERE user_id=?').get(uid).n;
    case 'wear_crown': { const C = cfgOf(app); const ids = C.WEARABLES.filter(w => w.crown).map(w => w.id); if (!ids.length) return 0; return db.prepare(`SELECT COUNT(*) n FROM wearables_owned WHERE user_id=? AND item_id IN (${inList(ids)})`).get(uid, ...ids).n; }
    default: throw new Error(`unknown metric ${spec.k}`);
  }
}
