/**
 * Casual Man (Grab3D, CC0) — walk / run, idle = paused walk.
 * Dark skin recolor + short African hair; original walk stride kept.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js';

export const AVATAR_CASUAL_CREDIT = 'Casual Man by Grab3D, CC0 (look tuned for Naija Area)';
const URL = '/models/avatar-casual-man.glb';
const DIFFUSE_URL = '/models/avatar-casual-diffuse.jpg';
const NORMAL_URL = '/models/avatar-casual-normal.jpg';
const HEIGHT = 1.95;
const FOOT_CLEAR = 0.28;

let sourceScene = null;
let clips = null;
let diffuseTex = null;
let normalTex = null;
const waiting = [];

function isLightSkin(r, g, b) {
  if (r < 115 || g < 65 || b < 45) return false;
  if (r > 210 && g > 205 && b > 195) return false;
  if (b > r * 0.92 && b > g * 0.9) return false;
  if (g >= r * 0.95 && g > b + 15 && r < 180) return false;
  const rg = r - g;
  const gb = g - b;
  return rg > 6 && rg < 95 && gb > -15 && gb < 70 && r > g;
}

/** Pale pink ear canal / helix that the main skin pass often misses. */
function isPinkEar(r, g, b) {
  if (r < 130 || g < 85 || b < 75) return false;
  if (r > 250 && g > 220) return false;
  return r > b + 20 && r > g + 5 && g < 190 && b < 180 && Math.abs(g - b) < 55;
}

function isEuroHair(r, g, b) {
  // Soft / swept hair in the atlas — not denim, not olive jacket.
  const lum = (r + g + b) / 3;
  if (lum < 12 || lum > 145) return false;
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  if (spread > 70) return false;
  if (b > r + 12) return false;
  if (g > r + 22) return false;
  return r >= 20 && r < 160 && g >= 12 && g < 130 && b < 120;
}

function isLipPixel(r, g, b) {
  // Pink / rose / reddish mouth on the face island (original atlas colours).
  if (r < 105 || g < 40 || b < 40) return false;
  if (g > 170 && b > 150) return false; // open peach skin
  const rg = r - g;
  const rb = r - b;
  return rg > 16 && rb > 18 && g < 155 && b < 145 && r < 245 && g > 35;
}

function darkenSkinPixel(r, g, b) {
  const lum = (0.35 * r + 0.45 * g + 0.2 * b) / 255;
  return [
    Math.round(48 + lum * 72),
    Math.round(28 + lum * 48),
    Math.round(16 + lum * 36),
  ];
}

function afroHairPixel(x, y) {
  // Tight coil noise → short black / deep-brown afro texture.
  const n =
    Math.sin(x * 0.85) * Math.cos(y * 0.91) +
    Math.sin(x * 2.4 + y * 1.7) * 0.65 +
    Math.sin((x * 3.1) + (y * 2.7)) * 0.4;
  const t = n * 0.5 + 0.5;
  const base = 6 + t * 18;
  return [
    Math.round(base + 8),
    Math.round(base + 4),
    Math.round(base + 1),
  ];
}

function fullerLipPixel(r, g, b) {
  // Deeper, fuller African lip tone (keeps a little highlight).
  const lum = (0.4 * r + 0.35 * g + 0.25 * b) / 255;
  return [
    Math.round(70 + lum * 50),
    Math.round(28 + lum * 28),
    Math.round(30 + lum * 26),
  ];
}

