import { PHYS } from './physics-config.js';
import { smoothAngle } from './kinematics.js';
// Airport on the client: the airfield and a parked plane, the "Departures" chip near the terminal, the departure board, your ticket countdown,
// and the flight scene (the plane taxis, takes off and circles while a chase camera follows). The server decides everything that matters (ticket, departure, landing).
import * as THREE from 'three';
import { h, $, get, post } from './api.js';
import { makePlane, makeAirfield } from './plane.js';
import { planFlight, flightPose, chaseCam } from './flightpath.js';

const mmss = (ms) => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
export class AirportClient {
  constructor(game) {
    this.g = game; this.ap = game.city.airport || null; this.ticket = null; this.t = 0; this.flying = false; this.busy = false; if (!this.ap) return;
    this.plan = planFlight(this.ap, [0, -60]); this.field = makeAirfield(this.ap); game.scene.add(this.field);
    this.parked = makePlane(); this.parked.position.set(this.ap.apron.x, 0, this.ap.apron.z); this.parked.rotation.y = -this.plan.taxiHeading; game.scene.add(this.parked);
    this.plane = makePlane(); this.plane.visible = false; game.scene.add(this.plane);
    this.chip = h('div', { id: 'airChip', class: 'pill hidden' }, h('button', { id: 'airBtn', class: 'park-btn', onclick: () => this.openBoard() }, ''));
    this.banner = h('div', { id: 'airBanner', class: 'pill hidden' }); document.body.append(this.chip, this.banner);
  }
  setTicket(t) { if (!this.ap) return; this.ticket = t; if (t?.state === 'flying' && !this.flying) this.startFlight(t); if (!t && this.flying) this.endFlight(); }
  near() { const c = this.g.ctrl, d = this.ap.door; return Math.hypot(c.x - d.x, c.z - d.z) <= 70; }
  async openBoard() {
    const g = this.g; let v; try { v = await get('/api/flights'); } catch (e) { g.ui.error(e); return; }
    const body = [];
    if (v.ticket) body.push(h('div', { class: 'card' }, h('b', {}, `🎫 ${v.ticket.toName}`), h('div', {}, `Leaves in ${mmss(v.ticket.departsAt - g.serverNow())}. Stay at the terminal.`), h('button', { class: 'btn ghost', id: 'airCancel', onclick: async () => { try { const r = await post('/api/flights/cancel', {}); g.ui.toast(r.text); this.ticket = null; g.net.nudge?.(); g.update(await get('/api/me').then(x => x.user)); g.ui.closeSheet(); } catch (e) { g.ui.error(e); } } }, 'Cancel ticket (most of the fare back)')));
    else if (!v.destinations.length) body.push(h('p', { class: 'mut' }, 'No other city is open yet. More destinations are coming.'));
    for (const d of v.destinations) if (!v.ticket) body.push(h('div', { class: 'card air-dest', 'data-city': d.id }, h('b', {}, `${d.name}${d.state ? ' · ' + d.state : ''}`), h('div', { class: 'mut' }, `₦${d.fare.toLocaleString('en-NG')} (ESTIMATE) · flight about ${Math.round(d.flightMs / 1000)} s`),
      h('div', { class: 'row' }, d.slots.map((s, i) => h('button', { class: 'btn', 'data-slot': i, onclick: () => this.buy(d.id, s) }, `Leaves in ${mmss(s - g.serverNow())}`)))));
    body.push(h('p', { class: 'mut' }, 'Be at the terminal when the plane leaves, or you miss it (no refund). Fares and times are placeholders.'));
    g.ui.openSheet(`✈ ${v.airport.name}`, body);
  }
  async buy(to, departAt) {
    if (this.busy) return; this.busy = true; const g = this.g;
    try { const r = await post('/api/flights/buy', { to, departAt, pos: g.pos(), idem: Math.random().toString(36).slice(2) }); g.ui.toast(r.text); this.ticket = r.flight.ticket; g.ui.closeSheet(); g.update(await get('/api/me').then(x => x.user)); }
    catch (e) { g.ui.error(e); } finally { this.busy = false; }
  }
  startFlight(t) {
    const g = this.g; this.flying = true; this.flight = t; g.nav?.cancel('flight', true); g.ui.closeSheet?.(); g.busy = true; g.ctrl.frozen = true; g.ctrl.avatar.visible = false; this.parked.visible = false; this.plane.visible = true; this.banner.classList.remove('hidden'); this.chip.classList.add('hidden'); g.ui.sfx('horn');
    this.cam = null; this.nudged = false;
  }
  endFlight() { const g = this.g; this.flying = false; this.plane.visible = false; this.parked.visible = true; g.busy = false; g.ctrl.frozen = false; g.ctrl.avatar.visible = true; this.banner.classList.add('hidden'); }
  /** per frame while flying: move the plane and put the camera behind it */
  step(now, dt) {
    const g = this.g, f = this.flight, tSec = (g.serverNow() - f.departsAt) / 1000; const p = flightPose(this.plan, tSec);
    this.plane.position.set(p.x, p.y, p.z);
    // what you SEE is a smoothed version of the pose (no snapping at phase changes) plus a faint shiver in cruise; the path itself (flightPose) is untouched
    const A = PHYS.plane, att = this.att || (this.att = { roll: p.roll, pitch: p.pitch, yaw: p.yaw }); const tb = p.phase === 'cruise' ? A.turbulence : 0; const tn = now / 1000;
    att.roll = smoothAngle(att.roll, p.roll + tb * Math.sin(tn * 1.7), A.attitudeRate, dt); att.pitch = smoothAngle(att.pitch, p.pitch + tb * Math.sin(tn * 1.1 + 1), A.attitudeRate, dt); att.yaw = smoothAngle(att.yaw, p.yaw, A.attitudeRate, dt); this.plane.rotation.set(att.roll, att.yaw, att.pitch, 'YZX');
    const c = chaseCam(p, 34, 10, 14); if (!this.cam) { this.cam = new THREE.Vector3(...c.pos); this.look = new THREE.Vector3(...c.look); } const k = Math.min(1, dt * 3.2); this.cam.lerp(new THREE.Vector3(...c.pos), k); this.look.lerp(new THREE.Vector3(...c.look), k * 1.4);
    g.camera.position.copy(this.cam); g.camera.lookAt(this.look); g.camera.updateMatrixWorld();
    const left = f.arriveAt - g.serverNow(); this.banner.textContent = left > 0 ? `✈ Flying to ${f.toName} · ${mmss(left)}` : `✈ Landing in ${f.toName}…`; if (left <= 300 && !this.nudged) { this.nudged = true; setTimeout(() => g.net.nudge?.(), 600); }
  }
  tick(dt) {
    if (!this.ap || this.flying) return; const g = this.g; this.t += dt; if (this.t < 400) return; this.t = 0; const tk = this.ticket;
    let label = null; if (tk && tk.state === 'ticketed') label = `🎫 ${tk.toName} · leaves in ${mmss(tk.departsAt - g.serverNow())}`; else if (!tk && this.near()) label = '✈ Departures';
    if (g.commute || g.busy || g.interior?.open || g.venue?.open || g.garage?.open || g.ui.sheetOpen) label = null; this.chip.classList.toggle('hidden', !label); if (label) $('#airBtn').textContent = label;
    if (this.parked) { const d = Math.hypot(g.ctrl.x - this.ap.apron.x, g.ctrl.z - this.ap.apron.z); this.parked.visible = d < 520 && !(tk && tk.state === 'flying'); this.field.visible = d < 520; }
  }
}
