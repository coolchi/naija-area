// Police patrol missions: duty desk, shared suspects, arrests/takedowns, ₦1M per completed mission, cooldowns, combat.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, ok, call, mkUser } from './helpers.js';
import { cashId, balanceOf } from '../server/core/ledger.js';
import * as patrol from '../server/core/patrol.js';
import { ensurePresence, teleport } from '../server/core/world.js';
import { healthOf } from '../server/core/crash.js';

const station = (s) => s.app.city.venues.find(v => v.id === 'venue_police');
function setup(s, n = 1) {
  s.app.rng = () => 0.99; // no armed suspects unless a test adds one
  const st = station(s); const ids = [];
  for (let i = 0; i < n; i++) { const uid = mkUser(s); teleport(s.app, uid, st.x, st.z); ensurePresence(s.app, uid).venue = st.id; ids.push(uid); }
  return { st, ids };
}
/** a still suspect at (x,z) on a real road; returns its id */
function plant(s, { x, z, armed = 0, hp } = {}) {
  const r = s.app.city.roads.find(rr => rr.x1 === rr.x2 && Math.abs(rr.x1 - x) < 1 && z >= Math.min(rr.z1, rr.z2) && z <= Math.max(rr.z1, rr.z2));
  assert.ok(r, 'a north-south road through the point');
  const s0 = Math.abs(z - r.z1); const now = s.app.clock.now();
  s.db.prepare('INSERT INTO police_suspects(city_id, kind, road_id, s0, speed, hp, armed, spawned_at, expires_at) VALUES (?,?,?,?,?,?,?,?,?)')
    .run(s.app.defaultCityId || 'lagos-mainland', 'shop_robbery', r.id, s0, 0, hp ?? patrol.cfg(s.app).hitsToDown, armed, now, now + 3600000);
  return Number(s.db.prepare('SELECT MAX(id) m FROM police_suspects').get().m); // lastInsertRowid is 0 on the Postgres adapter
}
const start = (s, uid) => ok(s, 'POST', '/api/patrol/start', { uid, body: { venueId: 'venue_police' } });
const cityOf = (s, uid) => ensurePresence(s.app, uid).city;

test('patrol starts only at the police station and issues the duty Charger', async () => {
  const s = makeServer(); const { ids: [a] } = setup(s);
  teleport(s.app, a, -200, -300); ensurePresence(s.app, a).venue = null;
  const far = await call(s, 'POST', '/api/patrol/start', { uid: a, body: {} }); assert.equal(far.json.error, 'NOT_AT_STATION');
  const st = station(s); teleport(s.app, a, st.x, st.z);
  const r = await start(s, a); assert.ok(r.ok); assert.equal(r.user.car.body, 'police'); assert.equal(r.user.car.duty, true);
  assert.equal(r.patrol.active.needed, 3); assert.ok(r.patrol.suspects.length >= 1);
  assert.equal(s.db.prepare('SELECT COUNT(*) n FROM player_cars WHERE user_id=?').get(a).n, 0, 'duty car is not owned');
  await ok(s, 'POST', '/api/patrol/abandon', { uid: a });
  const me = await ok(s, 'GET', '/api/me', { uid: a }); assert.notEqual((me.user || me).car?.body, 'police', 'duty car removed');
});

test('arrest needs range; pays exactly ₦1,000,000 once after 3 arrests', async () => {
  const s = makeServer(); const { ids: [a] } = setup(s); await start(s, a);
  const before = balanceOf(s.app.db, cashId(a));
  const t = [plant(s, { x: 0, z: 100 }), plant(s, { x: 0, z: 60 }), plant(s, { x: 0, z: 20 })];
  teleport(s.app, a, 0, 140); const far = await call(s, 'POST', '/api/patrol/arrest', { uid: a, body: { suspectId: t[0] } }); assert.equal(far.json.error, 'TOO_FAR');
  let last;
  for (const [i, z] of [[0, 100], [1, 60], [2, 20]]) { teleport(s.app, a, 0, z + 3); last = await ok(s, 'POST', '/api/patrol/arrest', { uid: a, body: { suspectId: t[i] } }); }
  assert.equal(last.done, true); assert.equal(last.paid, 1_000_000);
  assert.equal(balanceOf(s.app.db, cashId(a)) - before, 1_000_000);
  const again = await call(s, 'POST', '/api/patrol/arrest', { uid: a, body: { suspectId: t[2] } }); assert.notEqual(again.status, 200);
  assert.equal(balanceOf(s.app.db, cashId(a)) - before, 1_000_000, 'paid once');
});

