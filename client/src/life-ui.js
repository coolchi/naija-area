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

// ---------------- clubs and crews
addLifeSection({ id: 'clubs', label: '👥 Clubs', async draw(ui, redraw) {
  const d = await ui.guard(() => get('/api/clubs')); if (!d) return []; const C = ui.lifeClub ||= { poll: null, since: 0, msgs: [] };
  const act = (path, body) => async (e) => { if (e?.target) e.target.disabled = true; const r = await ui.guard(() => post('/api/clubs/' + path, typeof body === 'function' ? body() : body)); if (r) ui.toast(r.text || 'Done'); redraw(); };
  clearInterval(C.poll);
  if (!d.club) {
    const dir = await ui.guard(() => get('/api/clubs/directory')); const name = h('input', { class: 'sheet-input', 'data-f': 'cname', maxlength: 20, placeholder: 'Club or crew name' }); const tag = h('input', { class: 'sheet-input', 'data-f': 'ctag', maxlength: 4, placeholder: 'TAG', style: 'width:5em;text-transform:uppercase' });
    const kind = h('select', { class: 'sheet-input', 'data-f': 'ckind' }, d.rules.kinds.map(k => h('option', { value: k }, k === 'club' ? 'Club' : 'Crew')));
    return [h('p', { class: 'mut' }, 'Join a club or crew to chat with its members and meet at the Clubhouse. Up to ' + d.rules.maxMembers + ' members each.'),
      ...(d.invites.length ? [h('b', {}, 'Invitations'), ...d.invites.map(i => h('div', { class: 'row sp' }, h('span', {}, `${i.club.name} [${i.club.tag}] from @${i.by}`), h('span', { class: 'row' }, h('button', { class: 'btn small', 'data-accept-invite': i.club.id, onclick: act('join', { clubId: i.club.id }) }, 'Join'), h('button', { class: 'btn small ghost', onclick: act('decline', { clubId: i.club.id }) }, 'No'))))] : []),
      h('b', {}, `Found one (₦${fmtN(d.rules.createFee)})`), h('div', { class: 'row' }, name, tag, kind), h('button', { class: 'btn small', 'data-found-club': '1', disabled: d.cash < d.rules.createFee, onclick: act('create', () => ({ name: name.value, tag: tag.value, kind: kind.value })) }, 'Found it'),
      h('b', {}, 'Clubs you can join'), h('div', { class: 'list' }, (dir?.clubs || []).length ? dir.clubs.map(c => h('div', { class: 'row sp', 'data-club': c.id }, h('span', {}, `[${c.tag}] ${c.name} · ${c.members}/${c.max}${c.open ? '' : ' · by request'}`, h('small', { class: 'mut' }, c.motto ? ` “${c.motto}”` : '')), h('button', { class: 'btn small', 'data-join-club': c.id, disabled: c.full, onclick: act('join', { clubId: c.id }) }, c.open ? 'Join' : 'Ask'))) : [h('p', { class: 'mut' }, 'No clubs yet. Be the first!')])];
  }
  const c = d.club; const isLead = d.role === 'leader', canMg = isLead || d.role === 'officer'; const log = h('div', { class: 'list', id: 'clubChat', style: 'max-height:180px;overflow:auto' }); const inp = h('input', { class: 'sheet-input', id: 'clubSay', maxlength: d.rules.chatMax, placeholder: 'Say something to the club…' });
  const paint = () => log.replaceChildren(...C.msgs.map(m => h('div', { class: m.you ? 'you' : '' }, h('b', {}, '@' + m.user + ' '), m.text))); const poll = async () => { if (!log.isConnected) return clearInterval(C.poll); const r = await get('/api/clubs/chat?since=' + C.since).catch(() => null); if (r) { C.since = r.last; if (r.messages.length) { C.msgs = C.msgs.concat(r.messages).slice(-100); paint(); log.scrollTop = 1e9; } } };
  C.since = 0; C.msgs = []; setTimeout(poll, 0); C.poll = setInterval(poll, 3000); const send = async () => { const t = inp.value.trim(); if (!t) return; inp.value = ''; await ui.guard(() => post('/api/clubs/say', { text: t })); poll(); };
  const here = d.clubhouse.here;
  return [h('div', { class: 'card', 'data-club-card': c.id }, h('div', { class: 'row sp' }, h('b', {}, `[${c.tag}] ${c.name}`), h('span', { class: 'tag' }, `${d.role}`)), h('div', { class: 'mut' }, `${c.kind === 'crew' ? 'Crew' : 'Club'} · ${c.members}/${c.max} members · led by @${c.leader}${c.motto ? ` · “${c.motto}”` : ''}`),
    h('div', { class: 'mut' }, `In the Clubhouse now: ${here.length ? here.map(x => '@' + x).join(', ') : 'nobody'}`), d.clubhouse.canHangout ? h('button', { class: 'btn small', 'data-hangout': '1', onclick: act('hangout', {}) }, 'Hang out together') : h('small', { class: 'mut' }, 'Two members in the Clubhouse together can hang out for a mood lift.')),
  h('b', {}, 'Club chat'), log, h('div', { class: 'row' }, inp, h('button', { class: 'btn small', id: 'clubSend', onclick: send }, 'Send')),
  ...(canMg && d.requests.length ? [h('b', {}, 'Waiting'), ...d.requests.map(r => h('div', { class: 'row sp' }, h('span', {}, `@${r.username} (${r.kind})`), h('span', { class: 'row' }, r.kind === 'request' ? h('button', { class: 'btn small', onclick: act('decide', { userId: r.userId, accept: true }) }, 'Accept') : '', h('button', { class: 'btn small ghost', onclick: act('decide', { userId: r.userId, accept: false }) }, 'No'))))] : []),
  h('b', {}, 'Members'), ...d.members.map(m => h('div', { class: 'row sp' }, h('span', {}, `@${m.username} · ${m.role}${m.muted ? ' · muted' : ''}`), canMg && !m.you && (isLead || m.role === 'member') ? h('span', { class: 'row' }, isLead ? h('button', { class: 'btn small ghost', onclick: act('role', { userId: m.userId, role: m.role === 'officer' ? 'member' : 'officer' }) }, m.role === 'officer' ? 'Demote' : 'Officer') : '', h('button', { class: 'btn small ghost', onclick: act('mute', { userId: m.userId, minutes: 5 }) }, 'Mute'), h('button', { class: 'btn small red', onclick: act('kick', { userId: m.userId }) }, 'Remove')) : '')),
  canMg ? (() => { const un = h('input', { class: 'sheet-input', 'data-f': 'invite', placeholder: '@username to invite' }); return h('div', { class: 'row' }, un, h('button', { class: 'btn small', 'data-invite': '1', onclick: act('invite', () => ({ username: un.value })) }, 'Invite')); })() : '',
  h('div', { class: 'row' }, isLead ? h('button', { class: 'btn small ghost', onclick: act('settings', { open: !c.open }) }, c.open ? 'Make it by request' : 'Make it open') : '', h('button', { class: 'btn small red', 'data-leave-club': '1', onclick: act('leave', {}) }, 'Leave'), isLead ? h('button', { class: 'btn small red', onclick: act('disband', {}) }, 'Close club') : '')];
} });

