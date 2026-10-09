// Ludo (basic house rules), 2 to 4 players. Pure functions; the SERVER rolls the die (rng injected so tests are deterministic).
//   Board: a shared ring of 52 cells. Each seat has a start cell (13 apart; with 2 players seats sit opposite), four tokens, a base, and a 6-cell home column.
//   A token's progress p: -1 = in base, 0 = on its start cell, 1..50 = further round the ring, 51..55 = home column, 56 = home (finished).
//   Roll a 6 to bring a token out of base (to p = 0). You must move if you can; no legal move = the turn passes. A 6 gives another roll; a third 6 in a row
//   is forfeited. An exact roll is needed to finish (p + die <= 56). Landing on a ring cell holding rivals' tokens sends them all back to base, UNLESS the cell is
//   a safe cell (the four start cells and the four star cells). First player with all four tokens home wins. A move cap ends endless games (most progress wins).
export const SAFE = new Set([0, 13, 26, 39, 8, 21, 34, 47]);
export const TOKENS = 4, HOME = 56, RING = 52, MAX_ACTIONS = 900;
export const COLOURS = ['red', 'green', 'yellow', 'blue'];
export const startCells = (n) => (n === 2 ? [0, 2] : [0, 1, 2, 3].slice(0, n));       // which of the four corners each seat uses
export const absCell = (st, seat, p) => (startCells(st.n)[seat] * 13 + p) % RING;
export function newGame(n, rng = Math.random) {
  if (!(n >= 2 && n <= 4)) throw new Error('ludo needs 2 to 4 players');
  return { n, tokens: Array.from({ length: n }, () => Array(TOKENS).fill(-1)), turn: Math.floor(rng() * n), die: null, sixes: 0, out: Array(n).fill(false), winner: null, actions: 0, last: null };
}
const alive = (st) => st.out.map((o, i) => (o ? -1 : i)).filter(i => i >= 0);
function nextSeat(st, from) { for (let k = 1; k <= st.n; k++) { const s = (from + k) % st.n; if (!st.out[s]) return s; } return from; }
export function legalTokens(st, seat, die = st.die) {
  if (die == null) return []; const out = [];
  st.tokens[seat].forEach((p, i) => { if (p === -1) { if (die === 6) out.push(i); } else if (p + die <= HOME) out.push(i); }); return out;
}
const progress = (st, seat) => st.tokens[seat].reduce((a, p) => a + (p < 0 ? 0 : p + 1), 0);
function finishCap(st) { if (st.actions < MAX_ACTIONS) return; const best = alive(st).sort((a, b) => progress(st, b) - progress(st, a)); st.winner = best[0]; }
export function roll(st, seat, rng = Math.random) {
  if (st.winner != null) return { error: 'GAME_OVER' }; if (st.turn !== seat) return { error: 'NOT_YOUR_TURN' }; if (st.die != null) return { error: 'MOVE_FIRST', message: 'Pick a token to move.' };
  const d = 1 + Math.floor(rng() * 6); st.actions++;
  if (d === 6 && st.sixes >= 2) { st.sixes = 0; st.turn = nextSeat(st, seat); st.last = { who: seat, die: d, note: 'third six: turn lost' }; finishCap(st); return { ok: true, info: st.last, won: st.winner }; }
  st.die = d; st.last = { who: seat, die: d };
  if (!legalTokens(st, seat).length) { st.die = null; st.sixes = 0; st.turn = nextSeat(st, seat); st.last = { who: seat, die: d, note: 'no move' }; }
  finishCap(st); return { ok: true, info: st.last, won: st.winner };
}
export function move(st, seat, token) {
  if (st.winner != null) return { error: 'GAME_OVER' }; if (st.turn !== seat) return { error: 'NOT_YOUR_TURN' }; if (st.die == null) return { error: 'ROLL_FIRST', message: 'Roll the die first.' };
  if (!Number.isInteger(token) || !legalTokens(st, seat).includes(token)) return { error: 'ILLEGAL_MOVE', message: 'That token cannot move with this roll.' };
  const d = st.die; const p = st.tokens[seat][token]; const np = p === -1 ? 0 : p + d; st.tokens[seat][token] = np; st.actions++; const info = { who: seat, die: d, token, to: np, captured: 0 };
  if (np <= 50) { const cell = absCell(st, seat, np); if (!SAFE.has(cell)) for (const o of alive(st)) if (o !== seat) st.tokens[o].forEach((q, i) => { if (q >= 0 && q <= 50 && absCell(st, o, q) === cell) { st.tokens[o][i] = -1; info.captured++; } }); }
  info.home = np === HOME; st.die = null; st.last = info;
  if (st.tokens[seat].every(q => q === HOME)) { st.winner = seat; return { ok: true, info, won: seat }; }
  if (d === 6) st.sixes++; else { st.sixes = 0; st.turn = nextSeat(st, seat); }
  if (d === 6 && st.sixes >= 3) { st.sixes = 0; st.turn = nextSeat(st, seat); }
  finishCap(st); return { ok: true, info, won: st.winner };
}
/** a player leaves (resigns or times out). Their tokens leave the board. Last one standing wins. */
export function forfeit(st, seat) {
  if (st.winner != null || st.out[seat]) return { ok: true, won: st.winner }; st.out[seat] = true; st.tokens[seat] = Array(TOKENS).fill(-1);
  const left = alive(st); if (left.length === 1) { st.winner = left[0]; return { ok: true, won: st.winner }; }
  if (st.turn === seat) { st.die = null; st.sixes = 0; st.turn = nextSeat(st, seat); } return { ok: true, won: null };
}
export function view(st, who) {
  const mine = st.turn === who && st.winner == null && !st.out[who];
  return { game: 'ludo', n: st.n, you: who, corners: startCells(st.n), tokens: st.tokens, turn: st.turn, mine, die: st.die, canRoll: mine && st.die == null, legal: mine && st.die != null ? legalTokens(st, who) : [], out: st.out, last: st.last, actions: st.actions, safe: [...SAFE], cells: st.tokens.map((ts, s) => ts.map(p => (p >= 0 && p <= 50 ? absCell(st, s, p) : null))) };
}
