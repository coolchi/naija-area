import { makePath, atPath } from './path.js';
import { Crowd } from './people.js';
import { gapAhead, stepSpeed, decide, YIELD_CFG } from './yield.js';
import { Headlamps, addPlayerHeadlamps } from './headlamps.js';
import { stopsOnLoop, serves, newStop, stopStep, pickupStart, STOP_CFG } from './busstops.js';
import * as THREE from 'three';
import { PHYS } from './physics-config.js';
import { ambientLean, damp, clamp as kclamp } from './kinematics.js';
import { Builder, mulberry32 } from '../sample/builder.js';
import { danfoGeo, kekeGeo, okadaGeo, carGeo } from '../sample/vehicles.js';
import { gwagonRig } from '../sample/gwagon-rig.js';
import { cyberRig } from '../sample/cyber-rig.js';
import { mclarenRig } from '../sample/mclaren-rig.js';
import { g63Rig } from '../sample/g63-rig.js';
import { micraRig } from '../sample/micra-rig.js';
import { micra12Rig } from '../sample/micra12-rig.js';
import { policeRig } from '../sample/police-rig.js';
import { spinWheels } from '../sample/wheels.js';
import { nameTag, glowTexture } from './textures.js';
import { applyWear, wearLod } from './wear-models.js';
import { avatarLook } from './avatar-look.js';
import { avatarHdRig, poseAvatarHd } from '../sample/avatar-hd-rig.js';
import { avatarCasualRig, poseAvatarCasual } from '../sample/avatar-casual-rig.js';
import { avatarCasualWomanRig, poseAvatarCasualWoman } from '../sample/avatar-casual-woman-rig.js';
import { PHYSX } from '../../server/config/physx.js';

const vcMat = new THREE.MeshLambertMaterial({ vertexColors: true });
const shadowTex = glowTexture();
const shadowGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });
export const blobShadow = (sx, sz) => { const m = new THREE.Mesh(shadowGeo, shadowMat); m.scale.set(sx, 1, sz); m.position.y = 0.08; m.renderOrder = 1; return m; };

// heading convention: yaw theta, forward = (cos t, -sin t) in (x,z). Model front = +x.
export const fwd = (t) => [Math.cos(t), -Math.sin(t)];

