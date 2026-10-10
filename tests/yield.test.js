import test from 'node:test'; import assert from 'node:assert/strict';
import { gapAhead, stepSpeed, decide, YIELD_CFG as C } from '../client/src/yield.js';

const car = { x: 0, z: 0, yaw: 0 }; // heading +x
test('gapAhead: sees a person in the forward box, ignores one behind, beside, or too far', () => {
  assert.equal(gapAhead(car, [{ x: 8, z: 0.5, r: 0.5, person: true }]).person, true);
  assert.ok(Math.abs(gapAhead(car, [{ x: 8, z: 0, r: 0.5, person: true }]).gap - 7.5) < 1e-9);
  assert.equal(gapAhead(car, [{ x: -5, z: 0, r: 0.5, person: true }]), null); assert.equal(gapAhead(car, [{ x: 8, z: 6, r: 0.5, person: true }]), null); assert.equal(gapAhead(car, [{ x: 40, z: 0, r: 0.5, person: true }]), null);
  const n = gapAhead(car, [{ x: 12, z: 0, r: 0.5, person: true }, { x: 6, z: 0, r: 1.8, person: false }]); assert.equal(n.person, false, 'nearest blocker wins');
  const yawN = { x: 0, z: 0, yaw: Math.PI / 2 }; assert.ok(gapAhead(yawN, [{ x: 0, z: -6, r: 0.5, person: true }]), 'heading -z (yaw pi/2)');
});
test('stepSpeed: brakes smoothly to a stop before the person, never moves into them, and does not stop with a clear road', () => {
  let st = { v: 8, wait: 0 }; let x = 0; const person = 20; let stopped = false;
  for (let i = 0; i < 400; i++) { const hit = gapAhead({ x, z: 0, yaw: 0 }, [{ x: person, z: 0, r: 0.5, person: true }]); const nv = stepSpeed(st, 8, hit, 0.016); assert.ok(st.v - nv.v <= C.maxDecel * 0.016 + 1e-9, 'smooth decel'); st = nv; x += st.v * 0.016; assert.ok(person - 0.5 - x >= C.minGap - 0.05, 'never closer than minGap at ' + i); if (st.v < 0.05) stopped = true; }
  assert.ok(stopped, 'car stopped'); const gapFinal = person - 0.5 - x; assert.ok(gapFinal >= C.minGap && gapFinal <= C.stopGap + 1.6, 'stops near the person: ' + gapFinal);
  let clear = { v: 0, wait: 0 }; for (let i = 0; i < 200; i++) clear = stepSpeed(clear, 8, null, 0.016); assert.ok(clear.v > 7.9, 'accelerates again once clear'); assert.ok(clear.v <= 8);
});
test('stepSpeed: after the 2 to 4 s wait it honks and creeps (people) but stays outside the minimum gap; other cars are ignored for a while so crossings do not deadlock', () => {
  let st = { v: 0, wait: 0, limit: 3 }; let honked = false; for (let i = 0; i < 400; i++) { const nv = stepSpeed(st, 8, { gap: C.stopGap - 0.5, person: true }, 0.05); honked ||= nv.honk; st = { ...nv, limit: 3 }; } assert.ok(honked, 'horns after waiting'); assert.ok(st.v <= C.creepSpeed + 1e-9, 'only creeps');
  let s2 = { v: 0, wait: 0, limit: 2 }; let went = false; for (let i = 0; i < 200; i++) { s2 = { ...stepSpeed(s2, 8, { gap: 2.5, person: false }, 0.05), limit: 2 }; if (s2.v > 3) went = true; } assert.ok(went, 'car-car deadlock resolves after the wait');
  assert.ok(C.waitMin >= 2 && C.waitMax <= 4);
});
test('decide: the yield-or-hit hook always yields for now (hits are held, not built)', () => { assert.equal(decide({ gap: 1, person: true }, { speed: 9 }).action, 'yield'); assert.equal(decide(null, {}).action, 'clear'); });
