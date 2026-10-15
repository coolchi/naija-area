// Tow truck to Motoka Meko when your owned car is wrecked.
import { h, $, get, post, fmtN } from './api.js';

export class TowClient {
  constructor(game) {
    this.g = game; this.tow = null; this.busy = false; this.poll = 0;
    this.chip = h('div', { id: 'towChip', class: 'pill hidden' },
      h('button', { id: 'towBtn', class: 'park-btn', onclick: () => this.act() }, ''));
    document.body.appendChild(this.chip);
  }

  onHeartbeat(tow) {
    if (tow) this.tow = tow;
    else if (this.tow) this.tow = null;
  }

  tick(dt) {
    const g = this.g; if (!g.playing) return;
    this.poll += dt;
    if (this.poll > 3500 && this.tow) {
      this.poll = 0;
      get('/api/tow').then((r) => {
        const prev = this.tow?.state; this.tow = r.tow;
        if (prev !== 'hauling' && r.tow?.state === 'hauling') g.ui.toast('🚛 Tow truck dey carry your car to Motoka Meko…');
        if (prev && !r.tow) { g.ui.toast('🔧 Arrived at Motoka Meko Garage — tap Fix car'); g.refreshMe?.(); g.net?.nudge?.(); }
      }).catch(() => {});
    }
    const wrecked = !!(g.user?.car?.wrecked || g.carBody?.wrecked);
    if (this.tow) {
      const label = this.tow.state === 'arriving' ? `🚛 Tow coming · @${this.tow.driver?.name || 'driver'}`
        : this.tow.state === 'here' ? '🚛 Tow is here — loading…'
        : this.tow.state === 'hauling' ? '🚛 Going to Motoka Meko…' : '🚛 Tow';
      $('#towBtn').textContent = label; this.chip.classList.remove('hidden'); return;
    }
    if (wrecked && g.ctrl?.mode === 'walk' && !g.busy && !g.commute) {
      $('#towBtn').textContent = '🚛 Call tow · Motoka Meko'; this.chip.classList.remove('hidden');
    } else this.chip.classList.add('hidden');
  }

  async act() {
    if (this.busy || this.tow) return; this.busy = true; const g = this.g;
    try {
      const q = await get('/api/tow/quote');
      g.ui.confirm(`Tow to Motoka Meko Garage · about ${fmtN(q.fare)} (ESTIMATE). Call the truck?`, async () => {
        try {
          const r = await post('/api/tow/request', { pos: g.pos() });
          this.tow = r.tow; g.ui.closeSheet?.(); g.ui.toast(r.text || 'Tow on the way'); g.ui.sfx?.('horn'); g.net?.nudge?.(); g.refreshMe?.();
        } catch (e) {
          if (e?.code === 'TOO_FAR' && e?.data?.x != null) g.setWaypoint?.(e.data.x, e.data.z, 'Wrecked car');
          g.ui.error(e);
        }
      });
    } catch (e) { g.ui.error(e); } finally { this.busy = false; }
  }
}
