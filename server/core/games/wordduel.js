// Word duel ("Word Chop"), 2 players, game money only. Same table-game contract as the other engines.
// THREE rounds. Each round both players get the SAME 7 letters (the letters of one common 7-letter word, shuffled, so a 7-letter word always exists). Each player secretly plays ONE word
// of 3 to 7 letters made only from those letters (each letter as many times as it appears), which must be in the word list (server/config/duel-words.js). Nobody sees the other's word
// until both have played, so it is a duel of vocabulary, not of speed. A word scores its letter values plus a length bonus; the three rounds are added up and the higher total wins
// (equal totals = draw). A rejected word (not in the list, wrong letters) costs nothing: try another while the clock runs. A player may also pass a round (0 points).
// Move: { word: 'chicken' } or { pass: true }. Who is "on the clock" (st.turn): the seat that has not played yet (so a no-show forfeits, never the one who has played).
import { VALID, SEEDS } from '../../config/duel-words.js';
export const ROUNDS = 3, MIN_LEN = 3, MAX_LEN = 7;
export const LETTER_VALUE = Object.fromEntries([...'aeioulnstr'].map(c => [c, 1]).concat([...'dg'].map(c => [c, 2]), [...'bcmp'].map(c => [c, 3]), [...'fhvwy'].map(c => [c, 4]), [['k', 5], ['j', 8], ['x', 8], ['q', 10], ['z', 10]]));
export const LENGTH_BONUS = { 3: 0, 4: 2, 5: 4, 6: 7, 7: 12 };
export const scoreWord = (w) => [...w].reduce((a, c) => a + LETTER_VALUE[c], 0) + LENGTH_BONUS[w.length];
/** can `word` be spelled from `letters` (a multiset)? */
export function fits(word, letters) { const left = {}; for (const c of letters) left[c] = (left[c] || 0) + 1; for (const c of word) { if (!left[c]) return false; left[c]--; } return true; }
export const checkWord = (w, letters) => (!/^[a-z]+$/.test(w) ? 'BAD_WORD' : w.length < MIN_LEN || w.length > MAX_LEN ? 'BAD_LENGTH' : !fits(w, letters) ? 'BAD_LETTERS' : !VALID.has(w) ? 'NOT_IN_LIST' : null);
const MSG = { BAD_WORD: 'Use letters only.', BAD_LENGTH: `Words must have ${MIN_LEN} to ${MAX_LEN} letters.`, BAD_LETTERS: 'Use only the letters you were given (each as often as it appears).', NOT_IN_LIST: 'That word is not in our list. Try another.' };
const shuffle = (a, rng) => { const x = a.slice(); for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };
/** every word in the list that can be made from the letters, best first */
export function allWords(letters) { const out = []; for (const w of VALID) if (w.length <= letters.length && fits(w, letters)) out.push({ word: w, score: scoreWord(w) }); return out.sort((a, b) => b.score - a.score || (a.word < b.word ? -1 : 1)); }
export const newGame = (n = 2, rng = Math.random) => {
  const seeds = []; while (seeds.length < ROUNDS) { const s = SEEDS[Math.floor(rng() * SEEDS.length)]; if (!seeds.includes(s)) seeds.push(s); }
  const rounds = seeds.map(s => shuffle([...s], rng)); const first = rng() < 0.5 ? 0 : 1;
  return { n: 2, rounds, round: 0, subs: [null, null], results: [], total: [0, 0], first, turn: first, winner: null, last: null };
};
export function play(st, seat, mv = {}) {
  if (st.winner != null) return { error: 'GAME_OVER' }; if (seat !== 0 && seat !== 1) return { error: 'NOT_YOUR_TURN' }; if (st.subs[seat]) return { error: 'ALREADY_PLAYED', message: 'You already played this round. Waiting for your opponent.' };
  const letters = st.rounds[st.round]; let sub;
  if (mv.pass) sub = { word: '', score: 0, pass: true };
  else { const w = String(mv.word || '').trim().toLowerCase(); const bad = checkWord(w, letters); if (bad) return { error: bad, message: MSG[bad] }; sub = { word: w, score: scoreWord(w) }; }
  st.subs[seat] = sub; const other = 1 - seat;
  if (!st.subs[other]) { st.turn = other; st.last = { who: seat, waiting: true }; return { ok: true, info: st.last, won: st.winner }; }
  const best = allWords(letters)[0]; const res = { letters: letters.join(''), words: st.subs.map(s => s.word), scores: st.subs.map(s => s.score), best: best.word, bestScore: best.score };
  st.results.push(res); st.total[0] += res.scores[0]; st.total[1] += res.scores[1]; st.last = { who: seat, resolved: st.round, ...res }; st.round++; st.subs = [null, null];
  if (st.round >= ROUNDS) { st.winner = st.total[0] === st.total[1] ? 'draw' : st.total[0] > st.total[1] ? 0 : 1; st.turn = st.first; st.why = `Final totals ${st.total[0]} to ${st.total[1]}`; } else st.turn = (st.first + st.round) % 2;
  return { ok: true, info: st.last, won: st.winner };
}
export function forfeit(st, seat) { if (st.winner == null) st.winner = 1 - seat; return { ok: true, won: st.winner }; }
export function view(st, who) {
  const over = st.winner != null; const letters = over ? null : st.rounds[st.round]; const mine = !over && !st.subs[who];
  return { game: 'wordduel', you: who, rounds: ROUNDS, round: Math.min(st.round + 1, ROUNDS), letters, mine, played: !over && !!st.subs[who], oppPlayed: !over && !!st.subs[1 - who], yourWord: st.subs[who]?.word ?? null, results: st.results, total: st.total, turn: st.turn, last: st.last,
    values: LETTER_VALUE, bonus: LENGTH_BONUS, minLen: MIN_LEN, maxLen: MAX_LEN };
}
/** a weak, friendly practice bot: a middling word, never the best one */
export function bot(st, seat, rng = Math.random) {
  if (st.subs[seat]) return { pass: true }; const c = allWords(st.rounds[st.round]); if (!c.length) return { pass: true };
  const i = Math.min(c.length - 1, Math.floor(c.length * (0.3 + 0.55 * rng()))); return { word: c[i].word };
}
