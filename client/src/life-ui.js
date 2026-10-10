// "City life" phone app (Track G): businesses, marketplace, clubs, events, pass and skins. Every number and rule comes from the server; these functions only draw it and send intent.
// GAME MONEY ONLY. Mixed into UI.prototype (see ui.js). Each section is a function (ui) => Promise<Element[]>; add a section to SECTIONS to add a tab.
import { get, post, fmtN, h } from './api.js';

const money = (n) => '₦' + fmtN(n);
const SECTIONS = [];
export const lifeUi = {
  async tab_life() {
    const ui = this; const body = h('div', { id: 'lifeBody' }); let cur = ui.lifeTab && SECTIONS.some(s => s.id === ui.lifeTab) ? ui.lifeTab : SECTIONS[0].id;
    const bar = h('div', { class: 'tabrow', id: 'lifeTabs' }); const drawBar = () => bar.replaceChildren(...SECTIONS.map(s => h('button', { class: s.id === cur ? 'on' : '', 'data-life': s.id, onclick: () => { cur = s.id; ui.lifeTab = cur; drawBar(); show(); } }, s.label)));
    const show = async () => { body.replaceChildren(h('p', { class: 'mut' }, 'Loading…')); const sec = SECTIONS.find(s => s.id === cur); const el = await sec.draw(ui, show); body.replaceChildren(...[].concat(el)); };
    ui.lifeRefresh = show; drawBar(); show(); return [bar, body];
  }
};
export const addLifeSection = (s) => SECTIONS.push(s);

// ---------------- businesses
addLifeSection({ id: 'business', label: '🏪 Business', async draw(ui, redraw) {
  const d = await ui.guard(() => get('/api/business')); if (!d) return [];
  const act = (path, body, after) => async (e) => { if (e?.target) e.target.disabled = true; const r = await ui.guard(() => post('/api/business/' + path, body)); if (r) { ui.toast(r.text || 'Done'); ui.g.refreshMe?.(); } (after || redraw)(); };
  const out = [h('p', { class: 'mut' }, `Cash ${money(d.cash)}. Your businesses earn while you are away (at most ${d.rules.accrueCapHours} h per visit, ${money(d.owned[0]?.dailyNetCap || 0)} a day each). ESTIMATE numbers.`)];
  for (const b of d.owned) {
    out.push(h('div', { class: 'card', 'data-biz': b.id }, h('div', { class: 'row sp' }, h('b', {}, `${b.icon} ${b.name}`), h('span', { class: 'tag' }, `Level ${b.level}`)),
      h('div', { class: 'mut' }, `${b.typeName} · demand now ${b.demandNow}% · capacity ${b.capacity}% · about ${money(b.netPerHourNow)} an hour now`),
      h('div', { class: 'row sp' }, h('b', {}, `Waiting: ${money(b.ready)}`), h('button', { class: 'btn small', 'data-collect': b.id, disabled: b.ready <= 0, onclick: act('collect', { id: b.id }) }, 'Collect')),
      h('div', {}, `Staff ${b.staff.length}/${b.maxStaff}`), ...b.staff.map(s => h('div', { class: 'row sp' }, h('span', {}, `${s.name} · ${s.skillLabel} · ${money(s.wagePerHour)}/h`), h('button', { class: 'btn small ghost', onclick: act('fire', { id: b.id, staffId: s.id }) }, 'Let go'))),
      ...(b.candidates.length ? [h('div', { class: 'mut' }, 'Looking for work today:'), ...b.candidates.map(c => h('div', { class: 'row sp' }, h('span', {}, `${c.name} · ${c.skillLabel} · ${money(c.wagePerHour)}/h`), h('button', { class: 'btn small alt', 'data-hire': c.id, onclick: act('hire', { id: b.id, candidate: c.id }) }, 'Hire')))] : []),
      h('div', { class: 'row' }, b.upgradeCost ? h('button', { class: 'btn small', onclick: act('upgrade', { id: b.id }) }, `Upgrade ${money(b.upgradeCost)}`) : '', h('button', { class: 'btn small red', onclick: () => ui.confirm?.call(ui, `Sell ${b.name} for ${money(b.sellFor)}?`, act('sell', { id: b.id })) }, `Sell ${money(b.sellFor)}`))));
  }
  const free = d.forSale.filter(t => !t.owned); if (free.length && d.owned.length < d.rules.maxPerPlayer) out.push(h('b', {}, 'Start a business'), ...free.map(t => h('div', { class: 'row sp' }, h('span', {}, `${t.icon} ${t.name} · ${money(t.cost)}`, h('small', { class: 'mut' }, ` ${t.blurb}`)), h('button', { class: 'btn small', 'data-buy-biz': t.id, disabled: d.cash < t.cost, onclick: act('buy', { type: t.id }) }, 'Open'))));
  out.push(h('p', { class: 'mut' }, d.note)); return out;
} });

