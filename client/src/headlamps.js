// Car headlamps at night. Pure helpers (tested) plus a small instanced renderer: every ambient vehicle gets two glowing lamps and a soft light beam on the road (one instanced mesh each,
// no real lights), the player's own car also gets one real spot light so the road ahead is brighter. Brightness follows the same "lamps on" level as the street lights.
// Some vehicles have a dead headlamp (Lagos flavour). All numbers are placeholders (ESTIMATE).
import * as THREE from 'three';

export const HEAD = { brokenShare: 1 / 12, beamLen: { car: 13, danfo: 15, keke: 8, okada: 7 }, beamW: { car: 5.2, danfo: 6, keke: 3.2, okada: 2.4 }, front: { car: 2.15, danfo: 2.7, keke: 1.4, okada: 0.95 }, half: { car: 0.7, danfo: 0.85, keke: 0, okada: 0 }, spotIntensity: 2.2, spotDistance: 46 };
const hash = (n) => { let x = Math.imul(n ^ 0x7f4a7c15, 0x85ebca6b); x ^= x >>> 13; x = Math.imul(x, 0xc2b2ae35); x ^= x >>> 16; return (x >>> 0) / 4294967296; };
/** 0 = both lamps work, -1 = left lamp dead, 1 = right lamp dead (only two-lamp vehicles; keke and okada have one lamp and are never "broken") */
export const brokenSide = (i, type) => { if ((HEAD.half[type] || 0) === 0) return 0; const r = hash(i * 131 + 7); return r < HEAD.brokenShare ? (r < HEAD.brokenShare / 2 ? -1 : 1) : 0; };
/** brightness of the two lamps [left, right] at a given lamps-on level (0..1); one-lamp vehicles use the left value only */
export const lampBrightness = (level, broken) => [broken === -1 ? 0 : level, broken === 1 ? 0 : level];
/** strength of the beam on the road: weaker with a dead lamp */
export const beamStrength = (level, broken) => level * (broken ? 0.62 : 1);

const beamTexture = () => { const c = document.createElement('canvas'); c.width = 128; c.height = 64; const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 128, 0); gr.addColorStop(0, 'rgba(255,238,190,.85)'); gr.addColorStop(0.45, 'rgba(255,226,160,.35)'); gr.addColorStop(1, 'rgba(255,220,150,0)'); g.fillStyle = gr; g.beginPath(); g.moveTo(0, 26); g.lineTo(128, 0); g.lineTo(128, 64); g.lineTo(0, 38); g.closePath(); g.fill(); return new THREE.CanvasTexture(c); };
const glowTexture = () => { const c = document.createElement('canvas'); c.width = c.height = 32; const g = c.getContext('2d'); const gr = g.createRadialGradient(16, 16, 0, 16, 16, 16); gr.addColorStop(0, 'rgba(255,250,225,1)'); gr.addColorStop(0.4, 'rgba(255,236,170,.6)'); gr.addColorStop(1, 'rgba(255,220,140,0)'); g.fillStyle = gr; g.fillRect(0, 0, 32, 32); return new THREE.CanvasTexture(c); };
const add = (map) => new THREE.MeshBasicMaterial({ map, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });

