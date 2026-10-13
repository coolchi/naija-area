// Original in-game G-Wagon. Front is +x, wheels sit on y = 0. Finer panels, round lamps and a glossy paint so it reads up close.
// No manufacturer badge. This is not an imported showroom scan.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { tagWheel } from './wheels.js';

const geo = new Map();
const round = (w, h, d, r, seg) => {
  const k = [w, h, d, r, seg].join('|');
  let g = geo.get(k);
  if (!g) { g = r > 0 ? new RoundedBoxGeometry(w, h, d, seg, r) : new THREE.BoxGeometry(w, h, d); geo.set(k, g); }
  return g;
};
const black = new THREE.MeshPhongMaterial({ color: 0x141618, shininess: 16, specular: 0x222222 });
const glass = new THREE.MeshPhongMaterial({ color: 0x163044, shininess: 150, specular: 0xe7eef4, transparent: true, opacity: 0.58, side: THREE.DoubleSide });
const chrome = new THREE.MeshPhongMaterial({ color: 0xd5dce4, shininess: 170, specular: 0xffffff });
const metal = new THREE.MeshPhongMaterial({ color: 0x2c3036, shininess: 80, specular: 0x9aa3ad });
const rubber = new THREE.MeshPhongMaterial({ color: 0x141518, shininess: 5, specular: 0x111111 });
const lampM = new THREE.MeshPhongMaterial({ color: 0xfff6dc, emissive: 0xfff0c4, emissiveIntensity: 0.7, shininess: 90 });
const redM = new THREE.MeshPhongMaterial({ color: 0xd32f2f, emissive: 0x6a1212, emissiveIntensity: 0.35, shininess: 70 });
const amberM = new THREE.MeshPhongMaterial({ color: 0xff9a1a, emissive: 0xff7a00, emissiveIntensity: 0.25 });
const plateM = new THREE.MeshPhongMaterial({ color: 0xf3f3ef, shininess: 18, specular: 0x444444 });
const paintCache = new Map();

function paints(hex) {
  const k = new THREE.Color(hex).getHex();
  let p = paintCache.get(k);
  if (p) return p;
  const paint = new THREE.MeshPhongMaterial({ color: k, shininess: 120, specular: 0xc5ced6 });
  const shade = paint.clone(); shade.color.multiplyScalar(0.7);
  const crease = paint.clone(); crease.color.multiplyScalar(0.22);
  p = { paint, shade, crease };
  paintCache.set(k, p);
  return p;
}
function put(parent, geometry, material, x, y, z, slot) {
  const m = new THREE.Mesh(geometry, material);
  m.position.set(x, y, z);
  if (slot) m.userData.slot = slot;
  parent.add(m);
  return m;
}
function quad(parent, a, b, c, d, material) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute([...a, ...b, ...c, ...a, ...c, ...d], 3));
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, material);
  parent.add(m);
  return m;
}

let wheelProto = null;
function wheelTemplate() {
  if (wheelProto) return wheelProto;
  const g = new THREE.Group();
  const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.3, 64), rubber);
  tire.rotation.x = Math.PI / 2; g.add(tire);
  const shoulder = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.045, 10, 48), rubber);
  shoulder.rotation.x = Math.PI / 2; g.add(shoulder);
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.2, 48), metal);
  rim.rotation.x = Math.PI / 2; g.add(rim);
  const lip = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.016, 8, 48), metal);
  lip.rotation.x = Math.PI / 2; lip.position.z = 0.09; g.add(lip);
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.14, 24), black);
  barrel.rotation.x = Math.PI / 2; g.add(barrel);
  for (let i = 0; i < 12; i++) {
    const pivot = new THREE.Group();
    pivot.rotation.z = (i / 12) * Math.PI * 2;
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.26, 0.016), metal);
    spoke.position.set(0, 0.15, 0.1);
    pivot.add(spoke); g.add(pivot);
  }
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.04, 20), metal);
  cap.rotation.x = Math.PI / 2; cap.position.z = 0.12; g.add(cap);
  wheelProto = g;
  return g;
}
function placeWheel(parent, x, z) {
  const w = wheelTemplate().clone();
  w.position.set(x, 0.46, z);
  if (z < 0) w.rotation.y = Math.PI;
  parent.add(w);
  parent.updateMatrixWorld(true);
  tagWheel(w, 0.46);
}
function roundLamp(parent, z) {
  const g = new THREE.Group();
  g.position.set(2.3, 0.86, z);
  const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.15, 0.08, 32), black);
  bucket.rotation.z = Math.PI / 2; g.add(bucket);
  const bezel = new THREE.Mesh(new THREE.TorusGeometry(0.155, 0.016, 8, 36), chrome);
  bezel.rotation.y = Math.PI / 2; bezel.position.x = 0.03; g.add(bezel);
  const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.105, 0.02, 32), lampM);
  lens.rotation.z = Math.PI / 2; lens.position.x = 0.04; g.add(lens);
  const led = new THREE.Mesh(new THREE.TorusGeometry(0.078, 0.008, 8, 32), lampM);
  led.rotation.y = Math.PI / 2; led.position.x = 0.052; g.add(led);
  parent.add(g);
}