// ---------------- marketplace
addLifeSection({ id: 'market', label: '🛒 Market', async draw(ui, redraw) {
  ui.lifeMarket ||= { view: 'browse', kind: '' }; const M = ui.lifeMarket;
  const bar = h('div', { class: 'tabrow' }, [['browse', 'Browse'], ['sell', 'Sell'], ['mine', 'My listings']].map(([id, t]) => h('button', { class: M.view === id ? 'on' : '', 'data-mview': id, onclick: () => { M.view = id; redraw(); } }, t)));
  const call = (path, body) => async (e) => { if (e?.target) e.target.disabled = true; const r = await ui.guard(() => post('/api/market/' + path, body)); if (r) { ui.toast(r.text || 'Done'); ui.g.refreshMe?.(); } redraw(); };
  if (M.view === 'browse') {
    const d = await ui.guard(() => get('/api/market' + (M.kind ? '?kind=' + M.kind : ''))); if (!d) return [bar];
    const kinds = h('div', { class: 'row' }, [['', 'All'], ['car', 'Cars'], ['wearable', 'Clothes & jewelry']].map(([k, t]) => h('button', { class: 'btn small ' + (M.kind === k ? '' : 'ghost'), onclick: () => { M.kind = k; redraw(); } }, t)));
    return [bar, h('p', { class: 'mut' }, `Cash ${money(d.cash)}. Players set the prices; sale fee ${d.rules.saleFeePercent}% comes off the seller. ${d.note}`), kinds, h('div', { class: 'list' }, d.listings.length ? d.listings.map(l => h('div', { class: 'card', 'data-listing': l.id }, h('div', { class: 'row sp' }, h('b', {}, `${l.kind === 'car' ? '🚗' : '💎'} ${l.title}`), h('b', {}, money(l.ask))), h('div', { class: 'mut' }, `${l.details} · seller @${l.seller} · worth about ${money(l.baseValue)}`), l.warn ? h('div', { class: 'tag amber' }, l.warn) : '', l.mine ? h('small', { class: 'mut' }, 'Your listing') : h('button', { class: 'btn small', 'data-buy-listing': l.id, disabled: d.cash < l.ask, onclick: call('buy', { id: l.id, expect: l.ask }) }, `Buy for ${money(l.ask)}`))) : [h('p', { class: 'mut' }, 'Nothing for sale right now. Be the first to list something.')])];
  }
  const m = await ui.guard(() => get('/api/market/mine')); if (!m) return [bar];
  if (M.view === 'sell') return [bar, h('p', { class: 'mut' }, `Your car or item goes into escrow while it is listed. Listing fee ${m.rules.listingFeePercent}% (not refunded), sale fee ${m.rules.saleFeePercent}%. You can list ${m.rules.maxActiveListings} things at a time; listings last ${m.rules.ttlHours} h.`),
    h('div', { class: 'list' }, m.sellable.length ? m.sellable.map(x => { const inp = h('input', { class: 'sheet-input', type: 'number', min: 1, value: x.value, 'data-ask': x.ref, style: 'width:8em' }); return h('div', { class: 'row sp', 'data-sellable': x.ref }, h('span', {}, `${x.kind === 'car' ? '🚗' : '💎'} ${x.title} · worth ${money(x.value)}`), h('span', { class: 'row' }, inp, h('button', { class: 'btn small', 'data-list': x.ref, onclick: call('list', { kind: x.kind, ref: x.ref, ask: Number(inp.value) }) }, 'List'))); }) : [h('p', { class: 'mut' }, 'You have no cars or tradeable items yet.')])];
  return [bar, h('div', { class: 'list' }, m.listings.length ? m.listings.map(l => h('div', { class: 'row sp', 'data-mine': l.id }, h('span', {}, `${l.title} · ${money(l.ask)} · ${l.status}`), h('button', { class: 'btn small ghost', onclick: call('cancel', { id: l.id }) }, 'Take back'))) : [h('p', { class: 'mut' }, 'No listings.')]),
    ...(m.history.length ? [h('b', {}, 'Recent trades'), ...m.history.map(l => h('div', { class: 'mut' }, `${l.role === 'sold' ? 'Sold' : 'Bought'} ${l.title} for ${money(l.ask)}`))] : [])];
} });