/** Recolor skin, hair atlas, and lips on the diffuse map. */
function recolorDiffuse(tex) {
  const img = tex.image;
  if (!img || !img.width) return tex;
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const id = ctx.getImageData(0, 0, c.width, c.height);
  const d = id.data;
  const w = c.width;
  // Pass 1: lips + hair + skin on original colours.
  for (let i = 0, p = 0; i < d.length; i += 4, p++) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    const x = p % w;
    const y = (p / w) | 0;
    if (isLipPixel(r, g, b)) {
      const [nr, ng, nb] = fullerLipPixel(r, g, b);
      d[i] = nr; d[i + 1] = ng; d[i + 2] = nb;
    } else if (isEuroHair(r, g, b)) {
      const [nr, ng, nb] = afroHairPixel(x, y);
      d[i] = nr; d[i + 1] = ng; d[i + 2] = nb;
    } else if (isPinkEar(r, g, b) || isLightSkin(r, g, b)) {
      const [nr, ng, nb] = darkenSkinPixel(r, g, b);
      d[i] = nr; d[i + 1] = ng; d[i + 2] = nb;
    }
  }
  // Pass 2: dilate lips ~2px so the mouth reads fuller.
  const copy = new Uint8ClampedArray(d);
  const lipOf = (lr, lg, lb) => lr > 55 && lr < 150 && lg < 90 && lb < 90 && lr > lg + 15;
  for (let y = 2; y < c.height - 2; y++) {
    for (let x = 2; x < w - 2; x++) {
      const i = (y * w + x) * 4;
      const lr = copy[i], lg = copy[i + 1], lb = copy[i + 2];
      if (!lipOf(lr, lg, lb)) continue;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          if (dx === 0 && dy === 0) continue;
          const j = ((y + dy) * w + (x + dx)) * 4;
          const sr = copy[j], sg = copy[j + 1], sb = copy[j + 2];
          if (sr < 35 || sr > 170) continue;
          if (sg > sr + 8) continue;
          const k = Math.abs(dx) + Math.abs(dy) <= 2 ? 0.9 : 0.7;
          d[j] = Math.round(lr * k + sr * (1 - k));
          d[j + 1] = Math.round(lg * k + sg * (1 - k));
          d[j + 2] = Math.round(lb * k + sb * (1 - k));
        }
      }
    }
  }
  ctx.putImageData(id, 0, 0);
  const out = new THREE.CanvasTexture(c);
  out.flipY = false;
  out.wrapS = out.wrapT = THREE.RepeatWrapping;
  out.anisotropy = tex.anisotropy || 8;
  out.colorSpace = THREE.SRGBColorSpace;
  out.needsUpdate = true;
  return out;
}

