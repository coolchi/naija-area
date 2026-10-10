// The client weather module's pure parts: the look table, flood lookup, easing. (The drawing itself is checked by scripts/life-smoke.mjs in a real browser.)
import test from 'node:test'; import assert from 'node:assert/strict';
import { STATE_NAMES, LOOK, floodLevelAt, approach } from '../client/src/weather.js';
import { STATES } from '../server/core/weather.js';

test('the client and server agree on the weather state order, and every state has a look', () => {
  assert.deepEqual(STATE_NAMES, STATES); for (const s of STATES) { const l = LOOK[s]; assert.ok(l.rain >= 0 && l.rain <= 1 && l.grey >= 0 && l.grey <= 1 && l.fog > 0 && l.fog <= 1 && l.dim > 0 && l.dim <= 1, s); } assert.ok(LOOK.storm.rain > LOOK.rain.rain && LOOK.rain.rain > LOOK.clear.rain);
});
test('flood lookup and easing', () => {
  const zones = [{ id: 'a', x1: 0, z1: 0, x2: 10, z2: 10, level: 2 }, { id: 'b', x1: 20, z1: 0, x2: 30, z2: 10, level: 0 }]; assert.equal(floodLevelAt(zones, 5, 5), 2); assert.equal(floodLevelAt(zones, 25, 5), 1, 'a listed zone with no level counts as 1 when asked'); assert.equal(floodLevelAt(zones, 50, 5), 0); assert.equal(floodLevelAt(null, 1, 1), 0);
  assert.equal(approach(0, 1, 100, 1), 1); assert.ok(approach(0, 1, 1, 0.1) < 0.2); assert.equal(approach(1, 1, 5, 0.1), 1);
});
