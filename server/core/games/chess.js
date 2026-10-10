// Chess, 2 players, standard FIDE rules: check, checkmate, stalemate, castling (both sides, with the usual conditions), en passant, promotion (queen/rook/bishop/knight),
// and the automatic draws: insufficient material, fifty moves without a pawn move or capture (halfmove >= 100), threefold repetition. A hard cap of MAX_PLIES keeps a game short
// for a venue table (an engine-vs-engine style shuffle still ends: draw). There is no draw offer: a player who wants to stop can resign.
// Board: 64 cells, index 0 = a8 ... 63 = h1 (row 0 is rank 8). Pieces: 'PNBRQK' white, 'pnbrqk' black, '' empty.
// Seats: st.white says which SEAT plays white (picked at random when the game is dealt). st.turn is the SEAT to move (the shared contract for all table engines).
// Move (what the client sends): { from: 'e2', to: 'e4', promo?: 'q'|'r'|'b'|'n' }. Promotion defaults to a queen if the piece is not named.
export const MAX_PLIES = 300;
const FILES = 'abcdefgh';
export const sq = (name) => (8 - Number(name[1])) * 8 + FILES.indexOf(name[0]);
export const name = (i) => FILES[i % 8] + (8 - Math.floor(i / 8));
const isW = (p) => p !== '' && p === p.toUpperCase();
const colorOf = (p) => (p === '' ? null : isW(p) ? 'w' : 'b');
const VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
const KN = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
const KG = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
const DIAG = [[-1, -1], [-1, 1], [1, -1], [1, 1]], ORTH = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
function parseBoard(placement) { const b = []; for (const ch of placement) { if (ch === '/') continue; if (/[1-8]/.test(ch)) for (let i = 0; i < +ch; i++) b.push(''); else b.push(ch); } if (b.length !== 64) throw new Error('bad placement'); return b; }
/** a position from FEN (used by tests and by newGame with the standard start) */
export function fromFen(fen) {
  const [pl, side, castle, ep, half, full] = fen.split(' ');
  return { board: parseBoard(pl), side: side || 'w', castle: { K: castle?.includes('K'), Q: castle?.includes('Q'), k: castle?.includes('k'), q: castle?.includes('q') }, ep: ep && ep !== '-' ? sq(ep) : null, half: Number(half || 0), full: Number(full || 1) };
}
export function toFen(p) {
  let s = ''; for (let r = 0; r < 8; r++) { let e = 0; for (let c = 0; c < 8; c++) { const x = p.board[r * 8 + c]; if (!x) e++; else { if (e) { s += e; e = 0; } s += x; } } if (e) s += e; if (r < 7) s += '/'; }
  const c = (p.castle.K ? 'K' : '') + (p.castle.Q ? 'Q' : '') + (p.castle.k ? 'k' : '') + (p.castle.q ? 'q' : '');
  return `${s} ${p.side} ${c || '-'} ${p.ep == null ? '-' : name(p.ep)} ${p.half} ${p.full}`;
}
const clone = (p) => ({ board: p.board.slice(), side: p.side, castle: { ...p.castle }, ep: p.ep, half: p.half, full: p.full });

/** is square i attacked by colour `by`? */
export function attacked(b, i, by) {
  const r = Math.floor(i / 8), c = i % 8; const P = by === 'w' ? 'P' : 'p', N = by === 'w' ? 'N' : 'n', B = by === 'w' ? 'B' : 'b', R = by === 'w' ? 'R' : 'r', Q = by === 'w' ? 'Q' : 'q', K = by === 'w' ? 'K' : 'k';
  const pr = by === 'w' ? r + 1 : r - 1; // a white pawn attacks upward (to a smaller row), so it sits one row BELOW the target
  if (pr >= 0 && pr < 8) for (const dc of [-1, 1]) { const cc = c + dc; if (cc >= 0 && cc < 8 && b[pr * 8 + cc] === P) return true; }
  for (const [dr, dc] of KN) { const rr = r + dr, cc = c + dc; if (rr >= 0 && rr < 8 && cc >= 0 && cc < 8 && b[rr * 8 + cc] === N) return true; }
  for (const [dr, dc] of KG) { const rr = r + dr, cc = c + dc; if (rr >= 0 && rr < 8 && cc >= 0 && cc < 8 && b[rr * 8 + cc] === K) return true; }
  for (const [dr, dc] of DIAG) { let rr = r + dr, cc = c + dc; while (rr >= 0 && rr < 8 && cc >= 0 && cc < 8) { const x = b[rr * 8 + cc]; if (x) { if (x === B || x === Q) return true; break; } rr += dr; cc += dc; } }
  for (const [dr, dc] of ORTH) { let rr = r + dr, cc = c + dc; while (rr >= 0 && rr < 8 && cc >= 0 && cc < 8) { const x = b[rr * 8 + cc]; if (x) { if (x === R || x === Q) return true; break; } rr += dr; cc += dc; } }
  return false;
}
const kingSq = (b, side) => b.indexOf(side === 'w' ? 'K' : 'k');
export const inCheck = (p, side = p.side) => { const k = kingSq(p.board, side); return k >= 0 && attacked(p.board, k, side === 'w' ? 'b' : 'w'); };