export class Headlamps {
  constructor(scene, n) {
    this.n = n; this.beams = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2).translate(0.5, 0, 0), add(beamTexture()), n); this.glows = new THREE.InstancedMesh(new THREE.PlaneGeometry(1.1, 1.1).rotateY(Math.PI / 2), add(glowTexture()), n * 2);
    for (const m of [this.beams, this.glows]) { m.frustumCulled = false; m.renderOrder = 3; m.visible = false; scene.add(m); } this.m = new THREE.Matrix4(); this.q = new THREE.Quaternion(); this.v = new THREE.Vector3(); this.s = new THREE.Vector3(); this.c = new THREE.Color(); this.up = new THREE.Vector3(0, 1, 0);
  }
  /** cars: [{ g, type }]; level: 0..1 lamps-on level (0 in daylight: hidden, no cost) */
  update(cars, level) {
    const on = level > 0.02; this.beams.visible = this.glows.visible = on; if (!on) return;
    cars.forEach((car, i) => { if (car.idle) { this.m.makeScale(0.0001, 0.0001, 0.0001); this.beams.setMatrixAt(i, this.m); this.glows.setMatrixAt(i * 2, this.m); this.glows.setMatrixAt(i * 2 + 1, this.m); return; } const t = car.type || 'car'; const yaw = car.g.rotation.y, px = car.g.position.x, pz = car.g.position.z, cx = Math.cos(yaw), sz = -Math.sin(yaw); const br = brokenSide(i, t); this.q.setFromAxisAngle(this.up, yaw);
      const L = HEAD.beamLen[t], W = HEAD.beamW[t], F = HEAD.front[t], H = HEAD.half[t]; this.v.set(px + cx * (F - 0.2), 0.15, pz + sz * (F - 0.2)); this.s.set(L, 1, W); this.m.compose(this.v, this.q, this.s); this.beams.setMatrixAt(i, this.m); const bs = beamStrength(level, br); this.beams.setColorAt(i, this.c.setScalar(bs));
      const lb = lampBrightness(level, br); for (let k = 0; k < 2; k++) { const side = k === 0 ? -1 : 1; const off = H * side; const real = H > 0 || k === 0; this.v.set(px + cx * F - sz * off * 1, 0.72, pz + sz * F + cx * off); this.s.set(real ? 1 : 0.0001, real ? 1 : 0.0001, real ? 1 : 0.0001); this.m.compose(this.v, this.q, this.s); this.glows.setMatrixAt(i * 2 + k, this.m); this.glows.setColorAt(i * 2 + k, this.c.setScalar(real ? lb[k] : 0)); } });
    this.beams.instanceMatrix.needsUpdate = this.glows.instanceMatrix.needsUpdate = true; if (this.beams.instanceColor) this.beams.instanceColor.needsUpdate = true; if (this.glows.instanceColor) this.glows.instanceColor.needsUpdate = true;
  }
}
/** the player's own car: two glows, a beam on the road and one real spot light (kept in the scene at zero intensity by day so shaders never recompile) */
const LAMP_AT = { hatch: { f: 2.05, y: 0.72, half: 0.7 }, sedan: { f: 2.2, y: 0.68, half: 0.72 }, suv: { f: 2.25, y: 0.88, half: 0.8 }, gwagon: { f: 2.32, y: 0.98, half: 0.74 }, cyber: { f: 2.62, y: 1.2, half: 0.72 } };
export function addPlayerHeadlamps(carGroup, kind = 'hatch') {
  const L = LAMP_AT[kind] || LAMP_AT.hatch;
  const parts = { beam: new THREE.Mesh(new THREE.PlaneGeometry(HEAD.beamLen.car * 1.25, HEAD.beamW.car * 1.2).rotateX(-Math.PI / 2).translate(HEAD.beamLen.car * 0.625, 0, 0), add(beamTexture())), glows: [] };
  parts.beam.position.set(L.f - 0.2, 0.15, 0); parts.beam.renderOrder = 3; parts.beam.frustumCulled = false; carGroup.add(parts.beam);
  if (kind !== 'cyber') for (const s of [-1, 1]) { const m = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1).rotateY(Math.PI / 2), add(glowTexture())); m.position.set(L.f, L.y, s * L.half); m.renderOrder = 3; carGroup.add(m); parts.glows.push(m); }
  const spot = new THREE.SpotLight(0xfff0cf, 0, HEAD.spotDistance, 0.55, 0.65, 1.2); spot.position.set(L.f, L.y + 0.35, 0); spot.target.position.set(L.f + 14, 0, 0); carGroup.add(spot, spot.target); parts.spot = spot; carGroup.userData.head = parts; return parts;
}
export function setPlayerHeadlamps(carGroup, level, driving) {
  const p = carGroup.userData.head; if (!p) return; const on = level > 0.02 && driving; p.beam.visible = on; for (const g of p.glows) g.visible = on; p.beam.material.opacity = level; for (const g of p.glows) g.material.opacity = level; p.spot.intensity = on ? HEAD.spotIntensity * level : 0;
}
