// Client hunger faint: freeze when empty, overlay to call a cab or a friend, open canteen after rescue trip.
import { h, $, get, post } from './api.js';

export class FaintSys {
  constructor(game) {
    this.g = game; this.open = false; this.busy = false; this.waitingRide = false;
    this.el = h('div', { id: 'faintUi', class: 'hidden' });
    document.body.appendChild(this.el);
  }
  /** Cab/friend rescue in progress — keep the overlay off so Get in is tappable. */
  rescueActive() {
    const g = this.g;
    if (this.waitingRide) return true;
    if (g.commute?.faintRescue) return true;
    const r = g.rideSvc?.ride;
    return !!(r && (r.faintRescue || this.waitingRide));
  }
  /** Keep freeze + overlay in sync with /api/me hunger. */
  sync(u) {
    const g = this.g; if (!u || !g.playing) return;
    const fainted = !!u.fainted || (u.hunger != null && u.hunger <= (g.cfg?.needs?.faintAt ?? 1));
    if (g.ctrl) g.ctrl.fainted = fainted;
    if (!fainted) this.waitingRide = false;
    // Drop the waiting flag if the cab was cancelled / expired with no commute
    if (this.waitingRide && !g.commute?.faintRescue && !g.rideSvc?.ride) this.waitingRide = false;
    if (fainted) {
      if (g.ctrl?.mode === 'drive') { g.ctrl.mode = 'walk'; g.ctrl.applyMode(); g.ctrl.stopAll?.(); }
      g.ctrl.frozen = true;
      // While a rescue cab is coming or waiting, stay frozen but do NOT re-show the modal (it blocks Get in)
      if (this.rescueActive()) { this.hide(); return; }
      if (!this.open && !g.commute && !g.busy) this.show();
    } else if (this.open && !g.commute) {
      this.hide();
      if (!g.busy && !g.ui?.sheetOpen) g.ctrl.frozen = false;
    }
  }
  async show() {
    this.open = true; this.el.classList.remove('hidden');
    let friends = [];
    try { const d = await get('/api/phone/friends'); friends = (d.friends || []).filter((f) => f.state === 'online' || f.state === 'home'); } catch { /* guests / phone off */ }
    let foodName = 'the nearest canteen';
    try { const s = await get('/api/needs/faint'); if (s.food?.name) foodName = s.food.name; } catch { /* ignore */ }
    const pick = h('select', { id: 'faintFriend', class: 'ph-input', style: 'margin:8px 0;width:100%' },
      friends.length ? friends.map((f) => h('option', { value: f.username }, `@${f.username}`)) : [h('option', { value: '' }, 'No friends online')]);
    this.el.replaceChildren(h('div', { class: 'faint-card' },
      h('div', { class: 'faint-ico' }, '😵'),
      h('h3', {}, 'You fainted from hunger'),
      h('p', {}, `You need food. Call a cab or a friend to take you to ${foodName}, then eat to regain your strength.`),
      h('button', { class: 'btn big alt', id: 'faintCab', disabled: this.busy ? 'disabled' : null, onclick: () => this.cab() }, '🚕 Call a cab to eat'),
      h('div', { class: 'faint-friend' },
        h('label', { class: 'mut' }, 'Or call a friend'),
        pick,
        h('button', { class: 'btn big', id: 'faintFriendGo', disabled: !friends.length || this.busy ? 'disabled' : null, onclick: () => this.friend(pick.value) }, '📞 Ask friend to help')),
      h('p', { class: 'mut small' }, 'You cannot walk until you eat.')));
  }
  hide() { this.open = false; this.el.classList.add('hidden'); this.el.replaceChildren(); }
  async cab() {
    if (this.busy) return; this.busy = true;
    try {
      const r = await post('/api/needs/rescue/cab', {});
      if (r.user) this.g.update(r.user);
      this.g.ui.toast(r.text || 'Cab is coming.');
      if (r.ride && this.g.rideSvc) {
        r.ride.faintRescue = true;
        this.g.rideSvc.set(r.ride);
      }
      this.waitingRide = true;
      this.hide(); // chip / ride UI takes over; stay frozen until sip/eat
      if (this.g.ctrl) this.g.ctrl.frozen = true;
    } catch (e) { this.waitingRide = false; this.g.ui.error(e); this.show(); }
    finally { this.busy = false; }
  }
  async friend(name) {
    if (this.busy || !name) return; this.busy = true;
    try {
      const r = await post('/api/needs/rescue/friend', { username: name });
      this.g.ui.toast(r.text || 'Asked your friend.');
      this.show(); // keep overlay; they can still call a cab while waiting
    } catch (e) { this.g.ui.error(e); }
    finally { this.busy = false; }
  }
  /** Friend received a rescue push. */
  onPush(m) {
    const g = this.g;
    if (m.type === 'needs.fainted') {
      if (g.user) { g.user.fainted = true; if (m.hunger != null) g.user.hunger = m.hunger; if (m.energy != null) g.user.energy = m.energy; }
      this.sync(g.user || { fainted: true, hunger: m.hunger ?? 0 });
      return;
    }
    if (m.type === 'needs.food_rescue') {
      g.ui.toast(`🆘 @${m.from} fainted! Needs food at ${m.food?.name || 'a canteen'}.`);
      g.ui.openSheet(`Help @${m.from}`, [
        h('p', {}, `@${m.from} collapsed from hunger near you. Send a cab to take them to ${m.food?.name || 'eat'}.`),
        h('button', { class: 'btn big alt', onclick: async () => {
          const r = await g.ui.guard(() => post('/api/needs/rescue/accept', { id: m.id }));
          if (r) {
            g.ui.closeSheet(); g.ui.toast(r.text, 'money');
            if (r.waypoint) g.setWaypoint?.(r.waypoint.x, r.waypoint.z, r.waypoint.label);
          }
        } }, '🚕 Send them a cab'),
        h('button', { class: 'btn ghost', onclick: async () => { await post('/api/needs/rescue/decline', { id: m.id }).catch(() => {}); g.ui.closeSheet(); } }, 'Not now'),
      ]);
    } else if (m.type === 'needs.food_rescue.accepted') {
      g.ui.toast(`@${m.by} is sending a cab to ${m.food?.name || 'the canteen'}.`);
      if (m.ride && g.rideSvc) { m.ride.faintRescue = true; g.rideSvc.set(m.ride); }
      this.waitingRide = true;
      this.hide();
      if (g.ctrl) g.ctrl.frozen = true;
    }
  }
  /** After a food-rescue commute lands, sip hunger and open the canteen menu. */
  async afterArrive(foodHint) {
    const g = this.g;
    try {
      const r = await post('/api/needs/sip', {});
      if (r.user) g.update(r.user);
      if (r.text) g.ui.toast(r.text);
      const shopId = r.food?.shopId || foodHint?.shopId;
      const placeId = r.food?.placeId || foodHint?.placeId || shopId;
      if (shopId && g.ui.shopBlock) {
        const body = h('div');
        g.ui.openSheet(r.food?.name || 'Canteen', body);
        const menu = h('div');
        body.replaceChildren(h('p', {}, 'Buy a meal to regain your strength.'), menu);
        g.ui.shopBlock(menu, shopId);
      } else if (placeId) g.ui.place?.(placeId);
    } catch (e) { g.ui.error?.(e); }
    this.sync(g.user);
  }
}
void $;
