// Pure physics for jump, throw, push and prop collisions (no THREE, no clock, no randomness): shared by the client (feel) and the server (throw validation and bonks).
// Numbers: server/config/physx.js. Tested in tests/physx.test.js.
import { PHYSX } from '../config/physx.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const cfgOf = (app) => app?.balance?.physx || PHYSX;

// ---------------- jump (vertical only; the server's world stays flat, y is a visual and a collision height)
export const newJump = () => ({ y: 0, vy: 0, air: false, coyote: 0, buffer: 0, wasJump: false });
/** advance the jump one frame. `want` = jump key held. Returns the same object (y, vy, air, justJumped, justLanded). */
export function jumpStep(j, want, dt, cfg = PHYSX.jump, canJump = true) {
  j.justJumped = false; j.justLanded = false; const press = want && !j.wasJump; j.wasJump = want;
  if (press) j.buffer = cfg.bufferSec; else j.buffer = Math.max(0, j.buffer - dt);
  if (!j.air) j.coyote = cfg.coyoteSec; else j.coyote = Math.max(0, j.coyote - dt);
  if (cfg.enabled && canJump && j.buffer > 0 && (j.coyote > 0)) { j.vy = cfg.v0; j.air = true; j.coyote = 0; j.buffer = 0; j.justJumped = true; }
  if (j.air) { const v1 = j.vy - cfg.gravity * dt; j.y += (j.vy + v1) / 2 * dt; j.vy = v1; if (j.y <= 0) { j.y = 0; j.vy = 0; j.air = false; j.justLanded = true; } }
  return j;
}
export const jumpApex = (cfg = PHYSX.jump) => cfg.v0 * cfg.v0 / (2 * cfg.gravity);
export const jumpAirtime = (cfg = PHYSX.jump) => 2 * cfg.v0 / cfg.gravity;
/** can a walker at height y pass over a solid of height h? */
export const clearsSolid = (y, h, cfg = PHYSX.jump) => h <= cfg.clearsPropHeight && y >= h - 0.05;

// ---------------- throwing a ball: the launch state from where you stand, which way you face, and how hard (power 0..1)
export function throwStart(x, z, yaw, power, cfg = PHYSX.throw) {
  const p = clamp(Number.isFinite(power) ? power : 0.5, 0, 1); const speed = cfg.minSpeed + (cfg.maxSpeed - cfg.minSpeed) * p; const h = Math.cos(cfg.angle) * speed;
  return { x: x + Math.cos(yaw) * 0.5, y: cfg.releaseHeight, z: z - Math.sin(yaw) * 0.5, vx: Math.cos(yaw) * h, vy: Math.sin(cfg.angle) * speed, vz: -Math.sin(yaw) * h, speed };
}
/** one fixed step of a ball: gravity, ground bounce with grip, stops when slow. Mutates and returns b. */
export function ballStep(b, dt, cfg = PHYSX.throw) {
  if (b.rest) return b; b.vy -= cfg.gravity * dt; b.x += b.vx * dt; b.y += b.vy * dt; b.z += b.vz * dt;
  if (b.y <= cfg.ballR) { b.y = cfg.ballR; if (Math.abs(b.vy) > 1.2) b.vy = -b.vy * cfg.bounceRestitution; else b.vy = 0; b.vx *= cfg.groundGrip; b.vz *= cfg.groundGrip; if (b.vy === 0 && Math.hypot(b.vx, b.vz) < cfg.restSpeed) { b.vx = b.vz = 0; b.rest = true; } }
  return b;
}
/** the whole flight as samples every `every` seconds: [{ t, x, y, z }] (deterministic: same start, same samples, on server and client) */
export function simulateThrow(start, cfg = PHYSX.throw, every = 0.05) {
  const b = { x: start.x, y: start.y, z: start.z, vx: start.vx, vy: start.vy, vz: start.vz, rest: false }; const out = [{ t: 0, x: b.x, y: b.y, z: b.z }]; const dt = cfg.stepSec; let t = 0, next = every;
  while (t < cfg.maxFlightSec && !b.rest) { ballStep(b, dt, cfg); t += dt; if (t >= next - 1e-9) { out.push({ t: +t.toFixed(4), x: b.x, y: b.y, z: b.z }); next += every; } }
  out.push({ t: +t.toFixed(4), x: b.x, y: b.y, z: b.z, end: true }); return out;
}
/** the first person a flight passes within hitRadius of (below hitMaxHeight). targets: [{ id, x, z }] (positions held still). Returns { id, t, x, z } or null. */
export function findHit(samples, targets, cfg = PHYSX.throw) {
  for (let i = 1; i < samples.length; i++) { const s = samples[i]; if (s.y > cfg.hitMaxHeight) continue; for (const q of targets) if (Math.hypot(s.x - q.x, s.z - q.z) <= cfg.hitRadius + cfg.ballR) return { id: q.id, t: s.t, x: s.x, z: s.z }; }
  return null;
}
/** a point along a flight's samples at age `ageSec` (linear between samples; stays at the landing spot after it stops) */
export function sampleAt(sm, ageSec) {
  const t = Math.max(0, ageSec); let lo = 0, hi = sm.length - 1; while (lo < hi - 1) { const mid = (lo + hi) >> 1; if (sm[mid].t <= t) lo = mid; else hi = mid; }
  const a = sm[lo], b = sm[Math.min(sm.length - 1, lo + 1)]; const k = b.t > a.t ? clamp((t - a.t) / (b.t - a.t), 0, 1) : 0;
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, z: a.z + (b.z - a.z) * k, landed: t >= sm[sm.length - 1].t };
}
/** where a ball in flight is, at age `ageSec`, from its start (what a viewer draws) */
export const ballAt = (start, ageSec, cfg = PHYSX.throw) => sampleAt(simulateThrow(start, cfg, 0.05), ageSec);

