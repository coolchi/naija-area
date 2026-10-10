// Road data format v2: curved roads (polylines) + roundabouts + dense traffic loops that follow them.
// Usage: node tools/add-curves.mjs   (applies to server/config/cities/lagos-mainland.json in place, idempotent)
// gen-city.mjs also calls applyCurves() so a regenerated city has the same road mix. Most roads stay straight (the grid);
// a minority curve (3 of 15 roads here), and 4 junctions become roundabouts. All sizes are placeholders (ESTIMATE).
import fs from 'node:fs'; import { fileURLToPath } from 'node:url';
import { arcPts, bezierPts, offsetPoly, filletPts, circulate, laneRingPoint, polyLen } from '../client/src/roadgeom.js';
const LANE = 3.5;
const RA_DEFS = [
  { id: 'ra1', name: 'Danfo Roundabout', x: -120, z: -120 }, { id: 'ra2', name: 'Bridge Roundabout', x: 120, z: -120 },
  { id: 'ra3', name: 'Okada Roundabout', x: -120, z: 120 }, { id: 'ra4', name: 'Lagoon Roundabout', x: 120, z: 120 }
].map(r => ({ ...r, outerR: 15, islandR: 6 }));
/** a crescent: leaves a straight N-S road at (X, z0), bulges `dir` (+1 east, -1 west) by `a`, and rejoins at (X, z1) */
function crescent(X, z0, z1, dir, a) { const cz = (z0 + z1) / 2, b = (z1 - z0) / 2; const out = []; for (let i = 0; i <= 48; i++) { const t = -Math.PI / 2 + Math.PI * i / 48; out.push([+(X + dir * a * Math.cos(t)).toFixed(2), +(cz + b * Math.sin(t)).toFixed(2)]); } return out; }
export const CURVES = [
  { id: 'cv1', name: 'Yaba Crescent', width: 10, pts: crescent(-120, -100, -62, 1, 40), loop: { X: -120, z0: -100, z1: -62, dir: 1, a: 40, npcs: ['keke', 'car', 'okada'] } },
  { id: 'cv2', name: 'Unity Crescent', width: 10, pts: crescent(0, -100, -62, -1, 40), loop: { X: 0, z0: -100, z1: -62, dir: -1, a: 40, npcs: ['car', 'keke'] } },
  { id: 'cv3', name: 'Ikeja Bend', width: 10, pts: bezierPts([120, -5], [168, -26], [192, 16], [240, -5], 2).map(p => [+p[0].toFixed(2), +p[1].toFixed(2)]) }
];
const rd = (p) => [+p[0].toFixed(2), +p[1].toFixed(2)];
const nzv = (v) => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };
/** dense closed lane path for a rectangular ring of corner nodes; corners within 16 m of a roundabout circulate it, others get a rounded corner */
export function laneLoop(corners, ras) {
  const lane = offsetPoly(corners, LANE, true); const N = lane.length; const out = [];
  for (let i = 0; i < N; i++) {
    const P = lane[i], prev = lane[(i + N - 1) % N], next = lane[(i + 1) % N];
    const ra = ras.find(r => Math.hypot(corners[i][0] - r.x, corners[i][1] - r.z) < 16);
    if (ra) { const Rc = (ra.outerR + ra.islandR) / 2; const d1 = nzv([P[0] - prev[0], P[1] - prev[1]]), d2 = nzv([next[0] - P[0], next[1] - P[1]]); const E = laneRingPoint([ra.x, ra.z], Rc, P, d1, false), X = laneRingPoint([ra.x, ra.z], Rc, P, d2, true); out.push(...circulate([ra.x, ra.z], Rc, E, X)); }
    else out.push(...filletPts(prev, P, next, 7, 8));
  }
  return out.map(rd);
}
/** lane loop for a crescent: along the crescent in its direction of travel, then back along the straight road it leaves. Joins are smooth cubic beziers. */
export function crescentLoop(L) {
  const run0 = crescent(L.X, L.z0, L.z1, L.dir, L.a); const run = L.dir > 0 ? run0 : run0.slice().reverse(); const h = L.dir > 0 ? [0, -1] : [0, 1]; // closure heading
  const runL = offsetPoly(run, LANE, false); const J = 9; const cum = [0]; for (let i = 1; i < runL.length; i++) cum.push(cum[i - 1] + Math.hypot(runL[i][0] - runL[i - 1][0], runL[i][1] - runL[i - 1][1]));
  let i0 = 0; while (cum[i0] < J) i0++; let i1 = runL.length - 1; while (cum[runL.length - 1] - cum[i1] < J) i1--;
  const xc = L.X + (h[1] < 0 ? LANE : -LANE); const tan = (i) => nzv([runL[Math.min(runL.length - 1, i + 1)][0] - runL[Math.max(0, i - 1)][0], runL[Math.min(runL.length - 1, i + 1)][1] - runL[Math.max(0, i - 1)][1]]);
  const V1 = [xc, runL[0][1]], A = [V1[0] - h[0] * J, V1[1] - h[1] * J], B = runL[i0], t0 = tan(i0), k = 5;
  const V2 = [xc, runL[runL.length - 1][1]], A2 = [V2[0] + h[0] * J, V2[1] + h[1] * J], B2 = runL[i1], t1 = tan(i1);
  const join1 = bezierPts(A, [A[0] + h[0] * k, A[1] + h[1] * k], [B[0] - t0[0] * k, B[1] - t0[1] * k], B, 1.5), join2 = bezierPts(B2, [B2[0] + t1[0] * k, B2[1] + t1[1] * k], [A2[0] - h[0] * k, A2[1] - h[1] * k], A2, 1.5);
  return [...join1, ...runL.slice(i0 + 1, i1), ...join2].map(rd);
}
const rect = (x0, z0, x1, z1) => [[x0, z0], [x1, z0], [x1, z1], [x0, z1]];
export function applyCurves(city) {
  if ((city.roadFormat || 1) >= 2) return city;
  city.roundabouts = RA_DEFS.map(r => ({ ...r }));
  for (const c of CURVES) { const pts = c.pts; city.roads.push({ id: c.id, name: c.name, kind: 'curve', width: c.width, pts, length: Math.round(polyLen(pts)) }); }
  const old = new Map((city.trafficLoops || []).map(l => [l.id, l])); const loops = [];
  const ring = (id, x0, z0, x1, z1) => loops.push({ id, pts: laneLoop(rect(x0, z0, x1, z1), city.roundabouts), npcs: old.get(id)?.npcs || ['car'], dense: true });
  ring('big', -120, -120, 120, 120); ring('nw', -120, -120, 0, 0); ring('ne', 0, -120, 120, 0); ring('se', 0, 0, 120, 120); ring('sw', -120, 0, 0, 120);
  for (const c of CURVES) if (c.loop) loops.push({ id: c.id + '-loop', pts: crescentLoop(c.loop), npcs: c.loop.npcs, dense: true });
  city.trafficLoops = loops; city.roadFormat = 2; return city;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const f = new URL('../server/config/cities/lagos-mainland.json', import.meta.url); const city = JSON.parse(fs.readFileSync(f, 'utf8')); applyCurves(city); fs.writeFileSync(f, JSON.stringify(city, null, 1)); console.log('applied: roads', city.roads.length, 'roundabouts', city.roundabouts.length, 'loops', city.trafficLoops.map(l => `${l.id}:${l.pts.length}`).join(' '));
}
