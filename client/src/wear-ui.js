// The jewelry store and cap store sheet: every piece of the shop by slot, its price, a size ladder (●), and Buy / Wear / Take off.
import { get, post, fmtN, h } from './api.js';

const dots = (i, n) => '●'.repeat(i + 1) + '○'.repeat(n - i - 1); // the size ladder of the slot: one more dot = bigger and dearer
const SLOT_ICON = { head: '🧢', neck: '📿', wrist: '⌚', ears: '💎', fingers: '💍', ankle: '✨' };

export async function wearSheet(g, venueId, st = {}) {
  const ui = g.ui; const draw = async (keepScroll) => {
    const d = await ui.guard(() => get(`/api/wearables/shop?venueId=${encodeURIComponent(venueId)}`)); if (!d) return;
    const isCaps = d.shop === 'caps'; const bySlot = new Map(); for (const it of d.items) { const key = it.crown ? 'crown' : it.slot; if (!bySlot.has(key)) bySlot.set(key, []); bySlot.get(key).push(it); }
    const slotOrder = [...bySlot.keys()]; if (st.focus && bySlot.has(st.focus)) slotOrder.unshift(...slotOrder.splice(slotOrder.indexOf(st.focus), 1));
    const kids = [h('div', { class: 'row sp' }, h('b', {}, `Your cash: ${fmtN(d.cash)}`), h('span', { class: `tag ${d.open ? 'green' : 'amber'}` }, d.open ? 'Open' : `Closed · ${d.hours[0]}:00 to ${d.hours[1]}:00`)), h('p', { class: 'mut' }, d.note)];
    const act = async (path, body, okMsg) => { const r = await ui.guard(() => post(path, body)); if (r) { ui.toast(r.text || okMsg, r.charged ? 'money' : undefined); g.refreshMe?.(); g.net?.nudge(); g.syncWear?.(r.worn); draw(true); } };
    for (const slot of slotOrder) {
      const items = bySlot.get(slot); const label = slot === 'crown' ? 'Crowns' : slot === 'head' ? 'Caps and hats' : d.slots.find(s => s.id === slot)?.label || slot;
      kids.push(h('b', { style: 'display:block;margin-top:10px' }, `${slot === 'crown' ? '👑' : SLOT_ICON[slot] || ''} ${label}`));
      kids.push(h('div', { class: 'list wearlist' }, items.map((it, ix) => {
        const btn = it.owned ? h('button', { class: `btn small ${it.worn ? 'ghost' : ''}`, 'data-wear': it.id, onclick: () => it.worn ? act('/api/wearables/unequip', { slot: it.slot }, 'Taken off.') : act('/api/wearables/equip', { itemId: it.id }, 'Wearing it.') }, it.worn ? 'Take off' : 'Wear')
          : h('button', { class: 'btn small', 'data-buy': it.id, disabled: !d.open || !it.canAfford || !!it.takenBy, onclick: () => act('/api/wearables/buy', { venueId, itemId: it.id, idem: crypto.randomUUID?.() || String(Date.now()) }) }, it.takenBy ? 'Taken' : !it.canAfford ? 'Too dear' : `Buy ${fmtN(it.price)}`);
        return h('div', { 'data-item': it.id, class: it.crown ? 'crownrow' : '' }, h('span', {}, `${it.crown ? '👑 ' : ''}${it.name}`, h('small', { class: 'mut' }, ` · ${fmtN(it.price)} · size ${dots(ix, items.length)}${it.worn ? ' · wearing' : it.owned ? ' · yours' : ''}${it.takenBy ? ` · owned by @${it.takenBy}` : ''}`)), btn);
      })));
    }
    if (d.rules.resale.enabled) kids.push(h('p', { class: 'mut' }, `Sell-back pays ${Math.round(d.rules.resale.fraction * 100)}% of what you paid.`)); else kids.push(h('p', { class: 'mut' }, 'This shop does not buy items back: what you own keeps its status.'));
    ui.openSheet(d.name, kids);
  };
  await draw();
}
