// Bus stops: city data, stop logic (pure), server call/board rules, ledger fare via the normal travel flow.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makePath } from '../client/src/path.js'; import { roadAt } from '../client/src/roadgeom.js';
import { STOP_CFG, locateOnPath, stopsOnLoop, stopCap, serves, newStop, stopStep, pickupStart } from '../client/src/busstops.js';
import { makeServer, mkUser, call, ok, at } from './helpers.js'; import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';

const city = () => makeServer().app.city;
test('city data: stops beside a loop road (not on it), clear of buildings, water, lots, with unique ids and names, and listed as travel places', () => {
  const c = city(); assert.ok(c.busStops.length >= 8); assert.equal(new Set(c.busStops.map(b => b.id)).size, c.busStops.length); assert.equal(new Set(c.busStops.map(b => b.name)).size, c.busStops.length);
  for (const b of c.busStops) { assert.ok(!roadAt(c, b.x, b.z, 1.0), b.id + ' on a road'); assert.ok(!c.buildings.some(q => Math.abs(b.x - q.x) < q.w / 2 && Math.abs(b.z - q.z) < q.d / 2), b.id + ' in a building'); const L = c.trafficLoops.find(l => l.id === b.loop); assert.ok(L, 'loop ' + b.id);
    const P = makePath(L.pts, 7, { dense: !!L.dense, slow: true }); const r = locateOnPath(P, b.x, b.z); assert.ok(r.d > 4 && r.d < 16, `${b.id} is ${r.d.toFixed(1)} m from the loop`); assert.ok(c.placeById[b.id]?.type === 'busstop', 'place ' + b.id); }
});
test('locate and stopsOnLoop: sorted positions along a loop within its length', () => {
  const c = city(); const L = c.trafficLoops.find(l => l.id === 'big'); const P = makePath(L.pts, 7, { dense: true, slow: true }); const S = stopsOnLoop(P, c.busStops, 'big'); assert.ok(S.length >= 3); for (let i = 1; i < S.length; i++) assert.ok(S[i].s > S[i - 1].s); for (const x of S) assert.ok(x.s >= 0 && x.s <= P.length);
  assert.ok(Math.abs(pickupStart(S[0].s, P.length) - ((S[0].s - STOP_CFG.pickupLead + P.length) % P.length)) < 1e-9);
});
test('stopCap: a vehicle at that speed stops exactly in the distance; serves(): danfo always, okada/car never, keke some', () => {
  const d = 12, v = stopCap(d); assert.ok(Math.abs(v * v / (2 * STOP_CFG.comfyDecel) - d) < 1e-6); assert.equal(stopCap(-3), 0);
  assert.equal(serves('danfo', 5), true); assert.equal(serves('okada', 5), false); assert.equal(serves('car', 9), false); let k = 0; for (let i = 0; i < 1000; i++) if (serves('keke', i)) k++; assert.ok(k > 300 && k < 500, 'keke share ' + k);
});
/** drive a vehicle with the stop controller on a straight loop of length 400 with one stop at s=200 */
function simulate({ v0 = 9, rnd = 0.5, hold = false } = {}) { const L = 400, stops = [{ id: 'a', s: 200 }]; const st = newStop(); let s = 150, v = v0; const log = []; let t = 0; for (; t < 24; t += 0.05) { const r = stopStep(st, s, v, L, stops, 0.05, rnd); const tgt = Math.min(9, r.cap); v += Math.max(-14 * 0.05, Math.min(6 * 0.05, tgt - v)); if (v < 0) v = 0; s += v * 0.05; log.push({ t, s, v, ph: r.phase, dwell: r.dwell }); if (hold && r.phase === 'dwell' && t > 20) st.hold = false; } return log; }
test('a serving vehicle brakes smoothly, stops at the stop (nose just before it), waits 3 to 5.5 s, then pulls away and forgets the stop', () => {
  const log = simulate(); const stopped = log.filter(x => x.v < 0.05 && x.s > 195 && x.s < 201); assert.ok(stopped.length > 0, 'stopped at the stop'); const first = stopped[0], lastS = stopped[stopped.length - 1]; assert.ok(first.s > 198.5 && first.s <= 200, 'nose before pole: ' + first.s);
  const dwellT = lastS.t - first.t; assert.ok(dwellT >= 2.8 && dwellT <= 6.3, 'dwell ' + dwellT); let maxDecel = 0; for (let i = 1; i < log.length; i++) maxDecel = Math.max(maxDecel, (log[i - 1].v - log[i].v) / 0.05); assert.ok(maxDecel <= 14.01, 'decel ' + maxDecel);
  assert.ok(log[log.length - 1].s > 250 && log[log.length - 1].v > 8, 'pulled away'); assert.equal(log[log.length - 1].ph, 'none'); assert.ok(log.some(x => x.dwell), 'dwell flag set at standstill'); assert.ok(!log.some(x => x.s > 200.6 && x.v < 0.05), 'never stops beyond the stop');
});
test('dwell length follows the random draw; hold keeps a vehicle at the stop; a vehicle far from stops is unaffected', () => {
  const a = simulate({ rnd: 0 }), b = simulate({ rnd: 1 }); const dw = (l) => l.filter(x => x.ph === 'dwell').length * 0.05; assert.ok(dw(b) > dw(a) + 1.5); const st = newStop(); st.hold = true; const stops = [{ id: 'a', s: 200 }];
  let r; for (let i = 0; i < 400; i++) r = stopStep(st, 199.7, 0, 400, stops, 0.05, 0.5); assert.equal(r.phase, 'dwell'); st.hold = false; r = stopStep(st, 199.7, 0, 400, stops, 0.05, 0.5); assert.equal(r.phase, 'leave');
  assert.deepEqual(stopStep(newStop(), 10, 9, 400, stops, 0.05, 0.5), { cap: Infinity, dwell: false, phase: 'none' }); assert.deepEqual(stopStep(newStop(), 10, 9, 400, [], 0.05, 0.5), { cap: Infinity, dwell: false, phase: 'none' });
});
test('server: call needs you at the stop, walking, then a wait time; board only after the wait and near the stop; rate limited', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 5000 }); s.app.clock.advance(5 * 60000); const b = s.app.city.busStops[0];
  assert.equal((await call(s, 'POST', '/api/bus/call', { uid: u, body: { stopId: 'nope' } })).json.error, 'NO_STOP'); at(s, u, b.x + 60, b.z); assert.equal((await call(s, 'POST', '/api/bus/call', { uid: u, body: { stopId: b.id } })).json.error, 'TOO_FAR');
  at(s, u, b.x, b.z + 2); const c = await ok(s, 'POST', '/api/bus/call', { uid: u, body: { stopId: b.id } }); assert.ok(c.waitMs >= s.app.balance.bus.waitMinMs && c.waitMs <= s.app.balance.bus.waitMaxMs * s.app.balance.bus.rushMult + 1); assert.ok(c.estimate);
  assert.equal((await call(s, 'POST', '/api/bus/board', { uid: u, body: { stopId: b.id } })).json.error, 'NOT_YET'); s.app.clock.advance(c.waitMs + 1000); const bd = await ok(s, 'POST', '/api/bus/board', { uid: u, body: { stopId: b.id } }); assert.ok(bd.ok);
  assert.equal((await call(s, 'POST', '/api/bus/board', { uid: u, body: { stopId: b.id } })).json.error, 'NO_CALL', 'one boarding per call'); s.app.clock.advance(s.app.balance.bus.callExpireMs + 1000);
  const c2 = await ok(s, 'POST', '/api/bus/call', { uid: u, body: { stopId: b.id } }); s.app.clock.advance(c2.waitMs + s.app.balance.bus.callExpireMs + 5000); assert.equal((await call(s, 'POST', '/api/bus/board', { uid: u, body: { stopId: b.id } })).json.error, 'NO_CALL', 'a call expires');
});
test('the ride itself is the normal travel flow: the danfo fare from a stop to another stop goes through the ledger', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 5000 }); s.app.clock.advance(5 * 60000); const [a, b] = s.app.city.busStops; at(s, u, a.x, a.z + 2); const cash0 = balanceOf(s.app.db, cashId(u));
  const q = await ok(s, 'GET', '/api/travel/quote', { uid: u, query: { place: b.id } }); const danfo = q.modes.find(m => m.id === 'danfo'); assert.ok(danfo.fare > 0); const r = await ok(s, 'POST', '/api/travel', { uid: u, body: { placeId: b.id, mode: 'danfo', idem: 'x1' } });
  assert.equal(r.fare, danfo.fare); assert.equal(balanceOf(s.app.db, cashId(u)), cash0 - danfo.fare); assert.ok(checkInvariants(s.app.db));
});
