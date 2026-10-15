import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { roadPts, isCurved, roadAt, nearestOnPoly, offsetPoly, circulate, polyLen, radiusAt, bendFactor, maxTurnPerMetre, BEND } from '../client/src/roadgeom.js';
import { planRoadHazards, roadTreatment, hazardAt } from '../client/src/road-hazards.js';
import { makePath, atPath } from '../client/src/path.js';
import { applyCurves } from '../tools/add-curves.mjs';
import { buildModel, hitTest, search, DEFAULT_LAYERS } from '../client/src/map-model.js';
const city = JSON.parse(fs.readFileSync(new URL('../server/config/cities/lagos-mainland.json', import.meta.url), 'utf8'));
const rectDist = (b, x, z) => Math.hypot(Math.max(Math.abs(x - b.x) - b.w / 2, 0), Math.max(Math.abs(z - b.z) - b.d / 2, 0));

test('geometry helpers: nearest point on a polyline, right-hand offset, counter-clockwise circulation', () => {
  const pts = [[0, 0], [10, 0], [10, 10]]; const n = nearestOnPoly(pts, 5, 3); assert.equal(n.d, 3); assert.equal(n.s, 5); assert.equal(nearestOnPoly(pts, 12, 5).d, 2);
  const off = offsetPoly([[0, 0], [10, 0]], 3); assert.deepEqual(off, [[0, 3], [10, 3]], 'heading east, right-hand side is +z (south on the map)');
  const arc = circulate([0, 0], 10, [-10, 0], [0, 10]); const a0 = Math.atan2(arc[0][1], arc[0][0]), a1 = Math.atan2(arc.at(-1)[1], arc.at(-1)[0]); assert.ok(arc.length > 5);
  for (let i = 1; i < arc.length; i++) { const a = Math.atan2(arc[i - 1][1], arc[i - 1][0]), b = Math.atan2(arc[i][1], arc[i][0]); let d = b - a; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; assert.ok(d < 0, 'polar angle decreases = counter-clockwise on the map = right-hand traffic'); }
  assert.ok(Math.abs(radiusAt([[0, 10], [10, 0], [0, -10], [-10, 0]], 1) - 10) < 1e-6); assert.equal(bendFactor(1000), 1); assert.equal(bendFactor(2), BEND.slowMin); assert.ok(bendFactor(20) > BEND.slowMin && bendFactor(20) < 1);
});

test('road data v2: most roads straight, a minority curved, several roundabouts; format is idempotent', () => {
  assert.equal(city.roadFormat, 2); const curved = city.roads.filter(isCurved), straight = city.roads.filter(r => !isCurved(r));
  assert.ok(curved.length >= 2 && curved.length / city.roads.length < 0.34, `${curved.length} of ${city.roads.length} curved`); const len = (a) => a.reduce((s, r) => s + polyLen(roadPts(r)), 0); assert.ok(len(straight) > len(curved) * 4, 'by length the city is mostly straight roads');
  assert.ok(city.roundabouts.length >= 4); for (const c of curved) { assert.ok(c.pts.length > 10 && c.name && c.width > 0); assert.ok(polyLen(c.pts) > 40); }
  const before = JSON.stringify(city); applyCurves(city); assert.equal(JSON.stringify(city), before, 'second apply changes nothing');
});

test('curved roads and roundabouts do not run through any building', () => {
  for (const r of city.roads.filter(isCurved)) for (const p of r.pts) for (const b of city.buildings) assert.ok(rectDist(b, p[0], p[1]) >= r.width / 2, `${r.name} hits ${b.id}`);
  for (const o of city.roundabouts) { for (const b of city.buildings) assert.ok(rectDist(b, o.x, o.z) >= o.outerR, `${o.name} hits ${b.id}`); assert.ok(city.roads.some(r => !isCurved(r) && r.x1 === r.x2 && r.x1 === o.x) && city.roads.some(r => !isCurved(r) && r.z1 === r.z2 && r.z1 === o.z), 'sits on a junction'); assert.ok(o.islandR < o.outerR - 6, 'lane wide enough'); }
});

test('no building footprint sits in a road carriageway (straight or curved)', () => {
  const sample = (b) => {
    const pts = [];
    for (let i = 0; i <= 4; i++) for (let j = 0; j <= 4; j++) pts.push([b.x - b.w / 2 + (b.w * i) / 4, b.z - b.d / 2 + (b.d * j) / 4]);
    return pts;
  };
  for (const b of city.buildings) {
    for (const r of city.roads) {
      const hw = (r.width || 10) / 2;
      let minD = Infinity;
      for (const p of sample(b)) minD = Math.min(minD, nearestOnPoly(roadPts(r), p[0], p[1]).d);
      assert.ok(minD >= hw - 0.35, `${b.label || b.id} sits on ${r.name || r.id} (clearance ${minD.toFixed(2)} m, need ${(hw - 0.35).toFixed(2)})`);
    }
  }
});