// ---------------- pushing objects (circles on the ground)
export const newPushable = (kind, x, z) => ({ kind, x, z, vx: 0, vz: 0, home: { x, z } });
/** a pusher (circle r moving with velocity) shoves a pushable; the object takes momentum by mass ratio, then friction slows it. Returns true if touched. */
export function pushContact(o, pusher, cfg = PHYSX.push, solids = PHYSX.solids) {
  const k = cfg.kinds[o.kind], r = solids[o.kind].r; const dx = o.x - pusher.x, dz = o.z - pusher.z; const d = Math.hypot(dx, dz), min = r + pusher.r; if (d >= min || d < 1e-6) return false;
  const nx = dx / d, nz = dz / d; o.x = pusher.x + nx * min; o.z = pusher.z + nz * min; const rel = (pusher.vx || 0) * nx + (pusher.vz || 0) * nz; const pm = pusher.mass || 70;
  if (rel > 0) { const j = (1 + cfg.restitution) * rel * pm / (pm + k.mass); o.vx += nx * j; o.vz += nz * j; }
  const sp = Math.hypot(o.vx, o.vz); if (sp > cfg.maxSpeed) { o.vx *= cfg.maxSpeed / sp; o.vz *= cfg.maxSpeed / sp; } return true;
}
export function pushStep(o, dt, cfg = PHYSX.push) {
  const k = cfg.kinds[o.kind]; const sp = Math.hypot(o.vx, o.vz); if (sp > 0) { const ns = Math.max(0, sp - k.friction * dt); o.vx *= ns / sp; o.vz *= ns / sp; if (ns < 0.02) o.vx = o.vz = 0; } o.x += o.vx * dt; o.z += o.vz * dt; return o;
}
/** pushables against boxes (buildings): stop and bounce a little. boxes: [{x0,x1,z0,z1}] */
export function pushAgainstBoxes(o, boxes, cfg = PHYSX.push, solids = PHYSX.solids) {
  const r = solids[o.kind].r; for (const b of boxes) { const cx = clamp(o.x, b.x0, b.x1), cz = clamp(o.z, b.z0, b.z1); const dx = o.x - cx, dz = o.z - cz; const d = Math.hypot(dx, dz); if (d < r && d > 1e-6) { const nx = dx / d, nz = dz / d; o.x = cx + nx * r; o.z = cz + nz * r; const vn = o.vx * nx + o.vz * nz; if (vn < 0) { o.vx -= (1 + cfg.restitution) * vn * nx; o.vz -= (1 + cfg.restitution) * vn * nz; } } }
  return o;
}
/** cluster spots for pushables near each spawn: deterministic from the spawn list (so every client builds the same yard) */
export function pushSpots(spawns, cfg = PHYSX.push) {
  const kinds = ['crate', 'barrel', 'ball']; const out = []; for (let i = 0; i < (spawns || []).length && out.length < cfg.maxTotal; i++) { const s = spawns[i]; for (let k = 0; k < cfg.perCluster && out.length < cfg.maxTotal; k++) { const a = 1.1 + (i * 3 + k) * 2.1; const r = 5 + k * 1.6; out.push({ kind: kinds[(i + k) % 3], x: +(s.x + Math.cos(a) * r).toFixed(1), z: +(s.z + Math.sin(a) * r).toFixed(1) }); } }
  return out;
}
