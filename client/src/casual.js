// Casual break games UI: Merge Am (tile puzzle), Pair Am (memory cards), Word of the Day. Original CSS art; no outside brands. Rewards are decided by the SERVER:
// Merge Am runs the shared engine locally and submits its move log, Pair Am asks the server to reveal each card, the word game only ever sees per-letter marks.
import { get, post, fmtN, h } from './api.js';
import * as M from '../../server/core/casual/merge.js';
import * as M3 from '../../server/core/casual/match3.js';
import * as D from '../../server/core/casual/danfo.js';

const NAMES = { merge: 'Merge Am', memory: 'Pair Am', word: 'Word of the Day', match3: 'Chop Am', danfo: 'Clear the Go-Slow' };
const SNACK = { puffpuff: '🍩', chinchin: '🍪', suya: '🍢', zobo: '🍹', plantain: '🍌' }; // puff-puff, chin chin, suya, zobo, plantain
const VEH = { danfo: ['🚌', '#f2c200'], keke: ['🛺', '#2e9b5e'], car: ['🚗', '#2e7dd1'], bus: ['🚐', '#8a5ad6'], lorry: ['🚚', '#6b7280'], molue: ['🚍', '#d6402f'] };
const SYM = { danfo: '🚌', keke: '🛺', suya: '🍢', akara: '🥯', ankara: '🧵', naira: '₦', agbada: '👘', gele: '👑' };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/** hub: list of the three games with best score / today's earnings (used by the phone Games tab) */
export async function hub(ui) {
  const d = await ui.guard(() => get('/api/casual')); if (!d) return [];
  return [h('div', { class: 'row sp' }, h('b', {}, '🎮 Break games'), h('span', { class: 'tag amber' }, `Today ${fmtN(d.earnedToday)} / ${fmtN(d.dailyCap)}`)),
    h('p', { class: 'mut' }, 'Quick games for a breather. Game money only: small rewards, capped every day (ESTIMATE numbers). No cash-out.'), d.rewardsOn ? '' : h('p', { class: 'mut' }, 'Your account is brand new: you can play now and rewards start in a few minutes.'),
    h('div', { class: 'list' }, d.games.map(g => h('div', {}, h('span', {}, h('b', {}, g.name), h('small', { class: 'mut' }, ` · ${g.blurb} (also at ${g.where})${g.best ? ` · best ${g.best}` : ''}${g.doneToday ? ' · done today ✓' : ''}`)), h('button', { class: 'btn small alt', 'data-casual': g.id, onclick: () => play(ui, g.id) }, 'Play'))))];
}

export function play(ui, id) {
  const body = h('div', { class: 'casual' }); let stop = null; ui.openSheet(NAMES[id], body, () => stop?.());
  if (id === 'merge') stop = mergeGame(ui, body); else if (id === 'memory') stop = memoryGame(ui, body); else if (id === 'match3') stop = match3Game(ui, body); else if (id === 'danfo') stop = danfoGame(ui, body); else wordGame(ui, body);
}

function resultBox(ui, r, label) {
  const bits = [h('b', {}, label), r.reward ? h('span', { class: 'tag green' }, `+${fmtN(r.reward)} game money`) : h('span', { class: 'tag' }, 'No reward this time'), r.note ? h('small', { class: 'mut' }, r.note) : ''];
  if (r.reward) ui.toast(`+${fmtN(r.reward)} game money. Nice one!`, 'money'); ui.g.refreshMe?.(); return h('div', { class: 'banner win casualres' }, ...bits);
}

