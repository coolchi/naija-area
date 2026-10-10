// Call a boat (10 Oct 2026): jetties in Lagos Island and Lekki, a boat across the channel to Tarkwa Bay, and a ferry between districts.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at, HOUR } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import { enterCity } from '../server/core/cities.js';
import { validateCity } from '../server/core/city.js';
import * as boat from '../server/core/boat.js';
import fs from 'node:fs';

const adult = (s, cash = 20000) => mkUser(s, { cash, ageMs: 10 * 60000 });
const hb = (s, u) => ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
const stop = (s, id) => s.app.boatStops[id];
async function atJetty(s, id, cash) { const st = stop(s, id); const u = adult(s, cash); enterCity(s.app, u, st.city); at(s, u, st.x, st.z); await hb(s, u); return { u, st }; }

test('boat stops are in the city data, valid, reachable on foot, and every route points at a real stop', () => {
  const s = makeServer(); assert.ok(s.app.boatStops.lk_jetty && s.app.boatStops.lk_tarkwa && s.app.boatStops.isl_marina);
  for (const c of Object.values(s.app.cities)) { const raw = JSON.parse(fs.readFileSync(new URL(`../server/config/cities/${c.id}.json`, import.meta.url))); assert.deepEqual(validateCity(raw), [], c.id); }
  const lk = s.app.cities['lagos-lekki']; for (const st of lk.boat.stops) { assert.ok(st.x >= lk.bounds.minX && st.x <= lk.bounds.maxX && st.z >= lk.bounds.minZ && st.z <= lk.bounds.maxZ, st.id); assert.ok(st.berth && st.arrive, st.id); }
  for (const c of Object.values(s.app.cities)) for (const r of c.boat?.routes || []) { assert.ok(s.app.boatStops[r.from]?.city === c.id, 'route starts in this city'); assert.ok(s.app.boatStops[r.to], r.to); assert.ok(r.fare > 0 && r.crossMs >= 10000); }
  const tarkwa = lk.creeks.find(k => k.id === 'lk_bay'); assert.ok(tarkwa && !(tarkwa.gaps || []).length, 'the channel has no walkway: the island is boat-only'); assert.ok(lk.bounds.maxZ > tarkwa.z1 + 20, 'the island is inside the district bounds');
});
test('call, wait, board, cross: the fare goes through the ledger once, you cannot move while aboard, and you arrive on the island', async () => {
  const s = makeServer(); const { u, st } = await atJetty(s, 'lk_jetty', 5000); const C = s.app.balance.boat; const before = balanceOf(s.db, cashId(u));
  const v0 = await ok(s, 'GET', '/api/boat', { uid: u }); assert.equal(v0.stop.id, 'lk_jetty'); const route = v0.stop.routes.find(r => r.to === 'lk_tarkwa'); assert.ok(route && route.sameCity);
  const c = await ok(s, 'POST', '/api/boat/call', { uid: u, body: { to: 'lk_tarkwa' } }); assert.equal(c.trip.state, 'called'); assert.equal(balanceOf(s.db, cashId(u)), before, 'nothing is charged for the call');
  const early = await call(s, 'POST', '/api/boat/board', { uid: u, body: {} }); assert.equal(early.status, 409); assert.equal(early.json.error, 'NOT_YET');
  s.app.clock.advance(C.waitMs + 1000); const b = await ok(s, 'POST', '/api/boat/board', { uid: u, body: { idem: 'x' } }); assert.equal(b.trip.state, 'crossing'); assert.equal(balanceOf(s.db, cashId(u)), before - route.fare);
  const again = await call(s, 'POST', '/api/boat/board', { uid: u, body: { idem: 'x' } }); assert.equal(again.status, 409);
  for (const [m, p] of [['POST', '/api/cities/link'], ['POST', '/api/bus/board'], ['POST', '/api/flights/buy']]) { const r = await call(s, m, p, { uid: u, body: {} }); assert.ok([409, 404, 400].includes(r.status), `${p} ${r.status}`); }
  const mid = await hb(s, u); assert.equal(mid.boat.state, 'crossing'); s.app.clock.advance(route.crossMs + 500); const end = await hb(s, u); assert.equal(end.boat, null);
  const arrive = stop(s, 'lk_tarkwa'); const p = s.app.world.players.get(u); assert.ok(Math.hypot(p.x - arrive.arrive.x, p.z - arrive.arrive.z) < 1, 'put at the island jetty'); assert.ok(end.teleport, 'the client is told to jump there');
  checkInvariants(s.db); assert.equal(s.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE reason='boat_fare'").get().n >= 1, true); void st;
});
test('cannot call a boat away from a jetty, without cash, or twice; cancel is free; a boat that waits too long leaves with no charge', async () => {
  const s = makeServer(); const far = adult(s); const r0 = await call(s, 'POST', '/api/boat/call', { uid: far, body: { to: 'lk_tarkwa' } }); assert.equal(r0.status, 409); assert.equal(r0.json.error, 'NOT_AT_JETTY');
  const poor = await atJetty(s, 'lk_jetty', 10); const r1 = await call(s, 'POST', '/api/boat/call', { uid: poor.u, body: { to: 'lk_tarkwa' } }); assert.equal(r1.status, 402);
  const { u } = await atJetty(s, 'lk_jetty', 5000); const bad = await call(s, 'POST', '/api/boat/call', { uid: u, body: { to: 'nowhere' } }); assert.equal(bad.status, 404);
  await ok(s, 'POST', '/api/boat/call', { uid: u, body: { to: 'lk_tarkwa' } }); const twice = await call(s, 'POST', '/api/boat/call', { uid: u, body: { to: 'lk_tarkwa' } }); assert.equal(twice.json.error, 'HAS_TRIP');
  const cash = balanceOf(s.db, cashId(u)); await ok(s, 'POST', '/api/boat/cancel', { uid: u, body: {} }); assert.equal(balanceOf(s.db, cashId(u)), cash);
  await ok(s, 'POST', '/api/boat/call', { uid: u, body: { to: 'lk_tarkwa' } }); const C = s.app.balance.boat; s.app.clock.advance(C.waitMs + C.boardWindowMs + 1000); const left = await hb(s, u); assert.equal(left.boat, null); assert.equal(balanceOf(s.db, cashId(u)), cash, 'the boat left, no charge');
});
test('walking away from the jetty before boarding means you cannot board', async () => {
  const s = makeServer(); const { u, st } = await atJetty(s, 'lk_jetty', 5000); await ok(s, 'POST', '/api/boat/call', { uid: u, body: { to: 'lk_tarkwa' } }); s.app.clock.advance(s.app.balance.boat.waitMs + 500); at(s, u, st.x - 60, st.z - 60); const r = await call(s, 'POST', '/api/boat/board', { uid: u, body: {} }); assert.equal(r.status, 409); assert.equal(r.json.error, 'NOT_AT_JETTY');
});
test('a ferry between districts: Lagos Island Marina to the Lekki jetty moves you into the other city, and back', async () => {
  const s = makeServer(); const { u } = await atJetty(s, 'isl_marina', 8000); const v = await ok(s, 'GET', '/api/boat', { uid: u }); const route = v.stop.routes.find(r => r.to === 'lk_jetty'); assert.ok(route && !route.sameCity);
  await ok(s, 'POST', '/api/boat/call', { uid: u, body: { to: 'lk_jetty' } }); s.app.clock.advance(s.app.balance.boat.waitMs + 500); await ok(s, 'POST', '/api/boat/board', { uid: u, body: {} }); s.app.clock.advance(route.crossMs + 500); const r = await hb(s, u);
  assert.equal(r.city, 'lagos-lekki'); const p = s.app.world.players.get(u); assert.equal(p.city, 'lagos-lekki'); const a = stop(s, 'lk_jetty').arrive; assert.ok(Math.hypot(p.x - a.x, p.z - a.z) < 1); checkInvariants(s.db);
  s.app.clock.advance(s.app.balance.boat.cooldownMs + 1000); const back = await ok(s, 'GET', '/api/boat', { uid: u }); assert.ok(back.stop?.routes.some(x => x.to === 'isl_marina'), 'and back');
});
test('a trip is stored: a player who vanishes mid-crossing still arrives (lazy tick) and the table is cleared', async () => {
  const s = makeServer(); const { u } = await atJetty(s, 'lk_jetty', 5000); await ok(s, 'POST', '/api/boat/call', { uid: u, body: { to: 'lk_tarkwa' } }); s.app.clock.advance(s.app.balance.boat.waitMs + 500); await ok(s, 'POST', '/api/boat/board', { uid: u, body: {} });
  assert.equal(s.db.prepare('SELECT COUNT(*) n FROM boat_trips').get().n, 1); s.app.clock.advance(HOUR); boat.tick(s.app, u); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM boat_trips').get().n, 0); const p = s.app.world.players.get(u); assert.ok(Math.abs(p.z - stop(s, 'lk_tarkwa').arrive.z) < 1);
});
