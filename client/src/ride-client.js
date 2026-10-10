// Oya Ride on the client: asks the server for the ride state, draws the AI driver's car driving to you (route from the same grid pathfinder as navigation, timed to the server's arrival time),
// shows the "Get in" chip, and plays the trip with the normal commute animation, with the driver's car carrying you.
import * as THREE from 'three';
import { Builder } from '../sample/builder.js';
import { carGeo } from '../sample/vehicles.js';
import { findRoute } from './route.js';
import { roadAt } from './roadgeom.js';
import { posAlong, pathLength, driverProgress, startCandidates } from './ride.js';
import { h, $, get, post } from './api.js';

const vcMat = new THREE.MeshLambertMaterial({ vertexColors: true });
function makeHail(colorHex) {
  const g = new THREE.Group(); const m = new THREE.Mesh(carGeo('sedan', colorHex), vcMat); m.position.y = 0.12; g.add(m);
  const b = new Builder(5, 0); b.box(1.1, 0.35, 0.5, 0, 0, 0, 0xffd23f, { noAO: true, jit: 0 }); const sign = new THREE.Mesh(b.build(), new THREE.MeshBasicMaterial({ vertexColors: true })); sign.position.set(-0.1, 2.0, 0); g.add(sign); // roof sign
  return g;
}
export class RideClient {
  constructor(game) { this.g = game; this.ride = null; this.car = null; this.path = null; this.len = 0; this.t = 0; this.busy = false; this.poll = 0;
    this.chip = h('div', { id: 'rideChip', class: 'pill hidden' }, h('button', { id: 'rideBtn', class: 'park-btn', onclick: () => this.act() }, ''), h('button', { id: 'rideCancel', class: 'park-btn dim', onclick: () => this.cancel() }, '✕')); document.body.appendChild(this.chip); }
  async load() { try { const d = await get('/api/ride'); this.set(d.ride); } catch { /* ignore */ } }
  set(r) { const was = this.ride?.id; this.ride = r; if (!r) { this.removeCar(); return; } if (r.id !== was) this.plan(); }
  removeCar() { if (this.car) { this.g.scene.remove(this.car); this.car = null; } this.path = null; }
  /** pick a drivable start point about driverDist m away and route from it to the player's pickup spot */
  plan() {
    const g = this.g, r = this.ride; this.removeCar(); const grid = g.nav.ensureGrid(); const from = [r.from.x, r.from.z]; let route = null;
    for (const c of startCandidates(from[0], from[1], r.driverDist)) { if (!roadAt(g.city, c[0], c[1], 0)) continue; const rt = findRoute(grid, c, from, 'drive'); if (rt && rt.length > r.driverDist * 0.6 && rt.length < r.driverDist * 3) { route = rt; break; } }
    const pts = route ? route.pts.slice() : [[from[0] + r.driverDist * 0.7, from[1] + r.driverDist * 0.7], from]; // fallback: straight in
    // stop a few metres short of the player so the car pulls up beside, not on top
    const total = pathLength(pts); const stopAt = Math.max(1, total - 4.5); this.path = pts; this.len = stopAt; this.car = makeHail(new THREE.Color(r.driver.color).getHex()); g.scene.add(this.car); this.place(0);
  }
  place(d) { const p = posAlong(this.path, d); this.car.position.set(p.x, 0.02, p.z); this.car.rotation.y = p.yaw; }
  async request(placeId) { const r = await post('/api/ride/request', { placeId }); this.set(r.ride); this.g.ui.toast(r.text); return r; }
  async cancel() { if (this.busy) return; this.busy = true; try { const r = await post('/api/ride/cancel', {}); this.g.ui.toast(r.text); this.set(null); } catch (e) { this.g.ui.error(e); } finally { this.busy = false; } }
  async act() {
    const g = this.g, r = this.ride; if (!r || this.busy || r.state !== 'arrived') return; this.busy = true;
    try { const pl = g.city.places.find(p => p.id === r.placeId); const res = await post('/api/ride/start', { pos: g.pos(), idem: Math.random().toString(36).slice(2) }); g.update(res.user); this.riding = this.car; this.car = null; this.ride = null; this.path = null; g.runCommute({ ...res, mode: 'ride' }, pl, { traffic: `${res.service} · ${res.driver.name}, ${res.driver.plate}` }); }
    catch (e) { g.ui.error(e); } finally { this.busy = false; }
  }
  tick(dt) {
    const g = this.g; if (!g.playing) return;
    if (g.commute?.mode === 'ride' && this.riding) { // the driver's car carries the player
      this.riding.position.set(g.ctrl.root.position.x, 0.02, g.ctrl.root.position.z); this.riding.rotation.y = g.ctrl.ry; g.ctrl.avatar.visible = false; return; }
    if (this.riding && !g.commute) { g.scene.remove(this.riding); this.riding = null; this.car = null; g.ctrl.applyMode(); }
    this.t += dt; this.poll += dt; if (this.poll > 20000) { this.poll = 0; this.load(); }
    const r = this.ride; if (r && this.car) { const now = g.serverNow(); const p = driverProgress(now, r.requestedAt, r.arriveAt); this.place(this.len * p); if (now >= r.arriveAt && r.state === 'arriving') { r.state = 'arrived'; g.ui.sfx('horn'); g.ui.toast(`${r.driver.name} don reach! Look for the ${r.driver.car.toLowerCase()}.`); } if (now > r.expiresAt) { this.set(null); } }
    if (this.t < 200) return; this.t = 0; let label = null;
    if (this.ride) { const r2 = this.ride; if (r2.state === 'arriving') label = `🚕 ${r2.driver.name} is coming · ${Math.max(0, Math.ceil((r2.arriveAt - g.serverNow()) / 1000))} s`; else { const near = Math.hypot(g.ctrl.x - r2.from.x, g.ctrl.z - r2.from.z) <= 14; label = near ? `🚕 Get in · ₦${r2.fare.toLocaleString('en-NG')} to ${r2.placeName}` : `🚕 Your driver is waiting at the pickup spot`; } }
    if (g.commute || g.busy) label = null; this.chip.classList.toggle('hidden', !label); if (label) $('#rideBtn').textContent = label; $('#rideBtn').disabled = !!this.ride && this.ride.state !== 'arrived';
  }
}
