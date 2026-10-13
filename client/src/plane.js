// FlyNaija airliner and the airfield.
// The mesh is "air india plane" by Meshmill (https://sketchfab.com/Meshmill), CC-BY-4.0.
// Source: https://sketchfab.com/3d-models/air-india-plane-647b9156a5fe440485eef415bca64b94
// The livery here is recolored green and white and titled FlyNaija. Nose along +x, wheels on y = 0.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Builder } from '../sample/builder.js';

const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
const C = { white: 0xf2f4f6, blue: 0x1c5fa8, green: 0x0e8a4a, dark: 0x2c3a47, grey: 0x9aa3ab, metal: 0xc9ced3 };
const hc = (b, r, len, x, yc, z, c, o = {}) => b.cyl(r, r, len, 12, x, yc - len / 2, z, c, { noAO: true, rz: Math.PI / 2, ...o });
const MODEL = '/models/flynaija/scene.gltf';
const LENGTH = 36;
export const PLANE_NAME = 'FlyNaija';
export const PLANE_CREDIT = 'Aircraft mesh by Meshmill, CC BY 4.0. Livery recolored as FlyNaija.';

let template = null;
const waiting = [];

function primitive() {
  const b = new Builder(7, 0);
  hc(b, 1.9, 21, 0, 3.1, 0, C.white); b.sphere(1.9, 10.5, 3.1, 0, C.white, { noAO: true }); b.cone(1.9, 7, 12, -14, 3.1, 0, C.white, { noAO: true, rz: Math.PI / 2 });
  b.box(15, 0.7, 3.88, -1, 2.45, 0, C.green, { noAO: true });
  for (let i = 0; i < 12; i++) b.box(0.7, 0.55, 3.95, -7 + i * 1.5, 3.45, 0, C.dark, { noAO: true });
  b.box(5, 0.35, 12.5, -0.5, 2.4, 7.4, C.metal, { noAO: true, ry: 0.28 }); b.box(5, 0.35, 12.5, -0.5, 2.4, -7.4, C.metal, { noAO: true, ry: -0.28 });
  hc(b, 0.95, 3.4, 1.8, 1.4, 6.4, C.grey); hc(b, 0.95, 3.4, 1.8, 1.4, -6.4, C.grey);
  b.box(3.4, 5.6, 0.4, -14.2, 4.6, 0, C.green, { noAO: true, rz: -0.18 }); b.box(2.6, 0.3, 8.4, -14.5, 4.4, 0, C.metal, { noAO: true });
  for (const z of [-1.2, 1.2]) b.wheel(0.5, 0.35, 5.5, 0.55, z * 1.6, C.dark); b.wheel(0.5, 0.35, -2, 0.55, 2.6, C.dark); b.wheel(0.5, 0.35, -2, 0.55, -2.6, C.dark);
  const m = new THREE.Mesh(b.build(), mat); m.name = PLANE_NAME; return m;
}

function dress(src) {
  const list = Array.isArray(src) ? src : [src];
  const done = new Map();
  const map = (m) => {
    if (!m) return m;
    if (done.has(m)) return done.get(m);
    const tex = m.map || null;
    if (tex) tex.colorSpace = THREE.SRGBColorSpace;
    const next = new THREE.MeshLambertMaterial({ map: tex, color: 0xffffff, side: THREE.DoubleSide });
    done.set(m, next);
    return next;
  };
  return Array.isArray(src) ? list.map(map) : map(src);
}

function fit(scene) {
  const root = new THREE.Group();
  root.name = PLANE_NAME;
  root.userData.credit = PLANE_CREDIT;
  root.add(scene);
  // GLTFLoader already stands the plane upright, nose toward +Z. Yaw it so the nose points +X.
  scene.rotation.y = Math.PI / 2;
  scene.updateMatrixWorld(true);
  const size = new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());
  scene.scale.setScalar(LENGTH / Math.max(0.001, size.x));
  scene.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(scene);
  const center = box.getCenter(new THREE.Vector3());
  scene.position.set(-center.x, -box.min.y, -center.z);
  scene.traverse((o) => {
    if (!o.isMesh) return;
    o.material = dress(o.material);
    o.castShadow = false;
    o.name = PLANE_NAME;
  });
  root.updateMatrixWorld(true);
  return root;
}

function fill(group) {
  for (const child of [...group.children]) group.remove(child);
  const plane = template.clone(true);
  plane.name = PLANE_NAME;
  plane.userData.credit = PLANE_CREDIT;
  group.add(plane);
}

export function loadFlyNaija() {
  if (template) return Promise.resolve(template);
  if (loadFlyNaija.pending) return loadFlyNaija.pending;
  loadFlyNaija.pending = new Promise((resolve, reject) => {
    new GLTFLoader().load(MODEL, (gltf) => {
      template = fit(gltf.scene);
      for (const group of waiting) fill(group);
      waiting.length = 0;
      resolve(template);
    }, undefined, reject);
  });
  return loadFlyNaija.pending;
}

/** Nose along +x. Shows a simple stand-in until the FlyNaija model has loaded. */
export function makePlane() {
  const g = new THREE.Group();
  g.name = PLANE_NAME;
  g.userData.credit = PLANE_CREDIT;
  if (template) fill(g);
  else { g.add(primitive()); waiting.push(g); loadFlyNaija(); }
  return g;
}

/** runway, apron and a windsock for one airport config (merged into one mesh) */
export function makeAirfield(ap) {
  const b = new Builder(11, 0); const R = ap.runway; const dx = R.x1 - R.x0, dz = R.z1 - R.z0, L = Math.hypot(dx, dz), th = Math.atan2(dz, dx); const cx = (R.x0 + R.x1) / 2, cz = (R.z0 + R.z1) / 2;
  b.box(R.width, 0.12, L + 20, cx, 0.01, cz, 0x3a3d42, { noAO: true, ry: -th + Math.PI / 2 }); // runway slab
  for (let s = 14; s < L - 6; s += 22) { const x = R.x0 + dx / L * s, z = R.z0 + dz / L * s; b.box(1.1, 0.14, 9, x, 0.02, z, 0xf2f2f2, { noAO: true, ry: -th + Math.PI / 2 }); } // centre line
  for (const e of [[R.x0, R.z0, 1], [R.x1, R.z1, -1]]) for (let i = -4; i <= 4; i++) { const px = -Math.sin(th) * i * 2.4, pz = Math.cos(th) * i * 2.4; const x = e[0] + px + dx / L * 4 * e[2], z = e[1] + pz + dz / L * 4 * e[2]; b.box(1.2, 0.14, 7, x, 0.02, z, 0xf2f2f2, { noAO: true, ry: -th + Math.PI / 2 }); } // thresholds
  b.box(46, 0.1, 34, ap.apron.x, 0.0, ap.apron.z, 0x5a5f66, { noAO: true }); b.box(46.4, 0.12, 0.4, ap.apron.x, 0.01, ap.apron.z + 17, 0xe0b020, { noAO: true });
  b.cyl(0.12, 0.12, 6, 6, ap.apron.x + 26, 0, ap.apron.z - 12, 0xd8d8d8, { noAO: true }); b.box(2.6, 0.7, 0.7, ap.apron.x + 27.3, 5.3, ap.apron.z - 12, 0xe8601c, { noAO: true }); // windsock
  const m = new THREE.Mesh(b.build(), mat); m.name = 'airfield'; return m;
}
