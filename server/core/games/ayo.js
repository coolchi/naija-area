// Ayo (Oware-style mancala), two players, standard rules:
//   12 houses in two rows of 6, 4 seeds each. Pits 0-5 belong to side 'a', 6-11 to side 'b'. Sowing goes counter-clockwise (index +1, wrapping);
//   a house with 12+ seeds skips its own origin house. If the LAST seed lands in an opponent house making it 2 or 3, capture it, and keep capturing
//   backwards while the previous houses are also opponent houses holding 2 or 3. Grand slam (a capture that would take ALL opponent seeds) captures nothing.
//   If the opponent has no seeds you must make a move that gives them seeds, if one exists. If the player to move has no legal move the game ends and
//   each side keeps the seeds on its own side. First to 25 captured seeds wins; 24-24 is a draw. (A move cap ends endless loops the same way.)
export const START = 4, WIN = 25, MAX_MOVES = 400;
export const newGame = (rng = Math.random) => ({ pits: Array(12).fill(START), store: { a: 0, b: 0 }, turn: rng() < 0.5 ? 'a' : 'b', moves: 0, winner: null, last: null });
export const other = (p) => (p === 'a' ? 'b' : 'a');
const base = (p) => (p === 'a' ? 0 : 6);
const sideSum = (st, p) => st.pits.slice(base(p), base(p) + 6).reduce((a, b) => a + b, 0);
const owns = (p, i) => i >= base(p) && i < base(p) + 6;
/** houses (0..5, relative to the mover's side) the player may play */
export function legalMoves(st, p) {
  const mine = []; for (let k = 0; k < 6; k++) if (st.pits[base(p) + k] > 0) mine.push(k);
  if (sideSum(st, other(p)) > 0) return mine;
  const firstOpp = p === 'a' ? 6 : 12; return mine.filter(k => base(p) + k + st.pits[base(p) + k] >= firstOpp); // must reach the opponent's side
}
export function simulate(st, p, k) { // returns { pits, captured, last }
  const pits = st.pits.slice(); let i = base(p) + k; let n = pits[i]; pits[i] = 0; let pos = i;
  while (n > 0) { pos = (pos + 1) % 12; if (pos === i) continue; pits[pos]++; n--; }
  let captured = 0; const opp = other(p);
  if (owns(opp, pos) && (pits[pos] === 2 || pits[pos] === 3)) {
    const trial = pits.slice(); let cap = 0, j = pos; while (owns(opp, j) && (trial[j] === 2 || trial[j] === 3)) { cap += trial[j]; trial[j] = 0; j = (j + 11) % 12; }
    const oppLeft = trial.slice(base(opp), base(opp) + 6).reduce((a, b) => a + b, 0);
    if (oppLeft > 0) { captured = cap; for (let q = 0; q < 12; q++) pits[q] = trial[q]; } // grand slam: no capture
  }
  return { pits, captured, last: pos };
}
function settle(st) {
  if (st.store.a >= WIN) st.winner = 'a'; else if (st.store.b >= WIN) st.winner = 'b';
  else if (st.moves >= MAX_MOVES || !legalMoves(st, st.turn).length) { st.store.a += sideSum(st, 'a'); st.store.b += sideSum(st, 'b'); st.pits.fill(0); st.winner = st.store.a === st.store.b ? 'draw' : st.store.a > st.store.b ? 'a' : 'b'; }
  return st.winner;
}
export function play(st, p, k) {
  if (st.winner) return { error: 'GAME_OVER' }; if (st.turn !== p) return { error: 'NOT_YOUR_TURN' };
  if (!Number.isInteger(k) || k < 0 || k > 5) return { error: 'BAD_MOVE' }; if (st.pits[base(p) + k] === 0) return { error: 'EMPTY_HOUSE', message: 'That house is empty.' };
  if (!legalMoves(st, p).includes(k)) return { error: 'MUST_FEED', message: 'Your opponent has no seeds: you must play a move that gives them some.' };
  const r = simulate(st, p, k); st.pits = r.pits; st.store[p] += r.captured; st.turn = other(p); st.moves++; st.last = { who: p, house: k, captured: r.captured, landed: r.last };
  settle(st); return { ok: true, info: st.last, won: st.winner };
}
export const view = (st, who) => ({ game: 'ayo', pits: st.pits, store: st.store, you: who, mine: st.turn === who && !st.winner, legal: st.turn === who && !st.winner ? legalMoves(st, who) : [], last: st.last, moves: st.moves });
