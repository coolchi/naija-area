import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import { setStrength } from '../server/core/gym.js';

const enter = async (s, u, id) => {
  const v = s.app.city.venues.find(x => x.id === id); at(s, u, v.x, v.z);
  await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
  return ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: id } });
};

test('gym: training raises strength, costs energy/fee, has cooldown; cinema/church/mosque are enterable', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 50000 });
  assert.ok(s.app.city.venues.find(v => v.id === 'venue_gym'));
  const me0 = (await ok(s, 'GET', '/api/me', { uid: u })).user; assert.ok(me0.strength.strength >= 10);
  const view = await enter(s, u, 'venue_gym'); assert.equal(view.kind, 'gym'); assert.ok(view.stations.some(st => st.type === 'bench'));
  const r = await ok(s, 'POST', '/api/venue/act', { uid: u, body: { venueId: 'venue_gym', stationId: 'bench', idem: 'g1' } });
  assert.ok(r.strength > me0.strength.strength); assert.ok(r.charged > 0);
  assert.equal((await call(s, 'POST', '/api/venue/act', { uid: u, body: { venueId: 'venue_gym', stationId: 'bench', idem: 'g2' } })).json.error, 'COOLDOWN');
  for (const id of ['venue_cinema', 'venue_church', 'venue_mosque']) {
    const v = await enter(s, u, id); assert.ok(v.inside >= 1); assert.ok(Array.isArray(v.people) && v.people.length >= 1);
  }
});

test('fight: stronger fighter wins ~1% of worth from cash; each punch costs 1% health; same venue required', async () => {
  const s = makeServer();
  const a = mkUser(s, { cash: 100000 }); const b = mkUser(s, { cash: 200000 });
  setStrength(s.app, a, 40); setStrength(s.app, b, 10);
  assert.equal((await call(s, 'POST', '/api/fight/punch', { uid: a, body: { username: s.db.prepare('SELECT username FROM users WHERE id=?').get(b).username } })).json.error, 'NOT_HERE');
  await enter(s, a, 'venue_gym'); await enter(s, b, 'venue_gym');
  const bName = s.db.prepare('SELECT username FROM users WHERE id=?').get(b).username;
  const h0 = (await ok(s, 'GET', '/api/me', { uid: b })).user.health.health;
  const cashA0 = balanceOf(s.db, cashId(a)); const cashB0 = balanceOf(s.db, cashId(b));
  const r = await ok(s, 'POST', '/api/fight/punch', { uid: a, body: { username: bName, idem: 'f1' } });
  assert.equal(r.won, true); assert.equal(r.damage, 1); assert.ok(r.purse > 0);
  assert.equal(balanceOf(s.db, cashId(a)), cashA0 + r.purse); assert.equal(balanceOf(s.db, cashId(b)), cashB0 - r.purse);
  const h1 = (await ok(s, 'GET', '/api/me', { uid: b })).user.health.health; assert.ok(h1 < h0);
  assert.equal((await call(s, 'POST', '/api/fight/punch', { uid: a, body: { username: bName, idem: 'f2' } })).json.error, 'COOLDOWN');
  // weaker cannot take the purse
  s.app.clock.advance(20 * 1000);
  setStrength(s.app, a, 5); setStrength(s.app, b, 50);
  const aName = s.db.prepare('SELECT username FROM users WHERE id=?').get(a).username;
  const lose = await ok(s, 'POST', '/api/fight/punch', { uid: b, body: { username: aName, idem: 'f3' } });
  // b is stronger so b wins when b punches a
  assert.equal(lose.won, true);
  assert.equal(checkInvariants(s.db).ok, true);
});

test('venue presence lists friends first and fills with people up to about 10', async () => {
  const s = makeServer(); const owner = mkUser(s); const friend = mkUser(s); const stranger = mkUser(s);
  const fName = s.db.prepare('SELECT username FROM users WHERE id=?').get(friend).username;
  await ok(s, 'POST', '/api/phone/friends/request', { uid: owner, body: { username: fName } });
  const id = (await ok(s, 'GET', '/api/phone/friends', { uid: friend })).incoming[0].id;
  await ok(s, 'POST', '/api/phone/friends/respond', { uid: friend, body: { id, accept: true } });
  await enter(s, owner, 'venue_gym'); await enter(s, friend, 'venue_gym'); await enter(s, stranger, 'venue_gym');
  const v = await ok(s, 'GET', `/api/venue?id=venue_gym`, { uid: owner });
  assert.ok(v.friendsHere.includes(fName)); assert.ok(v.people.length >= 3); assert.ok(v.people.length <= 10);
  assert.equal(v.inside, 3);
});
