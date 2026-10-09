// Draughts (English/American-style checkers rules), 2 players, 8x8. RULES (our documented variant):
//   Dark squares only ((row+col) odd). Seat 0 starts at the bottom (rows 5-7) and moves UP; seat 1 starts at the top (rows 0-2) and moves DOWN.
//   A man moves one square diagonally forward. A king (a man that reaches the far row) moves one square diagonally in any direction.
//   CAPTURES ARE MANDATORY: if any jump exists you must jump. Jumping goes over an adjacent enemy piece to the empty square behind it. A man captures forward only,
//   a king in any direction. MULTI-JUMPS: after a jump you must keep jumping with the same piece while another jump is available (you may choose the route).
//   A man that reaches the far row during a jump is crowned and its move ends there. You lose if you have no pieces or no legal move.
//   Draw: 80 plies (40 moves each) without a capture or a man move, or 400 plies in total.
// Move: { from: 'r,c', to: 'r,c' (the final landing square), path?: ['r,c', ...] (to pick between two routes ending on the same square) }.
export const SIZE = 8, DRAW_QUIET = 80, MAX_PLIES = 400;
const MAN = [1, 3], KING = [2, 4]; // by seat: [man code, king code] = seat 0: 1/2, seat 1: 3/4
const mine = (seat, v) => v === (seat === 0 ? 1 : 3) || v === (seat === 0 ? 2 : 4);
const isKing = (v) => v === 2 || v === 4;
const at = (b, r, c) => b[r * SIZE + c];
const inb = (r, c) => r >= 0 && r < SIZE && c >= 0 && c < SIZE;
export const newGame = (n = 2, rng = Math.random) => {
  const board = Array(64).fill(0); for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) if ((r + c) % 2 === 1) { if (r < 3) board[r * 8 + c] = 3; else if (r > 4) board[r * 8 + c] = 1; }
  return { n: 2, board, turn: rng() < 0.5 ? 0 : 1, quiet: 0, plies: 0, winner: null, last: null };
};
const dirs = (seat, v) => (isKing(v) ? [[-1, -1], [-1, 1], [1, -1], [1, 1]] : seat === 0 ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]]);
const crownRow = (seat) => (seat === 0 ? 0 : SIZE - 1);
const key = (r, c) => `${r},${c}`;
function jumpsFrom(board, seat, r, c, v, caps, path, out) {
  let any = false;
  for (const [dr, dc] of dirs(seat, v)) {
    const mr = r + dr, mc = c + dc, lr = r + 2 * dr, lc = c + 2 * dc; if (!inb(lr, lc)) continue; const mv = at(board, mr, mc); if (!mv || mine(seat, mv) || caps.includes(key(mr, mc))) continue; if (at(board, lr, lc) !== 0) continue;
    any = true; const crowned = !isKing(v) && lr === crownRow(seat); const nv = crowned ? v + 1 : v;
    // the capturing piece has left its start square, so treat that square as empty for later hops
    if (crowned) { out.push({ path: path.concat(key(lr, lc)), caps: caps.concat(key(mr, mc)) }); continue; } // crowning ends the move
    const b2 = board.slice(); b2[r * 8 + c] = 0; jumpsFrom(b2, seat, lr, lc, nv, caps.concat(key(mr, mc)), path.concat(key(lr, lc)), out);
  }
  if (!any && path.length) out.push({ path, caps });
}
export function legalMoves(st, seat) {
  const b = st.board; const jumps = []; const steps = [];
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) { const v = at(b, r, c); if (!v || !mine(seat, v)) continue;
    const out = []; const bb = b.slice(); jumpsFrom(bb, seat, r, c, v, [], [], out); for (const o of out) jumps.push({ from: key(r, c), to: o.path[o.path.length - 1], path: o.path, caps: o.caps });
    if (!jumps.length) for (const [dr, dc] of dirs(seat, v)) { const nr = r + dr, nc = c + dc; if (inb(nr, nc) && at(b, nr, nc) === 0) steps.push({ from: key(r, c), to: key(nr, nc), path: [key(nr, nc)], caps: [] }); } }
  return jumps.length ? jumps : steps;
}
function finish(st) {
  const lm = legalMoves(st, st.turn); if (!lm.length) { st.winner = 1 - st.turn; return; }
  if (st.quiet >= DRAW_QUIET || st.plies >= MAX_PLIES) st.winner = 'draw';
}
export function play(st, seat, mv = {}) {
  if (st.winner != null) return { error: 'GAME_OVER' }; if (st.turn !== seat) return { error: 'NOT_YOUR_TURN' };
  const lm = legalMoves(st, seat); let cands = lm.filter(m => m.from === String(mv.from) && m.to === String(mv.to));
  if (Array.isArray(mv.path) && cands.length > 1) cands = cands.filter(m => m.path.join('|') === mv.path.join('|'));
  if (!cands.length) { const forced = lm[0]?.caps.length; return { error: forced ? 'MUST_JUMP' : 'ILLEGAL_MOVE', message: forced ? 'You must make a capture.' : 'That move is not allowed.' }; }
  const m = cands[0]; const [fr, fc] = m.from.split(',').map(Number); let v = at(st.board, fr, fc); const man = !isKing(v); st.board[fr * 8 + fc] = 0;
  for (const k of m.caps) { const [cr, cc] = k.split(',').map(Number); st.board[cr * 8 + cc] = 0; }
  const [tr, tc] = m.to.split(',').map(Number); if (man && tr === crownRow(seat)) v += 1; st.board[tr * 8 + tc] = v;
  st.plies++; st.quiet = m.caps.length || man ? 0 : st.quiet + 1; st.turn = 1 - seat; st.last = { who: seat, from: m.from, to: m.to, captured: m.caps.length, crowned: man && tr === crownRow(seat) }; finish(st);
  return { ok: true, info: st.last, won: st.winner };
}
export function forfeit(st, seat) { if (st.winner == null) st.winner = 1 - seat; return { ok: true, won: st.winner }; }
export function view(st, who) {
  const mineTurn = st.turn === who && st.winner == null; const lm = mineTurn ? legalMoves(st, who) : [];
  return { game: 'draughts', you: who, board: st.board, turn: st.turn, mine: mineTurn, legal: lm.map(m => ({ from: m.from, to: m.to, path: m.path, captures: m.caps.length })), mustJump: lm.some(m => m.caps.length > 0), last: st.last, plies: st.plies, quiet: st.quiet,
    count: [0, 1].map(s => st.board.filter(v => v && mine(s, v)).length) };
}
export function bot(st, seat, rng = Math.random) { const lm = legalMoves(st, seat); const best = Math.max(...lm.map(m => m.caps.length)); const pick = lm.filter(m => m.caps.length === best); const m = pick[Math.floor(rng() * pick.length)]; return { from: m.from, to: m.to, path: m.path }; }
export { MAN, KING };