// Limb rig. Jewelry still hangs on userData.body in the old frame: feet y=0, forward +x,
// shoulders along z, head centre y=2.0, arms at z=±0.52 (male), legs at z=±0.2.
// Clothes recolor the limb materials (wear-models.js) so a step does not leave the shirt behind.
const CLOTH_WHITE = 0xffffff
function solid(mat, draw) {
  const b = new Builder(11, 0)
  draw(b)
  return new THREE.Mesh(b.build(), mat)
}
function pivotAt(x, y, z) {
  const g = new THREE.Group()
  g.position.set(x, y, z)
  return g
}
export function makeAvatar(colorHex, gender = 'male', opts = {}) {
  // Paid body upgrades (Phone → Life → Skins): high-res mesh instead of the blocky avatar.
  if (opts.body === 'hd') {
    const g = avatarHdRig();
    g.add(blobShadow(1.6, 1.6));
    return g;
  }
  if (opts.body === 'casual') {
    const g = avatarCasualRig();
    g.add(blobShadow(1.6, 1.6));
    return g;
  }
  if (opts.body === 'casual_f') {
    const g = avatarCasualWomanRig();
    g.add(blobShadow(1.6, 1.6));
    return g;
  }
  const hex = new THREE.Color(colorHex).getHex()
  const female = gender === 'female'
  const L = avatarLook(hex)
  const skin = new THREE.Color(L.skin).getHex()
  const skinDark = new THREE.Color(L.skin).multiplyScalar(0.72).getHex()
  const shirtHex = hex
  const trousers = new THREE.Color(L.trousers).getHex()
  const hairHex = new THREE.Color(L.hair).getHex()
  const shoeHex = 0x1a1a1a
  const shirtMat = new THREE.MeshLambertMaterial({ color: shirtHex })
  const legMat = new THREE.MeshLambertMaterial({ color: trousers })
  const shoeMat = new THREE.MeshLambertMaterial({ color: shoeHex })
  const skinMat = new THREE.MeshLambertMaterial({ color: skin })
  const hairMat = new THREE.MeshLambertMaterial({ color: hairHex })
  const beltMat = new THREE.MeshLambertMaterial({ color: 0x2a1c12 })
  const dressMat = new THREE.MeshLambertMaterial({ color: shirtHex })
  const torsoW = female ? 0.58 : 0.74
  const hipW = female ? 0.78 : 0.6
  const shoulderW = female ? 0.8 : 1.0
  const armZ = female ? 0.48 : 0.52
  const legZ = 0.2
  const g = new THREE.Group()
  const body = new THREE.Group()
  body.scale.setScalar(0.92)
  g.add(body)
  g.userData.body = body
  const torso = solid(shirtMat, (b) => {
    b.box(0.46, 0.58, torsoW, 0, 0.98, 0, CLOTH_WHITE)
    if (female) b.box(0.18, 0.18, torsoW * 0.7, 0.2, 1.22, 0, CLOTH_WHITE)
    b.box(0.34, 0.12, shoulderW, 0, 1.5, 0, CLOTH_WHITE)
  })
  body.add(torso)
  body.add(solid(skinMat, (b) => { b.box(0.14, 0.12, 0.16, 0, 1.64, 0, CLOTH_WHITE) }))
  const hips = solid(legMat, (b) => { b.box(0.42, 0.2, hipW, 0, 0.78, 0, CLOTH_WHITE) })
  body.add(hips)
  const belt = solid(beltMat, (b) => { b.box(0.48, 0.08, torsoW + 0.08, 0, 0.9, 0, CLOTH_WHITE) })
  body.add(belt)
  const limbs = {}
  const addLeg = (side, z) => {
    const hip = pivotAt(0, 0.9, z)
    hip.add(solid(legMat, (b) => { b.box(0.26, 0.42, 0.24, 0, -0.42, 0, CLOTH_WHITE) }))
    const knee = pivotAt(0.02, -0.42, 0)
    knee.add(solid(legMat, (b) => { b.box(0.22, 0.34, 0.2, 0, -0.34, 0, CLOTH_WHITE) }))
    knee.add(solid(skinMat, (b) => { b.box(0.16, 0.06, 0.16, 0, -0.38, 0, CLOTH_WHITE) }))
    knee.add(solid(shoeMat, (b) => {
      b.box(0.42, 0.1, 0.24, 0.06, -0.48, 0, CLOTH_WHITE)
      b.box(0.14, 0.06, 0.2, -0.12, -0.44, 0, 0x111111)
    }))
    hip.add(knee)
    body.add(hip)
    limbs[side === 1 ? 'hipL' : 'hipR'] = hip
    limbs[side === 1 ? 'kneeL' : 'kneeR'] = knee
  }
  addLeg(1, legZ)
  addLeg(-1, -legZ)
  const addArm = (side, z) => {
    const sh = pivotAt(0, 1.56, z)
    sh.add(solid(shirtMat, (b) => { b.box(0.2, 0.32, 0.16, 0, -0.32, 0, CLOTH_WHITE) }))
    const elb = pivotAt(0, -0.32, 0)
    elb.add(solid(skinMat, (b) => {
      b.box(0.16, 0.28, 0.14, 0, -0.28, 0, CLOTH_WHITE)
      b.box(0.16, 0.12, 0.16, 0.02, -0.4, 0, CLOTH_WHITE)
    }))
    sh.add(elb)
    body.add(sh)
    limbs[side === 1 ? 'armL' : 'armR'] = sh
    limbs[side === 1 ? 'elbL' : 'elbR'] = elb
  }
  addArm(1, armZ)
  addArm(-1, -armZ)
  const head = pivotAt(0, 1.86, 0)
  head.add(solid(skinMat, (b) => {
    b.sphere(0.27, 0, 0.14, 0, CLOTH_WHITE, { ws: 10, hs: 8 })
    b.box(0.05, 0.08, 0.05, 0.24, 0.1, 0, skinDark)
    b.sphere(0.055, 0.04, 0.14, 0.25, CLOTH_WHITE, { ws: 6, hs: 5 })
    b.sphere(0.055, 0.04, 0.14, -0.25, CLOTH_WHITE, { ws: 6, hs: 5 })
  }))
  head.add(solid(vcMat, (b) => {
    b.box(0.035, 0.045, 0.055, 0.24, 0.18, 0.08, 0x111111)
    b.box(0.035, 0.045, 0.055, 0.24, 0.18, -0.08, 0x111111)
    b.box(0.02, 0.018, 0.07, 0.25, 0.24, 0.085, 0x1a120e)
    b.box(0.02, 0.018, 0.07, 0.25, 0.24, -0.085, 0x1a120e)
    b.box(0.025, 0.018, 0.1, 0.24, 0.04, 0, 0x6a3030)
  }))
  head.add(solid(hairMat, (b) => {
    if (female) {
      b.sphere(0.3, -0.02, 0.22, 0, CLOTH_WHITE, { ws: 10, hs: 8 })
      for (const zz of [-0.16, -0.05, 0.05, 0.16]) b.box(0.055, 0.62, 0.055, -0.16, -0.36, zz, CLOTH_WHITE)
    } else if (L.style === 1) b.box(0.46, 0.16, 0.5, -0.02, 0.3, 0, CLOTH_WHITE)
    else if (L.style === 2) { b.sphere(0.3, -0.03, 0.22, 0, CLOTH_WHITE); b.sphere(0.16, -0.12, 0.16, 0, CLOTH_WHITE) }
    else if (L.style === 3) { b.sphere(0.29, -0.02, 0.2, 0, CLOTH_WHITE); for (const zz of [-0.14, 0.14]) b.box(0.05, 0.22, 0.05, -0.18, 0.02, zz, CLOTH_WHITE) }
    else if (L.style === 4) { b.box(0.46, 0.14, 0.5, -0.02, 0.32, 0, CLOTH_WHITE); b.box(0.24, 0.1, 0.28, -0.02, 0.44, 0, CLOTH_WHITE) }
    else b.sphere(0.29, -0.03, 0.2, 0, CLOTH_WHITE, { ws: 8, hs: 6 })
  }))
  body.add(head)
  limbs.head = head
  const dress = solid(dressMat, (b) => {
    b.box(0.78, 1.05, 0.98, 0, 0.04, 0, CLOTH_WHITE)
    b.box(0.4, 0.16, 0.7, 0.16, 1.05, 0, CLOTH_WHITE)
  })
  dress.visible = false
  body.add(dress)
  g.userData.limbs = limbs
  g.userData.cloth = { shirt: shirtMat, legs: legMat, shoes: shoeMat, dress, belt, base: { shirt: shirtHex, trousers, shoes: shoeHex } }
  g.add(blobShadow(1.6, 1.6))
  return g
}
export function poseAvatar(avatar, phase, speed, dt = 1 / 60) {
  const kind = avatar?.userData?.bodyKind || avatar?.userData?.body?.userData?.bodyKind;
  if (kind === 'casual') { poseAvatarCasual(avatar, phase, speed, dt); return; }
  if (kind === 'casual_f') { poseAvatarCasualWoman(avatar, phase, speed, dt); return; }
  if (avatar?.userData?.hd) { poseAvatarHd(avatar, phase, speed, dt); return; }
  const L = avatar?.userData?.limbs
  if (!L) return
  const moving = (speed || 0) > 0.12
  const s = moving ? Math.sin(Math.PI * (phase || 0)) : 0
  const swing = moving ? 0.62 : 0
  const lift = moving ? 0.72 : 0
  L.hipL.rotation.z = s * swing
  L.hipR.rotation.z = -s * swing
  L.kneeL.rotation.z = Math.max(0, s) * lift
  L.kneeR.rotation.z = Math.max(0, -s) * lift
  L.armL.rotation.z = -s * swing * 0.9
  L.armR.rotation.z = s * swing * 0.9
  L.elbL.rotation.z = Math.max(0, s) * 0.45
  L.elbR.rotation.z = Math.max(0, -s) * 0.45
  L.head.rotation.z = -s * 0.05
}

