// Traffic yielding (client-side only: never touches server state, fares or the ledger). Pure functions so they can be unit-tested.
// All numbers are placeholders (ESTIMATE) in ONE config.
export const YIELD_CFG = {
  lookAhead: 14,        // m: how far ahead a vehicle looks
  halfWidth: 2.2,       // m: half-width of the look-ahead box
  stopGap: 3.2,         // m: bumper-to-blocker distance to stop at
  minGap: 1.8,          // m: never closer than this to a person, even after the wait
  maxDecel: 14, maxAccel: 6, // m/s^2
  waitMin: 2, waitMax: 4,    // s: how long a car waits before it honks and creeps / ignores other cars
  creepSpeed: 1.2,      // m/s after the wait for people (stays outside minGap)
  ignoreCarsFor: 3,     // s: after waiting this long on another car (deadlock at a crossing) cars ignore cars for a while
  catchUp: 1.25,        // speed factor while catching back up to the shared timeline
  hornGapSpeed: 5       // m/s: only horn when braking from at least this speed
};
/** distance along the car's heading to the nearest blocker inside the look-ahead box, or null */
export function gapAhead(car, blockers, cfg = YIELD_CFG) {
  const fx = Math.cos(car.yaw), fz = -Math.sin(car.yaw); let best = null;
  for (const b of blockers) {
    if (b === car || (b.self && b.self === car)) continue; const dx = b.x - car.x, dz = b.z - car.z; const along = dx * fx + dz * fz; if (along < 0.2 || along > cfg.lookAhead) continue;
    const side = Math.abs(-dx * fz + dz * fx); if (side > cfg.halfWidth + (b.r || 0)) continue; const gap = along - (b.r || 0); if (best == null || gap < best.gap) best = { gap, person: !!b.person };
  }
  return best;
}
/** one step of speed control. state: { v, wait, ignoreT, honk }. Returns the new state (mutated copy) */
export function stepSpeed(st, cruise, hit, dt, cfg = YIELD_CFG) {
  const s = { v: st.v, wait: st.wait || 0, ignoreT: Math.max(0, (st.ignoreT || 0) - dt), honk: false, limit: st.limit ?? (cfg.waitMin + (cfg.waitMax - cfg.waitMin) * 0.5) };
  if (hit && !hit.person && s.ignoreT > 0) hit = null;
  let target = cruise;
  if (hit) {
    const room = hit.gap - cfg.stopGap; target = room <= 0 ? 0 : Math.min(cruise, Math.sqrt(2 * cfg.maxDecel * 0.6 * room));
    if (s.v < 0.3) { s.wait += dt; if (s.wait >= s.limit) { if (hit.person) { if (hit.gap > cfg.minGap + 0.6) target = Math.min(cruise, cfg.creepSpeed); s.honk = !st.honked; } else { s.ignoreT = cfg.ignoreCarsFor; s.wait = 0; } } }
  } else s.wait = 0;
  const dv = target - s.v; s.v += Math.max(-cfg.maxDecel * dt, Math.min(cfg.maxAccel * dt, dv)); if (s.v < 0) s.v = 0;
  if (hit && hit.person) s.v = Math.min(s.v, Math.max(0, (hit.gap - cfg.minGap) / Math.max(dt, 1e-3))); // hard stop: never move into a person
  s.honked = hit ? (st.honked || s.honk) : false; s.braking = !!hit && target < cruise; return s;
}
/** Hook for a later, NOT YET APPROVED crash rule: given what is ahead, decide 'clear' | 'yield' | (future) 'hit'. Today it always yields; nothing else (health, money, server) is wired to it. */
export function decide(hit, ctx = {}) { void ctx; return hit ? { action: 'yield', hit } : { action: 'clear', hit: null }; }
