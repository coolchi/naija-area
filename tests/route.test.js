// Route finding and the autopilot (client/src/route.js): pure functions on the real city config.
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { buildGrid, findRoute, collidersFromCity, Auto, etaSeconds, etaLabel, remaining, homeMarkers, NAV } from '../client/src/route.js';
import { roadAt, polyLen } from '../client/src/roadgeom.js';
const city = JSON.parse(fs.readFileSync(new URL('../server/config/cities/lagos-mainland.json', import.meta.url)));
const G = buildGrid(city); const cols = collidersFromCity(city);
const inside = (p, c, r = 0) => p[0] > c.x0 - r && p[0] < c.x1 + r && p[1] > c.z0 - r && p[1] < c.z1 + r;
const sample = (pts, f) => { for (let i = 1; i < pts.length; i++) { const L = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); for (let s = 0; s <= L; s += 1) f([pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * s / (L || 1), pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * s / (L || 1)]); } };

test('every home door, venue and shop can be reached on foot and by car, and the route never goes through a building', () => {
  const dests = [...city.venues, ...city.shops, ...city.properties.map(p => ({ id: p.id, ...p.door }))]; assert.ok(dests.length > 20);
  const start = [city.spawns[0].x, city.spawns[0].z]; let n = 0;
  for (const d of dests) for (const mode of ['walk', 'drive']) {
    const r = findRoute(G, start, [d.x, d.z], mode); assert.ok(r, `no ${mode} route to ${d.id}`); n++;
    assert.ok(r.length >= Math.hypot(d.x - start[0], d.z - start[1]) - 1, 'not shorter than a straight line');
    assert.ok(r.length < Math.hypot(d.x - start[0], d.z - start[1]) * 2.4 + 60, `${mode} to ${d.id} is a sane length: ${r.length}`);
    const r0 = mode === 'drive' ? 1.2 : 0.4; let bad = 0; const mid = r.pts.slice(1, -1); sample(mid.length > 1 ? mid : r.pts, (p) => { if (cols.some(c => inside(p, c, r0))) bad++; }); assert.equal(bad, 0, `${mode} route to ${d.id} crosses a building`);
  } assert.ok(n >= 40);
});
test('driving prefers the streets: most of a long car route is on roads, curves and roundabouts', () => {
  const from = [-200, -200], to = [200, 100]; const r = findRoute(G, from, to, 'drive'); assert.ok(r); let on = 0, total = 0; const kinds = new Set();
  sample(r.pts.slice(1, -1), (p) => { total++; const q = roadAt(city, p[0], p[1], 2); if (q) { on++; kinds.add(q.kind); } }); assert.ok(on / total > 0.75, `on-road share ${(on / total).toFixed(2)}`);
});
test('routes use curved roads and roundabouts (road data v2), and stay off the roundabout islands', () => {
  const seen = new Set(); for (let k = 0; k < 40; k++) { const a = [-220 + (k * 37) % 440, -220 + (k * 53) % 380], b = [220 - (k * 41) % 440, 150 - (k * 29) % 360]; const r = findRoute(G, a, b, 'drive'); if (!r) continue; sample(r.pts, (p) => { const q = roadAt(city, p[0], p[1], 1); if (q) seen.add(q.kind); }); for (const o of city.roundabouts) sample(r.pts.slice(1, -1), (p) => assert.ok(Math.hypot(p[0] - o.x, p[1] - o.z) > o.islandR * 0.62, 'through an island')); }
  assert.ok(seen.has('curve') && seen.has('roundabout') && seen.has('road'), [...seen].join());
});
test('unreachable or outside points: water and the map edge give no route, a start inside a building steps out to free ground', () => {
  assert.equal(findRoute(G, [0, 0], [0, 400], 'walk'), null, 'far outside the city');
  const b = city.buildings[0]; const r = findRoute(G, [b.x, b.z], [0, 0], 'walk'); assert.ok(r && r.pts.length >= 2);
  if (city.water) { const w = city.water; assert.equal(findRoute(G, [0, 0], [(w.minX + w.maxX) / 2, (w.minZ + w.maxZ) / 2 + 30], 'walk'), null, 'in the water'); }
});
test('ETA: length over speed, labelled as an estimate-sized number, and walking is slower than driving', () => {
  assert.equal(etaSeconds(520, 'walk'), Math.round(520 / NAV.walk)); assert.ok(etaSeconds(520, 'drive') < etaSeconds(520, 'walk')); assert.equal(etaLabel(30), '~30 s'); assert.equal(etaLabel(125), '~2 min'); assert.ok(etaSeconds(0) >= 1);
  const r = findRoute(G, [-200, -200], [200, 100], 'walk'); assert.ok(Math.abs(r.length - polyLen(r.pts)) < 1e-6); assert.ok(remaining(r.pts, 1, r.pts[0][0], r.pts[0][1]) <= r.length + 1e-6);
});
test('autopilot on foot: arrives, at walking speed, without cutting through buildings', () => {
  const from = [city.spawns[0].x, city.spawns[0].z], to = [city.venues[1].x, city.venues[1].z + 3]; const r = findRoute(G, from, to, 'walk'); const a = new Auto(r.pts, 'walk'); let s = { x: from[0], z: from[1], ry: 0, v: 0 }, t = 0, maxv = 0, bad = 0;
  while (!a.done && t < 400) { s = a.step(s.x, s.z, s.ry, s.v, 0.05); t += 0.05; maxv = Math.max(maxv, s.v); if (cols.some(c => inside([s.x, s.z], c, 0.3))) bad++; }
  assert.ok(a.done, 'arrived'); assert.ok(maxv <= NAV.walk + 1e-9); assert.equal(bad, 0); assert.ok(Math.abs(t - r.length / NAV.walk) < 8, `time ${t.toFixed(1)} vs ${(r.length / NAV.walk).toFixed(1)}`);
});
test('autopilot by car: arrives, never exceeds the limit, slows for corners and the end of the route', () => {
  const from = [-200, -200], to = [200, 100]; const r = findRoute(G, from, to, 'drive'); const a = new Auto(r.pts, 'drive'); let s = { x: from[0], z: from[1], ry: 0, v: 0 }, t = 0, maxv = 0, minCorner = 99;
  while (!a.done && t < 400) { s = a.step(s.x, s.z, s.ry, s.v, 0.05); t += 0.05; maxv = Math.max(maxv, s.v); if (t > 10 && a.i < r.pts.length - 2) minCorner = Math.min(minCorner, s.v); }
  assert.ok(a.done, 'arrived'); assert.ok(maxv <= NAV.driveMax + 1e-6, 'speed limit ' + maxv); assert.ok(minCorner < NAV.driveMax * 0.75, 'slowed somewhere: ' + minCorner); assert.ok(t < r.length / 4, 'not crawling');
});
test('autopilot flags a stuck vehicle after a few seconds without progress, and not while moving', () => {
  const a = new Auto([[0, 0], [100, 0]], 'walk'); for (let i = 0; i < 100; i++) a.observe(i * 0.2, 0, 0.05); assert.equal(a.stuck, false);
  const b = new Auto([[0, 0], [100, 0]], 'walk'); for (let i = 0; i < 80; i++) b.observe(3, 3, 0.05); assert.equal(b.stuck, true);
});
test('home markers: none, one, several; doors only; no duplicates', () => {
  assert.deepEqual(homeMarkers(null), []); assert.deepEqual(homeMarkers({}), []); const h1 = { id: 'h1', name: 'Yaba Corner', door: { x: 1, z: 2 }, tierLabel: 'Room', area: 'Yaba' };
  assert.equal(homeMarkers({ home: h1 }).length, 1); assert.equal(homeMarkers({ home: h1 }) [0].x, 1);
  assert.equal(homeMarkers({ home: h1, homes: [h1, { id: 'h2', name: 'B', door: { x: 5, z: 6 } }, { id: 'h3', name: 'no door' }] }).length, 2);
});
test('route building is fast enough to run on the player\'s device (grid once, then a route per tap)', () => {
  let t0 = performance.now(); const g2 = buildGrid(city); const tg = performance.now() - t0; t0 = performance.now(); for (let i = 0; i < 5; i++) findRoute(g2, [-200, -200], [200, 100], 'drive'); const tr = (performance.now() - t0) / 5; assert.ok(tg < 4000 && tr < 600, `grid ${tg.toFixed(0)} ms, route ${tr.toFixed(0)} ms`);
});
