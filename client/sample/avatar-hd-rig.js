/**
 * HD body — Mixamo Vanguard (Soldier) with Idle / Walk / Run.
 * Textures are loaded as separate JPEGs (embedded GLB maps were rendering clay).
 * Facing: Mixamo forward −Z → yaw −π/2 for city +X walkers.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js';

export const AVATAR_HD_CREDIT = 'Vanguard / Soldier by Mixamo (Adobe), via three.js examples';
const URL = '/models/avatar-hd-soldier.glb';
const DIFFUSE_URL = '/models/avatar-hd-soldier-1.jpg';
const NORMAL_URL = '/models/avatar-hd-soldier-0.jpg';
// Taller than the blocky avatar (~1.9 m). Extra foot clearance so the walk
// cycle (which dips below the rest-pose soles) does not bury the boots.
const HEIGHT = 2.05;
const FOOT_CLEAR = 0.16;

let sourceScene = null;
let clips = null;
let diffuseTex = null;
let normalTex = null;
const waiting = [];

function loadTex(url, srgb) {
  return new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(
      url,
      (t) => {
        t.flipY = false; // glTF UVs
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.anisotropy = 8;
        if (srgb) t.colorSpace = THREE.SRGBColorSpace;
        t.needsUpdate = true;
        resolve(t);
      },
      undefined,
      reject,
    );
  });
}

function paintMesh(o) {
  if (!o.isMesh) return;
  const label = `${o.name}`.toLowerCase();
  if (label.includes('visor')) {
    o.visible = false;
    return;
  }
  // MeshPhong + explicit maps — same approach as g63/mclaren (city lights are not PBR).
  o.material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    map: diffuseTex,
    normalMap: normalTex,
    normalScale: new THREE.Vector2(1.0, 1.0),
    shininess: 35,
    specular: new THREE.Color(0x444444),
    side: THREE.DoubleSide,
  });
  o.castShadow = true;
  o.receiveShadow = true;
  o.frustumCulled = false;
}

function paint(root) {
  root.traverse(paintMesh);
}

function fit(scene) {
  scene.rotation.y = -Math.PI / 2;
  scene.updateMatrixWorld(true);
  const box0 = new THREE.Box3().setFromObject(scene);
  const size0 = box0.getSize(new THREE.Vector3());
  scene.scale.multiplyScalar(HEIGHT / Math.max(size0.y, 0.001));
  scene.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(scene);
  const c = box.getCenter(new THREE.Vector3());
  scene.position.x -= c.x;
  scene.position.z -= c.z;
  scene.position.y -= box.min.y - FOOT_CLEAR;
  scene.updateMatrixWorld(true);
}

function bindMixer(body) {
  const mixer = new THREE.AnimationMixer(body);
  const actions = {
    idle: mixer.clipAction(clips.idle),
    walk: mixer.clipAction(clips.walk),
    run: mixer.clipAction(clips.run),
  };
  for (const a of Object.values(actions)) {
    a.enabled = true;
    a.setEffectiveWeight(1);
    a.setLoop(THREE.LoopRepeat, Infinity);
  }
  actions.idle.play();
  body.userData.mixer = mixer;
  body.userData.actions = actions;
  body.userData.locoState = 'idle';
  body.userData.hd = true;
  body.userData.bodyKind = 'hd';
  body.userData.credit = AVATAR_HD_CREDIT;
}

function fill(group) {
  const old = group.userData.body;
  if (old) {
    old.userData.mixer?.stopAllAction?.();
    group.remove(old);
  }
  const body = cloneSkeleton(sourceScene);
  // Re-bind maps on the clone so instances never share a broken material state.
  body.traverse((o) => {
    if (!o.isMesh || !o.visible) return;
    if (`${o.name}`.toLowerCase().includes('visor')) {
      o.visible = false;
      return;
    }
    o.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: diffuseTex,
      normalMap: normalTex,
      normalScale: new THREE.Vector2(1.0, 1.0),
      shininess: 35,
      specular: new THREE.Color(0x444444),
      side: THREE.DoubleSide,
    });
    o.castShadow = true;
    o.receiveShadow = true;
    o.frustumCulled = false;
  });
  bindMixer(body);
  group.add(body);
  group.userData.body = body;
  group.userData.hd = true;
  group.userData.bodyKind = 'hd';
  group.userData.limbs = null;
  group.userData.cloth = null;
}

export function loadAvatarHd() {
  if (sourceScene && clips && diffuseTex) return Promise.resolve(sourceScene);
  if (loadAvatarHd.pending) return loadAvatarHd.pending;
  loadAvatarHd.pending = Promise.all([
    loadTex(DIFFUSE_URL, true),
    loadTex(NORMAL_URL, false),
    new Promise((resolve, reject) => new GLTFLoader().load(URL, resolve, undefined, reject)),
  ]).then(([diff, norm, gltf]) => {
    diffuseTex = diff;
    normalTex = norm;
    const by = Object.fromEntries((gltf.animations || []).map((c) => [c.name.toLowerCase(), c]));
    if (!by.idle || !by.walk || !by.run) {
      throw new Error(`avatar-hd-soldier missing idle/walk/run (have: ${Object.keys(by)})`);
    }
    clips = { idle: by.idle, walk: by.walk, run: by.run };
    sourceScene = gltf.scene;
    fit(sourceScene);
    paint(sourceScene);
    for (const g of waiting) fill(g);
    waiting.length = 0;
    return sourceScene;
  }).catch((e) => {
    console.warn('HD avatar failed to load', e);
    loadAvatarHd.pending = null;
    throw e;
  });
  return loadAvatarHd.pending;
}

export function avatarHdRig() {
  const g = new THREE.Group();
  const hold = new THREE.Group();
  g.add(hold);
  g.userData.body = hold;
  g.userData.hd = true;
  g.userData.bodyKind = 'hd';
  g.userData.limbs = null;
  g.userData.cloth = null;
  if (sourceScene && clips && diffuseTex) fill(g);
  else { waiting.push(g); loadAvatarHd().catch(() => {}); }
  return g;
}

export function poseAvatarHd(avatar, _phase, speed, dt = 1 / 60) {
  const body = avatar?.userData?.body;
  const ud = body?.userData;
  if (!ud?.mixer || !ud.actions) return;

  const abs = Math.abs(speed || 0);
  let next = 'idle';
  if (abs > 6.2) next = 'run';
  else if (abs > 0.28) next = 'walk';

  if (next !== ud.locoState) {
    const fade = next === 'idle' ? 0.25 : 0.18;
    const from = ud.actions[ud.locoState];
    const to = ud.actions[next];
    if (from) from.fadeOut(fade);
    to.reset().setEffectiveWeight(1).fadeIn(fade).play();
    ud.locoState = next;
  }

  if (ud.locoState === 'walk') {
    ud.actions.walk.timeScale = THREE.MathUtils.clamp(abs / 4.6, 0.75, 1.35);
  } else if (ud.locoState === 'run') {
    ud.actions.run.timeScale = THREE.MathUtils.clamp(abs / 9.0, 0.9, 1.25);
  } else {
    ud.actions.idle.timeScale = 1;
  }

  ud.mixer.update(Math.max(0, Math.min(dt || 1 / 60, 0.05)));
}

loadAvatarHd();
