// Motoka Meko: Motoka's body-shop garage (drive in to fix; wrecked cars arrive by tow truck only).
import { cityOf } from './cities.js';
import { bad } from './util.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { inLot } from './carparks-layout.js';

const modelDef = (app, id) => app.balance.cars.models[id];
const note = (app, uid, kind, text) => app.db.prepare('INSERT INTO notifications(user_id,kind,text,created_at) VALUES (?,?,?,?)').run(uid, kind, text, app.clock.now());
const bumpMood = (app, uid, d) => { const s = app.db.prepare('SELECT mood FROM player_state WHERE user_id=?').get(uid); if (!s) return; app.db.prepare('UPDATE player_state SET mood=? WHERE user_id=?').run(Math.max(0, Math.min(100, (s.mood || 50) + d)), uid); };

/** Avoid importing world.js / economy.js (cycle with heartbeat). Presence is usually already live. */
function presence(app, uid) {
  let p = app.world?.players?.get(uid);
  if (!p) {
    const st = app.db.prepare('SELECT * FROM player_state WHERE user_id=?').get(uid); if (!st) bad('NO_PLAYER', 'Player not found', 404);
    const u = app.db.prepare('SELECT username,color,is_bot,is_guest FROM users WHERE id=?').get(uid);
    p = { id: uid, city: st.city_id || app.defaultCityId, name: u.username, color: u.color, isBot: !!u.is_bot, isGuest: !!u.is_guest, x: st.x, z: st.z, ry: st.ry, mode: st.mode, trail: [], lastSeen: app.clock.now(), lastPersist: 0, headless: false, chatSince: app.world.chatSeq };
    app.world.players.set(uid, p);
  }
  return p;
}
function dropAt(app, uid, x, z) {
  const p = presence(app, uid); p.x = x; p.z = z; p.mode = 'walk'; p.trail = [{ t: app.clock.now(), x, z, ry: p.ry }]; p.force = { x, z };
  app.db.prepare('UPDATE player_state SET x=?,z=?,mode=? WHERE user_id=?').run(x, z, 'walk', uid);
}

export const MEKO_VENUE = 'venue_meko';
export const MEKO_LOT = 'cp_meko';
export const MEKO_BUILDING = 'b_meko';

/** Inject Motoka Meko + drive-in garage into Lagos Mainland (clear site west of Meco). */
export function injectMotokaMeko(c) {
  if (!c || c.id !== 'lagos-mainland') return c;
  if ((c.venues || []).some((v) => v.id === MEKO_VENUE)) return c;
  c.buildings = c.buildings || [];
  c.venues = c.venues || [];
  c.carParks = c.carParks || [];
  c.buildings.push({
    kind: 'kiosk', x: -130, z: 180, w: 16, d: 10, h: 6.5, floors: 2,
    color: '#0d3b2e', face: [0, -1], id: MEKO_BUILDING, tag: 'motoka-meko', label: 'Motoka Meko',
  });
  c.venues.push({
    id: MEKO_VENUE, name: 'Motoka Meko', blurb: 'Body shop and crash repair. Drive into the garage to fix. Wrecked cars need a tow. Fees are ESTIMATES.',
    buildingId: MEKO_BUILDING, x: -130, z: 174.2, hours: [8, 20], sign: '#2389e3',
    stations: [
      { id: 'bay', type: 'service', label: 'Body bay', x: 0, z: -1.2, color: '#2389e3' },
      { id: 'check', type: 'check', label: 'Check my car', x: -2.4, z: -1.2, color: '#3a7ca5' },
      { id: 'poster', type: 'poster', label: 'Price board', x: 0, z: 2.4, color: '#f0c419',
        text: 'Motoka Meko: drive into the garage to fix crash damage. Supercars are tougher but a full fix costs about 10% of what you paid (ESTIMATE). Wrecked cars only move by tow truck.' },
    ],
    room: {
      w: 11, d: 10, wall: '#1a2e28', trim: '#2389e3',
      floor: { style: 'checker', a: '#4a4a48', b: '#3a3a38' },
      windows: [{ wall: 'front', at: 0, w: 3.2 }], mood: 'work',
      decor: [{ k: 'lift', x: 0, z: -3.2 }, { k: 'toolwall', x: -4.2, z: 0 }, { k: 'tyres', x: 3.8, z: -2.5 }],
    },
  });
  c.carParks.push({
    id: MEKO_LOT, name: 'Motoka Meko Garage', x: -130, z: 169, w: 22, d: 12, gate: 's', fee: 0,
    kind: 'service', venueId: MEKO_VENUE, blurb: 'Drive in to fix crash damage. Free bay; you pay for the body work.',
  });
  return c;
}

