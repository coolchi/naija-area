// Flights to Abuja and Port Harcourt, long-route fares and times, and planes other players can see (Track G item 7). Game money only; every number is an ESTIMATE.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import { teleport, heartbeat } from '../server/core/world.js';
import { enterCity } from '../server/core/cities.js';
import * as flight from '../server/core/flight.js';
import { planFlight, flightPose, departPose, landingPose, FLIGHT } from '../client/src/flightpath.js';

const mk = () => makeServer(); const hb = (s, u) => heartbeat(s.app, u, { trail: [], mode: 'walk' });
const AP = (s, id) => s.app.cities[id].airport; const L = 'lagos-mainland';
const atGate = (s, u, id = L) => { const a = AP(s, id); teleport(s.app, u, a.door.x, a.door.z + 3); };
const ready = (s, id = L, cash = 100000) => { const u = mkUser(s, { cash, ageMs: 10 * 60000 }); hb(s, u); if (id !== L) enterCity(s.app, u, id); atGate(s, u, id); hb(s, u); return u; };
const book = async (s, u, to) => { const v = await ok(s, 'GET', '/api/flights', { uid: u }); const d = v.destinations.find(x => x.id === to); assert.ok(d, 'destination ' + to); await ok(s, 'POST', '/api/flights/buy', { uid: u, body: { to, departAt: d.slots[0], idem: 'k' + Math.random() } }); return d; };

