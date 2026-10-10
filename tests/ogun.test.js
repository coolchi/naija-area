// Ogun State towns (10 Oct 2026): Shagamu, Abeokuta and Ijebu Ode, linked by road to each other and to Lagos.
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { makeServer, mkUser, ok, at } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import { cityIdOf } from '../server/core/cities.js';
import { validateCity } from '../server/core/city.js';
import { motorParkBuses } from '../client/src/landmarks3d.js';

const IDS = ['ogun-shagamu', 'ogun-abeokuta', 'ogun-ijebu']; const hb = (s, u) => ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} });
const avg = (c) => c.properties.reduce((a, p) => a + p.rent, 0) / c.properties.length;

test('the three towns are registered, valid, in Ogun State, road-only (no airport), and inside the budget', () => {
  const s = makeServer(); for (const id of IDS) { const c = s.app.cities[id]; assert.ok(c, id); assert.deepEqual(validateCity(JSON.parse(fs.readFileSync(new URL(`../server/config/cities/${id}.json`, import.meta.url)))), [], id); assert.equal(c.state, 'Ogun'); assert.equal(c.airport, undefined, 'road travel only');
    assert.ok(c.buildings.length <= 120 && c.roads.length <= 30 && c.trafficLoops.length <= 16 && c.billboards.length <= 24, id); assert.ok(c.billboards.length >= 4 && c.shops.length >= 3 && c.properties.length >= 10 && c.jobs.length >= 3 && c.venues.length >= 1 && c.spawns.length >= 3, `${id} has the small-town basics`); }
  assert.equal(new Set(IDS.map(id => s.app.cities[id].cityName)).size, 3);
});
test('everything is reachable by road: Lagos to each town in at most two hops, every link has a way back and arrives outside its gate', () => {
  const s = makeServer(); const g = (id) => s.app.cities[id].links.map(l => l.to); const seen = new Map([['lagos-mainland', 0]]); const q = ['lagos-mainland']; while (q.length) { const c = q.shift(); for (const t of g(c)) if (!seen.has(t)) { seen.set(t, seen.get(c) + 1); q.push(t); } }
  assert.equal(seen.get('ogun-shagamu'), 1); assert.ok(seen.get('ogun-abeokuta') <= 2 && seen.get('ogun-ijebu') <= 2);
  for (const id of IDS) for (const l of s.app.cities[id].links) { const back = s.app.cities[l.to].links.find(b => b.to === id); assert.ok(back, `${l.to} links back to ${id}`); assert.ok(Math.hypot(l.arrive.x - back.x, l.arrive.z - back.z) > back.r + 8); assert.ok(l.fare >= 400); }
});
test('driving out of Lagos: the road link to Shagamu then on to Abeokuta, each fare through the ledger, and back', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 5000, ageMs: 10 * 60000 }); await hb(s, u); let c0 = balanceOf(s.db, cashId(u));
  const go = async (from, to) => { const gate = s.app.cities[from].links.find(l => l.to === to); at(s, u, gate.x, gate.z); await hb(s, u); const r = await ok(s, 'POST', '/api/cities/link', { uid: u, body: { linkId: gate.id, idem: `${from}>${to}` } }); assert.equal(cityIdOf(s.app, u), to); assert.equal(r.fare, gate.fare); const c1 = balanceOf(s.db, cashId(u)); assert.equal(c1, c0 - gate.fare); c0 = c1; await hb(s, u); };
  await go('lagos-mainland', 'ogun-shagamu'); await go('ogun-shagamu', 'ogun-abeokuta'); await go('ogun-abeokuta', 'ogun-shagamu'); await go('ogun-shagamu', 'ogun-ijebu'); await go('ogun-ijebu', 'ogun-shagamu'); await go('ogun-shagamu', 'lagos-mainland'); checkInvariants(s.db);
});
test('Ijebu Ode is the cheap first move out of Lagos: rents well below Lagos mainland and the other towns', () => {
  const s = makeServer(); const ij = avg(s.app.cities['ogun-ijebu']); assert.ok(ij < avg(s.app.cities['lagos-mainland']) * 0.8, 'cheaper than Lagos'); assert.ok(ij < avg(s.app.cities['ogun-shagamu']) && ij < avg(s.app.cities['ogun-abeokuta']));
});
test('what makes each town different: Shagamu motor park and interchange, Abeokuta rock and adire, Ijebu Ode palace square', () => {
  const s = makeServer(); const sg = s.app.cities['ogun-shagamu']; const mp = sg.carParks.find(c => c.id === 'sg_cp_motorpark'); assert.ok(mp && mp.kind === 'public' && mp.fee > 0); assert.ok(sg.landmarks.some(l => l.kind === 'motorpark')); assert.ok(sg.roundabouts.length >= 1); assert.ok(sg.jobs.some(j => j.id === 'job_rider'), 'motor park dispatch work');
  const ab = s.app.cities['ogun-abeokuta']; const rock = ab.buildings.find(b => b.model === 'rock'); assert.ok(rock && rock.h >= 25 && !rock.noCollide, 'the rock is solid'); assert.ok(ab.venueById.ab_venue_adire && ab.landmarks.some(l => l.kind === 'dyepits'));
  const ij = s.app.cities['ogun-ijebu']; assert.ok(ij.landmarks.some(l => l.id === 'plaza' && /not the palace/.test(l.name)));
});
test('motor park buses stand in two rows beside the lot, never on it', () => {
  const l = { cx: -20, cz: 5, w: 72, d: 40 }; const bs = motorParkBuses(l); assert.ok(bs.length >= 12); for (const b of bs) { assert.ok(Math.abs(b.z - l.cz) > l.d / 2 + 3, 'outside the lot'); assert.ok(b.x > l.cx - l.w / 2 && b.x < l.cx + l.w / 2); }
});
