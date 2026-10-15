import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at } from './helpers.js';
import { ensurePresence } from '../server/core/world.js';
import { applyBodyDamage, repairFeeOf, MEKO_VENUE, MEKO_LOT } from '../server/core/meko.js';
import { balanceOf, cashId, checkInvariants } from '../server/core/ledger.js';

const buy = async (s, u, model = 'kekere') => {
  const v = s.app.city.venues.find((x) => x.id === 'venue_motors');
  at(s, u, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
  await ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: 'venue_motors' } });
  await ok(s, 'POST', '/api/garage/buy', { uid: u, body: { model } });
  await ok(s, 'POST', '/api/venue/leave', { uid: u, body: {} });
};

test('Motoka Meko building, venue and drive-in garage exist on Lagos Mainland', () => {
  const s = makeServer();
  assert.ok(s.app.city.buildings.find((b) => b.id === 'b_meko' && b.tag === 'motoka-meko'));
  const v = s.app.city.venues.find((x) => x.id === MEKO_VENUE);
  assert.equal(v.name, 'Motoka Meko');
  assert.ok(s.app.city.carParks.find((l) => l.id === MEKO_LOT && l.kind === 'service'));
  assert.ok(s.app.city.placeById[MEKO_VENUE]);
});

test('collide damage builds smoke then wrecks; wrecked car cannot drive', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 5000000 }); await buy(s, u);
  const p = ensurePresence(s.app, u); p.mode = 'drive'; p.x = 0; p.z = 0;
  s.app.db.prepare('UPDATE player_state SET mode=? WHERE user_id=?').run('drive', u);
  const C = s.app.balance.crash; C.collide.minImpact = 1; C.smokeAt = 20; C.wreckAt = 40;
  let smoke = false, wrecked = false;
  for (let i = 0; i < 20 && !wrecked; i++) {
    s.app.clock.advance(500);
    const r = await ok(s, 'POST', '/api/crash/collide', { uid: u, body: { impact: 20, pos: { x: 0, z: 0 } } });
    if (r.smoke) smoke = true; if (r.wrecked) wrecked = true;
  }
  assert.ok(smoke, 'should smoke before wreck');
  assert.ok(wrecked, 'should wreck after enough hits');
  const car = s.app.db.prepare('SELECT * FROM player_cars WHERE user_id=? AND active=1').get(u);
  assert.equal(car.wrecked, 1);
  await ok(s, 'POST', '/api/heartbeat', { uid: u, body: { city: s.app.city.id, trail: [], mode: 'drive' } });
  const st = s.app.db.prepare('SELECT mode FROM player_state WHERE user_id=?').get(u);
  assert.equal(ensurePresence(s.app, u).mode, 'walk');
  void st;
});

test('supercars take less collide damage; repair is 10% of paid × damage/100', async () => {
  const s = makeServer(); s.app.balance.cars.garageSlots = 10;
  const u = mkUser(s, { cash: 500000000000 }); await buy(s, u, 'mclaren');
  const car = s.app.db.prepare('SELECT * FROM player_cars WHERE user_id=? AND active=1').get(u);
  const p = ensurePresence(s.app, u); p.mode = 'drive';
  const before = car.damage || 0;
  applyBodyDamage(s.app, u, car, 20, 0, 0, 0);
  const after = s.app.db.prepare('SELECT damage FROM player_cars WHERE id=?').get(car.id).damage;
  assert.ok(after - before < 20, 'supercar absorbs more hits');
  assert.ok(after - before >= 8, 'still takes some damage');
  const fee = repairFeeOf(s.app, { ...car, damage: 100 });
  assert.equal(fee, Math.round(car.paid * 0.1));
});

test('tow moves wrecked car to Motoka Meko; garage repair clears wreck', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 5000000 }); await buy(s, u);
  const car = s.app.db.prepare('SELECT * FROM player_cars WHERE user_id=? AND active=1').get(u);
  at(s, u, 10, 10);
  const p = ensurePresence(s.app, u); p.mode = 'walk';
  s.app.db.prepare('UPDATE player_cars SET damage=100, wrecked=1, wreck_x=?, wreck_z=?, wreck_ry=0 WHERE id=?').run(p.x, p.z, car.id);
  s.app.db.prepare('UPDATE player_state SET mode=? WHERE user_id=?').run('walk', u);
  const q = await ok(s, 'GET', '/api/tow/quote', { uid: u });
  assert.ok(q.fare > 0);
  const req = await ok(s, 'POST', '/api/tow/request', { uid: u, body: { pos: { x: p.x, z: p.z } } });
  assert.equal(req.tow.state, 'arriving');
  s.app.clock.advance(s.app.balance.crash.tow.etaMs + s.app.balance.crash.tow.tripMs + 100);
  await ok(s, 'GET', '/api/tow', { uid: u }); // refresh finish
  const lot = s.app.city.carParks.find((l) => l.id === MEKO_LOT);
  const me = ensurePresence(s.app, u);
  assert.ok(Math.hypot(me.x - lot.x, me.z - lot.z) < 5, 'player dropped at Motoka Meko garage');
  me.mode = 'drive'; me.x = lot.x; me.z = lot.z;
  s.app.db.prepare('UPDATE player_state SET mode=?,x=?,z=? WHERE user_id=?').run('drive', lot.x, lot.z, u);
  const cash0 = balanceOf(s.db, cashId(u));
  const fix = await ok(s, 'POST', '/api/mechanic/repair', { uid: u, body: { idemKey: 'fix1' } });
  assert.equal(fix.carHealth, 100);
  assert.ok(balanceOf(s.db, cashId(u)) < cash0);
  const done = s.app.db.prepare('SELECT damage,wrecked FROM player_cars WHERE id=?').get(car.id);
  assert.equal(done.damage, 0); assert.equal(done.wrecked, 0);
  assert.equal(checkInvariants(s.db).ok, true);
});

test('cannot tow a healthy car', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 5000000 }); await buy(s, u);
  const r = await call(s, 'POST', '/api/tow/request', { uid: u, body: {} });
  assert.equal(r.status, 409);
});
