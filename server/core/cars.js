// Car showroom + garage. Fictional models, placeholder ESTIMATE prices (balance.cars). Cars change what the 'car' commute mode costs, how fast it is,
// and the mood you arrive with. Resale: value = paid * max(floor, 1 - firstDriveOff - perDay * ageDays).
import { bad } from './util.js';
import { notify, addMood } from './economy.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { ensurePresence } from './world.js';

const DAY = 86400000;
export const modelDef = (app, id) => app.balance.cars.models[id];
export function resaleValue(app, car, now = app.clock.now()) {
  const R = app.balance.cars.resale; const days = Math.max(0, (now - car.bought_at) / DAY);
  return Math.floor(car.paid * Math.max(R.floorFraction, 1 - R.firstDriveOffFraction - R.perDayDepreciation * days));
}
const rows = (app, uid) => app.db.prepare('SELECT * FROM player_cars WHERE user_id=? ORDER BY id').all(uid);
/** Meco: condition 40..100 (falls with days since the last service or purchase) and the short post-service perk. */
export function conditionOf(app, car, now = app.clock.now()) {
  const M = app.balance.cars.meco; const days = Math.max(0, (now - Math.max(car.bought_at, car.serviced_at || 0)) / DAY);
  const dmg = car.damage || 0; const pct = Math.max(0, Math.min(Math.max(M.wearFloor, Math.round(100 - M.wearPerDay * days)), 100 - dmg)); const perk = (car.serviced_until || 0) > now;
  return { pct, damage: dmg, health: 100 - dmg, label: perk ? 'Just serviced' : pct >= 85 ? 'Sweet' : pct >= M.roughBelow ? 'Okay' : 'Rough, go service am', perk, perkUntil: perk ? car.serviced_until : null, rough: !perk && pct < M.roughBelow };
}
export function carFor(app, uid) { // the car used by the 'car' travel mode
  const a = app.db.prepare('SELECT * FROM player_cars WHERE user_id=? AND active=1').get(uid); const C = app.balance.cars;
  if (a) { const m = modelDef(app, a.model); const cd = conditionOf(app, a); const M = C.meco;
    const mood = cd.perk ? m.mood + M.perkMood : cd.rough ? Math.max(0, m.mood - M.roughMoodPenalty) : m.mood; const perM = cd.perk ? m.perM * (1 - M.fareDiscount) : m.perM;
    return { id: a.id, model: a.model, label: m.name, base: 0, perM, speed: m.speed, mood, owned: true, color: m.color, body: m.body, condition: cd.pct, health: cd.health, perk: cd.perk }; }
  const b = C.borrowed; return { id: null, model: 'borrowed', label: b.name, base: b.base, perM: b.perM, speed: b.speed, mood: b.mood, owned: false };
}
export function carValue(app, uid) { const now = app.clock.now(); return rows(app, uid).reduce((s, c) => s + resaleValue(app, c, now), 0); }
export function garageView(app, uid) {
  const C = app.balance.cars; const now = app.clock.now();
  return { slots: C.garageSlots, borrowed: C.borrowed, active: carFor(app, uid),
    cars: rows(app, uid).map(c => { const m = modelDef(app, c.model); const cd = conditionOf(app, c, now); return { health: cd.health, damage: cd.damage, condition: cd.pct, conditionLabel: cd.label, perkUntil: cd.perkUntil, id: c.id, model: c.model, name: m.name, color: m.color, body: m.body, paid: c.paid, value: resaleValue(app, c, now), active: !!c.active, perM: m.perM, speed: m.speed, mood: m.mood, ageDays: Math.floor((now - c.bought_at) / DAY) }; }),
    catalogue: Object.entries(C.models).map(([id, m]) => ({ id, name: m.name, price: m.price, perM: m.perM, speed: m.speed, mood: m.mood, color: m.color, body: m.body, exclusive: !!m.exclusive, estimate: !m.exclusive })), resale: C.resale };
}
export function buyCar(app, uid, model, idemKey) {
  const m = modelDef(app, model); if (!m) bad('NO_MODEL', 'We do not sell that model.', 404);
  const p = ensurePresence(app, uid); if (p.venue !== 'venue_motors') bad('NOT_IN_SHOWROOM', 'Go inside the showroom to buy a car.', 409);
  return app.db.transaction(() => {
    const have = rows(app, uid); if (have.length >= app.balance.cars.garageSlots) bad('GARAGE_FULL', `Your garage holds ${app.balance.cars.garageSlots} cars. Sell one first.`, 409);
    move(app, { from: cashId(uid), to: SYS.SINK_CARS, amount: m.price, reason: 'car_purchase', ref: model, userId: uid, idemKey: idemKey ? `car:${uid}:${idemKey}` : null });
    const r = app.db.prepare('INSERT INTO player_cars(user_id,model,paid,bought_at,active) VALUES (?,?,?,?,?)').run(uid, model, m.price, app.clock.now(), have.length ? 0 : 1);
    if (have.length) { /* keeps the current active car; switch in the garage */ }
    notify(app, uid, 'car', `Congrats! Your ${m.name} is parked in the garage. Drive am well!`); addMood(app, uid, 5);
    return { ok: true, carId: Number(r.lastInsertRowid), cash: balanceOf(app.db, cashId(uid)), active: !have.length };
  })();
}
export function setActive(app, uid, carId) {
  const c = app.db.prepare('SELECT * FROM player_cars WHERE id=? AND user_id=?').get(carId, uid); if (!c) bad('NO_CAR', 'That car is not yours.', 404);
  app.db.transaction(() => { app.db.prepare('UPDATE player_cars SET active=0 WHERE user_id=?').run(uid); app.db.prepare('UPDATE player_cars SET active=1 WHERE id=?').run(carId); })(); return { ok: true };
}
export function sellCar(app, uid, carId, idemKey) {
  const c = app.db.prepare('SELECT * FROM player_cars WHERE id=? AND user_id=?').get(carId, uid); if (!c) bad('NO_CAR', 'That car is not yours.', 404);
  return app.db.transaction(() => {
    const value = resaleValue(app, c); const del = app.db.prepare('DELETE FROM player_cars WHERE id=?').run(carId); app.db.prepare('DELETE FROM car_parking WHERE car_id=?').run(carId); if (del.changes !== 1) bad('CONFLICT', 'Already sold.', 409);
    move(app, { from: SYS.FAUCET_CARS, to: cashId(uid), amount: value, reason: 'car_resale', ref: String(carId), userId: uid, idemKey: idemKey ? `carsell:${uid}:${idemKey}` : `carsell:${carId}` });
    if (c.active) { const next = app.db.prepare('SELECT id FROM player_cars WHERE user_id=? ORDER BY id LIMIT 1').get(uid); if (next) app.db.prepare('UPDATE player_cars SET active=1 WHERE id=?').run(next.id); }
    return { ok: true, value, cash: balanceOf(app.db, cashId(uid)) };
  })();
}

