// Crates, barrels and a ball you can shove around (Track G item 5). CLIENT-LOCAL on purpose: every player sees their own set, nothing is sent to the server, nothing is worth money (see docs/PHYSICS_G.md).
// Maths (contact, friction, walls) is pure in server/core/physx.js; this file only draws and calls it.
import * as THREE from 'three';
import { PHYSX } from '../../server/config/physx.js';
import { newPushable, pushContact, pushStep, pushAgainstBoxes, pushSpots } from '../../server/core/physx.js';
import { carCircles, carVel } from './kinematics.js';
import { PHYS } from './physics-config.js';

const MAT = { crate: 0x9a6b3a, barrel: 0xc23b2e, ball: 0xf2f2ee };
export class Pushables {
  constructor(scene, spawns, boxes, cfg = PHYSX) {
    this.cfg = cfg; this.boxes = boxes || []; this.items = []; this.far = 0; this.scene = scene; this._offs = [];
    const geo = { crate: new THREE.BoxGeometry(1, 0.9, 1), barrel: new THREE.CylinderGeometry(0.4, 0.4, 1.0, 10), ball: new THREE.SphereGeometry(cfg.solids.ball.r, 10, 8) }; const mat = Object.fromEntries(Object.entries(MAT).map(([k, c]) => [k, new THREE.MeshLambertMaterial({ color: c })]));
    if (!cfg.push.enabled) return;
    for (const sp of pushSpots(spawns, cfg.push)) { if (this.blocked(sp)) continue; const o = newPushable(sp.kind, sp.x, sp.z); o.idle = 0; const h = cfg.solids[sp.kind].h; o.mesh = new THREE.Mesh(geo[sp.kind], mat[sp.kind]); o.mesh.position.set(o.x, h / 2, o.z); o.mesh.userData.pushable = sp.kind; scene.add(o.mesh); this.items.push(o); }
  }
  /** a spot inside a building box would trap the object: skip it */
  blocked(sp) { return this.boxes.some(b => sp.x > b.x0 - 0.5 && sp.x < b.x1 + 0.5 && sp.z > b.z0 - 0.5 && sp.z < b.z1 + 0.5); }
  /** `ctrl` is the player Controller: reads position, mode, velocities and jump height */
  update(dt, ctrl) {
    if (!this.items.length) return; const P = this.cfg.push, drive = ctrl.mode === 'drive'; const w = ctrl.walker, c = ctrl.car;
    const v = drive ? carVel(c) : { vx: w.vx, vz: w.vz };
    const pushers = drive ? carCircles(ctrl.x, ctrl.z, ctrl.ry, PHYS.collide.selfOffset, this._offs).map(o => ({ x: ctrl.x + o[0], z: ctrl.z + o[1], r: PHYS.collide.selfR, vx: v.vx, vz: v.vz, mass: 75 * P.carMassFactor * 4 })) : [{ x: ctrl.x, z: ctrl.z, r: this.cfg.walkerRadius, vx: v.vx, vz: v.vz, mass: 75 }];
    const airborne = !drive && ctrl.jump?.y > 0.35; this.far = 0;
    for (const o of this.items) {
      const d = Math.hypot(o.x - ctrl.x, o.z - ctrl.z);
      if (d < 8) { if (!airborne) for (const pu of pushers) pushContact(o, pu, P, this.cfg.solids); }
      if (o.vx || o.vz) { pushStep(o, dt, P); pushAgainstBoxes(o, this.boxes, P, this.cfg.solids); }
      const h = this.cfg.solids[o.kind].h; o.mesh.position.set(o.x, h / 2, o.z); if (o.kind === 'ball' && (o.vx || o.vz)) { o.mesh.rotation.z -= o.vx * dt / this.cfg.solids.ball.r; o.mesh.rotation.x += o.vz * dt / this.cfg.solids.ball.r; }
      // moved away from home and nobody near for a while: put it back
      if ((o.x !== o.home.x || o.z !== o.home.z) && d > 70) { o.idle += dt; if (o.idle > P.resetAfterSec) { o.x = o.home.x; o.z = o.home.z; o.vx = o.vz = 0; o.idle = 0; } } else o.idle = 0;
    }
  }
}
