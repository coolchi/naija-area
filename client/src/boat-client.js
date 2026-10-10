import { PHYS } from './physics-config.js';
import { waveMotion, boatHeadingStep } from './kinematics.js';
// Call a boat, on the client (10 Oct 2026). A chip appears at a jetty; you pick a destination, the boat sails in, you board, and a chase camera follows the crossing.
// The server decides everything that matters (the call, the fare, the arrival). When the destination is in another district the page reloads there, like the road links.
import * as THREE from 'three';
import { h, $, get, post, fmtN } from './api.js';
import { makeBoat } from './boat.js';
import { approachPose, crossPose, boatCam, tripPhase, unit } from './boatpath.js';

const mmss = (ms) => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
export class BoatClient {
  constructor(game) {
    this.g = game; this.stops = game.city.boat?.stops || []; this.trip = null; this.t = 0; this.aboard = false; this.busy = false; if (!this.stops.length) return;
    this.boat = makeBoat(); this.boat.visible = false; game.scene.add(this.boat); this.cam = null;
    this.chip = h('div', { id: 'boatChip', class: 'pill hidden' }, h('button', { id: 'boatBtn', class: 'park-btn', onclick: () => this.onChip() }, ''), h('button', { id: 'boatCancel', class: 'park-btn hidden', onclick: () => this.cancel() }, '✖'));
    this.banner = h('div', { id: 'boatBanner', class: 'pill hidden' }); document.body.append(this.chip, this.banner);
  }
  stopOf(id) { return this.stops.find(s => s.id === id) || null; }
  nearest() { const c = this.g.ctrl; let best = null; for (const s of this.stops) { const d = Math.hypot(c.x - s.x, c.z - s.z); if (d <= (s.r || 14) && (!best || d < best.d)) best = { s, d }; } return best?.s || null; }
  setTrip(t) { if (!this.stops.length) return; const was = this.trip; this.trip = t; if (t?.state === 'crossing' && !this.aboard) this.start(t); if (!t && this.aboard) this.end(); if (was && !t && !this.aboard) this.boat.visible = false; }
  out(stop) { const b = stop.berth || { x: stop.x, z: stop.z + 8 }; return unit(stop.x, stop.z, b.x, b.z); }
  start(t) { const g = this.g; this.aboard = true; g.nav?.cancel('boat', true); g.ui.closeSheet?.(); g.busy = true; g.ctrl.frozen = true; g.ctrl.avatar.visible = false; this.banner.classList.remove('hidden'); this.chip.classList.add('hidden'); this.cam = null; this.nudged = false; g.ui.sfx?.('horn'); }
  end() { const g = this.g; this.aboard = false; this.boat.visible = false; g.busy = false; g.ctrl.frozen = false; g.ctrl.avatar.visible = true; this.banner.classList.add('hidden'); }
  async onChip() {
    const g = this.g; const t = this.trip; if (t?.state === 'called') { const ph = tripPhase(t, g.serverNow()); if (ph.phase === 'waiting') return this.board(); return; }
    let v; try { v = await get('/api/boat'); } catch (e) { g.ui.error(e); return; } if (!v.stop) { g.ui.toast('Walk onto the jetty to call a boat.'); return; }
    const body = v.stop.routes.map(r => h('div', { class: 'card boat-route', 'data-to': r.to }, h('b', {}, r.toName), h('div', { class: 'mut' }, `${r.sameCity ? r.district : `${r.cityName} · ${r.district}`}`), h('div', { class: 'mut' }, `${fmtN(r.fare)} (ESTIMATE) · about ${Math.round(r.crossMs / 1000)} s on the water`), h('button', { class: 'btn', onclick: () => this.call(r.to) }, 'Call a boat')));
    if (!body.length) body.push(h('p', { class: 'mut' }, 'No boat goes from here yet.')); body.push(h('p', { class: 'mut' }, 'The boat arrives in about half a minute and waits a minute. You pay when you board. Fares and times are placeholders.')); g.ui.openSheet(`⛵ ${v.stop.name}`, body);
  }
  async call(to) { if (this.busy) return; this.busy = true; const g = this.g; try { const r = await post('/api/boat/call', { to, pos: g.pos(), idem: Math.random().toString(36).slice(2) }); g.ui.toast(r.text); g.ui.closeSheet(); this.trip = r.trip; g.net.nudge?.(); } catch (e) { g.ui.error(e); } finally { this.busy = false; } }
  async board() { if (this.busy) return; this.busy = true; const g = this.g; try { const r = await post('/api/boat/board', { pos: g.pos(), idem: Math.random().toString(36).slice(2) }); g.ui.toast(r.text, 'money'); this.trip = r.trip; this.setTrip(r.trip); g.update(await get('/api/me').then(x => x.user)); } catch (e) { g.ui.error(e); } finally { this.busy = false; } }
  async cancel() { if (this.busy) return; this.busy = true; try { const r = await post('/api/boat/cancel', {}); this.g.ui.toast(r.text); this.trip = null; this.boat.visible = false; this.g.net.nudge?.(); } catch (e) { this.g.ui.error(e); } finally { this.busy = false; } }
  /** per frame: place the boat (sailing in, waiting, or crossing) and, when aboard, the chase camera */
  step(now, dt) {
    const g = this.g, t = this.trip; if (!t) { this.hs = null; return; } const ph = tripPhase(t, g.serverNow()); const from = this.stopOf(t.from); if (!from) return; const out = this.out(from); const berth = from.berth || { x: from.x + out[0] * 8, z: from.z + out[1] * 8 };
    let p; if (ph.phase === 'arriving') p = approachPose(berth, out, 160, ph.t01); else if (ph.phase === 'waiting') p = approachPose(berth, out, 160, 1); else p = crossPose(berth, t.sameCity ? (t.destBerth || null) : null, out, 320, ph.t01);
    const wv = waveMotion(now / 1000, PHYS.boat); const hs = this.hs || (this.hs = { ry: p.ry, turn: 0, bank: 0 }); boatHeadingStep(hs, p.ry, Math.max(dt, 1e-3), PHYS.boat);
    this.boat.visible = true; this.boat.position.set(p.x, -3.5 + wv.y, p.z); this.boat.rotation.set(hs.bank + wv.roll, hs.ry, wv.pitch + (p.speed ? PHYS.boat.pitchPerSpeed * 8 : 0), 'YZX');
    if (this.aboard) { const c = boatCam(p); if (!this.cam) { this.cam = new THREE.Vector3(...c.pos); this.look = new THREE.Vector3(...c.look); } const k = Math.min(1, dt * 3); this.cam.lerp(new THREE.Vector3(...c.pos), k); this.look.lerp(new THREE.Vector3(...c.look), k * 1.4); g.camera.position.copy(this.cam); g.camera.lookAt(this.look); g.camera.updateMatrixWorld();
      this.banner.textContent = ph.leftMs > 0 ? `⛵ Crossing to ${t.toName} · ${mmss(ph.leftMs)}` : `⛵ Arriving at ${t.toName}…`; if (ph.leftMs <= 300 && !this.nudged) { this.nudged = true; setTimeout(() => g.net.nudge?.(), 600); } }
  }
  tick(dt) {
    if (!this.stops.length || this.aboard) return; const g = this.g; this.t += dt; if (this.t < 350) return; this.t = 0; const t = this.trip; const near = this.nearest(); let label = null; let cancel = false;
    if (t?.state === 'called') { const ph = tripPhase(t, g.serverNow()); label = ph.phase === 'arriving' ? `⛵ Boat arriving · ${mmss(ph.leftMs)}` : `⛵ Board the boat to ${t.toName} · ${fmtN(t.fare)} · waits ${mmss(ph.leftMs)}`; cancel = true; if (ph.phase === 'waiting' && !near) label = null; } else if (near) label = '⛵ Call a boat';
    if (g.commute || g.busy || g.interior?.open || g.venue?.open || g.garage?.open || g.ui.sheetOpen || g.air?.flying) label = null; this.chip.classList.toggle('hidden', !label); $('#boatCancel').classList.toggle('hidden', !cancel); if (label) $('#boatBtn').textContent = label;
  }
}
