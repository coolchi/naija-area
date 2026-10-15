// Nissan Micra by Atlas (https://sketchfab.com/Atlasmodels), CC BY 4.0.
// Source: https://sketchfab.com/3d-models/nissan-micra-7b23a6f6c4494647ae613963d21da89f
// Front is +x, wheels sit on y = 0. Second Motoka year (K12) beside the K13 Micra.
// Stock Atlas tires are replaced with K13 (BHP3D) wheel meshes.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { centerPivot, tagWheel } from './wheels.js';
import { micraWheelDonor } from './micra-rig.js';

export const MICRA12_CREDIT = 'Nissan Micra by Atlas, CC BY 4.0';
const URL = '/models/nissan-micra-k12.glb';
const LENGTH = 3.85;
const WHEEL_R = 0.30;

let template = null;
const waiting = [];

function adaptMat(m) {
  if (!m) return m;
  const name = (m.name || '').toLowerCase();
  const c = m.color || new THREE.Color(0x888888);
  const em = m.emissive && m.emissive.r + m.emissive.g + m.emissive.b > 0.15;
  if (em) return new THREE.MeshBasicMaterial({ color: m.emissive.clone(), map: m.map || null });

  if (m.transparent || (m.opacity != null && m.opacity < 0.95) || /002|004|005/.test(name)) {
    const r = c.r, g = c.g, b = c.b;
    if (r > 0.35 && g < 0.2 && b < 0.2) {
      return new THREE.MeshBasicMaterial({ color: new THREE.Color(0xc0392b), transparent: true, opacity: 0.85 });
    }
    if (r > 0.7 && g > 0.7 && b > 0.7) {
      return new THREE.MeshPhongMaterial({
        color: new THREE.Color(0xfff6e0), transparent: true, opacity: 0.35,
        shininess: 160, specular: new THREE.Color(0xffffff), side: THREE.DoubleSide, depthWrite: false,
      });
    }
    return new THREE.MeshPhongMaterial({
      color: new THREE.Color(0x0a1218), transparent: true, opacity: 0.88,
      shininess: 140, specular: new THREE.Color(0x666666), side: THREE.DoubleSide, depthWrite: true,
    });
  }

  if (rWarm(c) && c.g > 0.1 && c.b < 0.15 && c.r > 0.4) {
    return new THREE.MeshBasicMaterial({ color: new THREE.Color(0xe67e22) });
  }

  if (c.g > c.r + 0.02 && c.g > c.b + 0.02 && c.r < 0.15) {
    return new THREE.MeshPhongMaterial({
      color: new THREE.Color(0x1b4332), shininess: 90, specular: new THREE.Color(0x88aa88), side: THREE.DoubleSide,
    });
  }

  return new THREE.MeshPhongMaterial({
    color: m.map ? new THREE.Color(0xffffff) : c.clone(),
    map: m.map || null,
    shininess: (m.metalness || 0) > 0.3 ? 100 : 45,
    specular: new THREE.Color((m.metalness || 0) > 0.3 ? 0xc8c8c8 : 0x555555),
    transparent: !!m.transparent,
    opacity: m.opacity ?? 1,
    side: THREE.DoubleSide,
  });
}

function rWarm(c) { return c.r > c.g && c.r > c.b; }

function adapt(src) {
  const list = Array.isArray(src) ? src : [src];
  return Array.isArray(src) ? list.map(adaptMat) : adaptMat(src);
}

/**
 * Clone a K13 wheel keeping its world pose (orientation + metre scale from the
 * fitted K13 template). Parent it under `parent` with that pose as local.
 */
function worldPoseClone(donor, parent) {
  donor.updateWorldMatrix(true, true);
  const w = donor.clone(true);
  w.traverse((o) => {
    if (!o.userData) return;
    delete o.userData.wheel;
    delete o.userData.axle;
    delete o.userData.wheelR;
  });
  const pos = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const scl = new THREE.Vector3();
  donor.matrixWorld.decompose(pos, quat, scl);
  parent.add(w);
  w.position.copy(pos);
  w.quaternion.copy(quat);
  w.scale.copy(scl);
  w.updateMatrixWorld(true);
  return w;
}

/** Shift a wheel so its AABB centre lands on `hubWorld`. */
function moveCenterTo(wheel, hubWorld) {
  wheel.updateMatrixWorld(true);
  const center = new THREE.Box3().setFromObject(wheel).getCenter(new THREE.Vector3());
  wheel.position.add(hubWorld.clone().sub(center));
  wheel.updateMatrixWorld(true);
}

/**
 * Read front/rear axle centres from the Atlas Cylinder groups, strip them, then
 * place hubs so the tire OUTER face stays just inside the body half-width.
 */
