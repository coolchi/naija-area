// Street lights: where they stand and how bright each one is. Pure (no THREE) so it is unit-tested; world.js draws them (instanced) and sets their brightness from the game clock.
// Most lamps are steady, about 1 in 12 flickers, about 1 in 14 is broken and stays dark: Lagos flavour. All numbers are placeholders (ESTIMATE) in LAMP.
import { roadPts, isCurved, polyLen, pointAt, nearestOnPoly, roadAt } from './roadgeom.js';

export const LAMP = { spacing: 38, curveSpacing: 30, height: 6.4, armLen: 0.9, poolR: 7.5, poolOffset: 3.2, flickerShare: 1 / 12, brokenShare: 1 / 14, onFrom: 0.28, fullAt: 0.6, ra: 4, kerb: 1.8 };
const hash = (n) => { let x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b); x ^= x >>> 13; x = Math.imul(x, 0xc2b2ae35); x ^= x >>> 16; return (x >>> 0) / 4294967296; };
const kindOf = (i) => { const r = hash(i * 7919 + 13); return r < LAMP.brokenShare ? 'broken' : r < LAMP.brokenShare + LAMP.flickerShare ? 'flicker' : 'steady'; };

/** all lamp spots of a city: [{ x, z, fx, fz, kind, id }] where (fx, fz) is the unit direction from the pole towards the road (the lamp arm and the light pool point that way) */
export function lampPositions(city) {
  const out = []; const faceTo = (x, z) => { let best = null; for (const r of city.roads) { const n = nearestOnPoly(roadPts(r), x, z); if (!best || n.d < best.d) best = n; } for (const o of city.roundabouts || []) { const d = Math.hypot(x - o.x, z - o.z); if (d < LAMP.ra + o.outerR + 6 && (!best || d - o.outerR < best.d)) best = { d: d - o.outerR, x: o.x + (x - o.x) / d * o.outerR, z: o.z + (z - o.z) / d * o.outerR }; } if (!best) return [0, 1]; const dx = best.x - x, dz = best.z - z, l = Math.hypot(dx, dz) || 1; return [dx / l, dz / l]; };
  const add = (x, z) => { if (roadAt(city, x, z, 1.2)) return; if ((city.buildings || []).some(b => Math.abs(x - b.x) < b.w / 2 + 1.2 && Math.abs(z - b.z) < b.d / 2 + 1.2)) return; if (city.water && x >= city.water.minX && x <= city.water.maxX && z >= city.water.minZ && z <= city.water.maxZ) return; if (out.some(q => Math.hypot(q.x - x, q.z - z) < 12)) return; const [fx, fz] = faceTo(x, z); const id = out.length; out.push({ x: Math.round(x * 100) / 100, z: Math.round(z * 100) / 100, fx, fz, id, kind: kindOf(id) }); };
  for (const o of city.roundabouts || []) for (const rr of [o.outerR + 6.5, o.outerR + 9.5]) for (let i = 0; i < 4; i++) { const a = Math.PI / 4 + i * Math.PI / 2; add(o.x + Math.cos(a) * rr, o.z + Math.sin(a) * rr); } // the four corners, away from the crossing roads
  for (const r of city.roads) { if (!isCurved(r)) continue; const pts = roadPts(r), L = polyLen(pts); const n = Math.floor(L / LAMP.curveSpacing); for (let i = 1; i < n; i++) { const q = pointAt(pts, L * i / n); const side = i % 2 ? 1 : -1; const off = r.width / 2 + LAMP.kerb; add(q[0] - Math.sin(q[2]) * side * off, q[1] + Math.cos(q[2]) * side * off); } }
  for (const z of city.zones || []) { for (let x = z.x0 + 12; x < z.x1 - 6; x += LAMP.spacing) for (const zz of [z.z0 + 2, z.z1 - 2]) add(x, zz); for (let zz = z.z0 + 20; zz < z.z1 - 6; zz += LAMP.spacing) for (const xx of [z.x0 + 2, z.x1 - 2]) add(xx, zz); }
  return out;
}
const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
/** how much of the day is "lamps on": 0 in daylight, 1 at night */
export const lampsOn = (night) => smooth(LAMP.onFrom, LAMP.fullAt, night);
/** brightness 0..1 of one lamp at time t (seconds) when the lamps-on level is `level` */
export function lampLevel(lamp, level, t) {
  if (level <= 0 || lamp.kind === 'broken') return 0; if (lamp.kind !== 'flicker') return level;
  const a = Math.sin(t * 17.3 + lamp.id * 3.1) * Math.sin(t * 4.7 + lamp.id * 1.7), burst = Math.sin(t * 0.9 + lamp.id) > 0.55; return level * (burst && a > 0.15 ? 0.12 + 0.3 * Math.max(0, Math.sin(t * 31 + lamp.id)) : 1);
}
