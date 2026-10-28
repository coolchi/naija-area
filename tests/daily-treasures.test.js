// Daily treasures (Sherif, 28 Oct 2026): ≤100 cash chests ₦1M..₦10M per Lagos day + one free Cybertruck, 40/10/40/10 split, Mainland-weighted,
// reachable spots, atomic first-come claims, no double pay, reset at Lagos midnight.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at, DAY } from './helpers.js';
import { dailySet, dailyCfg, SPOTS, claimDaily } from '../server/core/daily-treasures.js';
import { dayKey } from '../server/core/rewards.js';
import { balanceOf, cashId, checkInvariants } from '../server/core/ledger.js';
import { enterCity } from '../server/core/cities.js';
import { buildGrid, findRoute, collidersFromCity } from '../client/src/route.js';

const cash = (s) => dailySet(s.app).filter(t => t.prize === 'cash');
const claim = (s, uid, t, extra = {}) => call(s, 'POST', '/api/treasures/claim', { uid, body: { id: t.id, pos: { x: t.x, z: t.z, ry: 0 }, ...extra } });
const goTo = (s, uid, t) => { enterCity(s.app, uid, t.city); at(s, uid, t.x, t.z); };

test('at most 100 cash chests a day, each ₦1M..₦10M, split 40/10/40/10, Mainland-weighted, one Cybertruck', () => {
  const s = makeServer(); const C = dailyCfg(s.app);
  for (let k = 0; k < 7; k++) {
    const set = dailySet(s.app, dayKey(s.app.clock.now()) + k); const c = set.filter(t => t.prize === 'cash');
    assert.ok(c.length <= 100); assert.equal(c.length, 100);
    for (const t of c) { assert.ok(t.worth >= 1_000_000 && t.worth <= 10_000_000, t.id); assert.equal(t.worth % 100_000, 0); }
    const by = (k2) => c.filter(t => t.kind === k2).length;
    assert.deepEqual([by('interior'), by('street'), by('behind'), by('open')], [40, 10, 40, 10]);
    const ml = c.filter(t => t.city === 'lagos-mainland').length; assert.ok(ml >= 48 && ml <= 55, `mainland ${ml}`);
    for (const id of ['lagos-island', 'lagos-vi-ikoyi', 'lagos-lekki']) assert.ok(c.some(t => t.city === id), id);
    const cars = set.filter(t => t.prize === 'car'); assert.equal(cars.length, 1); assert.equal(cars[0].model, C.cybertruck.model);
    assert.equal(new Set(set.map(t => t.id)).size, set.length);
  }
  const avg = cash(s).reduce((a, t) => a + t.worth, 0) / 100; assert.ok(avg > 3e6 && avg < 8e6);
});

test('placement is deterministic per day and changes at Lagos midnight', () => {
  const a = makeServer(), b = makeServer(); assert.deepEqual(dailySet(a.app), dailySet(b.app));
  const d = dayKey(a.app.clock.now()); assert.notDeepEqual(dailySet(a.app, d).map(t => [t.x, t.z]), dailySet(a.app, d + 1).map(t => [t.x, t.z]));
});

test('every daily spot is reachable on foot and not inside solid geometry; interiors sit in reachable venues inside the room', () => {
  const s = makeServer();
  for (const [id, pools] of Object.entries(SPOTS)) {
    const city = s.app.cities[id]; const G = buildGrid(city); const cols = collidersFromCity(city); const sp = [city.spawns[0].x, city.spawns[0].z];
    for (const k of ['street', 'behind', 'open']) for (const p of pools[k]) {
      assert.ok(!cols.some(c => p.x > c.x0 && p.x < c.x1 && p.z > c.z0 && p.z < c.z1), `${id} ${k} ${p.x},${p.z} inside a building`);
      const i = Math.round((p.x - G.x0) / G.cell), j = Math.round((p.z - G.z0) / G.cell); assert.equal(G.blocked.walk[j * G.nx + i], 0, `${id} ${k} blocked cell`);
    }
    for (const t of dailySet(s.app).filter(t => t.city === id && t.kind !== 'interior')) assert.ok(findRoute(G, sp, [t.x, t.z], 'walk'), `${t.id} route`);
    for (const p of pools.interior) { const v = city.venueById[p.venueId]; assert.ok(v, p.venueId); const room = v.room || { w: 9, d: 9 }; assert.ok(Math.abs(p.rx) < room.w / 2 && Math.abs(p.rz) < room.d / 2); assert.ok(findRoute(G, sp, [v.x, v.z], 'walk'), `${p.venueId} door`); }
  }
});

