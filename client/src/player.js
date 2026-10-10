import * as THREE from 'three';
import { fwd, makeAvatar, makePlayerCar, makeNameSprite, addSkinGlow } from './entities.js';
import { PHYS } from './physics-config.js';
import { PHYSX } from '../../server/config/physx.js';
import { newJump, jumpStep } from '../../server/core/physx.js';
import { newWalker, walkStep, gaitStep, newCar, carStep, carVel, setCarVel, zoneSpeedCap, resolveBoxes, resolveCircles, carCircles, newSusp, suspStep, shakeOffset, shakeFromImpact, knockPose, knockSpeed, ambientLean, damp, clamp as kclamp } from './kinematics.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const angDiff = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

/** a flooded street (weather.js) lowers the car's top speed: the zone cap is the lower of the two */
const envCap = (zc, es, cfg) => (es && es.drive < 1 ? Math.min(zc ?? Infinity, cfg.maxSpeed * es.drive) : zc);
const ZERO = [[0, 0]]; // a walker is one circle at its own centre
export class Controller {
  constructor(canvas, city, colliders, color, name) {
    this.city = city; this.colliders = colliders; this.canvas = canvas;
    this.x = 0; this.z = 0; this.ry = 0; this.mode = 'walk'; this.v = 0; this.cam = 12; this.camYaw = 0; this.camPitch = 0.62; this.dragT = 0; this.frozen = false;
    this.walker = newWalker(); this.car = newCar(); this.susp = newSusp(); this.shake = 0; this.shakeT = 0; this.knockT = 99; this.knockDir = [0, 0]; this.bumpAt = 0; this.stepAt = 0; this.camBack = 0; this.lookAt = null; this._shk = { x: 0, y: 0, z: 0 }; this.prevRy = 0; this.prevV = 0; this.hand = false; this.obstacles = null; this.roundabouts = city.roundabouts || [];
    this.jump = newJump(); this.jumpBtn = false; this.solids = null; this.keys = new Set(); this.joy = { x: 0, y: 0, active: false }; this.run = false; this.moving = false; this.blocked = false;
    this.root = new THREE.Group(); this.setLook(color, name);
    this.bind();
  }
  setLook(color, name) {
    this.color = color; this.name = name; if (this.avatar) this.root.remove(this.avatar), this.root.remove(this.carObj);
    const sk = this.skinLooks || {}; this.avatar = makeAvatar(sk.avatar?.color || color); this.carObj = makePlayerCar(sk.car?.color || color); if (sk.avatar?.glow) addSkinGlow(this.avatar, sk.avatar.glow, 1.1); if (sk.car?.glow) addSkinGlow(this.carObj, sk.car.glow, 3.4); this.root.add(this.avatar, this.carObj); this.carObj.visible = false;
    if (!this.tag) { this.tag = makeNameSprite(name || 'You', '#ffe27a'); this.root.add(this.tag); }
    this.applyMode();
  }
  /** the skins you have on (item 9): { avatar: {color, glow}, car: {color, glow} } looks from the catalogue; the body is rebuilt in those colours */
  setSkins(looks) { const key = JSON.stringify(looks || {}); if (key === this._skKey) return false; this._skKey = key; this.skinLooks = looks || {}; this.setLook(this.color, this.name); return true; }
  applyMode() { this.avatar.visible = this.mode === 'walk'; this.carObj.visible = this.mode === 'drive'; this.tag.position.set(0, this.mode === 'drive' ? 4.2 : 3.6, 0); }
  toggleCar() { if (this.auto) { this.auto = null; this.onAuto?.('manual'); } this.mode = this.mode === 'walk' ? 'drive' : 'walk'; this.stopAll(); this.applyMode(); if (this.mode === 'drive') this.camYaw = this.ry; return this.mode; }
  teleport(x, z) { this.x = x; this.z = z; this.stopAll(); this.knockT = 99; this.lookAt = null; }
  /** no velocity left in any model (mode change, teleport, arriving) */
  stopAll() { this.v = 0; Object.assign(this.walker, { vx: 0, vz: 0, speed: 0 }); Object.assign(this.car, { v: 0, lat: 0, steer: 0, th: 0, yaw: 0, ax: 0, ay: 0 }); this.susp = newSusp(); }
  /** knocked back by an ambient vehicle (the server decided it was a hit): a short slide with a hop and a tip, not a teleport. dx,dz = the shove direction (any length). */
  knock(dx, dz) { const l = Math.hypot(dx, dz) || 1; this.knockDir = [dx / l, dz / l]; this.knockT = 0; this.shake = Math.max(this.shake, PHYS.knock.shake); this.susp.yV += 1.4; }
  bind() {
    const kd = (e) => { if (e.target.closest('input,textarea,select')) return; const k = e.key.toLowerCase(); if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault(); this.keys.add(k); if (k === 'shift') this.run = true; if (k === ' ') this.hand = true; };
    const ku = (e) => { const k = e.key.toLowerCase(); this.keys.delete(k); if (k === 'shift') this.run = false; if (k === ' ') this.hand = false; };
    addEventListener('keydown', kd); addEventListener('keyup', ku); addEventListener('blur', () => { this.keys.clear(); this.run = false; this.hand = false; });
    // camera drag (mouse or touch on the right/anywhere not on the joystick) + wheel zoom
    let drag = null;
    this.canvas.addEventListener('pointerdown', (e) => { if (e.target !== this.canvas) return; drag = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: 0 }; this.canvas.setPointerCapture?.(e.pointerId); });
    this.canvas.addEventListener('pointermove', (e) => { if (!drag || drag.id !== e.pointerId) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.x = e.clientX; drag.y = e.clientY; drag.moved += Math.abs(dx) + Math.abs(dy); this.camYaw -= dx * 0.006; this.camPitch = clamp(this.camPitch + dy * 0.004, 0.25, 1.15); this.dragT = performance.now(); });
    const end = (e) => { if (drag && drag.id === e.pointerId) { this.lastTap = drag.moved < 6 ? { x: e.clientX, y: e.clientY, t: performance.now() } : null; drag = null; } };
    this.canvas.addEventListener('pointerup', end); this.canvas.addEventListener('pointercancel', end);
    this.canvas.addEventListener('wheel', (e) => { this.cam = clamp(this.cam + e.deltaY * 0.01, 7, 26); e.preventDefault(); }, { passive: false });
    // virtual joystick
    const base = document.getElementById('joy'), knob = document.getElementById('joyKnob'); if (!base) return; let jid = null; const R = 52;
    const set = (e) => { const r = base.getBoundingClientRect(); let dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2); const l = Math.hypot(dx, dy); if (l > R) { dx = (dx / l) * R; dy = (dy / l) * R; } this.joy.x = dx / R; this.joy.y = -dy / R; knob.style.transform = `translate(${dx}px,${dy}px)`; };
    base.addEventListener('pointerdown', (e) => { jid = e.pointerId; base.setPointerCapture(e.pointerId); this.joy.active = true; set(e); e.preventDefault(); });
    base.addEventListener('pointermove', (e) => { if (e.pointerId === jid) set(e); });
    const je = (e) => { if (e.pointerId === jid) { jid = null; this.joy.x = this.joy.y = 0; this.joy.active = false; knob.style.transform = ''; } };
    base.addEventListener('pointerup', je); base.addEventListener('pointercancel', je);
  }
  input() {
    const k = this.keys; let ix = (k.has('d') || k.has('arrowright') ? 1 : 0) - (k.has('a') || k.has('arrowleft') ? 1 : 0), iy = (k.has('w') || k.has('arrowup') ? 1 : 0) - (k.has('s') || k.has('arrowdown') ? 1 : 0);
    if (this.joy.active) { ix = this.joy.x; iy = this.joy.y; } const l = Math.hypot(ix, iy); if (l > 1) { ix /= l; iy /= l; } return { ix, iy };
  }
  update(dt) {
    const P = PHYS; if (this.stun > 0) this.stun -= dt; const { ix, iy } = (this.frozen || this.stun > 0) ? { ix: 0, iy: 0 } : this.input(); const oldX = this.x, oldZ = this.z, oldRy = this.ry, oldV = this.v; const drive = this.mode === 'drive';
    if (this.keys.has('q')) this.camYaw += dt * 1.8; if (this.keys.has('e') && false) this.camYaw -= dt * 1.8;
    if (this.auto && !this.frozen && (Math.hypot(ix, iy) > 0.25 || this.joy.active)) { this.auto = null; this.onAuto?.('manual'); }
    const w = this.walker, c = this.car; const auto = !!(this.auto && !this.frozen); let ax = 0, ay = 0;
    if (auto) {
      const s = this.auto.step(this.x, this.z, this.ry, this.v, dt); this.x = s.x; this.z = s.z; this.ry = s.ry; this.v = s.v;
      // keep the manual models in step with the autopilot so taking over is smooth
      w.vx = kclamp((s.x - oldX) / Math.max(dt, 1e-3), -P.walk.runSpeed, P.walk.runSpeed); w.vz = kclamp((s.z - oldZ) / Math.max(dt, 1e-3), -P.walk.runSpeed, P.walk.runSpeed); w.speed = Math.hypot(w.vx, w.vz); w.run = this.v > P.walk.walkSpeed + 0.3 ? 1 : 0;
      c.v = s.v; c.lat = 0; c.steer = 0; c.th = 0; c.ry = s.ry; c.x = s.x; c.z = s.z;
      if (performance.now() - this.dragT > 1500) this.camYaw += angDiff(this.camYaw, this.ry) * Math.min(1, dt * (drive ? 3 : 1.6));
    } else if (!drive) {
      jumpStep(this.jump, (this.keys.has('j') || this.keys.has(' ') || this.jumpBtn) && !this.frozen && !(this.stun > 0), dt, PHYSX.jump, !this.noJump);
      if (this.jump.justLanded) this.shake = Math.max(this.shake, 0.06);
      const dead = 0.08; const mag = Math.hypot(ix, iy);
      if (mag > dead) {
        const f = fwd(this.camYaw), r = [Math.sin(this.camYaw), Math.cos(this.camYaw)]; let dx = f[0] * iy + r[0] * ix, dz = f[1] * iy + r[1] * ix; const l = Math.hypot(dx, dz); dx /= l; dz /= l;
        walkStep(w, dx, dz, mag * (this.envScale?.walk ?? 1), this.run, dt, this.jump.air ? this.airWalk(P.walk) : P.walk); const target = Math.atan2(-dz, dx); this.ry += angDiff(this.ry, target) * Math.min(1, dt * P.walk.turnRate);
      } else walkStep(w, 0, 0, 0, this.run, dt, P.walk);
      this.x += w.vx * dt; this.z += w.vz * dt; this.v = w.speed;
    } else {
      c.x = this.x; c.z = this.z; c.ry = this.ry; const pedal = Math.abs(iy) > 0.15 ? iy : 0; const steer = Math.abs(ix) > 0.1 ? ix : 0;
      carStep(c, { pedal, steer, hand: this.hand && !this.frozen }, dt, P.car, { cap: envCap(zoneSpeedCap(c.x, c.z, this.roundabouts, P.car), this.envScale, P.car) });
      this.x = c.x; this.z = c.z; this.ry = c.ry; this.v = c.v; ay = c.ay; ax = c.ax;
      if (performance.now() - this.dragT > 1500) this.camYaw += angDiff(this.camYaw, this.ry) * damp(3, dt);
    }
    // knock-back slide (after a server-decided hit): extra displacement that dies away quickly
    if (drive || auto) { this.jump.y = 0; this.jump.vy = 0; this.jump.air = false; }
    let pose = { y: 0, tilt: 0 };
    if (this.knockT < 1.9) { const sp = knockSpeed(this.knockT, P.knock); this.x += this.knockDir[0] * sp * dt; this.z += this.knockDir[1] * sp * dt; this.knockT += dt; pose = knockPose(this.knockT, P.knock); }
    // collisions: slide along building boxes (bounce a little, lose speed, shake the camera), bump ambient traffic, stay inside the district + off the water
    const rad = drive ? 2.0 : 0.7; this.blocked = false; let impact = 0;
    if (auto) {
      const p = { x: this.x, z: this.z, vx: 0, vz: 0 }; const r = resolveBoxes(p, this.colliders, rad, 0, dt, P.collide); this.x = p.x; this.z = p.z; if (r.hit) { this.blocked = true; if (drive) this.v *= 0.5; }
    } else {
      const p = drive ? Object.assign(carVel(c), { x: this.x, z: this.z }) : { x: this.x, z: this.z, vx: w.vx, vz: w.vz };
      const r = resolveBoxes(p, this.colliders, rad, drive ? P.collide.carRestitution : P.collide.walkRestitution, dt, P.collide); impact = r.impact; let hit = r.hit;
      if (drive && P.collide.npcCars && this.obstacles) { const list = this.obstacles(this.x, this.z, P.collide.npcRange + 4); if (list.length) { const self = carCircles(p.x, p.z, this.ry, P.collide.selfOffset, this._offs || (this._offs = [])); const r2 = resolveCircles(p, self, P.collide.selfR, list, P.collide.carRestitution, dt, P.collide); hit = hit || r2.hit; impact = Math.max(impact, r2.impact); } }
      if (this.solids && !auto) { const L = this.solids(p.x, p.z, drive ? 8 : 3, this.jump.y); if (L.props.length) { const self = drive ? carCircles(p.x, p.z, this.ry, P.collide.selfOffset, this._offs || (this._offs = [])) : ZERO; const r3 = resolveCircles(p, self, drive ? P.collide.selfR : PHYSX.walkerRadius, L.props, drive ? P.collide.carRestitution : 0, dt, P.collide); hit = hit || r3.hit; impact = Math.max(impact, r3.impact); }
        if (L.peds.length && PHYSX.ped.enabled) { const self = drive ? carCircles(p.x, p.z, this.ry, P.collide.selfOffset, this._offs || (this._offs = [])) : ZERO; const r4 = resolveCircles(p, self, drive ? P.collide.selfR : PHYSX.walkerRadius, L.peds, drive ? P.collide.carRestitution : 0, dt, P.collide); hit = hit || r4.hit; impact = Math.max(impact, r4.impact); if (drive && r4.hit && Math.hypot(p.vx, p.vz) > 3) { p.vx *= 1 - PHYSX.ped.bumpSpeedLoss; p.vz *= 1 - PHYSX.ped.bumpSpeedLoss; } } }
      this.x = p.x; this.z = p.z; this.blocked = hit;
      if (drive) { c.x = p.x; c.z = p.z; setCarVel(c, p.vx, p.vz); this.v = c.v; } else { w.vx = p.vx; w.vz = p.vz; w.speed = Math.hypot(w.vx, w.vz); this.v = w.speed; }
    }
    const B = this.city.bounds; const cx = kclamp(this.x, B.minX + 1, B.maxX - 1), cz = kclamp(this.z, B.minZ + 1, B.maxZ - 3); if (cx !== this.x) { w.vx = 0; c.lat = 0; } if (cz !== this.z) { w.vz = 0; } this.x = cx; this.z = cz;
    this.moving = Math.hypot(this.x - oldX, this.z - oldZ) > 0.002; if (this.auto) this.auto.observe(this.x, this.z, dt);
    // impact feedback: camera shake, a body kick, a quiet thud (rate limited)
    let kick = 0; if (impact > P.collide.minImpact) { this.shake = Math.max(this.shake, shakeFromImpact(impact, P.camera)); kick = Math.min(2.5, impact * P.susp.bumpKick * 0.12); const now = performance.now(); if (now - this.bumpAt > 250) { this.bumpAt = now; if (P.audio.thud) this.onBump?.(impact); } }
    this.root.position.set(this.x, 0, this.z); this.root.rotation.y = this.ry;
    // visuals
    if (!drive) {
      const steps = gaitStep(w, dt, P.walk); const b = this.avatar.userData.body; b.position.y = w.bob; b.rotation.z = -w.lean; b.rotation.x = w.sway; this.avatar.position.y = pose.y + this.jump.y; this.avatar.rotation.z = pose.tilt;
      if (steps > 0 && P.audio.footsteps && !this.jump.air && w.speed > P.audio.footstepMinSpeed) { const now = performance.now(); if (now - this.stepAt > 90) { this.stepAt = now; this.onStep?.(w.speed / P.walk.runSpeed); } }
    } else {
      if (auto) { const l = ambientLean(oldRy, this.ry, oldV, this.v, Math.max(dt, 1e-3)); ax = l.ax; ay = l.ay; }
      suspStep(this.susp, ax, ay, kick, dt, P.susp); const m = this.carObj.children[0]; if (m) { m.rotation.x = this.susp.roll; m.rotation.z = this.susp.pitch; m.position.y = 0.12 + this.susp.y; } this.avatar.position.y = 0; this.avatar.rotation.z = 0;
    }
    this.prevRy = this.ry; this.prevV = this.v;
  }
  /** walking settings while airborne: you can steer a little but not stop or turn on a coin */
  airWalk(W) { const k = PHYSX.jump.airControl; return (this._air ||= { ...W, accel: W.accel * k, decel: W.decel * k }); }
  /** current speed over the ground for the camera (m/s) */
  groundSpeed() { return this.mode === 'drive' ? Math.hypot(this.car.v, this.car.lat) : this.walker.speed; }
  placeCamera(camera, dt) {
    const C = PHYS.camera; const drive = this.mode === 'drive'; const sp = this.groundSpeed(); this.camBack += (Math.min(C.backoffMax, sp * C.backoffPerMs) - this.camBack) * damp(3, dt);
    const dist = this.cam * (drive ? 1.4 : 1) + this.camBack; const f = fwd(this.camYaw); const h = Math.sin(this.camPitch) * dist, back = Math.cos(this.camPitch) * dist;
    const tx = this.x - f[0] * back, tz = this.z - f[1] * back, ty = h + 1.2; const k = damp(drive ? C.followDrive : C.followWalk, dt);
    const sh = this._shk; camera.position.x -= sh.x; camera.position.y -= sh.y; camera.position.z -= sh.z; // take last frame's shake off before following
    camera.position.x += (tx - camera.position.x) * k; camera.position.y += (ty - camera.position.y) * k; camera.position.z += (tz - camera.position.z) * k;
    const ahead = Math.min(C.lookAheadMax, Math.max(0, this.v) * C.lookAheadPerMs); const gx = this.x + Math.cos(this.ry) * ahead, gz = this.z - Math.sin(this.ry) * ahead; if (!this.lookAt) this.lookAt = { x: gx, z: gz }; const lk = damp(C.lookRate, dt); this.lookAt.x += (gx - this.lookAt.x) * lk; this.lookAt.z += (gz - this.lookAt.z) * lk;
    this.shake *= Math.exp(-C.shakeDecay * dt); if (this.shake < 1e-3) this.shake = 0; this.shakeT += dt; const [ox, oy] = shakeOffset(this.shake, this.shakeT, C); const cy = this.camYaw; sh.x = Math.sin(cy) * ox; sh.z = Math.cos(cy) * ox; sh.y = oy;
    camera.position.x += sh.x; camera.position.y += sh.y; camera.position.z += sh.z;
    camera.lookAt(this.lookAt.x, 1.6, this.lookAt.z); camera.updateMatrixWorld(); camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
  }
}
