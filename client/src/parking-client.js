// Car parks on the client: loads /api/parking, draws parked cars, shows the "Park here" / "Take my car" chip, and blocks driving off while your active car is parked.
import { h, $, get, post } from './api.js';
import { CarParks } from './carparks.js';
import { parkingChip } from '../../server/core/carparks-layout.js';

export class ParkingClient {
  constructor(game) {
    this.g = game; this.view = null; this.t = 0; this.poll = 0; this.cp = new CarParks(game.world, game.city); this.busy = false; this.hourSeen = -1;
    this.chip = h('div', { id: 'parkChip', class: 'pill hidden' }, h('button', { id: 'parkBtn', class: 'park-btn', onclick: () => this.act() }, ''));
    document.body.appendChild(this.chip); this.cur = null;
  }
  get mine() { return this.view?.mine || null; }
  async load() { this.lastLoad = performance.now(); try { this.view = await get('/api/parking'); } catch { return; } this.sync(); }
  sync() {
    const v = this.view; if (!v) return; const list = [...(v.others || []), ...(v.mine ? [{ ...v.mine, mine: true }] : [])]; this.cp.setParked(list); this.hourSeen = -1; this.cp.setHour(this.g.worldTime?.hour ?? v.hour ?? 12, list); this.hourSeen = this.g.worldTime?.hour ?? v.hour ?? 12;
  }
  /** blocks "get in the car" while the active car is parked elsewhere */
  blocksDriving() { const m = this.mine; if (!m || this.g.ctrl.mode === 'drive') return false; const lot = (this.g.city.carParks || []).find(l => l.id === m.lot); this.g.ui.toast(`Your car is parked at ${lot?.name || 'a car park'}. Walk to it and tap “Take my car”.`); return true; }
  tick(dt) {
    const g = this.g; if (!g.playing || !this.cp) return; this.t += dt; const c = g.ctrl; this.cp.cull(c.x, c.z);
    const hour = g.worldTime?.hour; if (hour !== undefined && Math.floor(hour / 2) !== Math.floor(this.hourSeen / 2) && this.view) { this.hourSeen = hour; this.cp.setHour(hour); }
    this.poll += dt; if (this.poll > 45000) { this.poll = 0; this.load(); }
    if (this.t < 150) return; this.t = 0;
    const st = { mode: c.mode, x: c.x, z: c.z, lots: g.city.carParks || [], mine: this.mine, ownedCar: !!this.view?.ownsCar, takeRange: this.view?.takeRangeM ?? 9 };
    if (c.mode === 'drive' && st.lots.some(l => Math.abs(c.x - l.x) < l.w / 2 + 1 && Math.abs(c.z - l.z) < l.d / 2 + 1) && performance.now() - (this.lastLoad || 0) > 8000) this.load();
    const chip = g.commute || g.busy || g.interior?.open || g.venue?.open || g.garage?.open ? null : parkingChip(st); this.cur = chip; this.chip.classList.toggle('hidden', !chip); if (chip) $('#parkBtn').textContent = chip.label;
  }
  async act() {
    const c = this.cur; if (!c || this.busy) return; this.busy = true; const g = this.g;
    try {
      if (c.kind === 'hint') { g.ui.toast('Buy your own car at Naija Auto Mart to park it here.'); return; }
      if (c.kind === 'park') { const r = await post('/api/parking/park', { idemKey: Math.random().toString(36).slice(2) }); g.ctrl.mode = 'walk'; g.ctrl.applyMode(); g.ctrl.teleport(r.out.x, r.out.z); g.ui.toast(r.text); g.ui.sfx('ok'); g.net.nudge?.(); g.refresh?.(); }
      else { const r = await post('/api/parking/take', {}); g.ctrl.teleport(r.at.x, r.at.z); g.ctrl.ry = r.at.ry; g.ctrl.mode = 'drive'; g.ctrl.applyMode(); g.ctrl.camYaw = r.at.ry; g.ui.toast(r.text); g.ui.sfx('horn'); g.net.nudge?.(); }
      await this.load();
    } catch (e) { g.ui.error(e); } finally { this.busy = false; }
  }
}
