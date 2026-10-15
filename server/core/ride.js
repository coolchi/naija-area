// Oya Ride (in-game ride-hailing, a generic placeholder name; no real brand). The player picks a destination in the phone app, gets a fare and arrival estimate, a driver car
// (an AI driver) drives to the player's spot, the player gets in and the trip uses the normal server travel flow (position move, fare through the ledger). All numbers are ESTIMATE placeholders in balance.ride.
import { fareMult } from './weather.js';
import { assertNotFlying } from './flight.js';
import { cityOf } from './cities.js';
import { bad } from './util.js';
import { ensurePresence } from './world.js';
import { isRush, travel } from './social.js';
import { move, cashId, balanceOf, SYS } from './ledger.js';
import { gameTime } from './economy.js';
import { rideSponsor, rideSponsorShown, rideSponsorBoarded, rideSponsorDropped } from './ads.js';

const rides = (app) => (app.world.rides ||= new Map());
const hash = (n) => { let x = Math.imul(n ^ 0x6a09e667, 0x85ebca6b); x ^= x >>> 13; x = Math.imul(x, 0xc2b2ae35); x ^= x >>> 16; return (x >>> 0) / 4294967296; };
const DRIVERS = ['Chidi', 'Bisi', 'Musa', 'Kemi', 'Emeka', 'Tunde', 'Ngozi', 'Sule'];
const CARS = [['Silver sedan', '#b0b5ba'], ['White hatch', '#f2f2f2'], ['Green sedan', '#2e6b3a'], ['Blue hatch', '#1e4f8c']];
const placeOk = (app, id, uid) => { const pl = (uid ? cityOf(app, uid) : app.city).placeById[id]; if (!pl) bad('NO_PLACE', 'Unknown place.', 404); return pl; };
export function quote(app, uid, placeId) {
  const R = app.balance.ride; const pl = placeOk(app, placeId, uid); const p = ensurePresence(app, uid); const d = Math.hypot(pl.x - p.x, pl.z - p.z); const rush = isRush(app);
  const fare = Math.round((R.base + R.perM * d) * (rush ? R.rushMult : 1) * fareMult(app)); const seconds = Math.max(R.minTripSec, Math.min(R.maxTripSec, Math.round(d / R.speed)));
  const n = (app.world.rideSeq || 0) + 1; const driverDist = Math.round(R.driverMinM + hash(uid * 17 + n) * (R.driverMaxM - R.driverMinM)); const etaMs = Math.round(driverDist / R.driverSpeed * 1000 * (rush ? R.rushEtaMult : 1));
  return { place: { id: pl.id, name: pl.name, area: pl.area }, distance: Math.round(d), fare, seconds, rush, etaMs, driverDist, estimate: true, service: R.name, cash: balanceOf(app.db, cashId(uid)) };
}
function refresh(app, uid) { const r = rides(app).get(uid); if (!r) return null; const now = app.clock.now(); if (now > r.expiresAt) { rides(app).delete(uid); return null; } r.state = now >= r.arriveAt ? 'arrived' : 'arriving'; return r; }
const view = (app, r) => r && ({ id: r.id, state: r.state, placeId: r.placeId, placeName: cityOf(app, r.uid).placeById[r.placeId]?.name, sponsor: r.sponsor || null, fare: r.fare, from: r.from, requestedAt: r.requestedAt, arriveAt: r.arriveAt, expiresAt: r.expiresAt, driver: r.driver, driverDist: r.driverDist, faintRescue: !!r.faintRescue, estimate: true });
export const status = (app, uid) => ({ ride: view(app, refresh(app, uid)), service: app.balance.ride.name });
export function request(app, uid, placeId, opts = {}) {
  assertNotFlying(app, uid);
  const R = app.balance.ride; if (!R.enabled) bad('OFF', 'Oya Ride is switched off.', 409); const p = ensurePresence(app, uid);
  const faint = !!opts.faintRescue || !!p.fainted;
  if (p.mode === 'drive' && !faint) bad('DRIVING', 'Park your car first.', 409);
  if (p.mode === 'drive' && faint) { p.mode = 'walk'; app.db.prepare("UPDATE player_state SET mode='walk' WHERE user_id=?").run(uid); }
  if (p.venue) bad('INSIDE', 'Step outside first.', 409);
  if (refresh(app, uid)) bad('ACTIVE', 'You already have a ride on the way.', 409); const q = quote(app, uid, placeId);
  if (!faint && q.distance < R.minDistanceM) bad('TOO_CLOSE', 'That is very near. Just walk.', 409);
  if (!app.limiter.hit(`ride:${uid}`, R.requestsPerMin, 60000, app.clock.now())) bad('RATE_LIMIT', 'Easy, one ride at a time.', 429);
  if (q.cash < q.fare) bad('NO_FUNDS', `This ride costs about ₦${q.fare}.`, 402, { fare: q.fare }); const now = app.clock.now(); const id = (app.world.rideSeq = (app.world.rideSeq || 0) + 1);
  const dn = DRIVERS[Math.floor(hash(id * 3) * DRIVERS.length)], cr = CARS[Math.floor(hash(id * 5) * CARS.length)]; const plate = `NA ${100 + Math.floor(hash(id * 7) * 899)} ${String.fromCharCode(65 + Math.floor(hash(id * 11) * 26))}${String.fromCharCode(65 + Math.floor(hash(id * 13) * 26))}`;
  const r = { id, uid, placeId, from: { x: p.x, z: p.z }, fare: q.fare, seconds: q.seconds, state: 'arriving', requestedAt: now, arriveAt: now + q.etaMs, expiresAt: now + q.etaMs + R.waitMs, driver: { name: dn, car: cr[0], color: cr[1], plate }, driverDist: q.driverDist, cityId: cityOf(app, uid).id, faintRescue: faint };
  r.sponsor = rideSponsor(app, r.cityId, id, now); rideSponsorShown(app, r.sponsor, now); // the car wears the sponsor's livery (if one is booked); counted when you board
  rides(app).set(uid, r); return { ok: true, ride: view(app, r), text: faint ? `${dn} dey come to take you to eat.` : `${dn} dey come in a ${cr[0].toLowerCase()}.` };
}
export function cancel(app, uid) {
  const R = app.balance.ride; const r = refresh(app, uid); if (!r) return { ok: true, fee: 0 }; let fee = 0;
  if (r.state === 'arrived') { const cash = balanceOf(app.db, cashId(uid)); fee = Math.min(R.cancelFee, cash); if (fee > 0) move(app, { from: cashId(uid), to: SYS.SINK_TRANSPORT, amount: fee, reason: 'ride_cancel', ref: String(r.id), userId: uid, idemKey: `ridecancel:${r.id}` }); }
  rideSponsorDropped(app, r.sponsor); rides(app).delete(uid); return { ok: true, fee, text: fee ? `Driver don reach. Cancel fee ₦${fee}.` : 'Ride cancelled.' };
}
export function start(app, uid, idemKey) {
  const R = app.balance.ride; const r = refresh(app, uid); if (!r) bad('NO_RIDE', 'No ride on the way.', 409); if (r.state !== 'arrived') bad('NOT_YET', 'Your driver never reach yet.', 409, { waitMs: r.arriveAt - app.clock.now() });
  const p = ensurePresence(app, uid);
  const boardRange = r.faintRescue || p.fainted ? Math.max(R.boardRangeM, 40) : R.boardRangeM;
  if (Math.hypot(p.x - r.from.x, p.z - r.from.z) > boardRange) bad('TOO_FAR', 'Walk back to where you called the ride.', 409, { x: r.from.x, z: r.from.z });
  const res = travel(app, uid, r.placeId, 'ride', idemKey ? `ride:${r.id}:${idemKey}` : `ride:${r.id}`, { id: 'ride', label: R.name, fare: r.fare, seconds: r.seconds });
  rideSponsorBoarded(app, uid, r.id, r.sponsor, r.cityId, app.clock.now()); const faintRescue = !!r.faintRescue; rides(app).delete(uid);
  return { ...res, driver: r.driver, service: R.name, sponsor: r.sponsor || null, faintRescue };
}
void gameTime;
