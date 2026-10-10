// Pure physics of Track G item 5: jump, throw flight, push, bounce. No clock, no randomness: every result is the same on every run and on server and client.
import test from 'node:test'; import assert from 'node:assert/strict';
import { PHYSX } from '../server/config/physx.js';
import { newJump, jumpStep, jumpApex, jumpAirtime, clearsSolid, throwStart, ballStep, simulateThrow, findHit, ballAt, newPushable, pushContact, pushStep, pushAgainstBoxes, pushSpots } from '../server/core/physx.js';
import { PHYS } from '../client/src/physics-config.js';

const run = (j, frames, fn, dt = 1 / 60) => { let peak = 0; for (let i = 0; i < frames; i++) { jumpStep(j, fn(i), dt); peak = Math.max(peak, j.y); } return peak; };

test('jump: apex and airtime follow v0 and gravity; one press is one jump; landing resets', () => {
  const j = newJump(); const peak = run(j, 90, i => i === 0 || (i > 0 && i < 20)); assert.ok(Math.abs(peak - jumpApex()) < 0.03, `${peak} vs ${jumpApex()}`);
  const k = newJump(); let t = 0; jumpStep(k, true, 1 / 120); while (k.air && t < 3) { jumpStep(k, false, 1 / 120); t += 1 / 120; } assert.ok(Math.abs(t - jumpAirtime()) < 0.04, `${t} vs ${jumpAirtime()}`); assert.equal(k.y, 0);
  const h = newJump(); let jumps = 0; for (let i = 0; i < 200; i++) { jumpStep(h, true, 1 / 60); if (h.justJumped) jumps++; } assert.equal(jumps, 1, 'holding the key does not bunny-hop');
});
test('jump: you cannot double jump in the air, coyote time and the early-press buffer both work, canJump=false blocks', () => {
  const j = newJump(); jumpStep(j, true, 1 / 60); assert.ok(j.air); for (let i = 0; i < 5; i++) jumpStep(j, false, 1 / 60); jumpStep(j, true, 1 / 60); assert.ok(!j.justJumped, 'no air jump'); const vy = j.vy; assert.ok(vy < PHYSX.jump.v0);
  const b = newJump(); let n = 0; for (let i = 0; i < 100; i++) { jumpStep(b, i === 0 || i === 36 || i === 37, 1 / 60); if (b.justJumped) n++; } assert.equal(n, 2, 'a press just before landing buffers a second jump');
  const c = newJump(); jumpStep(c, true, 1 / 60, PHYSX.jump, false); assert.ok(!c.air); const off = newJump(); jumpStep(off, true, 1 / 60, { ...PHYSX.jump, enabled: false }); assert.ok(!off.air);
});
test('jump: the apex is small and low props can be hopped, tall ones cannot', () => { assert.ok(jumpApex() > 0.6 && jumpApex() < 1.2); assert.ok(clearsSolid(0.8, PHYSX.solids.crate.h) === false, 'crate is 0.9 high: not clearable (> clearsPropHeight)'); assert.ok(clearsSolid(0.8, 0.5) && !clearsSolid(0.1, 0.5) && !clearsSolid(0.8, PHYSX.solids.lamp.h)); });

