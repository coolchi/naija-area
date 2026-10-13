// Tesla Cybertruck model by Lexyc16 (https://sketchfab.com/Lexyc16), CC BY 4.0.
// Source: https://sketchfab.com/3d-models/tesla-cybertruck-f12e67159f75486bb21213e573520612
// Front is +x, wheels sit on y = 0. The mesh is the downloaded model, fitted to the other cars.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { tagWheel } from './wheels.js';

export const CYBER_CREDIT = 'Tesla Cybertruck by Lexyc16, CC BY 4.0';
const URL = '/models/cybertruck.glb';
const LENGTH = 5.15;

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
      ? new THREE.MeshBasicMaterial({ color: m.emissive.clone() })
      : new THREE.MeshPhongMaterial({
        color: m.color ? m.color.clone() : new THREE.Color(0xb7bcc2),
        shininess: (m.metalness || 0) > 0.3 ? 90 : 28,
        specular: new THREE.Color((m.metalness || 0) > 0.3 ? 0xb8c0c8 : 0x666666),
        side: THREE.DoubleSide,
      });
    done.set(m, next);
    return next;
  };
  return Array.isArray(src) ? list.map(map) : map(src);
}

function fit(scene) {
  const root = new THREE.Group();
  root.add(scene);
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
  root.userData.credit = CYBER_CREDIT;
  root.updateMatrixWorld(true);
  const wheelSize = new THREE.Vector3();
  root.traverse((o) => {
    if (!o.name || !o.name.startsWith('Circle')) return;
    box.setFromObject(o); box.getSize(wheelSize);
    tagWheel(o, wheelSize.y * 0.5);
  });
  return root;
}

function fill(group) {
  const car = template.clone(true);
  car.userData.credit = CYBER_CREDIT;
  group.add(car);
}

export function loadCybertruck() {
  if (template) return Promise.resolve(template);
  if (loadCybertruck.pending) return loadCybertruck.pending;
  loadCybertruck.pending = new Promise((resolve, reject) => {
    new GLTFLoader().load(URL, (gltf) => {
      template = fit(gltf.scene);
      for (const g of waiting) fill(g);
      waiting.length = 0;
      resolve(template);
    }, undefined, reject);
  });
  return loadCybertruck.pending;
}

/** The showroom Cybertruck. Color is the model's own stainless finish. */
export function cyberRig() {
  const g = new THREE.Group();
  if (template) fill(g);
  else { waiting.push(g); loadCybertruck(); }
  return g;
}

loadCybertruck();
