// Dominoes (block game, double-six set of 28 tiles), 2 to 4 players. RULES (documented house rules):
//   Deal 7 tiles each; the rest is the boneyard (2 players: 14 tiles, 3 players: 7, 4 players: 0). A random player starts and may play any tile.
//   Afterwards you play a tile that matches a number at the LEFT or RIGHT end of the chain. If you cannot, you must draw from the boneyard until you can
//   play (if the boneyard is empty you pass automatically). First player to empty their hand wins. If nobody can move (blocked), the lowest pip total wins;
//   an exact tie for lowest is a draw (stakes refunded). Hands and the boneyard are hidden: views show only your own tiles plus everyone's tile COUNT.
//   A player who leaves (resigns or times out) is out; their tiles leave the game, play continues, last one standing wins.
// Move: { tile: '3-5', end: 'left'|'right' } or { action: 'draw' }. Tile ids are "lo-hi".
export const PIPS = 6, HAND = 7, MAX_ACTIONS = 600;
export const tileId = (a, b) => `${Math.min(a, b)}-${Math.max(a, b)}`;
export const makeSet = () => { const s = []; for (let a = 0; a <= PIPS; a++) for (let b = a; b <= PIPS; b++) s.push([a, b]); return s; };
const shuffle = (arr, rng) => { const r = arr.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
export function newGame(n, rng = Math.random) {
  if (!(n >= 2 && n <= 4)) throw new Error('dominoes needs 2 to 4 players'); const d = shuffle(makeSet(), rng); const hands = []; for (let i = 0; i < n; i++) hands.push(d.splice(0, HAND));
  return { n, hands, yard: d, chain: [], turn: Math.floor(rng() * n), out: Array(n).fill(false), passes: 0, winner: null, actions: 0, last: null };
}
const ends = (st) => (st.chain.length ? [st.chain[0][0], st.chain[st.chain.length - 1][1]] : null);
const fits = (st, t) => { const e = ends(st); return !e || t[0] === e[0] || t[1] === e[0] || t[0] === e[1] || t[1] === e[1]; };
export const playable = (st, seat) => st.hands[seat].filter(t => fits(st, t)).map(t => tileId(t[0], t[1]));
const alive = (st) => st.out.map((o, i) => (o ? -1 : i)).filter(i => i >= 0);
const next = (st, from) => { for (let k = 1; k <= st.n; k++) { const s = (from + k) % st.n; if (!st.out[s]) return s; } return from; };
const pips = (st, seat) => st.hands[seat].reduce((a, t) => a + t[0] + t[1], 0);
function blockedEnd(st) { const best = alive(st).map(s => [pips(st, s), s]).sort((a, b) => a[0] - b[0]); st.winner = best.length > 1 && best[0][0] === best[1][0] ? 'draw' : best[0][1]; }
/** after any action: skip players who can neither play nor draw; detect a block */
function settle(st) {
  if (st.winner != null) return;
  if (alive(st).some(s => st.hands[s].length === 0)) { st.winner = alive(st).find(s => st.hands[s].length === 0); return; }
  if (st.actions >= MAX_ACTIONS) return blockedEnd(st);
  for (let guard = 0; guard <= st.n; guard++) {
    if (st.yard.length || playable(st, st.turn).length) return;
    st.passes++; if (st.passes >= alive(st).length) return blockedEnd(st); st.last = { who: st.turn, pass: true }; st.turn = next(st, st.turn);
  }
}
export function play(st, seat, mv = {}) {
  if (st.winner != null) return { error: 'GAME_OVER' }; if (st.turn !== seat || st.out[seat]) return { error: 'NOT_YOUR_TURN' };
  const hand = st.hands[seat];
  if (mv.action === 'draw') {
    if (playable(st, seat).length) return { error: 'HAVE_PLAY', message: 'You have a tile that fits. Play it.' }; if (!st.yard.length) return { error: 'YARD_EMPTY', message: 'Nothing to draw.' };
    hand.push(st.yard.pop()); st.actions++; st.last = { who: seat, draw: true }; settle(st); return { ok: true, info: st.last, won: st.winner };
  }
  const m = /^([0-6])-([0-6])$/.exec(String(mv.tile || '')); if (!m) return { error: 'BAD_MOVE', message: 'Pick one of your tiles.' }; const a = +m[1], b = +m[2]; if (a > b) return { error: 'BAD_MOVE' };
  const idx = hand.findIndex(t => t[0] === a && t[1] === b); if (idx < 0) return { error: 'NO_SUCH_TILE', message: 'You do not have that tile.' };
  const e = ends(st); let end = mv.end; let t = hand[idx]; let placed;
  if (!e) { placed = [a, b]; end = 'right'; } else {
    const tryEnd = (which) => { if (which === 'left') { if (t[1] === e[0]) return [t[0], t[1]]; if (t[0] === e[0]) return [t[1], t[0]]; } else { if (t[0] === e[1]) return [t[0], t[1]]; if (t[1] === e[1]) return [t[1], t[0]]; } return null; };
    if (end !== 'left' && end !== 'right') { end = tryEnd('right') ? 'right' : 'left'; } placed = tryEnd(end); if (!placed) return { error: 'DOES_NOT_FIT', message: 'That tile does not match that end.' };
  }
  hand.splice(idx, 1); if (end === 'left') st.chain.unshift(placed); else st.chain.push(placed); st.passes = 0; st.actions++; st.last = { who: seat, tile: tileId(a, b), end };
  if (!hand.length) { st.winner = seat; return { ok: true, info: st.last, won: seat }; }
  st.turn = next(st, seat); settle(st); return { ok: true, info: st.last, won: st.winner };
}
export function forfeit(st, seat) {
  if (st.winner != null || st.out[seat]) return { ok: true, won: st.winner }; st.out[seat] = true; st.yard.push(...st.hands[seat]); st.hands[seat] = [];
  const left = alive(st); if (left.length === 1) { st.winner = left[0]; return { ok: true, won: st.winner }; }
  if (st.turn === seat) { st.turn = next(st, seat); settle(st); } return { ok: true, won: st.winner };
}
export function view(st, who) {
  const mine = st.turn === who && st.winner == null && !st.out[who]; const pl = mine ? playable(st, who) : [];
  return { game: 'dominoes', n: st.n, you: who, hand: st.hands[who].map(t => tileId(t[0], t[1])), counts: st.hands.map(h => h.length), yard: st.yard.length, chain: st.chain, ends: ends(st), turn: st.turn, mine, playable: pl,
    canDraw: mine && !pl.length && st.yard.length > 0, out: st.out, last: st.last, actions: st.actions, tiles: st.winner != null ? st.hands.map(h => h.map(t => tileId(t[0], t[1]))) : null };
}
export function bot(st, seat, rng = Math.random) { const pl = playable(st, seat); if (!pl.length) return { action: 'draw' }; const t = pl.slice().sort((a, b) => b.split('-').reduce((x, y) => x + +y, 0) - a.split('-').reduce((x, y) => x + +y, 0))[0]; void rng; return { tile: t }; }
