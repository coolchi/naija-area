// Iron Gate Armoury sheets: buy/keep guns, hire a bodyguard.
import { get, post, fmtN, h } from './api.js';

export async function gunSheet(g, venueId) {
  const ui = g.ui; const draw = async () => {
    const d = await ui.guard(() => get(`/api/guns/shop?venueId=${encodeURIComponent(venueId)}`)); if (!d) return;
    const kids = [
      h('div', { class: 'row sp' }, h('b', {}, `Your cash: ${fmtN(d.cash)}`), h('span', { class: `tag ${d.open ? 'green' : 'amber'}` }, d.open ? 'Open' : `Closed · ${d.hours[0]}:00 to ${d.hours[1]}:00`)),
      h('p', { class: 'mut' }, d.note)
    ];
    const act = async (path, body, okMsg) => {
      const r = await ui.guard(() => post(path, body)); if (!r) return;
      ui.toast(r.text || okMsg, r.charged ? 'money' : undefined);
      await g.refreshMe?.(); g.net?.nudge(); g.syncBodyguard?.(r.bodyguard || g.user?.bodyguard); draw();
    };
    kids.push(h('div', { class: 'list' }, d.items.map(it => {
      const btn = it.owned
        ? h('button', { class: `btn small ${it.equipped ? 'ghost' : ''}`, onclick: () => it.equipped ? act('/api/guns/unequip', {}, 'Holstered.') : act('/api/guns/equip', { itemId: it.id }, 'Carrying it.') }, it.equipped ? 'Holster' : 'Carry')
        : h('button', { class: 'btn small', disabled: !d.open || !it.canAfford, onclick: () => act('/api/guns/buy', { venueId, itemId: it.id, idem: crypto.randomUUID?.() || String(Date.now()) }) }, !it.canAfford ? 'Too dear' : `Buy ${fmtN(it.price)}`);
      return h('div', {}, h('span', {}, `🔫 ${it.name}`, h('small', { class: 'mut' }, ` · ${fmtN(it.price)} · +${it.strength} fight str · ×${it.damageMult} dmg${it.equipped ? ' · carrying' : it.owned ? ' · yours' : ''}`), h('div', { class: 'mut' }, it.blurb)), btn);
    })));
    ui.openSheet(d.name, kids);
  };
  await draw();
}

export async function bodyguardSheet(g, venueId) {
  const ui = g.ui; let wantCar = false;
  const draw = async () => {
    const d = await ui.guard(() => get(`/api/bodyguard?venueId=${encodeURIComponent(venueId)}`)); if (!d) return;
    const kids = [
      h('div', { class: 'row sp' }, h('b', {}, `Your cash: ${fmtN(d.cash)}`), h('span', { class: `tag ${d.open ? 'green' : 'amber'}` }, d.open ? 'Open' : `Closed · ${d.hours[0]}:00 to ${d.hours[1]}:00`)),
      h('p', { class: 'mut' }, d.note),
      h('div', { class: 'tag amber', style: 'display:inline-block;margin:4px 0 8px' }, 'HD Body Upgrade · rare · high-res model')
    ];
    if (d.active && d.guard) {
      const carLine = d.guard.withCar ? ` · ${d.guard.car?.label || 'Black G-Wagon'} escort` : '';
      kids.push(h('div', { class: 'card' }, h('b', {}, `🛡️ ${d.guard.name} on detail`), h('p', {}, `HD Body · plan: ${d.guard.plan} · about ${d.guard.leftDays} game-day(s) left${carLine}`), h('button', { class: 'btn ghost small', onclick: async () => { const r = await ui.guard(() => post('/api/bodyguard/dismiss', {})); if (r) { ui.toast(r.text); await g.refreshMe?.(); g.syncBodyguard?.(r.bodyguard); draw(); } } }, 'Stand down')));
    }
    const addon = d.carAddOn;
    const hasCar = !!(d.guard && d.guard.withCar);
    if (addon && !hasCar) {
      const box = h('label', { class: 'row', style: 'gap:8px;align-items:center;margin:8px 0;cursor:pointer' },
        h('input', { type: 'checkbox', checked: wantCar, onchange: (e) => { wantCar = !!e.target.checked; draw(); } }),
        h('span', {}, `🚗 Come with ${addon.label || 'Black G-Wagon'}`, h('small', { class: 'mut' }, ` · +${fmtN(addon.fee)} once · their car follows you`))
      );
      kids.push(box);
    } else if (hasCar) {
      kids.push(h('p', { class: 'mut' }, `🚗 ${d.guard.car?.label || 'Black G-Wagon'} escort is already on this hire.`));
    }
    const hire = async (plan) => {
      const r = await ui.guard(() => post('/api/bodyguard/hire', { venueId, plan, withCar: !!(wantCar && !hasCar), idem: crypto.randomUUID?.() || String(Date.now()) }));
      if (!r) return; ui.toast(r.text, 'money'); await g.refreshMe?.(); g.syncBodyguard?.(r.bodyguard); g.net?.nudge(); draw();
    };
    kids.push(h('b', { style: 'display:block;margin-top:10px' }, 'Hire plans'));
    kids.push(h('div', { class: 'list' }, d.plans.map(p => {
      const total = p.fee + (wantCar && !hasCar ? (addon?.fee || 0) : 0);
      const can = d.open && d.cash >= total;
      const label = wantCar && !hasCar ? `${fmtN(p.fee)} + car` : fmtN(p.fee);
      return h('div', { class: 'row sp' },
        h('span', {}, `${p.label}`, h('small', { class: 'mut' }, ` · ${fmtN(total)} · ${p.days} game day${p.days === 1 ? '' : 's'}`)),
        h('button', { class: 'btn small', disabled: !can, onclick: () => hire(p.id) }, !can ? 'Too dear' : d.active ? `Extend ${label}` : `Hire ${label}`)
      );
    })));
    kids.push(h('p', { class: 'mut' }, 'While hired: fight damage drops and thieves cannot take your purse.'));
    ui.openSheet('Bodyguard hire', kids);
  };
  await draw();
}
