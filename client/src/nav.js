// Navigation: plans a route to a place or a tapped spot, shows it in the 3D scene (purple ribbon on the street) and on the map, and can drive the avatar or car along it
// (autopilot) or only guide ("Drive myself"). Client-side movement only: the server still sees ordinary positions at ordinary speeds; fares, travel quotes and the ledger are not touched.
import * as THREE from 'three';
import { buildGrid, findRoute, Auto, etaSeconds, etaLabel, remaining, NAV } from './route.js';
import { h, $ } from './api.js';

export class Nav {
  constructor(game) { this.g = game; this.grid = null; this.active = null; this.cache = new Map(); this.t = 0;
    this.mat = new THREE.MeshBasicMaterial({ color: 0xb44cff, transparent: true, opacity: 0.85, depthWrite: false, side: THREE.DoubleSide }); this.mesh = null;
    this.chip = h('div', { id: 'navChip', class: 'pill hidden' }, h('span', { id: 'navText' }), h('button', { id: 'navStop', class: 'nav-stop', onclick: () => this.cancel('stopped') }, '✋ Stop'));
    document.body.appendChild(this.chip); game.ctrl.onAuto = (why) => this.onAuto(why); }
  ensureGrid() { return this.grid || (this.grid = buildGrid(this.g.city, this.g.world.colliders)); }
  /** both estimates for a destination (cached by rounded position; null route means "no way through") */
  estimate(dest) {
    const c = this.g.ctrl; const key = `${Math.round(c.x / 4)},${Math.round(c.z / 4)}>${Math.round(dest.x)},${Math.round(dest.z)}`; if (this.cache.has(key)) return this.cache.get(key); const G = this.ensureGrid(); const out = {};
    for (const m of ['walk', 'drive']) { const r = findRoute(G, [c.x, c.z], [dest.x, dest.z], m); out[m] = r ? { length: r.length, sec: etaSeconds(r.length, m), label: etaLabel(etaSeconds(r.length, m)) } : null; }
    if (this.cache.size > 40) this.cache.clear(); this.cache.set(key, out); return out;
  }
  /** begin navigation. opts.mode 'walk' | 'drive' (default: what the player is doing now); opts.auto false = guidance only */
  start(dest, opts = {}) {
    const g = this.g, c = g.ctrl; if (g.busy || c.frozen) return null; const mode = opts.mode || c.mode; const auto = opts.auto !== false;
    const route = findRoute(this.ensureGrid(), [c.x, c.z], [dest.x, dest.z], mode); if (!route) { g.ui.toast('No way through to there from here. Try the travel options instead.'); return null; }
    this.cancel('replaced', true); if (c.mode !== mode) { c.toggleCar(); g.net.nudge?.(); }
    this.active = { dest, mode, auto, pts: route.pts, length: route.length, i: 1, started: performance.now() };
    if (auto) c.auto = new Auto(route.pts, mode); g.setWaypoint(dest.x, dest.z, dest.name); this.draw(route.pts); this.chip.classList.remove('hidden'); this.t = 0; this.tick(0); g.ui.sfx?.('ok'); return this.active;
  }
  cancel(why = 'stopped', silent = false) { const a = this.active; this.g.ctrl.auto = null; if (this.mesh) { this.g.scene.remove(this.mesh); this.mesh.geometry.dispose(); this.mesh = null; } this.active = null; this.chip.classList.add('hidden');
    if (a && !silent) { if (why !== 'arrived') { this.g.waypoint = null; this.g.dest.visible = false; } if (why === 'stopped') this.g.ui.toast('Navigation stopped. You have the controls.'); else if (why === 'manual') this.g.ui.toast('You took over. Navigation stopped.'); else if (why === 'stuck') this.g.ui.toast('Something is in the way. You have the controls; the route is still shown.'); } }
  onAuto(why) { if (!this.active) return; if (why === 'manual') this.cancel('manual'); }
  /** flat ribbon along the route, just above the road */
  draw(pts) {
    const pos = [], idx = []; const w = 0.7; let n = 0; for (let i = 0; i < pts.length; i++) { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)]; let dx = b[0] - a[0], dz = b[1] - a[1]; const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l; pos.push(pts[i][0] - dz * w, 0.45, pts[i][1] + dx * w, pts[i][0] + dz * w, 0.45, pts[i][1] - dx * w); if (i) { const k = (i - 1) * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); } n++; }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); this.mesh = new THREE.Mesh(geo, this.mat); this.mesh.renderOrder = 5; this.mesh.frustumCulled = false; this.g.scene.add(this.mesh); void n;
  }
  /** per frame */
  tick(dt) {
    const a = this.active; if (!a) return; if (this.g.busy) { this.cancel('busy', true); return; } const c = this.g.ctrl; this.t += dt;
    // progress along the route (guidance mode has no autopilot index, so follow the nearest upcoming point)
    const au = c.auto; if (au) a.i = au.i; else while (a.i < a.pts.length - 1 && Math.hypot(a.pts[a.i][0] - c.x, a.pts[a.i][1] - c.z) < 7) a.i++;
    const rem = remaining(a.pts, a.i, c.x, c.z); const end = a.pts[a.pts.length - 1]; const dEnd = Math.hypot(end[0] - c.x, end[1] - c.z);
    if ((au && au.done) || dEnd < (a.mode === 'drive' ? NAV.arriveDrive + 1.5 : NAV.arriveWalk + 1.5) || (au?.stuck && dEnd < NAV.nearEnough)) { this.cancel('arrived', true); this.g.ui.toast(`You have arrived at ${a.dest.name || 'your destination'}.`); this.g.ui.sfx?.('ok'); return; }
    if (au?.stuck) { this.cancel('stuck'); return; }
    if (this.t > 0.4 || dt === 0) { this.t = 0; const sec = etaSeconds(rem, a.mode); $('#navText').textContent = `🧭 ${a.dest.name || 'Destination'} · ${Math.round(rem)} m · ${etaLabel(sec)} ${a.mode === 'drive' ? '🚗' : '🚶'}${a.auto ? ' auto' : ' guide'}`; }
  }
}
