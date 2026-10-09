import test from 'node:test'; import assert from 'node:assert/strict';
import * as D from '../server/core/games/dominoes.js';
const g = (hands, over = {}) => ({ n: hands.length, hands, yard: [], chain: [], turn: 0, out: hands.map(() => false), passes: 0, winner: null, actions: 0, last: null, ...over });
test('dominoes: 28-tile set, deal sizes for 2/3/4 players, 2 to 4 only', () => {
  assert.equal(D.makeSet().length, 28); for (const [n, yard] of [[2, 14], [3, 7], [4, 0]]) { const st = D.newGame(n, () => 0.3); assert.equal(st.hands.length, n); assert.ok(st.hands.every(h => h.length === 7)); assert.equal(st.yard.length, yard); assert.equal(new Set([...st.hands.flat(), ...st.yard].map(t => t.join('-'))).size, 28); }
  assert.throws(() => D.newGame(1)); assert.throws(() => D.newGame(5));
});
test('dominoes: first tile free, then matching ends only, both ends, orientation, turn order and errors', () => {
  const st = g([[[3, 5], [1, 2], [6, 6], [3, 6]], [[5, 5], [0, 1], [2, 4], [4, 4]]]); assert.equal(D.play(st, 1, { tile: '5-5' }).error, 'NOT_YOUR_TURN'); assert.equal(D.play(st, 0, { tile: '0-0' }).error, 'NO_SUCH_TILE'); assert.equal(D.play(st, 0, { tile: 'x' }).error, 'BAD_MOVE');
  assert.equal(D.play(st, 0, { tile: '3-5' }).ok, true); assert.deepEqual(st.chain, [[3, 5]]); assert.equal(st.turn, 1);
  assert.equal(D.play(st, 1, { tile: '4-4', end: 'left' }).error, 'DOES_NOT_FIT'); assert.equal(D.play(st, 1, { tile: '5-5', end: 'right' }).ok, true); assert.deepEqual(st.chain, [[3, 5], [5, 5]]);
  assert.equal(D.play(st, 0, { tile: '1-2' }).error, 'DOES_NOT_FIT'); assert.equal(D.play(st, 0, { action: 'draw' }).error, 'HAVE_PLAY'); assert.equal(D.play(st, 0, { tile: '3-6', end: 'left' }).ok, true); assert.deepEqual(st.chain[0], [6, 3], 'tile is flipped to match the left end');
});
test('dominoes: draw only when nothing fits (yard pops), pass with an empty yard, win by emptying the hand', () => {
  const st = g([[[0, 0], [1, 1]], [[6, 6], [2, 3]]], { chain: [[3, 4]], yard: [[4, 6], [2, 2]] }); assert.equal(D.play(st, 0, { action: 'draw' }).ok, true); assert.equal(st.hands[0].length, 3); assert.equal(st.yard.length, 1); assert.equal(st.turn, 0, 'still your turn after a draw');
  assert.equal(D.play(st, 0, { action: 'draw' }).ok, true); assert.ok(D.playable(st, 0).includes('4-6') || D.playable(st, 0).includes('2-2') === false);
  const w = g([[[3, 3]], [[1, 2], [0, 5]]], { chain: [[3, 4]] }); const r = D.play(w, 0, { tile: '3-3', end: 'left' }); assert.equal(r.won, 0); assert.equal(w.winner, 0); assert.equal(D.play(w, 1, { action: 'draw' }).error, 'GAME_OVER');
  const q = g([[[0, 0], [5, 5]], [[1, 1], [2, 2]], [[5, 6], [6, 6]]], { chain: [[3, 4]], yard: [] }); q.hands[0] = [[3, 3], [0, 0]]; D.play(q, 0, { tile: '3-3', end: 'left' }); assert.equal(q.passes >= 1, true, 'players with no play are skipped'); assert.ok(q.turn !== 0 || q.winner != null);
});
test('dominoes: blocked game goes to the lowest pip total; an equal lowest total is a draw', () => {
  const a = g([[[6, 6], [1, 1]], [[2, 3], [0, 4]], [[1, 2], [5, 5]]]); D.play(a, 0, { tile: '6-6' }); assert.equal(a.winner, 0, 'seat 0 has 2 pips, others 9 and 13'); assert.equal(D.view(a, 1).tiles.length, 3, 'tiles are revealed at the end');
  const b = g([[[6, 6], [0, 2]], [[1, 1]], [[4, 5]]]); D.play(b, 0, { tile: '6-6' }); assert.equal(b.winner, 'draw', 'seats 0 and 1 tie on 2 pips');
});
test('dominoes: forfeits (tiles leave the game, last standing wins), views hide other hands, a random 4-player game terminates legally', () => {
  const st = g([[[1, 1]], [[2, 2]], [[3, 3]]]); D.forfeit(st, 1); assert.equal(st.winner, null); assert.deepEqual(st.hands[1], []); D.forfeit(st, 2); assert.equal(st.winner, 0);
  const v = D.view(D.newGame(3, () => 0.5), 0); assert.equal(v.hand.length, 7); assert.equal(v.counts.length, 3); assert.ok(!('hands' in v)); assert.equal(v.tiles, null);
  for (const n of [2, 3, 4]) { let seed = 7 + n; const rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const s = D.newGame(n, rng); const seen = new Set(); for (let i = 0; i < 800 && s.winner == null; i++) { const r = D.play(s, s.turn, D.bot(s, s.turn, rng)); assert.ok(r.ok, JSON.stringify(r)); seen.add(s.hands.reduce((a, h) => a + h.length, 0) + s.yard.length + s.chain.length); } assert.notEqual(s.winner, null); assert.deepEqual([...seen], [28], 'tiles are conserved'); }
});
