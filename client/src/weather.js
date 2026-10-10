// Weather on the client (Track G item 4): rain streaks around the camera, a greyer sky and nearer fog, lightning in storms, water sheets on flooded streets, and the speed scale for flooded zones.
// The SERVER decides the weather (heartbeat field `wx`, GET /api/weather): this file only draws it. Pure helpers are exported for tests.
import * as THREE from 'three';
import { LOOK, WEATHER_VIEW, fogDistances, lightScale } from './weather-config.js';
export { LOOK };

export const STATE_NAMES = ['clear', 'cloudy', 'rain', 'storm'];
/** player point inside any flooded zone? -> flood level (0 when dry) */
export function floodLevelAt(zones, x, z) { for (const q of zones || []) if (x >= q.x1 && x <= q.x2 && z >= q.z1 && z <= q.z2) return q.level || 1; return 0; }
export const approach = (v, t, rate, dt) => v + (t - v) * Math.min(1, rate * dt);

export class Weather {
  constructor(scene, world, drops = 700) {
    this.scene = scene; this.world = world; this.state = 'clear'; this.flood = 0; this.k = { rain: 0, grey: 0, fog: 1, dim: 1 }; this.zones = []; this.active = new Set(); this.sheets = new Map(); this.flash = 0; this.speedByLevel = null; this.t = 0;
    const g = new THREE.BufferGeometry(); this.N = drops; this.pos = new Float32Array(drops * 6); this.seed = new Float32Array(drops * 3); for (let i = 0; i < drops; i++) { this.seed[i * 3] = Math.random() * 60 - 30; this.seed[i * 3 + 1] = Math.random() * 28; this.seed[i * 3 + 2] = Math.random() * 60 - 30; }
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3)); this.rain = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0xbcd4ee, transparent: true, opacity: WEATHER_VIEW.rainOpacity, fog: false })); this.rain.frustumCulled = false; this.rain.visible = false; scene.add(this.rain);
    this.water = new THREE.MeshLambertMaterial({ color: 0x3f6f8f, transparent: true, opacity: 0.55, depthWrite: false }); this.lights = [];
  }
  /** from GET /api/weather: zone rectangles and the speed scale per level */
  setZones(zones, speedByLevel) { this.zones = zones || []; this.speedByLevel = speedByLevel || null; for (const m of this.sheets.values()) this.scene.remove(m); this.sheets.clear(); this.refreshSheets(); }
  /** from the heartbeat field wx = { s: stateIndex, f: floodLevel, z: [flooded zone ids] } */
  apply(wx) { if (!wx) return; this.state = STATE_NAMES[wx.s] || 'clear'; this.flood = wx.f || 0; this.active = new Set(wx.z || []); for (const q of this.zones) q.level = this.active.has(q.id) ? this.flood : 0; this.refreshSheets(); }
  refreshSheets() {
    for (const q of this.zones) { const on = this.active.has(q.id) && this.flood > 0; let m = this.sheets.get(q.id);
      if (on && !m) { m = new THREE.Mesh(new THREE.PlaneGeometry(q.x2 - q.x1, q.z2 - q.z1), this.water); m.rotation.x = -Math.PI / 2; m.position.set((q.x1 + q.x2) / 2, 0.07, (q.z1 + q.z2) / 2); m.renderOrder = 3; this.scene.add(m); this.sheets.set(q.id, m); }
      if (m) { m.visible = on; m.position.y = 0.06 + 0.04 * this.flood; } }
  }
  /** called right after world.setTime (which resets sky, fog and light colours each heartbeat): remember the day/night base, then apply the weather on top */
  afterTime() {
    const sc = this.scene; if (sc.fog && !this.fog0) this.fog0 = { near: sc.fog.near, far: sc.fog.far }; // the day's own fog distances, read ONCE (setTime resets only the colour, so re-reading each heartbeat compounds the rain fog)
    this.base = { bg: sc.background?.clone?.() || null, fog: sc.fog ? sc.fog.color.clone() : null, near: this.fog0?.near, far: this.fog0?.far };
    if (!this.lights.length) sc.traverse(o => { if (o.isDirectionalLight || o.isHemisphereLight) this.lights.push(o); }); this.baseI = this.lights.map(l => l.intensity); this.paint();
  }
  paint() {
    const sc = this.scene, k = this.k; if (!this.base) return; const grey = new THREE.Color(0x7d8794).multiplyScalar(0.55 + 0.45 * (1 - this.world.night)); // greyer at night too
    if (this.base.bg && sc.background?.copy) sc.background.copy(this.base.bg).lerp(grey, k.grey); if (this.base.fog) { sc.fog.color.copy(this.base.fog).lerp(grey, k.grey); const fd = fogDistances(this.base.near, this.base.far, k.fog); sc.fog.near = fd.near; sc.fog.far = fd.far; }
    this.lights.forEach((l, i) => { l.intensity = this.baseI[i] * lightScale(k.dim, this.flash); });
  }
  /** the speed scale at a point ({walk, drive}, 1 when dry) */
  speedAt(x, z) { const lvl = floodLevelAt(this.zones, x, z); return lvl && this.speedByLevel ? this.speedByLevel[lvl] : { walk: 1, drive: 1 }; }
  update(dt, cam) {
    this.t += dt; const L = LOOK[this.state] || LOOK.clear; for (const key of ['rain', 'grey', 'fog', 'dim']) this.k[key] = approach(this.k[key], L[key], 0.6, dt);
    if (this.state === 'storm' && this.flash <= 0.01 && Math.random() < dt * 0.12) this.flash = 1; this.flash = Math.max(0, this.flash - dt * 4); this.paint();
    const r = this.k.rain; this.rain.visible = r > 0.02; if (!this.rain.visible) return; const n = Math.floor(this.N * Math.min(1, r)); this.rain.geometry.setDrawRange(0, n * 2);
    const p = this.pos, s = this.seed, fall = 24 + 10 * r, len = 0.5 + 0.5 * r; const cx = cam.position.x, cy = Math.max(0, cam.position.y - 12), cz = cam.position.z;
    for (let i = 0; i < n; i++) { const y = ((s[i * 3 + 1] - this.t * fall) % 28 + 28) % 28; const x = cx + s[i * 3], z = cz + s[i * 3 + 2], yy = cy + y; p[i * 6] = x; p[i * 6 + 1] = yy; p[i * 6 + 2] = z; p[i * 6 + 3] = x + 0.05; p[i * 6 + 4] = yy - len; p[i * 6 + 5] = z; }
    this.rain.geometry.attributes.position.needsUpdate = true;
  }
}