export function mekoLot(app, uid) {
  const city = uid ? cityOf(app, uid) : app.city;
  return (city.carParks || []).find((l) => l.id === MEKO_LOT || l.venueId === MEKO_VENUE) || null;
}

export function atMekoVenue(app, p) { return p?.venue === MEKO_VENUE || p?.venue === 'venue_meco'; }
export function inMekoGarage(app, uid, x, z) {
  const lot = mekoLot(app, uid); if (!lot) return false;
  return inLot(lot, x, z, app.balance.parking?.lotPadM ?? 1);
}
/** Walk-in Meco / Motoka Meko interior, or drive-in Motoka Meko garage bay. */
export function canRepairHere(app, uid) {
  const p = presence(app, uid);
  if (atMekoVenue(app, p)) return true;
  if (p.mode === 'drive' && inMekoGarage(app, uid, p.x, p.z)) return true;
  // wrecked car already dropped in the garage (after tow)
  if (inMekoGarage(app, uid, p.x, p.z)) return true;
  return false;
}

export function isExclusive(app, model) { return !!modelDef(app, model)?.exclusive; }

/** Repair fee for current damage. Supercars: 10% of paid × (damage/100). Regular: per-point. */
export function repairFeeOf(app, car) {
  const C = app.balance.crash; const dmg = car.damage || 0; if (!dmg) return 0;
  const m = modelDef(app, car.model);
  if (m?.exclusive) return Math.max(1, Math.round((car.paid || m.price || 0) * (C.supercar?.repairOfPaid ?? 0.1) * (dmg / 100)));
  return dmg * C.repairPerPoint;
}

export function carStateOf(app, car) {
  const C = app.balance.crash; const dmg = car.damage || 0; const wrecked = !!(car.wrecked || dmg >= (C.wreckAt ?? 100));
  return { damage: dmg, health: Math.max(0, 100 - dmg), smoke: dmg >= (C.smokeAt ?? 55), wrecked, repairFee: repairFeeOf(app, { ...car, damage: dmg }) };
}

export function wreckedActive(app, uid) {
  const c = app.db.prepare('SELECT * FROM player_cars WHERE user_id=? AND active=1').get(uid);
  return c && (c.wrecked || (c.damage || 0) >= (app.balance.crash.wreckAt ?? 100)) ? c : null;
}

/** Apply body damage; may smoke / wreck. Returns { damage, carHealth, smoke, wrecked, justWrecked }. */
export function applyBodyDamage(app, uid, car, rawPoints, x, z, ry) {
  const C = app.balance.crash; const m = modelDef(app, car.model);
  const mult = m?.exclusive ? (C.supercar?.damageTaken ?? 0.42) : 1;
  const add = Math.max(0, Math.min(100 - (car.damage || 0), Math.round(rawPoints * mult)));
  if (!add) return { damage: 0, carHealth: 100 - (car.damage || 0), smoke: (car.damage || 0) >= C.smokeAt, wrecked: !!car.wrecked, justWrecked: false };
  const next = (car.damage || 0) + add;
  const wreckAt = C.wreckAt ?? 100;
  const wasWrecked = !!(car.wrecked || (car.damage || 0) >= wreckAt);
  const wrecked = next >= wreckAt;
  if (wrecked) {
    app.db.prepare('UPDATE player_cars SET damage=?, wrecked=1, wreck_x=?, wreck_z=?, wreck_ry=? WHERE id=?')
      .run(Math.min(100, next), x, z, ry ?? 0, car.id);
  } else {
    app.db.prepare('UPDATE player_cars SET damage=? WHERE id=?').run(next, car.id);
  }
  const justWrecked = wrecked && !wasWrecked;
  if (justWrecked) {
    const p = presence(app, uid); p.mode = 'walk';
    app.db.prepare('UPDATE player_state SET mode=? WHERE user_id=?').run('walk', uid);
    note(app, uid, 'car', 'Your car don wreck. Call a tow truck to Motoka Meko — you cannot drive am.');
  }
  return { damage: add, carHealth: Math.max(0, 100 - next), smoke: next >= (C.smokeAt ?? 55), wrecked, justWrecked };
}

