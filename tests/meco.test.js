import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, DAY, HOUR } from './helpers.js';
import { checkInvariants, balanceOf, cashId, SYS } from '../server/core/ledger.js';

const go = async (s, u, id) => { const v = s.app.city.venues.find(x => x.id === id); at(s, u, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); return ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: id } }); };
const setup = async (cash = 3000000) => { const s = makeServer(); s.app.balance.shops.enforceHours = false; const u = mkUser(s, { cash }); await go(s, u, 'venue_motors'); await ok(s, 'POST', '/api/garage/buy', { uid: u, body: { model: 'kekere' } }); return { s, u }; };

test('meco: a named venue like Mama Put and the Auto Mart (sign, door, hours, 3 stations), listed and enterable', async () => {
  const s = makeServer(); s.app.balance.shops.enforceHours = false; const u = mkUser(s); const v = s.app.city.venues.find(x => x.id === 'venue_meco');
  assert.equal(v.name, 'Meco'); assert.ok(v.sign && v.hours.length === 2 && Number.isFinite(v.x) && Number.isFinite(v.z)); assert.deepEqual(v.stations.map(x => x.type), ['check', 'service', 'poster']);
  assert.ok(s.app.city.places.some(p => p.id === 'venue_meco') || s.app.city.venues.length >= 5); assert.equal((await call(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: 'venue_meco' } })).json.error, 'TOO_FAR');
  const view = await go(s, u, 'venue_meco'); assert.equal(view.name, 'Meco'); assert.equal(view.stations.length, 3); assert.ok(view.stations.find(x => x.type === 'poster').text.includes('ESTIMATES'));
  const other = new Set(s.app.city.venues.filter(x => x.id !== 'venue_meco').map(x => x.buildingId)); assert.ok(!other.has(v.buildingId), 'own building, not shared with another venue');
});
test('meco: check shows the garage with condition that wears with days; borrowed car is not serviced', async () => {
  const { s, u } = await setup(); const d0 = await ok(s, 'GET', '/api/mechanic', { uid: u }); assert.equal(d0.cars.length, 1); assert.equal(d0.cars[0].condition, 100); assert.equal(d0.estimate, true); assert.ok(/sweet/i.test(d0.text));
  s.app.clock.advance(5 * DAY); const d5 = await ok(s, 'GET', '/api/mechanic', { uid: u }); assert.equal(d5.cars[0].condition, 100 - 5 * s.app.balance.cars.meco.wearPerDay); s.app.clock.advance(60 * DAY); assert.equal((await ok(s, 'GET', '/api/mechanic', { uid: u })).cars[0].condition, s.app.balance.cars.meco.wearFloor, 'never below the floor');
  const s2 = makeServer(); const u2 = mkUser(s2); const d = await ok(s2, 'GET', '/api/mechanic', { uid: u2 }); assert.equal(d.borrowed, true); assert.equal(d.cars.length, 0);
  await go(s2, u2, 'venue_meco'); assert.equal((await call(s2, 'POST', '/api/mechanic/service', { uid: u2, body: {} })).json.error, 'NO_CAR');
});
test('meco: service needs Meco and the fee (ledger sink), resets condition, gives a short perk (cheaper fuel, more mood) that expires; no double-charging while fresh; ledger balanced', async () => {
  const { s, u } = await setup(); const fee = s.app.balance.cars.meco.serviceFee; const M = s.app.balance.cars.meco; s.app.clock.advance(12 * DAY);
  assert.equal((await call(s, 'POST', '/api/mechanic/service', { uid: u, body: {} })).json.error, 'NOT_AT_MECO'); const mv = s.app.city.venues.find(x => x.id === 'venue_meco'); const far = s.app.city.shops.concat(s.app.city.venues).filter(x => x.id !== 'venue_meco').sort((a, b) => Math.hypot(b.x - mv.x, b.z - mv.z) - Math.hypot(a.x - mv.x, a.z - mv.z))[0].id; await go(s, u, 'venue_meco'); const fareRough = (await ok(s, 'GET', `/api/travel/quote?place=${far}`, { uid: u })).modes.find(m => m.id === 'car').fare; const cash0 = balanceOf(s.db, cashId(u)); const sink0 = balanceOf(s.db, SYS.SINK_CARS); const r = await ok(s, 'POST', '/api/mechanic/service', { uid: u, body: { idemKey: 'k1' } });
  assert.ok(/Meco/.test(r.text) && /sweet/i.test(r.text), 'pidgin toast'); assert.equal(balanceOf(s.db, cashId(u)), cash0 - fee); assert.equal(balanceOf(s.db, SYS.SINK_CARS), sink0 + fee);
  const again = await call(s, 'POST', '/api/mechanic/service', { uid: u, body: { idemKey: 'k2' } }); assert.equal(again.json.error, 'STILL_FRESH'); assert.equal(balanceOf(s.db, cashId(u)), cash0 - fee);
  const d = await ok(s, 'GET', '/api/mechanic', { uid: u }); assert.equal(d.cars[0].condition, 100); assert.ok(d.cars[0].perkUntil > s.app.clock.now());
  const fareFresh = (await ok(s, 'GET', `/api/travel/quote?place=${far}`, { uid: u })).modes.find(m => m.id === 'car').fare; assert.ok(Math.abs(fareFresh - Math.round(fareRough * (1 - M.fareDiscount))) <= 1, `cheaper fuel while the perk lasts (${fareFresh} < ${fareRough})`);
  s.app.clock.advance(M.perkMs + 1000); const after = await ok(s, 'GET', '/api/mechanic', { uid: u }); assert.equal(after.cars[0].perkUntil, null, 'perk is short-lived');
  assert.equal((await ok(s, 'GET', '/api/garage', { uid: u })).cars[0].condition >= 99, true); assert.equal(checkInvariants(s.db).ok, true);
});
test('meco: an unaffordable service is refused without side effects; a rough car gives less ride mood than a serviced one', async () => {
  const { s, u } = await setup(900000 + 100); await go(s, u, 'venue_meco'); assert.ok(balanceOf(s.db, cashId(u)) < s.app.balance.cars.meco.serviceFee); const cash = balanceOf(s.db, cashId(u));
  assert.equal((await call(s, 'POST', '/api/mechanic/service', { uid: u, body: {} })).json.error, 'INSUFFICIENT_FUNDS'); assert.equal(balanceOf(s.db, cashId(u)), cash); assert.equal(s.db.prepare('SELECT serviced_until FROM player_cars').get().serviced_until, null);
  const { carFor } = await import('../server/core/cars.js'); const M = s.app.balance.cars.meco; const base = s.app.balance.cars.models.kekere.mood; s.app.clock.advance(20 * DAY); assert.equal(carFor(s.app, u).mood, Math.max(0, base - M.roughMoodPenalty), 'rough');
  s.db.prepare('UPDATE player_cars SET serviced_at=?, serviced_until=?').run(s.app.clock.now(), s.app.clock.now() + HOUR); assert.equal(carFor(s.app, u).mood, base + M.perkMood, 'serviced');
});
