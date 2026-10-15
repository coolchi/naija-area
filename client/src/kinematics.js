// Pure movement and kinematics (physics feel pass, 10 Oct 2026): no THREE, no DOM, no clock, no randomness, so the same inputs always give the same outputs and tests can check them.
// Everything is CLIENT-SIDE feel. The server still clamps speeds and decides every hit, fare and ledger entry; these functions never exceed the top speeds in physics-config.js.
// Conventions follow the game: heading ry, forward = (cos ry, -sin ry), right = (sin ry, cos ry). Turning right DEcreases ry.
import { PHYS } from './physics-config.js';
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, k) => a + (b - a) * k;
export const angDiff = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));
/** move v toward target by at most rate*dt */
export const approach = (v, target, rate, dt) => (v < target ? Math.min(target, v + rate * dt) : Math.max(target, v - rate * dt));
/** frame-rate independent smoothing: fraction of the gap closed this frame for a follow rate (1/s) */
export const damp = (rate, dt) => 1 - Math.exp(-rate * dt);
/** smooth an angle toward a target along the short way */
export const smoothAngle = (cur, target, rate, dt) => cur + angDiff(cur, target) * damp(rate, dt);

// ================= walking =================
export const newWalker = () => ({ vx: 0, vz: 0, speed: 0, run: 0, phase: 0, bob: 0, lean: 0, sway: 0 });
/** one step of walking. dir is a UNIT vector (world), mag 0..1 the stick or key strength, wantRun true while Shift is held. Returns the walker (mutated). */
export function walkStep(w, dirX, dirZ, mag, wantRun, dt, cfg = PHYS.walk) {
  w.run = approach(w.run, wantRun ? 1 : 0, cfg.runBlendRate, dt);
  const top = lerp(cfg.walkSpeed, cfg.runSpeed, w.run) * clamp(mag, 0, 1);
  const tx = dirX * top, tz = dirZ * top; const cm = Math.hypot(w.vx, w.vz);
  const a = top >= cm ? cfg.accel : cfg.decel; let dx = tx - w.vx, dz = tz - w.vz; const dl = Math.hypot(dx, dz), lim = a * dt;
  if (dl > lim) { dx *= lim / dl; dz *= lim / dl; } w.vx += dx; w.vz += dz;
  const m = Math.hypot(w.vx, w.vz); if (m > cfg.runSpeed) { w.vx *= cfg.runSpeed / m; w.vz *= cfg.runSpeed / m; }
  w.speed = Math.hypot(w.vx, w.vz); if (w.speed < cfg.stopEps && top === 0) { w.vx = w.vz = 0; w.speed = 0; } return w;
}
/** footfalls, head-bob, lean and sway from the walker's speed. Returns the number of footsteps that landed this frame (0 or more). */
export function gaitStep(w, dt, cfg = PHYS.walk) {
  const before = Math.floor(w.phase); if (w.speed > cfg.stopEps) w.phase += w.speed * dt / cfg.stepLen; const steps = Math.floor(w.phase) - before;
  const k = clamp(w.speed / cfg.runSpeed, 0, 1); const amp = lerp(cfg.bobWalk, cfg.bobRun, w.run) * Math.pow(k, 0.8);
  const bobT = Math.abs(Math.sin(Math.PI * w.phase)) * amp; w.bob = w.speed > cfg.stopEps ? bobT : w.bob * Math.exp(-14 * dt); if (w.bob < 1e-4) w.bob = 0; // settle smoothly when stopping
  w.lean = lerp(w.lean, cfg.leanRun * Math.pow(k, 1.2), damp(10, dt)); w.sway = w.speed > cfg.stopEps ? Math.sin(Math.PI * w.phase) * cfg.swayRun * k : w.sway * Math.exp(-10 * dt); return steps;
}
/** distance the walker covers while stopping from speed v with the configured deceleration */
export const walkStopDistance = (v, cfg = PHYS.walk) => v * v / (2 * cfg.decel);