// ------------------------------------------------------------------ Merge Am
function mergeGame(ui, body) {
  let run = null, game = null, log = '', done = false; const grid = h('div', { class: 'mgrid' }); const score = h('b', { id: 'mScore' }, '0'); const msg = h('div', {});
  const draw = () => { grid.replaceChildren(...game.grid.map(v => h('div', { class: `mt mt${Math.min(v, 2048)}`, 'data-v': v }, v ? String(v) : ''))); score.textContent = String(game.score); };
  const move = (d) => { if (done || !game) return; if (M.step(game, d)) { log += d; draw(); if (game.over) finish(); } };
  const finish = async () => { if (done) return; done = true; const r = await ui.guard(() => post('/api/casual/merge/submit', { runId: run.runId, moves: log })); msg.replaceChildren(r ? resultBox(ui, r, `Score ${r.score} · biggest tile ${r.best}`) : h('p', { class: 'mut' }, 'Could not count that game (too short or too fast). Try again.'), h('button', { class: 'btn alt', onclick: start }, 'Play again')); };
  const start = async () => { const r = await ui.guard(() => post('/api/casual/merge/start')); if (!r) return; run = r; game = M.newGame(r.seed); log = ''; done = false; msg.replaceChildren(); draw(); };
  const key = (e) => { const m = { ArrowLeft: 'L', ArrowRight: 'R', ArrowUp: 'U', ArrowDown: 'D' }[e.key]; if (m) { e.preventDefault(); e.stopPropagation(); move(m); } };
  document.addEventListener('keydown', key, true); let sx = 0, sy = 0; grid.addEventListener('pointerdown', (e) => { sx = e.clientX; sy = e.clientY; });
  grid.addEventListener('pointerup', (e) => { const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return; move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'R' : 'L') : (dy > 0 ? 'D' : 'U')); });
  const pad = h('div', { class: 'mpad' }, ['L', 'U', 'D', 'R'].map(d => h('button', { class: 'btn small', 'data-dir': d, onclick: () => move(d) }, { L: '⬅', U: '⬆', D: '⬇', R: '➡' }[d])));
  body.replaceChildren(h('div', { class: 'row sp' }, h('span', {}, 'Score ', score), h('button', { class: 'btn small ghost', id: 'mFinish', onclick: () => (log.length >= 20 ? finish() : ui.toast('Play at least 20 moves first.')) }, 'Finish and claim')), h('p', { class: 'mut' }, 'Slide with arrows or swipe. Equal tiles join. The server replays your moves to check the score.'), grid, pad, msg);
  start(); window.__merge = { move, get log() { return log; }, get game() { return game; } };
  return () => document.removeEventListener('keydown', key, true);
}

// ------------------------------------------------------------------ Pair Am
function memoryGame(ui, body) {
  let run = null, busy = false, cards = [], over = false; const msg = h('div', {}); const info = h('b', { id: 'pMoves' }, 'Tries 0');
  const cell = (i) => h('button', { class: 'mc', 'data-i': i, onclick: () => flip(i) }, '❓'); const grid = h('div', { class: 'mgrid mem' });
  const show = (i, sym, matched) => { const b = grid.children[i]; b.textContent = SYM[sym] || '?'; b.classList.add('up'); if (matched) b.classList.add('ok'); };
  const hide = (i) => { const b = grid.children[i]; b.textContent = '❓'; b.classList.remove('up'); };
  const flip = async (i) => {
    if (busy || over || grid.children[i].classList.contains('up')) return; busy = true;
    const r = await ui.guard(() => post('/api/casual/memory/flip', { runId: run.runId, i })); if (!r) { busy = false; return; }
    show(i, r.symbolName, r.result === 'match'); info.textContent = `Tries ${r.moves}`;
    if (r.result === 'match') { show(r.other, r.symbolName, true); cards.push(i, r.other); } else if (r.result === 'miss') { await sleep(800); hide(i); hide(r.other); }
    if (r.done) { over = true; msg.replaceChildren(resultBox(ui, r, `Done in ${r.moves} tries`), h('button', { class: 'btn alt', onclick: start }, 'Play again')); } busy = false;
  };
  const start = async () => { const r = await ui.guard(() => post('/api/casual/memory/start')); if (!r) return; run = r; over = false; busy = false; cards = []; info.textContent = 'Tries 0'; grid.replaceChildren(...Array.from({ length: r.cards }, (_, i) => cell(i))); msg.replaceChildren(); };
  body.replaceChildren(h('div', { class: 'row sp' }, info, h('span', { class: 'mut' }, 'Fewer tries = more game money')), grid, msg); start(); return null;
}

