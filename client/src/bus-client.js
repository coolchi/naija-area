// Bus stops on the client: shelters and name signs drawn from the city JSON, NPC passengers who wait and board danfos that stop, and the player's own "wait for a danfo" flow.
// The vehicle logic is in busstops.js (pure) and Traffic (entities.js); the server only sets the wait and checks you are at the stop (server/core/bus.js). The fare is the normal travel fare.
import * as THREE from 'three';
import { Builder } from '../sample/builder.js';
import { Crowd } from './people.js';
import { h, $, post } from './api.js';
import { STOP_CFG } from './busstops.js';

const vcMat = new THREE.MeshLambertMaterial({ vertexColors: true });
const signTex = (name) => { const c = document.createElement('canvas'); c.width = 256; c.height = 96; const g = c.getContext('2d'); g.fillStyle = '#ffc20e'; g.fillRect(0, 0, 256, 96); g.fillStyle = '#1b1b1b'; g.fillRect(0, 0, 256, 8); g.font = '900 30px system-ui,sans-serif'; g.textAlign = 'center'; g.fillText('🚌 BUS STOP', 128, 44); g.font = '700 16px system-ui,sans-serif'; g.fillText(name.replace(/ bus stop.*/i, '').slice(0, 28), 128, 76); const t = new THREE.CanvasTexture(c); t.anisotropy = 4; return t; };

