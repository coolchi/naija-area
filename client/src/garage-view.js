// The player's own garage: five painted slots (balance.cars.garageSlots), the owned cars standing in them, the active car marked. Read-only 3D room + a small info bar.
import * as THREE from 'three';
import { get, post, fmtN, h } from './api.js';
import { makePlayerCar, makeNameSprite } from './entities.js';
import { garageShell } from './rooms.js';

export class GarageView {
  constructor(game) { this.g = game; this.open = false; }
  async show() {
    const g = this.g; const d = await g.ui.guard(() => get('/api/garage')); if (!d) return false; this.d = d; this.open = true; g.ui.closeSheet?.();
    this.el = h('div', { id: 'garageView' }); document.body.append(this.el); this.canvas = h('canvas'); this.el.append(this.canvas);
    this.r = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true }); this.r.setPixelRatio(Math.min(devicePixelRatio, 2)); this.scene = new THREE.Scene(); this.scene.background = new THREE.Color(0x23303a);
    this.cam = new THREE.PerspectiveCamera(42, 1, 0.1, 100); this.yaw = Math.PI / 6; this.pitch = 0.72; this.dist = 22; this.anim = []; this.t0 = performance.now();
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x887766, 1.05)); const sun = new THREE.DirectionalLight(0xfff0d0, 0.9); sun.position.set(4, 10, 6); this.scene.add(sun);
    garageShell(this.scene, this.anim, d.slots); this.cars = new THREE.Group(); this.scene.add(this.cars); this.fill();
    this.chrome(); this.bind(); this.resize(); this.onResize = () => this.resize(); addEventListener('resize', this.onResize); this.loop(); return true;
  }
  fill() {
    this.cars.clear(); const d = this.d; this.slotCars = [];
    for (let s = 0; s < d.slots; s++) {
      const c = d.cars[s]; const x = (s - (d.slots - 1) / 2) * 2.8;
      if (!c) { const sp = makeNameSprite('Empty slot', '#9aa5b1'); sp.scale.set(2.6, 0.65, 1); sp.position.set(x, 1.0, 0.4); this.cars.add(sp); continue; }
      const car = makePlayerCar(c.color, c.body || 'hatch'); car.scale.setScalar(c.body === 'gwagon' || c.body === 'cyber' ? 0.55 : 0.62); car.position.set(x, 0.05, 0.5); car.rotation.y = Math.PI / 2 + 0.0; car.userData.carId = c.id; this.cars.add(car); this.slotCars.push(car);
      const sp = makeNameSprite(`${c.active ? '✅ ' : ''}${c.name}`, c.active ? '#b9f6ca' : '#fff3c4'); sp.scale.set(3.0, 0.75, 1); sp.position.set(x, 2.0, 0.5); this.cars.add(sp);
      if (c.active) { const ring = new THREE.Mesh(new THREE.RingGeometry(1.6, 1.85, 40), new THREE.MeshBasicMaterial({ color: 0x35c46b, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })); ring.rotation.x = -Math.PI / 2; ring.position.set(x, 0.04, 0.5); this.cars.add(ring); this.anim.push(t => { ring.material.opacity = 0.55 + 0.3 * Math.sin(t * 3); }); }
    }
  }
  chrome() {
    const d = this.d; const info = this.info = h('div', { class: 'gv-info' }); const head = h('div', { class: 'ihead' }, h('div', {}, h('h3', {}, 'My garage'), h('div', { style: 'font-size:13px' }, `${d.cars.length}/${d.slots} slots used · driving ${d.active.label}`)), h('button', { class: 'btn small red', id: 'garageClose', onclick: () => this.close() }, 'Close'));
    const list = h('div', { class: 'gv-list' }, d.cars.map(c => h('button', { class: 'btn small alt', 'data-car': c.id, onclick: () => this.pick(c) }, `${c.active ? '✅ ' : ''}${c.name}`)), d.cars.length ? '' : h('span', { class: 'mut' }, 'No cars yet. Visit Motoka AutoMart Showroom.'));
    this.el.append(head, list, info); if (d.cars[0]) this.pick(d.cars.find(c => c.active) || d.cars[0]);
  }
  pick(c) {
    const bar = (p) => h('div', { class: 'cbar' }, h('i', { style: `width:${p}%` }));
    this.info.replaceChildren(h('b', {}, c.name), h('div', { class: 'mut' }, `Worth ${fmtN(c.value)} (paid ${fmtN(c.paid)}) · ${c.ageDays}d old · ${c.conditionLabel} ${c.condition}%`), bar(c.condition), h('div', { class: 'row' }, h('button', { class: 'btn small', id: 'garageUse', onclick: () => this.bring(c) }, c.active ? 'Bring it here' : 'Use this car'), h('span', { class: 'mut' }, 'Prices and values are ESTIMATES.')));
  }
  bind() {
    let drag = null, down = null; const c = this.canvas;
    c.onpointerdown = (e) => { down = { x: e.clientX, y: e.clientY }; drag = { x: e.clientX, y: e.clientY, yaw: this.yaw, pitch: this.pitch }; c.setPointerCapture(e.pointerId); };
    c.onpointermove = (e) => { if (!drag) return; this.yaw = drag.yaw - (e.clientX - drag.x) * 0.006; this.pitch = Math.min(1.2, Math.max(0.35, drag.pitch + (e.clientY - drag.y) * 0.004)); };
    c.onpointerup = (e) => { const tap = down && Math.hypot(e.clientX - down.x, e.clientY - down.y) < 8; drag = null; down = null; if (tap) this.tapCar(e); };
    c.onwheel = (e) => { e.preventDefault(); this.dist = Math.min(36, Math.max(12, this.dist + e.deltaY * 0.01)); };
  }
  tapCar(e) {
    const r = this.canvas.getBoundingClientRect(); const v = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    const rc = new THREE.Raycaster(); rc.setFromCamera(v, this.cam); const hit = rc.intersectObjects(this.slotCars || [], true)[0]; if (!hit) return;
    let o = hit.object; while (o && o.userData?.carId == null) o = o.parent; const car = (this.d?.cars || []).find(x => x.id === o?.userData?.carId); if (car) this.bring(car);
  }
  async bring(c) {
    if (this.bringing) return; this.bringing = true; const g = this.g;
    try {
      if (c.active && g.ctrl?.mode === 'drive') { this.close(); g.ui.toast(`You're already in the ${c.name}.`); return; }
      if (!c.active) { const r = await g.ui.guard(() => post('/api/garage/use', { carId: c.id })); if (!r) return; }
      await g.refreshMe?.();
      if (g.ctrl?.mode === 'drive') { g.ownCar?.dropHere(); g.ctrl.toggleCar(); g.net?.nudge?.(); }
      this.close();
      const here = g.ownCar?.bringHere();
      g.ui.toast(here ? `${c.name} is beside you. Tap it to get in.` : `Your ${c.name} is parked in a lot. Walk to that lot and tap Take my car.`);
    } finally { this.bringing = false; }
  }
  resize() { const w = innerWidth, hh = innerHeight; this.r.setSize(w, hh, false); this.cam.aspect = w / hh; this.cam.updateProjectionMatrix(); this.dist = Math.max(this.dist, w / hh < 0.8 ? 28 : 22); }
  loop() { if (!this.open) return; this.cam.position.set(Math.sin(this.yaw) * Math.cos(this.pitch) * this.dist, Math.sin(this.pitch) * this.dist, Math.cos(this.yaw) * Math.cos(this.pitch) * this.dist); this.cam.lookAt(0, 0.6, 0.2); const tt = (performance.now() - this.t0) / 1000; for (const f of this.anim) f(tt); this.r.render(this.scene, this.cam); this.raf = requestAnimationFrame(() => this.loop()); }
  close() { if (!this.open) return; this.open = false; cancelAnimationFrame(this.raf); removeEventListener('resize', this.onResize); this.r.dispose(); this.el.remove(); }
}
