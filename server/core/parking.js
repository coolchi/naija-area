// Car parks (10 Oct 2026). A player who is DRIVING their own (owned, active) car inside a lot can park it in a bay for the lot's small fee (game money, through the ledger).
// The parked car stays in its bay for everyone to see until its owner takes it back (walk up to it), sells it, or 3 days pass (then it simply returns to the garage, no fee).
// While your active car is parked you cannot drive it somewhere else: the server ignores the 'drive' mode in the heartbeat. Ambient cars fill the other bays (deterministic, client side).
import { bad } from './util.js';
import { notify } from './economy.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { ensurePresence } from './world.js';
import { carFor } from './cars.js';
import { gameTime } from './economy.js';
import { bays, inLot, nearestFree } from './carparks-layout.js';

const lotsOf = (app) => app.city.carParks || [];
const lotById = (app, id) => lotsOf(app).find(l => l.id === id) || null;
export const parkedRow = (app, uid) => app.db.prepare('SELECT * FROM car_parking WHERE user_id=?').get(uid) || null;
/** the parked car stops the player driving it elsewhere: used by the heartbeat */
export function parkedActive(app, uid) { const r = parkedRow(app, uid); if (!r) return false; const a = app.db.prepare('SELECT id FROM player_cars WHERE user_id=? AND active=1').get(uid); return !!a && a.id === r.car_id; }
export function expireOld(app, now = app.clock.now()) { const max = app.balance.parking.maxParkedMs; const old = app.db.prepare('SELECT user_id FROM car_parking WHERE parked_at < ?').all(now - max); for (const o of old) { app.db.prepare('DELETE FROM car_parking WHERE user_id=?').run(o.user_id); notify(app, o.user_id, 'car', 'Your parked car was taken back to your garage (parked too long).'); } return old.length; }
const carView = (app, r) => { const c = app.db.prepare('SELECT model FROM player_cars WHERE id=?').get(r.car_id); const m = c && app.balance.cars.models[c.model]; return { lot: r.lot_id, bay: r.bay, x: r.x, z: r.z, ry: r.ry, parkedAt: r.parked_at, fee: r.fee, color: m?.color || '#888888', model: m?.name || 'Car' }; };

export function view(app, uid) {
  expireOld(app); const lots = lotsOf(app); const rows = app.db.prepare('SELECT * FROM car_parking').all(); const mine = rows.find(r => r.user_id === uid); const hour = gameTime(app).hour;
  return { enabled: app.balance.parking.enabled, hour, estimate: true, ownsCar: carFor(app, uid).owned, takeRangeM: app.balance.parking.takeRangeM,
    lots: lots.map(l => ({ id: l.id, name: l.name, fee: l.fee, kind: l.kind, venueId: l.venueId || null, bays: bays(l).length, taken: rows.filter(r => r.lot_id === l.id).length })),
    mine: mine ? carView(app, mine) : null,
    others: rows.filter(r => r.user_id !== uid).map(r => { const u = app.db.prepare('SELECT username FROM users WHERE id=?').get(r.user_id); return { ...carView(app, r), who: u?.username || 'player' }; }) };
}

export function park(app, uid, idemKey) {
  const P = app.balance.parking; if (!P.enabled) bad('OFF', 'Parking is switched off.', 409);
  const p = ensurePresence(app, uid); if (p.mode !== 'drive') bad('NOT_DRIVING', 'Drive your car into the car park first.', 409);
  const car = carFor(app, uid); if (!car.owned) bad('NO_OWN_CAR', 'Only your own car can be parked here. Buy one at Naija Auto Mart.', 409);
  if (parkedRow(app, uid)) bad('ALREADY_PARKED', 'Your car is already parked.', 409);
  const lot = lotsOf(app).find(l => inLot(l, p.x, p.z, P.lotPadM)); if (!lot) bad('NOT_IN_LOT', 'You are not inside a car park.', 409);
  return app.db.transaction(() => {
    const taken = app.db.prepare('SELECT bay FROM car_parking WHERE lot_id=?').all(lot.id).map(r => r.bay); const bay = nearestFree(lot, p.x, p.z, taken); if (!bay) bad('LOT_FULL', 'This car park is full.', 409);
    const cash = balanceOf(app.db, cashId(uid)); if (cash < lot.fee) bad('NO_FUNDS', `Parking costs ₦${lot.fee}.`, 402, { fee: lot.fee });
    if (lot.fee > 0) move(app, { from: cashId(uid), to: SYS.SINK_FEES, amount: lot.fee, reason: 'parking', ref: lot.id, userId: uid, idemKey: idemKey ? `park:${uid}:${idemKey}` : null });
    app.db.prepare('INSERT INTO car_parking(user_id,car_id,lot_id,bay,x,z,ry,parked_at,fee) VALUES (?,?,?,?,?,?,?,?,?)').run(uid, car.id, lot.id, bay.i, bay.x, bay.z, bay.ry, app.clock.now(), lot.fee);
    p.mode = 'walk'; // the player steps out beside the car, on the aisle side
    const ax = bay.x, az = bay.z + (bay.ry < 0 ? 4.2 : -4.2); p.x = ax; p.z = az; p.trail = [{ t: app.clock.now(), x: ax, z: az, ry: p.ry }]; p.force = { x: ax, z: az }; app.db.prepare('UPDATE player_state SET x=?,z=?,mode=? WHERE user_id=?').run(ax, az, 'walk', uid);
    return { ok: true, fee: lot.fee, lot: lot.id, lotName: lot.name, bay: bay.i, out: { x: ax, z: az }, cash: balanceOf(app.db, cashId(uid)), text: lot.fee ? `Parked at ${lot.name} (₦${lot.fee}).` : `Parked at ${lot.name}.` };
  })();
}

export function take(app, uid) {
  const P = app.balance.parking; const r = parkedRow(app, uid); if (!r) bad('NOT_PARKED', 'You have no parked car.', 409);
  const p = ensurePresence(app, uid); if (p.mode === 'drive') bad('ALREADY_DRIVING', 'You are already driving.', 409);
  if (Math.hypot(p.x - r.x, p.z - r.z) > P.takeRangeM) bad('TOO_FAR', 'Walk closer to your parked car first.', 409, { x: r.x, z: r.z });
  app.db.prepare('DELETE FROM car_parking WHERE user_id=?').run(uid); p.mode = 'drive'; p.ry = r.ry; p.x = r.x; p.z = r.z; p.trail = [{ t: app.clock.now(), x: r.x, z: r.z, ry: r.ry }]; p.force = { x: r.x, z: r.z };
  app.db.prepare('UPDATE player_state SET x=?,z=?,ry=?,mode=? WHERE user_id=?').run(r.x, r.z, r.ry, 'drive', uid);
  return { ok: true, at: { x: r.x, z: r.z, ry: r.ry }, text: 'You are back in your car.' };
}
