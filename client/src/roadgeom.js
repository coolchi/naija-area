// Road geometry shared by the 3D world, traffic, the map and the tests. Pure functions, no DOM, no THREE.
// Road data format v2 (city JSON): a road is EITHER straight { x1,z1,x2,z2,width } OR curved { pts:[[x,z],...], width, kind:'curve' }
// (a sampled polyline). city.roundabouts = [{ id, name, x, z, outerR, islandR }]. Everything that reads roads must go through roadPts().
export const roadPts = (r) => r.pts ? r.pts : [[r.x1, r.z1], [r.x2, r.z2]];
export const isCurved = (r) => !!r.pts;
export const polyLen = (pts) => { let s = 0; for (let i = 1; i < pts.length; i++) s += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return s; };
export const roadMid = (r) => { const p = roadPts(r); const L = polyLen(p); return pointAt(p, L / 2); };
export function pointAt(pts, s) { let acc = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (acc + d >= s || i === pts.length - 1) { const t = d ? Math.min(1, (s - acc) / d) : 0; return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t, Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0])]; } acc += d; } return [pts[0][0], pts[0][1], 0]; }
export function distToSeg(px, pz, a, b) { const dx = b[0] - a[0], dz = b[1] - a[1]; const l2 = dx * dx + dz * dz; const t = l2 ? Math.max(0, Math.min(1, ((px - a[0]) * dx + (pz - a[1]) * dz) / l2)) : 0; const x = a[0] + dx * t, z = a[1] + dz * t; return { d: Math.hypot(px - x, pz - z), t, x, z }; }
/** nearest point on a polyline: { d, s (distance along), x, z } */
export function nearestOnPoly(pts, px, pz) { let best = { d: Infinity, s: 0, x: 0, z: 0 }, acc = 0; for (let i = 1; i < pts.length; i++) { const seg = distToSeg(px, pz, pts[i - 1], pts[i]); const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (seg.d < best.d) best = { d: seg.d, s: acc + seg.t * l, x: seg.x, z: seg.z }; acc += l; } return best; }
/** the road (or roundabout) under a world point, or null. slack widens the road (metres). */
export function roadAt(city, x, z, slack = 0) {
  for (const o of city.roundabouts || []) { const d = Math.hypot(x - o.x, z - o.z); if (d <= o.outerR + slack && d >= (o.islandR || 0) - slack) return { kind: 'roundabout', id: o.id, name: o.name, ra: o }; }
  for (const r of city.roads) { const n = nearestOnPoly(roadPts(r), x, z); if (n.d <= r.width / 2 + slack) return { kind: isCurved(r) ? 'curve' : 'road', id: r.id, name: r.name, road: r, s: n.s }; }
  return null;
}
export function arcPts(cx, cz, r, a0, a1, maxStep = 1.5) { const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) * r / maxStep)); const out = []; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; out.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r]); } return out; }
export function bezierPts(p0, p1, p2, p3, step = 2) { const approx = polyLen([p0, p1, p2, p3]); const n = Math.max(6, Math.ceil(approx / step)); const out = []; for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; out.push([u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]); } return out; }
/** offset a polyline to its RIGHT (screen coordinates: x east, z south) by d metres. closed = loop. */
export function offsetPoly(pts, d, closed = false) {
  const n = pts.length; const out = [];
  for (let i = 0; i < n; i++) {
    const p = pts[i]; const a = closed ? pts[(i + n - 1) % n] : pts[Math.max(0, i - 1)], b = closed ? pts[(i + 1) % n] : pts[Math.min(n - 1, i + 1)];
    let dx = b[0] - a[0], dz = b[1] - a[1]; const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l; out.push([p[0] - dz * d, p[1] + dx * d]);
  }
  return out;
}
/** local turning radius at each vertex (Infinity when straight) */
export function radiusAt(pts, i, closed = true) { const n = pts.length; const a = pts[closed ? (i + n - 1) % n : Math.max(0, i - 1)], b = pts[i], c = pts[closed ? (i + 1) % n : Math.min(n - 1, i + 1)]; const ab = Math.hypot(b[0] - a[0], b[1] - a[1]), bc = Math.hypot(c[0] - b[0], c[1] - b[1]), ca = Math.hypot(a[0] - c[0], a[1] - c[1]); const area2 = Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])); return area2 < 1e-9 ? Infinity : (ab * bc * ca) / (2 * area2); }
/** speed factor in a bend: 1 on straights, SLOW_MIN at tight turns (radius <= R_TIGHT). ESTIMATE placeholders. */
export const BEND = { rTight: 7, rFree: 40, slowMin: 0.55 };
export const bendFactor = (R) => R >= BEND.rFree ? 1 : R <= BEND.rTight ? BEND.slowMin : BEND.slowMin + (1 - BEND.slowMin) * (R - BEND.rTight) / (BEND.rFree - BEND.rTight);
/** angle (rad) between successive headings, for smoothness tests */
export function maxTurnPerMetre(pts, closed = true) { let m = 0; const n = pts.length; for (let i = closed ? 0 : 1; i < (closed ? n : n - 1); i++) { const a = pts[(i + n - 1) % n], b = pts[i], c = pts[(i + 1) % n]; const h1 = Math.atan2(b[1] - a[1], b[0] - a[0]), h2 = Math.atan2(c[1] - b[1], c[0] - b[0]); let d = Math.abs(h2 - h1); if (d > Math.PI) d = 2 * Math.PI - d; const len = (Math.hypot(b[0] - a[0], b[1] - a[1]) + Math.hypot(c[0] - b[0], c[1] - b[1])) / 2; if (len > 1e-6) m = Math.max(m, d / len); } return m; }
/** rounded corner at p1 between p0 and p2 (same shape the old traffic path used: quadratic bezier, r metres each side) */
export function filletPts(p0, p1, p2, r = 7, n = 8) {
  const nz = (v) => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };
  const rr = Math.min(r, Math.hypot(p0[0] - p1[0], p0[1] - p1[1]) / 2, Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / 2);
  const a = nz([p0[0] - p1[0], p0[1] - p1[1]]), b = nz([p2[0] - p1[0], p2[1] - p1[1]]);
  const A = [p1[0] + a[0] * rr, p1[1] + a[1] * rr], B = [p1[0] + b[0] * rr, p1[1] + b[1] * rr]; const out = [];
  for (let k = 0; k <= n; k++) { const t = k / n, u = 1 - t; out.push([u * u * A[0] + 2 * u * t * p1[0] + t * t * B[0], u * u * A[1] + 2 * u * t * p1[1] + t * t * B[1]]); }
  return out;
}
/** right-hand traffic circulates counter-clockwise as seen on the map (x east, z south): the polar angle DEcreases. Arc from lane point E to lane point X around centre C. */
export function circulate(C, Rc, E, X, step = 1.4) {
  let a0 = Math.atan2(E[1] - C[1], E[0] - C[0]), a1 = Math.atan2(X[1] - C[1], X[0] - C[0]); while (a1 > a0) a1 -= Math.PI * 2; while (a1 < a0 - Math.PI * 2) a1 += Math.PI * 2;
  const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) * Rc / step)); const out = []; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; out.push([C[0] + Math.cos(a) * Rc, C[1] + Math.sin(a) * Rc]); } return out;
}
/** where the lane line through P (heading d, unit) meets the ring of radius Rc about C: entry (behind P) or exit (ahead of P) */
export function laneRingPoint(C, Rc, P, d, ahead) {
  const q = [P[0] - C[0], P[1] - C[1]]; const qd = q[0] * d[0] + q[1] * d[1]; const disc = Math.sqrt(Math.max(0, qd * qd - (q[0] * q[0] + q[1] * q[1]) + Rc * Rc));
  const t = ahead ? -qd + disc : qd + disc; return ahead ? [P[0] + d[0] * t, P[1] + d[1] * t] : [P[0] - d[0] * t, P[1] - d[1] * t];
}
