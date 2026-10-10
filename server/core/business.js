// Player-owned businesses: Mama Put, Barber, Provision shop, Car wash. GAME MONEY ONLY. Numbers live in server/config/business.js (all ESTIMATES).
// A business earns lazily: every view or action first SETTLES it from its last settlement time up to now in fixed steps (so it is deterministic and the same on SQLite and Postgres),
// but never more than `accrueCapHours` back and never more than `dailyNetCap` of net per UTC day. Revenue comes from a faucet account, supplies/wages/upkeep go to a sink
// account, and the owner gets the net in ONE balanced ledger transaction when they collect (reason `business_collect`). Buying, upgrading and selling use the ledger too.
import { bad, dayKey } from './util.js';
import { screen } from './filter.js';
import { cleanText } from './util.js';
import { move, post, cashId, balanceOf, SYS } from './ledger.js';
import { gameTime, notify } from './economy.js';
import { cityIdOf } from './cities.js';
import { mulberry32 } from './casual/merge.js';
import { BUSINESS } from '../config/business.js';

export const cfg = (app) => app.balance.business || BUSINESS;
/** other modules (weather, events) may scale demand: fn(app, businessType, realMs) -> multiplier. Registered at start-up. */
export const demandHooks = [];
const demandMult = (app, type, t) => demandHooks.reduce((m, f) => m * (f(app, type, t) ?? 1), 1);
const hashStr = (s) => { let x = 2166136261; for (const c of String(s)) x = Math.imul(x ^ c.charCodeAt(0), 16777619) >>> 0; return x >>> 0; };
const money = (n) => '₦' + Math.round(n).toLocaleString('en-NG');

const rowOf = (app, id) => app.db.prepare('SELECT * FROM businesses WHERE id=?').get(Number(id));
const mine = (app, uid, id) => { const b = rowOf(app, id); if (!b || b.user_id !== uid) bad('NO_BUSINESS', 'That business is not yours.', 404); return b; };
const staffOf = (app, id) => app.db.prepare('SELECT id, name, skill, wage, hired_at FROM business_staff WHERE business_id=? ORDER BY id').all(id);
const levelOf = (T, b) => T.levels[Math.min(T.levels.length, b.level) - 1];
const capacity = (C, staff) => Math.min(1, C.soloCapacity + staff.reduce((s, x) => s + (C.staffSkill[x.skill]?.capacity || 0), 0));

