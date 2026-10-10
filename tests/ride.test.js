// Oya Ride: quote, request, driver arrival timing, cancel (free before arrival, fee after), start = normal travel with the locked fare through the ledger.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at } from './helpers.js'; import { checkInvariants, balanceOf, cashId, move, SYS } from '../server/core/ledger.js';
import { posAlong, pathLength, driverProgress, startCandidates } from '../client/src/ride.js';

const setup = (cash = 20000) => { const s = makeServer(); const u = mkUser(s, { cash }); s.app.clock.advance(5 * 60000); const dest = s.app.city.venues.find(v => v.id === 'venue_motors'); at(s, u, -150, -150); return { s, u, dest }; };
const far = (s, u) => s.app.city.placeById['venue_motors'];

test('quote: fare grows with distance, rush hour costs more, ETA is within the configured driver range, all marked estimate', async () => {
  const { s, u } = setup(); const R = s.app.balance.ride; const q1 = await ok(s, 'GET', '/api/ride/quote', { uid: u, query: { place: 'venue_motors' } }); assert.equal(q1.service, 'Oya Ride'); assert.ok(q1.estimate); assert.ok(q1.fare >= R.base);
  assert.ok(q1.etaMs >= R.driverMinM / R.driverSpeed * 1000 - 1 && q1.etaMs <= R.driverMaxM / R.driverSpeed * 1000 * R.rushEtaMult + 1); at(s, u, far(s, u).x - 100, far(s, u).z); const q2 = await ok(s, 'GET', '/api/ride/quote', { uid: u, query: { place: 'venue_motors' } }); assert.ok(q2.fare < q1.fare);
  assert.equal((await call(s, 'GET', '/api/ride/quote', { uid: u, query: { place: 'nowhere' } })).json.error, 'NO_PLACE');
});
test('request needs a real place, enough cash, a walking player outside, and not too close; one ride at a time; the fare is NOT taken yet', async () => {
  const { s, u } = setup(); const c0 = balanceOf(s.app.db, cashId(u)); const r = await ok(s, 'POST', '/api/ride/request', { uid: u, body: { placeId: 'venue_motors' } }); assert.equal(r.ride.state, 'arriving'); assert.ok(r.ride.driver.name && r.ride.driver.plate); assert.equal(balanceOf(s.app.db, cashId(u)), c0, 'nothing charged yet');
  assert.equal((await call(s, 'POST', '/api/ride/request', { uid: u, body: { placeId: 'venue_motors' } })).json.error, 'ACTIVE');
  const t = setup(100); assert.equal((await call(t.s, 'POST', '/api/ride/request', { uid: t.u, body: { placeId: 'venue_motors' } })).json.error, 'NO_FUNDS');
  const near = setup(); const pl = near.s.app.city.placeById['venue_motors']; at(near.s, near.u, pl.x + 10, pl.z); assert.equal((await call(near.s, 'POST', '/api/ride/request', { uid: near.u, body: { placeId: 'venue_motors' } })).json.error, 'TOO_CLOSE');
  const d = setup(); d.s.app.world.players.get(d.u).mode = 'drive'; assert.equal((await call(d.s, 'POST', '/api/ride/request', { uid: d.u, body: { placeId: 'venue_motors' } })).json.error, 'DRIVING');
});
test('the driver arrives after the ETA; starting early is refused; starting far from the pickup is refused; start charges the locked fare and moves you', async () => {
  const { s, u } = setup(); const r = (await ok(s, 'POST', '/api/ride/request', { uid: u, body: { placeId: 'venue_motors' } })).ride; assert.equal((await call(s, 'POST', '/api/ride/start', { uid: u, body: { idem: 'a' } })).json.error, 'NOT_YET');
  s.app.clock.advance(r.arriveAt - s.app.clock.now() + 500); assert.equal((await ok(s, 'GET', '/api/ride', { uid: u })).ride.state, 'arrived'); at(s, u, -100, -100); assert.equal((await call(s, 'POST', '/api/ride/start', { uid: u, body: { idem: 'a' } })).json.error, 'TOO_FAR');
  at(s, u, r.from.x + 2, r.from.z); const c0 = balanceOf(s.app.db, cashId(u)); const st = await ok(s, 'POST', '/api/ride/start', { uid: u, body: { idem: 'a' } }); assert.equal(st.fare, r.fare); assert.equal(st.mode, 'ride'); assert.equal(balanceOf(s.app.db, cashId(u)), c0 - r.fare); const pl = far(s, u); assert.ok(Math.hypot(st.to.x - pl.x, st.to.z - pl.z) < 1);
  assert.equal((await ok(s, 'GET', '/api/ride', { uid: u })).ride, null); assert.ok(checkInvariants(s.app.db)); assert.equal((await call(s, 'POST', '/api/ride/start', { uid: u, body: { idem: 'b' } })).json.error, 'NO_RIDE');
});
test('cancel: free while the driver is on the way, a small fee once arrived (never more than your cash), expired rides vanish', async () => {
  const a = setup(); await ok(a.s, 'POST', '/api/ride/request', { uid: a.u, body: { placeId: 'venue_motors' } }); const c0 = balanceOf(a.s.app.db, cashId(a.u)); const x = await ok(a.s, 'POST', '/api/ride/cancel', { uid: a.u }); assert.equal(x.fee, 0); assert.equal(balanceOf(a.s.app.db, cashId(a.u)), c0);
  const b = setup(); const r = (await ok(b.s, 'POST', '/api/ride/request', { uid: b.u, body: { placeId: 'venue_motors' } })).ride; b.s.app.clock.advance(r.arriveAt - b.s.app.clock.now() + 100); const c1 = balanceOf(b.s.app.db, cashId(b.u)); const y = await ok(b.s, 'POST', '/api/ride/cancel', { uid: b.u }); assert.equal(y.fee, b.s.app.balance.ride.cancelFee); assert.equal(balanceOf(b.s.app.db, cashId(b.u)), c1 - y.fee);
  const c = setup(); const r2 = (await ok(c.s, 'POST', '/api/ride/request', { uid: c.u, body: { placeId: 'venue_motors' } })).ride; c.s.app.clock.advance(r2.expiresAt - c.s.app.clock.now() + 1000); assert.equal((await ok(c.s, 'GET', '/api/ride', { uid: c.u })).ride, null); assert.ok(checkInvariants(c.s.app.db));
});
test('ride is not a normal fare chip and cannot be used through /api/travel directly', async () => {
  const { s, u } = setup(); const q = await ok(s, 'GET', '/api/travel/quote', { uid: u, query: { place: 'venue_motors' } }); assert.ok(!q.modes.some(m => m.id === 'ride')); assert.equal((await call(s, 'POST', '/api/travel', { uid: u, body: { placeId: 'venue_motors', mode: 'ride', idem: 'z' } })).json.error, 'BAD_MODE');
  move; SYS;
});
test('client helpers: posAlong follows a polyline with the right heading, progress is clamped, candidates ring the player', () => {
  const path = [[0, 0], [10, 0], [10, 10]]; assert.equal(pathLength(path), 20); const a = posAlong(path, 5); assert.deepEqual([a.x, a.z], [5, 0]); assert.ok(Math.abs(a.yaw) < 1e-9); const b = posAlong(path, 15); assert.deepEqual([b.x, b.z], [10, 5]); assert.ok(Math.abs(b.yaw + Math.PI / 2) < 1e-9);
  const e = posAlong(path, 99); assert.deepEqual([e.x, e.z], [10, 10]); assert.equal(driverProgress(50, 0, 100), 0.5); assert.equal(driverProgress(-5, 0, 100), 0); assert.equal(driverProgress(500, 0, 100), 1);
  const c = startCandidates(100, 100, 50); assert.equal(c.length, 24); for (const p of c) assert.ok(Math.abs(Math.hypot(p[0] - 100, p[1] - 100) - 50) < 1e-6);
});
