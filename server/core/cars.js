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
export function carFor(app, uid) { // the car used by the 'car' travel mode
  const a = app.db.prepare('SELECT * FROM player_cars WHERE user_id=? AND active=1').get(uid); const C = app.balance.cars;
  if (a) { const m = modelDef(app, a.model); return { id: a.id, model: a.model, label: m.name, base: 0, perM: m.perM, speed: m.speed, mood: m.mood, owned: true, color: m.color, body: m.body }; }
  const b = C.borrowed; return { id: null, model: 'borrowed', label: b.name, base: b.base, perM: b.perM, speed: b.speed, mood: b.mood, owned: false };
}
export function carValue(app, uid) { const now = app.clock.now(); return rows(app, uid).reduce((s, c) => s + resaleValue(app, c, now), 0); }
export function garageView(app, uid) {
  const C = app.balance.cars; const now = app.clock.now();
  return { slots: C.garageSlots, borrowed: C.borrowed, active: carFor(app, uid),
    cars: rows(app, uid).map(c => { const m = modelDef(app, c.model); return { id: c.id, model: c.model, name: m.name, color: m.color, paid: c.paid, value: resaleValue(app, c, now), active: !!c.active, perM: m.perM, speed: m.speed, mood: m.mood, ageDays: Math.floor((now - c.bought_at) / DAY) }; }),
    catalogue: Object.entries(C.models).map(([id, m]) => ({ id, name: m.name, price: m.price, perM: m.perM, speed: m.speed, mood: m.mood, color: m.color, estimate: true })), resale: C.resale };
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
    const value = resaleValue(app, c); const del = app.db.prepare('DELETE FROM player_cars WHERE id=?').run(carId); if (del.changes !== 1) bad('CONFLICT', 'Already sold.', 409);
    move(app, { from: SYS.FAUCET_CARS, to: cashId(uid), amount: value, reason: 'car_resale', ref: String(carId), userId: uid, idemKey: idemKey ? `carsell:${uid}:${idemKey}` : `carsell:${carId}` });
    if (c.active) { const next = app.db.prepare('SELECT id FROM player_cars WHERE user_id=? ORDER BY id LIMIT 1').get(uid); if (next) app.db.prepare('UPDATE player_cars SET active=1 WHERE id=?').run(next.id); }
    return { ok: true, value, cash: balanceOf(app.db, cashId(uid)) };
  })();
}
