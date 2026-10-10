// The sign-up "city" is the city the player wants to START playing from (Sherif, 10 Oct 2026): it decides the spawn point; closed cities fall back to Lagos; city of interest stays separate.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, ok, call } from './helpers.js';
import * as auth from '../server/core/auth.js';
import { START_CLOSED, WISHLIST_CITIES } from '../server/config/signup.js';
import { startOptions, stats } from '../server/core/signup.js';

const reg = async (s, name) => auth.signup(s.app, { username: name, password: 'secret-pass-1', age18: true }, 'ip');
const save = (s, u, body) => ok(s, 'POST', '/api/signup/profile', { uid: u, body: { interests: ['music'], ...body } });
const state = (s, u) => s.app.db.prepare('SELECT city_id, x, z FROM player_state WHERE user_id=?').get(u);
const OPEN = { lagos: 'lagos-mainland', kano: 'kano', shagamu: 'ogun-shagamu', abeokuta: 'ogun-abeokuta', 'ijebu-ode': 'ogun-ijebu', abule: 'ogun-abule' };

test('a new account spawns in Lagos first; choosing an open city as the start city puts the player on THAT city\'s spawn point before they play', async () => {
  const s = makeServer(); const u0 = await reg(s, 'start_lagos'); assert.equal(state(s, u0).city_id, 'lagos-mainland', 'default spawn is Lagos');
  for (const [name, id] of Object.entries(OPEN)) {
    const u = await reg(s, 'pick_' + name.replace('-', '_')); const r = await save(s, u, { homeCity: name }); const st = state(s, u); const sp = s.app.cities[id].spawns[0];
    assert.equal(st.city_id, id, name); if (name !== 'lagos') { assert.equal(r.moved.cityId, id); assert.deepEqual([st.x, st.z], [sp.x, sp.z], `${name} spawn point`); }
    const me = (await ok(s, 'GET', '/api/me', { uid: u })).user; assert.equal(me.cityId, id); assert.equal(me.signup.homeCity, name); assert.equal(me.signup.homeOpen, true);
  }
});
test('the world presence follows: the first heartbeat after choosing Kano is in Kano, at the Kano spawn point', async () => {
  const s = makeServer(); const u = await reg(s, 'kano_first'); await save(s, u, { homeCity: 'kano' }); const hb = await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); const sp = s.app.cities.kano.spawns[0];
  assert.equal(s.app.world.players.get(u).city, 'kano'); assert.ok(Math.hypot(s.app.world.players.get(u).x - sp.x, s.app.world.players.get(u).z - sp.z) < 1, 'standing on the spawn point'); void hb;
});
test('a city that is not open yet: the player starts in Lagos, is told so, and the wish is stored and counted; city of interest is separate', async () => {
  const s = makeServer(); const u = await reg(s, 'wants_abuja'); const before = state(s, u); const r = await save(s, u, { homeCity: 'abuja', interestCity: 'kano' });
  assert.deepEqual(r.fallback, { wanted: 'Abuja', startsIn: 'Lagos' }); assert.equal(r.moved, null); assert.deepEqual(state(s, u), before, 'not moved'); assert.equal(state(s, u).city_id, 'lagos-mainland');
  assert.equal(r.signup.homeCity, 'abuja'); assert.equal(r.signup.homeOpen, false); assert.equal(r.signup.startsIn, 'Lagos'); assert.equal(r.signup.interestCity, 'kano', 'interest is its own stored choice');
  const st = stats(s.app); assert.equal(st.homeCities.find(c => c.id === 'abuja').label, 'Abuja'); assert.equal(st.homeCities.find(c => c.id === 'abuja').n, 1); assert.equal(st.interestCities.find(c => c.id === 'kano').n, 1);
});
test('a stored wish for a closed city does not lock the player in: they can later pick an open city, and a re-save keeps the wish', async () => {
  const s = makeServer(); const u = await reg(s, 'changes_mind'); await save(s, u, { homeCity: 'port-harcourt' });
  assert.equal((await ok(s, 'GET', '/api/signup/options', { uid: u })).homeLocked, false); const keep = await save(s, u, { interestCity: 'abule' }); assert.equal(keep.signup.homeCity, 'port-harcourt', 'wish kept when only the other choices change');
  const r = await save(s, u, { homeCity: 'abeokuta' }); assert.equal(r.moved.cityId, 'ogun-abeokuta'); assert.equal(state(s, u).city_id, 'ogun-abeokuta'); assert.equal((await ok(s, 'GET', '/api/signup/options', { uid: u })).homeLocked, true);
  assert.equal((await call(s, 'POST', '/api/signup/profile', { uid: u, body: { homeCity: 'kano', interests: ['music'] } })).json.error, 'HOME_LOCKED');
});
test('the screen data: every city says whether it is open, the open list is named, the fallback is named, wished cities are listed as not open', async () => {
  const s = makeServer(); const u = await reg(s, 'reads_screen'); const o = await ok(s, 'GET', '/api/signup/options', { uid: u });
  assert.deepEqual([...o.openNow].sort(), ['Abeokuta', 'Abule', 'Ijebu Ode', 'Kano', 'Lagos', 'Shagamu']); assert.equal(o.fallbackCity, 'Lagos');
  for (const w of WISHLIST_CITIES) { const c = o.cities.find(x => x.id === w.id); assert.ok(c, w.id); assert.equal(c.open, false); assert.match(c.blurb, /Not open yet/); }
  assert.ok(o.cities.filter(c => c.open).every(c => OPEN[c.id])); assert.equal(o.cities[0].id, 'lagos', 'Lagos is first');
});
test('a BUILT city can be held back with START_CLOSED: it shows as not open and falls back to Lagos', async () => {
  const s = makeServer(); START_CLOSED.push('kano'); try {
    const u = await reg(s, 'held_back'); assert.equal(startOptions(s.app).find(c => c.id === 'kano').open, false); assert.ok(!(await ok(s, 'GET', '/api/signup/options', { uid: u })).openNow.includes('Kano'));
    const r = await save(s, u, { homeCity: 'kano' }); assert.equal(r.fallback.wanted, 'Kano'); assert.equal(state(s, u).city_id, 'lagos-mainland');
  } finally { START_CLOSED.length = 0; }
});
test('city of interest: may be a wished city, may not be the start city; unknown cities are refused', async () => {
  const s = makeServer(); const u = await reg(s, 'interest_ok'); const r = await save(s, u, { homeCity: 'lagos', interestCity: 'abuja' }); assert.equal(r.signup.interestCity, 'abuja');
  assert.equal((await call(s, 'POST', '/api/signup/profile', { uid: u, body: { homeCity: 'lagos', interestCity: 'lagos', interests: ['music'] } })).json.error, 'SAME_CITY');
  assert.equal((await call(s, 'POST', '/api/signup/profile', { uid: u, body: { homeCity: 'atlantis', interests: ['music'] } })).json.error, 'BAD_CITY'); assert.equal((await call(s, 'POST', '/api/signup/profile', { uid: u, body: { interestCity: 'narnia', interests: ['music'] } })).json.error, 'BAD_CITY');
});
test('skipping keeps the Lagos start and stores no city', async () => {
  const s = makeServer(); const u = await reg(s, 'skipper'); await ok(s, 'POST', '/api/signup/profile', { uid: u, body: { skip: true } }); assert.equal(state(s, u).city_id, 'lagos-mainland'); const me = (await ok(s, 'GET', '/api/me', { uid: u })).user; assert.equal(me.signup.skipped, true);
});
