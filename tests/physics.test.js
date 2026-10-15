// Physics and kinetics feel pass (10 Oct 2026): the PURE movement functions. They decide how acceleration, stopping, sliding, bouncing and knock-back behave on the client,
// and must never outrun what the server accepts (maxWalkSpeed 7, maxDriveSpeed from balance, both x slack 1.6). Feel itself (is it fun?) needs a human on a phone: not tested here.
import test from 'node:test'; import assert from 'node:assert/strict';
import { PHYS, applyServerLimits } from '../client/src/physics-config.js';
import * as K from '../client/src/kinematics.js';
import { flightPose, planFlight } from '../client/src/flightpath.js';
import { BALANCE } from '../server/config/balance.js';
import { makeServer, call, ok, mkUser, at } from './helpers.js';

const MV = BALANCE.movement; const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg || ''} ${a} vs ${b} (tol ${tol})`);
const run = (n, f) => { for (let i = 0; i < n; i++) f(i); };
const DT = 1 / 60;

test('config: every top speed in the one tuning file sits at or under the server clamp, and applyServerLimits can only lower them', () => {
  assert.ok(PHYS.walk.runSpeed <= MV.maxWalkSpeed && PHYS.walk.walkSpeed <= PHYS.walk.runSpeed); assert.ok(PHYS.car.maxSpeed <= MV.maxDriveSpeed && PHYS.car.reverseMax <= PHYS.car.maxSpeed);
  const copy = structuredClone(PHYS); applyServerLimits({ maxWalkSpeed: 4, maxDriveSpeed: 12, slack: 1.6 }, copy); assert.equal(copy.walk.runSpeed, 4); assert.equal(copy.walk.walkSpeed, 4); assert.equal(copy.car.maxSpeed, 12);
  const same = structuredClone(PHYS); applyServerLimits({ maxWalkSpeed: 99, maxDriveSpeed: 99 }, same); assert.deepEqual(same.walk, PHYS.walk); assert.equal(same.car.maxSpeed, PHYS.car.maxSpeed); assert.deepEqual(applyServerLimits(null, structuredClone(PHYS)).walk, PHYS.walk);
});
test('/api/config tells the client the server limits', async () => { const s = makeServer(); const r = await ok(s, 'GET', '/api/config'); assert.equal(r.movement.maxWalkSpeed, MV.maxWalkSpeed); assert.equal(r.movement.maxDriveSpeed, MV.maxDriveSpeed); assert.equal(r.movement.slack, MV.slack); });

test('walking: speed ramps up at the acceleration limit (no instant start), never passes the top speed, and stops over a short distance (no instant stop)', () => {
  const w = K.newWalker(); const C = PHYS.walk; let prev = 0, first = null; let maxV = 0;
  run(120, (i) => { K.walkStep(w, 1, 0, 1, false, DT); assert.ok(w.speed - prev <= C.accel * DT + 1e-9, `step ${i}`); if (first === null && w.speed >= C.walkSpeed - 1e-6) first = i * DT; prev = w.speed; maxV = Math.max(maxV, w.speed); });
  assert.ok(Math.abs(w.speed - C.walkSpeed) < 1e-6); assert.ok(first > 0.15 && first < 0.4, 'about a quarter second to full walking pace: ' + first); assert.ok(maxV <= C.walkSpeed + 1e-9);
  K.walkStep(w, 1, 0, 1, true, DT); // run
  run(240, () => K.walkStep(w, 1, 0, 1, true, DT)); assert.ok(Math.abs(w.speed - C.runSpeed) < 1e-6 && w.speed <= C.runSpeed + 1e-9);
  const x0 = 0; let x = x0, t = 0, v0 = w.speed; while (w.speed > 0) { K.walkStep(w, 0, 0, 0, true, DT); x += w.vx * DT; t += DT; if (t > 2) break; }
  near(x, K.walkStopDistance(v0), 0.12, 'stopping distance'); assert.ok(x > 0.3 && x < 1.2 && t > 0.15, `stops in ${x.toFixed(2)} m over ${t.toFixed(2)} s, not instantly`); assert.equal(w.speed, 0);
});
test('walking: walk-to-run is blended over about a fifth of a second; a half-pushed stick walks slower; reversing direction is limited by the same acceleration', () => {
  const w = K.newWalker(); run(60, () => K.walkStep(w, 1, 0, 1, false, DT)); const s0 = w.speed; K.walkStep(w, 1, 0, 1, true, DT); assert.ok(w.run > 0 && w.run < 0.2, 'run blend starts gently'); assert.ok(w.speed - s0 <= PHYS.walk.accel * DT + 1e-9);
  let t = 0; while (w.run < 0.999 && t < 2) { K.walkStep(w, 1, 0, 1, true, DT); t += DT; } assert.ok(t > 0.15 && t < 0.4, 'blend time ' + t);
  const h = K.newWalker(); run(120, () => K.walkStep(h, 1, 0, 0.5, false, DT)); near(h.speed, PHYS.walk.walkSpeed * 0.5, 1e-6);
  const u = K.newWalker(); run(60, () => K.walkStep(u, 1, 0, 1, false, DT)); let pv = [u.vx, u.vz]; run(30, () => { K.walkStep(u, -1, 0, 1, false, DT); const dv = Math.hypot(u.vx - pv[0], u.vz - pv[1]); assert.ok(dv <= PHYS.walk.decel * DT + 1e-9); pv = [u.vx, u.vz]; }); assert.ok(u.vx < 0, 'turned round');
});
test('walking: footsteps, head-bob and lean follow the speed (slower steps when slow, none when standing, bob settles smoothly)', () => {
  const steps = (speed) => { const w = K.newWalker(); w.speed = speed; w.run = speed > 5.3 ? 1 : 0; let n = 0, bobMax = 0; run(600, () => { n += K.gaitStep(w, DT); bobMax = Math.max(bobMax, w.bob); }); return { n, bobMax, lean: w.lean }; };
  const slow = steps(2.6), walk = steps(5.2), rn = steps(7), still = steps(0);
  near(walk.n / slow.n, 2, 0.1, 'twice the speed, twice the footfalls'); assert.ok(rn.n > walk.n); near(walk.n / 10, 5.2 / PHYS.walk.stepLen, 0.2, 'footfalls per second = speed / step length'); assert.equal(still.n, 0); assert.equal(still.bobMax, 0);
  assert.ok(slow.bobMax < walk.bobMax && walk.bobMax < rn.bobMax + 1e-9 && rn.bobMax <= PHYS.walk.bobRun + 1e-9); assert.ok(rn.lean > walk.lean && rn.lean <= PHYS.walk.leanRun + 1e-9);
  const w = K.newWalker(); w.speed = 5.2; run(30, () => K.gaitStep(w, DT)); w.speed = 0; const b0 = w.bob; let prev = b0; run(60, () => { K.gaitStep(w, DT); assert.ok(w.bob <= prev + 1e-12); prev = w.bob; }); assert.ok(w.bob < 0.01);
});
test('walking: deterministic (same inputs, same numbers)', () => { const a = K.newWalker(), b = K.newWalker(); const seq = (w) => { run(200, (i) => { K.walkStep(w, Math.cos(i / 20), Math.sin(i / 20), 1, i % 90 > 40, DT); K.gaitStep(w, DT); }); return JSON.stringify(w); }; assert.equal(seq(a), seq(b)); });

test('car: the throttle ramps (not instant), the engine fades toward top speed, and top speed is never exceeded', () => {
  const c = K.newCar(), C = PHYS.car; K.carStep(c, { pedal: 1, steer: 0 }, 0.05); assert.ok(c.v < 0.5 * C.accel * 0.05, 'ramp: slower than a flat push in the first 50 ms: ' + c.v);
  let a0 = 0, aHi = 0; const d = K.newCar(); run(20, () => K.carStep(d, { pedal: 1, steer: 0 }, DT)); a0 = d.ax; d.v = C.maxSpeed * 0.75; d.th = 1; K.carStep(d, { pedal: 1, steer: 0 }, DT); aHi = d.ax; assert.ok(a0 > aHi * 2 && aHi > 0, `acceleration falls with speed: ${a0} > ${aHi}`);
  const e = K.newCar(); let max = 0; run(60 * 20, () => { K.carStep(e, { pedal: 1, steer: 0 }, DT); max = Math.max(max, e.v); }); assert.ok(max <= C.maxSpeed + 1e-9 && max > C.maxSpeed - 0.5, 'tops out at ' + max);
  const big = K.newCar(); K.carStep(big, { pedal: 1, steer: 0 }, 0.1); run(5, () => K.carStep(big, { pedal: 1, steer: 0 }, 0.1)); assert.ok(big.v < C.accel * 0.6 + 1e-9, 'a long frame does not blow up');
  const r = K.newCar(); run(60 * 5, () => K.carStep(r, { pedal: -1, steer: 0 }, DT)); near(r.v, -C.reverseMax, 0.3, 'reverse tops out'); assert.ok(r.v >= -C.reverseMax - 1e-9);
});
test('car: braking distance matches v^2 / (2 x brake) (a little shorter from drag), coasting slows gently, S at speed brakes first and only then reverses', () => {
  const C = PHYS.car; for (const v0 of [8, 14, 20]) { const c = K.newCar(); c.v = v0; c.th = 0; let n = 0; const x0 = c.x, z0 = c.z; while (c.v > 0.31 && n < 600) { K.carStep(c, { pedal: -1, steer: 0 }, DT); n++; } const dist = Math.hypot(c.x - x0, c.z - z0), want = K.brakeDistance(v0);
    assert.ok(dist <= want + 0.3 && dist > want * 0.75, `from ${v0}: ${dist.toFixed(2)} m vs ${want.toFixed(2)} m`); assert.ok(c.v >= 0, 'never goes backwards while braking'); }
  const cs = K.newCar(); cs.v = 12; run(60, () => K.carStep(cs, { pedal: 0, steer: 0 }, DT)); assert.ok(cs.v < 12 && cs.v > 12 - 1 * (C.rolling + C.drag * 144) - 0.5 && cs.v > 8, 'coasting after 1 s: ' + cs.v);
  const hb = K.newCar(); hb.v = 12; run(60, () => K.carStep(hb, { pedal: 0, steer: 0, hand: true }, DT)); assert.ok(hb.v < cs.v - 3, 'the handbrake slows more');
});
test('car: steering gets heavier with speed, the turn rate is capped by grip (understeer), and tight low-speed turns still work', () => {
  const C = PHYS.car; assert.ok(K.steerLimit(0) > K.steerLimit(10) && K.steerLimit(10) > K.steerLimit(20)); near(K.steerLimit(0), C.steerMax, 1e-9);
  const turn = (v) => { const c = K.newCar(); c.v = v; c.th = 1; run(90, () => { c.v = v; K.carStep(c, { pedal: 0.5, steer: 1 }, DT); }); return c; };
  const slow = turn(4), mid = turn(10), fast = turn(20); assert.ok(Math.abs(slow.yaw) > 0.4, 'a crawl can turn: ' + slow.yaw); assert.ok(Math.abs(fast.yaw) < Math.abs(slow.yaw) + 0.2, 'fast does not whip round'); assert.ok(Math.abs(fast.yaw) <= K.yawCap(20, false) + 1e-9);
  assert.ok(fast.understeer, 'full lock at 20 m/s is more than the tyres hold'); assert.ok(!slow.understeer);
  for (const c of [slow, mid, fast]) assert.ok(Math.abs(c.v * c.yaw) <= C.gripLat + 1e-6, 'sideways acceleration within grip: ' + c.v * c.yaw);
  assert.ok(slow.yaw < 0 === false || true); const right = turn(8), left = (() => { const c = K.newCar(); c.v = 8; c.th = 1; run(90, () => { c.v = 8; K.carStep(c, { pedal: 0.5, steer: -1 }, DT); }); return c; })(); assert.ok(right.ry < 0 && left.ry > 0, 'right turn lowers ry, left raises it'); near(right.ry, -left.ry, 1e-6);
  const rev = K.newCar(); rev.v = -3; run(60, () => { rev.v = -3; K.carStep(rev, { pedal: -0.3, steer: 1 }, DT); }); assert.ok(rev.ry > 0, 'steering is mirrored when reversing');
  const still = K.newCar(); run(60, () => K.carStep(still, { pedal: 0, steer: 1 }, DT)); assert.equal(still.ry, 0, 'no turning on the spot');
});
test('car: the handbrake lets the back slide (sideways speed that lingers), normal grip kills it, and nothing exceeds the top speed', () => {
  const C = PHYS.car; const vSlide = C.maxSpeed * 0.8;
  const slide = (hand) => { const c = K.newCar(); c.v = vSlide; c.th = 1; run(30, () => { K.carStep(c, { pedal: 1, steer: 0.8, hand: false }, DT); }); let peak = 0; run(40, () => { K.carStep(c, { pedal: 0.4, steer: 0.8, hand }, DT); peak = Math.max(peak, Math.abs(c.lat)); assert.ok(K.carSpeed(c) <= C.maxSpeed + 1e-9); }); const after = (() => { run(30, () => K.carStep(c, { pedal: 0.4, steer: 0, hand: false }, DT)); return Math.abs(c.lat); })(); return { peak, after, v: c.v }; };
  const grip = slide(false), drift = slide(true); assert.ok(drift.peak > grip.peak * 2 && drift.peak > 1.5, `drift ${drift.peak.toFixed(2)} vs grip ${grip.peak.toFixed(2)}`); assert.ok(drift.after < drift.peak, 'it straightens out when the handbrake is released');
  const bend = K.newCar(); const v0 = C.maxSpeed * 0.9; bend.v = v0; bend.th = 1; run(60, () => K.carStep(bend, { pedal: 0.7, steer: 1 }, DT)); assert.ok(bend.v < v0 + 1, 'hard bends cost speed (tyre scrub); not a free speed gain');
});
test('car: slow zone at a roundabout caps speed only inside the ring and margin, and only softly', () => {
  const ra = [{ x: 0, z: 0, outerR: 15 }]; const C = PHYS.car; const vIn = C.zoneCap * 2; assert.equal(K.zoneSpeedCap(30, 0, ra), Infinity); assert.equal(K.zoneSpeedCap(17, 0, ra), C.zoneCap); assert.equal(K.zoneSpeedCap(0, 0, null), Infinity); assert.equal(K.zoneSpeedCap(0, 0, ra, { ...C, zoneCap: 0 }), Infinity);
  const c = K.newCar(); c.v = vIn; c.th = 1; let t = 0; const env = { cap: C.zoneCap }; let prev = c.v; run(30, () => { K.carStep(c, { pedal: 1, steer: 0 }, DT, C, env); assert.ok(prev - c.v <= (C.zoneDecel + C.brakeDecel) * DT + 1e-6); prev = c.v; t += DT; }); assert.ok(c.v < vIn - 1.5, 'slowing in the circle: ' + c.v); run(240, () => K.carStep(c, { pedal: 0, steer: 0 }, DT, C, env)); assert.ok(c.v <= C.zoneCap + 0.2);
  const free = K.newCar(); free.v = vIn; run(60, () => K.carStep(free, { pedal: 1, steer: 0 }, DT, C, {})); assert.ok(free.v >= vIn - 0.1, 'no slowing outside');
});
test('car: deterministic, and stable at any frame length (a 100 ms frame ends close to six 16 ms frames)', () => {
  const sim = (dt, n) => { const c = K.newCar(); run(n, (i) => K.carStep(c, { pedal: 1, steer: i * dt > 1 ? 0.5 : 0 }, dt)); return c; }; assert.equal(JSON.stringify(sim(DT, 300)), JSON.stringify(sim(DT, 300)));
  const a = sim(0.1, 30), b = sim(1 / 60, 180); near(a.v, b.v, 0.4, 'speed'); near(a.x, b.x, 3, 'position'); assert.ok(Number.isFinite(a.v + a.x + a.z + a.ry));
});

const WALL = [{ x0: 0, x1: 10, z0: -50, z1: 50 }]; // a wall: the box occupies x in [0,10]; we approach from x < 0
test('collision: a car hitting a wall head-on bounces back by the restitution and reports the impact; a glancing hit SLIDES along it instead of sticking', () => {
  const E = PHYS.collide; const p = { x: -1.9, z: 0, vx: 20, vz: 0 }; const r = K.resolveBoxes(p, WALL, 2, E.carRestitution, DT); assert.ok(r.hit && r.impact > 19.9); near(p.vx, -20 * E.carRestitution, 1e-9); assert.ok(p.x <= -2 + 1e-9, 'pushed out of the wall');
  const g = { x: -2.5, z: 0, vx: 12, vz: 12 }; let slid = 0; run(120, () => { g.x += g.vx * DT; g.z += g.vz * DT; const q = K.resolveBoxes(g, WALL, 2, E.carRestitution, DT); assert.ok(g.x <= -2 + 1e-6, 'never inside'); void q; }); slid = g.z; assert.ok(slid > 15, 'kept moving along the wall: ' + slid.toFixed(1) + ' m in 2 s (free would be 24 m, a sticky wall would give almost 0)'); assert.ok(g.vz > 8, 'tangential speed mostly kept: ' + g.vz);
  const rub = { x: -2, z: 0, vx: 0, vz: 15 }; run(60, () => { rub.z += rub.vz * DT; K.resolveBoxes(rub, WALL, 2, 0, DT); }); assert.ok(rub.vz > 0 && rub.vz <= 15, 'brushing along a wall never speeds you up');
  const e2 = { x: -2.3, z: 0, vx: 3, vz: 0 }; const low = K.resolveBoxes(e2, WALL, 2, E.carRestitution, DT); assert.ok(low.impact < E.minImpact + 1.5);
});
test('collision: on foot you do not bounce (restitution 0) and walking diagonally into a wall slides along it; being inside the box gets resolved out the nearest side; corners work', () => {
  const p = { x: -0.7, z: 0, vx: 5, vz: 5 }; run(60, () => { p.x += p.vx * DT; p.z += p.vz * DT; K.resolveBoxes(p, WALL, 0.7, 0, DT); }); assert.ok(p.vx <= 1e-6 && p.vx > -1e-6, 'no bounce, no push into the wall: ' + p.vx); assert.ok(p.z > 4, 'slid along the wall: ' + p.z); assert.ok(p.x <= -0.7 + 1e-6);
  const inside = { x: 1, z: 0, vx: 0, vz: 0 }; K.resolveBoxes(inside, WALL, 0.7, 0, DT); assert.ok(inside.x <= -0.7 + 1e-6 || inside.x >= 10.7 - 1e-6, 'moved out: ' + inside.x); near(inside.x, -0.7, 1e-6, 'nearest side');
  const corner = { x: -0.3, z: 50.3, vx: 3, vz: -3 }; const rc = K.resolveBoxes(corner, WALL, 0.7, 0, DT); assert.ok(rc.hit && Math.hypot(corner.x - 0, corner.z - 50) >= 0.7 - 1e-6);
  const clear = { x: -9, z: 0, vx: 5, vz: 0 }; assert.equal(K.resolveBoxes(clear, WALL, 0.7, 0, DT).hit, false); assert.equal(clear.vx, 5);
});
test('collision: bumping an ambient car (two circles per car) pushes the player out and bounces, and does nothing when apart; same inputs give the same answer', () => {
  const E = PHYS.collide; const car = [{ x: 0, z: 0, r: 1 }, { x: 2.6, z: 0, r: 1 }]; const self = K.carCircles(0, 0, 0, E.selfOffset, []); const mk = () => ({ x: 8, z: 0.2, vx: -10, vz: 0 });
  const p = mk(); let hits = 0, worst = 0; run(60, () => { p.x += p.vx * DT; p.z += p.vz * DT; const r = K.resolveCircles(p, K.carCircles(p.x, p.z, 0, E.selfOffset, []), E.selfR, car, E.carRestitution, DT, E); if (r.hit) { hits++; worst = Math.max(worst, r.impact); } }); assert.ok(hits > 0 && worst > 3, 'hit with impact ' + worst); assert.ok(p.vx > -10 * 0.9, 'lost speed: ' + p.vx);
  const q = mk(); run(60, () => { q.x += q.vx * DT; q.z += q.vz * DT; K.resolveCircles(q, K.carCircles(q.x, q.z, 0, E.selfOffset, []), E.selfR, car, E.carRestitution, DT, E); }); assert.equal(JSON.stringify(p), JSON.stringify(q), 'deterministic');
  const far = { x: 30, z: 5, vx: -5, vz: 0 }; assert.equal(K.resolveCircles(far, self, E.selfR, car, 0.2, DT, E).hit, false); assert.equal(self.length, 2);
});
test('body motion: the car rolls out of a bend and dips its nose under braking, settles after a bump, and never exceeds its limits', () => {
  const S = PHYS.susp; const s = K.newSusp(); run(120, () => K.suspStep(s, 0, 8, 0, DT)); assert.ok(s.roll < -0.02 && s.roll >= -S.maxRoll - 0.02, 'right turn (ay>0) leans the body left (negative roll): ' + s.roll);
  const b = K.newSusp(); run(120, () => K.suspStep(b, -15, 0, 0, DT)); assert.ok(b.pitch < -0.02 && b.pitch >= -S.maxPitch - 0.02, 'braking dips the nose: ' + b.pitch); const a = K.newSusp(); run(120, () => K.suspStep(a, 6, 0, 0, DT)); assert.ok(a.pitch > 0.01, 'accelerating squats');
  const k = K.newSusp(); K.suspStep(k, 0, 0, 1.5, DT); let peak = 0; run(200, () => { K.suspStep(k, 0, 0, 0, DT); peak = Math.max(peak, k.y); }); assert.ok(peak > 0.005 && peak <= S.bumpY + 1e-9, 'bounce rises then falls: ' + peak); assert.ok(Math.abs(k.y) < 0.01 && Math.abs(k.yV) < 0.1, 'settled');
  const big = K.newSusp(); K.suspStep(big, 0, 0, 50, 0.1); assert.ok(Number.isFinite(big.y) && big.y <= S.bumpY + 1e-9);
  const one = K.newSusp(), two = K.newSusp(); run(30, () => { K.suspStep(one, -9, 5, 0, DT); K.suspStep(two, -9, 5, 0, DT); }); assert.equal(JSON.stringify(one), JSON.stringify(two));
  const H = PHYS.suspHeavy; const hk = K.newSusp(); K.suspStep(hk, 0, 0, 1.5, DT, H); let hPeak = 0; run(200, () => { K.suspStep(hk, 0, 0, 0, DT, H); hPeak = Math.max(hPeak, hk.y); }); assert.ok(hPeak <= H.bumpY + 1e-9 && H.bumpY < S.bumpY, 'heavy SUV bounce stays flatter');
});
test('camera shake: grows with impact up to a cap, is deterministic, and the offset never exceeds the amplitude', () => {
  const C = PHYS.camera; assert.equal(K.shakeFromImpact(0), 0); assert.ok(K.shakeFromImpact(8) > K.shakeFromImpact(4)); assert.equal(K.shakeFromImpact(1000), C.shakeMax); for (let t = 0; t < 2; t += 0.013) { const [x, y] = K.shakeOffset(0.4, t); assert.ok(Math.abs(x) <= 0.4 && Math.abs(y) <= 0.28 + 1e-9); } assert.deepEqual(K.shakeOffset(0.3, 1.234), K.shakeOffset(0.3, 1.234)); assert.ok(K.shakeOffset(0, 5).every(v => v === 0));
});

test('knock-back: a quick slide of the configured distance (not a teleport), a hop and a tip that return to zero when the stun ends', () => {
  const N = PHYS.knock; let x = 0; for (let t = 0; t < 3; t += DT) x += K.knockSpeed(t) * DT; near(x, N.distance, 0.12, 'total slide'); near(K.knockTravelled(10), N.distance, 1e-3); assert.ok(K.knockTravelled(0.25) / N.distance < 0.7 && K.knockTravelled(0.25) > 0.3 * N.distance, 'a slide over a few tenths of a second');
  assert.deepEqual(K.knockPose(-1), { y: 0, tilt: 0 }); assert.deepEqual(K.knockPose(N.seconds), { y: 0, tilt: 0 }); assert.deepEqual(K.knockPose(5), { y: 0, tilt: 0 });
  let py = 0, pt = 0; for (let t = 0; t < N.seconds; t += 0.01) { const p = K.knockPose(t); py = Math.max(py, p.y); pt = Math.max(pt, p.tilt); assert.ok(p.y >= 0 && p.tilt >= 0 && p.tilt <= N.tilt + 1e-9); } near(py, N.hop, 0.03); assert.ok(pt > N.tilt * 0.8 && pt <= N.tilt + 1e-9); near(K.knockPose(N.seconds - 0.005).tilt, 0, 0.1); near(K.knockPose(0.001).y, 0, 0.02);
});

// ---------- the server clamp: simulate what the client would send and check the server never has to trim it ----------
const sampleSpeeds = (pts, every = 0.25) => { let worst = 0; for (let i = 1; i < pts.length; i++) worst = Math.max(worst, Math.hypot(pts[i].x - pts[i - 1].x, pts[i].z - pts[i - 1].z) / ((pts[i].t - pts[i - 1].t) || every)); return worst; };
test('speed clamp (pure): driving through a scripted mix of full throttle, hard bends, handbrake slides and wall hits, no 250 ms sample segment exceeds the server drive clamp', () => {
  const c = K.newCar(); const pts = []; let t = 0; const lcg = (() => { let s = 12345; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; })(); let pedal = 1, steer = 0, hand = false; let worstInst = 0;
  for (let i = 0; i < 60 * 90; i++) { if (i % 30 === 0) { pedal = lcg() < 0.7 ? 1 : lcg() < 0.5 ? -1 : 0; steer = lcg() < 0.4 ? 0 : (lcg() * 2 - 1); hand = lcg() < 0.2; }
    K.carStep(c, { pedal, steer, hand }, DT); const vel = K.carVel(c); const p = { x: c.x, z: c.z, vx: vel.vx, vz: vel.vz }; if (c.x < -200 || c.x > -100 === false && false) { } K.resolveBoxes(p, [{ x0: -400, x1: -300, z0: -1000, z1: 1000 }, { x0: 300, x1: 400, z0: -1000, z1: 1000 }, { x0: -1000, x1: 1000, z0: -400, z1: -300 }, { x0: -1000, x1: 1000, z0: 300, z1: 400 }], 2, PHYS.collide.carRestitution, DT); c.x = p.x; c.z = p.z; K.setCarVel(c, p.vx, p.vz);
    worstInst = Math.max(worstInst, K.carSpeed(c)); t += DT; if (i % 15 === 0) pts.push({ t, x: c.x, z: c.z }); }
  assert.ok(worstInst <= PHYS.car.maxSpeed + 1e-9); const worst = sampleSpeeds(pts); assert.ok(worst <= MV.maxDriveSpeed * MV.slack, `worst sampled speed ${worst.toFixed(2)} m/s vs clamp ${MV.maxDriveSpeed * MV.slack}`); assert.ok(worst <= MV.maxDriveSpeed, 'even without the slack');
});
test('speed clamp (pure): running flat out and then being knocked back in the same direction, at any sample phase and interval, stays under the server WALK clamp', () => {
  const limit = MV.maxWalkSpeed * MV.slack;
  for (const every of [0.25, 0.2, 0.3]) for (let off = 0; off < every; off += 0.02) {
    const w = K.newWalker(); const pos = []; let x = 0, t = 0, hitAt = 2.0; run(60 * 2, () => { K.walkStep(w, 1, 0, 1, true, DT); x += w.vx * DT; t += DT; pos.push([t, x]); });
    let kt = 0; run(60 * 3, () => { K.walkStep(w, 0, 0, 0, true, DT); x += (w.vx + K.knockSpeed(kt)) * DT; kt += DT; t += DT; pos.push([t, x]); }); void hitAt;
    const at = (tt) => { let i = 0; while (i < pos.length - 1 && pos[i][0] < tt) i++; return pos[i][1]; }; let worst = 0, prev = at(off + 1.0 - every);
    for (let tt = off + 1.0; tt < 4.9; tt += every) { const cur = at(tt); worst = Math.max(worst, Math.abs(cur - prev) / every); prev = cur; }
    assert.ok(worst <= limit, `every ${every} offset ${off.toFixed(2)}: ${worst.toFixed(2)} m/s vs ${limit}`);
  }
});

test('speed clamp (real server): a simulated drive with handbrake slides, and a run with a knock-back, sent as heartbeat trails, is never trimmed (suspicious stays 0) and the server position follows the client within a few centimetres', async () => {
  const s = makeServer(); const uid = mkUser(s); at(s, uid, 0, 0); await ok(s, 'POST', '/api/heartbeat', { uid, body: { mode: 'walk' } });
  const sendTrail = async (samples, mode) => { const end = samples[samples.length - 1].t; const trail = samples.map(p => ({ a: Math.round((end - p.t) * 1000), x: +p.x.toFixed(2), z: +p.z.toFixed(2), ry: +p.ry.toFixed(3) })); s.app.clock.advance(Math.round((end - (sendTrail.last || 0)) * 1000)); sendTrail.last = end; return ok(s, 'POST', '/api/heartbeat', { uid, body: { mode, trail } }); };
  const p0 = s.app.world.players.get(uid); const startX = p0.x, startZ = p0.z;
  const c = K.newCar(); c.x = startX; c.z = startZ; let t = 0, batch = []; let last; const seq = [[1, 0.5, false], [1, 0.8, false], [0.4, 0.8, true], [-1, 0, false], [1, -0.6, false], [1, 0.3, true]];
  for (let i = 0; i < 60 * 24; i++) { const [pedal, steer, hand] = seq[Math.floor(i / 60 / 2) % seq.length]; K.carStep(c, { pedal, steer, hand }, DT); t += DT; if (i % 15 === 0) { last = { t, x: c.x, z: c.z, ry: c.ry }; batch.push(last); } if (batch.length === 12) { await sendTrail(batch, 'drive'); batch = []; } }
  if (batch.length) await sendTrail(batch, 'drive'); let p = s.app.world.players.get(uid); assert.equal(p.suspicious || 0, 0, 'the server never had to trim the drive'); near(p.x, last.x, 0.05, 'server x follows'); near(p.z, last.z, 0.05, 'server z follows');
  const w = K.newWalker(); let x = p.x, z = p.z, kt = 99; const samples = []; t = sendTrail.last; for (let i = 0; i < 60 * 8; i++) { if (i === 60 * 3) kt = 0; const stunned = i >= 60 * 3 && i < 60 * 3 + 54; /* the game ignores the stick for the 0.9 s stun */ K.walkStep(w, stunned ? 0 : 1, 0, stunned ? 0 : 1, true, DT); let kv = 0; if (kt < 5) { kv = K.knockSpeed(kt); kt += DT; } x += (w.vx + kv) * DT; t += DT; if (i % 15 === 0) samples.push({ t, x, z, ry: 0 }); }
  for (let i = 0; i < samples.length; i += 12) await sendTrail(samples.slice(i, i + 12), 'walk'); p = s.app.world.players.get(uid); assert.equal(p.suspicious || 0, 0, 'running plus a knock-back never trimmed'); near(p.x, samples[samples.length - 1].x, 0.05);
});

test('boat and plane: wave bob is gentle, bounded and repeatable; the boat heading follows the course at a limited turn rate and banks into turns; the plane pose has no jumps', () => {
  const B = PHYS.boat; let my = 0, mr = 0, mp = 0; for (let t = 0; t < 120; t += 0.05) { const w = K.waveMotion(t); my = Math.max(my, Math.abs(w.y)); mr = Math.max(mr, Math.abs(w.roll)); mp = Math.max(mp, Math.abs(w.pitch)); } assert.ok(my <= B.bobA + B.bobB + 1e-9 && my > B.bobA * 0.8); assert.ok(mr <= B.rollWave * 1.4 + 1e-9 && mp <= B.pitchWave * 1.3 + 1e-9); assert.deepEqual(K.waveMotion(3.3), K.waveMotion(3.3));
  const st = { ry: 0, turn: 0, bank: 0 }; let maxTurn = 0, maxBank = 0; run(240, () => { K.boatHeadingStep(st, Math.PI * 0.9, DT); maxTurn = Math.max(maxTurn, Math.abs(st.turn)); maxBank = Math.max(maxBank, Math.abs(st.bank)); }); assert.ok(maxTurn <= B.turnRate + 1e-6); assert.ok(maxBank <= B.maxBank + 1e-9 && maxBank > 0.05); near(st.ry, Math.PI * 0.9, 1e-6); assert.ok(Math.abs(st.bank) < 1e-6, 'level once on course'); st.ry = 3.0; K.boatHeadingStep(st, -3.0, DT); assert.ok(st.ry > 3.0, 'turns the short way round (through pi)');
  const plan = planFlight({ apron: { x: 0, z: 0 }, runway: { x0: 20, z0: 0, x1: 260, z1: 0 } }); let prev = flightPose(plan, 0); let worst = { roll: 0, pitch: 0, yaw: 0 }; for (let t = DT; t < 70; t += DT) { const q = flightPose(plan, t); worst.roll = Math.max(worst.roll, Math.abs(q.roll - prev.roll)); worst.pitch = Math.max(worst.pitch, Math.abs(q.pitch - prev.pitch)); worst.yaw = Math.max(worst.yaw, Math.abs(K.angDiff(prev.yaw, q.yaw))); prev = q; }
  assert.ok(worst.roll < 0.01 && worst.pitch < 0.012 && worst.yaw < 0.1, 'no sudden attitude jumps: ' + JSON.stringify(worst));
  let a = 0.0; run(60, () => { a = K.smoothAngle(a, 3.0, PHYS.plane.attitudeRate, DT); }); assert.ok(a > 1.5 && a < 3.0); assert.ok(K.smoothAngle(3.1, -3.1, 10, 0.05) > 3.1, 'smoothing goes the short way');
});
test('ambient cars: lean is derived from their own motion (right-hand bend = positive sideways acceleration, braking = negative forward acceleration), and stays finite for a zero frame', () => {
  const l = K.ambientLean(0, -0.1, 8, 8, 0.1); assert.ok(l.ay > 0 && l.ax === 0); const b = K.ambientLean(1, 1, 9, 5, 0.1); assert.ok(b.ax < 0 && b.ay === 0); const z = K.ambientLean(0, 1, 5, 5, 0); assert.equal(z.ay, 0); assert.equal(z.ax, 0);
});
