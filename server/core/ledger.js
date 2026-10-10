// Server-authoritative double-entry ledger. The client never sends a balance; every money change is a server function
// that posts balanced legs (sum = 0) in ONE transaction. Rows are append-only (DB triggers). Accounts materialise the
// balance and a CHECK constraint forbids negative user balances; idempotency keys make retries safe.
import { bad, GameError } from './util.js';

export const SYS = { FAUCET_CASUAL: 'sys:faucet_casual', FAUCET_JOBS: 'sys:faucet_jobs', FAUCET_INTEREST: 'sys:faucet_interest', FAUCET_START: 'sys:faucet_start', FAUCET_TESTTOPUP: 'sys:faucet_test_topup',
  SINK_RENT: 'sys:sink_rent', SINK_SHOPS: 'sys:sink_shops', SINK_PROPERTY: 'sys:sink_property', SINK_FURNITURE: 'sys:sink_furniture', SINK_FEES: 'sys:sink_fees', SINK_TRANSPORT: 'sys:sink_transport', SINK_DELIVERY: 'sys:sink_delivery', FAUCET_LAND: 'sys:faucet_land', ADS_REVENUE_TEST: 'sys:ads_revenue_test', ESCROW_GAMES: 'sys:escrow_games', SINK_CARS: 'sys:sink_cars', SINK_DECOR: 'sys:sink_decor', FAUCET_CARS: 'sys:faucet_car_resale',
  FAUCET_BUSINESS: 'sys:faucet_business', SINK_BUSINESS: 'sys:sink_business', FAUCET_EVENTS: 'sys:faucet_events', SINK_MARKET: 'sys:sink_market', FAUCET_PASS: 'sys:faucet_pass', SINK_COSMETICS: 'sys:sink_cosmetics', SINK_CLUBS: 'sys:sink_clubs', SINK_ADS_EXTRA: 'sys:sink_ads_extra' };

export function ensureSystemAccounts(db) {
  const ins = db.prepare('INSERT OR IGNORE INTO accounts(id,kind,user_id,balance,allow_negative) VALUES (?,?,NULL,0,1)');
  for (const id of Object.values(SYS)) ins.run(id, 'system');
}
export function ensureUserAccounts(db, uid) {
  const ins = db.prepare('INSERT OR IGNORE INTO accounts(id,kind,user_id,balance,allow_negative) VALUES (?,?,?,0,0)');
  ins.run(`u:${uid}`, 'cash', uid); ins.run(`s:${uid}`, 'savings', uid);
}
export const cashId = (uid) => `u:${uid}`;
export const savId = (uid) => `s:${uid}`;
export function balanceOf(db, accountId) { const r = db.prepare('SELECT balance FROM accounts WHERE id=?').get(accountId); return r ? r.balance : 0; }

/** hooks run after every posted transaction (not after a duplicate-key replay is skipped by them): (app, { reason, ref, userId }, { txId, duplicate }). Used by the battle pass for XP. They must not throw into the payment. */
export const postHooks = [];
/** legs: [{account, amount}] must sum to 0. Returns {txId, duplicate}. Throws GameError INSUFFICIENT_FUNDS. */
export function post(app, { reason, ref = null, userId = null, idemKey = null, legs }) {
  const { db } = app; const now = app.clock.now();
  if (!Array.isArray(legs) || legs.length < 2) throw new Error('ledger: need >=2 legs');
  let sum = 0; for (const l of legs) { if (!Number.isInteger(l.amount) || l.amount === 0) throw new Error('ledger: amounts must be non-zero integers'); sum += l.amount; }
  if (sum !== 0) throw new Error('ledger: unbalanced transaction');
  const run = db.transaction(() => {
    if (idemKey) {
      const ex = db.prepare('SELECT id FROM ledger_tx WHERE idem_key=?').get(idemKey);
      if (ex) return { txId: ex.id, duplicate: true };
    }
    const tx = db.prepare('INSERT INTO ledger_tx(idem_key,reason,ref,user_id,created_at) VALUES (?,?,?,?,?)').run(idemKey, reason, ref, userId, now);
    const txId = Number(tx.lastInsertRowid);
    const get = db.prepare('SELECT balance, allow_negative FROM accounts WHERE id=?');
    const upd = db.prepare('UPDATE accounts SET balance=? WHERE id=?');
    const ins = db.prepare('INSERT INTO ledger_entries(tx_id,account_id,amount,balance_after,created_at) VALUES (?,?,?,?,?)');
    for (const l of legs) {
      const a = get.get(l.account); if (!a) throw new Error('ledger: unknown account ' + l.account);
      const nb = a.balance + l.amount;
      if (nb < 0 && !a.allow_negative) throw new GameError('INSUFFICIENT_FUNDS', 'Not enough cash.', 402, { need: -l.amount, have: a.balance });
      upd.run(nb, l.account); ins.run(txId, l.account, l.amount, nb, now);
    }
    return { txId, duplicate: false };
  });
  const res = run(); for (const hk of postHooks) hk(app, { reason, ref, userId }, res); return res;
}
/** move `amount` from one account to another */
export function move(app, { from, to, amount, reason, ref, userId, idemKey }) {
  if (!Number.isInteger(amount) || amount <= 0) bad('BAD_AMOUNT', 'Amount must be a positive whole number.');
  return post(app, { reason, ref, userId, idemKey, legs: [{ account: from, amount: -amount }, { account: to, amount }] });
}
export function history(db, uid, limit = 30) {
  return db.prepare(`SELECT e.id, e.amount, e.balance_after, e.created_at, t.reason, t.ref FROM ledger_entries e JOIN ledger_tx t ON t.id=e.tx_id
    WHERE e.account_id=? ORDER BY e.id DESC LIMIT ?`).all(cashId(uid), limit);
}
/** invariants used by tests + admin: total of all entries is 0; materialised balance == sum(entries) for every account; no negative user balance */
export function checkInvariants(db) {
  const total = db.prepare('SELECT COALESCE(SUM(amount),0) s FROM ledger_entries').get().s;
  const mism = db.prepare(`SELECT a.id, a.balance, COALESCE((SELECT SUM(amount) FROM ledger_entries e WHERE e.account_id=a.id),0) s FROM accounts a`).all().filter(r => r.balance !== r.s);
  const neg = db.prepare("SELECT id, balance FROM accounts WHERE allow_negative=0 AND balance<0").all();
  const unbalTx = db.prepare('SELECT tx_id, SUM(amount) s FROM ledger_entries GROUP BY tx_id HAVING SUM(amount) != 0').all();
  return { ok: total === 0 && mism.length === 0 && neg.length === 0 && unbalTx.length === 0, total, mismatched: mism, negative: neg, unbalancedTx: unbalTx };
}
export function moneySupply(db) {
  const r = db.prepare("SELECT COALESCE(SUM(balance),0) s FROM accounts WHERE allow_negative=0").get();
  return r.s;
}