// ------------------------------------------------------------------ Word of the Day
function wordGame(ui, body) {
  let st = null, cur = ''; const board = h('div', { class: 'wgrid' }); const msg = h('div', {}); const keys = h('div', { class: 'wkeys' });
  const known = () => { const m = {}; for (const g of st.guesses) [...g.word].forEach((c, i) => { m[c] = Math.max(m[c] ?? -1, g.marks[i]); }); return m; };
  const draw = () => {
    const rows = []; for (let r = 0; r < st.maxGuesses; r++) { const g = st.guesses[r]; const letters = g ? g.word : r === st.guesses.length ? cur.padEnd(5) : '     ';
      rows.push(h('div', { class: 'wrow' }, [...letters].map((c, i) => h('span', { class: `wl ${g ? 'm' + g.marks[i] : ''}` }, c.trim().toUpperCase())))); } board.replaceChildren(...rows);
    const km = known(); keys.replaceChildren(...['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].map(row => h('div', { class: 'wkr' }, [...row].map(c => h('button', { class: `wk ${km[c] != null ? 'm' + km[c] : ''}`, 'data-k': c, onclick: () => type(c) }, c.toUpperCase())))), h('div', { class: 'wkr' }, h('button', { class: 'btn small', onclick: () => type('<') }, '⌫'), h('button', { class: 'btn small alt', id: 'wEnter', onclick: () => type('>') }, 'Enter')));
  };
  const type = async (c) => { if (!st || st.status !== 'playing') return; if (c === '<') cur = cur.slice(0, -1); else if (c === '>') { if (cur.length !== 5) return ui.toast('Type 5 letters.'); const r = await ui.guard(() => post('/api/casual/word/guess', { word: cur })); if (!r) return; st.guesses = r.guesses; st.status = r.status; cur = ''; if (r.status !== 'playing') { st.answer = r.answer; end(r); } } else if (cur.length < 5) cur += c; draw(); };
  const end = (r) => msg.replaceChildren(resultBox(ui, r || { reward: st.reward }, st.status === 'won' ? `Correct! The word was ${st.answer.toUpperCase()}` : `Not today. The word was ${st.answer.toUpperCase()}`), h('p', { class: 'mut' }, 'A new word comes tomorrow.'));
  const key = (e) => { if (!ui.sheetOpen) return; if (/^[a-z]$/i.test(e.key) && !e.ctrlKey && !e.metaKey) { e.stopPropagation(); e.preventDefault(); type(e.key.toLowerCase()); } else if (e.key === 'Backspace') { e.preventDefault(); e.stopPropagation(); type('<'); } else if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); type('>'); } };
  document.addEventListener('keydown', key, true); ui.onClose = () => document.removeEventListener('keydown', key, true);
  body.replaceChildren(h('p', { class: 'mut' }, 'Guess the 5-letter word in six tries. Green = right place, amber = in the word, grey = not there. Nigerian and everyday words.'), board, msg, keys);
  get('/api/casual/word').then(r => { st = r; draw(); if (r.status !== 'playing') end(); }).catch(() => ui.toast('Could not load today\'s word.'));
}

