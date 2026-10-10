// Client side of the crash rules. The SERVER decides whether an encounter is a hit (about 5 %, seeded, with safe zones and cooldown) and applies health loss, car damage and any
// charge. This module only (1) asks the server when an ambient vehicle is about to yield to the player, (2) lets that one vehicle drive on if the server said "hit", and
// (3) tells the server when it really reached the player, then shows the result. Ambient vehicles themselves are never charged: they are not accounts.
import { post, h, $, fmtN } from './api.js';

export const CRASH_UI = { rollGapM: 13, minSpeed: 3, clientMinIntervalMs: 5600, holdSeconds: 1.6, knockM: 3, stunSeconds: 0.9, contactPadM: 2.0 };
/** pure: has the vehicle reached the player? car/player are {x,z}; r = the player's body radius */
export const reached = (car, p, r = 0.6, pad = CRASH_UI.contactPadM) => Math.hypot(car.x - p.x, car.z - p.z) < pad + r;
/** health shown now: the server value plus natural recovery since it was received */
export const healthNow = (hv, regenPerMin, nowMs) => hv ? Math.min(hv.max, hv.health + Math.max(0, (nowMs - (hv.at || nowMs)) / 60000) * regenPerMin) : null;

export class CrashClient {
  constructor(game) { this.g = game; this.inflight = false; this.next = 0; this.flash = h('div', { id: 'hurtFlash' }); document.body.appendChild(this.flash); }
  get on() { const g = this.g; return !!g.cfg?.crash?.enabled && g.playing && !g.busy && !g.commute; }
  /** a vehicle is about to yield to the local player: returns true when the server said THIS encounter is a hit (the car then does not brake for the player) */
  consult(c, gap, v) {
    if (!this.on) return false; const now = performance.now();
    if (c.crashTok) { if (now > c.crashTok.until) { c.crashTok = null; return false; } return true; }
    if (!this.inflight && now >= this.next && v >= CRASH_UI.minSpeed && gap < CRASH_UI.rollGapM) {
      this.inflight = true; this.next = now + CRASH_UI.clientMinIntervalMs;
      post('/api/crash/roll', { vtype: c.type, speed: Math.round(v * 10) / 10, pos: this.g.pos() }).then(r => { if (r?.hit && r.token) c.crashTok = { token: r.token, until: performance.now() + (r.ttlMs || 8000) - 600 }; }).catch(() => {}).finally(() => { this.inflight = false; });
    }
    return false;
  }
  /** per frame for a vehicle that was told it may hit: has it reached the player? */
  contact(c, car, blockers) { const me = blockers.find(b => b.local); if (me && reached(car, me, me.r)) this.impact(c, car); }
  async impact(c, car) {
    const tok = c.crashTok; c.crashTok = null; if (!tok) return; c.hold = CRASH_UI.holdSeconds; const g = this.g, ctrl = g.ctrl;
    const yaw = car.yaw; const kx = Math.cos(yaw) * CRASH_UI.knockM, kz = -Math.sin(yaw) * CRASH_UI.knockM; ctrl.teleport(ctrl.x + kx, ctrl.z + kz); ctrl.stun = CRASH_UI.stunSeconds; g.nav?.cancel('stopped', true);
    this.flash.classList.add('on'); setTimeout(() => this.flash.classList.remove('on'), 450); g.ui.sfx?.('bad');
    let r = null; try { r = await post('/api/crash/impact', { token: tok.token, pos: g.pos() }); } catch (e) { return; } if (r) this.apply(r);
  }
  apply(r) {
    const g = this.g; if (g.user) { g.user.health = { health: r.health, max: r.maxHealth, at: Date.now() }; g.user.cash = r.cash ?? g.user.cash; }
    const bits = [r.text]; if (r.fee) bits.push(`Crash cost ${fmtN(r.fee)}.`); if (r.clinicFee) bits.push(`Clinic fee ${fmtN(r.clinicFee)}.`); if (r.waived) bits.push('(You could not pay all of it; the rest is waived.)'); g.ui.toast(bits.join(' '), r.fee || r.clinicFee ? 'money' : undefined);
    if (r.ko && r.pos) { g.ctrl.teleport(r.pos.x, r.pos.z); g.ctrl.mode = 'walk'; g.ctrl.applyMode(); g.net.nudge?.(); } g.refreshMe?.(); this.lastResult = r;
  }
}
void $;
