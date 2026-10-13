// Route finding and the autopilot, pure (no DOM, no THREE). Uses the SAME road data as the 3D world, the traffic and the map (roadgeom.js roadAt):
// straight roads, curved polylines and roundabouts. A route is a polyline of [x,z] points from the player to the place, preferring the streets and
// avoiding buildings and water (grid A* with string pulling).
// Everything here is client-side guidance and movement only: fares, travel quotes and the ledger stay on the server and are untouched.
import { polyLen, roadAt } from './roadgeom.js';

/** speeds used for the ETA (m/s). ESTIMATES: walking matches the controller (5.2 m/s), driving is a typical average with corners and junctions. */
export const NAV = { walk: 5.2, drive: 9, driveMax: 11, arriveWalk: 1.4, arriveDrive: 3.6, stuckSeconds: 2.6, stuckMetres: 0.6, nearEnough: 12, snapMax: 60 };
export const etaSeconds = (length, mode = 'walk') => Math.max(1, Math.round(length / (mode === 'drive' ? NAV.drive : NAV.walk)));
export const etaLabel = (sec) => sec < 45 ? `~${Math.max(5, Math.round(sec / 5) * 5)} s` : `~${Math.max(1, Math.round(sec / 60))} min`;
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
/** collision rectangles the way the world builds them (buildings with a 0.6 m margin, roundabout islands) so tests and tools do not need THREE */
export function collidersFromCity(city) {
  const out = []; for (const b of city.buildings || []) { const hw = b.w / 2, hd = b.d / 2; out.push({ x0: b.x - hw - 0.6, x1: b.x + hw + 0.6, z0: b.z - hd - 0.6, z1: b.z + hd + 0.6 }); }
  for (const o of city.roundabouts || []) { const q = o.islandR * 0.62; out.push({ x0: o.x - q, x1: o.x + q, z0: o.z - q, z1: o.z + q }); } return out;
}
const COST = { walk: { road: 0.75, off: 1, r: 1.6 }, drive: { road: 0.35, off: 1.6, r: 3.2 } };
/** walkable grid of the city: which cells are streets (roads, curves, roundabouts, via roadAt) and which are blocked for a walker or a car (building boxes grown by the body radius, water) */
export function buildGrid(city, colliders = collidersFromCity(city), cell = 2) {
  const B = city.bounds, x0 = B.minX, z0 = B.minZ, nx = Math.ceil((B.maxX - B.minX) / cell) + 1, nz = Math.ceil((B.maxZ - B.minZ) / cell) + 1; const road = new Uint8Array(nx * nz), blocked = { walk: new Uint8Array(nx * nz), drive: new Uint8Array(nx * nz) };
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) { const x = x0 + i * cell, z = z0 + j * cell; if (roadAt(city, x, z, 0.5)) road[j * nx + i] = 1; if (city.water && x >= city.water.minX && x <= city.water.maxX && z >= city.water.minZ && z <= city.water.maxZ) blocked.walk[j * nx + i] = blocked.drive[j * nx + i] = 1; }
  for (const m of ['walk', 'drive']) { const r = COST[m].r; for (const c of colliders) { const i0 = Math.max(0, Math.floor((c.x0 - r - x0) / cell)), i1 = Math.min(nx - 1, Math.ceil((c.x1 + r - x0) / cell)), j0 = Math.max(0, Math.floor((c.z0 - r - z0) / cell)), j1 = Math.min(nz - 1, Math.ceil((c.z1 + r - z0) / cell)); for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) { const x = x0 + i * cell, z = z0 + j * cell; if (x > c.x0 - r && x < c.x1 + r && z > c.z0 - r && z < c.z1 + r) blocked[m][j * nx + i] = 1; } }
    for (let i = 0; i < nx; i++) { blocked[m][i] = 1; blocked[m][(nz - 1) * nx + i] = 1; } for (let j = 0; j < nz; j++) { blocked[m][j * nx] = 1; blocked[m][j * nx + nx - 1] = 1; } }
  return { x0, z0, cell, nx, nz, road, blocked };
}
class Heap { constructor() { this.a = []; } push(k, v) { const a = this.a; a.push([k, v]); let i = a.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (a[p][0] <= a[i][0]) break; [a[p], a[i]] = [a[i], a[p]]; i = p; } } pop() { const a = this.a, top = a[0], last = a.pop(); if (a.length) { a[0] = last; let i = 0; for (;;) { let l = 2 * i + 1, r = l + 1, m = i; if (l < a.length && a[l][0] < a[m][0]) m = l; if (r < a.length && a[r][0] < a[m][0]) m = r; if (m === i) break; [a[m], a[i]] = [a[i], a[m]]; i = m; } } return top; } get size() { return this.a.length; } }
/** route from [x,z] to [x,z]; mode 'walk' or 'drive'. Streets are cheaper than open ground, buildings and water are avoided. null when unreachable. */
export function findRoute(grid, from, to, mode = 'walk') {
  const { x0, z0, cell, nx, nz, road } = grid, blk = grid.blocked[mode], C = COST[mode]; const cx = (x) => Math.round((x - x0) / cell), cz = (z) => Math.round((z - z0) / cell);
  const inb = (i, j) => i >= 0 && j >= 0 && i < nx && j < nz;
  const free = (x, z) => { let i = cx(x), j = cz(z); if (inb(i, j) && !blk[j * nx + i]) return [i, j]; const rings = Math.max(1, Math.ceil(NAV.snapMax / cell)); for (let r = 1; r <= rings; r++) { let best = null, bd = Infinity; for (let dj = -r; dj <= r; dj++) for (let di = -r; di <= r; di++) { if (Math.max(Math.abs(di), Math.abs(dj)) !== r) continue; const ii = i + di, jj = j + dj; if (!inb(ii, jj) || blk[jj * nx + ii]) continue; const d = Math.hypot(di, dj); if (d < bd) { bd = d; best = [ii, jj]; } } if (best) return best; } return null; };
  const S = free(from[0], from[1]), T = free(to[0], to[1]); if (!S || !T) return null; const si = S[1] * nx + S[0], ti = T[1] * nx + T[0];
  const g = new Float32Array(nx * nz).fill(Infinity), prev = new Int32Array(nx * nz).fill(-1), closed = new Uint8Array(nx * nz); const H = new Heap(); const hmin = Math.min(C.road, C.off) * cell; const hf = (i, j) => Math.hypot(i - T[0], j - T[1]) * hmin;
  g[si] = 0; H.push(hf(S[0], S[1]), si); let found = false;
  while (H.size) { const [, u] = H.pop(); if (closed[u]) continue; closed[u] = 1; if (u === ti) { found = true; break; } const ui = u % nx, uj = (u / nx) | 0;
    for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) { if (!di && !dj) continue; const vi = ui + di, vj = uj + dj; if (!inb(vi, vj)) continue; const v = vj * nx + vi; if (blk[v] || closed[v]) continue; if (di && dj && (blk[uj * nx + vi] || blk[vj * nx + ui])) continue;
      const step = Math.hypot(di, dj) * cell * ((road[u] && road[v]) ? C.road : road[v] ? (C.road + C.off) / 2 : C.off); const ng = g[u] + step; if (ng < g[v]) { g[v] = ng; prev[v] = u; H.push(ng + hf(vi, vj), v); } } }
  if (!found) return null; const cells = []; for (let v = ti; v >= 0; v = prev[v]) cells.push(v); cells.reverse();
  let pts = [from, ...cells.map(v => [x0 + (v % nx) * cell, z0 + ((v / nx) | 0) * cell]), to];
  // string-pull: cut corners where the straight line is clear (cars only along the same kind of ground, so they keep to the streets)
  const roadAtP = (x, z) => { const i = cx(x), j = cz(z); return inb(i, j) && road[j * nx + i]; }; const clear = (a, b) => { const L = dist(a, b), n = Math.max(1, Math.ceil(L / 1)); let r0 = null; for (let k = 0; k <= n; k++) { const x = a[0] + (b[0] - a[0]) * k / n, z = a[1] + (b[1] - a[1]) * k / n, i = cx(x), j = cz(z); if (!inb(i, j) || blk[j * nx + i]) return false; if (mode === 'drive') { const r = !!roadAtP(x, z); if (r0 === null) r0 = r; else if (r !== r0) return false; } } return true; };
  const out = [pts[0]]; let i = 0; while (i < pts.length - 1) { let j = pts.length - 1; while (j > i + 1 && !clear(pts[i], pts[j])) j--; out.push(pts[j]); i = j; }
  const dd = dedupe(out); return { pts: dd, length: polyLen(dd), mode };
}
function dedupe(pts, eps = 0.35) { const o = []; for (const p of pts) if (!o.length || dist(o[o.length - 1], p) > eps) o.push(p); return o; }
export const remaining = (pts, i, x, z) => { if (i >= pts.length) return 0; let s = Math.hypot(pts[i][0] - x, pts[i][1] - z); for (let k = i + 1; k < pts.length; k++) s += dist(pts[k], pts[k - 1]); return s; };

