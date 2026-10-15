// Pick up a nearby walker in your car. Both listen to the driver's radio station (synth tracks share the server clock).
import { h, $, post } from './api.js';

const RANGE = 12;

export class CarpoolClient {
  constructor(game) {
    this.g = game; this.riding = null; this.passenger = null; this.inviteShown = null; this.target = null; this.busy = false;
    this.chip = h('div', { id: 'carpoolChip', class: 'pill hidden' },
      h('button', { id: 'carpoolBtn', class: 'park-btn', onclick: () => this.act() }, ''),
      h('button', { id: 'carpoolOut', class: 'park-btn dim', onclick: () => this.leave() }, 'Get out'));
    document.body.appendChild(this.chip);
  }

  nearestWalker() {
    const g = this.g, c = g.ctrl; if (!c || c.mode !== 'drive' || g.commute || g.busy || g.air?.flying || g.boats?.aboard) return null;
    if (this.riding || g.parking?.blocksDriving?.()) return null;
    let best = null;
    for (const ghost of g.ghosts?.map?.values?.() || []) {
      if (!ghost.root || ghost.mode === 1 || ghost.ride) continue;
      const d = Math.hypot(ghost.root.position.x - c.x, ghost.root.position.z - c.z);
      if (d <= RANGE && (!best || d < best.d)) best = { id: ghost.id, name: ghost.name, d };
    }
    return best;
  }

  tick() {
    const g = this.g;
    if (this.riding) {
      this.followDriver();
      $('#carpoolBtn').textContent = `🎧 With @${this.riding.driverName}`;
      $('#carpoolOut').style.display = '';
      this.chip.classList.remove('hidden');
      this.syncRadio(this.riding.radio);
      return;
    }
    if (this.passenger) {
      $('#carpoolBtn').textContent = `🎧 Passenger · @${this.passenger.name}`;
      $('#carpoolOut').style.display = '';
      this.chip.classList.remove('hidden');
      return;
    }
    $('#carpoolOut').style.display = 'none';
    const t = this.nearestWalker(); this.target = t;
    if (t) {
      $('#carpoolBtn').textContent = `🚗 Pick up · @${t.name}`;
      this.chip.classList.remove('hidden');
    } else this.chip.classList.add('hidden');
  }

  followDriver() {
    const g = this.g, id = this.riding?.driverId; if (!id) return;
    const ghost = g.ghosts?.map?.get?.(id);
    const c = g.ctrl;
    if (ghost?.root) {
      c.x = ghost.root.position.x; c.z = ghost.root.position.z; c.ry = ghost.root.rotation.y;
      c.root.position.set(c.x, 0, c.z); c.root.rotation.y = c.ry;
    }
    c.mode = 'walk'; c.frozen = true; c.avatar.visible = false; c.carObj.visible = false;
  }

  syncRadio(stationId) {
    const r = this.g.radio; if (!r) return;
    if (!r.state.inCar) { r.ctl.enterCar(); r.render(); }
    if (stationId) r.forceStation?.(stationId);
  }

  onHeartbeat(cp) {
    if (!cp) return;
    if (cp.role === 'invite') this.showInvite(cp);
    if (cp.role === 'passenger') {
      if (!this.riding || this.riding.driverId !== cp.driverId) {
        this.riding = { driverId: cp.driverId, driverName: cp.driverName, radio: cp.radio };
        this.g.ui.toast(cp.driverName ? `🎧 Riding with @${cp.driverName} — same radio` : '🎧 You are in the car', 'money');
        this.g.ui.sfx?.('horn');
        this.syncRadio(cp.radio);
      } else this.riding.radio = cp.radio || this.riding.radio;
    } else if (cp.role === 'driver') {
      this.passenger = { id: cp.passengerId, name: cp.passengerName };
    } else {
      if (this.riding) this.endRide('You left the car.');
      else if (this.passenger) { this.passenger = null; this.chip.classList.add('hidden'); }
    }
  }

  showInvite(cp) {
    if (this.inviteShown === cp.from + ':' + cp.expiresAt) return;
    this.inviteShown = cp.from + ':' + cp.expiresAt;
    this.g.ui.sfx?.('knock');
    const el = h('div', { class: 'toast money', style: 'pointer-events:auto' },
      h('div', {}, `🚗 @${cp.fromName} wants to pick you up`),
      h('div', { class: 'row' },
        h('button', { class: 'btn small', onclick: async () => { el.remove(); await this.respond(true); } }, 'Get in'),
        h('button', { class: 'btn small red', onclick: async () => { el.remove(); await this.respond(false); } }, 'No')));
    $('#toasts').append(el);
    setTimeout(() => el.remove(), Math.max(1000, (cp.expiresAt || 0) - this.g.serverNow()));
  }

  async act() {
    if (this.busy || this.riding || this.passenger || !this.target) return; this.busy = true;
    try {
      const r = await post('/api/carpool/offer', { targetId: this.target.id, pos: this.g.pos() });
      this.g.ui.toast(r.text || 'Offer sent'); this.g.ui.sfx?.('ok'); this.g.net?.nudge?.();
    } catch (e) { this.g.ui.error(e); } finally { this.busy = false; }
  }

  async respond(accept) {
    if (this.busy) return; this.busy = true;
    try {
      const r = await post('/api/carpool/respond', { accept, pos: this.g.pos() });
      if (r.ride?.role === 'passenger') {
        this.riding = { driverId: r.ride.driverId, driverName: r.ride.driverName, radio: r.ride.radio };
        this.syncRadio(r.ride.radio);
      }
      this.g.ui.toast(r.text || (accept ? 'You got in' : 'Declined')); this.g.net?.nudge?.();
    } catch (e) { this.g.ui.error(e); } finally { this.busy = false; }
  }

  async leave() {
    if (this.busy) return; this.busy = true;
    try {
      const r = await post('/api/carpool/leave', {});
      this.endRide(r.text || 'You got out.');
      this.g.net?.nudge?.();
    } catch (e) { this.g.ui.error(e); } finally { this.busy = false; }
  }

  endRide(msg) {
    this.riding = null; this.passenger = null;
    const g = this.g, c = g.ctrl;
    if (c) { c.frozen = false; if (c.mode === 'walk') c.avatar.visible = true; c.applyMode(); }
    if (g.radio?.state?.inCar && c?.mode !== 'drive') { g.radio.ctl.leaveCar(); g.radio.audio?.stop?.(); g.radio.render(); }
    this.chip.classList.add('hidden');
    if (msg) g.ui.toast(msg);
  }
}
