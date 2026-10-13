// Advert walls sit at the outer end of a road, on open ground, low enough to read from a car.
import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
import { planAdWalls } from '../client/src/adwalls.js';
const city = JSON.parse(fs.readFileSync(new URL('../server/config/cities/lagos-mainland.json', import.meta.url)));
const runs = planAdWalls(city);
const panels = runs.flatMap(r => r.panels);

test('a long wall stands at the open end of the mainland roads', () => {
  assert.ok(runs.length >= 3, 'runs ' + runs.length);
  assert.ok(panels.length >= 24, 'panels ' + panels.length);
  for (const run of runs) assert.ok(run.panels.length >= 4, run.id);
});

test('every panel is off the buildings, out of the water, and low', () => {
  const water = city.water;
  for (const p of panels) {
    assert.ok(p.y + p.h / 2 < 6.5, 'too tall ' + p.y);
    assert.ok(!(water && p.x > water.minX && p.x < water.maxX && p.z > water.minZ && p.z < water.maxZ), 'in the water');
    for (const b of city.buildings) assert.ok(Math.abs(p.x - b.x) >= b.w / 2 + 1.2 || Math.abs(p.z - b.z) >= b.d / 2 + 1.2, 'inside ' + b.kind + ' at ' + p.x + ',' + p.z);
  }
});