export function clearWreck(app, carId) {
  app.db.prepare('UPDATE player_cars SET damage=0, wrecked=0, wreck_x=NULL, wreck_z=NULL, wreck_ry=NULL WHERE id=?').run(carId);
}

const tows = (app) => (app.world.tows ||= new Map());
const hash = (n) => { let x = Math.imul(n ^ 0x6a09e667, 0x85ebca6b); x ^= x >>> 13; x = Math.imul(x, 0xc2b2ae35); x ^= x >>> 16; return (x >>> 0) / 4294967296; };
const DRIVERS = ['Tunde', 'Sade', 'Ibrahim', 'Chioma', 'Femi', 'Aisha'];

function refreshTow(app, uid) {
  const t = tows(app).get(uid); if (!t) return null;
  const now = app.clock.now();
  if (t.state === 'done') { tows(app).delete(uid); return null; }
  if (now >= t.arriveAt && t.state === 'arriving') t.state = 'here';
  if (now >= t.doneAt && (t.state === 'here' || t.state === 'hauling')) {
    finishTow(app, uid, t);
    return null;
  }
  if (t.state === 'here' && now >= t.haulAt) t.state = 'hauling';
  return t;
}

function finishTow(app, uid, t) {
  const lot = mekoLot(app, uid);
  const ax = lot ? lot.x : -130, az = lot ? lot.z : 169;
  dropAt(app, uid, ax, az);
  const car = app.db.prepare('SELECT * FROM player_cars WHERE id=?').get(t.carId);
  if (car) app.db.prepare('UPDATE player_cars SET wreck_x=?, wreck_z=?, wreck_ry=? WHERE id=?').run(ax, az, 0, car.id);
  note(app, uid, 'car', 'Tow truck don drop your car at Motoka Meko Garage. Pay for body work to fix am.');
  t.state = 'done'; tows(app).delete(uid);
}

const towView = (app, t) => t && ({
  id: t.id, state: t.state, fare: t.fare, arriveAt: t.arriveAt, haulAt: t.haulAt, doneAt: t.doneAt,
  driver: t.driver, from: t.from, estimate: true, dest: 'Motoka Meko Garage',
});

export const towStatus = (app, uid) => ({ tow: towView(app, refreshTow(app, uid)), service: 'Motoka Tow' });

export function towQuote(app, uid) {
  const C = app.balance.crash.tow; if (!C?.enabled) bad('OFF', 'Towing is switched off.', 409);
  const car = wreckedActive(app, uid); if (!car) bad('NOT_WRECKED', 'Your car is not wrecked.', 409);
  const p = presence(app, uid); const lot = mekoLot(app, uid);
  const wx = car.wreck_x ?? p.x, wz = car.wreck_z ?? p.z;
  const dx = lot ? lot.x - wx : 0, dz = lot ? lot.z - wz : 0;
  const d = Math.hypot(dx, dz);
  const fare = Math.round(C.base + C.perM * d);
  return { fare, distance: Math.round(d), etaMs: C.etaMs, tripMs: C.tripMs, dest: 'Motoka Meko Garage', wreck: { x: wx, z: wz }, cash: balanceOf(app.db, cashId(uid)), estimate: true };
}

