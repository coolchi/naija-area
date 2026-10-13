// Oya Ride client helpers (pure, unit-tested): where the driver car is along its route, and where the driver starts.
/** position along a polyline path [[x,z],...] after travelling d metres: { x, z, yaw } (yaw: game convention, forward = (cos, -sin)) */
export function posAlong(path, d) {
  if (path.length < 2) return { x: path[0]?.[0] ?? 0, z: path[0]?.[1] ?? 0, yaw: 0 }; let left = Math.max(0, d);
  for (let i = 0; i < path.length - 1; i++) { const a = path[i], b = path[i + 1]; const l = Math.hypot(b[0] - a[0], b[1] - a[1]); if (left <= l || i === path.length - 2) { const t = l ? Math.min(1, left / l) : 0; return { x: a[0] + (b[0] - a[0]) * t, z: a[1] + (b[1] - a[1]) * t, yaw: Math.atan2(-(b[1] - a[1]), b[0] - a[0]) }; } left -= l; }
}
export const pathLength = (path) => { let s = 0; for (let i = 0; i < path.length - 1; i++) s += Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]); return s; };
/** how far along (0..1) the driver should be: from request time to arrival time */
export const driverProgress = (now, requestedAt, arriveAt) => Math.max(0, Math.min(1, (now - requestedAt) / Math.max(1, arriveAt - requestedAt)));
/** candidate start points around the player at about `dist` metres (24 directions); the caller keeps the first one that is on a drivable street and has a route */
export function startCandidates(x, z, dist, n = 24) { const out = []; for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + 0.3; out.push([x + Math.cos(a) * dist, z + Math.sin(a) * dist]); } return out; }
/** street route for the Oya car. null when no road route exists, so the car is never sent in a straight line through buildings. */
export function pickDriverRoute(from, driverDist, { roadAt, findRoute, grid, city }) {
  const dists = [driverDist, driverDist * 0.7, Math.max(48, driverDist * 0.45)];
  for (const dist of dists) for (const c of startCandidates(from[0], from[1], dist)) { if (!roadAt(city, c[0], c[1], 0)) continue; const rt = findRoute(grid, c, from, 'drive'); if (rt && rt.pts.length >= 2 && rt.length > 12 && rt.length < driverDist * 4.5) return rt; }
  return null;
}
/** point and facing along a route at progress k (0..1) */
export const poseOnRoute = (pts, k) => posAlong(pts, pathLength(pts) * Math.max(0, Math.min(1, k)));