// ================= driving =================
export const newCar = () => ({ x: 0, z: 0, ry: 0, v: 0, lat: 0, steer: 0, th: 0, yaw: 0, ax: 0, ay: 0, understeer: false, slideNow: 0 });
const taper = (r) => Math.max(0, 1 - r * r);
/** speed advice inside a roundabout (ring + margin): returns the cap in m/s, or Infinity */
export function zoneSpeedCap(x, z, roundabouts, cfg = PHYS.car) {
  if (!cfg.zoneCap || !roundabouts) return Infinity; for (const o of roundabouts) if (Math.hypot(x - o.x, z - o.z) <= o.outerR + cfg.zoneMargin) return cfg.zoneCap; return Infinity;
}
/** stopping distance on full brake from speed v (no drag): v^2 / (2 brakeDecel) */
export const brakeDistance = (v, cfg = PHYS.car) => v * v / (2 * cfg.brakeDecel);
/** the wheel angle limit at a speed: shrinks as speed grows (speed-dependent steering) */
export const steerLimit = (speed, cfg = PHYS.car) => cfg.steerMax / (1 + Math.pow(speed / cfg.steerSpeedRef, 2));
/** the turn rate the tyres can hold at a speed (rad/s): grip / speed. Asking for more = understeer. */
export const yawCap = (speed, hand, cfg = PHYS.car) => (cfg.gripLat * (hand ? cfg.handGrip : 1)) / Math.max(Math.abs(speed), 1e-3);
/** inp: { pedal -1..1 (W up / S down), steer -1..1 (right positive), hand bool }. env: { cap } speed cap from the zone. Mutates and returns c. */
export function carStep(c, inp, dt, cfg = PHYS.car, env = {}) {
  const n = Math.max(1, Math.ceil(dt / cfg.maxSub)); const h = dt / n; for (let i = 0; i < n; i++) sub(c, inp, h, cfg, env); return c;
}
function sub(c, inp, h, cfg, env) {
  const pedal = clamp(inp.pedal || 0, -1, 1), gas = Math.max(0, pedal), brk = Math.max(0, -pedal), hand = !!inp.hand; const v0 = c.v, still = 0.3;
  c.th = approach(c.th, gas, gas > c.th ? cfg.throttleRise : cfg.throttleFall, h);
  let driveA = 0, brakeA = 0;
  if (gas > 0) { if (c.v < -still) brakeA = cfg.brakeDecel * gas; else driveA = cfg.accel * c.th * taper(Math.max(0, c.v) / cfg.maxSpeed); }
  if (brk > 0) { if (c.v > still) brakeA = cfg.brakeDecel * brk; else driveA = -cfg.reverseAccel * brk * taper(Math.max(0, -c.v) / cfg.reverseMax); }
  if (hand) brakeA += cfg.handDecel;
  c.v += driveA * h; if (brakeA > 0) c.v = approach(c.v, 0, brakeA, h);
  if (driveA === 0 || brakeA > 0) { const res = cfg.rolling + cfg.drag * c.v * c.v; if (gas === 0 || brakeA > 0) c.v = approach(c.v, 0, res, h); }
  if (env.cap != null && env.cap !== Infinity && Math.abs(c.v) > env.cap) c.v = approach(c.v, Math.sign(c.v) * env.cap, cfg.zoneDecel, h);
  c.v = clamp(c.v, -cfg.reverseMax, cfg.maxSpeed);
  // steering: the wheel follows the key, its limit shrinks with speed, the tyres can only hold so much turn (understeer beyond)
  const want = clamp(inp.steer || 0, -1, 1); c.steer = approach(c.steer, want, Math.abs(want) > Math.abs(c.steer) ? cfg.steerRise : cfg.steerReturn, h);
  const delta = c.steer * steerLimit(Math.abs(c.v), cfg); let demand = (c.v / cfg.wheelbase) * Math.tan(delta); if (hand && Math.abs(c.v) > 2) demand *= 1 + cfg.handYawBoost;
  const cap = yawCap(c.v, hand, cfg) * (hand ? 1 + cfg.handYawBoost : 1); c.understeer = Math.abs(demand) > cap; c.yaw = clamp(demand, -cap, cap);
  const dTh = c.yaw * h; c.ry -= dTh; c.lat -= c.v * dTh;
  const l0 = Math.abs(c.lat); c.lat *= Math.exp(-(hand ? cfg.gripRateHand : cfg.gripRate) * h); const lost = l0 - Math.abs(c.lat); c.slideNow = Math.abs(c.lat);
  if (lost > 0 && c.v !== 0) c.v -= Math.sign(c.v) * Math.min(Math.abs(c.v), cfg.scrub * lost);
  const tot = Math.hypot(c.v, c.lat); if (tot > cfg.maxSpeed) { const k = cfg.maxSpeed / tot; c.v *= k; c.lat *= k; }
  c.ax = (c.v - v0) / h; c.ay = c.v * c.yaw;
  const f0 = Math.cos(c.ry), f1 = -Math.sin(c.ry), r0 = Math.sin(c.ry), r1 = Math.cos(c.ry); c.x += (f0 * c.v + r0 * c.lat) * h; c.z += (f1 * c.v + r1 * c.lat) * h;
}
/** world velocity of the car, and back */
export const carVel = (c) => ({ vx: Math.cos(c.ry) * c.v + Math.sin(c.ry) * c.lat, vz: -Math.sin(c.ry) * c.v + Math.cos(c.ry) * c.lat });
export function setCarVel(c, vx, vz) { c.v = vx * Math.cos(c.ry) - vz * Math.sin(c.ry); c.lat = vx * Math.sin(c.ry) + vz * Math.cos(c.ry); }
export const carSpeed = (c) => Math.hypot(c.v, c.lat);

