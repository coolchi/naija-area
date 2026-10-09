import test from 'node:test'; import assert from 'node:assert/strict';
import * as D from '../server/core/games/draughts.js';
const put = (list, over = {}) => { const board = Array(64).fill(0); for (const [r, c, v] of list) board[r * 8 + c] = v; return { n: 2, board, turn: 0, quiet: 0, plies: 0, winner: null, last: null, ...over }; };
const mv = (a, b, path) => ({ from: a, to: b, path });
test('draughts: start position (12 each, dark squares), men move forward one step only, turn order and errors', () => {
  const st = D.newGame(2, () => 0); assert.deepEqual(D.view(st, 0).count, [12, 12]); assert.ok(st.board.every((v, i) => !v || ((Math.floor(i / 8) + (i % 8)) % 2 === 1))); assert.equal(st.turn, 0);
  assert.equal(D.play(st, 1, mv('2,1', '3,0')).error, 'NOT_YOUR_TURN'); assert.equal(D.play(st, 0, mv('5,0', '4,1')).ok, true); assert.equal(st.board[4 * 8 + 1], 1); assert.equal(st.turn, 1);
  assert.equal(D.play(st, 1, mv('2,1', '1,0')).error, 'ILLEGAL_MOVE', 'men do not move backwards'); assert.equal(D.play(st, 1, mv('2,3', '3,2')).ok, true);
});
test('draughts: captures are mandatory (simple moves refused while a jump exists)', () => {
  const st = put([[5, 2, 1], [4, 3, 3], [7, 0, 1]]); assert.equal(D.play(st, 0, mv('7,0', '6,1')).error, 'MUST_JUMP'); assert.equal(D.view(st, 0).mustJump, true); const r = D.play(st, 0, mv('5,2', '3,4')); assert.equal(r.ok, true); assert.equal(st.board[4 * 8 + 3], 0, 'captured piece removed'); assert.equal(r.info.captured, 1);
});
test('draughts: multi-jumps must continue; routes can be chosen; a man crowned mid-jump stops; king moves both ways', () => {
  const m = put([[5, 0, 1], [4, 1, 3], [2, 3, 3], [0, 5, 3]]); const lm = D.legalMoves(m, 0); assert.equal(lm.length, 1); assert.deepEqual(lm[0].path, ['3,2', '1,4'], 'the jump chains'); assert.equal(D.play(m, 0, mv('5,0', '3,2')).error, 'MUST_JUMP', 'cannot stop halfway'); const r = D.play(m, 0, mv('5,0', '1,4')); assert.equal(r.info.captured, 2); assert.equal(m.board[4 * 8 + 1] + m.board[2 * 8 + 3], 0);
  const c = put([[2, 1, 1], [1, 2, 3], [1, 4, 3], [3, 4, 3]]); const lc = D.legalMoves(c, 0); assert.equal(lc.length, 1); assert.equal(lc[0].to, '0,3'); D.play(c, 0, mv('2,1', '0,3')); assert.equal(c.board[0 * 8 + 3], 2, 'crowned'); assert.equal(c.board[1 * 8 + 4], 3, 'move ended at the crown: no further jump');
  const k = put([[4, 3, 2], [3, 4, 3]]); const lk = D.legalMoves(k, 0); assert.ok(lk.some(x => x.caps.length === 1), 'king jumps'); const k2 = put([[4, 3, 2]]); assert.equal(D.legalMoves(k2, 0).length, 4, 'king steps all four ways');
  const two = put([[6, 1, 1], [5, 2, 3], [3, 4, 3], [5, 4, 3], [3, 2, 3]]); const l2 = D.legalMoves(two, 0).filter(x => x.from === '6,1'); assert.ok(l2.length >= 2, 'two routes exist'); const a = l2[0], b = l2[1]; assert.notEqual(a.path.join(), b.path.join()); void a; void b;
});
test('draughts: win by no pieces or no legal move; resign; draw by quiet moves; view; random bot games end legally', () => {
  const w = put([[5, 2, 1], [4, 3, 3]]); D.play(w, 0, mv('5,2', '3,4')); assert.equal(w.winner, 0); assert.equal(D.play(w, 1, mv('0,1', '1,0')).error, 'GAME_OVER');
  const stuck = put([[0, 1, 1], [7, 0, 3]], { turn: 1 }); assert.equal(D.legalMoves(stuck, 1).length, 0);
  const f = D.newGame(2, () => 0); D.forfeit(f, 0); assert.equal(f.winner, 1); const q = put([[4, 3, 2], [0, 7, 4]], { quiet: 79 }); D.play(q, 0, mv('4,3', '3,2')); assert.equal(q.winner, 'draw');
  const v = D.view(D.newGame(2, () => 0), 0); assert.equal(v.mine, true); assert.ok(v.legal.length > 0); assert.equal(D.view(D.newGame(2, () => 0), 1).legal.length, 0);
  for (const seed0 of [3, 11]) { let seed = seed0; const rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const g = D.newGame(2, rng); for (let i = 0; i < 500 && g.winner == null; i++) { const r = D.play(g, g.turn, D.bot(g, g.turn, rng)); assert.ok(r.ok, JSON.stringify(r)); } assert.notEqual(g.winner, null); }
});
