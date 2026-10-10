import test from 'node:test'; import assert from 'node:assert/strict';
import * as wd from '../server/core/games/wordduel.js';
import { VALID, SEEDS } from '../server/config/duel-words.js';
import { profane } from '../server/core/filter.js';
import { newGame, play, view, bot, forfeit, scoreWord, fits, checkWord, allWords, ROUNDS } from '../server/core/games/wordduel.js';
const rngOf = (seed) => { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };
const fixed = (rounds) => { const st = newGame(2, rngOf(1)); st.rounds = rounds.map(r => [...r]); st.first = 0; st.turn = 0; return st; };

test('word duel list: valid words are 3 to 7 letters, clean, and every seed is a valid 7-letter word with its own anagram solutions', () => {
  assert.ok(VALID.size > 40000); for (const w of [...VALID].filter((_, i) => i % 50 === 0)) assert.match(w, /^[a-z]{3,7}$/); assert.ok(SEEDS.length > 800);
  for (const s of SEEDS) { assert.equal(s.length, 7, s); assert.ok(VALID.has(s), s); assert.equal(profane(s), false, s); }
  for (const w of ['fuck', 'shit', 'nigger', 'slut', 'erotic']) assert.equal(VALID.has(w), false, w); assert.ok(VALID.has('market') && VALID.has('chicken') && VALID.has('rice'));
});
test('word duel scoring: letter values plus a length bonus, and the list decides validity', () => {
  assert.equal(scoreWord('cat'), 3 + 1 + 1 + 0); assert.equal(scoreWord('quiz'), 10 + 1 + 1 + 10 + 2); assert.equal(scoreWord('jazz'), 8 + 1 + 10 + 10 + 2);
  assert.equal(scoreWord('market'), [...'market'].reduce((a, c) => a + wd.LETTER_VALUE[c], 0) + 7); assert.equal(scoreWord('chicken'), [...'chicken'].reduce((a, c) => a + wd.LETTER_VALUE[c], 0) + 12);
  assert.equal(fits('seed', [...'dessert']), true); assert.equal(fits('seeds', [...'dessert']), true); assert.equal(fits('deeds', [...'dessert']), false, 'there is no second d'); assert.equal(fits('tress', [...'dessert']), true); assert.equal(fits('eee', [...'dessert']), false, 'letters are used up');
  const L = [...'dessert']; assert.equal(checkWord('dessert', L), null); assert.equal(checkWord('zzz', L), 'BAD_LETTERS'); assert.equal(checkWord('sets', L), null); assert.equal(checkWord('re', L), 'BAD_LENGTH'); assert.equal(checkWord('Sets', L), 'BAD_WORD'); assert.equal(checkWord('trdse', L), 'NOT_IN_LIST');
});
test('word duel: determinism: the same seed deals the same letters, different seeds differ, and every round has a 7-letter word', () => {
  const a = newGame(2, rngOf(7)), b = newGame(2, rngOf(7)), c = newGame(2, rngOf(8)); assert.deepEqual(a, b); assert.notDeepEqual(a.rounds, c.rounds); assert.equal(a.rounds.length, ROUNDS); assert.equal(new Set(a.rounds.map(r => r.slice().sort().join(''))).size, ROUNDS, 'three different sets');
  for (const r of a.rounds) { assert.equal(r.length, 7); assert.equal(allWords(r)[0].word.length >= 7 || allWords(r)[0].score > 0, true); assert.ok(allWords(r).some(x => x.word.length === 7)); }
});
test('word duel: a round resolves only when both have played; the opponent\'s word stays hidden until then; rejected words cost nothing', () => {
  const st = fixed(['dessert', 'chicken', 'markets']); assert.equal(play(st, 0, { word: 'nonsenseword' }).error, 'BAD_LENGTH'); assert.equal(play(st, 0, { word: 'zzz' }).error, 'BAD_LETTERS'); assert.equal(st.subs[0], null, 'a bad word is not recorded');
  assert.equal(play(st, 0, { word: 'dessert' }).ok, true); assert.equal(st.turn, 1, 'the clock is on the player who has not played'); assert.equal(play(st, 0, { word: 'sets' }).error, 'ALREADY_PLAYED');
  const v1 = view(st, 1); assert.equal(v1.oppPlayed, true); assert.equal(v1.mine, true); assert.equal(JSON.stringify(v1).includes('dessert'), false, 'their word is hidden'); assert.equal(v1.results.length, 0); assert.equal(view(st, 0).yourWord, 'dessert');
  assert.equal(play(st, 1, { word: 'set' }).ok, true); assert.equal(st.results.length, 1); assert.deepEqual(st.results[0].words, ['dessert', 'set']); assert.deepEqual(st.results[0].scores, [scoreWord('dessert'), scoreWord('set')]); assert.equal(st.round, 1); assert.equal(view(st, 1).letters.join(''), 'chicken'); assert.deepEqual(st.subs, [null, null]);
});
test('word duel: three rounds, totals add up, the higher total wins, equal is a draw, a pass scores 0', () => {
  const win = fixed(['dessert', 'chicken', 'markets']); play(win, 0, { word: 'dessert' }); play(win, 1, { pass: true }); play(win, 1, { word: 'chicken' }); play(win, 0, { word: 'chi' }); play(win, 0, { word: 'market' }); play(win, 1, { word: 'mark' });
  assert.equal(win.winner, 0); assert.deepEqual(win.total, [scoreWord('dessert') + scoreWord('chi') + scoreWord('market'), scoreWord('chicken') + scoreWord('mark')]); assert.equal(win.results[0].scores[1], 0); assert.equal(view(win, 0).letters, null, 'game over');
  assert.deepEqual(play(win, 0, { word: 'cat' }), { error: 'GAME_OVER' });
  const draw = fixed(['dessert', 'chicken', 'markets']); for (let r = 0; r < 3; r++) { play(draw, 0, { pass: true }); play(draw, 1, { pass: true }); } assert.equal(draw.winner, 'draw');
  const f = fixed(['dessert', 'chicken', 'markets']); assert.equal(forfeit(f, 1).won, 0);
});
test('word duel: who is on the clock: nobody is blamed for waiting on a slow opponent; the first mover alternates by round', () => {
  const st = fixed(['dessert', 'chicken', 'markets']); assert.equal(st.turn, 0); play(st, 1, { word: 'set' }); assert.equal(st.turn, 0, 'seat 0 has not played: the clock is on seat 0'); play(st, 0, { word: 'tree' }); assert.equal(st.turn, 1, 'round 2 starts with the other seat');
});
test('word duel bot: always plays a valid word of its own letters, never the very best, and finishes whole games', () => {
  for (let g = 0; g < 10; g++) { const st = newGame(2, rngOf(g + 3)); const rng = rngOf(40 + g); let n = 0; while (st.winner == null && n++ < 20) { const seat = st.subs[0] ? 1 : st.subs[1] ? 0 : st.turn; const m = bot(st, seat, rng); const r = play(st, seat, m); assert.equal(r.ok, true, JSON.stringify(m) + r.error); } assert.notEqual(st.winner, null);
    for (const res of st.results) { assert.ok(res.scores.every(s => s <= res.bestScore)); } }
  const st = newGame(2, rngOf(1)); const opts = allWords(st.rounds[0]); const b = bot(st, 0, () => 0.5); assert.ok(b.word !== opts[0].word && checkWord(b.word, st.rounds[0]) === null);
});