export function towRequest(app, uid) {
  const C = app.balance.crash.tow; if (!C?.enabled) bad('OFF', 'Towing is switched off.', 409);
  if (refreshTow(app, uid)) bad('ACTIVE', 'A tow truck is already on the way.', 409);
  const car = wreckedActive(app, uid); if (!car) bad('NOT_WRECKED', 'Your car is not wrecked.', 409);
  const p = presence(app, uid);
  if (p.mode === 'drive') bad('STILL_IN_CAR', 'Step out first.', 409);
  const q = towQuote(app, uid);
  const wx = car.wreck_x ?? p.x, wz = car.wreck_z ?? p.z;
  if (Math.hypot(p.x - wx, p.z - wz) > C.boardRangeM) bad('TOO_FAR', 'Walk back to your wrecked car to call the tow.', 409, { x: wx, z: wz });
  if (!app.limiter.hit(`tow:${uid}`, C.requestsPerMin, 60000, app.clock.now())) bad('RATE_LIMIT', 'Easy — one tow at a time.', 429);
  if (q.cash < q.fare) bad('NO_FUNDS', `Tow to Motoka Meko costs about ₦${q.fare}.`, 402, { fare: q.fare });
  return app.db.transaction(() => {
    const now = app.clock.now(); const id = (app.world.towSeq = (app.world.towSeq || 0) + 1);
    move(app, { from: cashId(uid), to: SYS.SINK_CARS, amount: q.fare, reason: 'car_tow', ref: String(car.id), userId: uid, idemKey: `tow:${uid}:${id}` });
    const dn = DRIVERS[Math.floor(hash(id * 3) * DRIVERS.length)];
    const t = {
      id, uid, carId: car.id, fare: q.fare, state: 'arriving', from: { x: wx, z: wz },
      requestedAt: now, arriveAt: now + C.etaMs, haulAt: now + C.etaMs + 4000, doneAt: now + C.etaMs + C.tripMs,
      driver: { name: dn, vehicle: 'Flatbed tow' },
    };
    tows(app).set(uid, t);
    return { ok: true, tow: towView(app, t), cash: balanceOf(app.db, cashId(uid)), text: `${dn} dey come with the tow truck. Dem go carry you go Motoka Meko.` };
  })();
}

/** Motoka Meko / garage body repair (also allowed at classic walk-in Meco). */
export function mekoRepair(app, uid, idemKey) {
  if (!canRepairHere(app, uid)) bad('NOT_AT_MECO', 'Drive into Motoka Meko Garage, or go inside Motoka Meko / Meco, to repair.', 409);
  return app.db.transaction(() => {
    const c = app.db.prepare('SELECT * FROM player_cars WHERE user_id=? AND active=1').get(uid);
    if (!c) bad('NO_CAR', 'You no get your own car yet.', 409);
    if (!c.damage && !c.wrecked) bad('NO_DAMAGE', 'Your car no get crash damage.', 409);
    const fee = repairFeeOf(app, c); const cash = balanceOf(app.db, cashId(uid));
    if (cash < fee) bad('NO_FUNDS', `Repair costs ₦${fee}.`, 402, { fee });
    move(app, { from: cashId(uid), to: SYS.SINK_CARS, amount: fee, reason: 'car_repair', ref: String(c.id), userId: uid, idemKey: idemKey ? `carfix:${uid}:${idemKey}` : null });
    clearWreck(app, c.id);
    const exclusive = isExclusive(app, c.model);
    note(app, uid, 'car', exclusive ? 'Motoka Meko don fix your supercar. Fresh as new!' : 'Motoka Meko don fix the crash damage. Fresh as new!');
    bumpMood(app, uid, 1);
    return { ok: true, fee, carHealth: 100, wrecked: false, cash: balanceOf(app.db, cashId(uid)), text: exclusive ? 'Supercar body work done. 🔧' : 'Body work done. 🔧' };
  })();
}

void hash;