const angDiff = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a)); const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
/** Autopilot: follows a route polyline on foot or by car. Pure state machine; the controller applies collisions afterwards and calls observe() for stuck detection. */
export class Auto {
  constructor(pts, kind = 'walk') { this.pts = pts; this.kind = kind; this.i = 1; this.done = false; this.stuck = false; this.t = 0; this.ref = null; }
  /** one step: returns the new { x, z, ry, v } */
  step(x, z, ry, v, dt) {
    const P = this.pts, drive = this.kind === 'drive', arrive = drive ? NAV.arriveDrive : NAV.arriveWalk;
    while (this.i < P.length && Math.hypot(P[this.i][0] - x, P[this.i][1] - z) < (this.i === P.length - 1 ? arrive : (drive ? 4.5 : 0.8))) this.i++;
    if (this.i >= P.length) { this.done = true; return { x, z, ry, v: 0 }; }
    const tgt = P[this.i], dx = tgt[0] - x, dz = tgt[1] - z, d = Math.hypot(dx, dz) || 1, want = Math.atan2(-dz, dx), err = angDiff(ry, want);
    if (!drive) { const nry = ry + err * Math.min(1, dt * 12); const sp = NAV.walk; return { x: x + dx / d * sp * dt, z: z + dz / d * sp * dt, ry: nry, v: sp }; }
    // driving: steer to the next point, slow for corners (turn angle two points ahead) and for the end of the route
    let turn = 0; if (this.i + 1 < P.length) { const h1 = Math.atan2(-(P[this.i][1] - z), P[this.i][0] - x), h2 = Math.atan2(-(P[this.i + 1][1] - P[this.i][1]), P[this.i + 1][0] - P[this.i][0]); turn = Math.abs(angDiff(h1, h2)); }
    const rem = remaining(P, this.i, x, z); const corner = d < 16 ? NAV.driveMax * (1 - 0.72 * Math.min(1, turn / 1.2)) : NAV.driveMax; const vt = Math.max(2, Math.min(corner, Math.sqrt(2 * 7 * Math.max(0, rem - arrive)) + 1.5, Math.abs(err) > 0.7 ? 4 : NAV.driveMax));
    const nv = v < vt ? Math.min(vt, v + 6 * dt) : Math.max(vt, v - 12 * dt); const nry = ry + clamp(err * 3, -1.9, 1.9) * dt * Math.min(1, 0.4 + nv / 5);
    return { x: x + Math.cos(nry) * nv * dt, z: z - Math.sin(nry) * nv * dt, ry: nry, v: nv };
  }
  /** call after collisions with the real position: flags `stuck` when the vehicle makes no progress for a few seconds */
  observe(x, z, dt) { this.t += dt; if (!this.ref) this.ref = { x, z }; if (this.t >= NAV.stuckSeconds) { if (Math.hypot(x - this.ref.x, z - this.ref.z) < NAV.stuckMetres) this.stuck = true; this.t = 0; this.ref = { x, z }; } }
}
/** markers for the player's homes on the map: 0, 1 or several. `user.home` is the current home; `user.homes` (optional, future) lists more. */
export function homeMarkers(user) { const list = [...(user?.homes || []), ...(user?.home ? [user.home] : [])]; const seen = new Set(); const out = []; for (const h of list) { if (!h || seen.has(h.id) || !h.door) continue; seen.add(h.id); out.push({ id: h.id, name: h.name, x: h.door.x, z: h.door.z, tier: h.tierLabel, area: h.area }); } return out; }
