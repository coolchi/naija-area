import test from 'node:test';
import assert from 'node:assert/strict';
import { theatreLayout } from '../client/src/landmarks3d.js';

test('national theatre fins stay inside the footprint and the crown is tallest at the front', () => {
  const b = { w: 52, d: 34 };
  const L = theatreLayout(b);
  assert.equal(L.fins.length, 32);
  for (const f of L.fins) {
    assert.ok(Math.abs(f.u) + 0.8 < b.w / 2, 'sideways');
    assert.ok(Math.abs(f.v) + 0.8 < b.d / 2, 'depth');
  }
  const front = L.fins.reduce((a, f) => (f.v > a.v ? f : a));
  const side = L.fins.reduce((a, f) => (Math.abs(f.u) > Math.abs(a.u) ? f : a));
  assert.ok(front.h > side.h + 4, 'front arch is the tall part');
});
