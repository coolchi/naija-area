// Pure helpers behind the creeks and bridges of the expanded Lagos (ground cut-outs, creek colliders, the deck gap that keeps players on the bridge).
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { subtractRects, creekVisual, creekColliders, lekkiLegInnerZ, lekkiLegZ, lekkiStayCables } from '../client/src/landmarks3d.js';
import { lampPositions } from '../client/src/lamps.js';
const area = (r) => (r.x1 - r.x0) * (r.z1 - r.z0); const load = (id) => JSON.parse(fs.readFileSync(new URL(`../server/config/cities/${id}.json`, import.meta.url)));

test('subtractRects: the ground minus a creek covers exactly the rest, with no overlaps', () => {
  const base = { x0: 0, x1: 100, z0: 0, z1: 100 }, cut = { x0: 40, x1: 60, z0: -10, z1: 70 }; const parts = subtractRects(base, [cut]); assert.equal(parts.reduce((s, r) => s + area(r), 0), 10000 - 20 * 70);
  for (let i = 0; i < parts.length; i++) for (let j = i + 1; j < parts.length; j++) { const a = parts[i], b = parts[j]; assert.ok(!(a.x0 < b.x1 && a.x1 > b.x0 && a.z0 < b.z1 && a.z1 > b.z0), 'no overlap'); }
  assert.deepEqual(subtractRects(base, [{ x0: 200, x1: 300, z0: 0, z1: 5 }]), [base], 'a cut elsewhere changes nothing'); assert.deepEqual(subtractRects(base, [{ x0: -5, x1: 105, z0: -5, z1: 105 }]), [], 'cut everything');
});
test('creekColliders leave the bridge gaps free and cover everything else', () => {
  const c = { id: 'k', x0: 10, x1: 20, z0: -100, z1: 100, gaps: [[-8, 8]] }; const cols = creekColliders(c); assert.equal(cols.length, 2); assert.deepEqual(cols.map(r => [r.z0, r.z1]), [[-100, -8], [8, 100]]);
  const two = creekColliders({ ...c, gaps: [[40, 50], [-8, 8]] }); assert.equal(two.length, 3); assert.ok(two.every(r => r.x0 === 10 && r.x1 === 20));
  assert.equal(creekColliders({ ...c, gaps: [] }).length, 1);
});
test('creekVisual: a creek that reaches the district edge carries on out of sight', () => {
  const B = { minX: -100, maxX: 100, minZ: -50, maxZ: 50 }; const v = creekVisual({ x0: -100, x1: 100, z0: -50, z1: 50 }, B); assert.ok(v.x0 < -250 && v.x1 > 250 && v.z0 < -200 && v.z1 > 200); const inner = creekVisual({ x0: 0, x1: 10, z0: -20, z1: 20 }, B); assert.deepEqual(inner, { x0: 0, x1: 10, z0: -20, z1: 20 });
});
test('real configs: every bridge gap matches a road crossing the creek, and the bridge district has deck lamps and a pylon', () => {
  for (const id of ['lagos-vi-ikoyi', 'lagos-bridge']) { const c = load(id); for (const k of c.creeks) { for (const [a, b] of k.gaps) assert.ok(c.roads.some(r => !r.pts && r.z1 === r.z2 && r.z1 > a && r.z1 < b && r.width / 2 <= (b - a) / 2 + 0.01), `${id}: a road runs through the gap ${a}..${b}`); } }
  const b = load('lagos-bridge'); const lamps = lampPositions(b); assert.ok(lamps.length >= 40, 'deck lamps: ' + lamps.length); assert.ok(lamps.some(l => Math.abs(l.x) < 5), 'lamps near the pylon');
  const cab = b.bridges.find(x => x.type === 'cable'); assert.equal(cab.scale, 0.4); assert.ok(Math.abs((cab.x1 - cab.x0) / cab.scale - 1360) < 5, 'deck length is the real 1.36 km at scale'); assert.ok(Math.abs(cab.deckWidth / cab.scale - 21.4) < 0.2, 'deck width 21.4 m at scale');
});

test('Lekki-Ikoyi pylon stays outside the carriageway and keeps 28 stay cables', () => {
  const br = load('lagos-bridge').bridges.find(x => x.type === 'cable');
  for (const y of [0, 2.2, 4.2]) assert.ok(lekkiLegInnerZ(br, y) >= br.deckWidth / 2 - 0.05, 'leg crosses the road at y=' + y + ' inner=' + lekkiLegInnerZ(br, y));
  assert.ok(lekkiLegZ(br, br.pylonHeightAboveDeck) > lekkiLegZ(br, 18) + 4, 'the horns open into a wide V');
  const seg = lekkiStayCables(br);
  assert.equal(seg.length, 28 * 6, '4 groups of 7 cables');
  for (let i = 0; i < seg.length; i += 6) {
    const x1 = seg[i + 3], y1 = seg[i + 4], z1 = seg[i + 5];
    assert.ok(y1 > 0 && y1 < 2, 'deck end of a cable');
    assert.ok(Math.abs(x1 - (br.pylonX || 0)) < 50 && Math.abs(x1) < Math.max(Math.abs(br.x0), br.x1));
    assert.ok(Math.abs(z1 - br.z) < br.deckWidth / 2);
  }
});
