// Inactivity tax (Sherif, 28 Oct 2026). In-game ₦ only: never real money, never MoniPay or the payments module.
// Away (no login, no heartbeat) longer than graceMs: one charge of `rate` x net worth for EACH full 24 h away (day 1 = 24..48 h, ...).
// Net worth = cash + bank (savings). Property and cars are NOT counted and never sold. Paid from cash first, then bank; never below zero.
// Idempotent: one row per (player, away-stretch start = last_seen, day number) with a primary key, and the ledger idem key matches it,
// so the scheduled tick and the login catch-up can both run and a day is charged once.
import { INACTIVITY_TAX as DEF } from '../config/inactivity-tax.js';
import { move, cashId, savId, balanceOf, SYS } from './ledger.js';
import { activeBan } from './moderation.js';
import { notify } from './economy.js';

export const taxCfg = (app) => ({ ...DEF, ...(app.balance.inactivityTax || {}) });
const DAY = 86400000;
const naira = (n) => '₦' + Math.round(n).toLocaleString('en-NG');
export const netWorthForTax = (app, uid) => balanceOf(app.db, cashId(uid)) + balanceOf(app.db, savId(uid));

function exempt(app, u) {
  const C = taxCfg(app);
  if (!u || u.is_bot) return 'bot';
  if (u.is_guest && !C.guests) return 'guest';
  if (/^deleted_/.test(u.username || '')) return 'deleted';
  if ((C.exemptUsernames || []).some(n => String(n).toLowerCase() === String(u.username).toLowerCase())) return 'staff';
  try { if (activeBan(app, u.id)) return 'banned'; } catch { /* sanctions table missing in very old dbs */ }
  return null;
}

/** charge every full day owed for the current away stretch (uses users.last_seen, which the caller has NOT yet moved). Returns charges made now. */
export function chargeAway(app, uid, now = app.clock.now()) {
  const C = taxCfg(app); if (!C.enabled) return [];
  const u = app.db.prepare('SELECT id, username, is_bot, is_guest, last_seen FROM users WHERE id=?').get(uid); if (!u || !u.last_seen) return [];
  const away = now - u.last_seen; if (away <= C.graceMs) return [];
  if (exempt(app, u)) return [];
  // "over 24 h away pays 1%": day n is owed once away > grace + (n-1) x 24 h (25 h away = 1 charge, 49 h = 2, ...)
  const days = Math.min(C.maxDaysPerCatchUp, Math.floor((away - C.graceMs - 1) / DAY) + 1);
  const out = [];
  for (let n = 1; n <= days; n++) {
    const r = app.db.transaction(() => {
      if (app.db.prepare('SELECT 1 FROM inactivity_tax_charges WHERE user_id=? AND away_from=? AND n=?').get(uid, u.last_seen, n)) return null;
      const cash = balanceOf(app.db, cashId(uid)), bank = balanceOf(app.db, savId(uid)); const worth = cash + bank;
      let amount = worth < C.minNetWorth ? 0 : Math.floor(worth * C.rate); amount = Math.min(amount, worth);
      app.db.prepare('INSERT INTO inactivity_tax_charges(user_id, away_from, n, amount, net_worth, from_cash, from_bank, charged_at, notified) VALUES (?,?,?,?,?,?,?,?,0)')
        .run(uid, u.last_seen, n, amount, worth, Math.min(amount, cash), Math.max(0, amount - cash), now);
      const fc = Math.min(amount, cash), fb = amount - fc; const ref = `${u.last_seen}:${n}`;
      if (fc > 0) move(app, { from: cashId(uid), to: SYS.SINK_INACTIVITY_TAX, amount: fc, reason: 'inactivity_tax', ref, userId: uid, idemKey: `inactax:${uid}:${ref}:cash` });
      if (fb > 0) move(app, { from: savId(uid), to: SYS.SINK_INACTIVITY_TAX, amount: fb, reason: 'inactivity_tax', ref, userId: uid, idemKey: `inactax:${uid}:${ref}:bank` });
      return { n, amount, worth };
    })();
    if (r) out.push(r);
  }
  return out;
}
/** login / first heartbeat: charge what is owed, then one notice for everything not told yet ("You were away X days, tax ₦Y"). */
export function taxCatchUp(app, uid, now = app.clock.now()) {
  let charged = []; try { charged = chargeAway(app, uid, now); } catch (e) { console.error('inactivityTax', e); return null; }
  const rows = app.db.prepare('SELECT away_from, n, amount FROM inactivity_tax_charges WHERE user_id=? AND notified=0').all(uid); if (!rows.length) return null;
  app.db.prepare('UPDATE inactivity_tax_charges SET notified=1 WHERE user_id=? AND notified=0').run(uid);
  const total = rows.reduce((s, r) => s + Number(r.amount), 0); const away = Math.floor((now - Math.min(...rows.map(r => Number(r.away_from)))) / DAY);
  const text = total > 0 ? `You were away ${away} day${away === 1 ? '' : 's'}, inactivity tax ${naira(total)} (1% of your cash + bank per day away).` : `You were away ${away} day${away === 1 ? '' : 's'}. No inactivity tax: your cash + bank is under ${naira(taxCfg(app).minNetWorth)}.`;
  if (total > 0) notify(app, uid, 'tax', text);
  return { days: away, total, text, charged: charged.length };
}
/** scheduled job: charge everyone away past the grace (the notice waits for their next login). Runs at most once per `everyMs`. */
export function tickInactivityTax(app, { everyMs = 3600000, limit = 500 } = {}) {
  const C = taxCfg(app); if (!C.enabled) return 0; const now = app.clock.now();
  if (app._taxTickAt && now - app._taxTickAt < everyMs) return 0; app._taxTickAt = now;
  const ids = app.db.prepare('SELECT id FROM users WHERE is_bot=0 AND last_seen IS NOT NULL AND last_seen<? ORDER BY last_seen LIMIT ?').all(now - C.graceMs, limit).map(r => r.id);
  let n = 0; for (const id of ids) { if (app.world?.players?.has(id)) continue; try { n += chargeAway(app, id, now).length; } catch (e) { console.error('inactivityTax', id, e); } }
  return n;
}
