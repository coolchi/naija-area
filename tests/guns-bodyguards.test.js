// Gun shop + bodyguard hire (15 Oct 2026): buy/keep guns, equip one, hire week/year protection, fight effects.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import { GUNS, gunById } from '../server/config/guns.js';
import { BODYGUARD } from '../server/config/bodyguards.js';
import { gameDaysMs } from '../server/core/bodyguards.js';

const V = 'venue_armoury';
const hb = (s, u) => ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
async function inShop(s, cash = 3_000_000_000) {
  const u = mkUser(s, { cash, ageMs: 10 * 60000 });
  const v = s.app.all.venueById[V]; assert.ok(v, 'armoury venue exists');
  at(s, u, v.x, v.z); await hb(s, u); await ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: V } });
  return u;
}

test('Iron Gate Armoury is a real venue with gun + bodyguard stations', () => {
  const s = makeServer(); const v = s.app.all.venueById[V];
  assert.ok(v); assert.equal(v.gunShop, true); assert.equal(v.bodyguardDesk, true);
  assert.ok(v.stations.some(st => st.type === 'gun')); assert.ok(v.stations.some(st => st.type === 'bodyguard'));
  assert.ok(s.app.city.buildingById[v.buildingId]); assert.ok(v.room?.detailV2);
});

test('gun catalogue spans 100M to 2B and every id is unique', () => {
  assert.ok(GUNS.length >= 4);
  assert.equal(Math.min(...GUNS.map(g => g.price)), 100_000_000);
  assert.equal(Math.max(...GUNS.map(g => g.price)), 2_000_000_000);
  assert.equal(new Set(GUNS.map(g => g.id)).size, GUNS.length);
  for (let i = 1; i < GUNS.length; i++) {
    assert.ok(GUNS[i].price >= GUNS[i - 1].price);
    assert.ok(GUNS[i].strength >= GUNS[i - 1].strength);
  }
});

test('buying a gun: ledger, keep forever, carry it, no double buy', async () => {
  const s = makeServer(); const u = await inShop(s); const g = gunById.pistol_street;
  const before = balanceOf(s.db, cashId(u));
  const r = await ok(s, 'POST', '/api/guns/buy', { uid: u, body: { venueId: V, itemId: g.id, idem: 'g1' } });
  assert.equal(r.charged, g.price); assert.equal(balanceOf(s.db, cashId(u)), before - g.price);
  assert.equal(r.guns.equipped.id, g.id);
  const dup = await call(s, 'POST', '/api/guns/buy', { uid: u, body: { venueId: V, itemId: g.id, idem: 'g1' } });
  assert.equal(dup.json.error, 'ALREADY_OWNED');
  assert.equal(checkInvariants(s.db).ok, true);
  const me = (await ok(s, 'GET', '/api/me', { uid: u })).user;
  assert.equal(me.guns.equipped.id, g.id); assert.equal(me.guns.ownedCount, 1);
});

test('equip / unequip; insufficient funds refused', async () => {
  const s = makeServer(); const u = await inShop(s);
  await ok(s, 'POST', '/api/guns/buy', { uid: u, body: { venueId: V, itemId: 'pistol_street', idem: 'a' } });
  await ok(s, 'POST', '/api/guns/buy', { uid: u, body: { venueId: V, itemId: 'pistol_chrome', idem: 'b' } });
  let mine = await ok(s, 'GET', '/api/guns/mine', { uid: u });
  assert.equal(mine.equipped.id, 'pistol_chrome');
  await ok(s, 'POST', '/api/guns/equip', { uid: u, body: { itemId: 'pistol_street' } });
  mine = await ok(s, 'GET', '/api/guns/mine', { uid: u }); assert.equal(mine.equipped.id, 'pistol_street');
  await ok(s, 'POST', '/api/guns/unequip', { uid: u, body: {} });
  mine = await ok(s, 'GET', '/api/guns/mine', { uid: u }); assert.equal(mine.equipped, null); assert.equal(mine.ownedCount, 2);
  const poor = await inShop(s, 1000);
  assert.equal((await call(s, 'POST', '/api/guns/buy', { uid: poor, body: { venueId: V, itemId: 'pistol_street', idem: 'x' } })).status, 402);
});

