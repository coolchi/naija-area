import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, HOUR, DAY } from './helpers.js';
import { checkInvariants, balanceOf, cashId, SYS } from '../server/core/ledger.js';
import * as M from '../server/core/casual/merge.js';
import * as Mem from '../server/core/casual/memory.js';
import { mark, wordOfDay } from '../server/core/casual.js';
import { ANSWERS, EXTRA_GUESSES, VALID, cleanCheck } from '../server/config/words.js';
import { profane } from '../server/core/filter.js';

const adult = (s, cash = 100) => mkUser(s, { cash, ageMs: 10 * 60000 });
/** play a merge game with the pure engine (what a client does) and return { log, game } */
function playMerge(seed, n = 200, rng = Math.random) { const g = M.newGame(seed); let log = ''; for (let i = 0; i < n && !g.over; i++) { const dirs = ['L', 'D', 'R', 'U'].sort(() => rng() - 0.5); for (const d of dirs) if (M.step(g, d)) { log += d; break; } } return { log, game: g }; }

test('merge engine: slide/merge rules, no double merge, deterministic from the seed, replay equals live play, impossible moves rejected', () => {
  assert.deepEqual(M.slide([2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'L').grid.slice(0, 4), [4, 4, 0, 0]); assert.equal(M.slide([2, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'L').gained, 4);
  assert.deepEqual(M.slide([4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'L').grid.slice(0, 4), [4, 4, 0, 0], 'a tile merges once per move'); assert.equal(M.slide([2, 4, 8, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'L').moved, false);
  assert.deepEqual(M.slide([0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], 'U').grid.filter(Boolean).length, 1, 'vertical merge');
  assert.deepEqual(M.newGame(42).grid, M.newGame(42).grid); assert.notDeepEqual(M.newGame(42).grid, M.newGame(43).grid);
  let s = 9; const rng = () => (s = (s * 16807) % 2147483647) / 2147483647; const { log, game } = playMerge(77, 300, rng); const r = M.replay(77, log); assert.equal(r.ok, true); assert.equal(r.score, game.score); assert.equal(r.moves, log.length);
  assert.equal(M.replay(77, 'X').error, 'BAD_LOG'); const stuck = M.newGame(5); stuck.grid = [2, 4, 2, 4, 4, 2, 4, 2, 2, 4, 2, 4, 4, 2, 4, 2]; assert.equal(M.canMove(stuck.grid), false);
  if (game.over) assert.equal(M.replay(77, log + 'L').ok, false, 'no moves after game over');
});
test('merge routes: server-issued seed, the move log is replayed, tampering/too-fast/double-submit refused, reward = capped score, ledger balances', async () => {
  const s = makeServer(); const u = adult(s); const start = await ok(s, 'POST', '/api/casual/merge/start', { uid: u }); assert.ok(Number.isInteger(start.seed) && start.runId);
  let seed = 3; const rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const { log, game } = playMerge(start.seed, 400, rng); assert.ok(game.score > 200, 'a decent game');
  assert.equal((await call(s, 'POST', '/api/casual/merge/submit', { uid: u, body: { runId: start.runId, moves: log } })).json.error, 'TOO_FAST', 'cannot submit instantly');
  assert.equal((await call(s, 'POST', '/api/casual/merge/submit', { uid: u, body: { runId: start.runId, moves: 'LR' } })).json.error, 'TOO_SHORT');
  s.app.clock.advance(log.length * 200); const other = adult(s); assert.equal((await call(s, 'POST', '/api/casual/merge/submit', { uid: other, body: { runId: start.runId, moves: log } })).json.error, 'NO_RUN', 'not your run');
  const forged = 'L'.repeat(60); assert.equal((await call(s, 'POST', '/api/casual/merge/submit', { uid: u, body: { runId: start.runId, moves: forged } })).json.error, 'IMPOSSIBLE_MOVE');
  const bal0 = balanceOf(s.db, cashId(u)); const r = await ok(s, 'POST', '/api/casual/merge/submit', { uid: u, body: { runId: start.runId, moves: log } });
  assert.equal(r.score, game.score); assert.equal(r.reward, Math.min(s.app.balance.casual.merge.perRunCap, Math.floor(game.score / s.app.balance.casual.merge.scorePerNaira))); assert.equal(balanceOf(s.db, cashId(u)), bal0 + r.reward);
  assert.equal((await call(s, 'POST', '/api/casual/merge/submit', { uid: u, body: { runId: start.runId, moves: log } })).json.error, 'RUN_CLOSED', 'no double payout'); assert.equal(checkInvariants(s.db).ok, true);
  const a = await ok(s, 'POST', '/api/casual/merge/start', { uid: u }); const b = await ok(s, 'POST', '/api/casual/merge/start', { uid: u }); assert.equal(s.db.prepare('SELECT status FROM casual_runs WHERE id=?').get(a.runId).status, 'abandoned', 'a new start abandons the old open run');
  s.app.clock.advance(7 * HOUR); assert.equal((await call(s, 'POST', '/api/casual/merge/submit', { uid: u, body: { runId: b.runId, moves: log } })).json.error, 'RUN_EXPIRED');
});
test('daily cap across all casual games, small per-run caps, and a very new account plays without a payout', async () => {
  const s = makeServer(); s.app.balance.casual.dailyCap = 100; const u = adult(s, 0); let paid = 0;
  for (let k = 0; k < 5; k++) { const st = await ok(s, 'POST', '/api/casual/merge/start', { uid: u }); const { log } = playMerge(st.seed, 600); s.app.clock.advance(log.length * 200); const r = await ok(s, 'POST', '/api/casual/merge/submit', { uid: u, body: { runId: st.runId, moves: log } }); paid += r.reward; assert.ok(r.reward <= s.app.balance.casual.merge.perRunCap); assert.ok(r.earnedToday <= 100); }
  assert.ok(paid <= 100 && paid > 0); assert.equal(balanceOf(s.db, cashId(u)), paid); const ov = await ok(s, 'GET', '/api/casual', { uid: u }); assert.equal(ov.earnedToday, paid); assert.equal(ov.games.length, 6);
  s.app.clock.advance(DAY); assert.equal((await ok(s, 'GET', '/api/casual', { uid: u })).earnedToday, 0, 'a new day resets the cap');
  const sf = makeServer(); const nu = mkUser(sf, { cash: 0 }); const st2 = await ok(sf, 'POST', '/api/casual/merge/start', { uid: nu }); const l2 = playMerge(st2.seed, 600).log; sf.app.clock.advance(l2.length * 200); const r2 = await ok(sf, 'POST', '/api/casual/merge/submit', { uid: nu, body: { runId: st2.runId, moves: l2 } }); assert.equal(r2.reward, 0); assert.match(r2.note, /account/i);
  assert.equal(checkInvariants(s.db).ok, true);
});
test('memory: layout never leaves the server, cards reveal only when flipped, pairs match, a full game pays by tries, bad flips refused', async () => {
  const s = makeServer(); const u = adult(s); const st = await ok(s, 'POST', '/api/casual/memory/start', { uid: u }); assert.equal(st.cards, 16); assert.ok(!('seed' in st) && !('layout' in st) && !JSON.stringify(st).includes('"state"'));
  const flip = (i) => call(s, 'POST', '/api/casual/memory/flip', { uid: u, body: { runId: st.runId, i } }); const tick = () => s.app.clock.advance(600);
  tick(); const cards = JSON.parse(s.db.prepare('SELECT state FROM casual_runs WHERE id=?').get(st.runId).state).cards; const a = await flip(0); assert.equal(a.json.result, 'first'); assert.equal(a.json.symbol, cards[0]);
  assert.equal((await flip(0)).json.error, 'SAME_CARD'); assert.equal((await flip(99)).json.error, 'BAD_CARD'); const wrong = cards.findIndex((c, i) => i > 0 && c !== cards[0]); tick(); const m = await flip(wrong); assert.equal(m.json.result, 'miss'); assert.equal(m.json.otherSymbol, cards[0]);
  const pairs = {}; cards.forEach((c, i) => (pairs[c] = [...(pairs[c] || []), i])); let last; for (const [x, y] of Object.values(pairs)) { s.app.clock.advance(500); assert.equal((await flip(x)).status, 200); s.app.clock.advance(500); last = (await flip(y)).json; assert.equal(last.result, 'match'); }
  assert.equal(last.done, true); assert.equal(last.moves, 9, '1 miss + 8 matches'); assert.equal(last.reward, Math.max(s.app.balance.casual.memory.floor, s.app.balance.casual.memory.perRunCap - 1 * s.app.balance.casual.memory.perExtraMove)); assert.equal(balanceOf(s.db, cashId(u)), 100 + last.reward);
  assert.equal((await flip(1)).json.error, 'RUN_CLOSED'); assert.equal(checkInvariants(s.db).ok, true);
  const st2 = await ok(s, 'POST', '/api/casual/memory/start', { uid: u }); assert.equal((await call(s, 'POST', '/api/casual/memory/flip', { uid: u, body: { runId: st2.runId, i: 0 } })).json.error, 'TOO_FAST', 'flipping faster than a human is refused');
  assert.equal(new Set(Mem.layout(5)).size, 8); assert.notDeepEqual(Mem.layout(5), Mem.layout(6));
});
test('word list: every word is 5 letters, unique, passes the profanity filter (clean-word check), the check itself catches a bad list', () => {
  assert.deepEqual(cleanCheck(), []); assert.ok(ANSWERS.length >= 100 && VALID.size === ANSWERS.length + EXTRA_GUESSES.length); for (const w of VALID) assert.ok(/^[a-z]{5}$/.test(w) && !profane(w), w);
  assert.ok(ANSWERS.includes('naija') && ANSWERS.includes('danfo') && ANSWERS.includes('wetin')); assert.ok(cleanCheck(['abcd', 'naija', 'naija', 'Hello']).length === 3);
});
test('word of the day: marks handle repeated letters, same word for everyone, changes per day, answer hidden until the end, 6 guesses, one play a day, reward by guesses', async () => {
  assert.deepEqual(mark('crane', 'crane'), [2, 2, 2, 2, 2]); assert.deepEqual(mark('speed', 'abide'), [0, 0, 1, 0, 1]); assert.deepEqual(mark('llama', 'hello'), [1, 1, 0, 0, 0]); assert.deepEqual(mark('eerie', 'eagle'), [2, 0, 0, 0, 2]);
  const s = makeServer(); const a = adult(s), b = adult(s); const ans = wordOfDay(s.app, new Date(s.app.clock.now()).toISOString().slice(0, 10)); assert.ok(ANSWERS.includes(ans));
  const st = await ok(s, 'GET', '/api/casual/word', { uid: a }); assert.equal(st.status, 'playing'); assert.ok(!('answer' in st)); assert.ok(!JSON.stringify(st).includes(ans));
  const g = (u, word) => call(s, 'POST', '/api/casual/word/guess', { uid: u, body: { word } }); assert.equal((await g(a, 'abc')).json.error, 'BAD_WORD'); assert.equal((await g(a, 'zzzzz')).json.error, 'NOT_IN_LIST');
  const wrong = ANSWERS.find(w => w !== ans); const r1 = await g(a, wrong); assert.equal(r1.status, 200); assert.ok(!JSON.stringify(r1.json).includes(`"answer":"${ans}"`)); assert.equal((await g(a, wrong)).json.error, 'REPEAT');
  const w2 = await g(b, ans); assert.equal(w2.json.status, 'won'); assert.equal(w2.json.reward, s.app.balance.casual.word.rewards[0]); assert.equal(w2.json.answer, ans); assert.equal(balanceOf(s.db, cashId(b)), 100 + w2.json.reward);
  assert.equal((await g(b, wrong)).json.error, 'DONE_TODAY'); const others = ANSWERS.filter(w => w !== ans && w !== wrong); let last; for (let i = 0; i < 5; i++) last = (await g(a, others[i])).json; assert.equal(last.status, 'lost'); assert.equal(last.answer, ans); assert.equal(last.reward, 0);
  const done = await ok(s, 'GET', '/api/casual/word', { uid: a }); assert.equal(done.status, 'lost'); assert.equal(done.answer, ans);
  s.app.clock.advance(DAY); const days = new Set(); for (let i = 0; i < 12; i++) { days.add(wordOfDay(s.app, `2026-11-${10 + i}`)); } assert.ok(days.size > 4, 'the daily word varies'); assert.equal((await ok(s, 'GET', '/api/casual/word', { uid: a })).status, 'playing'); assert.equal(checkInvariants(s.db).ok, true);
});
test('casual stations exist in the venues and the games list is reachable from the phone endpoint', async () => {
  const s = makeServer(); const u = adult(s); const all = s.app.city.venues.flatMap(v => v.stations.filter(x => x.type === 'casual').map(x => `${v.id}:${x.game}`)); assert.deepEqual(all.sort(), ['venue_joint:memory', 'venue_mamaput:danfo', 'venue_mamaput:word', 'venue_mamaput:wordsearch', 'venue_viewing:match3', 'venue_viewing:merge']);
  const ov = await ok(s, 'GET', '/api/casual', { uid: u }); assert.deepEqual(ov.games.map(g => g.id), ['merge', 'memory', 'match3', 'danfo', 'wordsearch', 'word']); assert.equal(ov.dailyCap, s.app.balance.casual.dailyCap);
});