let template = null;
function buildTemplate() {
  if (template) return template;
  const g = new THREE.Group();
  const dummy = paints(0x19b4ee);
  for (const x of [1.58, -1.5]) for (const z of [1.06, -1.06]) placeWheel(g, x, z);
  for (const z of [1.14, -1.14]) put(g, round(2.45, 0.07, 0.16, 0.02, 2), black, 0.04, 0.34, z);
  put(g, round(4.36, 0.5, 1.86, 0.05, 4), dummy.paint, 0.02, 0.66, 0, 'paint');
  put(g, round(4.42, 0.12, 1.98, 0, 1), black, 0.02, 0.4, 0);
  put(g, round(4.16, 0.52, 1.8, 0.04, 3), dummy.paint, 0, 1.14, 0, 'paint');
  put(g, round(2.26, 0.58, 1.62, 0.04, 3), dummy.paint, -0.24, 1.62, 0, 'paint');
  put(g, new THREE.BoxGeometry(1.95, 0.5, 1.4), black, -0.24, 1.58, 0);
  put(g, round(2.02, 0.07, 1.48, 0.02, 2), dummy.paint, -0.28, 1.96, 0, 'paint');
  for (const z of [0.58, -0.58]) put(g, round(1.85, 0.035, 0.045, 0.01, 2), black, -0.28, 2.04, z);
  put(g, round(1.28, 0.09, 1.62, 0.03, 3), dummy.paint, 1.24, 1.16, 0, 'paint');
  for (const z of [0.36, -0.36]) put(g, round(0.62, 0.04, 0.26, 0.015, 2), dummy.shade, 1.36, 1.22, z, 'shade');
  for (const x of [1.58, -1.5]) for (const z of [1.02, -1.02]) {
    put(g, round(1.12, 0.34, 0.16, 0.04, 2), black, x, 0.52, z);
    put(g, round(0.96, 0.14, 0.08, 0.02, 2), dummy.paint, x, 0.74, z, 'paint');
  }
  put(g, round(0.1, 0.62, 0.98, 0.03, 2), black, 2.32, 0.86, 0);
  put(g, new THREE.BoxGeometry(0.04, 0.5, 0.82), black, 2.35, 0.86, 0);
  for (let i = 0; i < 18; i++) put(g, new THREE.BoxGeometry(0.025, 0.46, 0.02), chrome, 2.37, 0.86, -0.38 + i * 0.0447);
  put(g, new THREE.BoxGeometry(0.02, 0.03, 0.78), chrome, 2.38, 0.86, 0);
  for (const z of [0.74, -0.74]) roundLamp(g, z);
  for (const z of [0.98, -0.98]) put(g, new THREE.BoxGeometry(0.04, 0.05, 0.09), amberM, 2.22, 0.72, z);
  put(g, round(0.16, 0.26, 1.9, 0.03, 2), black, 2.26, 0.36, 0);
  for (const z of [0.62, -0.62]) {
    put(g, round(0.08, 0.15, 0.42, 0.02, 2), black, 2.32, 0.34, z);
    put(g, new THREE.BoxGeometry(0.02, 0.1, 0.015), chrome, 2.35, 0.34, z);
    const fog = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.02, 16), lampM);
    fog.rotation.z = Math.PI / 2; fog.position.set(2.34, 0.3, z); g.add(fog);
  }
  put(g, new THREE.BoxGeometry(0.06, 0.035, 0.5), metal, 2.34, 0.24, 0);
  quad(g, [1.1, 1.18, 0.78], [1.1, 1.18, -0.78], [0.84, 1.96, -0.7], [0.84, 1.96, 0.7], glass);
  quad(g, [-1.46, 1.2, -0.74], [-1.46, 1.2, 0.74], [-1.28, 1.94, 0.66], [-1.28, 1.94, -0.66], glass);
  for (const z of [0.93, -0.93]) {
    const front = put(g, new THREE.PlaneGeometry(0.76, 0.46), glass, 0.36, 1.56, z);
    const rear = put(g, new THREE.PlaneGeometry(0.72, 0.44), glass, -0.58, 1.55, z);
    if (z < 0) { front.rotation.y = Math.PI; rear.rotation.y = Math.PI; }
    put(g, new THREE.BoxGeometry(3.5, 0.025, 0.02), chrome, -0.05, 1.24, z);
    put(g, new THREE.BoxGeometry(2.05, 0.02, 0.018), chrome, -0.26, 1.94, z);
    for (const x of [0.02, -0.98]) put(g, new THREE.BoxGeometry(0.035, 0.62, 0.02), black, x, 1.32, z);
    put(g, round(0.14, 0.035, 0.04, 0.01, 2), chrome, 0.38, 1.16, z * 1.02);
    put(g, round(0.12, 0.035, 0.04, 0.01, 2), chrome, -0.72, 1.16, z * 1.02);
    for (let i = 0; i < 3; i++) put(g, new THREE.BoxGeometry(0.2, 0.018, 0.02), chrome, 1.12, 0.98 + i * 0.045, z * 1.03);
    const mirror = new THREE.Group();
    mirror.position.set(0.98, 1.46, z * 1.18);
    put(mirror, round(0.18, 0.1, 0.22, 0.03, 2), dummy.paint, 0, 0, 0, 'paint');
    const mg = put(mirror, new THREE.PlaneGeometry(0.12, 0.07), glass, 0, 0.01, z > 0 ? -0.08 : 0.08);
    if (z < 0) mg.rotation.y = Math.PI;
    g.add(mirror);
  }
  const spare = wheelTemplate().clone();
  spare.scale.setScalar(0.72);
  spare.rotation.y = -Math.PI / 2;
  spare.position.set(-2.34, 1.12, 0);
  const cover = put(spare, new THREE.CircleGeometry(0.22, 28), dummy.paint, 0, 0, 0.2, 'paint');
  cover.rotation.y = 0;
  g.add(spare);
  for (const z of [0.58, -0.58]) {
    put(g, round(0.04, 0.1, 0.36, 0.015, 2), redM, -2.2, 0.96, z);
    put(g, new THREE.BoxGeometry(0.02, 0.035, 0.28), lampM, -2.22, 0.98, z);
  }
  put(g, new THREE.BoxGeometry(0.02, 0.12, 0.32), plateM, 2.38, 0.32, 0);
  put(g, new THREE.BoxGeometry(0.02, 0.12, 0.32), plateM, -2.2, 0.5, 0);
  template = g;
  return g;
}

/** High-detail G-Wagon. Call once per car; geometries and non-paint materials are shared. */
export function gwagonRig(color) {
  const { paint, shade, crease } = paints(color);
  const g = buildTemplate().clone();
  g.traverse((o) => {
    if (o.userData.slot === 'paint') o.material = paint;
    else if (o.userData.slot === 'shade') o.material = shade;
    else if (o.userData.slot === 'crease') o.material = crease;
  });
  return g;
}