test('bodyguard HD day and year hire, extend, expire', async () => {
  const s = makeServer(); const u = await inShop(s, 12_000_000_000);
  const before = balanceOf(s.db, cashId(u));
  const r = await ok(s, 'POST', '/api/bodyguard/hire', { uid: u, body: { venueId: V, plan: 'day', idem: 'd1' } });
  assert.equal(r.charged, BODYGUARD.dayFee);
  assert.equal(balanceOf(s.db, cashId(u)), before - BODYGUARD.dayFee);
  assert.ok(r.bodyguard.active); assert.equal(r.bodyguard.guard.plan, 'day');
  assert.equal(r.bodyguard.body, 'hd'); assert.equal(r.bodyguard.guard.body, 'hd');
  assert.equal(r.bodyguard.guard.withCar, false);
  const ext = await ok(s, 'POST', '/api/bodyguard/hire', { uid: u, body: { venueId: V, plan: 'year', idem: 'y1' } });
  assert.equal(ext.charged, BODYGUARD.yearFee); assert.equal(ext.bodyguard.guard.plan, 'year');
  s.app.clock.advance(gameDaysMs(s.app, BODYGUARD.yearDays + BODYGUARD.dayDays + 1));
  const me = (await ok(s, 'GET', '/api/me', { uid: u })).user;
  assert.equal(me.bodyguard.active, false);
  assert.equal(checkInvariants(s.db).ok, true);
});

test('bodyguard HD hire with Black G-Wagon add-on (+10M once)', async () => {
  const s = makeServer(); const u = await inShop(s, 12_000_000_000);
  const before = balanceOf(s.db, cashId(u));
  const r = await ok(s, 'POST', '/api/bodyguard/hire', { uid: u, body: { venueId: V, plan: 'day', withCar: true, idem: 'car1' } });
  assert.equal(r.charged, BODYGUARD.dayFee + BODYGUARD.carFee);
  assert.equal(balanceOf(s.db, cashId(u)), before - BODYGUARD.dayFee - BODYGUARD.carFee);
  assert.equal(r.bodyguard.guard.withCar, true);
  assert.equal(r.bodyguard.guard.car.body, 'gwagon');
  assert.equal(r.bodyguard.guard.car.color, BODYGUARD.carColor);
  // Extend keeps the car; do not charge the add-on again.
  const ext = await ok(s, 'POST', '/api/bodyguard/hire', { uid: u, body: { venueId: V, plan: 'day', withCar: true, idem: 'car2' } });
  assert.equal(ext.charged, BODYGUARD.dayFee);
  assert.equal(ext.bodyguard.guard.withCar, true);
  assert.equal(checkInvariants(s.db).ok, true);
});

test('fight: gun boosts strength; bodyguard cuts damage and blocks purse', async () => {
  const s = makeServer();
  const a = await inShop(s, 3_000_000_000);
  const b = mkUser(s, { cash: 200_000_000, ageMs: 600000 });
  const v = s.app.all.venueById[V]; at(s, b, v.x + 1, v.z); await hb(s, b);
  await ok(s, 'POST', '/api/venue/enter', { uid: b, body: { venueId: V } });
  s.app.db.prepare('UPDATE player_state SET strength=? WHERE user_id=?').run(10, a);
  s.app.db.prepare('UPDATE player_state SET strength=? WHERE user_id=?').run(10, b);
  await ok(s, 'POST', '/api/guns/buy', { uid: a, body: { venueId: V, itemId: 'rifle_tactical', idem: 'rf' } });
  await ok(s, 'POST', '/api/bodyguard/hire', { uid: b, body: { venueId: V, plan: 'day', idem: 'bg' } });
  const cashB0 = balanceOf(s.db, cashId(b));
  const r = await ok(s, 'POST', '/api/fight/punch', { uid: a, body: { username: s.db.prepare('SELECT username FROM users WHERE id=?').get(b).username, idem: 'f1' } });
  assert.ok(r.gun); assert.ok(r.you.strength > 10);
  assert.ok(r.targetGuard); assert.equal(r.purse, 0); assert.ok(r.purseBlocked);
  assert.equal(balanceOf(s.db, cashId(b)), cashB0);
  assert.ok(r.damage < Math.round(s.app.balance.crash.maxHealth * s.app.balance.fight.punchHealthPct * gunById.rifle_tactical.damageMult));
});