function pseudo(p) {
  const out = []; const b = p.board; const me = p.side; const opp = me === 'w' ? 'b' : 'w';
  const push = (from, to, extra = {}) => out.push({ from, to, ...extra });
  for (let i = 0; i < 64; i++) {
    const x = b[i]; if (!x || colorOf(x) !== me) continue; const t = x.toLowerCase(); const r = Math.floor(i / 8), c = i % 8;
    if (t === 'p') {
      const dir = me === 'w' ? -1 : 1, start = me === 'w' ? 6 : 1, last = me === 'w' ? 0 : 7; const r1 = r + dir;
      const add = (to, extra = {}) => { if (Math.floor(to / 8) === last) for (const pr of ['q', 'r', 'b', 'n']) push(i, to, { ...extra, promo: pr }); else push(i, to, extra); };
      if (r1 >= 0 && r1 < 8 && !b[r1 * 8 + c]) { add(r1 * 8 + c); if (r === start && !b[(r + 2 * dir) * 8 + c]) push(i, (r + 2 * dir) * 8 + c, { double: true }); }
      for (const dc of [-1, 1]) { const cc = c + dc; if (cc < 0 || cc > 7 || r1 < 0 || r1 > 7) continue; const to = r1 * 8 + cc; if (b[to] && colorOf(b[to]) === opp) add(to, { capture: true }); else if (p.ep === to) push(i, to, { capture: true, enpassant: true }); }
    } else if (t === 'n' || t === 'k') {
      for (const [dr, dc] of t === 'n' ? KN : KG) { const rr = r + dr, cc = c + dc; if (rr < 0 || rr > 7 || cc < 0 || cc > 7) continue; const to = rr * 8 + cc; if (!b[to]) push(i, to); else if (colorOf(b[to]) === opp) push(i, to, { capture: true }); }
      if (t === 'k') { // castling: rights, empty squares between, king not in check and not passing through or landing on an attacked square
        const row = me === 'w' ? 7 : 0; if (i === row * 8 + 4 && !attacked(b, i, opp)) {
          if (p.castle[me === 'w' ? 'K' : 'k'] && b[row * 8 + 7] === (me === 'w' ? 'R' : 'r') && !b[row * 8 + 5] && !b[row * 8 + 6] && !attacked(b, row * 8 + 5, opp) && !attacked(b, row * 8 + 6, opp)) push(i, row * 8 + 6, { castle: 'k' });
          if (p.castle[me === 'w' ? 'Q' : 'q'] && b[row * 8] === (me === 'w' ? 'R' : 'r') && !b[row * 8 + 1] && !b[row * 8 + 2] && !b[row * 8 + 3] && !attacked(b, row * 8 + 3, opp) && !attacked(b, row * 8 + 2, opp)) push(i, row * 8 + 2, { castle: 'q' });
        }
      }
    } else {
      for (const [dr, dc] of t === 'b' ? DIAG : t === 'r' ? ORTH : [...DIAG, ...ORTH]) { let rr = r + dr, cc = c + dc; while (rr >= 0 && rr < 8 && cc >= 0 && cc < 8) { const to = rr * 8 + cc; if (!b[to]) push(i, to); else { if (colorOf(b[to]) === opp) push(i, to, { capture: true }); break; } rr += dr; cc += dc; } }
    }
  }
  return out;
}
/** play a (pseudo-legal) move on a COPY of the position and return it */
export function make(p, m) {
  const q = clone(p); const b = q.board; const x = b[m.from]; const t = x.toLowerCase(); const me = p.side; const captured = b[m.to] || (m.enpassant ? (me === 'w' ? 'p' : 'P') : '');
  b[m.to] = x; b[m.from] = '';
  if (m.enpassant) b[m.to + (me === 'w' ? 8 : -8)] = '';
  if (m.promo) b[m.to] = me === 'w' ? m.promo.toUpperCase() : m.promo;
  if (m.castle) { const row = me === 'w' ? 7 : 0; if (m.castle === 'k') { b[row * 8 + 5] = b[row * 8 + 7]; b[row * 8 + 7] = ''; } else { b[row * 8 + 3] = b[row * 8]; b[row * 8] = ''; } }
  q.ep = m.double ? (m.from + m.to) / 2 : null;
  if (t === 'k') { if (me === 'w') { q.castle.K = false; q.castle.Q = false; } else { q.castle.k = false; q.castle.q = false; } }
  for (const [s, k] of [[56, 'Q'], [63, 'K'], [0, 'q'], [7, 'k']]) if (m.from === s || m.to === s) q.castle[k] = false; // a rook that moved or was captured on its home square ends that right
  q.half = t === 'p' || captured ? 0 : p.half + 1; if (me === 'b') q.full++; q.side = me === 'w' ? 'b' : 'w'; q.captured = captured; return q;
}
/** every fully legal move (the mover's king is never left in check) */
export function legalMoves(p) { const me = p.side; return pseudo(p).filter(m => { const q = make(p, m); return !attacked(q.board, kingSq(q.board, me), me === 'w' ? 'b' : 'w'); }); }
/** perft: the number of leaf positions after `depth` plies (the standard way to prove a move generator correct) */
export function perft(p, depth) { if (depth === 0) return 1; const ms = legalMoves(p); if (depth === 1) return ms.length; let n = 0; for (const m of ms) n += perft(make(p, m), depth - 1); return n; }