const carCache = new Map();
export function makePlayerCar(colorHex, kind = 'hatch') {
  if (kind === 'gwagon') { const g = new THREE.Group(); const car = gwagonRig(colorHex); car.position.y = 0.12; g.add(car); g.add(blobShadow(5.2, 3.1)); addPlayerHeadlamps(g, kind); return g; }
  if (kind === 'g63') { const g = new THREE.Group(); const car = g63Rig(colorHex); car.position.y = 0.12; g.add(car); g.add(blobShadow(5.4, 3.0)); addPlayerHeadlamps(g, kind); return g; }
  if (kind === 'cyber') { const g = new THREE.Group(); const car = cyberRig(colorHex); car.position.y = 0.12; g.add(car); g.add(blobShadow(8.6, 4.2)); addPlayerHeadlamps(g, kind); return g; }
  if (kind === 'mclaren') { const g = new THREE.Group(); const car = mclarenRig(colorHex); car.position.y = 0.12; g.add(car); g.add(blobShadow(6.3, 3.15)); addPlayerHeadlamps(g, kind); return g; }
  if (kind === 'micra') { const g = new THREE.Group(); const car = micraRig(colorHex); car.position.y = 0.12; g.add(car); g.add(blobShadow(4.4, 2.5)); addPlayerHeadlamps(g, kind); return g; }
  if (kind === 'micra12') { const g = new THREE.Group(); const car = micra12Rig(colorHex); car.position.y = 0.12; g.add(car); g.add(blobShadow(4.4, 2.5)); addPlayerHeadlamps(g, 'micra'); return g; }
  const color = new THREE.Color(colorHex).getHex(); const key = kind + ':' + color; if (!carCache.has(key)) carCache.set(key, carGeo(kind, color));
  const g = new THREE.Group(); const m = new THREE.Mesh(carCache.get(key), vcMat); m.position.y = 0.12; g.add(m); g.add(blobShadow(kind === 'cyber' ? 4.6 : 5.2, kind === 'gwagon' || kind === 'g63' ? 3.1 : kind === 'mclaren' ? 3.15 : 2.8)); addPlayerHeadlamps(g, kind); return g;
}
/** a skin's glow (item 9): a flat coloured ring on the ground under an avatar or car (null removes it) */
export function addSkinGlow(obj, hex, r) {
  if (obj.userData.skinGlow) { obj.remove(obj.userData.skinGlow); obj.userData.skinGlow = null; } if (!hex) return;
  const m = new THREE.Mesh(new THREE.RingGeometry(r * 0.78, r, 28).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide })); m.position.y = 0.14; m.renderOrder = 2; obj.add(m); obj.userData.skinGlow = m;
}
/** depthTest defaults true so shop labels do not poke through other buildings; pass false for HUD-like tags (your name). */
export function makeNameSprite(text, color, { depthTest = true } = {}) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: nameTag(text, color), depthTest, transparent: true })); s.scale.set(1.84, 0.46, 1); s.renderOrder = depthTest ? 2 : 10; return s;
}

