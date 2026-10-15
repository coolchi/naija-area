import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call } from './helpers.js';
import { ensurePresence } from '../server/core/world.js';

function nearPair(s) {
  const a = mkUser(s), b = mkUser(s);
  const pa = ensurePresence(s.app, a), pb = ensurePresence(s.app, b);
  pa.x = 10; pa.z = 10; pa.mode = 'drive'; pb.x = 12; pb.z = 10; pb.mode = 'walk';
  s.app.db.prepare('INSERT INTO player_cars(user_id,model,paid,bought_at,active) VALUES (?,?,?,?,1)')
    .run(a, 'kekere', 900000, s.app.clock.now());
  return { a, b, pa, pb };
}

test('carpool: driver offers, passenger accepts, both linked and share radio station', async () => {
  const s = makeServer(); const { a, b, pa } = nearPair(s);
  pa.radioSt = 'eko';
  const offer = await ok(s, 'POST', '/api/carpool/offer', { uid: a, body: { targetId: b, pos: { x: 10, z: 10 } } });
  assert.ok(offer.expiresAt > s.app.clock.now());
  const acc = await ok(s, 'POST', '/api/carpool/respond', { uid: b, body: { accept: true, pos: { x: 12, z: 10 } } });
  assert.equal(acc.ride.role, 'passenger');
  assert.equal(acc.ride.driverId, a);
  assert.equal(acc.ride.radio, 'eko');
  const hb = await ok(s, 'POST', '/api/heartbeat', { uid: b, body: { city: s.app.city.id, trail: [], mode: 'walk' } });
  assert.equal(hb.carpool.role, 'passenger');
  assert.equal(hb.carpool.radio, 'eko');
});

test('carpool: leave clears the ride for both', async () => {
  const s = makeServer(); const { a, b } = nearPair(s);
  await ok(s, 'POST', '/api/carpool/offer', { uid: a, body: { targetId: b } });
  await ok(s, 'POST', '/api/carpool/respond', { uid: b, body: { accept: true } });
  await ok(s, 'POST', '/api/carpool/leave', { uid: b, body: {} });
  const hbA = await ok(s, 'POST', '/api/heartbeat', { uid: a, body: { city: s.app.city.id, trail: [], mode: 'drive', radio: 'highlife' } });
  assert.equal(hbA.carpool.role, null);
});

test('carpool: cannot pick up someone who is already driving', async () => {
  const s = makeServer(); const { a, b, pb } = nearPair(s);
  pb.mode = 'drive';
  const r = await call(s, 'POST', '/api/carpool/offer', { uid: a, body: { targetId: b } });
  assert.equal(r.status, 409);
});
