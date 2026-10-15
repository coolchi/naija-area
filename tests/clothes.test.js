// Cloth market on the promenade, plus the male/female body stored on the player.
import test from 'node:test';
import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at } from './helpers.js';
import { balanceOf, cashId, checkInvariants } from '../server/core/ledger.js';

test('sign-up can pick female body', async () => {
  const s = makeServer();
  const auth = await import('../server/core/auth.js');
  const uid = await auth.signup(s.app, { username: 'signup_f1', password: 'secret-pass-1', age18: true, email: 'signup_f1@example.com', gender: 'female' }, 'ip');
  assert.equal((await ok(s, 'GET', '/api/me', { uid })).user.gender, 'female');
  assert.equal((await call(s, 'POST', '/api/auth/signup', { body: { username: 'signup_bad', password: 'secret-pass-1', age18: true, email: 'signup_bad@example.com', gender: 'other' } })).json.error, 'BAD_GENDER');
});

test('cloth market sells clothes and the body can be male or female', async () => {
  const s = makeServer();
  const v = s.app.all.venueById.venue_cloth;
  assert.ok(v && v.wearShop === 'clothes');
  assert.equal(v.name, 'Cloth Market');
  assert.ok(s.app.city.buildingById[v.buildingId]);
  const u = mkUser(s, { cash: 200000, ageMs: 600000 });
  at(s, u, v.x, v.z);
  await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
  await ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: v.id } });
  assert.equal((await ok(s, 'GET', '/api/me', { uid: u })).user.gender, 'male');
  assert.equal((await call(s, 'POST', '/api/avatar/gender', { uid: u, body: { gender: 'other' } })).json.error, 'BAD_GENDER');
  assert.equal((await ok(s, 'POST', '/api/avatar/gender', { uid: u, body: { gender: 'female' } })).gender, 'female');
  assert.equal((await ok(s, 'GET', '/api/me', { uid: u })).user.gender, 'female');
  const bought = await ok(s, 'POST', '/api/wearables/buy', { uid: u, body: { venueId: v.id, itemId: 'top_tee', idem: 'tee1' } });
  assert.equal(bought.worn.worn[0].id, 'top_tee');
  assert.equal((await call(s, 'POST', '/api/wearables/buy', { uid: u, body: { venueId: 'venue_jewelry', itemId: 'top_tee', idem: 'nope' } })).json.error, 'NO_ITEM');
  const other = mkUser(s, { cash: 1000, ageMs: 600000 });
  at(s, other, v.x + 1, v.z);
  await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
  const seen = (await ok(s, 'POST', '/api/heartbeat', { uid: other, body: {} })).players.find(p => p.id === u);
  assert.equal(seen.sx, 'f');
  assert.ok(seen.w.includes('top_tee'));
  assert.equal(checkInvariants(s.db).ok, true);
  assert.ok(balanceOf(s.db, cashId(u)) < 200000);
});
