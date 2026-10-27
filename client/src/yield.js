// Traffic yielding (client-side only: never touches server state, fares or the ledger). Pure functions so they can be unit-tested.
// All numbers are placeholders (ESTIMATE) in ONE config.
export const YIELD_CFG = {
  lookAhead: 18,        // m: how far ahead a vehicle looks
  halfWidth: 2.4,       // m: half-width of the look-ahead box
  stopGap: 4.5,         // m: bumper-to-blocker distance to stop at
  minGap: 1.8,          // m: never closer than this to a person, even after the wait
  minGapCar: 3.6,       // m: hard floor vs other cars — meshes must not nest
  overlapFloor: 2.0,    // m: absolute floor while creeping past at a crossing
  maxDecel: 14, maxAccel: 6, // m/s^2
  waitMin: 2, waitMax: 4,    // s: how long a car waits before it honks and creeps / ignores other cars
  creepSpeed: 1.2,      // m/s after the wait for people (stays outside minGap)
  creepPastSpeed: 3.2,  // m/s while briefly ignoring another car at a crossing (never full cruise through them)
  ignoreCarsFor: 2.5,   // s: after waiting on another car (deadlock at a crossing) creep past — do not ghost at cruise speed
  catchUp: 1.25,        // speed factor while catching back up to the shared timeline
  hornGapSpeed: 5       // m/s: only horn when braking from at least this speed
};
/** distance along the car's heading to the nearest blocker inside the look-ahead box, or null */
export function gapAhead(car, blockers, cfg = YIELD_CFG) {
  const fx = Math.cos(car.yaw), fz = -Math.sin(car.yaw); let best = null;
  for (const b of blockers) {
    if (b === car || (b.self && b.self === car)) continue; const dx = b.x - car.x, dz = b.z - car.z; const along = dx * fx + dz * fz; if (along < 0.2 || along > cfg.lookAhead) continue;
    const side = Math.abs(-dx * fz + dz * fx); if (side > cfg.halfWidth + (b.r || 0)) continue; const gap = along - (b.r || 0); if (best == null || gap < best.gap) best = { gap, person: !!b.person, local: !!b.local, dwell: !!b.dwell };
  }
  return best;
}
/** one step of speed control. state: { v, wait, ignoreT, honk }. Returns the new state (mutated copy) */
export function stepSpeed(st, cruise, hit, dt, cfg = YIELD_CFG) {
  const s = { v: st.v, wait: st.wait || 0, ignoreT: Math.max(0, (st.ignoreT || 0) - dt), honk: false, limit: st.limit ?? (cfg.waitMin + (cfg.waitMax - cfg.waitMin) * 0.5), creepPast: false };
  // Crossing unlock: only clear a car blocker when there is still room; otherwise keep the hit so the hard floor applies.
  if (hit && !hit.person && s.ignoreT > 0) {
    if (hit.gap >= cfg.overlapFloor) { s.creepPast = true; hit = null; }
  }
  let target = cruise;
  if (s.creepPast) target = Math.min(cruise, cfg.creepPastSpeed);
  if (hit) {
    const room = hit.gap - cfg.stopGap; target = room <= 0 ? 0 : Math.min(cruise, Math.sqrt(2 * cfg.maxDecel * 0.6 * room));
    if (s.v < 0.3) { s.wait += dt; if (s.wait >= s.limit) { if (hit.person) { if (hit.gap > cfg.minGap + 0.6) target = Math.min(cruise, cfg.creepSpeed); s.honk = !st.honked; } else if (!hit.dwell) { s.ignoreT = cfg.ignoreCarsFor; s.wait = 0; } } }
  } else s.wait = 0;
  const dv = target - s.v; s.v += Math.max(-cfg.maxDecel * dt, Math.min(cfg.maxAccel * dt, dv)); if (s.v < 0) s.v = 0;
  if (hit && hit.person) s.v = Math.min(s.v, Math.max(0, (hit.gap - cfg.minGap) / Math.max(dt, 1e-3))); // hard stop: never move into a person
  if (hit && !hit.person) s.v = Math.min(s.v, Math.max(0, (hit.gap - cfg.minGapCar) / Math.max(dt, 1e-3))); // hard stop: never nest into another car
  s.honked = hit ? (st.honked || s.honk) : false; s.braking = !!hit && target < cruise; return s;
}
/** What does a vehicle do about what is ahead? 'clear' | 'yield' | 'hit'. A 'hit' is only possible when the SERVER has said so for this encounter (ctx.hitAllowed, set from a crash token);
 *  then the car does not brake for the local player and drives on into them. Everything else (health, money) is applied by the server on impact, never here. */
export function decide(hit, ctx = {}) { if (!hit) return { action: 'clear', hit: null }; if (hit.local && ctx.hitAllowed) return { action: 'hit', hit: null }; return { action: 'yield', hit }; }
