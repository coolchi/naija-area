import * as THREE from 'three';
import { fwd, makeAvatar, makePlayerCar, makeNameSprite } from './entities.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const angDiff = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

export class Controller {
  constructor(canvas, city, colliders, color, name) {
    this.city = city; this.colliders = colliders; this.canvas = canvas;
    this.x = 0; this.z = 0; this.ry = 0; this.mode = 'walk'; this.v = 0; this.cam = 12; this.camYaw = 0; this.camPitch = 0.62; this.dragT = 0; this.frozen = false;
    this.keys = new Set(); this.joy = { x: 0, y: 0, active: false }; this.run = false; this.moving = false; this.blocked = false;
    this.root = new THREE.Group(); this.setLook(color, name);
    this.bind();
  }
  setLook(color, name) {
    this.color = color; this.name = name; if (this.avatar) this.root.remove(this.avatar), this.root.remove(this.carObj);
    this.avatar = makeAvatar(color); this.carObj = makePlayerCar(color); this.root.add(this.avatar, this.carObj); this.carObj.visible = false;
    if (!this.tag) { this.tag = makeNameSprite(name || 'You', '#ffe27a'); this.root.add(this.tag); }
    this.applyMode();
  }
  applyMode() { this.avatar.visible = this.mode === 'walk'; this.carObj.visible = this.mode === 'drive'; this.tag.position.set(0, this.mode === 'drive' ? 4.2 : 3.6, 0); }
  toggleCar() { this.mode = this.mode === 'walk' ? 'drive' : 'walk'; this.v = 0; this.applyMode(); if (this.mode === 'drive') this.camYaw = this.ry; return this.mode; }
  teleport(x, z) { this.x = x; this.z = z; this.v = 0; }
  bind() {
    const kd = (e) => { if (e.target.closest('input,textarea,select')) return; const k = e.key.toLowerCase(); if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault(); this.keys.add(k); if (k === 'shift') this.run = true; };
    const ku = (e) => { const k = e.key.toLowerCase(); this.keys.delete(k); if (k === 'shift') this.run = false; };
    addEventListener('keydown', kd); addEventListener('keyup', ku); addEventListener('blur', () => { this.keys.clear(); this.run = false; });
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
    const { ix, iy } = this.frozen ? { ix: 0, iy: 0 } : this.input(); const oldX = this.x, oldZ = this.z;
    if (this.keys.has('q')) this.camYaw += dt * 1.8; if (this.keys.has('e') && false) this.camYaw -= dt * 1.8;
    if (this.mode === 'walk') {
      const dead = 0.08; const mag = Math.hypot(ix, iy);
      if (mag > dead) {
        const f = fwd(this.camYaw), r = [Math.sin(this.camYaw), Math.cos(this.camYaw)]; let dx = f[0] * iy + r[0] * ix, dz = f[1] * iy + r[1] * ix; const l = Math.hypot(dx, dz); dx /= l; dz /= l;
        const sp = (this.run ? 7 : 5.2) * Math.min(1, mag); this.x += dx * sp * dt; this.z += dz * sp * dt; this.v = sp;
        const target = Math.atan2(-dz, dx); this.ry += angDiff(this.ry, target) * Math.min(1, dt * 12);
      } else this.v = 0;
    } else {
      const thr = iy > 0.15 ? iy : iy < -0.15 ? iy * 0.6 : 0; const steer = Math.abs(ix) > 0.1 ? ix : 0; const maxV = 20;
      if (thr > 0) this.v += 15 * thr * dt; else if (thr < 0) this.v += (this.v > 0 ? 24 : 8) * thr * dt; else this.v -= Math.sign(this.v) * Math.min(Math.abs(this.v), 6 * dt);
      this.v = clamp(this.v, -6, maxV);
      this.ry -= steer * Math.min(1, Math.abs(this.v) / 5) * 1.9 * dt * (this.v >= 0 ? 1 : -1); const f = fwd(this.ry); this.x += f[0] * this.v * dt; this.z += f[1] * this.v * dt;
      if (performance.now() - this.dragT > 1500) this.camYaw += angDiff(this.camYaw, this.ry) * Math.min(1, dt * 3);
    }
    // collisions: push out of building boxes (circle vs AABB), stay inside the district + off the water
    const rad = this.mode === 'drive' ? 2.0 : 0.7; this.blocked = false;
    for (let pass = 0; pass < 2; pass++) for (const c of this.colliders) {
      if (this.x < c.x0 - rad || this.x > c.x1 + rad || this.z < c.z0 - rad || this.z > c.z1 + rad) continue;
      const nx = clamp(this.x, c.x0, c.x1), nz = clamp(this.z, c.z0, c.z1); let dx = this.x - nx, dz = this.z - nz; const d = Math.hypot(dx, dz);
      if (d < rad) { if (d < 1e-4) { const pushes = [[c.x0 - rad - this.x, 0], [c.x1 + rad - this.x, 0], [0, c.z0 - rad - this.z], [0, c.z1 + rad - this.z]].sort((a, b) => Math.hypot(...a) - Math.hypot(...b))[0]; this.x += pushes[0]; this.z += pushes[1]; } else { this.x = nx + (dx / d) * rad; this.z = nz + (dz / d) * rad; } this.blocked = true; if (this.mode === 'drive') this.v *= 0.5; }
    }
    const B = this.city.bounds; this.x = clamp(this.x, B.minX + 1, B.maxX - 1); this.z = clamp(this.z, B.minZ + 1, B.maxZ - 3);
    this.moving = Math.hypot(this.x - oldX, this.z - oldZ) > 0.002;
    this.root.position.set(this.x, 0, this.z); this.root.rotation.y = this.ry;
    if (this.mode === 'walk') this.avatar.userData.body.position.y = this.moving ? Math.abs(Math.sin(performance.now() / 120)) * 0.09 : 0;
  }
  placeCamera(camera, dt) {
    const dist = this.cam * (this.mode === 'drive' ? 1.4 : 1); const f = fwd(this.camYaw); const h = Math.sin(this.camPitch) * dist, back = Math.cos(this.camPitch) * dist;
    const tx = this.x - f[0] * back, tz = this.z - f[1] * back, ty = h + 1.2; const k = 1 - Math.pow(0.0006, dt);
    camera.position.x += (tx - camera.position.x) * k; camera.position.y += (ty - camera.position.y) * k; camera.position.z += (tz - camera.position.z) * k;
    camera.lookAt(this.x, 1.6, this.z); camera.updateMatrixWorld(); camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
  }
}
