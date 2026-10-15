// Dodge Charger Police NYPD by David_Holiday (https://sketchfab.com/David_Holiday), CC BY 4.0.
// Source: https://sketchfab.com/3d-models/dodge-charger-police-nypd-578e2bfb9c8f415d932527a938e2fc64
// Front is +x, wheels sit on y = 0. Scenery prop parked beside the Nigeria Police Station.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { tagWheel } from './wheels.js';

export const POLICE_CREDIT = 'Dodge Charger Police NYPD by David_Holiday, CC BY 4.0';
const URL = '/models/police-charger.glb';
const LENGTH = 5.0;

let template = null;
const waiting = [];

function adaptMat(m) {
  if (!m) return m;
  const name = (m.name || '').toLowerCase();
  const em = m.emissive && m.emissive.r + m.emissive.g + m.emissive.b > 0.15;
  if (em) return new THREE.MeshBasicMaterial({ color: m.emissive.clone(), map: m.map || null });

  // Cabin glass — dark tint so the empty interior does not read.
  if (/vitre|glass|phare_vitre|giro_glass/i.test(name)) {
    const light = /phare|giro|feux|flash/i.test(name);
    if (light) {
      return new THREE.MeshPhongMaterial({
        color: /rouge|red/i.test(name) ? new THREE.Color(0xc0392b) : new THREE.Color(0xfff6e0),
        transparent: true, opacity: 0.55, shininess: 140,
        specular: new THREE.Color(0xffffff), side: THREE.DoubleSide, depthWrite: false,
      });
    }
    return new THREE.MeshPhongMaterial({
      color: new THREE.Color(0x0a1218), transparent: true, opacity: 0.88,
      shininess: 140, specular: new THREE.Color(0x666666), side: THREE.DoubleSide, depthWrite: true,
    });
  }

  // Light bars / lamps — keep them readable as emissive colour.
  if (/giro_rouge|feux_rouge|flash_orange|phare_orange|phare$/i.test(name)) {
    const col = /orange|flash/i.test(name) ? 0xe67e22 : /rouge|red/i.test(name) ? 0xc0392b : 0xfff2c8;
    return new THREE.MeshBasicMaterial({ color: new THREE.Color(col), map: m.map || null });
  }

  return new THREE.MeshPhongMaterial({
    color: m.map ? new THREE.Color(0xffffff) : (m.color ? m.color.clone() : new THREE.Color(0x1a1a2e)),
    map: m.map || null,
    shininess: (m.metalness || 0) > 0.3 ? 100 : 40,
    specular: new THREE.Color((m.metalness || 0) > 0.3 ? 0xc8c8c8 : 0x555555),
    transparent: !!m.transparent,
    opacity: m.opacity ?? 1,
    side: THREE.DoubleSide,
  });
}

function adapt(src) {
  const list = Array.isArray(src) ? src : [src];
  return Array.isArray(src) ? list.map(adaptMat) : adaptMat(src);
}

function fit(scene) {
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
  // Raw model length runs along +z; turn so the nose faces +x.
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
  root.userData.credit = POLICE_CREDIT;
  root.updateMatrixWorld(true);
  const wheelSize = new THREE.Vector3();
  const wheelBox = new THREE.Box3();
  root.traverse((o) => {
    if (!o.name || !/pneu|wheel|tire|jante/i.test(o.name)) return;
    wheelBox.setFromObject(o); wheelBox.getSize(wheelSize);
    tagWheel(o, Math.max(wheelSize.y, wheelSize.z) * 0.45);
  });
  return root;
}

function fill(group) {
  const car = template.clone(true);
  car.userData.credit = POLICE_CREDIT;
  group.add(car);
}

export function loadPoliceCharger() {
  if (template) return Promise.resolve(template);
  if (loadPoliceCharger.pending) return loadPoliceCharger.pending;
  loadPoliceCharger.pending = new Promise((resolve, reject) => {
    new GLTFLoader().load(URL, (gltf) => {
      template = fit(gltf.scene);
      for (const g of waiting) fill(g);
      waiting.length = 0;
      resolve(template);
    }, undefined, reject);
  });
  return loadPoliceCharger.pending;
}

/** Nigeria Police Force cruiser — parked scenery beside the station. */
export function policeRig() {
  const g = new THREE.Group();
  if (template) fill(g);
  else { waiting.push(g); loadPoliceCharger(); }
  return g;
}

loadPoliceCharger();