test('shared suspect: two officers arrest at once, exactly one gets credit', async () => {
  const s = makeServer(); const { ids: [a, b] } = setup(s, 2); await start(s, a); await start(s, b);
  const t = plant(s, { x: 0, z: 100 }); teleport(s.app, a, 0, 102); teleport(s.app, b, 0, 98);
  const [ra, rb] = await Promise.all([call(s, 'POST', '/api/patrol/arrest', { uid: a, body: { suspectId: t } }), call(s, 'POST', '/api/patrol/arrest', { uid: b, body: { suspectId: t } })]);
  const wins = [ra, rb].filter(r => r.status === 200); const loss = [ra, rb].find(r => r.status !== 200);
  assert.equal(wins.length, 1); assert.equal(loss.json.error, 'ALREADY_CAUGHT'); assert.match(loss.json.message || loss.json.text || JSON.stringify(loss.json), /already caught by @/);
  const arrests = s.db.prepare("SELECT SUM(arrests) n FROM police_patrols").get().n; assert.equal(Number(arrests), 1);
  const v = await ok(s, 'GET', '/api/patrol', { uid: wins === ra ? b : a }); assert.ok(!v.suspects.some(x => x.id === t), 'removed for everyone');
});

test('exactly 4 police-gun hits down a suspect; first to land the final hit gets credit', async () => {
  const s = makeServer(); const { ids: [a, b] } = setup(s, 2); await start(s, a); await start(s, b);
  const t = plant(s, { x: 0, z: 100 }); teleport(s.app, a, 0, 120); teleport(s.app, b, 0, 80);
  const shot = (uid) => { s.app.clock.advance(700); return call(s, 'POST', '/api/patrol/shoot', { uid, body: { suspectId: t } }); };
  let r = await shot(a); assert.equal(r.json.hitsLeft, 3); r = await shot(b); assert.equal(r.json.hitsLeft, 2); r = await shot(a); assert.equal(r.json.hitsLeft, 1);
  r = await shot(b); assert.equal(r.status, 200); assert.equal(r.json.how, 'takedown'); assert.equal(r.json.hitsLeft, 0);
  assert.equal(s.db.prepare('SELECT caught_by FROM police_suspects WHERE id=?').get(t).caught_by, b);
  const late = await shot(a); assert.equal(late.json.error, 'ALREADY_CAUGHT');
});

test('fire-rate cap and gun range are checked by the server', async () => {
  const s = makeServer(); const { ids: [a] } = setup(s); await start(s, a);
  const t = plant(s, { x: 0, z: 100 }); teleport(s.app, a, 0, 120);
  s.app.clock.advance(700); await ok(s, 'POST', '/api/patrol/shoot', { uid: a, body: { suspectId: t } });
  const fast = await call(s, 'POST', '/api/patrol/shoot', { uid: a, body: { suspectId: t } }); assert.equal(fast.json.error, 'FIRE_RATE');
  teleport(s.app, a, 0, 100 + patrol.cfg(s.app).gunRange + 20); s.app.clock.advance(700);
  const miss = await ok(s, 'POST', '/api/patrol/shoot', { uid: a, body: { suspectId: t } }); assert.equal(miss.hit, false);
});

test('police gun does 3x a suspect gun; armed suspect fire hurts the player', async () => {
  const s = makeServer(); const C = patrol.cfg(s.app); assert.equal(C.policeGunDamage, 3 * C.suspectGunDamage); assert.equal(C.hitsToDown, 4);
  const { ids: [a] } = setup(s); s.app.balance.patrol = { ...C, suspectAccuracy: 1, suspectAccuracyCap: 1 }; await start(s, a);
  plant(s, { x: 0, z: 100, armed: 1 }); teleport(s.app, a, 0, 105);
  const h0 = healthOf(s.app, a).health; s.app.clock.advance(C.suspectFireIntervalMs * 2 + 10);
  await ok(s, 'GET', '/api/patrol', { uid: a });
  const h1 = healthOf(s.app, a).health; assert.ok(h0 - h1 >= 2 * C.suspectGunDamage - 1, `took fire ${h0}->${h1}`);
});

