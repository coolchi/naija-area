// Your own car sits in the world while you walk. Tap it (or the chip) to get in. Tap only works on this car.
import * as THREE from 'three';
import { makePlayerCar } from './entities.js';
import { h } from './api.js';

const NEAR = 4.4;

export class OwnCar {
  constructor(game) {
    this.g = game; this.mesh = null; this.spot = null;
    this.chip = h('div', { id: 'ownCarChip', class: 'pill hidden' }, h('button', { id: 'ownCarBtn', class: 'park-btn', onclick: () => game.enterOwnCar() }, 'Get in'));
    document.body.appendChild(this.chip);
  }
  model() { return this.g.user?.car || null; }
  parkedAway() { return !!this.g.parking?.mine; }
  sync() {
    const car = this.model(); const c = this.g.ctrl;
    const show = !!(car && c && c.mode === 'walk' && !this.parkedAway() && !this.g.interior?.open && !this.g.venue?.open && !this.g.garage?.open);
    if (!show) { if (this.mesh) this.mesh.visible = false; this.chip.classList.add('hidden'); return; }
    if (!this.spot) { const yaw = c.ry || 0; this.spot = { x: c.x + Math.cos(yaw) * 3.4, z: c.z - Math.sin(yaw) * 3.4, ry: yaw }; }
    if (!this.mesh || this.mesh.userData.body !== car.body || this.mesh.userData.color !== car.color) {
      if (this.mesh) this.g.scene.remove(this.mesh);
      this.mesh = makePlayerCar(car.color, car.body || 'hatch');
      this.mesh.userData.own = true; this.mesh.userData.body = car.body; this.mesh.userData.color = car.color;
      this.g.scene.add(this.mesh);
    }
    this.mesh.visible = true; this.mesh.position.set(this.spot.x, 0, this.spot.z); this.mesh.rotation.y = this.spot.ry;
    const near = this.nearEnough() && !this.g.busy && !this.g.commute;
    this.chip.classList.toggle('hidden', !near);
    if (near) { const b = document.getElementById('ownCarBtn'); if (b) b.textContent = `Get in · Enter`; }
  }
  /** leave the car where you stepped out, a step behind you so you are not standing inside it */
  dropHere() {
    const c = this.g.ctrl; const back = 3.2;
    this.spot = { x: c.x - Math.cos(c.ry) * back, z: c.z + Math.sin(c.ry) * back, ry: c.ry };
  }
  /** park the owned car a step in front of the player, close enough to tap */
  bringHere() {
    const c = this.g.ctrl; if (!c) return false;
    const yaw = c.ry || 0; const d = 3.2;
    this.spot = { x: c.x + Math.cos(yaw) * d, z: c.z - Math.sin(yaw) * d, ry: yaw };
    this.sync();
    return this.mesh?.visible === true;
  }
  nearEnough() {
    if (!this.model() || this.parkedAway() || !this.spot) return false;
    return Math.hypot(this.g.ctrl.x - this.spot.x, this.g.ctrl.z - this.spot.z) < NEAR;
  }
  /** solid body while the car is parked on the street, so you walk around it */
  circles() {
    if (!this.mesh?.visible || !this.spot) return [];
    const body = this.mesh.userData.body || 'hatch';
    const size = { hatch: [1.95, 0.98], sedan: [2.3, 0.98], suv: [2.35, 1.02], gwagon: [2.3, 1.12], cyber: [2.65, 1.2] };
    const [halfL, halfW] = size[body] || size.hatch;
    const yaw = this.spot.ry || 0, fx = Math.cos(yaw), fz = -Math.sin(yaw);
    const out = [];
    for (const t of [-0.62, 0, 0.62]) out.push({ x: this.spot.x + fx * halfL * t, z: this.spot.z + fz * halfL * t, r: halfW });
    return out;
  }
}
