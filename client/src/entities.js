import { makePath, atPath } from './path.js';
import { Crowd } from './people.js';
import { gapAhead, stepSpeed, decide, YIELD_CFG } from './yield.js';
import { Headlamps, addPlayerHeadlamps } from './headlamps.js';
import { stopsOnLoop, serves, newStop, stopStep, pickupStart, STOP_CFG } from './busstops.js';
import * as THREE from 'three';
import { Builder, mulberry32 } from '../sample/builder.js';
import { danfoGeo, kekeGeo, okadaGeo, carGeo } from '../sample/vehicles.js';
import { nameTag, glowTexture } from './textures.js';

const vcMat = new THREE.MeshLambertMaterial({ vertexColors: true });
const shadowTex = glowTexture();
const shadowGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });
export const blobShadow = (sx, sz) => { const m = new THREE.Mesh(shadowGeo, shadowMat); m.scale.set(sx, 1, sz); m.position.y = 0.08; m.renderOrder = 1; return m; };

// heading convention: yaw theta, forward = (cos t, -sin t) in (x,z). Model front = +x.
export const fwd = (t) => [Math.cos(t), -Math.sin(t)];

let avatarGeoCache = new Map();
function avatarGeo(hex) {
  if (avatarGeoCache.has(hex)) return avatarGeoCache.get(hex);
  const b = new Builder(3, 0.02);
  b.box(0.42, 0.9, 0.36, 0, 0.0, 0.17, 0x2c3e66, { noAO: true }); b.box(0.42, 0.9, 0.36, 0, 0.0, -0.17, 0x2c3e66, { noAO: true }); // legs (overlap, simple)
  b.box(0.5, 0.85, 0.82, 0, 0.85, 0, hex, { noAO: true });
  b.box(0.3, 0.8, 0.18, 0, 0.9, 0.5, hex, { noAO: true }); b.box(0.3, 0.8, 0.18, 0, 0.9, -0.5, hex, { noAO: true });
  b.sphere(0.27, 0, 2.0, 0, 0x8d5524, { noAO: true }); b.box(0.48, 0.14, 0.52, -0.02, 2.14, 0, 0x1a1a1a, { noAO: true });
  // extra detail for real players: neck, shoes, belt, hands, eyes (a few extra boxes, cached per colour so the cost is paid once)
  b.box(0.16, 0.14, 0.2, 0, 1.76, 0, 0x7a4a2a, { noAO: true }); b.box(0.5, 0.1, 0.86, 0, 0.82, 0, 0x2a1c12, { noAO: true });
  b.box(0.5, 0.12, 0.2, 0.06, -0.02, 0.17, 0x1a1a1a, { noAO: true }); b.box(0.5, 0.12, 0.2, 0.06, -0.02, -0.17, 0x1a1a1a, { noAO: true });
  b.box(0.2, 0.16, 0.2, 0, 0.78, 0.5, 0x8d5524, { noAO: true }); b.box(0.2, 0.16, 0.2, 0, 0.78, -0.5, 0x8d5524, { noAO: true });
  b.box(0.05, 0.07, 0.07, 0.26, 2.04, 0.1, 0x111111, { noAO: true, jit: 0 }); b.box(0.05, 0.07, 0.07, 0.26, 2.04, -0.1, 0x111111, { noAO: true, jit: 0 });
  const g = b.build(); avatarGeoCache.set(hex, g); return g;
}
export function makeAvatar(colorHex) {
  const g = new THREE.Group(); const m = new THREE.Mesh(avatarGeo(new THREE.Color(colorHex).getHex()), vcMat); m.scale.setScalar(0.92); g.add(m); g.userData.body = m;
  g.add(blobShadow(1.6, 1.6)); return g;
}
const carCache = new Map();
export function makePlayerCar(colorHex) {
  const key = new THREE.Color(colorHex).getHex(); if (!carCache.has(key)) carCache.set(key, carGeo('hatch', key));
  const g = new THREE.Group(); const m = new THREE.Mesh(carCache.get(key), vcMat); m.position.y = 0.12; g.add(m); g.add(blobShadow(5.2, 2.8)); addPlayerHeadlamps(g); return g;
}
export function makeNameSprite(text, color) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: nameTag(text, color), depthTest: false, transparent: true })); s.scale.set(5.5, 1.38, 1); s.renderOrder = 10; return s;
}

