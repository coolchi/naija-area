// Small kit for generating district configs (10 Oct 2026): seeded random, road/loop geometry, block filling, templates cloned from the Lagos mainland config.
import fs from 'node:fs';
export const clone = (o) => JSON.parse(JSON.stringify(o));
export const r1 = (n) => Math.round(n * 100) / 100;
export function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
export const loadMainland = () => JSON.parse(fs.readFileSync(new URL('../../server/config/cities/lagos-mainland.json', import.meta.url), 'utf8'));
const bez = (a, c, b, n = 24) => Array.from({ length: n + 1 }, (_, i) => { const t = i / n; return [r1((1 - t) ** 2 * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0]), r1((1 - t) ** 2 * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1])]; });
const plen = (p) => r1(p.slice(1).reduce((s, q, i) => s + Math.hypot(q[0] - p[i][0], q[1] - p[i][1]), 0));
/** a gently curved road from a to b bulging toward `c` */
export const curveRoad = (id, name, a, c, b, width = 10) => { const pts = bez(a, c, b, 24); return { id, name, kind: 'curve', width, pts, length: plen(pts) }; };
/** closed out-and-back loop along a polyline, offset left and right of its centreline */
export function outAndBack(pts, off = 2.6) {
  const side = (s) => pts.map((p, i) => { const q = pts[Math.min(pts.length - 1, i + 1)], o = pts[Math.max(0, i - 1)]; const dx = q[0] - o[0], dz = q[1] - o[1], L = Math.hypot(dx, dz) || 1; return [r1(p[0] - dz / L * off * s), r1(p[1] + dx / L * off * s)]; });
  return [...side(1), ...side(-1).reverse()];
}
/** rectangular loop around a cell, inset from the road centrelines, rounded corners; corners with a roundabout go around it */
export function cellLoop(x0, x1, z0, z1, inset, corners) { // corners: {nw,ne,se,sw}: number radius or {cx,cz,R}
  const C = { nw: [x0 + inset, z0 + inset], ne: [x1 - inset, z0 + inset], se: [x1 - inset, z1 - inset], sw: [x0 + inset, z1 - inset] }; const order = ['nw', 'ne', 'se', 'sw']; const dirs = { nw: [[0, -1], [1, 0]], ne: [[1, 0], [0, 1]], se: [[0, 1], [-1, 0]], sw: [[-1, 0], [0, -1]] }; // [incoming dir, outgoing dir], clockwise on screen (z down)
  const out = [];
  for (const k of order) { const c = C[k], [din, dout] = dirs[k], spec = corners[k] ?? 9;
    if (typeof spec === 'number') { const a = [c[0] - din[0] * spec, c[1] - din[1] * spec], b = [c[0] + dout[0] * spec, c[1] + dout[1] * spec]; out.push(...bez(a, c, b, 6)); }
    else { const { cx, cz, R } = spec, h = Math.sqrt(R * R - inset * inset);
      const ux = k === 'nw' || k === 'sw' ? 1 : -1, uz = k === 'nw' || k === 'ne' ? 1 : -1; // from the crossing (a cell corner) toward the inside of the cell
      const horizIn = din[0] !== 0; const pin = horizIn ? [cx + ux * h, cz + uz * inset] : [cx + ux * inset, cz + uz * h], pout = horizIn ? [cx + ux * inset, cz + uz * h] : [cx + ux * h, cz + uz * inset];
      let a1 = Math.atan2(pin[1] - cz, pin[0] - cx), a2 = Math.atan2(pout[1] - cz, pout[0] - cx), d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; for (let i = 0; i <= 8; i++) { const a = a1 + d * i / 8; out.push([r1(cx + Math.cos(a) * R), r1(cz + Math.sin(a) * R)]); } }
  }
  return out;
}
export const rectsOverlap = (a, b, m = 0) => a.x0 - m < b.x1 && a.x1 + m > b.x0 && a.z0 - m < b.z1 && a.z1 + m > b.z0;
export const rectOf = (b, pad = 0) => ({ x0: b.x - b.w / 2 - pad, x1: b.x + b.w / 2 + pad, z0: b.z - b.d / 2 - pad, z1: b.z + b.d / 2 + pad });
export const distToPoly = (x, z, pts) => { let m = 1e9; for (let i = 1; i < pts.length; i++) { const [ax, az] = pts[i - 1], [bx, bz] = pts[i]; const dx = bx - ax, dz = bz - az, L2 = dx * dx + dz * dz || 1; const t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / L2)); m = Math.min(m, Math.hypot(x - ax - dx * t, z - az - dz * t)); } return m; };
