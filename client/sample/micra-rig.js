// Nissan Micra by BHP3D (https://sketchfab.com/BHP3D), CC BY 4.0.
// Source: https://sketchfab.com/3d-models/nissan-micra-4920e8c5856848afb577d8a022fe5980
// Front is +x, wheels sit on y = 0.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { tagWheel } from './wheels.js';

export const MICRA_CREDIT = 'Nissan Micra by BHP3D, CC BY 4.0';
const URL = '/models/nissan-micra/scene.gltf';
// Real Micra is about 3.8 m long.
const LENGTH = 3.9;

let template = null;
const waiting = [];

const FRONT_LIGHT = /front.?light/i;
const REAR_LIGHT = /rear.?light/i;
const CABIN_GLASS = /^(glass)(\.\d+)?$/i;
// Headlight / mirror lens meshes share the "glass" material — keep those clear.
const LENS_MESH = /light|wing_.*\.001|bump_front.*\.001|mirror/i;

function adaptMat(m, meshName) {
  if (!m) return m;
  const name = (m.name || '').toLowerCase();
  const em = m.emissive && m.emissive.r + m.emissive.g + m.emissive.b > 0.2;
  if (em) return new THREE.MeshBasicMaterial({ color: m.emissive.clone(), map: m.map || null });

  if (FRONT_LIGHT.test(name)) {
    return new THREE.MeshBasicMaterial({ color: new THREE.Color(0xfff2c8), map: m.map || null });
  }
  if (REAR_LIGHT.test(name)) {
    return new THREE.MeshBasicMaterial({ color: new THREE.Color(0xc0392b), map: m.map || null });
  }

  if (CABIN_GLASS.test(name)) {
    if (LENS_MESH.test(meshName || '')) {
      // Clear / slightly warm lens so headlamp glows read through.
      return new THREE.MeshPhongMaterial({
        color: new THREE.Color(0xfff6e0),
        map: m.map || null,
        transparent: true,
        opacity: 0.35,
        shininess: 160,
        specular: new THREE.Color(0xffffff),
        side: THREE.DoubleSide,
        depthWrite: false,
      });
    }
    // Dark tinted cabin glass — hides empty interior without a seated avatar.
    return new THREE.MeshPhongMaterial({
      color: new THREE.Color(0x0a1218),
      map: null,
      transparent: true,
      opacity: 0.88,
      shininess: 140,
      specular: new THREE.Color(0x666666),
      side: THREE.DoubleSide,
      depthWrite: true,
    });
  }

  return new THREE.MeshPhongMaterial({
    color: m.map ? new THREE.Color(0xffffff) : (m.color ? m.color.clone() : new THREE.Color(0xc0392b)),
    map: m.map || null,
    shininess: (m.metalness || 0) > 0.3 ? 100 : 50,
    specular: new THREE.Color((m.metalness || 0) > 0.3 ? 0xc8c8c8 : 0x555555),
    transparent: !!m.transparent,
    opacity: m.opacity ?? 1,
    side: THREE.DoubleSide,
  });
}

function adapt(src, meshName) {
  const list = Array.isArray(src) ? src : [src];
  const mapped = list.map((m) => adaptMat(m, meshName));
  return Array.isArray(src) ? mapped : mapped[0];
}

function fit(scene) {
  const drop = [];
  scene.traverse((o) => {
    // Strip studio props only — do not match car "front light" / "rear light" meshes.
    if (o.isLight || /floor|showcase|^camera/i.test(o.name || '')) { drop.push(o); return; }
    if (!o.isMesh) return;
    const mats = [].concat(o.material).map((m) => (m?.name || '').toLowerCase());
    if (mats.some((n) => n === 'floor')) drop.push(o);
  });
  for (const o of drop) o.parent?.remove(o);

  const root = new THREE.Group();
  root.add(scene);
  // Sketchfab Micra nose points −z after load; −90° yaw puts the nose on +x (game forward).
  scene.rotation.y = -Math.PI / 2;
  scene.updateMatrixWorld(true);
  const size = new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());
  scene.scale.setScalar(LENGTH / Math.max(0.001, size.x));
  scene.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(scene);
  const center = box.getCenter(new THREE.Vector3());
  scene.position.set(-center.x, -box.min.y, -center.z);
  scene.traverse((o) => {
    if (!o.isMesh) return;
    const meshName = `${o.name || ''} ${o.parent?.name || ''}`.toLowerCase();
    o.material = adapt(o.material, meshName);
    o.castShadow = false;
  });
  root.userData.credit = MICRA_CREDIT;
  root.updateMatrixWorld(true);
  const wheelSize = new THREE.Vector3();
  const wheelBox = new THREE.Box3();
  root.traverse((o) => {
    if (!o.name || !/^wheel_(fl|fr|rl|rr)$/i.test(o.name)) return;
    wheelBox.setFromObject(o); wheelBox.getSize(wheelSize);
    tagWheel(o, Math.max(wheelSize.y, wheelSize.z) * 0.5);
  });
  return root;
}

function fill(group) {
  const car = template.clone(true);
  car.userData.credit = MICRA_CREDIT;
  group.add(car);
}

export function loadMicra() {
  if (template) return Promise.resolve(template);
  if (loadMicra.pending) return loadMicra.pending;
  loadMicra.pending = new Promise((resolve, reject) => {
    new GLTFLoader().load(URL, (gltf) => {
      template = fit(gltf.scene);
      for (const g of waiting) fill(g);
      waiting.length = 0;
      resolve(template);
    }, undefined, reject);
  });
  return loadMicra.pending;
}

/** Motoka Nissan Micra — textured hatch from the Sketchfab download. */
export function micraRig() {
  const g = new THREE.Group();
  if (template) fill(g);
  else { waiting.push(g); loadMicra(); }
  return g;
}

/** Donor wheel (front-left) from the fitted K13 template — used by the K12 rig. */
export function micraWheelDonor() {
  return loadMicra().then(() => {
    let donor = null;
    template.traverse((o) => { if (!donor && /^wheel_fl$/i.test(o.name || '')) donor = o; });
    if (!donor) throw new Error('K13 Micra wheel_fl missing');
    return donor;
  });
}

loadMicra();