function insufficient(b) {
  const pcs = b.filter(x => x && x.toLowerCase() !== 'k'); if (!pcs.length) return true; if (pcs.some(x => 'pPrRqQ'.includes(x))) return false;
  if (pcs.length === 1) return true; // a lone knight or bishop
  if (pcs.every(x => x.toLowerCase() === 'b')) { const sqc = b.map((x, i) => (x && x.toLowerCase() === 'b' ? (Math.floor(i / 8) + (i % 8)) % 2 : -1)).filter(v => v >= 0); return sqc.every(v => v === sqc[0]); } // bishops all on one colour
  return false;
}
const posKey = (p) => toFen(p).split(' ').slice(0, 4).join(' ');
/** where is the game after the position changed? returns { over, winnerColor|null, why } */
export function status(p, history = [], plies = 0) {
  const ms = legalMoves(p); const chk = inCheck(p);
  if (!ms.length) return chk ? { over: true, winner: p.side === 'w' ? 'b' : 'w', why: 'Checkmate', check: true } : { over: true, winner: null, why: 'Stalemate' };
  if (insufficient(p.board)) return { over: true, winner: null, why: 'Draw: not enough pieces to checkmate', check: chk };
  if (p.half >= 100) return { over: true, winner: null, why: 'Draw: fifty moves without a capture or pawn move', check: chk };
  const k = posKey(p); if (history.filter(h => h === k).length >= 3) return { over: true, winner: null, why: 'Draw: the same position three times', check: chk };
  if (plies >= MAX_PLIES) return { over: true, winner: null, why: `Draw: ${MAX_PLIES / 2} moves each and nobody broke through`, check: chk };
  return { over: false, check: chk };
}

