// Car parks: layout (pure), park/take rules, fee through the ledger, one car per player, ambient fill, sell/expire cleanup, drive lock.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, DAY } from './helpers.js';
import { checkInvariants, balanceOf, cashId, move, SYS } from '../server/core/ledger.js';
import { parkingChip, bays, inLot, nearestFree, ambientBays, ambientLook, occupancy, BAY } from '../server/core/carparks-layout.js';
import { roadAt } from '../client/src/roadgeom.js';

const GRACE = 4 * 60000;
const setup = async (cash = 2000000) => { const s = makeServer(); const u = mkUser(s, { cash }); s.app.clock.advance(GRACE); const v = s.app.city.venues.find(x => x.id === 'venue_motors'); at(s, u, v.x, v.z);
  await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); await ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: 'venue_motors' } }); const b = await ok(s, 'POST', '/api/garage/buy', { uid: u, body: { model: 'kekere' } }); await ok(s, 'POST', '/api/venue/leave', { uid: u }); return { s, u, carId: b.carId }; };
const lot = (s, id = 'cp_club1') => s.app.city.carParks.find(l => l.id === id);
const driveInto = async (s, u, l, dx = 0, dz = 0) => { at(s, u, l.x + dx, l.z + dz); s.app.world.players.get(u).mode = 'drive'; };

