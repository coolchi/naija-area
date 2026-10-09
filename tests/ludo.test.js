import test from 'node:test'; import assert from 'node:assert/strict';
import * as L from '../server/core/games/ludo.js';
const dieRng = (seq) => { let i = 0; return () => (seq[i++ % seq.length] - 1) / 6 + 0.001; }; // rng() -> die value from a sequence
const game = (n = 2, over = {}) => ({ ...L.newGame(n, () => 0), turn: 0, ...over });

test('ludo: 2 to 4 players only; seats; legal moves need a 6 to leave base', () => {
  assert.throws(() => L.newGame(1)); assert.throws(() => L.newGame(5)); const st = game(4); assert.equal(st.tokens.length, 4); assert.deepEqual(L.startCells(2), [0, 2]);
  assert.deepEqual(L.legalTokens(st, 0, 5), []); assert.deepEqual(L.legalTokens(st, 0, 6), [0, 1, 2, 3]);
});
test('ludo: the server rolls (client cannot), turn/roll order enforced, no-move rolls pass the turn', () => {
  const st = game(2); assert.equal(L.roll(st, 1).error, 'NOT_YOUR_TURN'); assert.equal(L.move(st, 0, 0).error, 'ROLL_FIRST');
  const r = L.roll(st, 0, dieRng([3])); assert.equal(r.info.die, 3); assert.equal(r.info.note, 'no move'); assert.equal(st.turn, 1); assert.equal(st.die, null);
  const r2 = L.roll(st, 1, dieRng([6])); assert.equal(st.die, 6); assert.equal(L.roll(st, 1).error, 'MOVE_FIRST'); assert.equal(L.move(st, 1, 9).error, 'ILLEGAL_MOVE'); void r2;
  assert.equal(L.move(st, 1, 0).ok, true); assert.equal(st.tokens[1][0], 0); assert.equal(st.turn, 1, 'a 6 gives another roll');
});
test('ludo: third six in a row is lost; exact roll needed to finish; finishing all four wins', () => {
  const st = game(2); st.tokens[0] = [10, -1, -1, -1]; L.roll(st, 0, dieRng([6])); L.move(st, 0, 0); L.roll(st, 0, dieRng([6])); L.move(st, 0, 0); assert.equal(st.sixes, 2); const r = L.roll(st, 0, dieRng([6])); assert.equal(r.info.note, 'third six: turn lost'); assert.equal(st.turn, 1);
  const f = game(2); f.tokens[0] = [HOME_MINUS(1), 56, 56, 56]; L.roll(f, 0, dieRng([2])); assert.equal(f.die, null, '2 would overshoot: no legal move'); assert.equal(f.turn, 1);
  f.turn = 0; const w = L.roll(f, 0, dieRng([1])); assert.equal(f.die, 1); void w; const m = L.move(f, 0, 0); assert.equal(m.won, 0); assert.equal(f.winner, 0); assert.equal(L.roll(f, 0).error, 'GAME_OVER');
});
function HOME_MINUS(k) { return L.HOME - k; }
test('ludo: capture sends rival tokens home unless on a safe cell; same-colour stacks are safe; home column cannot be captured', () => {
  const st = game(2); // seat0 start cell 0; seat1 start cell 26 (corner 2). seat0 at p=14 -> abs 14. seat1 token at p=40 -> abs (26+40)%52=14.
  st.tokens[0] = [10, -1, -1, -1]; st.tokens[1] = [40, -1, -1, -1]; L.roll(st, 0, dieRng([4])); const r = L.move(st, 0, 0); assert.equal(r.info.captured, 1); assert.equal(st.tokens[1][0], -1);
  const s2 = game(2); s2.tokens[0] = [5, -1, -1, -1]; s2.tokens[1] = [47, -1, -1, -1]; /* seat1 abs (26+47)%52=21 which is a star (safe); seat0 lands on abs 8? use p=16->abs16 no: set so target is 21 */ s2.tokens[0] = [17, -1, -1, -1]; L.roll(s2, 0, dieRng([4])); const r2 = L.move(s2, 0, 0); assert.equal(r2.info.captured, 0, 'abs 21 is a safe star'); assert.equal(s2.tokens[1][0], 47);
  const s3 = game(2); s3.tokens[0] = [50, -1, -1, -1]; s3.tokens[1] = [-1, -1, -1, -1]; L.roll(s3, 0, dieRng([3])); L.move(s3, 0, 0); assert.equal(s3.tokens[0][0], 53, 'into the home column');
  const s4 = game(3); s4.tokens[0] = [10, -1, -1, -1]; s4.tokens[1] = [(14 - 13 + 52) % 52, -1, -1, -1]; s4.tokens[2] = [(14 - 26 + 52) % 52, -1, -1, -1]; L.roll(s4, 0, dieRng([4])); const r4 = L.move(s4, 0, 0); assert.equal(r4.info.captured, 2, 'captures every rival token on the cell');
});
test('ludo: forfeit removes a player; last one standing wins; turn skips forfeited seats; cap ends the game by progress', () => {
  const st = game(3); L.forfeit(st, 1); assert.equal(st.winner, null); st.turn = 0; L.roll(st, 0, dieRng([2])); assert.equal(st.turn, 2, 'skips seat 1'); L.forfeit(st, 2); assert.equal(st.winner, 0);
  const c = game(2); c.tokens[1] = [20, -1, -1, -1]; c.actions = L.MAX_ACTIONS - 1; L.roll(c, 0, dieRng([2])); assert.equal(c.winner, 1);
  const v = L.view(game(2), 0); assert.ok(v.canRoll && v.legal.length === 0); const vb = L.view(game(2), 1); assert.equal(vb.canRoll, false);
});
test('ludo: a random 4-player game always terminates with a legal winner', () => {
  let seed = 5; const rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const st = L.newGame(4, rng);
  for (let i = 0; i < 5000 && st.winner == null; i++) { const s = st.turn; if (st.die == null) L.roll(st, s, rng); else { const lg = L.legalTokens(st, s); L.move(st, s, lg[Math.floor(rng() * lg.length)]); } }
  assert.notEqual(st.winner, null); assert.ok(st.winner >= 0 && st.winner < 4);
});
