import test from 'node:test'; import assert from 'node:assert/strict'; import * as THREE from 'three';
import { Crowd, PEOPLE } from '../client/src/people.js';
const fake = { add() {} };
test('crowd people are human shaped: 7 parts (2 legs, torso, 2 arms, head, hair/cap), varied heights and colours, one draw call per part', () => {
  const c = new Crowd(fake, 40, 5); assert.deepEqual(Object.keys(c.parts).sort(), ['armL', 'armR', 'hair', 'head', 'legL', 'legR', 'torso']);
  for (const k in c.parts) assert.equal(c.parts[k].count, 40); const sc = new Set(c.look.map(l => l.scale.toFixed(2))); assert.ok(sc.size > 10, 'height variety');
  const colours = new Set(); const col = new THREE.Color(); for (let i = 0; i < 40; i++) { c.parts.torso.getColorAt(i, col); colours.add(col.getHex()); } assert.ok(colours.size >= 5, 'shirt colour variety');
  const sk = new Set(); for (let i = 0; i < 40; i++) { c.parts.head.getColorAt(i, col); sk.add(col.getHex()); } assert.ok(sk.size >= 3);
});
test('walk cycle: legs swing opposite to each other, arms opposite to the same-side leg, far people stand still, standing amp 0', () => {
  const c = new Crowd(fake, 2, 1); const m = new THREE.Matrix4(); const rotZ = (im, i) => { im.getMatrixAt(i, m); const q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3(); m.decompose(p, q, s); return new THREE.Euler().setFromQuaternion(q, 'YXZ').z; };
  c.pose(0, 0, 0, 0, 0, Math.PI / 2, 1, false); const l = rotZ(c.parts.legL, 0), r = rotZ(c.parts.legR, 0), al = rotZ(c.parts.armL, 0), ar = rotZ(c.parts.armR, 0);
  assert.ok(Math.abs(l + r) < 1e-6 && Math.abs(l) > 0.4, `legs ${l} ${r}`); assert.ok(Math.abs(al + ar) < 1e-6 && Math.abs(al) > 0.3); assert.ok(al * l < 0, 'left arm swings opposite to the left leg');
  c.pose(0, 0, 0, 0, 0, Math.PI / 2, 1, true); assert.ok(Math.abs(rotZ(c.parts.legL, 0)) < 1e-6, 'far = no swing'); c.pose(0, 0, 0, 0, 0, Math.PI / 2, 0, false); assert.ok(Math.abs(rotZ(c.parts.armL, 0)) < 1e-6, 'standing');
  c.pose(1, 10, 0.2, 5, 1.2, 0.3); c.parts.torso.getMatrixAt(1, m); assert.ok(Math.abs(m.elements[12] - 10) < 0.2 && Math.abs(m.elements[14] - 5) < 0.2, 'placed at x,z'); assert.ok(PEOPLE.legLen > 0.7);
});