// ------------------------------------------------------------------ Chop Am (match-3)
function match3Game(ui, body) {
  let run = null, game = null, log = '', done = false, busy = false, sel = -1; const grid = h('div', { class: 'm3grid' }); const score = h('b', { id: 'm3Score' }, '0'); const left = h('b', { id: 'm3Left' }, String(M3.MOVES)); const chain = h('small', { class: 'mut', id: 'm3Chain' }, ''); const msg = h('div', {});
  const draw = (flash = []) => { grid.replaceChildren(...game.grid.map((v, i) => h('button', { class: `m3t k${v} ${i === sel ? 'sel' : ''} ${flash.includes(i) ? 'pop' : ''}`, 'data-i': i, 'aria-label': M3.SNACKS[v - 1], onpointerdown: (e) => down(i, e), onpointerup: (e) => up(i, e) }, SNACK[M3.SNACKS[v - 1]]))); score.textContent = String(game.score); left.textContent = String(game.movesLeft); chain.textContent = game.best > 1 ? ` · best chain x${game.best}` : ''; };
  const swap = async (a, b) => { // a, b: cell indexes of neighbours
    if (busy || done || !game) return false; const lo = Math.min(a, b), hi = Math.max(a, b); const dir = hi - lo === 1 && Math.floor(lo / M3.SIZE) === Math.floor(hi / M3.SIZE) ? 'r' : hi - lo === M3.SIZE ? 'd' : null; if (!dir) return false;
    busy = true; const r = M3.step(game, lo, dir); sel = -1; if (!r) { ui.toast('That swap makes no match.'); draw(); busy = false; return false; }
    log += M3.encode(lo, dir); draw(r.steps[0].cleared); await sleep(220); draw(); if (r.shuffled) ui.toast('No moves left: new snacks!'); busy = false; if (game.over) finish(); return true; };
  let downAt = null; const down = (i, e) => { downAt = { i, x: e.clientX, y: e.clientY }; };
  const up = (i, e) => { const d = downAt; downAt = null; if (!d) return; const dx = e.clientX - d.x, dy = e.clientY - d.y; if (Math.max(Math.abs(dx), Math.abs(dy)) > 18 && d.i === i) { const j = Math.abs(dx) > Math.abs(dy) ? d.i + (dx > 0 ? 1 : -1) : d.i + (dy > 0 ? M3.SIZE : -M3.SIZE); if (j >= 0 && j < M3.SIZE * M3.SIZE && !(Math.abs(dx) > Math.abs(dy) && Math.floor(j / M3.SIZE) !== Math.floor(d.i / M3.SIZE))) return void swap(d.i, j); }
    if (d.i !== i) { /* released on another cell: a drag between two cells */ return void swap(d.i, i); }
    if (sel < 0) { sel = i; draw(); } else if (sel === i) { sel = -1; draw(); } else if (Math.abs(sel - i) === 1 || Math.abs(sel - i) === M3.SIZE) swap(sel, i); else { sel = i; draw(); } };
  const finish = async () => { if (done) return; done = true; const r = await ui.guard(() => post('/api/casual/match3/submit', { runId: run.runId, moves: log })); msg.replaceChildren(r ? resultBox(ui, r, `Score ${r.score} · best chain x${r.bestChain}`) : h('p', { class: 'mut' }, 'Could not count that game.'), h('button', { class: 'btn alt', id: 'm3Again', onclick: start }, 'Play again')); };
  const start = async () => { const r = await ui.guard(() => post('/api/casual/match3/start')); if (!r) return; run = r; game = M3.newGame(r.seed); log = ''; done = false; busy = false; sel = -1; msg.replaceChildren(); draw(); };
  body.replaceChildren(h('div', { class: 'row sp' }, h('span', {}, 'Score ', score, chain), h('span', {}, 'Moves ', left), h('button', { class: 'btn small ghost', id: 'm3Finish', onclick: () => (log.length / 3 >= 5 ? finish() : ui.toast('Make at least 5 swaps first.')) }, 'Finish and claim')), h('p', { class: 'mut' }, 'Tap a snack, then a neighbour (or drag it) to swap. Line up 3 or more. Every move must make a match. Chains score more. 20 moves.'), grid, msg);
  start(); window.__match3 = { swap, get log() { return log; }, get game() { return game; }, get busy() { return busy; } }; return null;
}

