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
