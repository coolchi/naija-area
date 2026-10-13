// Places 100 treasure spots behind buildings in Abule, Ijebu-Ode, Lagos, and Abuja.
// Spots in one city are spread as far apart as the buildings allow. Run: node tools/gen-treasures.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../server/config/cities');
const out = path.join(path.dirname(fileURLToPath(import.meta.url)), '../server/config/treasures.json');

// Abuja's buildings overlap, so only three backs are clear of the next wall. The rest of the 100 are spread through the bigger districts.
const QUOTA = [
  ['abuja', 3, 'abuja'],
  ['ogun-abule', 12, 'abule'],
  ['ogun-ijebu', 18, 'ijebu'],
  ['lagos-lekki', 8, 'lagos'],
  ['lagos-island', 8, 'lagos'],
  ['lagos-vi-ikoyi', 8, 'lagos'],
  ['lagos-mainland', 43, 'lagos'],
];

const load = (id) => JSON.parse(fs.readFileSync(path.join(root, `${id}.json`), 'utf8'));

function segments(road) {
  if (Array.isArray(road.pts) && road.pts.length >= 2) return road.pts;
  if (Number.isFinite(road.x1) && Number.isFinite(road.z1)) return [[road.x1, road.z1], [road.x2, road.z2]];
  return [];
}
function onRoad(city, x, z) {
  for (const road of city.roads || []) {
    const pts = segments(road); const half = (road.width || 10) / 2 + 1.5;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, z1] = pts[i], [x2, z2] = pts[i + 1];
      const dx = x2 - x1, dz = z2 - z1, l2 = dx * dx + dz * dz || 1;
      let t = ((x - x1) * dx + (z - z1) * dz) / l2; t = Math.max(0, Math.min(1, t));
      if (Math.hypot(x - (x1 + dx * t), z - (z1 + dz * t)) < half) return true;
    }
  }
  return false;
}
function insideBuilding(city, x, z, pad = 1.4) {
  for (const b of city.buildings || []) if (Math.abs(x - b.x) < b.w / 2 + pad && Math.abs(z - b.z) < b.d / 2 + pad) return true;
  return false;
}
function blocked(city, x, z) {
  const B = city.bounds;
  if (x < B.minX + 4 || x > B.maxX - 4 || z < B.minZ + 4 || z > B.maxZ - 4) return true;
  if (insideBuilding(city, x, z) || onRoad(city, x, z)) return true;
  for (const o of city.roundabouts || []) if (Math.hypot(x - o.x, z - o.z) < (o.outerR || 12) + 2) return true;
  const water = city.water;
  if (water && x >= water.minX - 4 && x <= water.maxX + 4 && z >= water.minZ - 4 && z <= water.maxZ + 4) return true;
  for (const c of city.creeks || []) {
    const z0 = Math.min(c.z0, c.z1), z1 = Math.max(c.z0, c.z1);
    if (x >= c.x0 - 3 && x <= c.x1 + 3 && z >= z0 && z <= z1) return true;
  }
  return false;
}
/** True when (x, z) sits just past this building's back wall, not around the side. */
function behind(b, x, z) {
  const fx = b.face?.[0] || 0, fz = b.face?.[1] || -1;
  const wall = Math.abs(fx) > 0.5
    ? (fx > 0 ? (b.x - b.w / 2) - x : x - (b.x + b.w / 2))
    : (fz > 0 ? (b.z - b.d / 2) - z : z - (b.z + b.d / 2));
  if (wall < 2.2 || wall > 16) return false;
  const along = Math.abs(fx) > 0.5 ? Math.abs(z - b.z) : Math.abs(x - b.x);
  const half = (Math.abs(fx) > 0.5 ? b.d : b.w) / 2 + 1;
  return along <= half;
}
function nearestBuilding(city, x, z) {
  let best = null, bd = Infinity;
  for (const b of city.buildings || []) {
    const dx = Math.max(Math.abs(x - b.x) - b.w / 2, 0), dz = Math.max(Math.abs(z - b.z) - b.d / 2, 0);
    const d = Math.hypot(dx, dz); if (d < bd) { bd = d; best = b; }
  }
  return best;
}
/** Points just behind the back wall. A wide building can offer a left and right spot as well as the middle. */
function backs(b) {
  const fx = b.face?.[0] || 0, fz = b.face?.[1] || -1;
  const px = -fz, pz = fx;
  const span = Math.abs(fx) > 0.5 ? b.d : b.w;
  const alongs = span >= 28 ? [-span * 0.28, 0, span * 0.28] : [0];
  const out = [];
  for (const gap of [3.6, 8, 14]) for (const along of alongs) {
    const p = [b.x - fx * (b.w / 2 + gap) + px * along, b.z - fz * (b.d / 2 + gap) + pz * along];
    if (behind(b, p[0], p[1])) out.push(p);
  }
  return out;
}
function candidates(city) {
  const out = [];
  for (const b of city.buildings || []) for (const p of backs(b)) {
    if (blocked(city, p[0], p[1])) continue;
    const near = nearestBuilding(city, p[0], p[1]);
    if (!near || !behind(near, p[0], p[1])) continue;
    out.push(p);
  }
  return out;
}
function minDist(p, chosen) {
  let d = Infinity; for (const q of chosen) d = Math.min(d, Math.hypot(p[0] - q[0], p[1] - q[1])); return d;
}
function pick(city, n) {
  const pool = candidates(city);
  if (!pool.length) throw new Error(`${city.id} has no back-of-building spots`);
  const B = city.bounds;
  let seed = pool[0], sd = Infinity;
  for (const p of pool) { const d = Math.hypot(p[0] - B.minX, p[1] - B.minZ); if (d < sd) { sd = d; seed = p; } }
  const chosen = [seed];
  while (chosen.length < n) {
    let best = null, bestD = -1;
    for (const p of pool) { const d = minDist(p, chosen); if (d > bestD) { bestD = d; best = p; } }
    if (!best || bestD < 30) break;
    chosen.push(best);
  }
  if (chosen.length < n) throw new Error(`${city.id} only found ${chosen.length}/${n} spots far enough apart`);
  let near = Infinity;
  for (let i = 0; i < chosen.length; i++) for (let j = i + 1; j < chosen.length; j++) near = Math.min(near, Math.hypot(chosen[i][0] - chosen[j][0], chosen[i][1] - chosen[j][1]));
  return { chosen, near: chosen.length < 2 ? 0 : near };
}

const all = []; const seq = {};
for (const [id, n, slug] of QUOTA) {
  const city = load(id);
  const { chosen, near } = pick(city, n);
  for (const p of chosen) {
    const k = seq[slug] = (seq[slug] || 0) + 1;
    all.push({ id: `tr-${slug}-${String(k).padStart(2, '0')}`, city: id, x: Math.round(p[0] * 10) / 10, z: Math.round(p[1] * 10) / 10 });
  }
  console.log(id, chosen.length, 'closest pair', Math.round(near) + 'm');
}
if (all.length !== 100) throw new Error('expected 100, got ' + all.length);
if (new Set(all.map(t => t.id)).size !== 100) throw new Error('duplicate ids');
fs.writeFileSync(out, JSON.stringify(all, null, 2) + '\n');
console.log('wrote', all.length);