function stockHubs(scene) {
  const axles = [];
  const kill = [];
  const box = new THREE.Box3();
  scene.updateMatrixWorld(true);
  scene.traverse((o) => {
    if (!o.name || !/^cylinder/i.test(o.name)) return;
    if (o.parent && /^cylinder/i.test(o.parent.name || '')) return;
    box.setFromObject(o);
    axles.push({
      x: (box.min.x + box.max.x) * 0.5,
      y: (box.min.y + box.max.y) * 0.5,
    });
    kill.push(o);
  });
  for (const o of kill) o.parent?.remove(o);

  // Body only (stock tires gone) — this is the silhouette the tires must not pass.
  scene.updateMatrixWorld(true);
  const body = new THREE.Box3().setFromObject(scene);
  const bodyHalfW = (body.max.z - body.min.z) * 0.5;
  const midZ = (body.min.z + body.max.z) * 0.5;
  // K13 tire is ~0.20 m wide; keep outer face inside the body (AABB may include mirrors).
  const tireHalfW = 0.10;
  const halfTrack = Math.max(0.55, Math.min(bodyHalfW - tireHalfW - 0.05, bodyHalfW * 0.88));

  const hubs = [];
  for (const a of axles) {
    hubs.push(new THREE.Vector3(a.x, a.y, midZ - halfTrack));
    hubs.push(new THREE.Vector3(a.x, a.y, midZ + halfTrack));
  }
  return hubs;
}

function fallbackHubs(root) {
  const box = new THREE.Box3().setFromObject(root);
  const c = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const halfL = size.x * 0.30;
  const tireHalfW = 0.10;
  const halfT = Math.max(0.55, size.z * 0.5 - tireHalfW - 0.03);
  const y = box.min.y + WHEEL_R;
  return [
    new THREE.Vector3(c.x + halfL, y, c.z - halfT),
    new THREE.Vector3(c.x + halfL, y, c.z + halfT),
    new THREE.Vector3(c.x - halfL, y, c.z - halfT),
    new THREE.Vector3(c.x - halfL, y, c.z + halfT),
  ];
}

function mountK13Wheels(root, hubsWorld, donor) {
  // root is identity at fit time, so world == root-local.
  for (const hub of hubsWorld) {
    const w = worldPoseClone(donor, root);
    w.name = 'wheel_k13';
    // Pivot at the hub, then slide onto the K12 arch centre.
    centerPivot(w);
    moveCenterTo(w, hub);
    // Mirror right-side wheels so the outer face points outward.
    if (hub.z > 0.05) {
      w.scale.z *= -1;
      moveCenterTo(w, hub);
    }
    tagWheel(w, WHEEL_R);
  }
}

function fit(scene, donorWheel) {
  const drop = [];
  scene.traverse((o) => {
    if (o.isLight || /floor|showcase|^camera/i.test(o.name || '')) { drop.push(o); return; }
    if (!o.isMesh) return;
    const mats = [].concat(o.material).map((m) => (m?.name || '').toLowerCase());
    if (mats.some((n) => n === 'floor')) drop.push(o);
  });
  for (const o of drop) o.parent?.remove(o);

  const root = new THREE.Group();
  root.add(scene);
  // Atlas Micra length is on X with the nose toward −x; flip so the nose faces +x.
  scene.rotation.y = Math.PI;
  scene.updateMatrixWorld(true);
  const size = new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());
  scene.scale.setScalar(LENGTH / Math.max(0.001, size.x));
  scene.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(scene);
  const center = box.getCenter(new THREE.Vector3());
  scene.position.set(-center.x, -box.min.y, -center.z);
  scene.traverse((o) => {
    if (!o.isMesh) return;
    o.material = adapt(o.material);
    o.castShadow = false;
  });
  root.updateMatrixWorld(true);

  let hubs = stockHubs(scene);
  if (hubs.length < 4) hubs = fallbackHubs(root);
  mountK13Wheels(root, hubs, donorWheel);

  root.updateMatrixWorld(true);
  const grounded = new THREE.Box3().setFromObject(root);
  root.position.y -= grounded.min.y;
  root.userData.credit = MICRA12_CREDIT;
  return root;
}

function fill(group) {
  const car = template.clone(true);
  car.userData.credit = MICRA12_CREDIT;
  group.add(car);
}

export function loadMicra12() {
  if (template) return Promise.resolve(template);
  if (loadMicra12.pending) return loadMicra12.pending;
  loadMicra12.pending = Promise.all([
    new Promise((resolve, reject) => {
      new GLTFLoader().load(URL, resolve, undefined, reject);
    }),
    micraWheelDonor(),
  ]).then(([gltf, donor]) => {
    template = fit(gltf.scene, donor);
    for (const g of waiting) fill(g);
    waiting.length = 0;
    return template;
  }).catch((err) => {
    loadMicra12.pending = null;
    console.error('[micra12] load failed', err);
    throw err;
  });
  return loadMicra12.pending;
}

/** Motoka Nissan Micra K12 — Atlas body with K13 tires. */
export function micra12Rig() {
  const g = new THREE.Group();
  if (template) fill(g);
  else { waiting.push(g); loadMicra12(); }
  return g;
}

loadMicra12();