test('first come first served: two players race, one wins, paid once, hidden for the other', async () => {
  const s = makeServer(); const t = cash(s).find(x => x.kind !== 'interior' && x.city === 'lagos-mainland');
  const a = mkUser(s), b = mkUser(s); goTo(s, a, t); goTo(s, b, t);
  const a0 = balanceOf(s.app.db, cashId(a)), b0 = balanceOf(s.app.db, cashId(b));
  const [ra, rb] = await Promise.all([claim(s, a, t), claim(s, b, t)]);
  const wins = [ra, rb].filter(r => r.status === 200); assert.equal(wins.length, 1); const lose = [ra, rb].find(r => r.status !== 200); assert.equal(lose.json.error, 'TAKEN');
  assert.equal(balanceOf(s.app.db, cashId(a)) + balanceOf(s.app.db, cashId(b)), a0 + b0 + t.worth);
  const winner = ra.status === 200 ? a : b; const again = await claim(s, winner, t); assert.equal(again.json.duplicate, true);
  assert.equal(balanceOf(s.app.db, cashId(a)) + balanceOf(s.app.db, cashId(b)), a0 + b0 + t.worth, 'no double pay');
  assert.equal(Number(s.app.db.prepare('SELECT COUNT(*) n FROM daily_treasure_claims WHERE treasure_id=?').get(t.id).n), 1);
  assert.throws(() => s.app.db.prepare("INSERT INTO daily_treasure_claims(treasure_id, day, user_id, kind, prize, amount, city_id, x, z, claimed_at) VALUES (?,?,?,?,?,?,?,?,?,?)").run(t.id, t.day, b, t.kind, 'cash', 1, t.city, 0, 0, 0), 'the DB itself refuses a second claim');
  const city = await ok(s, 'GET', '/api/city', { uid: b }); assert.ok(!city.treasures.some(x => x.id === t.id), 'gone from the map');
  const hb = await ok(s, 'POST', '/api/heartbeat', { uid: b, body: {} }); assert.ok(hb.tr.includes(t.id), 'heartbeat hides it');
  const ledger = s.app.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE reason='daily_treasure' AND ref=?").get(t.id); assert.equal(Number(ledger.n), 1);
  assert.equal(checkInvariants(s.app.db).ok, true);
});

test('range, guests, speed check, interiors need you inside', async () => {
  const s = makeServer(); const list = cash(s).filter(x => x.kind !== 'interior' && x.city === 'lagos-mainland');
  const u = mkUser(s); goTo(s, u, list[0]); at(s, u, list[0].x + 40, list[0].z);
  assert.equal((await call(s, 'POST', '/api/treasures/claim', { uid: u, body: { id: list[0].id } })).json.error, 'TOO_FAR');
  const g = mkUser(s, { guest: true }); goTo(s, g, list[0]); assert.equal((await claim(s, g, list[0])).json.error, 'GUEST');
  goTo(s, u, list[0]); assert.equal((await claim(s, u, list[0])).status, 200);
  const far = list.find(x => Math.hypot(x.x - list[0].x, x.z - list[0].z) > 200); at(s, u, far.x, far.z);
  assert.equal((await claim(s, u, far)).json.error, 'TOO_FAST'); s.app.clock.advance(60000); at(s, u, far.x, far.z); assert.equal((await claim(s, u, far)).status, 200);
  const it = cash(s).find(x => x.kind === 'interior' && x.city === 'lagos-mainland'); const v = s.app.cities[it.city].venueById[it.venueId];
  const w = mkUser(s, { ageMs: 10 * 60000 }); enterCity(s.app, w, it.city); at(s, w, v.x, v.z);
  assert.equal((await claim(s, w, it)).json.error, 'NOT_INSIDE');
  await ok(s, 'POST', '/api/venue/enter', { uid: w, body: { venueId: v.id } });
  const view = await ok(s, 'GET', `/api/venue?id=${v.id}`, { uid: w }); assert.ok(view.treasures.some(x => x.id === it.id && x.type === 'treasure'));
  const r = await ok(s, 'POST', '/api/treasures/claim', { uid: w, body: { id: it.id, venueId: v.id } }); assert.equal(r.amount, it.worth);
  assert.ok(!(await ok(s, 'GET', `/api/venue?id=${v.id}`, { uid: w })).treasures.some(x => x.id === it.id));
});