test('Abuja and Port Harcourt are cities with airports, fictional starter layouts with real street and airport names', () => {
  const s = mk(); for (const [id, state] of [['abuja', 'FCT'], ['port-harcourt', 'Rivers']]) { const c = s.app.cities[id]; assert.ok(c && c.airport && c.state === state && c.spawns.length >= 1, id); assert.ok(/placeholder/.test(c.airport.name)); assert.match(c._note, /FICTIONAL/); }
});
test('the board lists Kano, Abuja and Port Harcourt from Lagos; long routes cost more and take longer; Kano is unchanged', async () => {
  const s = mk(); const u = ready(s); const v = await ok(s, 'GET', '/api/flights', { uid: u }); const cfg = s.app.balance.flight; const by = Object.fromEntries(v.destinations.map(d => [d.id, d]));
  assert.ok(by.kano && by.abuja && by['port-harcourt']); assert.equal(by.kano.fare, cfg.fares.otherState); assert.equal(by.kano.flightMs, cfg.flightMs);
  assert.equal(by.abuja.fare, cfg.routes.abuja.fare); assert.equal(by['port-harcourt'].fare, cfg.routes['port-harcourt'].fare); assert.equal(by.abuja.flightMs, Math.round(cfg.flightMs * cfg.routes.abuja.flightFactor)); assert.ok(by.abuja.fare > by.kano.fare && by.abuja.flightMs > by.kano.flightMs);
  const f = (a, b) => flight.fareFor(cfg, s.app.cities[a], s.app.cities[b]); assert.equal(f('abuja', 'port-harcourt'), f('port-harcourt', 'abuja'), 'symmetric'); assert.equal(f('abuja', 'port-harcourt'), Math.max(cfg.routes.abuja.fare, cfg.routes['port-harcourt'].fare));
  assert.equal(flight.flightMsFor(cfg, s.app.cities.kano, s.app.cities.abuja), flight.flightMsFor(cfg, s.app.cities.abuja, s.app.cities.kano));
});
test('Lagos to Abuja: charged through the ledger, the flight takes the long time, you land at the Abuja airport, and can fly on to Port Harcourt and back', async () => {
  const s = mk(); const u = ready(s); const cfg = s.app.balance.flight; cfg.cooldownMs = 0; const c0 = balanceOf(s.db, cashId(u)); const d = await book(s, u, 'abuja'); assert.equal(balanceOf(s.db, cashId(u)), c0 - cfg.routes.abuja.fare);
  s.app.clock.advance(d.slots[0] - s.app.clock.now() + 500); flight.tick(s.app, u); assert.equal(flight.isFlying(s.app, u), true); const m = flight.mini(s.app, u); assert.equal(m.arriveAt - m.departsAt, d.flightMs); assert.equal(m.flightMs, d.flightMs);
  s.app.clock.advance(cfg.flightMs + 500); flight.tick(s.app, u); assert.equal(flight.isFlying(s.app, u), true, 'a Kano-length flight is not long enough for Abuja');
  s.app.clock.advance(d.flightMs); flight.tick(s.app, u); const p = s.app.world.players.get(u); assert.equal(p.city, 'abuja'); const A = AP(s, 'abuja'); assert.ok(Math.hypot(p.x - A.arrive.x, p.z - A.arrive.z) < 1);
  const t = await call(s, 'GET', '/api/flights', { uid: u }); assert.deepEqual(t.json.destinations.map(x => x.id).sort(), ['kano', 'lagos-mainland', 'port-harcourt'].sort(), 'from Abuja you can fly to every other airport city');
  atGate(s, u, 'abuja'); hb(s, u); s.app.clock.advance(120000); const d2 = await book(s, u, 'port-harcourt'); assert.equal(d2.fare, cfg.routes.abuja.fare, 'Abuja to PH costs the larger route fare'); s.app.clock.advance(d2.slots[0] - s.app.clock.now() + 500); flight.tick(s.app, u); s.app.clock.advance(d2.flightMs + 500); flight.tick(s.app, u);
  assert.equal(s.app.world.players.get(u).city, 'port-harcourt'); assert.equal(checkInvariants(s.db).ok, true);
});
test('other players see the plane: the departure for people near the airport, the landing in the other city, nothing for far away players or for missed flights', async () => {
  const s = mk(); const cfg = s.app.balance.flight; cfg.cooldownMs = 0; const u = ready(s); const watcher = ready(s); const far = mkUser(s, { cash: 10, ageMs: 10 * 60000 }); teleport(s.app, far, -200, 100); hb(s, far); cfg.planes.viewRangeM = 400; // the whole Mainland district is about 450 m from this apron: shrink the range so one corner is out of sight
  const d = await book(s, u, 'abuja'); const dep = d.slots[0]; const arr = dep + d.flightMs; s.app.clock.advance(dep - s.app.clock.now() + 1500); const w = hb(s, watcher); const h = hb(s, u);
  assert.equal(w.pl.length, 1, 'a plane is leaving'); assert.equal(w.pl[0].kind, 'dep'); assert.equal(w.pl[0].t0, dep); assert.equal(w.pl[0].to, 'Abuja'); assert.equal(hb(s, far).pl.length, 0, 'out of sight'); assert.equal(h.flight.state, 'flying');
  s.app.clock.advance(cfg.planes.depVisibleS * 1000 + 2000); assert.equal(hb(s, watcher).pl.length, 0, 'the plane has gone');
  // the other end: nobody in Abuja sees it until the landing window opens
  const abj = ready(s, 'abuja', 10); s.app.clock.advance(arr - cfg.planes.arrVisibleS * 1000 - 3000 - s.app.clock.now()); assert.equal(hb(s, abj).pl.length, 0, 'still far away'); s.app.clock.advance(5000); const a = hb(s, abj).pl;
  assert.equal(a.length, 1); assert.equal(a[0].kind, 'arr'); assert.equal(a[0].t1, arr); assert.ok(a[0].from, 'it says where it came from');
  s.app.clock.advance(arr - s.app.clock.now() + 1500); flight.tick(s.app, u); assert.equal(hb(s, abj).pl.length, 0, 'landed: the row is gone'); assert.equal(s.app.world.players.get(u).city, 'abuja');
});
test('a missed flight makes no plane; two passengers on one departure are one plane; cap on planes shown', async () => {
  const s = mk(); const cfg = s.app.balance.flight; const a = ready(s), b = ready(s), watcher = ready(s); const miss = mkUser(s, { cash: 100000, ageMs: 10 * 60000 }); atGate(s, miss); hb(s, miss);
  const d = await book(s, a, 'abuja'); await book(s, b, 'abuja'); await book(s, miss, 'abuja'); teleport(s.app, miss, -300, -300); hb(s, miss); s.app.clock.advance(d.slots[0] - s.app.clock.now() + 1500);
  const w = hb(s, watcher); assert.equal(w.pl.length, 1, 'one plane for two passengers, and none for the one who missed it'); assert.equal(w.pl[0].n, 2); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM flights WHERE user_id=?').get(miss).n, 0, 'the missed ticket was resolved'); void cfg;
  s.app.balance.flight.planes.enabled = false; assert.equal(hb(s, watcher).pl.length, 0, 'switch off');
});
test('the pure paths: departing plane takes off then climbs away and is gone; arriving plane is the take-off backwards and ends parked at the apron nose out; no jumps', () => {
  const s = mk(); for (const id of ['lagos-mainland', 'abuja', 'port-harcourt', 'kano']) {
    const ap = AP(s, id), plan = planFlight(ap); const T = plan.totalPreCruise;
    assert.equal(departPose(plan, -1), null); assert.equal(departPose(plan, T + FLIGHT.circleShowS + FLIGHT.exitS + 0.1), null); const p0 = departPose(plan, 0); assert.ok(Math.hypot(p0.x - ap.apron.x, p0.z - ap.apron.z) < 0.01);
    let last = departPose(plan, 0), maxV = 0; for (let t = 0.05; t <= T + FLIGHT.circleShowS + FLIGHT.exitS; t += 0.05) { const p = departPose(plan, t); assert.ok(p && [p.x, p.y, p.z, p.yaw, p.pitch, p.roll].every(Number.isFinite) && p.y >= 0); maxV = Math.max(maxV, Math.hypot(p.x - last.x, p.y - last.y, p.z - last.z) / 0.05); last = p; } assert.ok(maxV < 90, 'speed ' + maxV);
    const end = departPose(plan, T + FLIGHT.circleShowS + FLIGHT.exitS); assert.ok(end.y > FLIGHT.climbH * 2.5, 'well above the circuit when it vanishes: ' + end.y);
    assert.equal(landingPose(plan, -0.1), null); assert.equal(landingPose(plan, T + 0.1), null); const l0 = landingPose(plan, 0), l1 = landingPose(plan, T); assert.ok(l0.y > FLIGHT.climbH * 0.9 && l0.phase === 'approach', 'starts high: ' + l0.y); assert.ok(Math.hypot(l1.x - ap.apron.x, l1.z - ap.apron.z) < 0.01 && l1.y === 0 && l1.phase === 'taxi', 'ends at the apron on the ground');
    const park = -plan.taxiHeading; const dy = Math.abs(((l1.yaw - park + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI); assert.ok(dy < 0.05, 'parks nose out like the parked plane: ' + dy);
    last = landingPose(plan, 0); maxV = 0; let maxTurn = 0; for (let t = 0.05; t <= T; t += 0.05) { const p = landingPose(plan, t); assert.ok([p.x, p.y, p.z, p.yaw].every(Number.isFinite) && p.y >= 0); maxV = Math.max(maxV, Math.hypot(p.x - last.x, p.y - last.y, p.z - last.z) / 0.05); maxTurn = Math.max(maxTurn, Math.abs(((p.yaw - last.yaw + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI) / 0.05); last = p; }
    assert.ok(maxV < 90, 'landing speed ' + maxV); assert.ok(maxTurn < 2.2, 'turn rate rad/s ' + maxTurn); void flightPose;
  }
});
test('visibility windows match the flight path lengths (config in step with the client constants)', () => {
  const s = mk(); const P = s.app.balance.flight.planes; const plan = planFlight(AP(s, 'abuja')); assert.ok(P.depVisibleS >= plan.totalPreCruise + FLIGHT.circleShowS + FLIGHT.exitS, 'departure window'); assert.ok(P.arrVisibleS >= plan.totalPreCruise, 'landing window');
  assert.ok(s.app.balance.flight.flightMs / 1000 >= plan.totalPreCruise + FLIGHT.circleShowS, 'even the shortest flight lasts through the circuit');
});
