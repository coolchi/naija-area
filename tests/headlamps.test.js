// Car headlamps at night: pure helpers + the instanced renderer's bookkeeping with a fake scene (no DOM needed for the maths).
import test from 'node:test'; import assert from 'node:assert/strict';
import { HEAD, brokenSide, lampBrightness, beamStrength } from '../client/src/headlamps.js';

test('config covers every vehicle type, with sane sizes', () => {
  for (const k of ['car', 'danfo', 'keke', 'okada']) { for (const t of ['beamLen', 'beamW', 'front', 'half']) assert.ok(typeof HEAD[t][k] === 'number', `${t}.${k}`); assert.ok(HEAD.beamLen[k] > HEAD.front[k]); }
  assert.ok(HEAD.half.keke === 0 && HEAD.half.okada === 0, 'one lamp'); assert.ok(HEAD.half.car > 0 && HEAD.half.danfo > 0, 'two lamps');
});
test('about 1 in 12 two-lamp vehicles has a dead lamp (either side); keke and okada never; deterministic', () => {
  let b = 0, l = 0, r = 0; const N = 6000; for (let i = 0; i < N; i++) { const s = brokenSide(i, 'car'); if (s) b++; if (s === -1) l++; if (s === 1) r++; assert.equal(s, brokenSide(i, 'car')); assert.equal(brokenSide(i, 'keke'), 0); assert.equal(brokenSide(i, 'okada'), 0); }
  assert.ok(b / N > 0.06 && b / N < 0.105, 'share ' + b / N); assert.ok(l > N * 0.025 && r > N * 0.025, 'both sides occur');
});
test('brightness: nothing by day, both lamps at night, a dead lamp stays dark and weakens the beam', () => {
  assert.deepEqual(lampBrightness(0, 0), [0, 0]); assert.deepEqual(lampBrightness(1, 0), [1, 1]); assert.deepEqual(lampBrightness(1, -1), [0, 1]); assert.deepEqual(lampBrightness(0.5, 1), [0.5, 0]);
  assert.equal(beamStrength(0, 0), 0); assert.equal(beamStrength(1, 0), 1); assert.ok(beamStrength(1, 1) < 1 && beamStrength(1, 1) > 0.4);
});