test('throw: the flight is deterministic, lands further with more power, stays on the ground plane and stops', () => {
  const lo = simulateThrow(throwStart(0, 0, 0, 0)), hi = simulateThrow(throwStart(0, 0, 0, 1)), again = simulateThrow(throwStart(0, 0, 0, 1)); assert.deepEqual(hi, again);
  const end = (s) => s[s.length - 1]; assert.ok(end(hi).x > end(lo).x * 2); assert.ok(end(hi).x < 60, 'max range is a throw, not a rocket: ' + end(hi).x); assert.ok(end(lo).x > 5);
  for (const s of hi) assert.ok(s.y >= PHYSX.throw.ballR - 1e-9); assert.ok(end(hi).t < PHYSX.throw.maxFlightSec); assert.ok(Math.abs(end(hi).z) < 1e-9, 'yaw 0 throws along +x');
  const left = simulateThrow(throwStart(0, 0, Math.PI / 2, 0.5)); assert.ok(end(left).z < -3 && Math.abs(end(left).x) < 1, 'yaw pi/2 throws along -z (the game: forward = (cos yaw, -sin yaw))');
});
test('throw: bad power is clamped; ballAt follows the samples and rests at the landing spot', () => {
  const a = throwStart(0, 0, 0, 5), b = throwStart(0, 0, 0, 1), c = throwStart(0, 0, 0, NaN), d = throwStart(0, 0, 0, 0.5); assert.deepEqual(a, b); assert.deepEqual(c, d);
  const st = throwStart(3, 4, 1, 0.7); const sm = simulateThrow(st); const mid = sm[Math.floor(sm.length / 2)]; const at = ballAt(st, mid.t); assert.ok(Math.hypot(at.x - mid.x, at.z - mid.z) < 0.05); const late = ballAt(st, 99); assert.ok(late.landed); assert.ok(Math.hypot(late.x - sm.at(-1).x, late.z - sm.at(-1).z) < 1e-6);
});
test('throw: findHit finds the first person near the path below head height, and not someone behind or far to the side', () => {
  const st = throwStart(0, 0, 0, 0.8); const sm = simulateThrow(st); const pass = sm.find(s => s.y > 0.9 && s.y < 1.7 && s.x > 5);
  assert.equal(findHit(sm, [{ id: 'near', x: pass.x, z: pass.z + 0.3 }])?.id, 'near'); assert.equal(findHit(sm, [{ id: 'side', x: pass.x, z: pass.z + 3 }]), null); assert.equal(findHit(sm, [{ id: 'behind', x: -4, z: 0 }]), null);
  const two = findHit(sm, [{ id: 'far', x: pass.x + 6, z: 0 }, { id: 'near', x: pass.x, z: 0 }]); assert.equal(two.id, 'near', 'the earlier one in the flight wins'); const hi = simulateThrow({ ...st, y: 10, vy: 0 }); assert.equal(findHit(hi.slice(0, 3), [{ id: 'x', x: hi[1].x, z: 0 }]), null, 'a ball over their head misses');
});
test('ballStep bounces lower each time and comes to rest', () => { const b = { x: 0, y: 3, z: 0, vx: 4, vy: 0, vz: 0 }; const heights = []; let prevVy = 0; for (let i = 0; i < 60 * 8 && !b.rest; i++) { ballStep(b, 1 / 60); if (prevVy < 0 && b.vy > 0) heights.push(b.vy); prevVy = b.vy; } assert.ok(b.rest); for (let i = 1; i < heights.length; i++) assert.ok(heights[i] < heights[i - 1]); });

test('push: walking into a crate moves it away along the contact normal, a heavy one slower than a ball; friction stops it; it never goes faster than maxSpeed', () => {
  const walker = { x: 0, z: 0, r: PHYSX.walkerRadius, vx: 2, vz: 0, mass: 75 }; const crate = newPushable('crate', 0.9, 0), ball = newPushable('ball', 0.7, 0);
  assert.ok(pushContact(crate, walker) && pushContact(ball, walker)); assert.ok(crate.vx > 0 && ball.vx > crate.vx, 'a ball flies off faster than a crate'); const fast = newPushable('ball', 0.7, 0); pushContact(fast, { ...walker, vx: 9 }); assert.ok(Math.hypot(fast.vx, fast.vz) <= PHYSX.push.maxSpeed + 1e-9, 'capped');
  assert.ok(Math.hypot(crate.x - walker.x, crate.z - walker.z) >= PHYSX.solids.crate.r + walker.r - 1e-6, 'pushed out of overlap');
  let t = 0; while ((crate.vx || crate.vz) && t < 20) { pushStep(crate, 1 / 60); t += 1 / 60; } assert.ok(t < 5 && crate.vx === 0, 'friction stops it'); const far = newPushable('crate', 5, 0); assert.equal(pushContact(far, walker), false);
  const away = newPushable('crate', 0.9, 0); pushContact(away, { ...walker, vx: -5 }); assert.equal(away.vx, 0, 'walking away does not pull it');
});
test('push: a pushed object bounces off a building box and does not end up inside it', () => { const o = newPushable('barrel', 4, 0); o.vx = 4; const box = { x0: 5, x1: 8, z0: -3, z1: 3 }; for (let i = 0; i < 120; i++) { pushStep(o, 1 / 60); pushAgainstBoxes(o, [box]); } assert.ok(o.x <= box.x0 - PHYSX.solids.barrel.r + 1e-6, 'x ' + o.x); assert.ok(o.vx <= 0.01); });
test('push: the yard around each spawn is deterministic and capped', () => { const sp = Array.from({ length: 30 }, (_, i) => ({ x: i * 40, z: 10 })); const a = pushSpots(sp), b = pushSpots(sp); assert.deepEqual(a, b); assert.ok(a.length <= PHYSX.push.maxTotal && a.length > 10); assert.ok(a.every(p => ['crate', 'barrel', 'ball'].includes(p.kind))); assert.equal(pushSpots([]).length, 0); });

test('numbers are sane against the movement rules: a jump is small, the throw cannot reach across a city, and the client physics config still sits under the server clamp', () => {
  assert.ok(PHYSX.throw.maxSpeed <= 25 && simulateThrow(throwStart(0, 0, 0, 1)).at(-1).x < 60); assert.ok(PHYSX.jump.v0 < 8); assert.equal(PHYSX.playersSolid, false); assert.ok(PHYS.walk.runSpeed <= 7 + 1e-9);
  for (const k of Object.keys(PHYSX.push.kinds)) assert.ok(PHYSX.solids[k], k);
});