export class BusStops {
  constructor(game) {
    this.g = game; const city = game.city; this.stops = city.busStops || []; this.root = new THREE.Group(); this.state = 'idle'; this.t = 0; this.call = null; this.busy = false;
    const b = new Builder(41, 0.01);
    for (const s of this.stops) { const o = { ry: s.ry, noAO: true, jit: 0 }; const R = (lx, lz) => [s.x + Math.cos(s.ry) * lx + Math.sin(s.ry) * lz, s.z - Math.sin(s.ry) * lx + Math.cos(s.ry) * lz]; // local x along the road, z to the kerb side
      b.box(5, 0.08, 2.4, s.x, 0.18, s.z, 0xa8a291, o); const [bx, bz] = R(0, 0.85); b.box(2.4, 0.12, 1.6, ...[bx, 0, bz].map((v, i) => i === 1 ? 2.35 : v), 0x2e6f95, o); // roof
      for (const lx of [-1.1, 1.1]) { const [px, pz] = R(lx, 0.85); b.box(0.1, 2.3, 0.1, px, 0.2, pz, 0x555a60, o); }
      const [kx, kz] = R(0, 1.55); b.box(2.2, 1.5, 0.06, kx, 0.9, kz, 0x9ec7da, { ...o, a: 0.5 }); const [qx, qz] = R(0, 0.95); b.box(2, 0.1, 0.5, qx, 0.62, qz, 0xb9792e, o); b.box(1.9, 0.08, 0.1, qx, 0.45, qz, 0x6b4a2a, o); // bench
      const [sx, sz] = R(-2.1, 0.2); b.box(0.12, 3.1, 0.12, sx, 0.2, sz, 0x333333, o); }
    this.root.add(new THREE.Mesh(b.build(), vcMat));
    for (const s of this.stops) { const m = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.64), new THREE.MeshBasicMaterial({ map: signTex(s.name), side: THREE.DoubleSide })); const lx = -2.1, lz = 0.2; m.position.set(s.x + Math.cos(s.ry) * lx + Math.sin(s.ry) * lz, 3.0, s.z - Math.sin(s.ry) * lx + Math.cos(s.ry) * lz); m.rotation.y = s.ry + Math.PI / 2; this.root.add(m); }
    game.scene.add(this.root);
    // NPC passengers waiting at each stop (two each); one walks to a danfo that stops, boards, and a new one turns up later
    this.crowd = new Crowd(game.scene, Math.max(1, this.stops.length * 2), 11); this.pax = []; this.stops.forEach((s, k) => { for (let j = 0; j < 2; j++) this.pax.push({ stop: s, i: k * 2 + j, ax: Math.cos(s.ry) * (-0.6 + j * 1.3) + Math.sin(s.ry) * 0.9, az: -Math.sin(s.ry) * (-0.6 + j * 1.3) + Math.cos(s.ry) * 0.9, state: 'wait', t: 0, ph: j * 2.1 + k }); });
    this.chip = h('div', { id: 'busChip', class: 'pill hidden' }, h('button', { id: 'busBtn', class: 'park-btn', onclick: () => this.act() }, ''), h('button', { id: 'busCancel', class: 'park-btn dim', onclick: () => this.cancel(true) }, '✕'));
    document.body.appendChild(this.chip); this.cur = null; this.m4 = null;
  }
  nearest(x, z) { let best = null, bd = Infinity; for (const s of this.stops) { const d = Math.hypot(s.x - x, s.z - z); if (d < bd) { bd = d; best = s; } } return best ? { stop: best, d: bd } : null; }
  /** passengers: board a stopped danfo, wait, come back */
  updatePax(dt, now) {
    const T = this.g.traffic; const dwelling = T.cars.filter(c => !c.idle && c.dwell);
    for (const p of this.pax) { const s = p.stop; const bx = s.x + p.ax, bz = s.z + p.az; let x = bx, z = bz, yaw = s.ry + Math.PI / 2, ph = now * 0.0006 + p.ph, sc = 1;
      if (p.state === 'wait') { const car = dwelling.find(c => Math.hypot(c.g.position.x - s.x, c.g.position.z - s.z) < 9); if (car && (p.i % 2 === 0 || car.type === 'danfo')) { p.state = 'board'; p.t = 0; p.car = car; } }
      else if (p.state === 'board') { p.t += dt; const c = p.car; const k = Math.min(1, p.t / 1.8); const cx = c.g.position.x, cz = c.g.position.z; x = bx + (cx - bx) * k; z = bz + (cz - bz) * k; yaw = Math.atan2(-(cz - bz), cx - bx); ph = now * 0.012; if (k >= 1) { p.state = 'gone'; p.t = 0; } }
      else if (p.state === 'gone') { p.t += dt; sc = 0.0001; if (p.t > 22) { p.state = 'wait'; } }
      this.crowd.pose(p.i, x, 0.2, z, yaw, ph, sc, p.state === 'wait'); }
    this.crowd.commit();
  }
  /** called every frame (dt in ms) */
  tick(dt, now) {
    const g = this.g; if (!g.playing) return; this.updatePax(dt / 1000, now); this.t += dt; const T = g.traffic;
    if (this.state === 'waiting' && T.special && T.special.idle && this.call && !this.call.sent && g.serverNow() >= this.call.readyAt - 1000 * (STOP_CFG.pickupLead / 8 + 1)) { this.call.sent = T.dispatch(this.call.stop) || this.call.sent; }
    if (this.t < 150) return; this.t = 0; const c = g.ctrl; const n = this.nearest(c.x, c.z); const near = n && n.d <= STOP_CFG.boardRange && c.mode === 'walk' && !g.commute && !g.busy && !g.interior?.open && !g.venue?.open;
    let label = null;
    if (this.state === 'idle') { if (near && g.user) { label = `🚏 Wait for a danfo · ${n.stop.name.replace(/ bus stop.*/i, '')}`; this.cur = { kind: 'call', stop: n.stop }; } else this.cur = null; }
    else if (this.state === 'waiting') { const left = Math.max(0, Math.ceil((this.call.readyAt - g.serverNow()) / 1000)); if (n && n.stop.id === this.call.stop.id && n.d > STOP_CFG.boardRange + 8) { this.cancel(true, 'You left the bus stop.'); return; }
      if (T.pickupReady() && left <= 1) { this.state = 'arrived'; } else label = left > 0 ? `🚌 Danfo coming · ${left} s` : '🚌 Danfo almost here…'; this.cur = { kind: 'wait' }; }
    if (this.state === 'arrived') { if (!T.pickupReady()) { this.cancel(false); return; } label = '🚌 Board the danfo'; this.cur = { kind: 'board', stop: this.call.stop }; }
    if (this.state === 'riding') { label = '🗺️ Pick where you dey go (map)'; this.cur = { kind: 'map' }; if (g.commute) { this.endRide(); label = null; } else if (performance.now() - this.rideT > 70000) { this.endRide(); g.ui.toast('You came down from the danfo.'); label = null; } }
    this.chip.classList.toggle('hidden', !label); if (label) $('#busBtn').textContent = label; $('#busCancel').style.display = this.state === 'idle' || this.state === 'riding' ? 'none' : '';
  }
  async act() {
    const c = this.cur, g = this.g; if (!c || this.busy) return; this.busy = true;
    try {
      if (c.kind === 'call') { const r = await post('/api/bus/call', { stopId: c.stop.id }); this.call = { stop: c.stop, readyAt: r.readyAt - (g.clockOffset || 0) * 0, sent: false }; this.call.readyAt = g.serverNow() + r.waitMs; this.state = 'waiting'; g.ui.toast(r.text); g.ui.sfx('ok'); }
      else if (c.kind === 'board') { const r = await post('/api/bus/board', { stopId: c.stop.id }); g.ui.toast(r.text); g.ui.sfx('horn'); this.state = 'riding'; this.rideT = performance.now(); g.ctrl.avatar.visible = false; g.ui.openMap?.(); }
      else if (c.kind === 'map') g.ui.openMap?.();
    } catch (e) { g.ui.error(e); this.state = 'idle'; } finally { this.busy = false; }
  }
  cancel(server, msg) { if (this.state === 'riding') return this.endRide(); const g = this.g; g.traffic.cancelPickup(); this.state = 'idle'; this.call = null; this.chip.classList.add('hidden'); if (server) post('/api/bus/cancel', {}).catch(() => {}); if (msg) g.ui.toast(msg); }
  endRide() { const g = this.g; g.traffic.release(); this.state = 'idle'; this.call = null; if (g.ctrl.mode === 'walk') g.ctrl.avatar.visible = true; g.ctrl.applyMode(); this.chip.classList.add('hidden'); }
}
