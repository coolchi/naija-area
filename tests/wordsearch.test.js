import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, DAY } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import * as W from '../server/core/casual/wordsearch.js';
import { POOL, THEME } from '../server/config/wordsearch-words.js';
import { profane } from '../server/core/filter.js';

const adult = (s, cash = 100) => mkUser(s, { cash, ageMs: 10 * 60000 });
const dayAfter = (n) => new Date(Date.UTC(2026, 9, 10) + n * DAY).toISOString().slice(0, 10);

test('word search list: placeholder Lagos words, A to Z, 3 to 10 letters, unique, clean', () => {
  assert.ok(POOL.length >= 50); assert.equal(new Set(POOL).size, POOL.length); for (const w of POOL) { assert.match(w, /^[A-Z]{3,10}$/); assert.equal(profane(w.toLowerCase()), false, w); } assert.deepEqual(Object.keys(THEME), ['food', 'road', 'place', 'culture']);
});
test('word search generation: deterministic per day, different days differ, 10x10 with 8 words, and EVERY puzzle for 500 days is solvable', () => {
  const a = W.puzzle('2026-10-10'), b = W.puzzle('2026-10-10'), c = W.puzzle('2026-10-11'); assert.deepEqual(a, b); assert.notDeepEqual(a.grid, c.grid); assert.equal(a.grid.length, 100); assert.equal(a.words.length, 8); assert.deepEqual(a.words, a.words.slice().sort());
  for (let d = 0; d < 500; d++) { const p = W.puzzle(dayAfter(d)); assert.equal(p.grid.length, 100); assert.ok(p.grid.every(ch => /^[A-Z]$/.test(ch))); assert.deepEqual(W.solve(p), p.words, dayAfter(d)); for (const pl of p.placed) { const r2 = pl.r + pl.dr * (pl.word.length - 1), c2 = pl.c + pl.dc * (pl.word.length - 1); assert.equal(W.lineText(p.grid, pl.r, pl.c, r2, c2), pl.word); } }
});
test('word search lines: only straight lines inside the grid count; either direction matches', () => {
  const p = W.puzzle('2026-10-10'); const pl = p.placed[0]; const r2 = pl.r + pl.dr * (pl.word.length - 1), c2 = pl.c + pl.dc * (pl.word.length - 1);
  assert.equal(W.matchLine(p, pl.r, pl.c, r2, c2), pl.word); assert.equal(W.matchLine(p, r2, c2, pl.r, pl.c), pl.word, 'backwards works too'); assert.equal(W.lineText(p.grid, 0, 0, 1, 2), null, 'not a straight line'); assert.equal(W.lineText(p.grid, 0, 0, 0, 0), null); assert.equal(W.lineText(p.grid, 0, 0, 0, 10), null, 'off the grid'); assert.equal(W.lineText(p.grid, -1, 0, 3, 0), null);
  const short = pl.word.length > 3 ? [pl.r, pl.c, pl.r + pl.dr * (pl.word.length - 2), pl.c + pl.dc * (pl.word.length - 2)] : null; if (short) assert.notEqual(W.matchLine(p, ...short), pl.word, 'a line one letter short is not the word');
});
const endsOf = (pl) => [pl.r, pl.c, pl.r + pl.dr * (pl.word.length - 1), pl.c + pl.dc * (pl.word.length - 1)];
test('word search routes: the grid hides the answers, found words are kept on the server, all 8 pay once through the ledger inside the shared daily cap, and nothing pays twice', async () => {
  const s = makeServer(); const u = adult(s); const st = await ok(s, 'GET', '/api/casual/wordsearch', { uid: u }); assert.equal(st.rows.length, 10); assert.equal(st.words.length, 8); assert.equal(st.found.length, 0); assert.equal(st.status, 'playing'); assert.ok(!('placed' in st) && !JSON.stringify(st).includes('"dr"'));
  const p = W.puzzle(st.day); const bad = await call(s, 'POST', '/api/casual/wordsearch/line', { uid: u, body: { r1: 0, c1: 0, r2: 1, c2: 2 } }); assert.equal(bad.json.ok, false);
  const before = balanceOf(s.db, cashId(u)); let last;
  for (let i = 0; i < p.placed.length; i++) { const [r1, c1, r2, c2] = endsOf(p.placed[i]); if (i === p.placed.length - 1) { const early = await call(s, 'POST', '/api/casual/wordsearch/line', { uid: u, body: { r1, c1, r2, c2 } }); assert.equal(early.json.error, 'TOO_FAST', 'the last word cannot come before a human could have searched'); s.app.clock.advance(8 * 4000); }
    last = await ok(s, 'POST', '/api/casual/wordsearch/line', { uid: u, body: i === 3 ? { r1: r2, c1: c2, r2: r1, c2: c1 } : { r1, c1, r2, c2 } }); assert.equal(last.ok, true); assert.equal(last.found, i + 1); if (i === 0) { const again = await ok(s, 'POST', '/api/casual/wordsearch/line', { uid: u, body: { r1, c1, r2, c2 } }); assert.equal(again.ok, false, 'a word already found'); assert.match(again.message, /already/); } }
  assert.equal(last.done, true); assert.equal(last.reward, s.app.balance.casual.wordsearch.perRunCap); assert.equal(balanceOf(s.db, cashId(u)) - before, last.reward); assert.equal(checkInvariants(s.db).ok, true);
  assert.equal((await ok(s, 'GET', '/api/casual/wordsearch', { uid: u })).status, 'done'); assert.equal((await call(s, 'POST', '/api/casual/wordsearch/line', { uid: u, body: { r1: 0, c1: 0, r2: 0, c2: 3 } })).json.error, 'DONE_TODAY');
  assert.equal(s.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE reason='casual_reward' AND user_id=?").get(u).n, 1, 'one payment, with an audit row');
  const ov = await ok(s, 'GET', '/api/casual', { uid: u }); assert.equal(ov.games.find(g => g.id === 'wordsearch').doneToday, true);
  s.app.clock.advance(DAY); const next = await ok(s, 'GET', '/api/casual/wordsearch', { uid: u }); assert.equal(next.status, 'playing'); assert.notEqual(next.day, st.day);
});
test('word search: the daily cap is shared (a capped player still plays but is not paid), and a brand-new account plays without a payout', async () => {
  const s = makeServer(); const u = adult(s); s.db.prepare("INSERT INTO casual_daily(user_id,day,earned,plays) VALUES (?,?,?,?)").run(u, new Date(s.app.clock.now()).toISOString().slice(0, 10), s.app.balance.casual.dailyCap, 3);
  const st = await ok(s, 'GET', '/api/casual/wordsearch', { uid: u }); s.app.clock.advance(60000); let last; for (const pl of W.puzzle(st.day).placed) last = await ok(s, 'POST', '/api/casual/wordsearch/line', { uid: u, body: (([r1, c1, r2, c2]) => ({ r1, c1, r2, c2 }))(endsOf(pl)) }); assert.equal(last.done, true); assert.equal(last.reward, 0); assert.match(last.note, /cap/i);
  const s2 = makeServer(); const n = mkUser(s2, { cash: 100 }); const st2 = await ok(s2, 'GET', '/api/casual/wordsearch', { uid: n }); s2.app.clock.advance(60000); let l2; for (const pl of W.puzzle(st2.day).placed) l2 = await ok(s2, 'POST', '/api/casual/wordsearch/line', { uid: n, body: (([r1, c1, r2, c2]) => ({ r1, c1, r2, c2 }))(endsOf(pl)) }); assert.equal(l2.reward, 0); assert.match(l2.note, /Practice/);
});
test('word search: lines need a login', async () => { const s = makeServer(); assert.equal((await call(s, 'POST', '/api/casual/wordsearch/line', { body: { r1: 0, c1: 0, r2: 0, c2: 3 } })).status, 401); });
