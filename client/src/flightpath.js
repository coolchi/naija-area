// The plane's flight as a pure function of time (10 Oct 2026): taxi from the apron to the runway, take-off roll, climb, then a banked circle over the district.
// Everything is derived from the airport config (apron point and runway), so any city's airport reuses it. Units: metres and seconds. Visual only: the server decides when you land.
export const FLIGHT = { taxiS: 5, rollS: 7, climbS: 9, rollLen: 170, climbH: 70, circleR: 170, bank: 0.35, cruiseWobble: 6,
  // what OTHER players see (item 7): a departing plane circles for circleShowS then leaves in a straight climb for exitS and vanishes at exitH metres up; an arriving plane lands in landS (= the take-off run played backwards). Keep balance.flight.planes.depVisibleS >= taxi+roll+climb+circleShowS+exitS.
  circleShowS: 12, exitS: 10, exitH: 320 };
const ss = (u) => { const k = Math.max(0, Math.min(1, u)); return k * k * (3 - 2 * k); };
const lerpAng = (a, b, k) => { let d = ((b - a + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI; return a + d * k; };
/** precompute the geometry for one airport; `towards` is a point the circuit should bend toward (the middle of the city) */
export function planFlight(ap, towards = [0, -60], F = FLIGHT) {
  const R = ap.runway, dx = R.x1 - R.x0, dz = R.z1 - R.z0, L = Math.hypot(dx, dz), th = Math.atan2(dz, dx); const fwd = [Math.cos(th), Math.sin(th)];
  const taxiHeading = Math.atan2(R.z0 - ap.apron.z, R.x0 - ap.apron.x);
  const vEnd = 2 * F.rollLen / F.rollS, vClimbEnd = vEnd * 1.25; const climbLen = (vEnd + vClimbEnd) / 2 * F.climbS;
  const pClimbEnd = [R.x0 + fwd[0] * (F.rollLen + climbLen), R.z0 + fwd[1] * (F.rollLen + climbLen)];
  const cand = [1, -1].map(side => { const n = [-Math.sin(th) * side, Math.cos(th) * side]; const c = [pClimbEnd[0] + n[0] * F.circleR, pClimbEnd[1] + n[1] * F.circleR]; return { side, c, d: Math.hypot(c[0] - towards[0], c[1] - towards[1]) }; }).sort((a, b) => a.d - b.d)[0];
  return { ap, th, fwd, L, taxiHeading, vEnd, vClimbEnd, climbLen, pClimbEnd, side: cand.side, c: cand.c, F, totalPreCruise: F.taxiS + F.rollS + F.climbS };
}
/** pose at t seconds after the departure time: { x, y, z, yaw (three rotation.y), pitch, roll, phase } */
export function flightPose(plan, t) {
  const { ap, th, fwd, F } = plan; const R = ap.runway; t = Math.max(0, t);
  const out = (x, y, z, heading, pitch, roll, phase) => ({ x, y, z, yaw: -heading, pitch, roll, phase });
  if (t < F.taxiS) { const u = ss(t / F.taxiS); const x = ap.apron.x + (R.x0 - ap.apron.x) * u, z = ap.apron.z + (R.z0 - ap.apron.z) * u; return out(x, 0, z, lerpAng(plan.taxiHeading, th, ss((t / F.taxiS - 0.6) / 0.4)), 0, 0, 'taxi'); }
  if (t < F.taxiS + F.rollS) { const u = (t - F.taxiS) / F.rollS; const s = F.rollLen * u * u; return out(R.x0 + fwd[0] * s, 0, R.z0 + fwd[1] * s, th, u > 0.85 ? (u - 0.85) / 0.15 * 0.1 : 0, 0, 'roll'); }
  if (t < plan.totalPreCruise) { const tc = t - F.taxiS - F.rollS, u = tc / F.climbS; const v0 = plan.vEnd, v1 = plan.vClimbEnd; const s = F.rollLen + v0 * tc + (v1 - v0) * tc * tc / (2 * F.climbS); const y = F.climbH * ss(u); return out(R.x0 + fwd[0] * s, y, R.z0 + fwd[1] * s, th, 0.1 + 0.08 * Math.sin(u * Math.PI) - 0.1 * ss((u - 0.8) / 0.2), 0, 'climb'); }
  const tc = t - plan.totalPreCruise, v = plan.vClimbEnd, w = v / F.circleR * plan.side; const heading = th + w * tc; const nx = -Math.sin(heading) * plan.side, nz = Math.cos(heading) * plan.side;
  const bankIn = ss(tc / 3); return out(plan.c[0] - nx * F.circleR, F.climbH + F.cruiseWobble * Math.sin(tc * 0.35), plan.c[1] - nz * F.circleR, heading, 0.03 * Math.cos(tc * 0.35) * ss(tc / 2.5), -plan.side * F.bank * bankIn, 'cruise');
}
/** chase camera: where to put the camera for a pose (behind and above), and what to look at */
export function chaseCam(pose, back = 30, up = 9, ahead = 12) { const h = -pose.yaw; const fx = Math.cos(h), fz = Math.sin(h); return { pos: [pose.x - fx * back, pose.y + up, pose.z - fz * back], look: [pose.x + fx * ahead, pose.y + 1, pose.z + fz * ahead] }; }

/** what a bystander sees of a DEPARTING plane: the same take-off and circuit as the passenger's, then it straightens out and climbs away. t = seconds since departure; null once it has gone. */
export function departPose(plan, t) {
  const { F } = plan; const tEnd = plan.totalPreCruise + F.circleShowS; if (t < 0 || t > tEnd + F.exitS) return null; if (t <= tEnd) return flightPose(plan, t);
  const p0 = flightPose(plan, tEnd); const heading = -p0.yaw; const u = (t - tEnd) / F.exitS; const v = plan.vClimbEnd; const s = (t - tEnd) * v;
  return { x: p0.x + Math.cos(heading) * s, y: p0.y + (F.exitH - p0.y) * u * u, z: p0.z + Math.sin(heading) * s, yaw: p0.yaw, pitch: 0.12 * Math.min(1, u * 4), roll: p0.roll * (1 - ss(u * 2)), phase: 'exit' };
}
/** an ARRIVING plane: the take-off run backwards (it comes in low over the far end, touches down, rolls out and taxis to the apron, turning to park). t = seconds since the start of the landing (0 .. totalPreCruise). */
export function landingPose(plan, t) {
  const { F } = plan; const T = plan.totalPreCruise; if (t < 0 || t > T) return null; const tau = T - t; const p = flightPose(plan, tau);
  let yaw = p.yaw - Math.PI; if (tau < F.taxiS) { const k = ss((F.taxiS - tau) / F.taxiS * 1.4 - 0.4); yaw = p.yaw - Math.PI * (1 - k); } // swing half a turn (always the same way round) to park nose out like the parked plane
  return { x: p.x, y: p.y, z: p.z, yaw, pitch: p.phase === 'taxi' ? 0 : p.pitch, roll: 0, phase: p.phase === 'taxi' ? 'taxi' : p.phase === 'roll' ? 'rollout' : 'approach' };
}
