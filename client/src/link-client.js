// Road links between districts (10 Oct 2026): a chip appears when you stand at a gate ("Go to Lagos Island · ₦200"). The server charges the fare, moves you, and the client reloads into the new district.
import { h, $, post } from './api.js';
export class LinkClient {
  constructor(game) { this.g = game; this.links = game.city.links || []; this.t = 0; this.busy = false; if (!this.links.length) return; this.chip = h('div', { id: 'linkChip', class: 'pill hidden' }, h('button', { id: 'linkBtn', class: 'park-btn', onclick: () => this.go() }, '')); document.body.append(this.chip); this.cur = null; }
  nearest() { const c = this.g.ctrl; let best = null; for (const l of this.links) { const d = Math.hypot(c.x - l.x, c.z - l.z); if (d <= (l.r || 16) && (!best || d < best.d)) best = { l, d }; } return best?.l || null; }
  tick(dt) {
    if (!this.links.length) return; this.t += dt; if (this.t < 350) return; this.t = 0; const g = this.g; let l = this.nearest(); if (this.busy || g.commute || g.busy || g.interior?.open || g.venue?.open || g.garage?.open || g.ui.sheetOpen || g.air?.flying) l = null;
    this.cur = l; this.chip.classList.toggle('hidden', !l); if (l) { const to = (g.cityNames?.[l.to]) || l.to.replace('lagos-', '').replace(/-/g, ' '); $('#linkBtn').textContent = `🌉 ${l.name} · to ${to} · ₦${l.fare ?? 200}`; }
  }
  async go() {
    const l = this.cur; if (!l || this.busy) return; this.busy = true; const g = this.g;
    try { const r = await post('/api/cities/link', { linkId: l.id, pos: g.pos(), idem: Math.random().toString(36).slice(2) }); g.ui.toast(r.text || 'On the road…'); g.cityChanging = true; setTimeout(() => location.reload(), 600); }
    catch (e) { g.ui.error(e); this.busy = false; }
  }
}