// ---- NPC traffic: deterministic from server time, so every client sees roughly the same cars without any sync traffic
export class Traffic {
  constructor(scene, loops, busStops = []) {
    this.cars = []; this.loops = new Map(); const rnd = mulberry32(2026); const tmp = {}; let nth = 0;
    const colors = [0xf5f5f5, 0xb0b5ba, 0x1f2328, 0xb71c1c, 0x1e4f8c, 0x2e6b3a, 0xd6c9a8, 0x7a5c3e];
    for (const L of loops) {
      const P = makePath(L.pts, 7, { dense: !!L.dense, slow: true }); const stopsS = stopsOnLoop(P, busStops, L.id); this.loops.set(L.id, { P, stopsS }); const speed = 6.5 + rnd() * 3; const n = Math.max(3, Math.round(P.realLength / 85));
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
    this.tmp = {}; this.heads = new Headlamps(scene, this.cars.length); this.lightLevel = 0;
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
      const raw = gapAhead(car, near); const allowed = !!(raw && raw.local && this.crash && this.crash.consult(c, raw.gap, c.st.v)); const d = decide(allowed ? gapAhead(car, near.filter(b => !b.local)) : raw, { speed: c.st.v, type: c.type, hitAllowed: false }); const hit = d.hit; if (c.crashTok && this.crash) this.crash.contact(c, car, me); let cap = Infinity; if (c.serve || c.special) { const r = stopStep(c.stop, c.s, c.st.v, c.P.length, c.stopsS, step, c.rndStop ??= Math.random()); cap = r.cap; c.dwell = r.dwell; if (r.phase === 'none') c.rndStop = undefined; if (c.stop.phase !== 'none') c.shift = c.speed * serverSec + c.off - c.s; if (c.special) { if (c.stop.phase === 'dwell') { c.holdT += step; if (c.holdT > 45) c.stop.hold = false; } if (c.stop.phase === 'none' && !c.stop.hold && c.st.v > 0.5 && c.leaving) { c.idle = true; c.g.visible = false; c.leaving = false; continue; } if (c.stop.phase === 'leave') c.leaving = true; } } const ideal = c.speed * serverSec + c.off - (c.shift || 0); const lag = c.special ? 0 : ideal - c.s;
      const cruise = Math.min(cap, c.speed * (lag > 0.5 && !hit ? YIELD_CFG.catchUp : 1));
      c.st = stepSpeed(c.st, cruise, hit, step); if (c.hold > 0) { c.hold -= step; c.st.v = 0; } c.s += c.st.v * step; if (lag < -2 && !c.special) c.s = ideal; // never get ahead of the shared timeline
      if (c.st.v < 0.2 && hit) this.stopped++; if (c.st.honk && this.onHorn) this.onHorn(c, car);
      atPath(c.P, c.s, this.tmp); c.g.position.set(this.tmp.x, 0.02, this.tmp.z); c.g.rotation.y = this.tmp.yaw;
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
    this.tmp = {}; this.body = this.crowd.parts.torso; this.legL = this.crowd.parts.legL; this.m = new THREE.Matrix4();
  }
  /** viewer: optional {x, z}; walkers farther than 60 m stop swinging their limbs (cheaper) */
  update(serverSec, viewer = null) {
    this.items.forEach((it, i) => { atPath(it.P, it.dir * it.v * serverSec + it.off, this.tmp); const far = viewer ? Math.hypot(this.tmp.x - viewer.x, this.tmp.z - viewer.z) > 60 : false;
      this.crowd.pose(i, this.tmp.x, 0.2, this.tmp.z, this.tmp.yaw + (it.dir < 0 ? Math.PI : 0), serverSec * it.v * 3.4 + it.ph, 1, far); });
    this.crowd.commit();
  }
}

// ---- ghosts: other real players, interpolated from heartbeat trail samples (rendered slightly in the past)
export class Ghosts {
  constructor(scene) { this.scene = scene; this.map = new Map(); }
  ingest(list, serverNow) {
    const seen = new Set();
    for (const p of list) {
      seen.add(p.id); let g = this.map.get(p.id);
      if (!g) { g = { id: p.id, name: p.n, color: p.c, mode: -1, samples: [], obj: null, tag: null, act: '' }; this.map.set(p.id, g); }
      g.mode = p.m; g.act = p.act || '';
      for (const [off, x, z, ry] of p.s) { const t = serverNow + off; if (!g.samples.length || t > g.samples[g.samples.length - 1].t + 50) g.samples.push({ t, x, z, ry }); }
      if (g.samples.length > 60) g.samples.splice(0, g.samples.length - 60);
      this.build(g);
    }
    for (const [id, g] of this.map) if (!seen.has(id)) { this.scene.remove(g.root); this.map.delete(id); }
  }
  build(g) {
    const want = g.mode === 1 ? 'car' : 'walk'; if (g.kind === want && g.root) return;
    if (g.root) this.scene.remove(g.root);
    g.root = new THREE.Group(); g.obj = want === 'car' ? makePlayerCar(g.color) : makeAvatar(g.color); g.root.add(g.obj);
    g.tag = makeNameSprite(g.name, '#ffffff'); g.tag.position.set(0, want === 'car' ? 4.2 : 3.6, 0); g.root.add(g.tag); g.kind = want; this.scene.add(g.root); g.first = true;
  }
  update(renderT) {
    for (const g of this.map.values()) {
      const S = g.samples; if (!S.length || !g.root) continue; let a = S[0], b = S[S.length - 1];
      if (renderT <= S[0].t) { a = b = S[0]; } else if (renderT >= S[S.length - 1].t) { a = b = S[S.length - 1]; } else for (let i = 0; i < S.length - 1; i++) if (S[i].t <= renderT && S[i + 1].t >= renderT) { a = S[i]; b = S[i + 1]; break; }
      const k = a === b ? 0 : (renderT - a.t) / (b.t - a.t || 1); const x = a.x + (b.x - a.x) * k, z = a.z + (b.z - a.z) * k;
      let dy = b.ry - a.ry; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); const ry = a.ry + dy * k;
      g.root.position.set(x, 0, z); g.root.rotation.y = ry;
      const moving = Math.hypot(b.x - a.x, b.z - a.z) > 0.05 && a !== b; if (g.kind === 'walk') g.obj.userData.body.position.y = moving ? Math.abs(Math.sin(renderT / 140)) * 0.08 : 0;
    }
  }
  dispose() { for (const g of this.map.values()) this.scene.remove(g.root); this.map.clear(); }
}
