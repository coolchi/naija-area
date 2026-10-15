// McLaren F1 1993 by Alex.Ka. (https://sketchfab.com/Alex.Ka.), CC BY-NC 4.0.
// Source: https://sketchfab.com/3d-models/mclaren-f1-1993-by-alexka-294df724d96241cdbe0e0f3c91ad7fce
// Front is +x, wheels sit on y = 0. The download includes a huge floor plane we strip out.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { tagWheel } from './wheels.js';

export const MCLAREN_CREDIT = 'McLaren F1 1993 by Alex.Ka., CC BY-NC 4.0';
const URL = '/models/mclaren-f1.glb';
// Real F1 is about 4.3 m long; sized up a bit so it reads as a Motoka supercar on the lot.
const LENGTH = 5.8;

let template = null;
const waiting = [];

// Glossy white shell; black glass, tires, and body stripes match the Alex.Ka. reference.
const WHITE = new THREE.Color(0xffffff);
const BLACK = new THREE.Color(0x0d0d0d);
const RUBBER = new THREE.Color(0x050505);
const BODY_WHITE = /mclaren_f1_1993|f1_front_plastic|bottom/i;
const GLASS = /windo_/i;
const TIRE = /^tire$|tire_side|tyre/i;
const BODY_BLACK = /black_matte|black_plastic|black_chrome|black_aluminium|f1_side|grill|interior|mirrors|exhaust_metal|suport/i;
const RIM = /rimbolt|rimlogo|brakedisk/i;

function sharpenMap(tex) {
  if (!tex) return null;
  tex.anisotropy = Math.max(tex.anisotropy || 1, 8);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function adapt(src) {
  const list = Array.isArray(src) ? src : [src];
  const done = new Map();
  const map = (m) => {
    if (!m) return m;
    if (done.has(m)) return done.get(m);
    const name = m.name || '';
    const em = m.emissive && m.emissive.r + m.emissive.g + m.emissive.b > 0.15;
    if (em) {
      const next = new THREE.MeshBasicMaterial({ color: m.emissive.clone(), map: m.map || null });
      done.set(m, next);
      return next;
    }
    // Dark tinted cabin glass (windshield + side/rear), not clear/white.
    if (GLASS.test(name)) {
      const next = new THREE.MeshPhongMaterial({
        color: BLACK.clone(),
        transparent: true,
        opacity: 0.88,
        shininess: 140,
        specular: new THREE.Color(0x666666),
        side: THREE.DoubleSide,
        depthWrite: true,
      });
      done.set(m, next);
      return next;
    }
    // Keep tread + Michelin sidewall maps; multiply dark so rubber reads black, not washed grey.
    if (TIRE.test(name)) {
      const side = /tire_side/i.test(name);
      const next = new THREE.MeshPhongMaterial({
        color: side ? new THREE.Color(0x2a2a2a) : RUBBER.clone(),
        map: sharpenMap(m.map),
        normalMap: m.normalMap || null,
        bumpMap: m.bumpMap || null,
        bumpScale: m.bumpMap ? 0.35 : 0,
        shininess: 12,
        specular: new THREE.Color(0x1a1a1a),
        side: THREE.DoubleSide,
      });
      done.set(m, next);
      return next;
    }
    // Brake discs / rim logos keep their baked detail; tint discs dark metal.
    if (RIM.test(name)) {
      const disk = /brakedisk/i.test(name);
      const next = new THREE.MeshPhongMaterial({
        color: disk ? new THREE.Color(0x222226) : WHITE.clone(),
        map: sharpenMap(m.map),
        shininess: disk ? 70 : 40,
        specular: new THREE.Color(disk ? 0x888888 : 0x444444),
        side: THREE.DoubleSide,
      });
      done.set(m, next);
      return next;
    }
    // Hood/side stripe panels and matte trims — solid black like the reference.
    if (BODY_BLACK.test(name)) {
      const next = new THREE.MeshPhongMaterial({
        color: BLACK.clone(),
        shininess: /chrome/i.test(name) ? 90 : 28,
        specular: new THREE.Color(/chrome/i.test(name) ? 0x555555 : 0x222222),
        side: THREE.DoubleSide,
      });
      done.set(m, next);
      return next;
    }
    // Bright white shell so night lighting cannot wash the body to grey.
    if (BODY_WHITE.test(name)) {
      const next = new THREE.MeshPhongMaterial({
        color: WHITE.clone(),
        emissive: new THREE.Color(0x4a4a4a),
        shininess: 110,
        specular: new THREE.Color(0xffffff),
        side: THREE.DoubleSide,
      });
      done.set(m, next);
      return next;
    }
    const next = new THREE.MeshPhongMaterial({
      color: m.map ? new THREE.Color(0xffffff) : (m.color ? m.color.clone() : new THREE.Color(0x222222)),
      map: m.map || null,
      shininess: (m.metalness || 0) > 0.3 ? 100 : 40,
      specular: new THREE.Color((m.metalness || 0) > 0.3 ? 0xc8c8c8 : 0x444444),
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
  // Model length runs along +z; turn so the nose faces +x like the other rigs.
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
  root.userData.credit = MCLAREN_CREDIT;
  root.updateMatrixWorld(true);
  const wheelSize = new THREE.Vector3();
  const wheelBox = new THREE.Box3();
  root.traverse((o) => {
    if (!o.name || !/tire|tyre|rim|wheel/i.test(o.name)) return;
    wheelBox.setFromObject(o); wheelBox.getSize(wheelSize);
    tagWheel(o, Math.max(wheelSize.y, wheelSize.z) * 0.5);
  });
  return root;
}

function fill(group) {
  const car = template.clone(true);
  car.userData.credit = MCLAREN_CREDIT;
  group.add(car);
}

export function loadMclaren() {
  if (template) return Promise.resolve(template);
  if (loadMclaren.pending) return loadMclaren.pending;
  loadMclaren.pending = new Promise((resolve, reject) => {
    new GLTFLoader().load(URL, (gltf) => {
      template = fit(gltf.scene);
      for (const g of waiting) fill(g);
      waiting.length = 0;
      resolve(template);
    }, undefined, reject);
  });
  return loadMclaren.pending;
}

/** The showroom McLaren F1 — glossy white body matching the reference livery. */
export function mclarenRig() {
  const g = new THREE.Group();
  if (template) fill(g);
  else { waiting.push(g); loadMclaren(); }
  return g;
}

loadMclaren();
