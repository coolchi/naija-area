// Carpool: pick up a nearby walker in your owned car. Both hear the same radio station (driver tunes; synth tracks share the server clock).
import { bad } from './util.js';
import { ensurePresence, syncPos } from './world.js';
import { isBlocked } from './safety.js';
import { parkedActive } from './parking.js';

const RANGE = 12;
const INVITE_MS = 45000;
const KEEP_RANGE = 40;

function ownedDriving(app, p) {
  if (!p || p.mode !== 'drive') return false;
  if (parkedActive(app, p.id)) return false;
  const row = app.db.prepare('SELECT id FROM player_cars WHERE user_id=? AND active=1').get(p.id);
  return !!row;
}

function clearInvite(p) { if (p) p.carpoolInvite = null; }

function clearRide(app, driver, passenger) {
  if (driver) { driver.carpoolPassenger = null; }
  if (passenger) { passenger.carpoolDriver = null; }
}

export function expireCarpool(app) {
  const now = app.clock.now();
  for (const p of app.world.players.values()) {
    if (p.carpoolInvite && p.carpoolInvite.expiresAt <= now) clearInvite(p);
    if (p.carpoolPassenger) {
      const pass = app.world.players.get(p.carpoolPassenger);
      if (!pass || !ownedDriving(app, p) || Math.hypot(pass.x - p.x, pass.z - p.z) > KEEP_RANGE) clearRide(app, p, pass);
    }
    if (p.carpoolDriver) {
      const dr = app.world.players.get(p.carpoolDriver);
      if (!dr || dr.carpoolPassenger !== p.id || !ownedDriving(app, dr)) clearRide(app, dr, p);
    }
  }
}

/** Snap a passenger onto their driver so nearby checks and trails stay with the car. */
export function syncPassenger(app, p) {
  if (!p?.carpoolDriver) return;
  const dr = app.world.players.get(p.carpoolDriver);
  if (!dr || dr.carpoolPassenger !== p.id) { clearRide(app, dr, p); return; }
  p.x = dr.x; p.z = dr.z; p.ry = dr.ry;
  p.trail = [{ t: app.clock.now(), x: dr.x, z: dr.z, ry: dr.ry }];
  p.mode = 'walk';
}

export function offer(app, uid, targetId, pos) {
  expireCarpool(app);
  if (pos) syncPos(app, uid, pos);
  const me = ensurePresence(app, uid);
  const tid = Number(targetId);
  if (!Number.isFinite(tid) || tid === uid) bad('BAD_TARGET', 'Pick a nearby player.', 400);
  const them = app.world.players.get(tid);
  if (!them || them.city !== me.city) bad('NOT_NEAR', 'That player is not nearby.', 409);
  if (!ownedDriving(app, me)) bad('NOT_DRIVING', 'Drive your own car to pick someone up.', 409);
  if (me.carpoolPassenger) bad('SEAT_FULL', 'Someone is already in your car.', 409);
  if (me.carpoolDriver) bad('ALREADY_RIDING', 'Get out first.', 409);
  if (them.mode === 'drive' || them.carpoolDriver || them.carpoolPassenger) bad('BUSY', 'They are busy.', 409);
  if (isBlocked(app, uid, tid)) bad('BLOCKED', 'You cannot pick up this player.', 403);
  const d = Math.hypot(them.x - me.x, them.z - me.z);
  if (d > RANGE) bad('TOO_FAR', 'Drive closer to pick them up.', 409);
  const now = app.clock.now();
  if (!app.limiter.hit(`carpool:${uid}`, 8, 60000, now)) bad('RATE_LIMIT', 'Too many ride offers. Wait a bit.', 429);
  them.carpoolInvite = { from: uid, name: me.name, expiresAt: now + INVITE_MS };
  return { ok: true, text: `Offered a ride to @${them.name}.`, expiresAt: them.carpoolInvite.expiresAt };
}

export function respond(app, uid, accept, pos) {
  expireCarpool(app);
  if (pos) syncPos(app, uid, pos);
  const me = ensurePresence(app, uid);
  const inv = me.carpoolInvite;
  if (!inv || inv.expiresAt <= app.clock.now()) { clearInvite(me); bad('NO_OFFER', 'That ride offer expired.', 409); }
  const driver = app.world.players.get(inv.from);
  clearInvite(me);
  if (!accept) return { ok: true, text: 'Declined the ride.' };
  if (!driver || !ownedDriving(app, driver) || driver.carpoolPassenger) bad('GONE', 'The driver is no longer free.', 409);
  if (me.carpoolDriver || me.mode === 'drive') bad('BUSY', 'You cannot get in right now.', 409);
  if (Math.hypot(me.x - driver.x, me.z - driver.z) > RANGE + 4) bad('TOO_FAR', 'Walk closer to the car.', 409);
  driver.carpoolPassenger = uid;
  me.carpoolDriver = driver.id;
  syncPassenger(app, me);
  return { ok: true, text: `You got in @${driver.name}'s car.`, ride: rideView(app, me) };
}

export function leave(app, uid) {
  expireCarpool(app);
  const me = ensurePresence(app, uid);
  if (me.carpoolDriver) {
    const dr = app.world.players.get(me.carpoolDriver);
    clearRide(app, dr, me);
    return { ok: true, text: 'You got out of the car.' };
  }
  if (me.carpoolPassenger) {
    const pass = app.world.players.get(me.carpoolPassenger);
    clearRide(app, me, pass);
    return { ok: true, text: 'Your passenger got out.' };
  }
  bad('NOT_RIDING', 'You are not in a shared car.', 409);
}

export function rideView(app, p) {
  expireCarpool(app);
  if (p.carpoolDriver) {
    const dr = app.world.players.get(p.carpoolDriver);
    if (!dr) return { role: null };
    return { role: 'passenger', driverId: dr.id, driverName: dr.name, radio: dr.radioSt || null };
  }
  if (p.carpoolPassenger) {
    const pass = app.world.players.get(p.carpoolPassenger);
    return { role: 'driver', passengerId: pass?.id || p.carpoolPassenger, passengerName: pass?.name || 'Passenger', radio: p.radioSt || null };
  }
  const inv = p.carpoolInvite;
  if (inv && inv.expiresAt > app.clock.now()) return { role: 'invite', from: inv.from, fromName: inv.name, expiresAt: inv.expiresAt };
  return { role: null };
}

/** Heartbeat helper: store the driver's tuned station id (string). */
export function noteRadio(app, uid, stationId) {
  const p = app.world.players.get(uid);
  if (!p || p.mode !== 'drive') return;
  if (typeof stationId === 'string' && stationId.length && stationId.length <= 24) p.radioSt = stationId;
}