// ---- NPC traffic: deterministic from server time, so every client sees roughly the same cars without any sync traffic
export class Traffic {
  constructor(scene, loops, busStops = [], roundabouts = []) {
    this.cars = []; this.loops = new Map(); this.roundabouts = roundabouts || []; const rnd = mulberry32(2026); const tmp = {}; let nth = 0;
    const colors = [0xf5f5f5, 0xb0b5ba, 0x1f2328, 0xb71c1c, 0x1e4f8c, 0x2e6b3a, 0xd6c9a8, 0x7a5c3e];
    for (const L of loops) {
      const P = makePath(L.pts, 7, { dense: !!L.dense, slow: true }); const stopsS = this.stopsClear(stopsOnLoop(P, busStops, L.id), P, tmp); this.loops.set(L.id, { P, stopsS }); const speed = 6.5 + rnd() * 3; const n = Math.max(3, Math.round(P.realLength / 85));
      for (let i = 0; i < n; i++) {
        const type = L.npcs[(rnd() * L.npcs.length) | 0]; let geo;
        if (type === 'danfo') geo = danfoGeo(rnd); else if (type === 'keke') geo = kekeGeo(rnd() > 0.2 ? 0xFFC20E : 0x2e7d32, 0x17181b); else if (type === 'okada') geo = okadaGeo(rnd);
        else geo = carGeo(['sedan', 'suv', 'hatch'][(rnd() * 3) | 0], colors[(rnd() * colors.length) | 0]);
        const g = new THREE.Group(); const m = new THREE.Mesh(geo, vcMat); m.position.y = 0.12; g.add(m); g.add(blobShadow(type === 'okada' ? 3 : 5.5, type === 'okada' ? 1.4 : 2.8)); scene.add(g);
        this.cars.push({ g, P, speed: speed * (type === 'okada' ? 1.25 : type === 'danfo' ? 0.9 : 1), off: (P.length * i) / n + rnd() * 6, type, stopsS, serve: stopsS.length > 0 && serves(type, nth++), stop: newStop() });
      }
    }
    // one extra danfo kept hidden until a player calls for it at a bus stop (see dispatch)
    { const sg = new THREE.Group(); const sm = new THREE.Mesh(danfoGeo(mulberry32(99)), vcMat); sm.position.y = 0.12; sg.add(sm); sg.add(blobShadow(5.5, 2.8)); sg.visible = false; scene.add(sg); const first = this.loops.values().next().value;
      this.cars.push({ g: sg, P: first?.P, speed: 8, off: 0, type: 'danfo', stopsS: [], serve: true, stop: newStop(), special: true, idle: true }); this.special = this.cars[this.cars.length - 1]; }
    // Nigeria Police Force cruisers on the main city loop (and a second busy loop when present)
    {
      const loops = [...this.loops.entries()];
      const picks = [loops.find(([id]) => id === 'big') || loops[0], loops.find(([id]) => id === 'ne' || id === 'nw') || loops[1]].filter(Boolean);
      const seen = new Set();
      picks.forEach(([id, L], li) => {
        if (!L?.P || seen.has(id)) return; seen.add(id);
        const n = id === 'big' ? 3 : 1;
        for (let i = 0; i < n; i++) {
          const g = new THREE.Group(); const car = policeRig(); car.position.y = 0.12; g.add(car); g.add(blobShadow(5.2, 2.9)); scene.add(g);
          this.cars.push({ g, P: L.P, speed: 8.2 + i * 0.25 + li * 0.15, off: (L.P.length * (i + 0.35)) / n + li * 11, type: 'police', stopsS: [], serve: false, stop: newStop() });
        }
      });
    }
    this.tmp = {}; this.heads = new Headlamps(scene, this.cars.length); this.lightLevel = 0;
  }
  /** a danfo must not stand on the ring: walk the stop forward until it is clear of every roundabout */
  stopsClear(stops, P, tmp) {
    const rings = this.roundabouts || []; if (!rings.length) return stops;
    return stops.map(st => { let s = st.s; for (let n = 0; n < 28; n++) { atPath(P, s, tmp); if (!rings.some(o => Math.hypot(tmp.x - o.x, tmp.z - o.z) < o.outerR + 12)) break; s = (s + 5) % P.length; } return { ...st, s }; });
  }
  onRing(x, z) { for (const o of this.roundabouts || []) { const d = Math.hypot(x - o.x, z - o.z); if (d <= o.outerR + 2 && d >= (o.islandR || 0) * 0.45) return true; } return false; }
  /** two circles per ambient car near (x,z), for the player's car to bump (client feel only; the server's crash rules are untouched). Reuses its arrays. */
  obstaclesNear(x, z, range) {
    const out = this._obs || (this._obs = []); out.length = 0; this._obsPool ||= []; let n = 0;
    for (const c of this.cars) { if (c.idle || !c.g.visible) continue; const px = c.g.position.x, pz = c.g.position.z; if (Math.abs(px - x) > range || Math.abs(pz - z) > range) continue; const y = c.g.rotation.y, fx = Math.cos(y) * PHYS.collide.npcOffset, fz = -Math.sin(y) * PHYS.collide.npcOffset;
      for (const sgn of [1, -1]) { const o = this._obsPool[n] || (this._obsPool[n] = { x: 0, z: 0, r: 0 }); n++; o.x = px + fx * sgn; o.z = pz + fz * sgn; o.r = c.type === 'okada' ? PHYS.collide.npcR * 0.6 : PHYS.collide.npcR; out.push(o); }
      const mid = this._obsPool[n] || (this._obsPool[n] = { x: 0, z: 0, r: 0 }); n++; mid.x = px; mid.z = pz; mid.r = c.type === 'okada' ? PHYS.collide.npcR * 0.7 : PHYS.collide.npcR * 1.15; out.push(mid); }
    return out;
  }
  /** a player's danfo: appears about 85 m before the stop, drives in, stands at the stop until released. Returns true if started */
  dispatch(stop) { const L = this.loops.get(stop.loop); const c = this.special; if (!L || !c || !c.idle) return false; const e = L.stopsS.find(x => x.id === stop.id); if (!e) return false;
    c.P = L.P; c.stopsS = [e]; c.s = pickupStart(e.s, L.P.length); c.st = { v: STOP_CFG.pickupLead > 0 ? 8 : 0, wait: 0, limit: 3 }; c.stop = newStop(); c.stop.hold = true; c.holdT = 0; c.idle = false; c.stopId = stop.id; c.g.visible = true; atPath(c.P, c.s, this.tmp); c.g.position.set(this.tmp.x, 0.02, this.tmp.z); c.g.rotation.y = this.tmp.yaw; return true; }
  /** is the player's danfo standing at its stop? */
  pickupReady() { const c = this.special; return !!c && !c.idle && c.dwell === true; }
  release() { const c = this.special; if (c && !c.idle) c.stop.hold = false; }
  cancelPickup() { const c = this.special; if (c && !c.idle) { c.stop.hold = false; } }
  /** people: [{x,z,r}] walkers/ghosts/the player (they make cars yield). Without them (or with yielding off) cars follow the shared server timeline exactly. */
  update(serverSec, people = null, dt = 0.016) { this.step(serverSec, people, dt); this.heads.update(this.cars, this.lightLevel); }
  step(serverSec, people, dt) {
    if (!this.last) this.last = serverSec; const step = Math.min(0.1, Math.max(0, serverSec - this.last)) || dt; this.last = serverSec;
    if (!people) { for (const c of this.cars) { if (c.idle) continue; atPath(c.P, c.speed * serverSec + c.off, this.tmp); c.g.position.set(this.tmp.x, 0.02, this.tmp.z); c.g.rotation.y = this.tmp.yaw; } return; }
    const me = this.blockers || (this.blockers = []); me.length = 0; for (const p of people) me.push({ x: p.x, z: p.z, r: p.r ?? 0.5, person: true, local: !!p.local });
    const carB = this.carB || (this.carB = this.cars.map(c => ({ x: 0, z: 0, r: 1.8, self: c, person: false }))); this.cars.forEach((c, i) => { carB[i].x = c.idle ? 1e9 : c.g.position.x; carB[i].z = c.idle ? 1e9 : c.g.position.z; carB[i].dwell = !!c.dwell; });
    this.stopped = 0;
    for (const [i, c] of this.cars.entries()) {
      if (c.idle) continue;
      if (c.s == null) { c.s = c.speed * serverSec + c.off; c.st = { v: c.speed, wait: 0, limit: YIELD_CFG.waitMin + Math.random() * (YIELD_CFG.waitMax - YIELD_CFG.waitMin) }; }
      atPath(c.P, c.s, this.tmp); const car = { x: this.tmp.x, z: this.tmp.z, yaw: this.tmp.yaw, self: c };
      const near = []; for (const b of me) if (Math.abs(b.x - car.x) < 18 && Math.abs(b.z - car.z) < 18) near.push(b); for (let j = 0; j < carB.length; j++) if (j !== i && Math.abs(carB[j].x - car.x) < 18 && Math.abs(carB[j].z - car.z) < 18) near.push(carB[j]);
      let raw = gapAhead(car, near); const ring = this.onRing(car.x, car.z); if (ring) { for (const b of near) { if (b.person || (b.self && b.self === c)) continue; const gap = Math.hypot(b.x - car.x, b.z - car.z) - (b.r || 1.6); if (gap < 7 && (raw == null || gap < raw.gap)) raw = { gap, person: false, local: !!b.local, dwell: !!b.dwell }; } } const allowed = !!(raw && raw.local && this.crash && this.crash.consult(c, raw.gap, c.st.v)); const d = decide(allowed ? gapAhead(car, near.filter(b => !b.local)) : raw, { speed: c.st.v, type: c.type, hitAllowed: false }); let hit = d.hit; if (ring && hit && !hit.person) { c.ringWait = (c.ringWait || 0) + step; if (hit.dwell || c.ringWait > 1.4) hit = null; } else c.ringWait = 0; if (c.crashTok && this.crash) this.crash.contact(c, car, me); let cap = Infinity; if (c.serve || c.special) { const r = stopStep(c.stop, c.s, c.st.v, c.P.length, c.stopsS, step, c.rndStop ??= Math.random()); cap = r.cap; c.dwell = r.dwell; if (r.phase === 'none') c.rndStop = undefined; if (c.stop.phase !== 'none') c.shift = c.speed * serverSec + c.off - c.s; if (c.special) { if (c.stop.phase === 'dwell') { c.holdT += step; if (c.holdT > 45) c.stop.hold = false; } if (c.stop.phase === 'none' && !c.stop.hold && c.st.v > 0.5 && c.leaving) { c.idle = true; c.g.visible = false; c.leaving = false; continue; } if (c.stop.phase === 'leave') c.leaving = true; } } const ideal = c.speed * serverSec + c.off - (c.shift || 0); const lag = c.special ? 0 : ideal - c.s;
      const cruise = Math.min(cap, c.speed * (lag > 0.5 && !hit ? YIELD_CFG.catchUp : 1));
      c.st = stepSpeed(c.st, cruise, hit, step); if (c.hold > 0) { c.hold -= step; c.st.v = 0; } c.s += c.st.v * step; if (lag < -2 && !c.special) c.s = ideal; // never get ahead of the shared timeline
      if (c.st.v < 0.2 && hit) this.stopped++; if (c.st.honk && this.onHorn) this.onHorn(c, car);
      atPath(c.P, c.s, this.tmp); c.g.position.set(this.tmp.x, 0.02, this.tmp.z); c.g.rotation.y = this.tmp.yaw;
      // body lean in bends and nose-dip under braking (visual only, derived from the car's own motion; the shared timeline is untouched)
      const m = c.g.children[0]; if (m && c.pyaw !== undefined && step > 1e-4) { const l = ambientLean(c.pyaw, this.tmp.yaw, c.pv, c.st.v, step); const S = PHYS.susp, k = damp(6, step); c.lr = (c.lr || 0) + (kclamp(-l.ay * S.rollK, -S.maxRoll, S.maxRoll) - (c.lr || 0)) * k; c.lp = (c.lp || 0) + (kclamp(l.ax * S.pitchK, -S.maxPitch, S.maxPitch) - (c.lp || 0)) * k; m.rotation.x = c.lr; m.rotation.z = c.lp; }
      c.pyaw = this.tmp.yaw; c.pv = c.st.v;
    }
  }
}
export class Walkers { // instanced pedestrians on block sidewalks, human shaped (see people.js)
  constructor(scene, zones, count = 36) {
    const rnd = mulberry32(5); this.crowd = new Crowd(scene, count, 5); this.items = [];
    const usable = zones.filter(z => z.z0 < 150);
    for (let i = 0; i < count; i++) {
      const z = usable[(rnd() * usable.length) | 0]; const inset = 1.5; const P = makePath([[z.x0 + inset, z.z0 + inset], [z.x1 - inset, z.z0 + inset], [z.x1 - inset, z.z1 - inset], [z.x0 + inset, z.z1 - inset]], 4);
      this.items.push({ P, off: rnd() * P.length, v: 1.1 + rnd() * 0.7, dir: rnd() > 0.5 ? 1 : -1, ph: rnd() * 6 });
    }
    this.tmp = {}; this.circ = []; this.body = this.crowd.parts.torso; this.legL = this.crowd.parts.legL; this.m = new THREE.Matrix4();
  }
  /** viewer: optional {x, z}; walkers farther than 60 m stop swinging their limbs (cheaper) */
  update(serverSec, viewer = null, ghosts = null) {
    for (const it of this.items) { atPath(it.P, it.dir * it.v * serverSec + it.off, this.tmp); it.x = this.tmp.x; it.z = this.tmp.z; it.yaw = this.tmp.yaw; }
    const gap = 0.92
    const avoid = (a, x, z, min) => {
      if (!Number.isFinite(x) || !Number.isFinite(z) || !Number.isFinite(a.x) || !Number.isFinite(a.z)) return;
      const dx = a.x - x, dz = a.z - z, d = Math.hypot(dx, dz); if (d >= min || d < 1e-3) return; const k = (min - d) / d; a.x += dx * k; a.z += dz * k;
    }
    for (let i = 0; i < this.items.length; i++) {
      const a = this.items[i]
      for (let j = i + 1; j < this.items.length; j++) {
        const b = this.items[j]; const dx = a.x - b.x, dz = a.z - b.z, d = Math.hypot(dx, dz); if (!Number.isFinite(d) || d >= gap || d < 1e-3) continue
        const k = (gap - d) / d * 0.5; a.x += dx * k; a.z += dz * k; b.x -= dx * k; b.z -= dz * k
      }
      if (viewer) avoid(a, viewer.x, viewer.z, 1.05)
      if (ghosts) for (const g of ghosts.map.values()) if (g.root && g.kind && g.kind.startsWith('walk')) avoid(a, g.root.position.x, g.root.position.z, 0.95)
    }
    this.items.forEach((it, i) => {
      if (!Number.isFinite(it.x) || !Number.isFinite(it.z)) return;
      const far = viewer && Number.isFinite(viewer.x) ? Math.hypot(it.x - viewer.x, it.z - viewer.z) > 60 : false
      this.crowd.pose(i, it.x, 0.2, it.z, it.yaw + (it.dir < 0 ? Math.PI : 0), serverSec * it.v * 3.4 + it.ph, 1, far)
    })
    this.crowd.commit()
  }
  /** walkers within `range` of (x, z) as solid circles for the player's collisions (Track G item 5); the walkers themselves do not react */
  circlesNear(x, z, range, out, r = PHYSX.solids.ped.r) {
    if (!Number.isFinite(x) || !Number.isFinite(z)) return out;
    for (const it of this.items) {
      if (!Number.isFinite(it.x) || !Number.isFinite(it.z) || Math.abs(it.x - x) > range || Math.abs(it.z - z) > range) continue;
      let o = it.circ; if (!o) o = it.circ = { x: 0, z: 0, r, h: PHYSX.solids.ped.h, ped: true }; o.x = it.x; o.z = it.z; out.push(o);
    }
    return out;
  }
}