// ---- Meco: the mechanic. 'Check my car' shows the garage with condition; 'Service' costs a placeholder fee (cash -> sys:sink_cars) and gives a short perk.
export function mecoCheck(app, uid) {
  const g = garageView(app, uid); const M = app.balance.cars.meco; const act = g.cars.find(c => c.active) || null;
  return { cars: g.cars.map(c => ({ health: c.health, damage: c.damage, repairFee: c.damage * app.balance.crash.repairPerPoint, id: c.id, name: c.name, active: c.active, condition: c.condition, label: c.conditionLabel, perkUntil: c.perkUntil, ageDays: c.ageDays })), borrowed: !act, active: act,
    repairPerPoint: app.balance.crash.repairPerPoint, fee: M.serviceFee, perk: { minutes: Math.round(M.perkMs / 60000), farePctOff: Math.round(M.fareDiscount * 100), extraMood: M.perkMood }, roughBelow: M.roughBelow, estimate: true, now: app.clock.now(),
    text: act ? (act.condition >= 85 ? 'Your car dey sweet.' : act.condition >= M.roughBelow ? 'E dey okay, but service no go hurt.' : 'Ah! This car dey tire. Make we service am.') : 'You no get your own car. Borrowed car no be our work.' };
}
export function mecoService(app, uid, idemKey) {
  const p = ensurePresence(app, uid); if (p.venue !== 'venue_meco') bad('NOT_AT_MECO', 'Go inside Meco to service your car.', 409);
  return app.db.transaction(() => {
    const c = app.db.prepare('SELECT * FROM player_cars WHERE user_id=? AND active=1').get(uid); if (!c) bad('NO_CAR', 'You no get your own car yet. Buy one at the Auto Mart.', 409);
    const now = app.clock.now(); const M = app.balance.cars.meco; if ((c.serviced_until || 0) > now) bad('STILL_FRESH', 'Your car still dey sweet from the last service. Come back later.', 409);
    move(app, { from: cashId(uid), to: SYS.SINK_CARS, amount: M.serviceFee, reason: 'car_service', ref: String(c.id), userId: uid, idemKey: idemKey ? `carsvc:${uid}:${idemKey}` : null });
    app.db.prepare('UPDATE player_cars SET serviced_at=?, serviced_until=? WHERE id=?').run(now, now + M.perkMs, c.id);
    const mood = addMood(app, uid, 1); const m = modelDef(app, c.model); notify(app, uid, 'car', `Meco don service your ${m.name}. E dey run sweet now!`);
    return { ok: true, text: 'Engine don sweet! Meco don fix am. 🔧', perkUntil: now + M.perkMs, condition: 100, fee: M.serviceFee, mood, cash: balanceOf(app.db, cashId(uid)) };
  })();
}