// ------------------------------------------------------------------ table-game contract
export const newGame = (n = 2, rng = Math.random) => {
  const p = fromFen(`${START} w KQkq - 0 1`); const white = rng() < 0.5 ? 0 : 1;
  return { n: 2, ...p, white, turn: white, plies: 0, hist: [posKey(p)], winner: null, last: null, lost: { w: [], b: [] }, why: null };
};
const seatColor = (st, seat) => (seat === st.white ? 'w' : 'b');
const asPos = (st) => ({ board: st.board, side: st.side, castle: st.castle, ep: st.ep, half: st.half, full: st.full });
export function play(st, seat, mv = {}) {
  if (st.winner != null) return { error: 'GAME_OVER' }; if (st.turn !== seat) return { error: 'NOT_YOUR_TURN' };
  const from = /^[a-h][1-8]$/.test(String(mv.from)) ? sq(mv.from) : -1, to = /^[a-h][1-8]$/.test(String(mv.to)) ? sq(mv.to) : -1; if (from < 0 || to < 0) return { error: 'ILLEGAL_MOVE', message: 'Pick a piece and a square.' };
  const p = asPos(st); const cands = legalMoves(p).filter(m => m.from === from && m.to === to); if (!cands.length) return { error: 'ILLEGAL_MOVE', message: inCheck(p) ? 'Your king is in check: that does not help.' : 'That move is not allowed.' };
  let m = cands[0]; if (cands.length > 1) { const want = String(mv.promo || 'q').toLowerCase(); m = cands.find(c => c.promo === want) || cands.find(c => c.promo === 'q'); }
  const q = make(p, m); const san = describe(p, m); st.board = q.board; st.side = q.side; st.castle = q.castle; st.ep = q.ep; st.half = q.half; st.full = q.full; st.plies++; st.turn = 1 - seat;
  if (q.captured) st.lost[colorOf(q.captured)].push(q.captured.toLowerCase()); st.hist.push(posKey(q));
  const s = status(q, st.hist, st.plies); st.last = { who: seat, from: name(m.from), to: name(m.to), san, capture: !!q.captured, promo: m.promo || null, castle: m.castle || null, check: !!s.check };
  if (s.over) { st.winner = s.winner ? (s.winner === seatColor(st, 0) ? 0 : 1) : 'draw'; st.why = s.why; }
  return { ok: true, info: st.last, won: st.winner };
}
/** short readable move text (not full SAN disambiguation: enough for a move list) */
function describe(p, m) { const x = p.board[m.from]; const t = x.toLowerCase(); if (m.castle) return m.castle === 'k' ? 'O-O' : 'O-O-O'; return `${t === 'p' ? '' : t.toUpperCase()}${m.capture ? (t === 'p' ? FILES[m.from % 8] : '') + 'x' : ''}${name(m.to)}${m.promo ? '=' + m.promo.toUpperCase() : ''}`; }
export function forfeit(st, seat) { if (st.winner == null) { st.winner = 1 - seat; st.why = 'Resigned or out of time'; } return { ok: true, won: st.winner }; }
export function view(st, who) {
  const mineTurn = st.turn === who && st.winner == null; const p = asPos(st); const lm = mineTurn ? legalMoves(p) : [];
  return { game: 'chess', you: who, color: seatColor(st, who), white: st.white, board: st.board.slice(), turn: st.turn, mine: mineTurn, check: st.winner == null && inCheck(p), legal: lm.map(m => ({ from: name(m.from), to: name(m.to), promo: m.promo || undefined })), last: st.last, plies: st.plies, lost: st.lost, why: st.why, fen: toFen(p) };
}
/** a deliberately WEAK practice bot: it always plays a legal move, takes mate in one, otherwise looks one reply ahead for material, with a lot of random noise */
export function bot(st, seat, rng = Math.random) {
  const p = asPos(st); const me = p.side; const ms = legalMoves(p); const score = (pos, side) => pos.board.reduce((a, x) => a + (x ? (colorOf(x) === side ? 1 : -1) * VAL[x.toLowerCase()] : 0), 0);
  let best = null, bestS = -1e9;
  for (const m of ms) {
    const q = make(p, m); const reply = legalMoves(q); let s;
    if (!reply.length && inCheck(q)) s = 1e6; else if (!reply.length) s = -50; // mate in one, or do not stalemate by accident
    else { let worst = 1e9; for (const r of reply) { const v = score(make(q, r), me); if (v < worst) worst = v; } s = worst; }
    s += (rng() - 0.5) * 360; if (m.promo === 'q') s += 200; if (s > bestS) { bestS = s; best = m; }
  }
  return { from: name(best.from), to: name(best.to), promo: best.promo };
}
