// Polish round (10 Oct 2026): label de-cluttering in rooms, avatar looks, vehicle detail budget.
import test from 'node:test'; import assert from 'node:assert/strict';
import * as THREE from 'three';
import { declutter, shortLabel, LABEL } from '../client/src/labels.js';
import { avatarLook } from '../client/src/avatar-look.js';
import { carGeo, danfoGeo } from '../client/sample/vehicles.js';
import { mulberry32 } from '../client/sample/builder.js';

test('labels: far apart stay put, neighbours stack in steps back to front, never beyond the stack limit, deterministic', () => {
  assert.deepEqual(declutter([{ x: 0, z: 0, y: 2 }, { x: 10, z: 0, y: 2 }]), [2, 2]);
  const three = declutter([{ x: 0, z: 0, y: 2 }, { x: 1, z: 0.5, y: 2 }, { x: 2, z: 1, y: 2 }]); assert.deepEqual(three.map(v => +v.toFixed(2)), [2, 2 + LABEL.step, 2 + 2 * LABEL.step]);
  const many = declutter(Array.from({ length: 9 }, (_, i) => ({ x: i * 0.1, z: 0, y: 2 }))); assert.ok(Math.max(...many) <= 2 + LABEL.maxStack * LABEL.step + 1e-9);
  const items = [{ x: 1, z: 3, y: 2.1 }, { x: 0, z: 0, y: 2.8 }, { x: 0.5, z: 1, y: 2.1 }]; assert.deepEqual(declutter(items), declutter(items)); assert.equal(items[0].y, 2.1, 'input not mutated');
  const row = declutter([{ x: 0, z: 0, y: 2 }, { x: 0, z: 4, y: 2 }]); assert.deepEqual(row, [2, 2], 'depth apart is fine');
});
test('labels: long text ends in an ellipsis at a word boundary, short text is untouched', () => {
  assert.equal(shortLabel('Weekly scoreboard'), 'Weekly scoreboard'); const t = shortLabel('Pair Am (memory cards) and more words'); assert.ok(t.length <= LABEL.maxChars && t.endsWith('…') && !/[(\s]…$/.test(t), t); assert.equal(shortLabel(''), ''); assert.equal(shortLabel(null), '');
});
test('avatar look: same colour = same person, different colours vary in skin, hair style and trousers, all skin tones are deep to medium', () => {
  assert.deepEqual(avatarLook(0x2e9b5e), avatarLook(0x2e9b5e)); const set = Array.from({ length: 80 }, (_, i) => avatarLook(0x101010 + i * 0x31577)); for (const k of ['skin', 'style', 'hair', 'trousers']) assert.ok(new Set(set.map(l => l[k])).size >= 3, `${k} varies`);
  assert.ok(set.every(l => l.style >= 0 && l.style <= 4));
});
test('vehicle detail stays inside the performance budget: a car is under 700 triangles and carries vertex colours; the bus stays under 1500', () => {
  for (const k of ['sedan', 'suv', 'hatch']) { const g = carGeo(k, 0xb71c1c); const tris = (g.index ? g.index.count : g.attributes.position.count) / 3; assert.ok(tris > 150 && tris < 700, `${k} ${tris}`); assert.ok(g.attributes.color, 'vertex colours'); }
  const d = danfoGeo(mulberry32(1)); assert.ok((d.index ? d.index.count : d.attributes.position.count) / 3 < 1500);
});
