import test from 'node:test'; import assert from 'node:assert/strict';
import * as chess from '../server/core/games/chess.js';
import { fromFen, toFen, perft, legalMoves, inCheck, status, newGame, play, view, bot, forfeit, sq, name } from '../server/core/games/chess.js';

const mv = (p, from, to, promo) => legalMoves(p).filter(m => m.from === sq(from) && m.to === sq(to) && (!promo || m.promo === promo));
const rngOf = (seed) => { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };
// a table-game state in a given position, white = seat 0
const game = (fen) => { const st = newGame(2, () => 0.1); const p = fromFen(fen); Object.assign(st, { board: p.board, side: p.side, castle: p.castle, ep: p.ep, half: p.half, full: p.full, turn: p.side === 'w' ? 0 : 1, white: 0, hist: [toFen(p).split(' ').slice(0, 4).join(' ')] }); return st; };

test('chess perft: the move generator matches the published counts for six standard positions (start, Kiwipete, endgame, promotions, castling/check, mixed)', () => {
  const T = [['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', [20, 400, 8902, 197281]], ['r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1', [48, 2039, 97862]],
    ['8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1', [14, 191, 2812, 43238]], ['r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1', [6, 264, 9467]],
    ['rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8', [44, 1486, 62379]], ['r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10', [46, 2079, 89890]]];
  for (const [fen, exp] of T) { const p = fromFen(fen); assert.deepEqual(exp.map((_, i) => perft(p, i + 1)), exp, fen); }
});
test('chess: FEN round-trips and the start position has 20 moves', () => {
  const s = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'; assert.equal(toFen(fromFen(s)), s); assert.equal(legalMoves(fromFen(s)).length, 20);
  const e = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2'; assert.equal(toFen(fromFen(e)), e);
});
test('chess: fool\'s mate is checkmate, and the loser is the side to move', () => {
  const st = game('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'); for (const [f, t] of [['f2', 'f3'], ['e7', 'e5'], ['g2', 'g4'], ['d8', 'h4']]) { const r = play(st, st.turn, { from: f, to: t }); assert.equal(r.ok, true, f + t); }
  assert.equal(st.winner, 1); assert.equal(st.why, 'Checkmate'); assert.equal(st.last.san, 'Qxh4'.replace('x', '')); assert.equal(st.last.check, true); assert.deepEqual(play(st, 0, { from: 'a2', to: 'a3' }), { error: 'GAME_OVER' });
});
test('chess: stalemate is a draw (king not in check, no legal move) and checkmate is not', () => {
  const stale = fromFen('7k/5Q2/6K1/8/8/8/8/8 b - - 0 1'); assert.equal(inCheck(stale), false); assert.equal(legalMoves(stale).length, 0); assert.deepEqual([status(stale).over, status(stale).winner, status(stale).why], [true, null, 'Stalemate']);
  const mate = fromFen('7k/6Q1/6K1/8/8/8/8/8 b - - 0 1'); assert.equal(status(mate).winner, 'w'); assert.equal(status(mate).why, 'Checkmate');
  const st = game('7k/8/5QK1/8/8/8/8/8 w - - 0 1'); play(st, 0, { from: 'f6', to: 'f7' }); assert.equal(st.winner, 'draw'); assert.equal(st.why, 'Stalemate');
});
test('chess: castling works both sides, moves the rook, and is refused through check, out of check, after the king moved, or with a piece in the way', () => {
  const base = 'r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1'; const p = fromFen(base);
  assert.equal(mv(p, 'e1', 'g1').length, 1); assert.equal(mv(p, 'e1', 'c1').length, 1);
  const st = game(base); play(st, 0, { from: 'e1', to: 'g1' }); assert.equal(st.board[sq('g1')], 'K'); assert.equal(st.board[sq('f1')], 'R'); assert.equal(st.board[sq('h1')], ''); assert.equal(st.last.san, 'O-O'); assert.equal(st.castle.K, false); assert.equal(st.castle.Q, false); assert.equal(st.castle.k, true);
  const st2 = game(base); play(st2, 0, { from: 'e1', to: 'c1' }); assert.equal(st2.board[sq('d1')], 'R'); assert.equal(st2.board[sq('a1')], '');
  assert.equal(mv(fromFen('r3k2r/8/8/8/8/5r2/8/R3K2R w KQkq - 0 1'), 'e1', 'g1').length, 0, 'f1 is attacked');
  assert.equal(mv(fromFen('r3k2r/8/8/8/8/8/4r3/R3K2R w KQkq - 0 1'), 'e1', 'g1').length, 0, 'king in check');
  assert.equal(mv(fromFen('r3k2r/8/8/8/8/8/8/R3K2R w - - 0 1'), 'e1', 'g1').length, 0, 'no rights');
  assert.equal(mv(fromFen('r3k2r/8/8/8/8/8/8/RN2K2R w KQkq - 0 1'), 'e1', 'c1').length, 0, 'b1 knight in the way');
  assert.equal(mv(fromFen('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1'), 'e1', 'c1').length, 1); assert.equal(mv(fromFen('1r2k2r/8/8/8/8/8/8/R3K2R w KQk - 0 1'), 'e1', 'c1').length, 1, 'only the b-file attack: the king does not pass it, castling is allowed');
  const q = fromFen(base); const m = make1(q, 'a1', 'a2'); assert.equal(m.castle.Q, false, 'moving the a1 rook ends queenside rights'); const cap = make1(fromFen('r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1'), 'a8', 'a1'); assert.equal(cap.castle.Q, false, 'capturing the rook ends the right');
});
function make1(p, a, b) { return chess.make(p, mv(p, a, b)[0]); }
test('chess: en passant is available for exactly one move, removes the pawn, and cannot expose the king', () => {
  const st = game('4k3/3p4/8/4P3/8/8/8/4K3 b - - 0 1'); play(st, 1, { from: 'd7', to: 'd5' }); assert.equal(st.ep, sq('d6'));
  const r = play(st, 0, { from: 'e5', to: 'd6' }); assert.equal(r.ok, true); assert.equal(st.board[sq('d5')], '', 'the captured pawn is gone'); assert.equal(st.board[sq('d6')], 'P'); assert.deepEqual(st.lost.b, ['p']);
  const st2 = game('4k3/3p4/8/4P3/8/8/8/4K3 b - - 0 1'); play(st2, 1, { from: 'd7', to: 'd5' }); play(st2, 0, { from: 'e1', to: 'e2' }); play(st2, 1, { from: 'e8', to: 'e7' }); assert.deepEqual(play(st2, 0, { from: 'e5', to: 'd6' }).error, 'ILLEGAL_MOVE', 'the chance is gone');
  assert.equal(mv(fromFen('8/8/8/K2pP2r/8/8/8/4k3 w - d6 0 1'), 'e5', 'd6').length, 0, 'would leave the king in check along the rank');
});
test('chess: promotion: four choices, default queen, and the piece changes', () => {
  const p = fromFen('8/P6k/8/8/8/8/8/K7 w - - 0 1'); assert.equal(legalMoves(p).filter(m => m.from === sq('a7')).length, 4);
  for (const [pr, ch] of [['q', 'Q'], ['r', 'R'], ['b', 'B'], ['n', 'N']]) { const st = game('8/P6k/8/8/8/8/8/K7 w - - 0 1'); assert.equal(play(st, 0, { from: 'a7', to: 'a8', promo: pr }).ok, true); assert.equal(st.board[sq('a8')], ch); }
  const st = game('8/P6k/8/8/8/8/8/K7 w - - 0 1'); play(st, 0, { from: 'a7', to: 'a8' }); assert.equal(st.board[sq('a8')], 'Q'); assert.equal(st.last.promo, 'q');
  const cap = fromFen('1n5k/P7/8/8/8/8/8/K7 w - - 0 1'); assert.equal(mv(cap, 'a7', 'b8').length, 4, 'capture-promotion');
});
test('chess: a pinned piece cannot move off the line, and you cannot ignore check', () => {
  const pin = fromFen('4k3/4r3/8/8/8/8/4N3/4K3 w - - 0 1'); assert.equal(legalMoves(pin).filter(m => m.from === sq('e2')).length, 0);
  const chk = fromFen('4k3/8/8/8/8/8/3PP3/r3K3 w - - 0 1'); assert.equal(inCheck(chk), true); assert.ok(legalMoves(chk).every(m => m.from === sq('e1')));
  const st = game('4k3/8/8/8/8/8/3PP3/r3K3 w - - 0 1'); assert.equal(play(st, 0, { from: 'd2', to: 'd4' }).error, 'ILLEGAL_MOVE');
});
test('chess: automatic draws: not enough pieces, fifty moves, threefold repetition, and the length cap', () => {
  assert.equal(status(fromFen('8/8/4k3/8/8/3K4/8/8 w - - 0 1')).over, true); assert.equal(status(fromFen('8/8/4k3/8/8/3KN3/8/8 w - - 0 1')).over, true); assert.equal(status(fromFen('8/8/4kb2/8/8/3KB3/8/8 w - - 0 1')).over, true, 'bishops on the same colour');
  assert.equal(status(fromFen('8/8/4kb2/8/8/3K1B2/8/8 w - - 0 1')).over, false, 'opposite colours can mate in theory'); assert.equal(status(fromFen('8/8/4k3/8/8/3KP3/8/8 w - - 0 1')).over, false); assert.equal(status(fromFen('8/8/4k3/8/8/3KNN2/8/8 w - - 0 1')).over, false);
  assert.match(status(fromFen('8/8/4k3/8/8/3KR3/8/8 w - - 100 80')).why, /fifty/); assert.equal(status(fromFen('8/8/4k3/8/8/3KR3/8/8 w - - 99 80')).over, false);
  const st = game('4k3/8/8/8/8/8/8/R3K3 w - - 0 1'); for (let i = 0; i < 2; i++) for (const [f, t] of [['a1', 'a2'], ['e8', 'd8'], ['a2', 'a1'], ['d8', 'e8']]) play(st, st.turn, { from: f, to: t }); assert.equal(st.winner, 'draw'); assert.match(st.why, /three times/);
  const long = game('4k3/8/8/8/8/8/8/R3K3 w - - 0 1'); long.plies = chess.MAX_PLIES - 1; play(long, 0, { from: 'a1', to: 'a2' }); assert.equal(long.winner, 'draw'); assert.match(long.why, /nobody broke through/);
});
test('chess: table contract: turn order, bad input, colours are dealt at random, view shows only what the seat may do', () => {
  const a = newGame(2, () => 0.1), b = newGame(2, () => 0.9); assert.deepEqual([a.white, b.white], [0, 1]); assert.equal(a.turn, a.white); assert.equal(b.turn, b.white);
  assert.equal(play(b, 0, { from: 'e2', to: 'e4' }).error, 'NOT_YOUR_TURN'); assert.equal(play(a, 0, { from: 'e2', to: 'e5' }).error, 'ILLEGAL_MOVE'); assert.equal(play(a, 0, { from: 'zz', to: '' }).error, 'ILLEGAL_MOVE'); assert.equal(play(a, 0, { from: 'e7', to: 'e5' }).error, 'ILLEGAL_MOVE', 'not your piece');
  const v0 = view(a, 0), v1 = view(a, 1); assert.equal(v0.color, 'w'); assert.equal(v1.color, 'b'); assert.equal(v0.mine, true); assert.equal(v1.mine, false); assert.equal(v0.legal.length, 20); assert.deepEqual(v1.legal, []);
  play(a, 0, { from: 'e2', to: 'e4' }); assert.equal(view(a, 1).legal.length, 20); assert.equal(a.last.san, 'e4'); const f = forfeit(a, 0); assert.equal(f.won, 1); assert.equal(a.winner, 1);
});
test('chess bot: always legal, takes mate in one, and plays whole games to the end without ever making an illegal move', () => {
  const st = game('6k1/5ppp/8/8/8/8/8/R3K3 w - - 0 1'); assert.deepEqual([bot(st, 0, rngOf(1)).from, bot(st, 0, rngOf(1)).to], ['a1', 'a8'], 'back-rank mate');
  for (let g = 0; g < 6; g++) { const s = newGame(2, rngOf(g)); const rng = rngOf(100 + g); let n = 0; while (s.winner == null && n++ < 400) { const m = bot(s, s.turn, rng); const r = play(s, s.turn, m); assert.equal(r.ok, true, `game ${g} ply ${n}: ${JSON.stringify(m)} ${r.error}`); } assert.notEqual(s.winner, null, 'every game ends'); }
});
test('chess bot is weak: a plain material-greedy opponent beats it more often than not (sanity, not a strength claim)', () => {
  // the bot against a random mover: it should win clearly more than it loses
  let botWins = 0, randWins = 0; for (let g = 0; g < 8; g++) { const s = newGame(2, rngOf(g + 50)); const rng = rngOf(900 + g), r2 = rngOf(500 + g); const botSeat = g % 2; let n = 0;
    while (s.winner == null && n++ < 400) { if (s.turn === botSeat) play(s, s.turn, bot(s, s.turn, rng)); else { const lm = legalMoves({ board: s.board, side: s.side, castle: s.castle, ep: s.ep, half: s.half, full: s.full }); const m = lm[Math.floor(r2() * lm.length)]; play(s, s.turn, { from: name(m.from), to: name(m.to), promo: m.promo }); } }
    if (s.winner === botSeat) botWins++; else if (s.winner !== 'draw') randWins++; }
  assert.ok(botWins >= randWins, `bot ${botWins} vs random ${randWins}`);
});
