// Pure boat motion (10 Oct 2026): where the boat is at a given time. No THREE, so tests can check it. Heading follows the game's convention: forward = (cos ry, -sin ry).
const smooth = (t) => { const c = Math.max(0, Math.min(1, t)); return c * c * (3 - 2 * c); };
export const headingOf = (dx, dz) => Math.atan2(-dz, dx);
export const unit = (ax, az, bx, bz) => { const d = Math.hypot(bx - ax, bz - az) || 1; return [(bx - ax) / d, (bz - az) / d]; };
/** the boat sails in from open water to the berth: starts `dist` metres out along `out` and slows to a stop (t01 0..1 over the wait) */
export function approachPose(berth, out, dist, t01) {
  const k = 1 - smooth(t01); const x = berth.x + out[0] * dist * k, z = berth.z + out[1] * dist * k; return { x, z, ry: headingOf(-out[0], -out[1]), speed: k > 0.001 ? 1 : 0 };
}
/** crossing from berth a to berth b; when b is in another district, pass b = null and an `out` vector: the boat sails away out of sight (`far` metres) */
export function crossPose(a, b, out, far, t01) {
  const e = smooth(t01); const to = b || { x: a.x + out[0] * far, z: a.z + out[1] * far }; const x = a.x + (to.x - a.x) * e, z = a.z + (to.z - a.z) * e; return { x, z, ry: headingOf(to.x - a.x, to.z - a.z) };
}
/** camera behind and above the boat */
export function boatCam(p, back = 16, up = 7, ahead = 8) { const fx = Math.cos(p.ry), fz = -Math.sin(p.ry); return { pos: [p.x - fx * back, up, p.z - fz * back], look: [p.x + fx * ahead, 1, p.z + fz * ahead] }; }
export function tripPhase(trip, now) {
  if (!trip) return null; if (trip.state === 'crossing') return { phase: 'crossing', t01: Math.max(0, Math.min(1, 1 - (trip.arriveAt - now) / trip.crossMs)), leftMs: Math.max(0, trip.arriveAt - now) };
  if (now < trip.boatAt) return { phase: 'arriving', t01: Math.max(0, Math.min(1, 1 - (trip.boatAt - now) / Math.max(1, trip.boatAt - trip.calledAt))), leftMs: trip.boatAt - now };
  return { phase: 'waiting', t01: 1, leftMs: Math.max(0, trip.expiresAt - now) };
}
