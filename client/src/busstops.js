// Bus stops: pure logic (no THREE), unit-tested. Danfos (and some keke) on the traffic loops slow down, stop at a stop for a few seconds so NPC passengers can board and alight, then pull away.
// It only affects how the ambient vehicle is drawn on YOUR device (like traffic yielding); the paid ride for a player is the normal server travel/fare flow. All numbers are ESTIMATE placeholders.
export const STOP_CFG = {
  brake: 24,            // m: a serving vehicle starts to brake this far before the stop
  stopOffset: 0.4,      // m: stops with its nose this far before the pole
  comfyDecel: 5.2,      // m/s^2 braking for the stop (gentler than an emergency stop)
  dwellMin: 3, dwellMax: 5.5, // s: how long a vehicle waits at the stop
  leaveDist: 14,        // m after the stop before the vehicle counts as "gone"
  serve: { danfo: 1, keke: 0.4, car: 0, okada: 0 }, // share of vehicles of each type that serve stops (the rest drive past)
  waitMin: 10, waitMax: 24, // s: how long a player waits for a call (server uses its own copy in balance.bus)
  pickupLead: 85,       // m: the player's danfo starts this far behind the stop
  boardRange: 12        // m: the player must be this close to the stop to call or board
};
const mod = (a, L) => ((a % L) + L) % L;
/** where a world point projects onto a closed path: s in the path's own length units, d = distance from the path */
export function locateOnPath(P, x, z) {
  let best = { s: 0, d: Infinity }; const n = P.pts.length;
  for (let i = 0; i < n; i++) { const a = P.pts[i], b = P.pts[(i + 1) % n]; const dx = b[0] - a[0], dz = b[1] - a[1]; const l2 = dx * dx + dz * dz || 1e-9; const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / l2)); const px = a[0] + dx * t, pz = a[1] + dz * t; const d = Math.hypot(x - px, z - pz); if (d < best.d) best = { d, s: P.cum[i] + (P.cum[i + 1] - P.cum[i]) * t }; }
  return best;
}
/** the stops of a loop as positions along its path (sorted): [{ id, s }] */
export function stopsOnLoop(P, stops, loopId) { return stops.filter(b => b.loop === loopId).map(b => ({ id: b.id, s: locateOnPath(P, b.x, b.z).s })).sort((a, b) => a.s - b.s); }
/** top speed that still lets the vehicle stop in `dist` metres at a comfortable deceleration */
export const stopCap = (dist, decel = STOP_CFG.comfyDecel) => Math.sqrt(2 * decel * Math.max(0, dist));
/** does this vehicle (identified by a stable number and type) serve stops? deterministic */
export function serves(type, n, cfg = STOP_CFG) { const share = cfg.serve[type] ?? 0; if (share >= 1) return true; if (share <= 0) return false; const x = Math.imul(n + 7, 2654435761) >>> 0; return (x % 1000) / 1000 < share; }
export const newStop = () => ({ phase: 'none', idx: -1, t: 0, dwellFor: 0 });
/** one step of a serving vehicle. st = newStop() state (mutated); s = its position on the path; v = speed; stopsS = [{id,s}] sorted; L = path length; rnd = a random 0..1.
 *  Returns { cap: top speed allowed now, dwell: true while standing at the stop, phase } */
export function stopStep(st, s, v, L, stopsS, dt, rnd, cfg = STOP_CFG) {
  if (!stopsS.length) return { cap: Infinity, dwell: false, phase: 'none' };
  if (st.phase === 'none') { let bi = -1, bd = Infinity; stopsS.forEach((b, i) => { const d = mod(b.s - s, L); if (d < bd) { bd = d; bi = i; } }); if (bd < cfg.brake && bd > 0.2) { st.phase = 'approach'; st.idx = bi; st.t = 0; } else return { cap: Infinity, dwell: false, phase: 'none' }; }
  const stop = stopsS[st.idx]; const d = mod(stop.s - s, L); const past = mod(s - stop.s, L);
  if (st.phase === 'approach') {
    if (d > cfg.brake + 6 && past > 1) { st.phase = 'none'; return { cap: Infinity, dwell: false, phase: 'none' }; } // something odd (teleported): forget it
    if (past > 0.5 && past < L / 2) { st.phase = 'dwell'; st.t = cfg.dwellMin + rnd * (cfg.dwellMax - cfg.dwellMin); return { cap: 0, dwell: v < 0.4, phase: 'dwell' }; } // slid a little past: stop here
    if (d - cfg.stopOffset <= 0.15 || (v < 0.35 && d < 3)) { st.phase = 'dwell'; st.t = cfg.dwellMin + rnd * (cfg.dwellMax - cfg.dwellMin); return { cap: 0, dwell: v < 0.4, phase: 'dwell' }; }
    return { cap: Math.max(0.6, stopCap(d - cfg.stopOffset, cfg.comfyDecel)), dwell: false, phase: 'approach' };
  }
  if (st.phase === 'dwell') { st.t -= dt; if (st.t <= 0 && !st.hold) { st.phase = 'leave'; return { cap: Infinity, dwell: false, phase: 'leave' }; } return { cap: 0, dwell: v < 0.4, phase: 'dwell' }; }
  if (past > cfg.leaveDist && past < L / 2) { st.phase = 'none'; st.idx = -1; return { cap: Infinity, dwell: false, phase: 'none' }; }
  return { cap: Infinity, dwell: false, phase: 'leave' };
}
/** a call for a player's danfo: start position along the loop (before the stop) */
export const pickupStart = (stopS, L, lead = STOP_CFG.pickupLead) => mod(stopS - lead, L);
