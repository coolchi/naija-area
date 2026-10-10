// Client crash helpers (pure): the traffic decision with a server-issued hit, contact detection, health display with natural recovery.
import test from 'node:test'; import assert from 'node:assert/strict';
import { decide, gapAhead, stepSpeed, YIELD_CFG } from '../client/src/yield.js';
import { reached, healthNow, CRASH_UI } from '../client/src/crash.js';

test('decide: always yields to people unless the server allowed a hit for THIS vehicle; only the local player can be hit; other cars are always yielded to', () => {
  const car = { x: 0, z: 0, yaw: 0 }; const me = { x: 8, z: 0, r: 0.6, person: true, local: true }, ghost = { x: 8, z: 0, r: 0.6, person: true }, other = { x: 8, z: 0, r: 1.8, person: false };
  const hl = gapAhead(car, [me]), hg = gapAhead(car, [ghost]), ho = gapAhead(car, [other]); assert.equal(hl.local, true); assert.equal(hg.local, false);
  assert.equal(decide(hl).action, 'yield'); assert.equal(decide(hl, { hitAllowed: true }).action, 'hit'); assert.equal(decide(hg, { hitAllowed: true }).action, 'yield', 'ghosts of other players are never hit');
  assert.equal(decide(ho, { hitAllowed: true }).action, 'yield', 'a car is always yielded to'); assert.equal(decide(null).action, 'clear');
});
test('a vehicle allowed to hit does not brake for the player but still keeps its distance from other cars', () => {
  const car = { x: 0, z: 0, yaw: 0 }; const me = { x: 6, z: 0, r: 0.6, person: true, local: true }, other = { x: 9, z: 0, r: 1.8, person: false };
  let st = { v: 9, wait: 0 }; for (let i = 0; i < 20; i++) st = stepSpeed(st, 9, null, 0.05); assert.ok(st.v > 8.9, 'keeps its speed without a blocker');
  const blockers = [me, other].filter(b => !b.local); assert.equal(gapAhead(car, blockers).person, false, 'only the other car remains');
  let y = { v: 9, wait: 0 }; const h = gapAhead(car, [me]); for (let i = 0; i < 20; i++) y = stepSpeed(y, 9, h, 0.05); assert.ok(y.v < 7 && y.v < st.v - 2, 'without permission it brakes');
});
test('contact: the vehicle reaches a walking player at about 2.6 m and a driving player (bigger body) a little earlier', () => {
  assert.equal(reached({ x: 0, z: 0 }, { x: 5, z: 0 }), false); assert.equal(reached({ x: 0, z: 0 }, { x: 2.4, z: 0 }), true); assert.equal(reached({ x: 0, z: 0 }, { x: 3.5, z: 0 }, 0.6), false); assert.equal(reached({ x: 0, z: 0 }, { x: 3.5, z: 0 }, 1.8), true);
  assert.ok(CRASH_UI.holdSeconds > 0 && CRASH_UI.knockM > 0);
});
test('health display: recovers with time up to the maximum, never below the server value, null without data', () => {
  const hv = { health: 50, max: 100, at: 1000 }; assert.equal(healthNow(hv, 3, 1000), 50); assert.equal(healthNow(hv, 3, 1000 + 60000), 53); assert.equal(healthNow(hv, 3, 1000 + 1e9), 100); assert.equal(healthNow(hv, 3, 500), 50); assert.equal(healthNow(null, 3, 0), null);
  void YIELD_CFG;
});
