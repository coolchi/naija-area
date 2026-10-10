// Street lights: placement from the city config (straight roads, curves, roundabouts), steady/flicker/broken mix, brightness over the day.
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { lampPositions, lampLevel, lampsOn, LAMP } from '../client/src/lamps.js';
import { roadAt, roadPts, nearestOnPoly, isCurved } from '../client/src/roadgeom.js';
import { collidersFromCity } from '../client/src/route.js';
const city = JSON.parse(fs.readFileSync(new URL('../server/config/cities/lagos-mainland.json', import.meta.url))); const L = lampPositions(city);

test('lamps stand beside the road, never on it, in the water or inside a building, and face the road', () => {
  assert.ok(L.length > 100 && L.length < 400, 'count ' + L.length); const cols = collidersFromCity(city);
  for (const l of L) { assert.equal(roadAt(city, l.x, l.z, 1), null, 'on a road at ' + l.x + ',' + l.z); assert.ok(!cols.some(c => l.x > c.x0 && l.x < c.x1 && l.z > c.z0 && l.z < c.z1), 'inside a building'); assert.ok(Math.abs(Math.hypot(l.fx, l.fz) - 1) < 1e-6, 'unit direction');
    const hx = l.x + l.fx * 8, hz = l.z + l.fz * 8; const d0 = Math.min(...city.roads.map(r => nearestOnPoly(roadPts(r), l.x, l.z).d)), d1 = Math.min(...city.roads.map(r => nearestOnPoly(roadPts(r), hx, hz).d)); assert.ok(d1 <= d0 + 0.5, 'the arm points towards the road'); }
  assert.equal(new Set(L.map(l => l.id)).size, L.length); for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) assert.ok(Math.hypot(L[i].x - L[j].x, L[i].z - L[j].z) >= 12 - 1e-6, 'lamps too close');
});
test('curved roads and roundabouts have lamps too (road data v2)', () => {
  const curved = city.roads.filter(isCurved); assert.ok(curved.length >= 2); for (const r of curved) assert.ok(L.some(l => nearestOnPoly(roadPts(r), l.x, l.z).d < r.width / 2 + 4), r.id + ' has lamps'); for (const o of city.roundabouts) assert.ok(L.filter(l => Math.hypot(l.x - o.x, l.z - o.z) < o.outerR + 11).length >= 3, o.id + ' has lamps');
});
test('the mix: most lamps steady, some flicker, some broken, and it is deterministic', () => {
  const k = (n) => L.filter(l => l.kind === n).length; assert.ok(k('steady') > L.length * 0.7); assert.ok(k('flicker') >= 5 && k('flicker') < L.length * 0.2); assert.ok(k('broken') >= 5 && k('broken') < L.length * 0.2);
  assert.deepEqual(lampPositions(city).map(l => [l.x, l.z, l.kind]), L.map(l => [l.x, l.z, l.kind]));
});
test('brightness: off by day, on at night; broken stays dark; steady equals the level; flickering ones dip sometimes but never exceed the level', () => {
  assert.equal(lampsOn(0), 0); assert.equal(lampsOn(LAMP.onFrom), 0); assert.equal(lampsOn(1), 1); assert.ok(lampsOn(0.45) > 0 && lampsOn(0.45) < 1);
  const steady = L.find(l => l.kind === 'steady'), broken = L.find(l => l.kind === 'broken'), flick = L.find(l => l.kind === 'flicker');
  assert.equal(lampLevel(steady, 0, 5), 0, 'day'); assert.equal(lampLevel(steady, 1, 5), 1); assert.equal(lampLevel(steady, 0.5, 9), 0.5); for (let t = 0; t < 50; t += 0.37) assert.equal(lampLevel(broken, 1, t), 0);
  let dips = 0, full = 0; for (let t = 0; t < 600; t += 0.05) { const b = lampLevel(flick, 1, t); assert.ok(b >= 0 && b <= 1); if (b < 0.6) dips++; else full++; } assert.ok(dips > 5 && full > dips * 3, `flicker dips ${dips}, steady ${full}`);
});