// ================= collisions =================
/** push a moving circle out of axis-aligned boxes and respond: it SLIDES along the wall (the speed along the wall is kept, a little is rubbed off) and bounces by `restitution` of the speed into it.
 *  p = { x, z, vx, vz } (mutated), boxes = [{x0,x1,z0,z1}], rad. Returns { hit, impact (m/s into the wall, the worst contact), nx, nz }. */
export function resolveBoxes(p, boxes, rad, restitution, dt, cfg = PHYS.collide, passes = 2) {
  let impact = 0, nxo = 0, nzo = 0, hit = false;
  for (let pass = 0; pass < passes; pass++) for (const c of boxes) {
    if (p.x < c.x0 - rad || p.x > c.x1 + rad || p.z < c.z0 - rad || p.z > c.z1 + rad) continue;
    const qx = clamp(p.x, c.x0, c.x1), qz = clamp(p.z, c.z0, c.z1); let dx = p.x - qx, dz = p.z - qz; const d = Math.hypot(dx, dz); if (d >= rad) continue;
    let nx, nz;
    if (d < 1e-4) { const opts = [[-1, 0, p.x - (c.x0 - rad)], [1, 0, c.x1 + rad - p.x], [0, -1, p.z - (c.z0 - rad)], [0, 1, c.z1 + rad - p.z]].sort((a, b) => a[2] - b[2])[0]; nx = opts[0]; nz = opts[1]; p.x += nx * opts[2]; p.z += nz * opts[2]; }
    else { nx = dx / d; nz = dz / d; p.x = qx + nx * rad; p.z = qz + nz * rad; }
    hit = true; contact(p, nx, nz, restitution, dt, cfg); const vn = -(p.lastVn || 0); if (vn > impact) { impact = vn; nxo = nx; nzo = nz; }
  }
  return { hit, impact, nx: nxo, nz: nzo };
}
/** circles (two per obstacle car): same response. circles = [{x,z,r}]; the mover is described by its own circle(s) [{ox,oz}] around p with radius selfR */
export function resolveCircles(p, selfOffsets, selfR, circles, restitution, dt, cfg = PHYS.collide) {
  let impact = 0, nxo = 0, nzo = 0, hit = false;
  if (!Number.isFinite(p.x) || !Number.isFinite(p.z)) return { hit, impact, nx: nxo, nz: nzo };
  for (const o of circles) {
    if (!o || !Number.isFinite(o.x) || !Number.isFinite(o.z) || !Number.isFinite(o.r)) continue;
    for (const s of selfOffsets) {
      const sx = p.x + s[0], sz = p.z + s[1]; const dx = sx - o.x, dz = sz - o.z; const d = Math.hypot(dx, dz), rr = selfR + o.r; if (d >= rr) continue;
      const nx = d < 1e-4 ? 1 : dx / d, nz = d < 1e-4 ? 0 : dz / d; const pen = rr - d; p.x += nx * pen; p.z += nz * pen; hit = true; contact(p, nx, nz, restitution, dt, cfg); const vn = -(p.lastVn || 0); if (vn > impact) { impact = vn; nxo = nx; nzo = nz; }
    }
  }
  return { hit, impact, nx: nxo, nz: nzo };
}
/** velocity response at a contact with outward normal n: remove the part going into it (bounce back by restitution), keep the part along it, rub a little off */
function contact(p, nx, nz, e, dt, cfg) {
  const vn = p.vx * nx + p.vz * nz; p.lastVn = vn; if (vn >= 0) { return; }
  const tx = -nz, tz = nx; let vt = p.vx * tx + p.vz * tz; const into = -vn; vt *= (into > cfg.minImpact ? 1 - cfg.hitFriction : 1) * Math.exp(-cfg.slideDrag * dt);
  const vnNew = -vn * e; p.vx = nx * vnNew + tx * vt; p.vz = nz * vnNew + tz * vt;
}
/** two circles in front of and behind a car at heading ry (for bumping ambient traffic) */
export const carCircles = (x, z, ry, off, out = []) => { const f0 = Math.cos(ry) * off, f1 = -Math.sin(ry) * off; out.length = 0; out.push([f0, f1], [-f0, -f1]); return out; };