function loadTex(url, srgb) {
  return new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(
      url,
      (t) => {
        t.flipY = false;
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

function bone(root, name) {
  let found = null;
  root.traverse((o) => {
    if (found) return;
    if (o.name === name) found = o;
  });
  return found;
}

function addMesh(parent, geo, mat, x, y, z, sx = 1, sy = 1, sz = 1) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.scale.set(sx, sy, sz);
  m.castShadow = true;
  m.frustumCulled = false;
  parent.add(m);
  return m;
}

/**
 * Cover the swept European hair with a dense short afro, and add fuller lips.
 * Attached to Head so it follows look / walk.
 */
function addAfricanFeatures(root) {
  if (root.userData.africanFeatures) return;
  const head = bone(root, 'Head');
  if (!head) {
    console.warn('Casual avatar: Head bone missing — cannot attach afro/lips');
    return;
  }

  const hairMat = new THREE.MeshLambertMaterial({ color: 0x0c0907 });
  const lipMat = new THREE.MeshLambertMaterial({ color: 0x6b2a38 });
  const skinMat = new THREE.MeshLambertMaterial({ color: 0x4a2c1a });

  const features = new THREE.Group();
  features.name = 'africanFeatures';

  // Dense short afro — large enough to bury the original quiff silhouette.
  const afro = new THREE.Group();
  afro.name = 'afroHair';
  addMesh(afro, new THREE.SphereGeometry(0.14, 18, 14), hairMat, 0, 0.1, 0.0, 1.25, 1.05, 1.2);
  addMesh(afro, new THREE.SphereGeometry(0.11, 14, 12), hairMat, 0, 0.16, -0.02, 1.2, 0.75, 1.1);
  addMesh(afro, new THREE.SphereGeometry(0.09, 12, 10), hairMat, 0, 0.08, 0.06, 1.15, 0.85, 0.9);
  addMesh(afro, new THREE.SphereGeometry(0.08, 12, 10), hairMat, 0, 0.09, -0.08, 1.1, 0.8, 0.95);
  addMesh(afro, new THREE.SphereGeometry(0.07, 10, 8), hairMat, 0.09, 0.06, 0.01, 0.7, 1.0, 0.95);
  addMesh(afro, new THREE.SphereGeometry(0.07, 10, 8), hairMat, -0.09, 0.06, 0.01, 0.7, 1.0, 0.95);
  const coil = new THREE.SphereGeometry(0.032, 8, 6);
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * Math.PI * 2;
    const elev = 0.05 + (i % 4) * 0.025;
    const rad = 0.09 + (i % 3) * 0.015;
    addMesh(afro, coil, hairMat, Math.cos(a) * rad, elev + 0.08, Math.sin(a) * rad * 0.85, 0.85 + (i % 3) * 0.1, 0.85, 0.85);
  }
  features.add(afro);

  // Rounded ears covering the pointed / pink mesh ears.
  const ears = new THREE.Group();
  ears.name = 'africanEars';
  for (const side of [-1, 1]) {
    addMesh(ears, new THREE.SphereGeometry(0.048, 12, 10), skinMat, side * 0.108, 0.02, 0.005, 0.5, 1.2, 0.62);
    addMesh(ears, new THREE.SphereGeometry(0.032, 10, 8), skinMat, side * 0.118, -0.01, 0.012, 0.48, 0.95, 0.55); // lobe
    addMesh(ears, new THREE.SphereGeometry(0.03, 10, 8), skinMat, side * 0.102, 0.058, -0.008, 0.52, 0.65, 0.48); // blunt tip
  }
  features.add(ears);

  // Fuller lips — thicker upper + lower, pushed forward on the face.
  const lips = new THREE.Group();
  lips.name = 'fullerLips';
  addMesh(lips, new THREE.SphereGeometry(0.032, 12, 8), lipMat, 0, -0.012, 0.118, 1.95, 0.75, 0.85);
  addMesh(lips, new THREE.SphereGeometry(0.034, 12, 8), lipMat, 0, -0.038, 0.116, 1.9, 0.95, 0.95);
  addMesh(lips, new THREE.SphereGeometry(0.022, 10, 8), lipMat, 0, -0.025, 0.128, 1.5, 0.55, 0.5);
  features.add(lips);

  head.add(features);
  root.userData.africanFeatures = true;
}

function isFeatureMesh(o) {
  let p = o;
  while (p) {
    if (p.name === 'africanFeatures' || p.name === 'afroHair' || p.name === 'fullerLips' || p.name === 'africanEars') return true;
    p = p.parent;
  }
  return false;
}

function paint(root) {
  root.traverse((o) => {
    if (!o.isMesh || isFeatureMesh(o)) return;
    o.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: diffuseTex,
      normalMap: normalTex,
      normalScale: new THREE.Vector2(1, 1),
      shininess: 28,
      specular: new THREE.Color(0x333333),
      side: THREE.DoubleSide,
    });
    o.castShadow = true;
    o.receiveShadow = true;
    o.frustumCulled = false;
  });
}

function fit(scene) {
  scene.rotation.y = Math.PI / 2;
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
  const idle = mixer.clipAction(clips.walk);
  idle.setEffectiveTimeScale(0);
  idle.play();
  const actions = {
    idle,
    walk: mixer.clipAction(clips.walk),
    run: mixer.clipAction(clips.run),
  };
  for (const a of Object.values(actions)) {
    a.enabled = true;
    a.setEffectiveWeight(1);
    a.setLoop(THREE.LoopRepeat, Infinity);
  }
  body.userData.mixer = mixer;
  body.userData.actions = actions;
  body.userData.locoState = 'idle';
  body.userData.hd = true;
  body.userData.bodyKind = 'casual';
  body.userData.credit = AVATAR_CASUAL_CREDIT;
}

