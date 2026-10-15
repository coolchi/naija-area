import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, HOUR } from './helpers.js';
import { checkInvariants } from '../server/core/ledger.js';
import { refreshNeeds } from '../server/core/economy.js';
import { nearestFood, isFainted, sipAtFood } from '../server/core/faint.js';

const uname = (s, id) => s.app.db.prepare('SELECT username FROM users WHERE id=?').get(id).username;

test('hunger faint: empty food marks fainted; cab rescue to nearest canteen; sip + buy clears faint', async () => {
  const s = makeServer(); const u = mkUser(s); at(s, u, 0, 0);
  s.app.db.prepare('UPDATE player_state SET hunger=2, energy=40, needs_at=? WHERE user_id=?').run(s.app.clock.now(), u);
  s.app.clock.advance(10 * 60000); // decay past faintAt
  const st = refreshNeeds(s.app, u);
  assert.ok(st.hunger <= (s.app.balance.needs.faintAt ?? 1));
  assert.equal(st.fainted, 1);
  assert.equal(isFainted(s.app, u), true);
  const food = nearestFood(s.app, u);
  assert.ok(food, 'district has a food place');
  assert.match(food.name, /canteen|mama|mart|suya|market|restaurant|buka/i);

  const cab = await ok(s, 'POST', '/api/needs/rescue/cab', { uid: u, body: {} });
  assert.equal(cab.ok, true); assert.ok(cab.ride); assert.equal(cab.food.placeId, food.placeId);

  // skip wait: force ride arrived
  const ride = s.app.world.rides.get(u); ride.arriveAt = s.app.clock.now() - 1; ride.state = 'arrived';
  const start = await ok(s, 'POST', '/api/ride/start', { uid: u, body: { pos: { x: ride.from.x, z: ride.from.z }, idem: 'faint-ride-1' } });
  assert.equal(start.faintRescue, true);

  const sip = await ok(s, 'POST', '/api/needs/sip', { uid: u, body: {} });
  assert.equal(sip.sipped, true); assert.ok(sip.hunger >= (s.app.balance.needs.sipHunger ?? 15));
  assert.equal((await ok(s, 'GET', '/api/me', { uid: u })).user.fainted, false);

  // buy a proper meal at the canteen/shop — hunger + energy (strength) come back
  at(s, u, food.x, food.z);
  const shopId = food.shopId; const shop = s.app.city.shopById[shopId] || s.app.all?.shopById?.[shopId] || s.app.cities[s.app.defaultCityId].shopById[shopId];
  const item = (shop?.items || []).find((i) => (i.hunger || 0) >= 20) || shop?.items?.[0];
  if (item) {
    const beforeE = (await ok(s, 'GET', '/api/me', { uid: u })).user.energy;
    const buy = await ok(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId, itemId: item.id, qty: 1, channel: 'local', idem: 'faint-meal', pos: { x: food.x, z: food.z } } });
    assert.ok(buy.hunger > sip.hunger);
    assert.ok(buy.energy >= beforeE);
    assert.equal(buy.fainted, false);
  }
  assert.equal(checkInvariants(s.db).ok, true);
});

test('hunger faint: friend can accept and send a cab', async () => {
  const s = makeServer(); const a = mkUser(s), b = mkUser(s); at(s, a, 10, 10); at(s, b, 12, 10);
  await ok(s, 'POST', '/api/phone/friends/request', { uid: a, body: { username: uname(s, b) } });
  const id = (await ok(s, 'GET', '/api/phone/friends', { uid: b })).incoming[0].id;
  await ok(s, 'POST', '/api/phone/friends/respond', { uid: b, body: { id, accept: true } });
  s.app.db.prepare('UPDATE player_state SET hunger=0, fainted=1, needs_at=? WHERE user_id=?').run(s.app.clock.now(), a);
  const ask = await ok(s, 'POST', '/api/needs/rescue/friend', { uid: a, body: { username: uname(s, b) } });
  assert.equal(ask.ok, true);
  const rescueId = [...s.app.world.foodRescues.keys()][0];
  const acc = await ok(s, 'POST', '/api/needs/rescue/accept', { uid: b, body: { id: rescueId } });
  assert.equal(acc.ok, true); assert.ok(acc.ride || acc.food);
  void HOUR; void sipAtFood; void call;
});