// ================= body motion (suspension), camera shake, knock-back =================
export const newSusp = () => ({ roll: 0, rollV: 0, pitch: 0, pitchV: 0, y: 0, yV: 0 });
/** damped springs for body roll, pitch and bounce. ax and ay are the car's forward and sideways acceleration (right positive); kick is an upward impulse (m/s). */
export function suspStep(s, ax, ay, kick, dt, cfg = PHYS.susp) {
  s.yV += kick; const n = Math.max(1, Math.ceil(dt / cfg.sub)); const h = dt / n;
  const rt = clamp(-ay * cfg.rollK, -cfg.maxRoll, cfg.maxRoll), pt = clamp(ax * cfg.pitchK, -cfg.maxPitch, cfg.maxPitch);
  for (let i = 0; i < n; i++) {
    s.rollV += (cfg.k * (rt - s.roll) - cfg.c * s.rollV) * h; s.roll += s.rollV * h; s.pitchV += (cfg.k * (pt - s.pitch) - cfg.c * s.pitchV) * h; s.pitch += s.pitchV * h;
    s.yV += (-cfg.k * 1.6 * s.y - cfg.c * s.yV) * h; s.y += s.yV * h; if (s.y < -0.02) { s.y = -0.02; s.yV = Math.max(0, s.yV); }
  }
  s.y = Math.min(s.y, cfg.bumpY); return s;
}
/** camera shake offset for a decaying amplitude: deterministic (a sum of sines of the time) */
export function shakeOffset(amp, tSec, cfg = PHYS.camera) { return [Math.sin(tSec * cfg.shakeHz) * amp, Math.sin(tSec * cfg.shakeHz * 1.31 + 1.7) * amp * 0.7]; }
export const shakeFromImpact = (impact, cfg = PHYS.camera) => Math.min(cfg.shakeMax, Math.max(0, impact) * cfg.shakePerMs);
/** how the avatar looks t seconds after being knocked: thrown up and back, then it settles. y (m), tilt (rad, back positive). Zero before 0 and after `seconds`. */
export function knockPose(t, cfg = PHYS.knock) {
  if (!(t >= 0) || t >= cfg.seconds) return { y: 0, tilt: 0 }; const u = t / cfg.seconds; const arc = 4 * u * (1 - u); const tilt = cfg.tilt * Math.sin(Math.PI * Math.min(1, u * 1.15)) * (u < 0.7 ? 1 : 1 - (u - 0.7) / 0.3 * 0.2) * (1 - u * u * 0.35);
  return { y: cfg.hop * arc, tilt: Math.max(0, tilt) * (u > 0.9 ? (1 - u) / 0.1 : 1) };
}
/** velocity of the knock slide at time t after the hit, and how far it has gone: exponential, total distance = cfg.distance */
export const knockSpeed = (t, cfg = PHYS.knock) => cfg.distance * cfg.decay * Math.exp(-cfg.decay * Math.max(0, t));
export const knockTravelled = (t, cfg = PHYS.knock) => cfg.distance * (1 - Math.exp(-cfg.decay * Math.max(0, t)));

// ================= boat and plane =================
/** gentle two-wave bob and rock for a hull at time t (seconds): { y, roll, pitch } */
export function waveMotion(t, cfg = PHYS.boat) {
  const a = Math.sin(t * cfg.bobHzA * 2 * Math.PI), b = Math.sin(t * cfg.bobHzB * 2 * Math.PI + 1.3);
  return { y: a * cfg.bobA + b * cfg.bobB, roll: a * cfg.rollWave + b * cfg.rollWave * 0.4, pitch: b * cfg.pitchWave + a * cfg.pitchWave * 0.3 };
}
/** the boat's heading follows the wanted course at a limited turn rate; the bank comes from how fast it is turning. state { ry, turn }. Returns state. */
export function boatHeadingStep(st, wantRy, dt, cfg = PHYS.boat) {
  const err = angDiff(st.ry, wantRy); const max = cfg.turnRate * dt; const d = clamp(err, -max, max); st.ry += d; st.turn = d / Math.max(dt, 1e-6);
  st.bank = clamp(-st.turn * cfg.bankPerTurn, -cfg.maxBank, cfg.maxBank); return st;
}
/** turn a vehicle displacement into the visual lean pieces used for ambient cars: yaw rate (right positive) and speed change */
export function ambientLean(prevYaw, yaw, v0, v1, dt) { const yr = dt > 0 ? -angDiff(prevYaw, yaw) / dt : 0; return { ay: v1 * yr, ax: dt > 0 ? (v1 - v0) / dt : 0 }; }