// ------------------------------------------------------------------ Clear the Go-Slow (traffic-jam puzzle)
function danfoGame(ui, body) {
  let run = null, vs = null, log = [], done = false, sel = -1, level = null, info = null; const board = h('div', { class: 'dfboard' }); const mv = h('b', { id: 'dfMoves' }, '0'); const msg = h('div', {}); const lvlBox = h('div', { class: 'chips' }); const title = h('b', { id: 'dfTitle' }, '');
  const pct = 100 / D.SIZE; const place = (el, v) => { el.style.left = `${v.c * pct}%`; el.style.top = `${v.r * pct}%`; el.style.width = `${(v.dir === 'h' ? v.len : 1) * pct}%`; el.style.height = `${(v.dir === 'v' ? v.len : 1) * pct}%`; };
  const draw = () => { const cells = []; for (let k = 0; k < D.SIZE * D.SIZE; k++) { const r = Math.floor(k / D.SIZE), c = k % D.SIZE; cells.push(h('i', { class: `dfc ${r === D.EXIT_ROW && c === D.SIZE - 1 ? 'exit' : ''}`, 'data-cell': k, style: `left:${c * pct}%;top:${r * pct}%`, onclick: () => tapCell(r, c) })); }
    const cars = vs.map((v, i) => { const [ic, col] = VEH[v.kind] || ['🚗', '#888']; const el = h('div', { class: `dfv ${v.dir} ${i === 0 ? 'danfo' : ''} ${i === sel ? 'sel' : ''}`, 'data-v': i, style: `--vc:${col}`, onpointerdown: (e) => dragStart(i, e) }, h('span', {}, ic.repeat(1))); place(el, v); return el; });
    board.replaceChildren(...cells, ...cars); mv.textContent = String(log.length); };
  const slide = (i, d) => { if (done || !vs) return false; if (!D.slide(vs, i, d)) return false; log.push(`${i}:${d > 0 ? '+' : ''}${d}`); draw(); if (D.solved(vs)) win(); return true; };
  const tapCell = (r, c) => { if (sel < 0 || done) return; const v = vs[sel]; const d = v.dir === 'h' ? (r === v.r ? c - (c > v.c ? v.c + v.len - 1 : v.c) : 0) : (c === v.c ? r - (r > v.r ? v.r + v.len - 1 : v.r) : 0); if (d) slide(sel, d); };
  let drag = null; const dragStart = (i, e) => { if (done) return; e.preventDefault(); sel = i; const el = board.querySelector(`[data-v="${i}"]`); const rect = board.getBoundingClientRect(); const cell = rect.width / D.SIZE; const m = D.room(vs, i); drag = { i, x: e.clientX, y: e.clientY, cell, m, el, d: 0 }; el.setPointerCapture?.(e.pointerId); el.classList.add('sel'); };
  const dragMove = (e) => { if (!drag) return; const v = vs[drag.i]; const raw = (v.dir === 'h' ? e.clientX - drag.x : e.clientY - drag.y) / drag.cell; drag.d = Math.max(-drag.m.back, Math.min(drag.m.fwd, Math.round(raw))); const off = Math.max(-drag.m.back, Math.min(drag.m.fwd, raw)); drag.el.style.transform = v.dir === 'h' ? `translateX(${off * 100 / v.len}%)` : `translateY(${off * 100 / v.len}%)`; };
  const dragEnd = () => { if (!drag) return; const { i, d } = drag; drag = null; if (d) slide(i, d); else draw(); }; board.addEventListener('pointermove', dragMove); board.addEventListener('pointerup', dragEnd); board.addEventListener('pointercancel', dragEnd);
  const key = (e) => { if (sel < 0 || done) return; const v = vs[sel]; const d = { ArrowLeft: v.dir === 'h' ? -1 : 0, ArrowRight: v.dir === 'h' ? 1 : 0, ArrowUp: v.dir === 'v' ? -1 : 0, ArrowDown: v.dir === 'v' ? 1 : 0 }[e.key]; if (e.key.startsWith('Arrow')) { e.preventDefault(); e.stopPropagation(); if (d) slide(sel, d); } };
  document.addEventListener('keydown', key, true);
  const win = async () => { done = true; const carEl = board.querySelector('[data-v="0"]'); carEl?.classList.add('out'); await sleep(450); const r = await ui.guard(() => post('/api/casual/danfo/submit', { runId: run.runId, moves: log.join(',') }));
    msg.replaceChildren(r ? resultBox(ui, r, r.perfect ? `Out in ${r.moves}: a perfect run! 🎉` : `Out in ${r.moves} moves (par ${r.par})`) : h('p', { class: 'mut' }, 'Could not count that game.'), r && r.next && r.next !== level.id ? h('button', { class: 'btn alt', id: 'dfNext', onclick: () => start(r.next) }, 'Next level ▶') : '', h('button', { class: 'btn small ghost', onclick: () => start(level.id) }, 'Replay')); if (r) info = { ...info, unlocked: r.unlocked }; chips(); };
  const chips = () => lvlBox.replaceChildren(...Array.from({ length: info?.total || 0 }, (_, k) => k + 1).map(n => h('button', { class: `chip ${level && n === level.id ? 'on' : ''}`, disabled: n > (info?.unlocked || 1), 'data-lvl': n, onclick: () => start(n) }, String(n))));
  const reset = () => { vs = D.clone(level.vehicles); log = []; done = false; sel = -1; msg.replaceChildren(); draw(); };
  const start = async (lvl) => { const r = await ui.guard(() => post('/api/casual/danfo/start', lvl ? { level: lvl } : {})); if (!r) return; run = r; level = r.level; info = { unlocked: r.unlocked, total: r.total }; title.textContent = `${level.name} · par ${level.par}`; reset(); chips(); };
  body.replaceChildren(h('div', { class: 'row sp' }, title, h('span', {}, 'Moves ', mv), h('button', { class: 'btn small ghost', id: 'dfReset', onclick: reset }, '↺ Restart')), h('p', { class: 'mut' }, 'Slide the vehicles along their lanes (drag, or tap one then tap where it should go, or use the arrow keys) until the yellow danfo can drive out on the right. Fewest moves wins.'), board, msg, lvlBox);
  start(); window.__danfo = { slide, get log() { return log.join(','); }, get vs() { return vs; }, get level() { return level; }, get done() { return done; } }; return () => document.removeEventListener('keydown', key, true);
}
