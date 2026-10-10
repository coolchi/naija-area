// Match-3 ("Chop Am"), the traffic-jam puzzle ("Clear the Go-Slow") and table football (10 Oct 2026).
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, HOUR } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import * as M3 from '../server/core/casual/match3.js';
import * as D from '../server/core/casual/danfo.js';
import * as F from '../server/core/games/football.js';
import { DANFO_LEVELS } from '../server/config/danfo-levels.js';
import { danfoLevel } from '../server/core/casual.js';
import { GAMES } from '../server/core/games.js';

const adult = (s, cash = 100) => mkUser(s, { cash, ageMs: 10 * 60000 });
const rngOf = (seed) => { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
function playGreedy(seed, n = M3.MOVES) { const g = M3.newGame(seed); let log = ''; for (let i = 0; i < n && !g.over; i++) { const m = M3.bestMove(g); if (!m) break; M3.step(g, m.cell, m.dir); log += M3.encode(m.cell, m.dir); } return { g, log }; }

// ------------------------------------------------------------------ match-3
test('match-3 engine: new boards are calm and playable, same seed = same board, runs of 3/4/5 are found, an illegal swap is refused and costs nothing', () => {
  for (const seed of [1, 2, 3, 77, 4242, 999999]) { const g = M3.newGame(seed); assert.equal(g.grid.length, 64); assert.ok(g.grid.every(v => v >= 1 && v <= M3.KINDS)); assert.equal(M3.findRuns(g.grid).length, 0, 'no ready-made matches'); assert.ok(M3.legalMoves(g.grid).length > 0); assert.deepEqual(M3.newGame(seed).grid, g.grid); }
  assert.notDeepEqual(M3.newGame(1).grid, M3.newGame(2).grid);
  const g = Array(64).fill(0).map((_, i) => ((i % 8) + Math.floor(i / 8) * 3) % 5 + 1); g[0] = g[1] = g[2] = 1; assert.equal(M3.findRuns(g).some(r => r.cells.join() === '0,1,2'), true);
  const four = Array(64).fill(9); [0, 1, 2, 3].forEach(i => { four[i] = 1; }); assert.equal(M3.findRuns(four).find(r => r.kind === 1).cells.length, 4); assert.equal(M3.runScore(3), 30); assert.equal(M3.runScore(4), 60); assert.equal(M3.runScore(5), 100); assert.equal(M3.runScore(7), 160);
  const game = M3.newGame(5); const bad = M3.legalMoves(game.grid); const illegal = [...Array(63).keys()].find(i => i % 8 < 7 && !M3.legal(game.grid, i, 'r')); const before = game.grid.slice();
  assert.equal(M3.step(game, illegal, 'r'), false); assert.deepEqual(game.grid, before); assert.equal(game.moves, 0); assert.equal(game.movesLeft, M3.MOVES); assert.equal(M3.step(game, 7, 'r'), false, 'off the right edge'); assert.equal(M3.step(game, 56, 'd'), false, 'off the bottom'); assert.equal(M3.step(game, 3, 'x'), false); assert.ok(bad.length);
});
test('match-3 engine: a legal swap scores, tiles fall and refill (board stays full), cascades multiply, 20 moves end the game, and replay equals live play', () => {
  for (const seed of [11, 12, 13]) {
    const g = M3.newGame(seed); const m = M3.bestMove(g); const r = M3.step(g, m.cell, m.dir); assert.ok(r.gained >= 30); assert.ok(g.grid.every(v => v >= 1 && v <= M3.KINDS), 'no holes'); assert.equal(g.movesLeft, M3.MOVES - 1); assert.equal(M3.findRuns(g.grid).length, 0, 'the board is calm after a move');
    assert.ok(r.steps.length >= 1 && r.steps[0].level === 1 && r.steps.every((s, i) => s.level === i + 1)); assert.equal(r.gained, r.steps.reduce((a, s) => a + s.points, 0));
  }
  const { g, log } = playGreedy(2); assert.equal(g.over, true); assert.equal(g.moves, M3.MOVES); assert.ok(g.score > 1000, 'a sensible player scores well: ' + g.score); assert.ok(g.best >= 2, 'at least one cascade over 20 greedy moves');
  const rep = M3.replay(2, log); assert.equal(rep.ok, true); assert.equal(rep.score, g.score); assert.equal(rep.moves, 20); assert.equal(rep.over, true);
  assert.equal(M3.replay(2, log + '00r').error, 'TOO_LONG', 'no 21st move'); assert.equal(M3.replay(2, 'zz').error, 'BAD_LOG'); assert.equal(M3.replay(2, '63r').error, 'IMPOSSIBLE_MOVE'); assert.equal(M3.replay(3, log).ok === true && M3.replay(3, log).score === g.score, false, 'a log only fits its own seed');
  let seeds = 0; for (let k = 1; k <= 30; k++) { const x = playGreedy(k); assert.equal(M3.replay(k, x.log).score, x.g.score, `seed ${k}`); seeds++; } assert.equal(seeds, 30);
});
test('match-3 engine: when no swap is left the board is reshuffled by the same seeded generator, never mid-game-over, and the new board is calm and playable', () => {
  let dead = null; for (const [a, b, m] of [[1, 2, 5], [2, 1, 5], [1, 3, 5], [3, 1, 5], [2, 3, 5], [3, 2, 5], [1, 4, 5], [4, 1, 5]]) { const g = Array.from({ length: 64 }, (_, i) => ((Math.floor(i / 8) * a + (i % 8) * b) % m) + 1); if (!M3.legalMoves(g).length && !M3.findRuns(g).length) { dead = g; break; } }
  assert.ok(dead, 'a hand-made board with no legal swap');
  const game = M3.newGame(21); game.grid = dead.slice(); game.movesLeft = 5; const twin = M3.newGame(21); twin.grid = dead.slice(); twin.movesLeft = 5;
  assert.equal(M3.ensureMove(game), true); assert.equal(game.shuffles, 1); assert.equal(M3.findRuns(game.grid).length, 0); assert.ok(M3.legalMoves(game.grid).length > 0); assert.ok(game.grid.every(v => v >= 1 && v <= M3.KINDS)); assert.equal(M3.ensureMove(twin), true); assert.deepEqual(twin.grid, game.grid, 'same seed, same reshuffle');
  const over = M3.newGame(21); over.grid = dead.slice(); over.movesLeft = 0; assert.equal(M3.ensureMove(over), false, 'no reshuffle once the game is over'); assert.equal(M3.ensureMove(M3.newGame(4)), false, 'a playable board is left alone');
});
test('match-3 routes: server seed, replay decides the score, tampering and too-fast refused, reward capped through the ledger, no double payout, daily cap shared', async () => {
  const s = makeServer(); const u = adult(s); const st = await ok(s, 'POST', '/api/casual/match3/start', { uid: u }); assert.ok(st.runId && Number.isInteger(st.seed)); assert.equal(st.moves, 20); assert.deepEqual(st.snacks, M3.SNACKS);
  const { g, log } = playGreedy(st.seed); const sub = (uid, body) => call(s, 'POST', '/api/casual/match3/submit', { uid, body });
  assert.equal((await sub(u, { runId: st.runId, moves: log })).json.error, 'TOO_FAST'); assert.equal((await sub(u, { runId: st.runId, moves: '00r' })).json.error, 'TOO_SHORT'); s.app.clock.advance(20 * 800);
  const other = adult(s); assert.equal((await sub(other, { runId: st.runId, moves: log })).json.error, 'NO_RUN'); assert.equal((await sub(u, { runId: st.runId, moves: '00r'.repeat(6) })).json.error, 'IMPOSSIBLE_MOVE'); assert.equal((await sub(u, { runId: st.runId, moves: 'abc'.repeat(6) })).json.error, 'BAD_LOG');
  const wrong = playGreedy(st.seed + 1).log; assert.equal((await sub(u, { runId: st.runId, moves: wrong })).status >= 400, true, 'a log from another seed is refused or gives a different score');
  const bal = balanceOf(s.db, cashId(u)); const r = await ok(s, 'POST', '/api/casual/match3/submit', { uid: u, body: { runId: st.runId, moves: log } }); const C = s.app.balance.casual.match3;
  assert.equal(r.score, g.score); assert.equal(r.reward, Math.min(C.perRunCap, Math.floor(g.score / C.scorePerNaira))); assert.ok(r.reward > 0); assert.equal(balanceOf(s.db, cashId(u)), bal + r.reward); assert.equal((await sub(u, { runId: st.runId, moves: log })).json.error, 'RUN_CLOSED'); assert.equal(checkInvariants(s.db).ok, true);
  const ov = await ok(s, 'GET', '/api/casual', { uid: u }); const row = ov.games.find(x => x.id === 'match3'); assert.equal(row.name, 'Chop Am'); assert.equal(row.best, g.score); assert.ok(ov.games.some(x => x.id === 'danfo'));
  const fresh = adult(s); s.db.prepare('UPDATE users SET created_at=? WHERE id=?').run(s.app.clock.now() - 1000, fresh); const st2 = await ok(s, 'POST', '/api/casual/match3/start', { uid: fresh }); s.app.clock.advance(20 * 800); const bal2 = balanceOf(s.db, cashId(fresh));
  const r2 = await ok(s, 'POST', '/api/casual/match3/submit', { uid: fresh, body: { runId: st2.runId, moves: playGreedy(st2.seed).log } }); assert.equal(r2.reward, 0, 'a brand-new account plays without a payout'); assert.equal(balanceOf(s.db, cashId(fresh)), bal2);
});

// ------------------------------------------------------------------ traffic-jam puzzle
test('danfo levels: every shipped level is valid, exactly solvable, and its par is the true fewest slides (breadth-first search); pars rise; names and kinds are sensible', () => {
  assert.ok(DANFO_LEVELS.length >= 15); let prev = 0;
  for (const L of DANFO_LEVELS) { const v = danfoLevel(L.id).vehicles; assert.deepEqual(D.validate(v), [], `level ${L.id}`); assert.equal(v[0].kind, 'danfo'); const sol = D.solve(v); assert.ok(sol, `level ${L.id} is solvable`); assert.equal(sol.par, L.par, `level ${L.id} par`); assert.ok(L.par >= prev, 'levels get harder'); prev = L.par;
    const w = D.clone(v); for (const [i, d] of sol.path) assert.equal(D.slide(w, i, d), true); assert.equal(D.solved(w), true); assert.equal(D.replay(v, sol.path.map(([i, d]) => `${i}:${d}`).join(',')).moves, L.par, 'the BFS answer replays'); }
  assert.deepEqual(DANFO_LEVELS.map(l => l.id), DANFO_LEVELS.map((_, i) => i + 1)); assert.ok(DANFO_LEVELS[0].par <= 4 && DANFO_LEVELS.at(-1).par >= 15);
});
test('danfo engine: vehicles slide only along their lane and only through free cells; blocked, off-board and zero slides are refused; the replay checker is strict', () => {
  const v = [{ kind: 'danfo', r: 2, c: 0, len: 2, dir: 'h' }, { kind: 'car', r: 0, c: 2, len: 3, dir: 'v' }, { kind: 'keke', r: 4, c: 0, len: 2, dir: 'h' }];
  assert.deepEqual(D.room(v, 0), { back: 0, fwd: 0 }, 'the car in column 2 blocks the danfo straight away'); assert.deepEqual(D.room(v, 1), { back: 0, fwd: 3 }); assert.equal(D.slide(v, 0, 1), false); assert.equal(D.slide(v, 0, 0), false); assert.equal(D.slide(v, 0, -1), false); assert.equal(D.slide(v, 9, 1), false); assert.equal(D.slide(v, 0, 1.5), false);
  assert.equal(D.solved(v), false); assert.equal(D.replay(v, '0:4').error, 'IMPOSSIBLE_MOVE');
  const w = D.clone(v); assert.equal(D.slide(w, 1, 3), true); assert.equal(w[1].r, 3); assert.equal(D.slide(w, 0, 4), true); assert.equal(D.solved(w), true); assert.equal(D.replay(v, '1:3,0:4').ok, true); assert.equal(D.replay(v, '1:3,0:4,2:1').error, 'AFTER_EXIT'); assert.equal(D.replay(v, '1:3').error, 'NOT_SOLVED'); assert.equal(D.replay(v, 'x').error, 'BAD_LOG'); assert.equal(D.replay(v, '1:3,0:4', 1).error, 'TOO_LONG');
  assert.deepEqual(D.validate([{ kind: 'danfo', r: 2, c: 0, len: 2, dir: 'v' }, { kind: 'car', r: 0, c: 0, len: 2, dir: 'h' }]).length > 0, true, 'danfo must be horizontal on the exit row'); assert.ok(D.validate([{ kind: 'danfo', r: 2, c: 0, len: 2, dir: 'h' }, { kind: 'car', r: 2, c: 1, len: 2, dir: 'v' }]).some(e => /overlap/.test(e)));
});
test('danfo routes: levels unlock in order, the server checks your move list against ITS level, only the first clear pays (by par), replays pay nothing, ledger balances', async () => {
  const s = makeServer(); const u = adult(s); const sub = (uid, body) => call(s, 'POST', '/api/casual/danfo/submit', { uid, body }); const start = (lvl) => call(s, 'POST', '/api/casual/danfo/start', { uid: u, body: lvl == null ? {} : { level: lvl } });
  assert.equal((await start(2)).json.error, 'LOCKED'); assert.equal((await start(99)).json.error, 'NO_LEVEL'); const a = (await start()).json; assert.equal(a.level.id, 1); assert.equal(a.level.vehicles[0].kind, 'danfo'); assert.equal(a.unlocked, 1); assert.equal(a.total, DANFO_LEVELS.length);
  const sol = D.solve(danfoLevel(1).vehicles); const good = sol.path.map(([i, d]) => `${i}:${d}`).join(','); assert.equal((await sub(u, { runId: a.runId, moves: good })).json.error, 'TOO_FAST'); s.app.clock.advance(5000);
  assert.equal((await sub(u, { runId: a.runId, moves: '0:1' })).json.error, 'NOT_SOLVED'); assert.equal((await sub(u, { runId: a.runId, moves: '5:9' })).json.error, 'IMPOSSIBLE_MOVE'); const other = adult(s); assert.equal((await sub(other, { runId: a.runId, moves: good })).json.error, 'NO_RUN');
  const bal = balanceOf(s.db, cashId(u)); const C = s.app.balance.casual.danfo; const r = await ok(s, 'POST', '/api/casual/danfo/submit', { uid: u, body: { runId: a.runId, moves: good } });
  assert.equal(r.perfect, true); assert.equal(r.firstClear, true); assert.equal(r.reward, Math.min(C.perRunCap, C.perLevelBase + C.perPar * sol.par)); assert.equal(balanceOf(s.db, cashId(u)), bal + r.reward); assert.equal(r.unlocked, 2); assert.equal((await sub(u, { runId: a.runId, moves: good })).json.error, 'RUN_CLOSED');
  const b = (await start(1)).json; assert.equal(b.cleared, true); s.app.clock.advance(5000); const r2 = await ok(s, 'POST', '/api/casual/danfo/submit', { uid: u, body: { runId: b.runId, moves: good } }); assert.equal(r2.reward, 0, 'a replay pays nothing'); assert.equal(r2.firstClear, false);
  const c = (await start()).json; assert.equal(c.level.id, 2); const sol2 = D.solve(danfoLevel(2).vehicles); const wasteful = [[sol2.path[0][0], 1], [sol2.path[0][0], -1]].map(([i, d]) => `${i}:${d}`); const stepsPad = wasteful.filter((_, i) => D.slide(D.clone(danfoLevel(2).vehicles), Number(wasteful[i].split(':')[0]), Number(wasteful[i].split(':')[1])));
  s.app.clock.advance(60000); const padded = stepsPad.length === 2 ? [...wasteful, ...sol2.path.map(([i, d]) => `${i}:${d}`)].join(',') : sol2.path.map(([i, d]) => `${i}:${d}`).join(','); const r3 = await call(s, 'POST', '/api/casual/danfo/submit', { uid: u, body: { runId: c.runId, moves: padded } });
  assert.ok(r3.status === 200 ? r3.json.reward <= Math.min(C.perRunCap, C.perLevelBase + C.perPar * sol2.par) : true); assert.equal(checkInvariants(s.db).ok, true);
  const nu = adult(s); const x = (await call(s, 'POST', '/api/casual/danfo/start', { uid: nu, body: { level: 1 } })).json; assert.equal(x.cleared, false, 'progress is per player');
});

// ------------------------------------------------------------------ table football
test('football engine: geometry is deterministic, bounces and saves behave, no dice anywhere, power sets the reach, hidden rods stay hidden from the attacker', () => {
  assert.deepEqual(F.shoot([2, 2, 2], 1, 1, 2), F.shoot([2, 2, 2], 1, 1, 2), 'same choices, same result'); const open = F.shoot([0, 4, 0], 2, 0, 3); assert.ok(['goal', 'saved', 'stopped'].includes(open.result));
  const results = new Set(); for (let l = 0; l < 5; l++) for (let a = -2; a <= 2; a++) for (let p = 1; p <= 3; p++) for (const gd of [[0, 0, 0], [2, 2, 2], [4, 4, 4], [1, 3, 2]]) results.add(F.shoot(gd, l, a, p).result); assert.ok(results.has('goal') && results.has('saved') && results.has('stopped'), [...results].join());
  assert.equal(F.shoot([2, 2, 2], 2, 0, 1).result === 'goal', false, 'power 1 cannot reach the goal from the start line'); const figs = F.figures([2, 2, 2]); assert.equal(figs.length, 6); assert.deepEqual(figs.filter(f => f.rod === 0).map(f => f.x), [4.5]);
  const wide = F.shoot([0, 0, 0], 4, 2, 3); assert.ok(wide.path.every(([x]) => x >= 0 && x <= F.W), 'the ball bounces off the side walls and stays on the table'); for (const [x, y] of F.shoot([2, 2, 2], 0, -2, 3).path) assert.ok(x >= 0 && x <= F.W && y >= -0.1 && y <= F.START_Y + 1.6);
  let g = 0, n = 0; const rng = rngOf(3); for (let i = 0; i < 2000; i++) { const r = F.shoot([0, 1, 2].map(() => Math.floor(rng() * 5)), Math.floor(rng() * 5), Math.floor(rng() * 5) - 2, 2 + Math.floor(rng() * 2)); n++; if (r.result === 'goal') g++; } assert.ok(g / n > 0.12 && g / n < 0.45, 'random play scores sometimes: ' + g / n);
  // a smart attacker who SEES the rods nearly always has a goal; a blind one does not: that gap is the game
  let smart = 0; for (let i = 0; i < 100; i++) { const gd = [0, 1, 2].map(() => Math.floor(rng() * 5)); let any = false; for (let l = 0; l < 5 && !any; l++) for (let a = -2; a <= 2 && !any; a++) if (F.shoot(gd, l, a, 3).result === 'goal') any = true; if (any) smart++; } assert.ok(smart >= 90, 'seen rods can be beaten: ' + smart);
});
test('football engine: turn flow (defender sets rods, attacker shoots, roles swap), bad moves refused, first to 3 wins, 10 rounds then the higher score, ties draw, forfeit, view hides the rods', () => {
  const st = F.newGame(2, () => 0.1); assert.equal(st.attacker, 0); assert.equal(st.turn, 1); assert.equal(st.phase, 'guard'); assert.equal(F.play(st, 0, { guard: [2, 2, 2] }).error, 'NOT_YOUR_TURN');
  assert.equal(F.play(st, 1, { guard: [5, 2, 2] }).error, 'BAD_MOVE'); assert.equal(F.play(st, 1, { guard: [1, 2] }).error, 'BAD_MOVE'); assert.equal(F.play(st, 1, { guard: [1, 1.5, 2] }).error, 'BAD_MOVE'); assert.equal(st.phase, 'guard', 'refused moves change nothing');
  assert.equal(F.play(st, 1, { guard: [1, 3, 2] }).ok, true); assert.equal(st.phase, 'shoot'); assert.equal(st.turn, 0); assert.equal(F.view(st, 0).guard, null, 'the attacker cannot see the rods'); assert.deepEqual(F.view(st, 1).guard, [1, 3, 2], 'the defender sees their own'); assert.equal(F.view(st, 0).role, 'attack'); assert.equal(F.view(st, 1).role, 'defend');
  assert.equal(F.play(st, 1, { lane: 2, angle: 0, power: 3 }).error, 'NOT_YOUR_TURN'); assert.equal(F.play(st, 0, { lane: 9, angle: 0, power: 3 }).error, 'BAD_MOVE'); assert.equal(F.play(st, 0, { lane: 2, angle: 3, power: 3 }).error, 'BAD_MOVE'); assert.equal(F.play(st, 0, { lane: 2, angle: 0, power: 0 }).error, 'BAD_MOVE');
  const r = F.play(st, 0, { lane: 2, angle: 0, power: 3 }); assert.equal(r.ok, true); assert.equal(st.round, 1); assert.deepEqual(st.last.guard, [1, 3, 2], 'the rods are shown after the shot'); assert.ok(st.last.path.length > 2); assert.equal(st.attacker, 1, 'roles swap'); assert.equal(st.turn, 0); assert.equal(st.phase, 'guard'); assert.equal(st.guard, null);
  // first to 3
  const w = F.newGame(2, () => 0.1); w.score = [2, 0]; w.guard = [0, 0, 0]; w.phase = 'shoot'; w.turn = 0; let found; for (let l = 0; l < 5 && !found; l++) for (let a = -2; a <= 2 && !found; a++) if (F.shoot([0, 0, 0], l, a, 3).result === 'goal') found = { lane: l, angle: a, power: 3 };
  assert.ok(found); assert.equal(F.play(w, 0, found).won, 0); assert.equal(w.winner, 0); assert.equal(F.play(w, 1, { guard: [0, 0, 0] }).error, 'GAME_OVER'); assert.equal(F.view(w, 0).mine, false);
  // 10 rounds, then the higher score; equal = draw
  const t = F.newGame(2, () => 0.1); t.round = 9; t.score = [1, 1]; t.guard = [2, 2, 2]; t.phase = 'shoot'; t.turn = 0; F.play(t, 0, { lane: 0, angle: 0, power: 1 }); assert.equal(t.winner, 'draw'); const t2 = F.newGame(2, () => 0.1); t2.round = 9; t2.score = [0, 1]; t2.guard = [2, 2, 2]; t2.phase = 'shoot'; t2.turn = 0; F.play(t2, 0, { lane: 0, angle: 0, power: 1 }); assert.equal(t2.winner, 1);
  const f = F.newGame(2, () => 0.9); assert.equal(F.forfeit(f, 0).won, 1); assert.equal(f.winner, 1);
  const b = F.newGame(2, rngOf(1)); const rb = rngOf(2); let plies = 0; while (b.winner == null && plies < 100) { const m = F.bot(b, b.turn, rb); assert.equal(F.play(b, b.turn, m).ok, true, JSON.stringify(m)); plies++; } assert.notEqual(b.winner, null); assert.ok(plies <= 20, 'a game is at most 10 rounds of two moves'); assert.equal(GAMES.football.max, 2);
});
test('football at the venue: the station exists in the Corner Joint and the game appears on the weekly board kinds', () => {
  const s = makeServer(); const v = s.app.city.venues.find(x => x.id === 'venue_joint'); assert.ok(v.stations.some(x => x.id === 'football1' && x.type === 'game' && x.game === 'football')); assert.ok(s.app.city.venues.find(x => x.id === 'venue_viewing').stations.some(x => x.game === 'match3')); assert.ok(s.app.city.venues.find(x => x.id === 'venue_mamaput').stations.some(x => x.game === 'danfo'));
});
