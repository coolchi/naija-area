// Mercedes-Benz G-Class G63 AMG by pranav27 (https://sketchfab.com/pranav27), CC BY 4.0.
// Source: https://sketchfab.com/3d-models/mercedes-benz-g-class-g63-amg-fa70ea228e5749c2b4951a895385b055
// Front is +x, wheels sit on y = 0.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { tagWheel } from './wheels.js';

export const G63_CREDIT = 'Mercedes-Benz G-Class G63 AMG by pranav27, CC BY 4.0';
const URL = '/models/g63-amg.glb';
// Real G63 is about 4.9 m long; keep it a bit taller than the procedural G-Wagon.
const LENGTH = 5.0;

let template = null;
const waiting = [];

function adapt(src) {
  const list = Array.isArray(src) ? src : [src];
  const done = new Map();
  const map = (m) => {
    if (!m) return m;
    if (done.has(m)) return done.get(m);
    const em = m.emissive && m.emissive.r + m.emissive.g + m.emissive.b > 0.2;
    const next = em
      ? new THREE.MeshBasicMaterial({ color: m.emissive.clone(), map: m.map || null })
      : new THREE.MeshPhongMaterial({
        color: m.map ? new THREE.Color(0xffffff) : (m.color ? m.color.clone() : new THREE.Color(0x1a1a1a)),
        map: m.map || null,
        shininess: (m.metalness || 0) > 0.3 ? 110 : 60,
        specular: new THREE.Color((m.metalness || 0) > 0.3 ? 0xd0d0d0 : 0x666666),
        transparent: !!m.transparent,
        opacity: m.opacity ?? 1,
        side: THREE.DoubleSide,
      });
    done.set(m, next);
    return next;
  };
  return Array.isArray(src) ? list.map(map) : map(src);
}

function fit(scene) {
  const drop = [];
  scene.traverse((o) => {
    if (/floor|showcase/i.test(o.name || '')) { drop.push(o); return; }
    if (!o.isMesh) return;
    const mats = [].concat(o.material).map((m) => (m?.name || '').toLowerCase());
    if (mats.some((n) => n === 'floor')) drop.push(o);
  });
  for (const o of drop) o.parent?.remove(o);

  const root = new THREE.Group();
  root.add(scene);
  // Model length runs along +z with the nose at +z; turn so the nose faces +x.
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
    o.material = adapt(o.material);
    o.castShadow = false;
  });
  root.userData.credit = G63_CREDIT;
  root.updateMatrixWorld(true);
  const wheelSize = new THREE.Vector3();
  root.traverse((o) => {
    if (!o.name || !/tyre|tire/i.test(o.name)) return;
    box.setFromObject(o); box.getSize(wheelSize);
    tagWheel(o, Math.max(wheelSize.y, wheelSize.z) * 0.5);
  });
  return root;
}

function fill(group) {
  const car = template.clone(true);
  car.userData.credit = G63_CREDIT;
  group.add(car);
}

export function loadG63() {
  if (template) return Promise.resolve(template);
  if (loadG63.pending) return loadG63.pending;
  loadG63.pending = new Promise((resolve, reject) => {
    new GLTFLoader().load(URL, (gltf) => {
      template = fit(gltf.scene);
      for (const g of waiting) fill(g);
      waiting.length = 0;
      resolve(template);
    }, undefined, reject);
  });
  return loadG63.pending;
}

/** The showroom G63 AMG. Color is the model's own dark metallic finish. */
export function g63Rig() {
  const g = new THREE.Group();
  if (template) fill(g);
  else { waiting.push(g); loadG63(); }
  return g;
}

loadG63();