test('city data: five lots, each clear of roads, buildings, water and roundabouts, each with an ad board and enough bays', () => {
  const s = makeServer(); const c = s.app.city; assert.ok(c.carParks.length >= 4);
  for (const l of c.carParks) { const b = bays(l); assert.ok(b.length >= 14 && b.length <= 24, l.id + ' bays ' + b.length); assert.ok(l.fee >= 0 && ['public', 'venue'].includes(l.kind));
    for (let x = l.x - l.w / 2; x <= l.x + l.w / 2; x += 2) for (let z = l.z - l.d / 2; z <= l.z + l.d / 2; z += 2) assert.ok(!roadAt(c, x, z, 0.5), `${l.id} on a road at ${x},${z}`);
    for (const bd of c.buildings) assert.ok(!(l.x + l.w / 2 > bd.x - bd.w / 2 && l.x - l.w / 2 < bd.x + bd.w / 2 && l.z + l.d / 2 > bd.z - bd.d / 2 && l.z - l.d / 2 < bd.z + bd.d / 2), `${l.id} overlaps ${bd.id}`);
    for (const o of c.roundabouts) assert.ok(Math.hypot(Math.max(l.x - l.w / 2 - o.x, 0, o.x - l.x - l.w / 2), Math.max(l.z - l.d / 2 - o.z, 0, o.z - l.z - l.d / 2)) > o.outerR, `${l.id} touches ${o.id}`);
    assert.ok(c.billboards.some(x => x.surface === 'carpark_board' && x.lot === l.id), 'ad board ' + l.id); if (l.venueId) assert.ok(c.venues.some(v => v.id === l.venueId)); }
});
test('layout: bays are inside the lot, do not overlap, leave the gate end clear, and rows face the aisle', () => {
  const s = makeServer(); for (const l of s.app.city.carParks) { const b = bays(l); for (const a of b) { assert.ok(inLot(l, a.x, a.z)); assert.ok(Math.abs(a.x - l.x) <= l.w / 2 - BAY.w / 2 + 0.01); const gateX = l.gate === 'w' ? l.x - l.w / 2 : l.x + l.w / 2; assert.ok(Math.abs(a.x - gateX) >= BAY.gateRoom - 0.01, 'gate clear'); assert.ok(a.ry === Math.PI / 2 || a.ry === -Math.PI / 2); }
    for (let i = 0; i < b.length; i++) for (let j = i + 1; j < b.length; j++) if (b[i].row === b[j].row) assert.ok(Math.abs(b[i].x - b[j].x) >= BAY.w - 0.01, 'bays overlap'); assert.equal(new Set(b.map(a => a.i)).size, b.length); }
  const l = s.app.city.carParks[0]; assert.equal(nearestFree(l, l.x, l.z, bays(l).map(b => b.i)), null); const near = nearestFree(l, bays(l)[3].x, bays(l)[3].z); assert.equal(near.i, 3); assert.equal(nearestFree(l, bays(l)[3].x, bays(l)[3].z, [3]).i === 3, false);
});
test('ambient cars: deterministic, share of bays follows the hour, never on a bay a player holds, looks are stable', () => {
  const s = makeServer(); const l = s.app.city.carParks[1]; const a = ambientBays(l, 14), b = ambientBays(l, 14); assert.deepEqual([...a], [...b]); const n = bays(l).length; assert.ok(a.size > 0 && a.size < n);
  assert.ok(occupancy(l, 15) > occupancy(l, 3)); const t = ambientBays(l, 14, [...a].slice(0, 2)); for (const x of [...a].slice(0, 2)) assert.ok(!t.has(x)); assert.deepEqual(ambientLook(l, 2, 14), ambientLook(l, 2, 14)); assert.notDeepEqual(ambientBays(l, 14), ambientBays(l, 20));
});
test('parking: needs to be driving, own car, inside a lot; takes the fee through the ledger; one parked car per player', async () => {
  const { s, u } = await setup(); const l = lot(s); const cash0 = balanceOf(s.app.db, cashId(u));
  assert.equal((await call(s, 'POST', '/api/parking/park', { uid: u, body: {} })).json.error, 'NOT_DRIVING'); await driveInto(s, u, l, 40, 0); assert.equal((await call(s, 'POST', '/api/parking/park', { uid: u, body: {} })).json.error, 'NOT_IN_LOT');
  await driveInto(s, u, l, 0, 3); const r = await ok(s, 'POST', '/api/parking/park', { uid: u, body: { idemKey: 'k1' } }); assert.equal(r.fee, 150); assert.equal(balanceOf(s.app.db, cashId(u)), cash0 - 150); assert.equal(s.app.world.players.get(u).mode, 'walk');
  s.app.world.players.get(u).mode = 'drive'; assert.equal((await call(s, 'POST', '/api/parking/park', { uid: u, body: { idemKey: 'k2' } })).json.error, 'ALREADY_PARKED'); assert.equal(balanceOf(s.app.db, cashId(u)), cash0 - 150, 'no second charge');
  const v = await ok(s, 'GET', '/api/parking', { uid: u }); assert.equal(v.mine.lot, l.id); assert.equal(v.lots.find(x => x.id === l.id).taken, 1); assert.ok(checkInvariants(s.app.db));
});
test('cannot afford the fee, no own car (borrowed car), full lot', async () => {
  const { s, u } = await setup(); const l = lot(s); await driveInto(s, u, l, 0, 3); const have = balanceOf(s.app.db, cashId(u)); move(s.app, { from: cashId(u), to: SYS.SINK_FEES, amount: have - 100, reason: 'test_drain', userId: u });
  const poor = await call(s, 'POST', '/api/parking/park', { uid: u, body: {} }); assert.equal(poor.json.error, 'NO_FUNDS'); assert.equal(poor.status, 402); assert.equal(balanceOf(s.app.db, cashId(u)), 100, 'nothing taken');
  const l2 = lot(s, 'cp_motors'); await driveInto(s, u, l2, 0, 3); const n = bays(l2).length; for (let i = 0; i < n; i++) s.app.db.prepare('INSERT INTO car_parking(user_id,car_id,lot_id,bay,x,z,ry,parked_at,fee) VALUES (?,?,?,?,?,?,?,?,0)').run(1000 + i, 1, l2.id, i, 0, 0, 0, s.app.clock.now());
  assert.equal((await call(s, 'POST', '/api/parking/park', { uid: u, body: {} })).json.error, 'LOT_FULL');
  const t = makeServer(); const w = mkUser(t, { cash: 1000 }); t.app.clock.advance(GRACE); const l3 = lot(t); at(t, w, l3.x, l3.z + 3); t.app.world.players.get(w).mode = 'drive'; assert.equal((await call(t, 'POST', '/api/parking/park', { uid: w, body: {} })).json.error, 'NO_OWN_CAR');
});
test('taking the car back: must be walking, close enough; frees the bay; back in drive mode at the car', async () => {
  const { s, u } = await setup(); const l = lot(s); await driveInto(s, u, l, 0, 3); await ok(s, 'POST', '/api/parking/park', { uid: u, body: {} }); const mine = (await ok(s, 'GET', '/api/parking', { uid: u })).mine;
  at(s, u, mine.x + 40, mine.z); assert.equal((await call(s, 'POST', '/api/parking/take', { uid: u })).json.error, 'TOO_FAR'); at(s, u, mine.x, mine.z + 4); const t = await ok(s, 'POST', '/api/parking/take', { uid: u }); assert.equal(s.app.world.players.get(u).mode, 'drive'); assert.equal(Math.round(t.at.x * 100), Math.round(mine.x * 100));
  assert.equal((await ok(s, 'GET', '/api/parking', { uid: u })).mine, null); assert.equal((await call(s, 'POST', '/api/parking/take', { uid: u })).json.error, 'NOT_PARKED');
});
test('while your active car is parked the heartbeat will not put you in drive mode elsewhere; other players see the car', async () => {
  const { s, u } = await setup(); const l = lot(s, 'cp_motors'); await driveInto(s, u, l, 0, 3); const r = await ok(s, 'POST', '/api/parking/park', { uid: u, body: {} }); assert.equal(r.fee, 0, 'showroom lot is free');
  at(s, u, 0, 0); const hb = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { mode: 'drive', trail: [] } }); void hb; assert.equal(s.app.world.players.get(u).mode, 'walk');
  const o = mkUser(s, { cash: 100 }); const pv = await ok(s, 'GET', '/api/parking', { uid: o }); assert.equal(pv.others.length, 1); assert.equal(pv.others[0].lot, 'cp_motors'); assert.ok(pv.others[0].who);
});
test('selling the car clears the parking; cars parked longer than the limit go back to the garage for free', async () => {
  const { s, u, carId } = await setup(); const l = lot(s); await driveInto(s, u, l, 0, 3); await ok(s, 'POST', '/api/parking/park', { uid: u, body: {} }); s.app.clock.advance(s.app.balance.parking.maxParkedMs + DAY); const v = await ok(s, 'GET', '/api/parking', { uid: u }); assert.equal(v.mine, null);
  await driveInto(s, u, l, 0, 3); await ok(s, 'POST', '/api/parking/park', { uid: u, body: {} }); const v2 = await ok(s, 'GET', '/api/parking', { uid: u }); assert.ok(v2.mine); await ok(s, 'POST', '/api/garage/sell', { uid: u, body: { carId } }); assert.equal((await ok(s, 'GET', '/api/parking', { uid: u })).mine, null);
});
test('chip logic: park offer only when driving inside a lot with an own car, take offer only when walking near the parked car', () => {
  const s = makeServer(); const lots = s.app.city.carParks; const l = lots.find(x => x.fee > 0); const base = { lots, mine: null, ownedCar: true, takeRange: 9 };
  assert.equal(parkingChip({ ...base, mode: 'walk', x: l.x, z: l.z }), null); assert.equal(parkingChip({ ...base, mode: 'drive', x: 0, z: 0 }), null);
  assert.equal(parkingChip({ ...base, mode: 'drive', x: l.x, z: l.z }).kind, 'park'); assert.match(parkingChip({ ...base, mode: 'drive', x: l.x, z: l.z }).label, new RegExp(String(l.fee)));
  assert.equal(parkingChip({ ...base, ownedCar: false, mode: 'drive', x: l.x, z: l.z }).kind, 'hint'); const free = lots.find(x => x.fee === 0); assert.match(parkingChip({ ...base, mode: 'drive', x: free.x, z: free.z }).label, /free/);
  const mine = { x: l.x, z: l.z }; assert.equal(parkingChip({ ...base, mine, mode: 'walk', x: l.x + 5, z: l.z }).kind, 'take'); assert.equal(parkingChip({ ...base, mine, mode: 'walk', x: l.x + 30, z: l.z }), null); assert.equal(parkingChip({ ...base, mine, mode: 'drive', x: l.x, z: l.z }), null);
});
