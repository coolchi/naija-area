import test from 'node:test'; import assert from 'node:assert/strict';
import * as A from '../server/core/games/ayo.js';
const mk = (pits, over = {}) => ({ n: 2, pits, store: [0, 0], turn: 0, moves: 0, winner: null, last: null, ...over });
const H = (k) => ({ house: k });
test('ayo: start position, a simple move, own-house/empty/turn errors', () => {
  const st = A.newGame(2, () => 0); assert.deepEqual(st.pits, Array(12).fill(4)); assert.equal(st.turn, 0); assert.equal(A.play(st, 1, H(0)).error, 'NOT_YOUR_TURN'); assert.equal(A.play(st, 0, H(9)).error, 'BAD_MOVE');
  assert.equal(A.play(st, 0, H(0)).ok, true); assert.deepEqual(st.pits.slice(0, 6), [0, 5, 5, 5, 5, 4]); assert.equal(st.turn, 1); assert.equal(A.play(st, 1, H(0)).ok, true);
  st.pits[1] = 0; assert.equal(A.play(st, 0, H(1)).error, 'EMPTY_HOUSE');
});
test('ayo: capture of 2s and 3s chains backwards, grand slam captures nothing, 12+ seeds skip the origin house', () => {
  let st = mk([0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 5]); A.play(st, 0, H(5)); assert.equal(st.store[0], 5); assert.equal(st.pits[11], 5);
  st = mk([0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0]); A.play(st, 0, H(5)); assert.equal(st.store[0], 0, 'grand slam captures nothing');
  st = mk([13, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]); const r = A.simulate(st, 0, 0); assert.equal(r.pits[0], 0, 'origin skipped'); assert.equal(r.pits.reduce((a, b) => a + b, 0) + r.captured, 19);
});
test('ayo: must feed a starving opponent; no legal move ends the game (sides keep own seeds); 25 wins; 24-24 draws; forfeit; view; bot plays legal', () => {
  let st = mk([1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0]); assert.deepEqual(A.legalMoves(st, 0), [3]); assert.equal(A.play(st, 0, H(0)).error, 'MUST_FEED');
  const e = mk([0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0]); A.play(e, 0, H(5)); assert.equal(e.store[0], 2); assert.equal(e.store[1], 1, 'stuck side keeps its own seed'); assert.equal(e.winner, 0); assert.equal(e.pits.reduce((a, b) => a + b, 0), 0);
  const w = mk([0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 4], { store: [22, 0] }); A.play(w, 0, H(5)); assert.equal(w.winner, 0);
  const d = mk([0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], { store: [22, 23] }); A.play(d, 0, H(5)); assert.equal(d.winner, 'draw');
  const f = A.newGame(2, () => 0); A.forfeit(f, 0); assert.equal(f.winner, 1); const v = A.view(A.newGame(2, () => 0), 0); assert.equal(v.mine, true); assert.deepEqual(A.view(A.newGame(2, () => 0), 1).legal, []);
  let seed = 4; const rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const g = A.newGame(2, rng); for (let i = 0; i < 1000 && g.winner == null; i++) { const r = A.play(g, g.turn, A.bot(g, g.turn, rng)); assert.ok(r.ok, JSON.stringify(r)); } assert.notEqual(g.winner, null);
});
