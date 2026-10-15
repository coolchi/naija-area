// Local bodyguard companion: HD Body on foot, or Black G-Wagon escort that follows the player.
import * as THREE from 'three';
import { makeAvatar, makePlayerCar, makeNameSprite, poseAvatar } from './entities.js';
import { spinWheels } from '../sample/wheels.js';
import { setPlayerHeadlamps } from './headlamps.js';

const STEP_LEN = 1.9; // match PHYS.walk.stepLen so gait rate matches the player
const angDiff = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

/** Local passenger seat offset inside makePlayerCar (front = +x, lateral = ±z). */
function seatOf(body) {
  if (body === 'cyber') return { x: 0.55, y: 0, z: 0.7, tagY: 2.9 };
  if (body === 'mclaren') return { x: 0.2, y: 0, z: 0.38, tagY: 2.35 };
  if (body === 'gwagon' || body === 'g63') return { x: 0.35, y: 0, z: 0.48, tagY: 2.55 };
  if (body === 'suv') return { x: 0.3, y: 0, z: 0.45, tagY: 2.35 };
  return { x: 0.25, y: 0, z: 0.4, tagY: 2.2 };
}

export class BodyguardClient {
  constructor(game) {
    this.g = game; this.root = null; this.phase = 0; this.tx = 0; this.tz = 0; this.ry = 0;
    this.spd = 0; this.name = ''; this.body = 'hd'; this.boarded = false; this.boardCar = null;
    this.withCar = false; this.carSpec = null; this.carMesh = null; this.avatar = null;
  }
  sync(view) {
    const on = !!(view && view.active && view.guard);
    this.name = on ? view.guard.name : '';
    this.body = view?.guard?.body || view?.body || 'hd';
    const wantCar = !!(view?.guard?.withCar);
    const car = view?.guard?.car || null;
    if (on && !this.root) { this.withCar = wantCar; this.carSpec = car; this.spawn(); }
    else if (on && this.root && wantCar !== this.withCar) {
      // Switch between on-foot HD and Black G-Wagon escort without losing hire.
      this.withCar = wantCar; this.carSpec = car; this.rebuildForm();
    } else if (on && this.root && !wantCar && this.avatar?.userData?.bodyKind !== this.body && this.body === 'hd') {
      this.root.remove(this.avatar); this.avatar = makeAvatar('#273447', 'male', { body: 'hd' }); this.root.add(this.avatar);
      if (this.boarded) this.avatar.visible = false;
      this.retitle();
    }
    if (on) { this.withCar = wantCar; this.carSpec = car; }
    if (!on && this.root) this.clear();
    if (this.root && this.name) this.retitle();
  }
  retitle() {
    if (!this.root) return;
    if (this.tag) { this.root.remove(this.tag); this.tag.material?.map?.dispose?.(); this.tag.material?.dispose?.(); }
    let tall = 2.35;
    if (this.withCar) tall = 2.55;
    else if (this.boarded) tall = seatOf(this.g.ctrl?.rideBody || 'hatch').tagY;
    else if (this.avatar?.userData?.hd) tall = 2.75;
    this.tag = makeNameSprite(`🛡️ ${this.name || 'Bodyguard'}`, '#9ec5ff', { depthTest: false });
    this.tag.position.set(0, tall, 0); this.root.add(this.tag);
  }
  spawn() {
    const g = this.g; if (!g.scene) return;
    this.root = new THREE.Group();
    this.buildForm();
    this.retitle();
    const c = g.ctrl; this.tx = (c?.x || 0) - 2.2; this.tz = (c?.z || 0) - 2.0; this.ry = c?.ry || 0; this.spd = 0; this.phase = 0;
    this.root.position.set(this.tx, 0, this.tz); this.root.rotation.y = this.ry; g.scene.add(this.root);
    this.boarded = false; this.boardCar = null;
    if (!this.withCar && c?.mode === 'drive') this.board();
  }
  buildForm() {
    if (!this.root) return;
    if (this.avatar) { this.root.remove(this.avatar); this.avatar = null; }
    if (this.carMesh) { this.root.remove(this.carMesh); this.carMesh = null; }
    if (this.withCar) {
      const color = this.carSpec?.color || '#0a0a0a';
      const body = this.carSpec?.body || 'gwagon';
      this.carMesh = makePlayerCar(color, body);
      this.root.add(this.carMesh);
    } else {
      this.avatar = makeAvatar('#273447', 'male', { body: this.body === 'hd' ? 'hd' : undefined });
      this.root.add(this.avatar);
    }
  }
  rebuildForm() {
    if (!this.root) return;
    if (this.boarded) this.alight(false);
    this.buildForm(); this.retitle();
    if (!this.withCar && this.g.ctrl?.mode === 'drive') this.board();
  }
  clear() {
    this.alight(false);
    if (!this.root) return; this.g.scene?.remove(this.root); this.tag?.material?.map?.dispose?.(); this.tag?.material?.dispose?.();
    this.root = null; this.avatar = null; this.carMesh = null; this.tag = null; this.spd = 0;
    this.boarded = false; this.boardCar = null; this.withCar = false; this.carSpec = null;
  }
  /** Sit in the player's motor (on-foot hire only). */
  board() {
    if (this.withCar) return;
    const c = this.g.ctrl; const car = c?.carObj; if (!this.root || !car || !c) return;
    if (this.boarded && this.boardCar === car && this.root.parent === car) return;
    if (this.root.parent) this.root.parent.remove(this.root);
    car.add(this.root);
    const s = seatOf(c.rideBody || 'hatch');
    this.root.position.set(s.x, s.y, s.z);
    this.root.rotation.set(0, 0, 0);
    if (this.avatar) this.avatar.visible = false;
    this.spd = 0; this.phase = 0;
    this.boarded = true; this.boardCar = car;
    this.tx = c.x; this.tz = c.z; this.ry = c.ry;
    this.retitle();
  }
  alight(place = true) {
    if (!this.root || !this.boarded) return;
    if (this.root.parent) this.root.parent.remove(this.root);
    this.g.scene?.add(this.root);
    if (this.avatar) this.avatar.visible = true;
    this.boarded = false; this.boardCar = null;
    if (place && this.g.ctrl) {
      const c = this.g.ctrl;
      const ang = c.ry + Math.PI * 0.72;
      this.tx = c.x + Math.cos(ang) * 1.55; this.tz = c.z - Math.sin(ang) * 1.55; this.ry = c.ry;
      this.root.position.set(this.tx, 0, this.tz); this.root.rotation.y = this.ry;
    }
    this.spd = 0; this.retitle();
  }
  update(dt) {
    if (!this.root || !this.g.ctrl) return;
    const c = this.g.ctrl; const dtc = Math.max(1e-4, Math.min(dt || 1 / 60, 0.05));

    if (this.withCar) {
      if (this.boarded) this.alight(false);
      this.updateCarFollow(c, dtc);
      return;
    }

    if (c.mode === 'drive') {
      if (!this.boarded || this.boardCar !== c.carObj || this.root.parent !== c.carObj) this.board();
      this.tx = c.x; this.tz = c.z; this.ry = c.ry; this.spd = 0;
      return;
    }

    if (this.boarded) this.alight(true);

    const ang = c.ry + Math.PI * 0.72; const back = 1.55;
    const wantX = c.x + Math.cos(ang) * back; const wantZ = c.z - Math.sin(ang) * back;
    const dx = wantX - this.tx, dz = wantZ - this.tz; const lag = Math.hypot(dx, dz);

    let move = 0;
    if (lag > 0.03) {
      const maxSpeed = 7.2;
      const catchUp = Math.min(maxSpeed, Math.max(0, (lag - 0.28) * 2.6 + c.groundSpeed?.() * 0.85));
      const step = Math.min(lag, catchUp * dtc);
      this.tx += (dx / lag) * step; this.tz += (dz / lag) * step;
      move = step / dtc;
      const face = Math.atan2(-dz, dx);
      this.ry += angDiff(this.ry, face) * Math.min(1, dtc * 10);
    } else {
      this.ry += angDiff(this.ry, c.ry) * Math.min(1, dtc * 4);
    }

    const targetSpd = move > 0.2 ? move : 0;
    this.spd += (targetSpd - this.spd) * Math.min(1, dtc * 10);
    if (this.spd < 0.18) this.spd = 0;

    this.root.position.set(this.tx, 0, this.tz);
    this.root.rotation.y = this.ry;
    if (this.spd > 0) this.phase += this.spd * dtc / STEP_LEN;
    if (this.avatar) poseAvatar(this.avatar, this.phase, this.spd, dtc);
  }
  /** Black G-Wagon holds formation behind the player (walk or drive). */
  updateCarFollow(c, dtc) {
    const driving = c.mode === 'drive';
    const back = driving ? 10.5 : 7.2;
    const side = driving ? 0.35 : 0.55;
    const ang = c.ry + Math.PI;
    const wantX = c.x + Math.cos(ang) * back + Math.cos(ang + Math.PI / 2) * side;
    const wantZ = c.z - Math.sin(ang) * back - Math.sin(ang + Math.PI / 2) * side;
    const dx = wantX - this.tx, dz = wantZ - this.tz; const lag = Math.hypot(dx, dz);

    let move = 0;
    if (lag > 0.08) {
      const playerSpd = c.groundSpeed?.() || 0;
      const maxSpeed = driving ? 32 : 16;
      const catchUp = Math.min(maxSpeed, Math.max(playerSpd * 1.05, (lag - 1.2) * 2.2 + playerSpd));
      const step = Math.min(lag, Math.max(0.5, catchUp) * dtc);
      this.tx += (dx / lag) * step; this.tz += (dz / lag) * step;
      move = step / dtc;
      const face = Math.atan2(-dz, dx);
      this.ry += angDiff(this.ry, face) * Math.min(1, dtc * 6);
    } else {
      this.ry += angDiff(this.ry, c.ry) * Math.min(1, dtc * 3);
    }

    const targetSpd = move > 0.4 ? move : 0;
    this.spd += (targetSpd - this.spd) * Math.min(1, dtc * 8);
    if (this.spd < 0.35) this.spd = 0;

    this.root.position.set(this.tx, 0, this.tz);
    this.root.rotation.y = this.ry;
    if (this.carMesh && this.spd > 0) spinWheels(this.carMesh, this.spd * dtc);
    if (this.carMesh) setPlayerHeadlamps(this.carMesh, this.g.lightLevel || 0, this.spd > 0.5 || driving);
  }
}
