import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, DAY } from './helpers.js';
import { checkInvariants, balanceOf, cashId, SYS } from '../server/core/ledger.js';
import { profile } from '../server/core/economy.js';

const enter = async (s, u) => { const v = s.app.city.venues.find(x => x.id === 'venue_motors'); at(s, u, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); return ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: 'venue_motors' } }); };
test('showroom: regular models with ESTIMATE prices, plus exclusive G-Wagon, G63 AMG, Cybertruck and McLaren F1; buying needs the showroom, funds and a garage slot', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 1000000 }); const g0 = await ok(s, 'GET', '/api/garage', { uid: u }); assert.equal(g0.catalogue.length, 14); assert.ok(g0.catalogue.some(c => c.id === 'micra')); assert.ok(g0.catalogue.some(c => c.id === 'micra12')); assert.ok(g0.catalogue.filter(c => !c.exclusive).every(c => c.estimate)); assert.ok(g0.catalogue.filter(c => c.exclusive).length === 4); assert.equal(g0.supercarsDaily, 20); assert.equal(g0.supercarsLeft, 20); assert.equal(g0.active.model, 'borrowed'); assert.equal(g0.cars.length, 0);
  assert.equal((await call(s, 'POST', '/api/garage/buy', { uid: u, body: { model: 'kekere' } })).json.error, 'NOT_IN_SHOWROOM'); const view = await enter(s, u); assert.equal(view.stations.filter(x => x.type === 'car').length, 14);
  assert.ok(view.stations.some(x => x.model === 'micra' && x.body === 'micra'));
  assert.ok(view.stations.some(x => x.model === 'micra12' && x.body === 'micra12'));
  assert.equal(s.app.balance.cars.models.gwagon.price, 10000000000); assert.equal(s.app.balance.cars.models.g63.price, 15000000000); assert.equal(s.app.balance.cars.models.cyber.price, 20000000000); assert.equal(s.app.balance.cars.models.mclaren.price, 25000000000);
  assert.equal(view.stations.find(x => x.model === 'gwagon').price, 10000000000); assert.equal(view.stations.find(x => x.model === 'g63').price, 15000000000); assert.equal(view.stations.find(x => x.model === 'cyber').price, 20000000000); assert.equal(view.stations.find(x => x.model === 'mclaren').price, 25000000000);
  assert.equal((await call(s, 'POST', '/api/garage/buy', { uid: u, body: { model: 'senator' } })).json.error, 'INSUFFICIENT_FUNDS'); assert.equal((await call(s, 'POST', '/api/garage/buy', { uid: u, body: { model: 'nope' } })).status, 404);
  const price = s.app.balance.cars.models.kekere.price; const r = await ok(s, 'POST', '/api/garage/buy', { uid: u, body: { model: 'kekere' } }); assert.equal(r.active, true); assert.equal(balanceOf(s.db, cashId(u)), 1000000 - price);
  const yard = await ok(s, 'GET', '/api/motoka/stock', { uid: u }); assert.ok(yard.cars.length >= 10); assert.ok(yard.cars.every(c => c.model && c.x != null)); assert.equal(yard.supercarsLeft, 20); assert.equal(yard.cars.filter(c => c.exclusive).length, 20);
  s.db.prepare('UPDATE accounts SET balance=balance+? WHERE id=?').run(0, cashId(u)); for (let i = 0; i < 2; i++) { await call(s, 'POST', '/api/dev/cash', { uid: u }); }
  assert.equal(checkInvariants(s.db).ok, true);
});
test('Motoka supercars: only 20 exclusive cars shown and sold each Lagos day, then come back tomorrow', async () => {
  const s = makeServer(); s.app.balance.cars.garageSlots = 25; const u = mkUser(s, { cash: 500000000000 }); await enter(s, u);
  const supers = ['gwagon', 'g63', 'cyber', 'mclaren']; for (let i = 0; i < 20; i++) await ok(s, 'POST', '/api/garage/buy', { uid: u, body: { model: supers[i % 4] } });
  assert.equal((await ok(s, 'GET', '/api/garage', { uid: u })).supercarsLeft, 0);
  assert.equal((await call(s, 'POST', '/api/garage/buy', { uid: u, body: { model: 'gwagon' } })).json.error, 'SUPER_SOLD_OUT');
  const yard = await ok(s, 'GET', '/api/motoka/stock', { uid: u }); assert.equal(yard.supercarsLeft, 0); assert.equal(yard.cars.filter(c => c.exclusive).length, 0);
  s.app.clock.advance(DAY); assert.equal((await ok(s, 'GET', '/api/garage', { uid: u })).supercarsLeft, 20);
  await ok(s, 'POST', '/api/garage/buy', { uid: u, body: { model: 'cyber' } });
});
test('garage: switch active car, slots limit, resale depreciates with age but never below the floor, net worth counts cars, ledger balanced', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 40000000 }); await enter(s, u); const ids = []; for (const m of ['kekere', 'oga', 'bigboy', 'senator', 'kekere']) ids.push((await ok(s, 'POST', '/api/garage/buy', { uid: u, body: { model: m } })).carId);
  assert.equal((await call(s, 'POST', '/api/garage/buy', { uid: u, body: { model: 'oga' } })).json.error, 'GARAGE_FULL'); let g = await ok(s, 'GET', '/api/garage', { uid: u }); assert.equal(g.active.model, 'kekere'); assert.equal(g.cars.length, 5); assert.equal(g.slots, 5);
  const R = s.app.balance.cars.resale; const oga = g.cars.find(c => c.model === 'oga'); assert.ok(Math.abs(oga.value - oga.paid * (1 - R.firstDriveOffFraction)) <= 1); const nw0 = profile(s.app, u).netWorth;
  await ok(s, 'POST', '/api/garage/use', { uid: u, body: { carId: ids[1] } }); assert.equal((await ok(s, 'GET', '/api/garage', { uid: u })).active.model, 'oga'); assert.equal((await call(s, 'POST', '/api/garage/use', { uid: mkUser(s), body: { carId: ids[1] } })).json.error, 'NO_CAR');
  s.app.clock.advance(10 * DAY); g = await ok(s, 'GET', '/api/garage', { uid: u }); const oga10 = g.cars.find(c => c.model === 'oga'); assert.ok(Math.abs(oga10.value - oga.paid * (1 - R.firstDriveOffFraction - 10 * R.perDayDepreciation)) <= 1); assert.ok(profile(s.app, u).netWorth < nw0);
  s.app.clock.advance(400 * DAY); g = await ok(s, 'GET', '/api/garage', { uid: u }); assert.ok(Math.abs(g.cars.find(c => c.model === 'oga').value - oga.paid * R.floorFraction) <= 1);
  const before = balanceOf(s.db, cashId(u)); const sold = await ok(s, 'POST', '/api/garage/sell', { uid: u, body: { carId: ids[1] } }); assert.equal(balanceOf(s.db, cashId(u)), before + sold.value); g = await ok(s, 'GET', '/api/garage', { uid: u }); assert.equal(g.cars.length, 4); assert.ok(g.cars.some(c => c.active), 'another car becomes active');
  assert.equal((await call(s, 'POST', '/api/garage/sell', { uid: u, body: { carId: ids[1] } })).json.error, 'NO_CAR'); assert.ok(sold.value < s.app.balance.cars.models.oga.price); assert.equal(checkInvariants(s.db).ok, true);
});
test('cars change the commute: fare, seconds and mood; borrowed car costs more per trip and has no mood perk', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 30000000 }); const bqAll = await ok(s, 'GET', '/api/travel/quote?place=plaza', { uid: u }); const bq = bqAll.modes.find(m => m.id === 'car'); assert.equal(bq.label, 'Borrowed car'); assert.equal(bq.owned, false);
  await enter(s, u); await ok(s, 'POST', '/api/garage/buy', { uid: u, body: { model: 'senator' } }); await ok(s, 'POST', '/api/venue/leave', { uid: u }); const q = (await ok(s, 'GET', '/api/travel/quote?place=plaza', { uid: u })).modes.find(m => m.id === 'car');
  assert.equal(q.label, 'Senator Executive'); assert.equal(q.owned, true); assert.equal(q.mood, s.app.balance.cars.models.senator.mood); const d = (await ok(s, 'GET', '/api/travel/quote?place=plaza', { uid: u })).distance;
  const C = s.app.balance.cars; const T = s.app.balance.transport; const rushMult = (await ok(s, 'GET', '/api/travel/quote?place=plaza', { uid: u })).rush ? T.rushMult : 1;
  const rawSec = Math.max(T.minSec, Math.min(T.maxSec, Math.round(d / C.models.senator.speed)));
  const boost = C.models.senator.exclusive ? (T.supercarTravelBoost ?? 3) : (T.carTravelBoost ?? 2);
  assert.ok(Math.abs(q.fare - C.models.senator.perM * d * rushMult) <= 1.5);
  assert.equal(q.seconds, Math.max(T.minSec, Math.round(rawSec / boost)));
  assert.ok(C.models.senator.speed > C.borrowed.speed); assert.ok(Math.abs(bq.fare - (C.borrowed.base + C.borrowed.perM * bqAll.distance) * rushMult) <= 1.5);
  // borrowed Take me there is 2× faster than the raw distance/speed time
  const bRaw = Math.max(T.minSec, Math.min(T.maxSec, Math.round(bqAll.distance / C.borrowed.speed)));
  assert.equal(bq.seconds, Math.max(T.minSec, Math.round(bRaw / (T.carTravelBoost ?? 2))));
  const m0 = profile(s.app, u).mood; const t = await ok(s, 'POST', '/api/travel', { uid: u, body: { placeId: 'plaza', mode: 'car' } }); assert.equal(t.fare, q.fare); assert.ok(profile(s.app, u).mood > m0, 'mood up after a nice ride');
});
test('mood: happy players earn a small wage bonus (ESTIMATE)', async () => {
  const s = makeServer(); const { addMood } = await import('../server/core/economy.js'); const u = mkUser(s); const job = s.app.balance.jobs[0]; const loc = s.app.city.jobLoc[job.location]; at(s, u, loc.x, loc.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
  addMood(s.app, u, 30); await ok(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: job.id } }); s.app.clock.advance(job.durationSec * 1000 + 1000); const r = await ok(s, 'POST', '/api/jobs/claim', { uid: u }); assert.equal(r.wage, job.wage + Math.floor(job.wage * s.app.balance.mood.happyBonusPct / 100));
});
void SYS;
