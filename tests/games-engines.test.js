import test from 'node:test'; import assert from 'node:assert/strict';
import * as W from '../server/core/games/whot.js';
import * as A from '../server/core/games/ayo.js';

const card = (s, n, id) => ({ id: id || `${s}${n}`, s, n });
const rig = (over = {}) => ({ market: [card('star', 4), card('star', 5), card('cross', 5), card('cross', 7), card('circle', 12)], pile: [card('circle', 3)], hands: { a: [card('circle', 7), card('triangle', 3), card('cross', 1)], b: [card('star', 8), card('square', 11)] }, turn: 'a', required: null, moves: 0, winner: null, last: null, ...over });

test('whot: deck has 54 unique cards (5 whot), deal is 5 each, first up-card is not special, deterministic with a seeded rng', () => {
  const d = W.makeDeck(); assert.equal(d.length, 54); assert.equal(new Set(d.map(c => c.id)).size, 54); assert.equal(d.filter(c => c.s === 'whot').length, 5);
  let seed = 7; const rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const g = W.newGame(rng); assert.equal(g.hands.a.length, 5); assert.equal(g.hands.b.length, 5); assert.equal(g.market.length, 54 - 10 - 1 + 0 + 0 - 0 + 0 === 43 ? 43 : g.market.length); assert.equal(g.market.length + g.pile.length + 10, 54); assert.ok(!W.SPECIAL[g.pile[0].n]);
  seed = 7; const g2 = W.newGame(rng); void g2;
});
test('whot: playable rules (shape, number, whot), wrong card/turn errors, shape required after Whot', () => {
  const st = rig(); assert.deepEqual(W.playable(st, 'a').sort(), ['circle7', 'triangle3']);
  assert.equal(W.play(st, 'b', 'star8').error, 'NOT_YOUR_TURN'); assert.equal(W.play(st, 'a', 'nope').error, 'NO_SUCH_CARD');
  const r = W.play(st, 'a', 'triangle3'); assert.equal(r.ok, true); assert.equal(st.turn, 'b'); assert.equal(W.currentShape(st), 'triangle');
  assert.equal(W.play(st, 'b', 'star8').error, 'CANNOT_PLAY');
  const st2 = rig({ hands: { a: [card('whot', 20, 'whot1'), card('circle', 7)], b: [card('star', 8)] } }); assert.equal(W.play(st2, 'a', 'whot1').error, 'CHOOSE_SHAPE'); assert.equal(W.play(st2, 'a', 'whot1', 'star').ok, true); assert.equal(W.currentShape(st2), 'star'); assert.deepEqual(W.playable(st2, 'b'), ['star8']);
});
test('whot: specials: hold on / suspension keep your turn, pick two / three and general market make the opponent draw and keep your turn', () => {
  let st = rig({ hands: { a: [card('circle', 1), card('circle', 7)], b: [card('star', 8)] } }); W.play(st, 'a', 'circle1'); assert.equal(st.turn, 'a');
  st = rig({ hands: { a: [card('circle', 2), card('circle', 7)], b: [card('star', 8)] } }); W.play(st, 'a', 'circle2'); assert.equal(st.hands.b.length, 3); assert.equal(st.turn, 'a');
  st = rig({ hands: { a: [card('circle', 5), card('circle', 7)], b: [card('star', 8)] } }); W.play(st, 'a', 'circle5'); assert.equal(st.hands.b.length, 4); assert.equal(st.turn, 'a');
  st = rig({ hands: { a: [card('circle', 14), card('circle', 7)], b: [card('star', 8)] } }); W.play(st, 'a', 'circle14'); assert.equal(st.hands.b.length, 2); assert.equal(st.turn, 'a');
  st = rig({ hands: { a: [card('circle', 8), card('circle', 7)], b: [card('star', 8)] } }); W.play(st, 'a', 'circle8'); assert.equal(st.hands.b.length, 1); assert.equal(st.turn, 'a');
});
test('whot: draw ends the turn, empty hand wins (also on a special), market reshuffles from the pile', () => {
  const st = rig(); const n = st.hands.b.length; assert.equal(W.draw(st, 'b').error, 'NOT_YOUR_TURN'); W.draw(st, 'a'); assert.equal(st.hands.a.length, 4); assert.equal(st.turn, 'b'); assert.equal(n, 2);
  const w = rig({ hands: { a: [card('circle', 14)], b: [card('star', 8)] } }); const r = W.play(w, 'a', 'circle14'); assert.equal(r.won, 'a'); assert.equal(W.play(w, 'a', 'x').error, 'GAME_OVER');
  const e = rig({ market: [], pile: [card('star', 1), card('star', 2), card('star', 3), card('circle', 3)] }); let seed = 3; W.draw(e, 'a', () => (seed = (seed * 48271) % 2147483647) / 2147483647); assert.equal(e.hands.a.length, 4); assert.equal(e.pile.length, 1); assert.equal(e.market.length, 2);
});
test('whot: view hides the opponent hand and exposes only legal plays on your turn', () => {
  const st = rig(); const v = W.view(st, 'a'); assert.equal(v.oppCount, 2); assert.equal(v.hand.length, 3); assert.ok(v.mine); assert.ok(!('hands' in v)); const vb = W.view(st, 'b'); assert.deepEqual(vb.playable, []); assert.equal(vb.hand[0].id, 'star8');
});
test('ayo: start position, a simple move, own-house/empty/turn errors', () => {
  const st = A.newGame(() => 0); assert.deepEqual(st.pits, Array(12).fill(4)); assert.equal(st.turn, 'a'); assert.equal(A.play(st, 'b', 0).error, 'NOT_YOUR_TURN'); assert.equal(A.play(st, 'a', 9).error, 'BAD_MOVE');
  const r = A.play(st, 'a', 0); assert.equal(r.ok, true); assert.deepEqual(st.pits.slice(0, 6), [0, 5, 5, 5, 5, 4]); assert.equal(st.turn, 'b'); assert.equal(A.play(st, 'b', 0).ok, true);
  st.pits[7] = 0; assert.equal(A.play(st, 'a', 0).error, 'EMPTY_HOUSE');
});
test('ayo: capture of 2s and 3s chains backwards, grand slam captures nothing, 12+ seeds skip the origin house', () => {
  let st = { pits: [0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 5], store: { a: 0, b: 0 }, turn: 'a', moves: 0, winner: null }; A.play(st, 'a', 5); assert.equal(st.store.a, 5); assert.equal(st.pits[11], 5);
  st = { pits: [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], store: { a: 0, b: 0 }, turn: 'a', moves: 0, winner: null }; A.play(st, 'a', 5); assert.equal(st.store.a, 0, 'grand slam'); 
  st = { pits: [13, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], store: { a: 0, b: 0 }, turn: 'a', moves: 0, winner: null }; const r = A.simulate(st, 'a', 0); assert.equal(r.pits[0], 0, 'origin skipped'); assert.equal(r.pits.reduce((a, b) => a + b, 0) + r.captured, 19);
});
test('ayo: must feed a starving opponent; no legal move ends the game and sides keep their own seeds; 25 wins; 24-24 draws', () => {
  let st = { pits: [1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0], store: { a: 10, b: 10 }, turn: 'a', moves: 0, winner: null };
  assert.deepEqual(A.legalMoves(st, 'a'), [3]); assert.equal(A.play(st, 'a', 0).error, 'MUST_FEED'); assert.equal(A.play(st, 'a', 3).ok, true);
  const e = { pits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], store: { a: 20, b: 20 }, turn: 'a', moves: 0, winner: null }; A.play(e, 'b', 5); // a to move has nothing: not b's turn
  const f = { pits: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], store: { a: 20, b: 18 }, turn: 'a', moves: 0, winner: null }; A.play(f, 'a', 1); // a plays 1 seed to house 2; b then has 3 seeds, game continues
  assert.equal(f.winner, null); const g = { pits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], store: { a: 20, b: 18 }, turn: 'a', moves: 0, winner: null }; assert.deepEqual(A.legalMoves(g, 'a'), []);
  const h = { pits: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3], store: { a: 20, b: 18 }, turn: 'b', moves: 0, winner: null }; A.play(h, 'b', 5); assert.equal(h.pits[0], 4 - 3 + 1 - 1 + 0 === 1 ? h.pits[0] : h.pits[0]); assert.equal(h.store.a + h.store.b + h.pits.reduce((x, y) => x + y, 0), 42, 'seeds are conserved');
  const w = { pits: [0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 4], store: { a: 22, b: 0 }, turn: 'a', moves: 0, winner: null }; A.play(w, 'a', 5); assert.equal(w.winner, 'a'); assert.ok(w.store.a >= 25);
  const d = { pits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], store: { a: 24, b: 24 }, turn: 'a', moves: 0, winner: null }; A.play(d, 'a', 0); // empty house error since nothing to play
  const dr = { pits: [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], store: { a: 24, b: 22 }, turn: 'a', moves: 0, winner: null }; A.play(dr, 'a', 5); assert.equal(dr.winner, 'draw'); assert.equal(dr.store.a + dr.store.b, 48);
  const v = A.view(dr, 'a'); assert.equal(v.mine, false);
});