function fill(group) {
  const old = group.userData.body;
  if (old) {
    old.userData.mixer?.stopAllAction?.();
    group.remove(old);
  }
  const body = cloneSkeleton(sourceScene);
  paint(body);
  addAfricanFeatures(body);
  bindMixer(body);
  group.add(body);
  group.userData.body = body;
  group.userData.hd = true;
  group.userData.bodyKind = 'casual';
  group.userData.limbs = null;
  group.userData.cloth = null;
}

export function loadAvatarCasual() {
  if (sourceScene && clips && diffuseTex) return Promise.resolve(sourceScene);
  if (loadAvatarCasual.pending) return loadAvatarCasual.pending;
  loadAvatarCasual.pending = Promise.all([
    loadTex(DIFFUSE_URL, true),
    loadTex(NORMAL_URL, false),
    new Promise((resolve, reject) => new GLTFLoader().load(URL, resolve, undefined, reject)),
  ]).then(([diff, norm, gltf]) => {
    diffuseTex = recolorDiffuse(diff);
    normalTex = norm;
    const by = Object.fromEntries((gltf.animations || []).map((c) => [c.name.toLowerCase(), c]));
    if (!by.walk || !by.run) throw new Error(`avatar-casual missing walk/run (have: ${Object.keys(by)})`);
    // Keep original stride (no gait narrowing).
    clips = { walk: by.walk, run: by.run };
    sourceScene = gltf.scene;
    fit(sourceScene);
    paint(sourceScene);
    addAfricanFeatures(sourceScene);
    for (const g of waiting) fill(g);
    waiting.length = 0;
    return sourceScene;
  }).catch((e) => {
    console.warn('Casual avatar failed to load', e);
    loadAvatarCasual.pending = null;
    throw e;
  });
  return loadAvatarCasual.pending;
}

export function avatarCasualRig() {
  const g = new THREE.Group();
  const hold = new THREE.Group();
  g.add(hold);
  g.userData.body = hold;
  g.userData.hd = true;
  g.userData.bodyKind = 'casual';
  g.userData.limbs = null;
  g.userData.cloth = null;
  if (sourceScene && clips && diffuseTex) fill(g);
  else { waiting.push(g); loadAvatarCasual().catch(() => {}); }
  return g;
}

export function poseAvatarCasual(avatar, _phase, speed, dt = 1 / 60) {
  const body = avatar?.userData?.body;
  const ud = body?.userData;
  if (!ud?.mixer || !ud.actions) return;

  const abs = Math.abs(speed || 0);
  let next = 'idle';
  if (abs > 6.2) next = 'run';
  else if (abs > 0.28) next = 'walk';

  if (next !== ud.locoState) {
    const fade = next === 'idle' ? 0.22 : 0.16;
    const from = ud.actions[ud.locoState];
    const to = ud.actions[next];
    if (from) from.fadeOut(fade);
    if (next === 'idle') {
      to.reset().setEffectiveTimeScale(0).fadeIn(fade).play();
    } else {
      to.reset().setEffectiveTimeScale(1).fadeIn(fade).play();
    }
    ud.locoState = next;
  }

  if (ud.locoState === 'walk') {
    ud.actions.walk.timeScale = THREE.MathUtils.clamp(abs / 4.6, 0.75, 1.35);
  } else if (ud.locoState === 'run') {
    ud.actions.run.timeScale = THREE.MathUtils.clamp(abs / 9.0, 0.9, 1.25);
  }

  ud.mixer.update(Math.max(0, Math.min(dt || 1 / 60, 0.05)));
}

loadAvatarCasual();
