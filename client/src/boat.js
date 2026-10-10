// The boat (10 Oct 2026): a Lagos-style passenger boat from primitives with baked vertex colours: one draw call. Bow along +x, about 9 m long.
import * as THREE from 'three';
import { Builder } from '../sample/builder.js';
const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
const C = { hull: 0x1d5f8a, white: 0xf2f4f6, wood: 0x9a6b3c, dark: 0x2c3a47, roof: 0xe0a020, motor: 0x333840 };
export function makeBoat() {
  const b = new Builder(5, 0);
  b.box(7.4, 1.1, 2.8, -0.4, 0.15, 0, C.hull, { noAO: true }); b.cone(1.4, 2.6, 6, 3.3 + 1.3, 0.7, 0, C.hull, { noAO: true, rz: -Math.PI / 2 }); // hull and bow
  b.box(7.5, 0.18, 2.9, -0.4, 1.2, 0, C.white, { noAO: true }); b.box(7.6, 0.2, 0.12, -0.4, 0.75, 1.42, C.white, { noAO: true }); b.box(7.6, 0.2, 0.12, -0.4, 0.75, -1.42, C.white, { noAO: true }); // rail and stripes
  for (const x of [-2.6, -0.8, 1.0]) for (const z of [-0.8, 0.8]) b.box(0.7, 0.12, 0.5, x, 1.35, z, C.wood, { noAO: true }); // benches
  for (const x of [-2.9, 1.6]) for (const z of [-1.2, 1.2]) b.box(0.12, 2.0, 0.12, x, 1.3, z, C.white, { noAO: true }); b.box(5.4, 0.16, 3.0, -0.65, 3.3, 0, C.roof, { noAO: true }); // canopy
  b.box(0.7, 0.9, 0.5, -4.2, 0.8, 0, C.motor, { noAO: true }); b.box(0.2, 0.9, 0.2, -4.4, 0.1, 0, C.motor, { noAO: true }); // outboard
  const g = new THREE.Group(); const m = new THREE.Mesh(b.build(), mat); m.name = 'boat'; g.add(m); return g;
}