test('ambient traffic loops stay outside buildings (cars must not drive through them)', () => {
  const tmp = {};
  for (const l of city.trafficLoops) {
    const P = makePath(l.pts, 7, { dense: !!l.dense, slow: true });
    for (let s = 0; s < P.length; s += 1.2) {
      atPath(P, s, tmp);
      for (const b of city.buildings) assert.ok(rectDist(b, tmp.x, tmp.z) >= 1.6, `${l.id} enters ${b.id || b.label} at ${tmp.x.toFixed(1)},${tmp.z.toFixed(1)}`);
    }
  }
});

test('traffic loops follow the road geometry: every point is on a road, bends are smooth, roundabouts circulate counter-clockwise, bends are slower', () => {
  assert.ok(city.trafficLoops.every(l => l.dense)); assert.ok(city.trafficLoops.some(l => l.id.startsWith('cv')), 'a loop on each curved road');
  for (const l of city.trafficLoops) {
    for (const p of l.pts) assert.ok(roadAt(city, p[0], p[1], 0.6), `${l.id} leaves the road at ${p}`);
    assert.ok(maxTurnPerMetre(l.pts) < 0.5, `${l.id} has a kink (${maxTurnPerMetre(l.pts).toFixed(2)} rad/m)`);
    const P = makePath(l.pts, 7, { dense: true, slow: true }); assert.ok(P.length > P.realLength, 'bends cost time'); const o = {}; let prev = null;
    for (let s = 0; s < P.length; s += 0.7) { atPath(P, s, o); assert.ok(roadAt(city, o.x, o.z, 0.6)); if (prev) assert.ok(Math.hypot(o.x - prev.x, o.z - prev.z) < 3, 'no jumps along the path'); prev = { x: o.x, z: o.z }; }
  }
  const big = city.trafficLoops.find(l => l.id === 'big'); for (const ra of city.roundabouts) { const ring = big.pts.filter(p => Math.abs(Math.hypot(p[0] - ra.x, p[1] - ra.z) - (ra.outerR + ra.islandR) / 2) < 0.2); assert.ok(ring.length > 8, `${ra.name} is circulated`); const i = big.pts.indexOf(ring[0]); let turn = 0; for (let k = i + 1; k < i + ring.length; k++) { const a = Math.atan2(big.pts[k - 1][1] - ra.z, big.pts[k - 1][0] - ra.x), b = Math.atan2(big.pts[k][1] - ra.z, big.pts[k][0] - ra.x); let d = b - a; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; turn += d; } assert.ok(turn < -0.5, `${ra.name}: traffic goes counter-clockwise`); }
  const P = makePath(big.pts, 7, { dense: true, slow: true }); assert.ok(Math.min(...P.f) < 0.9 && Math.max(...P.f) === 1, 'slower in bends only');
});

test('the map reads curves and roundabouts from the same data (draw model, search, hit-test)', () => {
  const m = buildModel(city); assert.equal(m.roundabouts.length, city.roundabouts.length); assert.ok(m.roads.some(r => r.curved));
  assert.equal(search(m, 'Yaba Crescent')[0].type, 'road'); assert.equal(search(m, 'Danfo Roundabout')[0].type, 'roundabout');
  const ra = city.roundabouts[0]; assert.equal(hitTest(m, ra.x + 11, ra.z, 2, DEFAULT_LAYERS).type, 'roundabout');
  // Zoom in (high k → small hit radius) and ignore markers so a nearby school door cannot steal the road
  const cv = city.roads.find(isCurved); const mid = cv.pts[Math.floor(cv.pts.length / 2)]; assert.equal(hitTest(m, mid[0], mid[1], 4, { ...DEFAULT_LAYERS, venues: false, landmarks: false }).name, cv.name);
  assert.ok(roadPts(city.roads[0]).length === 2);
});

test('road hazards: some streets get potholes, others get bumps; both sit on the road and can be queried', () => {
  const H = planRoadHazards(city);
  assert.ok(H.some(h => h.kind === 'pothole') && H.some(h => h.kind === 'bump'), 'both treatments appear');
  const treated = new Set(H.map(h => h.roadId));
  assert.ok(treated.size >= 2, 'more than one street is worn');
  assert.ok(city.roads.some(r => roadTreatment(r) === null), 'some streets stay smooth');
  for (const h of H) {
    assert.ok(roadAt(city, h.x, h.z, 1.2), `${h.id} left the asphalt`);
    assert.ok(!(city.roundabouts || []).some(o => Math.hypot(h.x - o.x, h.z - o.z) < o.outerR), `${h.id} sits in a roundabout`);
  }
  const sample = H[0]; assert.equal(hazardAt(H, sample.x, sample.z)?.id, sample.id); assert.equal(hazardAt(H, 9999, 9999), null);
});
