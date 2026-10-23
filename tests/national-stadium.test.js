// National Stadium on the Lagos Mainland (23 Oct 2026): a second, bigger stadium in Surulere that reuses the Lekki stadium venue mechanics.
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { makeServer, mkUser, ok, at } from './helpers.js';
import { enterCity } from '../server/core/cities.js';
import { buildGrid, findRoute, collidersFromCity } from '../client/src/route.js';
import { buildModel } from '../client/src/map-model.js';
import { stadiumTiers } from '../client/src/landmarks3d.js';
const city = JSON.parse(fs.readFileSync(new URL('../server/config/cities/lagos-mainland.json', import.meta.url)));
const lekki = JSON.parse(fs.readFileSync(new URL('../server/config/cities/lagos-lekki.json', import.meta.url)));
const V = 'ml_venue_national_stadium';

test('the National Stadium is a Mainland building and venue, bigger than the City Stadium, with snacks, car park and nothing overlapping', () => {
  const s = makeServer(); const c = s.app.cities['lagos-mainland']; const v = c.venueById[V]; assert.ok(v); assert.equal(v.kind, 'stadium');
  const b = c.buildingById[v.buildingId]; assert.equal(b.kind, 'stadium'); assert.equal(b.label, 'National Stadium');
  const lk = lekki.buildings.find(x => x.id === 'lk_b3'); assert.ok(b.w > lk.w && b.d > lk.d, 'bigger than the Lekki City Stadium');
  const d = city.districts.find(q => b.x >= q.x0 && b.x <= q.x1 && b.z >= q.z0 && b.z <= q.z1); assert.equal(d.id, 'd_surulere');
  assert.deepEqual([...new Set(v.stations.map(x => x.type))].sort(), ['eat', 'poster', 'scores', 'seat', 'ticket']); assert.ok(s.app.all.shopById[v.shopId]);
  assert.ok(c.carParks.some(p => p.venueId === v.id)); assert.ok(!c.buildings.some(o => o.id !== b.id && Math.abs(o.x - b.x) < (o.w + b.w) / 2 && Math.abs(o.z - b.z) < (o.d + b.d) / 2), 'nothing overlaps');
  for (const t of stadiumTiers(b)) assert.ok(t.hx1 <= b.w / 2 && t.hz1 <= b.d / 2, 'the 3D tiers fit inside');
  assert.ok(s.app.cities['lagos-lekki'].venueById.lk_venue_stadium, 'the Lekki stadium stays');
  assert.ok(buildModel(city).items.some(i => i.id === V), 'on the map');
});
test('the stadium gate is reachable on foot and by car from every Mainland spawn, and the gate is open ground', () => {
  const v = city.venues.find(x => x.id === V); const G = buildGrid(city); const cols = collidersFromCity(city);
  assert.ok(!cols.some(c => v.x > c.x0 && v.x < c.x1 && v.z > c.z0 && v.z < c.z1), 'the pin is not on solid ground');
  for (const sp of city.spawns) for (const m of ['walk', 'drive']) { const r = findRoute(G, [sp.x, sp.z], [v.x, v.z], m); assert.ok(r && r.pts.length >= 2, `${m} from ${sp.x},${sp.z}`); const end = r.pts[r.pts.length - 1]; assert.ok(Math.hypot(end[0] - v.x, end[1] - v.z) < 1); }
});
test('you can walk in, buy a ticket and take a seat (same mechanics as Lekki)', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 20000, ageMs: 10 * 60000 }); enterCity(s.app, u, 'lagos-mainland'); const v = s.app.cities['lagos-mainland'].venueById[V];
  at(s, u, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); await ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: V } });
  const t = await ok(s, 'POST', '/api/venue/act', { uid: u, body: { venueId: V, stationId: 'ticket', idem: 'n1' } }); assert.equal(t.charged, s.app.balance.stadium.ticketFee);
  const seat = await ok(s, 'POST', '/api/venue/act', { uid: u, body: { venueId: V, stationId: 'seat' } }); assert.ok(seat.text);
});
