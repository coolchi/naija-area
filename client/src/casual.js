// Casual break games UI: Merge Am (tile puzzle), Pair Am (memory cards), Word of the Day. Original CSS art; no outside brands. Rewards are decided by the SERVER:
// Merge Am runs the shared engine locally and submits its move log, Pair Am asks the server to reveal each card, the word game only ever sees per-letter marks.
import { get, post, fmtN, h } from './api.js';
import * as M from '../../server/core/casual/merge.js';

const NAMES = { merge: 'Merge Am', memory: 'Pair Am', word: 'Word of the Day' };
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
  if (id === 'merge') stop = mergeGame(ui, body); else if (id === 'memory') stop = memoryGame(ui, body); else wordGame(ui, body);
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