// ---------------- weather and events (night market, street owambe, festivals)
const ago = (ms) => { const m = Math.round(ms / 60000); return m < 1 ? 'soon' : m < 60 ? `in ${m} min` : `in ${Math.round(m / 60)} h`; };
addLifeSection({ id: 'events', label: '🌧 Events', async draw(ui, redraw) {
  const [w, e] = await Promise.all([ui.guard(() => get('/api/weather')), ui.guard(() => get('/api/events'))]); if (!w || !e) return [];
  const icon = { clear: '☀️', cloudy: '⛅', rain: '🌧', storm: '⛈' }; const act = (path, body) => async (x) => { if (x?.target) x.target.disabled = true; const r = await ui.guard(() => post('/api/events/' + path, body)); if (r) { ui.toast(r.text || 'Done', r.charged ? 'money' : undefined); ui.g.refreshMe?.(); } redraw(); };
  const out = [h('div', { class: 'card', 'data-weather': w.state }, h('b', {}, `${icon[w.state]} ${w.label} · ${w.night ? '🌙 night' : w.phase}`), h('div', { class: 'mut' }, w.forecast.map(f => `${icon[f.state]} ${ago(f.inMs)}`).join('  ·  ')),
    w.flood ? h('div', { class: 'tag amber' }, `Flooding: ${w.zones.map(z => z.name).join(', ') || 'none in this city'}. Slow down: driving speed ${Math.round(w.speedScale.drive * 100)}%, walking ${Math.round(w.speedScale.walk * 100)}%.`) : h('div', { class: 'mut' }, 'The roads are dry.'),
    w.fareMult > 1 ? h('div', { class: 'mut' }, `Rain: Oya Ride fares are ${Math.round((w.fareMult - 1) * 100)}% higher.`) : '', h('small', { class: 'mut' }, w.note))];
  for (const ev of e.events) {
    out.push(h('div', { class: 'card', 'data-event': ev.id }, h('div', { class: 'row sp' }, h('b', {}, `${ev.icon} ${ev.name}`), h('span', { class: 'tag ' + (ev.active ? 'amber' : '') }, ev.active ? `ON${ev.endsInMs ? ' · ends ' + ago(ev.endsInMs) : ''}` : 'not on now')), h('div', { class: 'mut' }, ev.blurb), h('small', { class: 'mut' }, ev.window),
      ...(ev.active ? [...(ev.shop || []).map(i => h('div', { class: 'row sp' }, h('span', {}, `${i.name} · ₦${fmtN(i.price)} · ${i.left}/${i.stock} left · you ${i.bought}/${i.limit}`), h('button', { class: 'btn small', 'data-ev-buy': i.id, disabled: i.left <= 0 || i.bought >= i.limit || e.cash < i.price, onclick: act('buy', { event: ev.id, item: i.id }) }, 'Buy'))),
        ...(ev.claim ? [h('button', { class: 'btn small', 'data-ev-claim': ev.id, disabled: ev.claim.claimed, onclick: act('claim', { event: ev.id }) }, ev.claim.claimed ? 'Joined tonight' : `${ev.claim.label} (+₦${fmtN(ev.claim.cash)})`)] : [])] : [])));
  }
  out.push(h('p', { class: 'mut' }, e.note)); return out;
} });
