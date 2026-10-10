// Counters over the player's own history, used by missions (a time window) and achievements (whole life). Fixed set of query kinds: config can only pick from these, never write SQL.
import { cashId } from './ledger.js';

const inList = (a) => a.map(() => '?').join(',');
export const METRIC_KINDS = ['tx', 'sum', 'chat', 'logins'];
/** spec: { k, reasons? }. since: ms for time-based kinds (0 = ever); for 'logins' sinceDay is a day key. */
export function measure(app, uid, spec, { since = 0, sinceDay = 0 } = {}) {
  const db = app.db;
  switch (spec.k) {
    case 'tx': return db.prepare(`SELECT COUNT(*) n FROM ledger_tx WHERE user_id=? AND reason IN (${inList(spec.reasons)}) AND created_at>=?`).get(uid, ...spec.reasons, since).n;
    case 'sum': return db.prepare(`SELECT COALESCE(SUM(ABS(e.amount)),0) s FROM ledger_entries e JOIN ledger_tx t ON t.id=e.tx_id WHERE e.account_id=? AND t.reason IN (${inList(spec.reasons)}) AND e.created_at>=?`).get(cashId(uid), ...spec.reasons, since).s;
    case 'chat': return db.prepare('SELECT COUNT(*) n FROM chat_messages WHERE user_id=? AND created_at>=?').get(uid, since).n;
    case 'logins': return db.prepare('SELECT COUNT(*) n FROM login_days WHERE user_id=? AND day>=?').get(uid, sinceDay).n;
    default: throw new Error(`unknown metric ${spec.k}`);
  }
}
