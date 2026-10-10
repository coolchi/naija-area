// Suwe arena (drawn on the ground like chalk): the 12-box U route, a child hopping it (the human walker shape, here as a small figure), the stone-throw timing bar and the hop beat.
// This file only DRAWS and RECORDS WHEN the player tapped; the server judges every tap against its seeded plan. Used by the table game (venue panel) and the single-player run.
// Yoruba text and chants are PLACEHOLDERS for a local reviewer (rules vary by area).
import { h } from './api.js';
import { markerAt } from '../../server/core/casual/suwe.js';

const FIG = '<svg viewBox="0 0 40 60" width="100%" height="100%"><circle cx="20" cy="9" r="7" fill="#5a3a1a"/><path d="M20 16 L20 36" stroke="#d6402f" stroke-width="6" stroke-linecap="round"/><path d="M20 20 L9 30 M20 20 L31 28" stroke="#5a3a1a" stroke-width="4" stroke-linecap="round"/><path d="M20 36 L20 56" stroke="#2b3a5a" stroke-width="5" stroke-linecap="round"/><path d="M20 36 L30 44" stroke="#2b3a5a" stroke-width="5" stroke-linecap="round" opacity=".8"/></svg>';
const cellOf = (i) => (i < 6 ? { col: 0, row: 5 - i } : { col: 1, row: i - 6 });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/** opts: { labels, houses (owner seat per number or -1), you (seat), plan (stage plan) | house: {aimPeriodMs,tol}, onDone({aim,taps}), seatColors } */
export function suweArena(opts) {
  const { labels, houses = [], you = 0, plan, onDone } = opts; const isHouse = !plan.events; const HC = ['#d6402f', '#2e7dd1']; let phase = 'ready', aimMs = 0, t0Aim = 0, t0Hop = 0, raf = 0, taps = [], done = false; const cells = [];
  const grid = h('div', { class: 'sgrid', id: 'suweGrid' }); for (let i = 0; i < 12; i++) { const { col, row } = cellOf(i); const lab = labels[i]; const owner = houses[lab - 1]; const c = h('div', { class: `sbox ${owner >= 0 ? 'house' : ''} ${!isHouse && plan.stoneBox === i ? 'stone' : ''}`, 'data-box': i, style: `grid-column:${col + 1};grid-row:${row + 1}${owner >= 0 ? `;--hc:${HC[owner]}` : ''}` }, h('b', {}, String(lab)), owner >= 0 ? h('small', {}, owner === you ? 'my house' : 'house') : '', !isHouse && plan.stoneBox === i ? h('i', { class: 'sstone' }) : ''); cells.push(c); grid.append(c); }
  const fig = h('div', { class: 'sfig', id: 'suweFig' }); fig.innerHTML = FIG; grid.append(fig); const place = (i, hop) => { const { col, row } = cellOf(i); fig.style.left = `${col * 50 + 25}%`; fig.style.top = `${(row + 0.5) * (100 / 6)}%`; if (hop) { fig.classList.remove('hop'); void fig.offsetWidth; fig.classList.add('hop'); } };
  place(isHouse ? 0 : (plan.events[0].box ?? 0)); fig.style.opacity = isHouse ? '0' : '1'; if (!isHouse) place(plan.events[0].box);
  const tol = isHouse ? opts.house.tol : plan.aimTol; const period = isHouse ? opts.house.aimPeriodMs : plan.aimPeriodMs;
  const zone = h('div', { class: 'szone', style: `left:${(0.5 - tol) * 100}%;width:${tol * 200}%` }); const mark = h('div', { class: 'smark', id: 'suweMark' }); const bar = h('div', { class: 'sbar' }, zone, mark);
  const msg = h('div', { class: 'smsg', id: 'suweMsg' }, isHouse ? 'Turn your back and throw the stone over your shoulder. Stop the marker in the middle to land it across the middle line.' : `Throw the stone into box ${labels[plan.stoneBox]}: stop the marker inside the green zone.`);
  const cue = h('div', { class: 'scue', id: 'suweCue' }); grid.append(cue); const btn = h('button', { class: 'btn big alt sbtn', id: 'suweBtn' }, 'Start'); const root = h('div', { class: 'suwe' }, msg, h('div', { class: 'sarena' }, grid), bar, btn);
  if (opts.static) { fig.style.opacity = '0'; return { el: h('div', { class: 'suwe static' }, h('div', { class: 'sarena' }, grid)), destroy() {} }; }
  const events = plan.events || []; const nowT = () => performance.now();
  const stopLoop = () => cancelAnimationFrame(raf); const finish = () => { if (done) return; done = true; phase = 'sent'; stopLoop(); btn.disabled = true; btn.textContent = 'Judging…'; onDone(isHouse ? { aim: Math.round(aimMs) } : { aim: Math.round(aimMs), taps }); };
  const tick = () => {
    if (phase === 'aim') { const m = markerAt(nowT() - t0Aim); mark.style.left = `${m * 100}%`; }
    else if (phase === 'hop') { const t = nowT() - t0Hop; const beat = plan.beatMs; const lead = plan.leadMs;
      if (t < lead) { const n = Math.ceil((lead - t) / beat); msg.textContent = n > 0 ? `Get ready… ${n}` : 'HOP!'; cue.style.opacity = '0'; }
      else { msg.textContent = 'Tap on every ring!'; const k = taps.length; if (k < events.length) { const due = lead + events[k].at - t; const ev = events[k]; const { col, row } = cellOf(ev.box); cue.style.opacity = '1'; cue.style.left = `${col * 50 + 25}%`; cue.style.top = `${(row + 0.5) * (100 / 6)}%`; const sc = 1 + Math.max(0, Math.min(1.6, due / beat)); cue.style.transform = `translate(-50%,-50%) scale(${sc})`; cue.className = `scue ${ev.kind}`; } else cue.style.opacity = '0';
        if (t > lead + (events.at(-1)?.at || 0) + plan.windowMs * 3 + 800) return finish(); }
    }
    raf = requestAnimationFrame(tick);
  };
  const beginAim = () => { phase = 'aim'; t0Aim = nowT(); btn.textContent = isHouse ? '🪨 Throw over my shoulder!' : '🪨 Throw!'; raf = requestAnimationFrame(tick); };
  const throwNow = () => { if (phase !== 'aim') return; aimMs = nowT() - t0Aim; const m = markerAt(aimMs); const inZone = Math.abs(m - 0.5) <= tol; mark.classList.add(inZone ? 'okz' : 'badz'); stopLoop();
    if (isHouse) return void finish(); phase = 'hop'; t0Hop = nowT(); btn.textContent = 'HOP! (tap, or press Space)'; msg.textContent = inZone ? 'Good throw!' : 'The stone looks close to a line… keep going.'; raf = requestAnimationFrame(tick); };
  const hopNow = () => { if (phase !== 'hop') return; const t = nowT() - t0Hop; if (t < plan.leadMs - plan.beatMs * 0.5) return; const k = taps.length; if (k >= events.length) return; taps.push(Math.round(t)); const ev = events[k]; const e = t - (plan.leadMs + ev.at); const w = ev.kind === 'rest' ? plan.windowMs * 1.5 : plan.windowMs; const g = Math.abs(e) <= w * 0.35 ? 'perfect' : Math.abs(e) <= w ? 'good' : 'miss'; place(ev.box, true); cells[ev.box].classList.add(`g${g}`); setTimeout(() => cells[ev.box]?.classList.remove(`g${g}`), 350); if (taps.length === events.length) finish(); };
  const act = () => { if (phase === 'ready') beginAim(); else if (phase === 'aim') throwNow(); else if (phase === 'hop') hopNow(); };
  btn.addEventListener('pointerdown', (e) => { e.preventDefault(); act(); }); const key = (e) => { if (e.code === 'Space') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) act(); } }; document.addEventListener('keydown', key, true);
  const destroy = () => { stopLoop(); document.removeEventListener('keydown', key, true); if (window.__suwe?.root === root) delete window.__suwe; };
  // test hook for the headless smoke: lets it poll the phase, marker and next due time, and click like a person would
  window.__suwe = { root, get phase() { return phase; }, get marker() { return markerAt(nowT() - t0Aim); }, get nextDue() { if (phase !== 'hop' || taps.length >= events.length) return null; return plan.leadMs + events[taps.length].at - (nowT() - t0Hop); }, get taps() { return taps.slice(); }, plan, isHouse, act };
  return { el: root, destroy };
}
export { sleep };