test('downed by suspect fire: mission fails, no pay', async () => {
  const s = makeServer(); const C = patrol.cfg(s.app); const { ids: [a] } = setup(s);
  s.app.balance.patrol = { ...C, suspectAccuracy: 1, suspectAccuracyCap: 1 }; await start(s, a); const before = balanceOf(s.app.db, cashId(a));
  plant(s, { x: 0, z: 100, armed: 1 }); teleport(s.app, a, 0, 105);
  s.app.clock.advance(C.suspectFireIntervalMs * 15);
  const v = await ok(s, 'GET', '/api/patrol', { uid: a }); assert.equal(v.active, null);
  assert.equal(s.db.prepare('SELECT status FROM police_patrols WHERE user_id=?').get(a).status, 'downed');
  assert.equal(healthOf(s.app, a).health < 1, true); assert.equal(balanceOf(s.app.db, cashId(a)), before);
});

test('timeout and abandon pay nothing; cooldown and daily limit apply', async () => {
  const s = makeServer(); const C = patrol.cfg(s.app); const { st, ids: [a] } = setup(s); const before = balanceOf(s.app.db, cashId(a));
  await start(s, a); s.app.clock.advance(C.timeLimitMs + 1000);
  let v = await ok(s, 'GET', '/api/patrol', { uid: a }); assert.equal(v.active, null);
  assert.equal(s.db.prepare('SELECT status FROM police_patrols WHERE user_id=?').get(a).status, 'timeout');
  teleport(s.app, a, st.x, st.z);
  const cd = await call(s, 'POST', '/api/patrol/start', { uid: a, body: {} }); assert.equal(cd.json.error, 'PATROL_COOLDOWN');
  s.app.clock.advance(C.cooldownMs + 1000); await start(s, a); await ok(s, 'POST', '/api/patrol/abandon', { uid: a });
  assert.equal(balanceOf(s.app.db, cashId(a)), before, 'no pay for timeout/abandon');
  // daily limit: pretend 3 were done today
  const day = s.db.prepare('SELECT day FROM police_patrols WHERE user_id=? ORDER BY id DESC LIMIT 1').get(a).day;
  for (let i = 0; i < C.maxPerDay; i++) s.db.prepare("INSERT INTO police_patrols(user_id, city_id, station_id, status, started_at, expires_at, ended_at, needed, day) VALUES (?,?,?,?,?,?,?,?,?)").run(a, cityOf(s, a), 'venue_police', 'done', 0, 0, 0, 3, day);
  s.app.clock.advance(C.cooldownMs + 1000); teleport(s.app, a, st.x, st.z);
  const lim = await call(s, 'POST', '/api/patrol/start', { uid: a, body: {} });
  if (s.db.prepare('SELECT day FROM police_patrols WHERE user_id=? ORDER BY id DESC LIMIT 1').get(a).day === day) assert.equal(lim.json.error, 'PATROL_LIMIT');
});

test('guests cannot patrol; restricted accounts arrest only and never see armed suspects', async () => {
  const s = makeServer(); const st = station(s); s.app.rng = () => 0.99;
  const g = mkUser(s, { guest: true }); teleport(s.app, g, st.x, st.z);
  const rg = await call(s, 'POST', '/api/patrol/start', { uid: g, body: {} }); assert.equal(rg.json.error, 'GUEST');
  const { ids: [a] } = setup(s); const orig = patrol.gunsAllowed;
  // mark restricted through the guardian age result
  const gd = await import('../server/core/guardian.js'); const eff = gd.effective(s.app, a); eff.restricted = true;
  assert.equal(patrol.gunsAllowed(s.app, a), false);
  const r = await start(s, a); assert.equal(r.patrol.active.ammo, 0); assert.equal(r.patrol.guns, false);
  const armed = plant(s, { x: 0, z: 100, armed: 1 }); teleport(s.app, a, 0, 101);
  const v = await ok(s, 'GET', '/api/patrol', { uid: a }); assert.ok(!v.suspects.some(x => x.id === armed));
  const sh = await call(s, 'POST', '/api/patrol/shoot', { uid: a, body: { suspectId: armed } }); assert.equal(sh.json.error, 'GUNS_RESTRICTED');
  const ar = await call(s, 'POST', '/api/patrol/arrest', { uid: a, body: { suspectId: armed } }); assert.equal(ar.json.error, 'NO_SUSPECT');
  const h0 = healthOf(s.app, a).health; s.app.clock.advance(9000); await ok(s, "GET", "/api/patrol", { uid: a }); assert.ok(healthOf(s.app, a).health >= h0, 'no shooting back');
  void orig;
});