test('one free Cybertruck a day goes into the garage; a full garage is refused and the truck stays', async () => {
  const s = makeServer(); const car = dailySet(s.app).find(t => t.prize === 'car');
  const full = mkUser(s); for (let i = 0; i < s.app.balance.cars.garageSlots; i++) s.app.db.prepare('INSERT INTO player_cars(user_id,model,paid,bought_at,active) VALUES (?,?,?,?,?)').run(full, 'micra', 1, 0, 0);
  goTo(s, full, car); assert.equal((await claim(s, full, car)).json.error, 'GARAGE_FULL');
  const u = mkUser(s); goTo(s, u, car); const c0 = balanceOf(s.app.db, cashId(u)); const r = await ok(s, 'POST', '/api/treasures/claim', { uid: u, body: { id: car.id, pos: { x: car.x, z: car.z, ry: 0 } } });
  assert.equal(r.prize, 'car'); const row = s.app.db.prepare('SELECT * FROM player_cars WHERE id=?').get(r.carId); assert.equal(row.model, 'cyber'); assert.equal(Number(row.paid), 0); assert.equal(balanceOf(s.app.db, cashId(u)), c0);
  const v = mkUser(s); goTo(s, v, car); assert.equal((await claim(s, v, car)).json.error, 'TAKEN');
});

test('daily reset: yesterday\'s chests are gone, a fresh set appears; admin shows today', async () => {
  const s = makeServer(); const t = cash(s).find(x => x.kind !== 'interior' && x.city === 'lagos-mainland'); const u = mkUser(s); goTo(s, u, t);
  await ok(s, 'POST', '/api/treasures/claim', { uid: u, body: { id: t.id, pos: { x: t.x, z: t.z, ry: 0 } } });
  let ad = await ok(s, 'GET', '/api/admin/treasures/daily', { admin: true }); assert.equal(ad.summary.taken, 1); assert.equal(ad.summary.cashChests, 100); assert.ok(ad.rows.find(r => r.id === t.id).collector);
  const d0 = dayKey(s.app.clock.now()); s.app.clock.advance(DAY); assert.equal(dayKey(s.app.clock.now()), d0 + 1);
  assert.equal((await claim(s, u, t)).json.error, 'GONE');
  ad = await ok(s, 'GET', '/api/admin/treasures/daily', { admin: true }); assert.equal(ad.summary.taken, 0); assert.equal(ad.summary.remaining, 100);
  const city = await ok(s, 'GET', '/api/city', { uid: u }); assert.ok(city.treasures.some(x => x.daily && x.id.startsWith(`dt-${d0 + 1}-`)));
  assert.ok(city.treasures.some(x => x.id.startsWith('tr-')), 'the one-time ₦bn treasures still work');
});

test('per-player daily cap', () => {
  const s = makeServer(); s.app.balance.dailyTreasures = { ...dailyCfg(s.app), maxPerPlayerPerDay: 1, maxSpeedMps: 1e9 };
  const [a, b] = cash(s).filter(x => x.kind !== 'interior' && x.city === 'lagos-mainland'); const u = mkUser(s);
  goTo(s, u, a); claimDaily(s.app, u, a.id); at(s, u, b.x, b.z); assert.throws(() => claimDaily(s.app, u, b.id), /found 1 treasures/);
});