// ---- ghosts: other real players, interpolated from heartbeat trail samples (rendered slightly in the past)
export class Ghosts {
  constructor(scene) { this.scene = scene; this.map = new Map(); }
  ingest(list, serverNow) {
    const seen = new Set();
    for (const p of list) {
      seen.add(p.id); let g = this.map.get(p.id);
      if (!g) { g = { id: p.id, name: p.ct ? `[${p.ct}] ${p.n}` : p.n, color: p.c, mode: -1, samples: [], obj: null, tag: null, act: '', sex: '' }; this.map.set(p.id, g); }
      g.mode = p.m; g.act = p.act || ''; g.e = p.e || ''; g.ride = p.ride || null; g.wear = p.w || []; const sex = p.sx === 'f' ? 'f' : ''; if (g.sex !== sex) { g.sex = sex; g.kind = null; } if (p.bd && p.bd !== g.body) { g.body = p.bd; g.kind = null; } if ((p.t || '') !== (g.title || '')) { g.title = p.t || ''; if (g.root) this.retag(g); }
      const skKey = p.sk ? `${p.sk.a || ''}|${p.sk.c || ''}` : ''; if (g.skKey !== skKey) { g.skKey = skKey; g.sk = p.sk || null; if (g.root) { this.scene.remove(g.root); g.root = null; g.kind = null; } } // a new skin: rebuild the body in its colours
      for (const [off, x, z, ry] of p.s) { const t = serverNow + off; if (!g.samples.length || t > g.samples[g.samples.length - 1].t + 50) g.samples.push({ t, x, z, ry }); }
      if (g.samples.length > 60) g.samples.splice(0, g.samples.length - 60);
      this.build(g);
    }
    for (const [id, g] of this.map) if (!seen.has(id)) { this.emotes?.clear(g); if (g.root) this.scene.remove(g.root); this.map.delete(id); }
  }
  /** one websocket batch of nearby positions. Does not remove anyone: the heartbeat roster still decides who is gone. */
  live(list, serverNow) {
    for (const p of list || []) {
      let g = this.map.get(p.id);
      if (!g) { g = { id: p.id, name: p.n || 'Player', color: p.c || '#888888', mode: -1, samples: [], obj: null, tag: null, act: '' }; this.map.set(p.id, g); }
      if (p.n) g.name = p.n; if (p.c) g.color = p.c; if (p.m === 0 || p.m === 1) g.mode = p.m;
      const t = serverNow; if (!g.samples.length || t > g.samples[g.samples.length - 1].t + 40) g.samples.push({ t, x: p.x, z: p.z, ry: p.ry || 0 });
      if (g.samples.length > 80) g.samples.splice(0, g.samples.length - 80); this.build(g);
    }
  }
  /** the name tag shows the name and, when the player has one, their title (achievements.js on the server) */
  retag(g) { const y = g.tag?.position.y ?? 3.6; if (g.tag) { g.root.remove(g.tag); g.tag.material.map?.dispose?.(); g.tag.material.dispose?.(); } g.tag = makeNameSprite(g.title ? `${g.name} · ${g.title}` : g.name, '#ffffff'); g.tag.position.set(0, y, 0); g.root.add(g.tag); }
  build(g) {
    // Passengers ride inside someone else's car — hide their street mesh so you do not see a second body.
    if (g.ride) { if (g.root) { this.scene.remove(g.root); g.root = null; g.kind = null; } return; }
    const body = g.body || 'hatch'; const want = g.mode === 1 ? 'car:' + body : (g.sex === 'f' ? 'walk:f' : 'walk'); if (g.kind === want && g.root) return;
    if (g.root) this.scene.remove(g.root);
    const sl = this.skinLook?.(g.sk, g.mode === 1 ? 'car' : 'walk') || null; g.root = new THREE.Group(); g.obj = g.mode === 1 ? makePlayerCar(sl?.color || g.color, body) : makeAvatar(sl?.color || g.color, g.sex === 'f' ? 'female' : 'male', { body: sl?.body || '' }); if (sl?.glow) addSkinGlow(g.obj, sl.glow, g.mode === 1 ? 3.4 : 1.1); g.root.add(g.obj);
    const tagY = g.mode === 1 ? (body === 'gwagon' || body === 'g63' ? 2.55 : body === 'cyber' ? 2.95 : body === 'mclaren' ? 2.45 : 2.15) : 2.45;
    g.tag = makeNameSprite(g.title ? `${g.name} · ${g.title}` : g.name, '#ffffff'); g.tag.position.set(0, tagY, 0); g.root.add(g.tag); g.kind = want; this.scene.add(g.root); g.first = true;
  }
  update(renderT, viewer) {
    for (const g of this.map.values()) {
      const S = g.samples; if (!S.length || !g.root) continue; let a = S[0], b = S[S.length - 1];
      if (renderT <= S[0].t) { a = b = S[0]; } else if (renderT >= S[S.length - 1].t) { a = b = S[S.length - 1]; } else for (let i = 0; i < S.length - 1; i++) if (S[i].t <= renderT && S[i + 1].t >= renderT) { a = S[i]; b = S[i + 1]; break; }
      const k = a === b ? 0 : (renderT - a.t) / (b.t - a.t || 1); const x = a.x + (b.x - a.x) * k, z = a.z + (b.z - a.z) * k;
      let dy = b.ry - a.ry; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); const ry = a.ry + dy * k;
      g.root.position.set(x, 0, z); g.root.rotation.y = ry;
      if (g.kind && g.kind.startsWith('car')) { const dx = x - (g._wx ?? x), dz = z - (g._wz ?? z); spinWheels(g.obj, dx * Math.cos(ry) - dz * Math.sin(ry)); g._wx = x; g._wz = z; }
      const walking = !!(g.kind && g.kind.startsWith('walk'));
      const dist = Math.hypot(x - (g._fx ?? x), z - (g._fz ?? z)); const dt = g._ft ? Math.min(0.1, Math.max(0.001, (renderT - g._ft) / 1000)) : 0.016
      g._fx = x; g._fz = z; g._ft = renderT; const spd = dist / dt; const moving = spd > 0.15
      if (walking) {
        g.phase = (g.phase || 0) + dist / 1.45;
        if (!g.obj.userData?.hd) { applyWear(g.obj, g.wear, this.cat); if (viewer) wearLod(g.obj, Math.hypot(x - viewer.x, z - viewer.z) < 45); }
        poseAvatar(g.obj, g.phase, moving ? spd : 0, dt);
        const body = g.obj.userData.body;
        if (body && !g.obj.userData?.hd) body.position.y = moving ? Math.abs(Math.sin(Math.PI * g.phase)) * 0.04 : 0;
      }
      if (this.emotes) this.emotes.step(g, g.e || '', moving, walking ? { y: g.obj.userData.body?.position.y || 0, rx: 0, rz: 0 } : undefined, walking ? 3.6 : 4.2);
    }
  }
  /** people and their cars, as circles a walker cannot pass through */
  circlesNear(x, z, range, out) {
    if (!Number.isFinite(x) || !Number.isFinite(z)) return out;
    for (const g of this.map.values()) {
      if (!g.root || !g.kind) continue
      const gx = g.root.position.x, gz = g.root.position.z
      if (!Number.isFinite(gx) || !Number.isFinite(gz) || Math.abs(gx - x) > range + 4 || Math.abs(gz - z) > range + 4) continue
      if (g.kind.startsWith('walk')) {
        let o = g.circ; if (!o) o = g.circ = { x: 0, z: 0, r: 0.46, h: 1.8, ped: true }
        o.x = gx; o.z = gz; out.push(o)
      } else if (g.kind.startsWith('car')) {
        const ry = g.root.rotation.y, off = 1.55, fx = Math.cos(ry) * off, fz = -Math.sin(ry) * off
        let a = g.circA; if (!a) a = g.circA = { x: 0, z: 0, r: 1.05, h: 1.7 }
        let b = g.circB; if (!b) b = g.circB = { x: 0, z: 0, r: 1.05, h: 1.7 }
        let m = g.circM; if (!m) m = g.circM = { x: 0, z: 0, r: 1.2, h: 1.7 }
        a.x = gx + fx; a.z = gz + fz; b.x = gx - fx; b.z = gz - fz; m.x = gx; m.z = gz; out.push(a, b, m)
      }
    }
    return out
  }
  dispose() { for (const g of this.map.values()) this.scene.remove(g.root); this.map.clear(); }
}
