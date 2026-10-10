// Closed-loop paths for traffic and walkers (pure, no THREE). Shared by entities.js and the tests.
import { radiusAt, bendFactor } from './roadgeom.js';
// opts.dense: the points already follow the road geometry (curves, roundabouts), so no corner rounding. opts.slow: cars slow in bends (ESTIMATE factors in roadgeom BEND).
// P.cum is in "u" units (distance divided by the bend speed factor), so a car moving at constant u-speed takes bends more slowly, still deterministic from server time.
export function makePath(pts, r = 7, opts = {}) {
  const n = pts.length; let out = [];
  if (opts.dense) out = pts.map(p => [p[0], p[1]]);
  else for (let i = 0; i < n; i++) {
    const p0 = pts[(i + n - 1) % n], p1 = pts[i], p2 = pts[(i + 1) % n];
    const a = norm([p0[0] - p1[0], p0[1] - p1[1]]), b = norm([p2[0] - p1[0], p2[1] - p1[1]]);
    const A = [p1[0] + a[0] * r, p1[1] + a[1] * r], Bp = [p1[0] + b[0] * r, p1[1] + b[1] * r];
    for (let k = 0; k <= 8; k++) { const t = k / 8; out.push([(1 - t) * (1 - t) * A[0] + 2 * (1 - t) * t * p1[0] + t * t * Bp[0], (1 - t) * (1 - t) * A[1] + 2 * (1 - t) * t * p1[1] + t * t * Bp[1]]); }
  }
  const m = out.length; const f = out.map((_, i) => opts.slow ? bendFactor(radiusAt(out, i, true)) : 1);
  const cum = [0], dist = [0]; for (let i = 1; i <= m; i++) { const a = out[i - 1], b = out[i % m]; const d = Math.hypot(b[0] - a[0], b[1] - a[1]); dist.push(dist[i - 1] + d); cum.push(cum[i - 1] + d / ((f[i - 1] + f[i % m]) / 2)); }
  return { pts: out, cum, length: cum[cum.length - 1], realLength: dist[dist.length - 1], f };
}
const norm = (v) => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };
export function atPath(P, s, o) {
  s = ((s % P.length) + P.length) % P.length; let lo = 0, hi = P.cum.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (P.cum[m] <= s) lo = m; else hi = m; }
  const a = P.pts[lo], b = P.pts[(lo + 1) % P.pts.length]; const t = (s - P.cum[lo]) / Math.max(1e-6, P.cum[lo + 1] - P.cum[lo]);
  o.x = a[0] + (b[0] - a[0]) * t; o.z = a[1] + (b[1] - a[1]) * t; o.yaw = Math.atan2(-(b[1] - a[1]), b[0] - a[0]); return o;
}
