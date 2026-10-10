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
