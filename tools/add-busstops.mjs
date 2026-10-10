// Idempotently adds bus stops to the city JSON: spaced along the traffic loops that carry danfos and keke, on the kerb side of the road, on free ground.
import fs from 'node:fs'; import { makePath } from '../client/src/path.js'; import { roadAt, nearestOnPoly, roadPts } from '../client/src/roadgeom.js';
const f = new URL('../server/config/cities/lagos-mainland.json', import.meta.url); const c = JSON.parse(fs.readFileSync(f));
const free = (x, z) => !roadAt(c, x, z, 1.5) && !c.buildings.some(b => Math.abs(x - b.x) < b.w / 2 + 2 && Math.abs(z - b.z) < b.d / 2 + 2) && !(c.water && x >= c.water.minX - 3 && x <= c.water.maxX + 3 && z >= c.water.minZ - 3 && z <= c.water.maxZ + 3) && !c.roundabouts.some(o => Math.hypot(x - o.x, z - o.z) < o.outerR + 4) && !(c.carParks || []).some(l => Math.abs(x - l.x) < l.w / 2 + 2 && Math.abs(z - l.z) < l.d / 2 + 2) && !c.plots.some(p => Math.abs(x - p.x) < p.size / 2 + 2 && Math.abs(z - p.z) < p.size / 2 + 2) && Math.abs(x) < c.bounds.maxX - 6 && z < c.bounds.maxZ - 30;
const nameOf = (x, z) => { let best = null; for (const r of c.roads) { const n = nearestOnPoly(roadPts(r), x, z); if (!best || n.d < best.d) best = { d: n.d, name: r.name }; } return best.name; };
const stops = []; const SPACING = 95;
for (const L of c.trafficLoops.filter(l => l.npcs.includes('danfo') || l.npcs.includes('keke'))) {
  const P = makePath(L.pts, 7, { dense: !!L.dense, slow: true }); const n = Math.floor(P.realLength / SPACING);
  for (let k = 0; k < n; k++) { const idx = Math.round((k + 0.5) / n * (P.pts.length - 1)); const a = P.pts[idx], b = P.pts[(idx + 1) % P.pts.length]; const fx = b[0] - a[0], fz = b[1] - a[1], l = Math.hypot(fx, fz) || 1; const ux = fx / l, uz = fz / l; let spot = null;
    for (const off of [8.6, 10, 12, 14]) { const x = a[0] - uz * off, z = a[1] + ux * off; if (free(x, z)) { spot = { x, z, side: 1 }; break; } }
    if (!spot) continue; if (stops.some(s => Math.hypot(s.x - spot.x, s.z - spot.z) < 45)) continue; stops.push({ x: Math.round(spot.x * 10) / 10, z: Math.round(spot.z * 10) / 10, loop: L.id, ry: Math.round(Math.atan2(-uz, ux) * 100) / 100 }); }
}
const names = new Map(); c.busStops = stops.map((s, i) => { const base = nameOf(s.x, s.z); const nn = (names.get(base) || 0) + 1; names.set(base, nn); return { id: `bs${String(i + 1).padStart(2, '0')}`, name: `${base} bus stop${nn > 1 ? ' ' + nn : ''}`, ...s }; });
fs.writeFileSync(f, JSON.stringify(c, null, 1)); console.log('bus stops', c.busStops.length, c.busStops.map(s => `${s.id}:${s.loop}`).join(' '));
