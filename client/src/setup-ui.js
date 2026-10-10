// Sign-up choices as three separate full screens: 1) your city, 2) your CITY OF INTEREST (its own screen), 3) your interests. Skippable; reopened from More > Your choices.
import { get, post, h, $ } from './api.js';

const el = () => { let e = $('#setup'); if (!e) { e = h('div', { id: 'setup', class: 'screen setup' }); document.body.append(e); } e.classList.remove('hidden'); return e; };
const close = () => $('#setup')?.classList.add('hidden');
/** @returns {Promise<'done'|'skipped'|'moved'>} resolves when the player finishes or skips; 'moved' means the page is reloading into the chosen city */
export async function setupFlow(g, { editing = false } = {}) {
  let o; try { o = await get('/api/signup/options'); } catch { return 'skipped'; }
  const pick = { homeCity: o.current.homeCity || o.homeCity, interestCity: o.current.interestCity || null, interests: [...(o.current.interests || [])] }; const nameOf = (id) => o.cities.find(c => c.id === id)?.name || id;
  return new Promise((resolve) => {
    let step = editing && o.homeLocked ? 2 : 1; const root = el();
    const frame = (n, title, sub, body, nextLabel, canNext, onNext) => {
      const dots = h('div', { class: 'stepdots' }, [1, 2, 3].map(i => h('i', { class: i === n ? 'on' : i < n ? 'past' : '' })));
      const back = n > (editing && o.homeLocked ? 2 : 1) ? h('button', { class: 'btn ghost', 'data-back': '1', onclick: () => { step = n - 1; draw(); } }, 'Back') : null;
      const skip = h('button', { class: 'btn ghost', 'data-skip': '1', onclick: async () => { if (editing) { close(); resolve('skipped'); return; } try { await post('/api/signup/profile', { skip: true }); } catch { /* try again next time */ } close(); resolve('skipped'); } }, editing ? 'Cancel' : 'Skip for now');
      root.replaceChildren(h('div', { class: 'card setupcard', 'data-step': String(n) }, dots, h('h2', {}, title), h('p', { class: 'mut' }, sub), body, h('div', { class: 'row sp', style: 'margin-top:12px' }, h('div', { class: 'row' }, back, skip), h('button', { class: 'btn', 'data-next': '1', disabled: !canNext(), onclick: onNext }, nextLabel))));
    };
    const cityCards = (list, sel, onPick, extra, badges = false) => h('div', { class: 'citygrid' }, list.map(c => h('button', { type: 'button', class: `citycard ${sel === c.id ? 'on' : ''} ${c.open === false ? 'closed' : ''}`, 'data-city': c.id, 'data-open': c.open === false ? '0' : '1', onclick: () => onPick(c.id) }, h('b', {}, c.name), badges ? h('span', { class: `tag ${c.open === false ? '' : 'green'}`, 'data-badge': c.open === false ? 'closed' : 'open' }, c.open === false ? 'Not open yet' : 'Open now') : null, h('small', {}, c.state ? `${c.state} · ${c.blurb}` : c.blurb))), extra);
    const draw = () => {
      if (step === 1) frame(1, 'Which city do you want to start playing from?', 'You will appear in this city. You can travel to the others by plane, boat or road later.', o.homeLocked ? h('p', { class: 'tag green' }, `You live in ${nameOf(pick.homeCity)}`) : [h('p', { class: 'openline', 'data-open-now': '1' }, `Open now: ${o.openNow.join(', ')}.`), cityCards(o.cities, pick.homeCity, (id) => { pick.homeCity = id; if (pick.interestCity === id) pick.interestCity = null; draw(); }, null, true), o.cities.find(c => c.id === pick.homeCity)?.open === false ? h('p', { class: 'err', 'data-fallback': '1' }, `${nameOf(pick.homeCity)} is not open yet. You will start in ${o.fallbackCity}, and we will note that you want ${nameOf(pick.homeCity)}.`) : null], 'Next', () => !!pick.homeCity, () => { step = 2; draw(); });
      else if (step === 2) frame(2, 'Which other city interests you?', 'Pick a city you want to visit or follow. It is only a wish: nothing is locked, and you can change it any time.', cityCards(o.cities.filter(c => c.id !== pick.homeCity), pick.interestCity, (id) => { pick.interestCity = id; draw(); }, h('button', { type: 'button', class: `citycard ${pick.interestCity === null ? 'on' : ''}`, 'data-city': '', onclick: () => { pick.interestCity = null; draw(); } }, h('b', {}, 'Not sure yet'), h('small', {}, 'Skip this one'))), 'Next', () => true, () => { step = 3; draw(); });
      else frame(3, 'What are you into?', `Pick ${o.rules.minInterests} to ${o.rules.maxInterests}. We use this to decide what to build next.`, h('div', { class: 'chips' }, o.interests.map(i => h('button', { type: 'button', class: `chip ${pick.interests.includes(i.id) ? 'on' : ''}`, 'data-int': i.id, onclick: () => { const ix = pick.interests.indexOf(i.id); if (ix >= 0) pick.interests.splice(ix, 1); else if (pick.interests.length < o.rules.maxInterests) pick.interests.push(i.id); draw(); } }, `${i.emoji} ${i.label}`))), 'Finish', () => pick.interests.length >= o.rules.minInterests, async () => {
        const btn = $('#setup [data-next]'); if (btn) btn.disabled = true;
        try { const r = await post('/api/signup/profile', { homeCity: o.homeLocked ? undefined : pick.homeCity, interestCity: pick.interestCity, interests: pick.interests }); g.user = r.user || g.user; close(); if (r.fallback) g.ui?.toast?.(`${r.fallback.wanted} is not open yet: you start in ${r.fallback.startsIn}.`); if (r.moved) { g.progress?.(10, `Moving you to ${nameOf(pick.homeCity)}…`); location.reload(); resolve('moved'); return; } g.ui?.toast?.('Saved. You can change your choices in More.'); resolve('done'); }
        catch (e) { if (btn) btn.disabled = false; let m = $('#setup .err'); if (!m) { m = h('div', { class: 'err' }); $('#setup .setupcard').append(m); } m.textContent = e.message; }
      });
    };
    draw();
  });
}
