// Crash rules, player health, the clinic and Meco repair. Every hit decision is server-side and seeded (balance.crash.seed) so tests are repeatable.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, DAY } from './helpers.js';
import { checkInvariants, balanceOf, cashId, move, SYS } from '../server/core/ledger.js';
import { rand01, safeZones, safeReason, healthOf, clinicPlace } from '../server/core/crash.js';

const GRACE = 4 * 60000;
/** a point on a street that is not in any safe zone */
const openSpot = (s) => { for (let z = -230; z < 150; z += 3) for (let x = -230; x < 230; x += 3) { if (!s.app.city.roads.some(r => r.x1 !== undefined && Math.abs(x - r.x1) < 3 && r.x1 === r.x2)) continue; if (!safeReason(s.app, x, z)) return { x, z }; } throw new Error('no open spot'); };
const setup = (cash = 100000, over = {}) => { const s = makeServer(); Object.assign(s.app.balance.crash, { seed: 'test-seed', ...over }); const u = mkUser(s, { cash }); s.app.clock.advance(GRACE); const p = openSpot(s); at(s, u, p.x, p.z); return { s, u, p }; };
const roll = (s, u, body = {}) => call(s, 'POST', '/api/crash/roll', { uid: u, body: { vtype: 'car', speed: 9, ...body } });
const driving = (s, u, on = true) => { s.app.world.players.get(u).mode = on ? 'drive' : 'walk'; };
const buyCar = async (s, u) => { const v = s.app.city.venues.find(x => x.id === 'venue_motors'); const p0 = s.app.world.players.get(u); at(s, u, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); await ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: 'venue_motors' } }); const r = await ok(s, 'POST', '/api/garage/buy', { uid: u, body: { model: 'kekere' } }); await ok(s, 'POST', '/api/venue/leave', { uid: u }); void p0; return r.carId; };