/** the figures for one settlement step ending in real time `t` (pure given the clock and hooks) */
export function stepFigures(app, b, staff, t) {
  const C = cfg(app), T = C.types[b.type]; const hrs = C.stepMinutes / 60; const mid = t - C.stepMinutes * 30000;
  const demand = T.demand[gameTime(app, mid).hour] * demandMult(app, b.type, mid);
  const revenue = Math.round(T.baseRevenuePerHour * levelOf(T, b).mult * demand * capacity(C, staff) * hrs);
  let costs = Math.round(revenue * T.suppliesFraction) + Math.round(T.upkeepPerHour * hrs) + Math.round(staff.reduce((s, x) => s + x.wage, 0) * hrs);
  costs = Math.min(costs, revenue);                        // a quiet hour never makes the owner pay out of pocket
  return { revenue, costs, net: revenue - costs, demand };
}
/** bring the business up to date; returns the fresh row */
export function settle(app, b) {
  const C = cfg(app); const now = app.clock.now(); const step = C.stepMinutes * 60000;
  const from = Math.max(b.settled_at, now - C.accrueCapHours * 3600000); const n = Math.floor((now - from) / step); if (n < 1) return b;
  const staff = staffOf(app, b.id); let gross = b.accrued_gross, costs = b.accrued_costs, day = b.day, dayNet = b.day_net;
  for (let i = 1; i <= n; i++) {
    const t = from + i * step; const dk = dayKey(t); if (dk !== day) { day = dk; dayNet = 0; }
    const f = stepFigures(app, b, staff, t); const room = Math.max(0, C.dailyNetCap - dayNet); const net = Math.min(f.net, room);
    dayNet += net; gross += f.costs + net; costs += f.costs;
  }
  app.db.prepare('UPDATE businesses SET settled_at=?, accrued_gross=?, accrued_costs=?, day=?, day_net=? WHERE id=?').run(from + n * step, gross, costs, day, dayNet, b.id);
  return rowOf(app, b.id);
}
/** the pool of people you can hire today (changes each game day; the same for everybody looking at this business) */
export function candidates(app, b) {
  const C = cfg(app); const day = gameTime(app).day; const rng = mulberry32(hashStr(`staff:${b.id}:${day}`)); const out = [];
  for (let i = 0; i < C.candidatesPerDay; i++) { const skill = 1 + Math.floor(rng() * 3); const name = C.staffNames[Math.floor(rng() * C.staffNames.length)]; out.push({ id: `${day}:${i}`, name, skill, skillLabel: C.staffSkill[skill].label, wagePerHour: C.staffSkill[skill].wagePerHour }); }
  return out;
}
const bizView = (app, b) => {
  const C = cfg(app), T = C.types[b.type]; const staff = staffOf(app, b.id); const lv = levelOf(T, b); const next = T.levels[b.level] || null; const now = app.clock.now();
  const f = stepFigures(app, b, staff, now); const perHour = Math.round(f.net * 60 / C.stepMinutes);
  return { id: b.id, type: b.type, name: b.name, icon: T.icon, typeName: T.name, city: b.city_id, level: b.level, maxStaff: lv.maxStaff, staff: staff.map(s => ({ id: s.id, name: s.name, skill: s.skill, skillLabel: C.staffSkill[s.skill].label, wagePerHour: s.wage })), candidates: staff.length < lv.maxStaff ? candidates(app, b) : [],
    ready: Math.max(0, b.accrued_gross - b.accrued_costs), earnedTotal: b.earned_total, capacity: Math.round(capacity(C, staff) * 100), demandNow: Math.round(f.demand * 100), netPerHourNow: perHour, upgradeCost: next ? next.upgrade : null, sellFor: Math.floor(b.paid * C.sellBackFraction), todayNet: b.day === dayKey(now) ? b.day_net : 0, dailyNetCap: C.dailyNetCap, accrueCapHours: C.accrueCapHours };
};
export function view(app, uid) {
  const C = cfg(app); const own = app.db.prepare('SELECT * FROM businesses WHERE user_id=? ORDER BY id').all(uid).map(b => bizView(app, settle(app, b)));
  const have = new Set(own.map(b => b.type));
  return { owned: own, forSale: Object.entries(C.types).map(([id, T]) => ({ id, name: T.name, icon: T.icon, blurb: T.blurb, cost: T.cost, owned: have.has(id), maxStaffAtStart: T.levels[0].maxStaff })), rules: { maxPerPlayer: C.maxPerPlayer, minAccountAgeMin: Math.round(C.minAccountAgeMs / 60000), accrueCapHours: C.accrueCapHours, dailyNetCap: C.dailyNetCap, sellBackPercent: Math.round(C.sellBackFraction * 100) },
    cash: balanceOf(app.db, cashId(uid)), note: 'Prices, incomes and caps are placeholders (ESTIMATE). Game money only: no cash-out.' };
}
function cleanName(C, name, fallback) {
  const n = cleanText(name || fallback, C.nameMax); if (n.length < C.nameMin) bad('BAD_NAME', `Give it a name of at least ${C.nameMin} letters.`);
  const sc = screen(n); if (!sc.ok) bad(sc.code, sc.message); return n;
}
export function buy(app, uid, type, name, idem) {
  const C = cfg(app); const T = C.types[type]; if (!T) bad('NO_TYPE', 'There is no such business.', 404);
  const u = app.db.prepare('SELECT is_guest, is_bot, created_at FROM users WHERE id=?').get(uid); if (!u || u.is_bot) bad('NO_PLAYER', 'Unknown player.', 404);
  if (u.is_guest && !C.guestsMay) bad('GUEST', 'Create an account first: guests cannot own a business.', 403);
  if (app.clock.now() - u.created_at < C.minAccountAgeMs) bad('TOO_NEW', `Your account is too new. Come back in ${Math.ceil((C.minAccountAgeMs - (app.clock.now() - u.created_at)) / 60000)} minutes.`, 403);
  const nm = cleanName(C, name, T.name);
  return app.db.transaction(() => {
    if (app.db.prepare('SELECT COUNT(*) n FROM businesses WHERE user_id=?').get(uid).n >= C.maxPerPlayer) bad('TOO_MANY', `You can own at most ${C.maxPerPlayer} businesses.`, 409);
    if (app.db.prepare('SELECT 1 FROM businesses WHERE user_id=? AND type=?').get(uid, type)) bad('ALREADY', `You already own a ${T.name}.`, 409);
    move(app, { from: cashId(uid), to: SYS.SINK_BUSINESS, amount: T.cost, reason: 'business_buy', ref: type, userId: uid, idemKey: idem ? `bizbuy:${uid}:${type}:${idem}` : null });
    const id = Number(app.db.prepare('INSERT INTO businesses(user_id,type,city_id,name,level,paid,bought_at,settled_at) VALUES (?,?,?,?,?,?,?,?)').run(uid, type, cityIdOf(app, uid), nm, 1, T.cost, app.clock.now(), app.clock.now()).lastInsertRowid);
    return { ok: true, id, charged: T.cost, text: `${nm} is open for business! Hire staff and come back to collect.`, ...view(app, uid) };
  })();
}
export function collect(app, uid, id, idem) {
  return app.db.transaction(() => {
    let b = mine(app, uid, id); b = settle(app, b); const net = b.accrued_gross - b.accrued_costs;
    if (net <= 0) { app.db.prepare('UPDATE businesses SET accrued_gross=0, accrued_costs=0 WHERE id=?').run(b.id); return { ok: true, collected: 0, text: 'Nothing to collect yet. Customers are on the way.', ...view(app, uid) }; }
    const legs = [{ account: SYS.FAUCET_BUSINESS, amount: -b.accrued_gross }, { account: cashId(uid), amount: net }]; if (b.accrued_costs > 0) legs.push({ account: SYS.SINK_BUSINESS, amount: b.accrued_costs });
    post(app, { reason: 'business_collect', ref: `biz:${b.id}`, userId: uid, idemKey: idem ? `bizcollect:${b.id}:${idem}` : null, legs });
    app.db.prepare('UPDATE businesses SET accrued_gross=0, accrued_costs=0, earned_total=earned_total+? WHERE id=?').run(net, b.id);
    return { ok: true, collected: net, paidOut: b.accrued_costs, text: `${b.name}: you banked ${money(net)} (after ${money(b.accrued_costs)} for supplies, wages and upkeep).`, ...view(app, uid) };
  })();
}
export function hire(app, uid, id, candidateId) {
  return app.db.transaction(() => {
    let b = mine(app, uid, id); b = settle(app, b); const C = cfg(app); const T = C.types[b.type]; const staff = staffOf(app, b.id);
    if (staff.length >= levelOf(T, b).maxStaff) bad('FULL', 'This business has all the staff it can hold. Upgrade it for more.', 409);
    const c = candidates(app, b).find(x => x.id === String(candidateId)); if (!c) bad('NO_CANDIDATE', 'That person is no longer looking for work. Check today\'s list.', 404);
    app.db.prepare('INSERT INTO business_staff(business_id,name,skill,wage,hired_at) VALUES (?,?,?,?,?)').run(b.id, c.name, c.skill, c.wagePerHour, app.clock.now());
    return { ok: true, text: `${c.name} (${c.skillLabel}) now works at ${b.name}.`, ...view(app, uid) };
  })();
}
export function fire(app, uid, id, staffId) {
  return app.db.transaction(() => {
    let b = mine(app, uid, id); b = settle(app, b); const s = app.db.prepare('SELECT * FROM business_staff WHERE id=? AND business_id=?').get(Number(staffId), b.id); if (!s) bad('NO_STAFF', 'No such worker.', 404);
    app.db.prepare('DELETE FROM business_staff WHERE id=?').run(s.id); return { ok: true, text: `${s.name} has left.`, ...view(app, uid) };
  })();
}
export function upgrade(app, uid, id, idem) {
  return app.db.transaction(() => {
    let b = mine(app, uid, id); b = settle(app, b); const T = cfg(app).types[b.type]; const next = T.levels[b.level]; if (!next) bad('MAX_LEVEL', 'Already at the top level.', 409);
    move(app, { from: cashId(uid), to: SYS.SINK_BUSINESS, amount: next.upgrade, reason: 'business_upgrade', ref: `biz:${b.id}:${b.level + 1}`, userId: uid, idemKey: idem ? `bizup:${b.id}:${b.level + 1}:${idem}` : null });
    app.db.prepare('UPDATE businesses SET level=level+1, paid=paid+? WHERE id=?').run(next.upgrade, b.id); return { ok: true, text: `${b.name} is now level ${b.level + 1}.`, ...view(app, uid) };
  })();
}
export function rename(app, uid, id, name) { const b = mine(app, uid, id); const nm = cleanName(cfg(app), name); app.db.prepare('UPDATE businesses SET name=? WHERE id=?').run(nm, b.id); return { ok: true, ...view(app, uid) }; }
export function sell(app, uid, id, idem) {
  return app.db.transaction(() => {
    let b = mine(app, uid, id); b = settle(app, b); const C = cfg(app); const net = b.accrued_gross - b.accrued_costs;
    if (net > 0) { const legs = [{ account: SYS.FAUCET_BUSINESS, amount: -b.accrued_gross }, { account: cashId(uid), amount: net }]; if (b.accrued_costs > 0) legs.push({ account: SYS.SINK_BUSINESS, amount: b.accrued_costs }); post(app, { reason: 'business_collect', ref: `biz:${b.id}`, userId: uid, legs }); }
    const back = Math.floor(b.paid * C.sellBackFraction);
    if (back > 0) move(app, { from: SYS.SINK_BUSINESS, to: cashId(uid), amount: back, reason: 'business_sell', ref: `biz:${b.id}`, userId: uid, idemKey: idem ? `bizsell:${b.id}:${idem}` : null });
    app.db.prepare('DELETE FROM business_staff WHERE business_id=?').run(b.id); app.db.prepare('DELETE FROM businesses WHERE id=?').run(b.id);
    notify(app, uid, 'business', `You sold ${b.name} for ${money(back)}.`); return { ok: true, received: back + Math.max(0, net), text: `${b.name} sold for ${money(back)}.`, ...view(app, uid) };
  })();
}