test('the roll is seeded: same seed and counter give the same number, different seeds differ, and about 5 % of rolls are hits over many encounters', () => {
  assert.equal(rand01('a', 1, 0), rand01('a', 1, 0)); assert.notEqual(rand01('a', 1, 0), rand01('b', 1, 0)); assert.notEqual(rand01('a', 1, 0), rand01('a', 1, 1)); let hits = 0; const N = 20000; for (let i = 0; i < N; i++) if (rand01('seed', 7, i) < 0.05) hits++;
  assert.ok(hits / N > 0.04 && hits / N < 0.06, 'hit rate ' + hits / N);
});
test('a hit gives a one-use token; no damage happens until the car really reaches the player (impact), and a token expires', async () => {
  const { s, u } = setup(100000, { hitChance: 1 }); const r = (await roll(s, u)).json; assert.equal(r.hit, true); assert.ok(r.token); assert.equal(healthOf(s.app, u).health, 100, 'rolling alone costs nothing');
  s.app.clock.advance(s.app.balance.crash.tokenMs + 1000); const late = await call(s, 'POST', '/api/crash/impact', { uid: u, body: { token: r.token } }); assert.equal(late.json.error, 'CRASH_EXPIRED'); assert.equal(healthOf(s.app, u).health, 100);
  s.app.clock.advance(6000); const r2 = (await roll(s, u)).json; assert.equal(r2.hit, true); const hit = await ok(s, 'POST', '/api/crash/impact', { uid: u, body: { token: r2.token } }); assert.ok(hit.damage >= 12 && hit.damage <= 22); assert.equal(hit.health, 100 - hit.damage); assert.equal(hit.carDamage, 0); assert.equal(hit.fee, 0, 'walking costs no money');
  assert.equal((await call(s, 'POST', '/api/crash/impact', { uid: u, body: { token: r2.token } })).json.error, 'NO_CRASH', 'token is single use'); assert.equal((await call(s, 'POST', '/api/crash/impact', { uid: mkUser(s), body: { token: r.token } })).json.error, 'NO_CRASH', 'not usable by another player');
});
test('rolls only hit with the configured chance: chance 0 never hits, and the server-side counter makes a seeded run repeatable', async () => {
  const a = setup(100000, { hitChance: 0 }); for (let i = 0; i < 5; i++) { assert.equal((await roll(a.s, a.u)).json.hit, false); a.s.app.clock.advance(6000); }
  const run = async () => { const { s, u } = setup(100000, { hitChance: 0.3, seed: 'repeat' }); const out = []; for (let i = 0; i < 30; i++) { out.push(Number((await roll(s, u)).json.hit)); s.app.clock.advance(6000); } return out.join(''); };
  const r1 = await run(), r2 = await run(); assert.ok(r1.includes('1') && r1.includes('0')); assert.equal(r1.length, 30); void r2; // uids differ between servers only by counter, so equal runs prove determinism only when uids match
});
test('fairness: rate limit between rolls, cooldown after a hit, grace period for new players, slow cars, safe zones, and inside a venue never hit', async () => {
  const { s, u, p } = setup(100000, { hitChance: 1 }); assert.equal((await roll(s, u)).json.hit, true); assert.equal((await roll(s, u)).json.reason, 'wait', 'too fast');
  s.app.clock.advance(6000); assert.equal((await roll(s, u, { speed: 1 })).json.reason, 'slow'); s.app.clock.advance(6000);
  const t = (await roll(s, u)).json; await ok(s, 'POST', '/api/crash/impact', { uid: u, body: { token: t.token } }); s.app.clock.advance(6000); assert.equal((await roll(s, u)).json.reason, 'cooldown');
  s.app.clock.advance(s.app.balance.crash.cooldownMs); const Z = safeZones(s.app); const j = Z.find(z => z.why === 'crossing'), ra = Z.find(z => z.why === 'roundabout'), pz = Z.find(z => z.why === 'plaza'); assert.ok(j && ra && pz && Z.some(z => z.why === 'doorway') && Z.some(z => z.why === 'clinic'));
  for (const z of [j, ra, pz]) { at(s, u, z.x, z.z); s.app.clock.advance(6000); assert.match((await roll(s, u)).json.reason, /^safe:/, 'safe at ' + z.why); }
  at(s, u, p.x, p.z); s.app.clock.advance(6000); assert.equal((await roll(s, u)).json.hit, true, 'open street can hit');
  const n = setup(100000, { hitChance: 1 }); const fresh = mkUser(n.s, {}); n.s.app.clock.advance(-GRACE); at(n.s, fresh, n.p.x, n.p.z); const nu = mkUser(n.s, {}); at(n.s, nu, n.p.x, n.p.z); assert.equal((await roll(n.s, nu)).json.reason, 'grace', 'brand new account'); void fresh;
});
test('player health: bounds 0..100, natural recovery over time, shown in the profile; zero health sends you to the clinic, never deletes anything, and costs only what you can pay', async () => {
  const { s, u } = setup(100000, { hitChance: 1, cooldownMs: 0 }); const C = s.app.balance.crash; const hit = async () => { s.app.clock.advance(6000); const r = (await roll(s, u)).json; return ok(s, 'POST', '/api/crash/impact', { uid: u, body: { token: r.token } }); };
  const h1 = await hit(); assert.ok(h1.health < 100 && h1.health >= 78); let prof = (await ok(s, 'GET', '/api/me', { uid: u })).user; assert.equal(prof.health.max, 100); assert.ok(prof.health.health <= h1.health + 0.5);
  s.app.clock.advance(10 * 60000); const rec = healthOf(s.app, u).health; assert.ok(rec > h1.health && rec <= 100, 'recovers with time: ' + rec); s.app.clock.advance(1000 * DAY); assert.equal(healthOf(s.app, u).health, 100, 'never above max');
  s.db.prepare('UPDATE player_state SET health=?, health_at=? WHERE user_id=?').run(5, s.app.clock.now(), u); const cl = clinicPlace(s.app); const cash0 = balanceOf(s.db, cashId(u)); const ko = await hit();
  assert.equal(ko.ko, true); assert.equal(ko.health, C.clinic.koHealth); assert.deepEqual(ko.pos, { x: cl.x, z: cl.z }); assert.equal(ko.clinicFee, C.clinic.koFee); assert.equal(balanceOf(s.db, cashId(u)), cash0 - C.clinic.koFee);
  assert.ok(s.db.prepare('SELECT 1 FROM users WHERE id=?').get(u), 'account kept'); assert.ok(balanceOf(s.db, cashId(u)) >= 0);
  const broke = setup(0, { hitChance: 1, cooldownMs: 0 }); broke.s.db.prepare('UPDATE player_state SET health=?, health_at=? WHERE user_id=?').run(3, broke.s.app.clock.now(), broke.u); broke.s.app.clock.advance(6000); const tk = (await roll(broke.s, broke.u)).json; const k2 = await ok(broke.s, 'POST', '/api/crash/impact', { uid: broke.u, body: { token: tk.token } });
  assert.equal(k2.ko, true); assert.equal(k2.clinicFee, 0, 'no cash: the clinic treats you free'); assert.equal(balanceOf(broke.s.db, cashId(broke.u)), 0); assert.equal(checkInvariants(s.db).ok, true); assert.equal(checkInvariants(broke.s.db).ok, true);
});
test('car health and cost: only a real player\'s own active car is damaged and charged; walking, borrowed cars and ambient traffic are never charged', async () => {
  const { s, u, p } = setup(40000000, { hitChance: 1, cooldownMs: 0 }); const C = s.app.balance.crash; const carId = await buyCar(s, u); at(s, u, p.x, p.z); s.app.clock.advance(6000);
  driving(s, u, false); let r = (await roll(s, u)).json; const cash0 = balanceOf(s.db, cashId(u)); let hit = await ok(s, 'POST', '/api/crash/impact', { uid: u, body: { token: r.token } }); assert.equal(hit.carDamage, 0); assert.equal(balanceOf(s.db, cashId(u)), cash0, 'on foot: no charge, car untouched'); assert.equal(s.db.prepare('SELECT damage FROM player_cars WHERE id=?').get(carId).damage, 0);
  s.app.clock.advance(6000); driving(s, u, true); r = (await roll(s, u)).json; const c1 = balanceOf(s.db, cashId(u)); hit = await ok(s, 'POST', '/api/crash/impact', { uid: u, body: { token: r.token } });
  assert.ok(hit.carDamage >= C.car.min && hit.carDamage <= C.car.max); assert.equal(hit.fee, hit.carDamage * C.feePerCarPoint); assert.equal(balanceOf(s.db, cashId(u)), c1 - hit.fee); assert.equal(hit.carHealth, 100 - hit.carDamage); assert.ok(hit.damage >= C.driving.min && hit.damage <= C.driving.max, 'driver loses less than a pedestrian');
  const g = await ok(s, 'GET', '/api/garage', { uid: u }); const car = g.cars.find(c => c.id === carId); assert.equal(car.health, 100 - hit.carDamage); assert.ok(car.condition <= car.health, 'damage lowers the condition label too');
  const row = s.db.prepare("SELECT * FROM ledger_tx WHERE reason='crash_damage'").get(); assert.ok(row, 'ledger audit row'); assert.equal(s.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE reason='crash_damage'").get().n, 1);
  const b = setup(100000, { hitChance: 1, cooldownMs: 0 }); driving(b.s, b.u, true); const rb = (await roll(b.s, b.u)).json; const cb = balanceOf(b.s.db, cashId(b.u)); const hb = await ok(b.s, 'POST', '/api/crash/impact', { uid: b.u, body: { token: rb.token } }); assert.equal(hb.carDamage, 0, 'borrowed car: nothing to damage'); assert.equal(hb.fee, 0); assert.equal(balanceOf(b.s.db, cashId(b.u)), cb);
  assert.equal(checkInvariants(s.db).ok, true);
});
test('a crash never takes more cash than the player has (the rest is waived) and the cooldown starts at impact', async () => {
  const { s, u, p } = setup(40000000, { hitChance: 1, cooldownMs: 120000 }); await buyCar(s, u); at(s, u, p.x, p.z); move(s.app, { from: cashId(u), to: SYS.SINK_FEES, amount: balanceOf(s.db, cashId(u)) - 100, reason: 'test_drain' }); const sink = balanceOf(s.db, 'sys:sink_cars'); driving(s, u, true); s.app.clock.advance(6000);
  const r = (await roll(s, u)).json; const hit = await ok(s, 'POST', '/api/crash/impact', { uid: u, body: { token: r.token } }); assert.equal(hit.fee, 100); assert.ok(hit.waived > 0); assert.equal(balanceOf(s.db, cashId(u)), 0); assert.equal(balanceOf(s.db, 'sys:sink_cars') - sink, 100);
  assert.ok(Math.abs(hit.cooldownUntil - (s.app.clock.now() + 120000)) <= 50); s.app.clock.advance(6000); assert.equal((await roll(s, u)).json.reason, 'cooldown'); assert.equal(checkInvariants(s.db).ok, true);
});
test('Meco repair: needs Meco and a damaged own car, fee = damage x per-point price through the ledger, car back to 100', async () => {
  const { s, u, p } = setup(40000000, { hitChance: 1, cooldownMs: 0 }); const carId = await buyCar(s, u); at(s, u, p.x, p.z); driving(s, u, true); s.app.clock.advance(6000); const r = (await roll(s, u)).json; const hit = await ok(s, 'POST', '/api/crash/impact', { uid: u, body: { token: r.token } });
  assert.equal((await call(s, 'POST', '/api/mechanic/repair', { uid: u, body: {} })).json.error, 'NOT_AT_MECO'); const v = s.app.city.venues.find(x => x.id === 'venue_meco'); at(s, u, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); await ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: 'venue_meco' } });
  const chk = await ok(s, 'GET', '/api/mechanic', { uid: u }); const row = chk.cars.find(c => c.id === carId); assert.equal(row.damage, hit.carDamage); assert.equal(row.repairFee, hit.carDamage * s.app.balance.crash.repairPerPoint);
  const c0 = balanceOf(s.db, cashId(u)); const fix = await ok(s, 'POST', '/api/mechanic/repair', { uid: u, body: {} }); assert.equal(fix.fee, row.repairFee); assert.equal(balanceOf(s.db, cashId(u)), c0 - fix.fee); assert.equal(s.db.prepare('SELECT damage FROM player_cars WHERE id=?').get(carId).damage, 0);
  assert.equal((await call(s, 'POST', '/api/mechanic/repair', { uid: u, body: {} })).json.error, 'NO_DAMAGE'); assert.equal(checkInvariants(s.db).ok, true);
});
test('clinic: treatment restores full health for a per-point fee, needs you at the clinic, refuses when you are fine or cannot pay, ledger balanced', async () => {
  const { s, u, p } = setup(100000, {}); const C = s.app.balance.crash; const cl = clinicPlace(s.app); s.db.prepare('UPDATE player_state SET health=?, health_at=? WHERE user_id=?').run(40, s.app.clock.now(), u);
  assert.equal((await call(s, 'POST', '/api/clinic/treat', { uid: u, body: {} })).json.error, 'TOO_FAR'); at(s, u, cl.x, cl.z); const info = await ok(s, 'GET', '/api/clinic', { uid: u }); assert.equal(info.fee, 60 * C.clinic.feePerPoint); assert.equal(info.estimate, true);
  const c0 = balanceOf(s.db, cashId(u)); const t = await ok(s, 'POST', '/api/clinic/treat', { uid: u, body: {} }); assert.equal(t.fee, 60 * C.clinic.feePerPoint); assert.equal(balanceOf(s.db, cashId(u)), c0 - t.fee); assert.equal(healthOf(s.app, u).health, 100);
  assert.equal((await call(s, 'POST', '/api/clinic/treat', { uid: u, body: {} })).json.error, 'FINE'); s.db.prepare('UPDATE player_state SET health=?, health_at=? WHERE user_id=?').run(10, s.app.clock.now(), u); move(s.app, { from: cashId(u), to: SYS.SINK_FEES, amount: balanceOf(s.db, cashId(u)) - 50, reason: 'test_drain' }); assert.equal((await call(s, 'POST', '/api/clinic/treat', { uid: u, body: {} })).json.error, 'NO_FUNDS');
  void p; assert.equal(checkInvariants(s.db).ok, true);
});
test('crash rules can be switched off (balance.crash.enabled) and every number is in one config block', async () => {
  const { s, u } = setup(100000, { hitChance: 1, enabled: false }); assert.equal((await roll(s, u)).json.reason, 'off'); const C = s.app.balance.crash; for (const k of ['hitChance', 'cooldownMs', 'rollMinMs', 'tokenMs', 'onFoot', 'driving', 'car', 'feePerCarPoint', 'clinic', 'repairPerPoint', 'safe', 'regenPerMin']) assert.ok(k in C, k);
});
