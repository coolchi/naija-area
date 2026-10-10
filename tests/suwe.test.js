import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, DAY } from './helpers.js';
import { checkInvariants, balanceOf, cashId, SYS } from '../server/core/ledger.js';
import * as S from '../server/core/casual/suwe.js';
import * as T from '../server/core/games/suwe.js';
import { GAMES } from '../server/core/games.js';
import { mulberry32 } from '../server/core/casual/merge.js';

const adult = (s, cash = 100) => mkUser(s, { cash, ageMs: 10 * 60000 });
const none = () => Array(6).fill(-1);
/** the perfect player: stops the marker dead centre (allowing for the stone's wobble) and taps every beat exactly */
const perfect = (args, off = {}) => { const p = S.fullPlan(args); const m = 0.5 - p.aimNoise; return { aim: Math.round(m / 2 * S.AIM_PERIOD_MS), taps: p.events.map((e, k) => Math.round(p.leadMs + e.at + (off[k] || 0))) }; };
const perfectHouse = (args) => { const r = mulberry32(0); void r; for (let a = 0; a < S.AIM_PERIOD_MS / 2; a += 5) { const x = S.resolveHouse(args, { aim: a }); if (x.claimed && x.off < 0.02) return { aim: a }; } return { aim: S.AIM_PERIOD_MS / 4 }; };

test('suwe board: 12 boxes in a U route labelled 1-6 then 6-1; every number is on both sides', () => {
  assert.equal(S.BOXES, 12); assert.deepEqual(S.LABELS, [1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1]); for (let n = 1; n <= 6; n++) { const [a, b] = S.houseBoxes(n); assert.equal(S.LABELS[a], n); assert.equal(S.LABELS[b], n); assert.ok(a < 6 && b >= 6, 'one on each side'); }
});
test('suwe plan: deterministic from the seed; the stone box and others\' houses are hopped over (longer hop), your own house is a rest box, the pick-up is last; the wobble is never public', () => {
  const a = S.fullPlan({ seed: 7, stage: 3, seat: 0, houses: none() }), b = S.fullPlan({ seed: 7, stage: 3, seat: 0, houses: none() }), c = S.fullPlan({ seed: 8, stage: 3, seat: 0, houses: none() }); assert.deepEqual(a, b); assert.notEqual(a.aimNoise, c.aimNoise);
  assert.equal(a.events.length, 12, '11 hops + the pick-up'); assert.equal(a.stoneBox, 2); assert.ok(a.events.every(e => e.box !== 2 || e.kind === 'pickup')); assert.equal(a.events.at(-1).kind, 'pickup'); assert.equal(a.events[0].at, 0);
  const gaps = a.events.map((e, i) => (i ? e.at - a.events[i - 1].at : 0)); assert.equal(gaps[2], Math.round(1.5 * a.beatMs) + 0 || gaps[2], 'hop over the stone box is 1.5 beats'); assert.ok(gaps[2] > a.beatMs * 1.4 && gaps[2] < a.beatMs * 1.6); assert.ok(gaps[1] > a.beatMs * 0.95 && gaps[1] < a.beatMs * 1.05);
  const h = none(); h[0] = 1; const opp = S.fullPlan({ seed: 7, stage: 3, seat: 0, houses: h }); assert.equal(opp.events.length, 12 - 2, 'both boxes numbered 1 are skipped'); assert.ok(!opp.events.some(e => S.LABELS[e.box] === 1));
  const mine = S.fullPlan({ seed: 7, stage: 3, seat: 1, houses: h }); assert.equal(mine.events.length, 12); assert.equal(mine.events.filter(e => e.kind === 'rest').length, 2, 'your own house is a rest box on both sides');
  assert.ok(!('aimNoise' in S.publicPlan(a)) && !JSON.stringify(S.publicPlan(a)).includes('aimNoise')); assert.ok(S.fullPlan({ seed: 1, stage: 12 }).beatMs < S.fullPlan({ seed: 1, stage: 1 }).beatMs); assert.ok(S.difficulty(12).windowMs < S.difficulty(1).windowMs); assert.ok(S.minDurationMs(a) > 8000);
});
test('suwe judging: perfect play clears; late/early touches a line; wrong tap count; the stone must be thrown into the middle; bad input is refused', () => {
  const args = { seed: 11, stage: 1, seat: 0, houses: none() }; const r = S.resolveStage(args, perfect(args)); assert.equal(r.ok, true); assert.equal(r.perfect, 12); assert.equal(r.score, 10 + 24); assert.ok(r.hops.every(x => x.grade === 'perfect'));
  const w = S.difficulty(1).windowMs; let x = S.resolveStage(args, perfect(args, { 4: w * 0.6 })); assert.equal(x.ok, true); assert.equal(x.good, 1, 'a bit off is still a good hop');
  x = S.resolveStage(args, perfect(args, { 4: w + 20 })); assert.deepEqual([x.ok, x.reason, x.failedAt], [false, 'line', 4]); assert.match(x.message, /late/); x = S.resolveStage(args, perfect(args, { 6: -(w + 20) })); assert.equal(x.reason, 'line'); assert.match(x.message, /early/);
  const p = perfect(args); assert.equal(S.resolveStage(args, { ...p, taps: p.taps.slice(0, 5) }).reason, 'taps'); assert.equal(S.resolveStage(args, { ...p, taps: [...p.taps, 99999] }).reason, 'taps');
  const off = S.resolveStage(args, { ...p, aim: Math.round(0.02 * S.AIM_PERIOD_MS / 2) }); assert.deepEqual([off.ok, off.reason], [false, 'stone']); assert.deepEqual(S.resolveStage(args, { aim: 'x', taps: [] }).bad, true); assert.equal(S.resolveStage(args, { aim: 100, taps: [NaN] }).bad, true); assert.equal(S.resolveStage(args, {}).bad, true);
  const hs = none(); hs[1] = 0; const a2 = { seed: 11, stage: 1, seat: 0, houses: hs }; const rest = S.fullPlan(a2).events.findIndex(e => e.kind === 'rest'); assert.ok(rest >= 0); const wide = S.resolveStage(a2, perfect(a2, { [rest]: w * 1.3 })); assert.equal(wide.ok, true, 'rest boxes have a wider window');
});
test('suwe house throw: lands blind on a FREE number, is a house only across the middle, never on a taken number, deterministic', () => {
  const args = { seed: 3, lap: 1, seat: 0, houses: none() }; const a = S.resolveHouse(args, perfectHouse(args)); assert.equal(a.claimed, true); assert.equal(a.lands, 'both'); assert.ok(a.pair >= 1 && a.pair <= 6); assert.match(a.message, /on both sides/);
  assert.deepEqual(S.resolveHouse(args, perfectHouse(args)), a); const side = S.resolveHouse(args, { aim: 10 }); assert.equal(side.claimed, false); assert.ok(['left', 'right'].includes(side.lands)); assert.equal(side.pair, a.pair, 'the number does not depend on your tap');
  for (let seed = 0; seed < 200; seed++) { const h = none(); h[seed % 6] = 1; h[(seed + 2) % 6] = 0; const r = S.resolveHouse({ seed, lap: 1, seat: 0, houses: h }, { aim: 350 }); assert.equal(h[r.pair - 1], -1, 'never lands on a taken number'); }
  const full = Array(6).fill(1); assert.equal(S.resolveHouse({ seed: 1, lap: 1, houses: full }, { aim: 350 }).claimed, false); const counts = Array(7).fill(0); for (let seed = 0; seed < 600; seed++) counts[S.resolveHouse({ seed, lap: 1, seat: 0, houses: none() }, { aim: 350 }).pair]++; assert.ok(counts.slice(1).every(n => n > 60), 'all six numbers come up: ' + counts);
  assert.equal(S.resolveHouse(args, { aim: -5 }).bad, true);
});
test('suwe humans-in-code: a skilled player usually clears a stage, a careless one rarely (so the timing really matters)', () => {
  const rng = mulberry32(5); const rate = (skill) => { let ok = 0; for (let k = 0; k < 300; k++) { const a = { seed: k, stage: 1 + (k % 12), seat: 0, houses: none() }; if (S.resolveStage(a, S.playerInput(a, rng, skill)).ok) ok++; } return ok / 300; };
  assert.ok(rate(0.95) > 0.85); assert.ok(rate(0.3) < 0.15); assert.ok(rate(0.75) > rate(0.5));
});

// ------------------------------------------------------------------ the table game
const turnArgs = (st, seat) => ({ seed: `${st.seed}:${st.turnNo}`, stage: T.view(st, seat).stage, seat, houses: st.houses });
const houseArgs = (st, seat) => ({ seed: `${st.seed}:${st.turnNo}`, lap: st.lap[seat], seat, houses: st.houses });
const doTurn = (st, seat, skill = 'perfect') => { const v = T.view(st, seat); if (skill === 'perfect') return T.play(st, seat, v.phase === 'house' ? perfectHouse(houseArgs(st, seat)) : perfect(turnArgs(st, seat)), Math.random, { bot: true }); return T.play(st, seat, T.bot(st, seat, mulberry32(st.turnNo + 1)), Math.random, { bot: true }); };
test('suwe table: turns alternate; a clean stage advances you, a mistake keeps you on the stage; after 4 stages you throw for a house; first to 4 houses on the street ends it', () => {
  const st = T.newGame(2, () => 0.1); const f = st.turn; const o = 1 - f; assert.equal(T.play(st, o, { aim: 100, taps: [] }).error, 'NOT_YOUR_TURN');
  let r = T.play(st, f, { aim: 5, taps: [1, 2, 3] }); assert.equal(r.error, undefined); assert.equal(r.info.ok, false); assert.equal(st.stage[f], 1, 'stays on stage 1'); assert.equal(st.turn, o, 'turns alternate even after a mistake'); assert.equal(T.play(st, o, { aim: 'bad', taps: 5 }).error, 'BAD_INPUT');
  doTurn(st, o); assert.equal(st.stage[o], 2); doTurn(st, f); assert.equal(st.stage[f], 2); for (let i = 0; i < 6; i++) doTurn(st, st.turn); assert.equal(st.phase[f], 'house'); assert.equal(T.view(st, f).phase, 'house'); assert.equal(st.progress[f], 4);
  let n = 0; while (st.winner == null && n++ < 80) doTurn(st, st.turn); assert.notEqual(st.winner, null); assert.ok(st.won[0] + st.won[1] >= 4 || st.turnNo >= st.maxTurns); assert.match(st.why, /house|Turn limit/);
});
test('suwe table: an opponent\'s house skips that stone box (the stage counts as passed); tiebreaks: houses, then stages, then perfect hops, then draw; the turn limit ends it', () => {
  const st = T.newGame(2, () => 0.1); st.turn = 0; st.houses[0] = 1; assert.equal(T.view(st, 0).stage, 2, 'box 1 is the opponent\'s house: you move straight to stage 2'); assert.equal(T.view(st, 1).stage, 1);
  const v = T.view(st, 0); assert.ok(!v.plan.events.some(e => st.houses[0] === 1 && S.LABELS[e.box] === 1));
  const t = T.newGame(2, () => 0.1); t.turn = 0; t.maxTurns = 1; t.won = [1, 0]; doTurn(t, 0); assert.equal(t.winner, 0, 'more houses wins'); const u = T.newGame(2, () => 0.1); u.turn = 0; u.maxTurns = 2; u.progress = [3, 0]; doTurn(u, 0); doTurn(u, 1); assert.equal(u.winner === 'draw', false); assert.ok(u.winner === 0);
  const d = T.newGame(2, () => 0.1); d.turn = 0; d.maxTurns = 2; T.play(d, 0, { aim: 1, taps: [] }); T.play(d, 1, { aim: 1, taps: [] }); assert.equal(d.winner, 'draw'); assert.match(d.why, /Turn limit/);
});
test('suwe table: clock cheating: a too-quick answer is refused for people but not for the practice bot; forfeit hands the win over', () => {
  const st = T.newGame(2, () => 0.1); const f = st.turn; const p = perfect(turnArgs(st, f)); const fast = T.play(st, f, p, Math.random, { now: 10000, turnStart: 9900 }); assert.equal(fast.error, 'TOO_FAST'); assert.equal(st.turnNo, 0, 'nothing happened');
  const need = S.minDurationMs(S.fullPlan(turnArgs(st, f))); assert.equal(T.play(st, f, p, Math.random, { now: 10000 + need, turnStart: 10000 }).ok, true); const s2 = T.newGame(2, () => 0.1); assert.equal(T.play(s2, s2.turn, perfect(turnArgs(s2, s2.turn)), Math.random, { now: 10000, turnStart: 9990, bot: true }).ok, true);
  const v = T.view(st, st.turn); assert.ok(v.plan && !JSON.stringify(v).includes('aimNoise')); assert.equal(T.view(st, 1 - st.turn).plan, null, 'only the player on the clock gets a plan'); assert.equal(T.forfeit(st, 0).won, 1);
});
test('suwe table: determinism: same seed, same inputs, same game; the practice bot finishes whole games with legal inputs', () => {
  const run = (seed) => { const st = T.newGame(2, mulberry32(seed)); let n = 0; while (st.winner == null && n++ < 200) doTurn(st, st.turn, 'bot'); return st; };
  assert.deepEqual(run(4), run(4)); for (let g = 0; g < 12; g++) { const st = run(g); assert.notEqual(st.winner, null, 'every game ends'); assert.ok(st.turnNo <= st.maxTurns); }
});
test('suwe via the real routes: stake escrowed, a whole match played with server-side judging, the pot goes to the winner (or back on a draw), the ledger balances, the weekly board counts it', async () => {
  const s = makeServer(); let seed = 9; s.app.rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const [a, b] = [adult(s, 3000), adult(s, 3000)]; 
  const v = s.app.city.venues.find(x => x.id === 'venue_yard'); assert.ok(v && v.stations.some(x => x.id === 'suwe1' && x.game === 'suwe') && v.stations.some(x => x.id === 'suwe_solo' && x.type === 'casual'), 'the Compound Yard has both stations');
  const enter = async (u) => { const { ensurePresence } = await import('../server/core/world.js'); const p = ensurePresence(s.app, u); p.x = v.x; p.z = v.z; return call(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: 'venue_yard' } }); };
  const e1 = await enter(a); const e2 = await enter(b); if (e1.status !== 200 || e2.status !== 200) { assert.ok(false, 'could not enter the yard: ' + JSON.stringify([e1.json, e2.json])); }
  const w = (await call(s, 'POST', '/api/game/sit', { uid: a, body: { venueId: 'venue_yard', stationId: 'suwe1', stake: 100 } })).json; assert.equal(w.status, 'waiting'); const j = (await call(s, 'POST', '/api/game/sit', { uid: b, body: { venueId: 'venue_yard', stationId: 'suwe1' } })).json; assert.equal(j.status, 'active'); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 200);
  const seatOf = (u) => s.db.prepare('SELECT seat FROM game_players WHERE match_id=? AND user_id=?').get(w.id, u).seat; const users = [a, b];
  for (let i = 0; i < 100; i++) { const m = s.db.prepare('SELECT * FROM game_matches WHERE id=?').get(w.id); if (m.status !== 'active') break; const st = JSON.parse(m.state); const u = users.find(x => seatOf(x) === st.turn);
    const early = await call(s, 'POST', '/api/game/move', { uid: u, body: { matchId: w.id, ...T.bot(st, st.turn, mulberry32(i + 3)) } }); assert.equal(early.json.error, 'TOO_FAST', 'a person cannot answer instantly'); s.app.clock.advance(14000);
    const r = await call(s, 'POST', '/api/game/move', { uid: u, body: { matchId: w.id, ...T.bot(st, st.turn, mulberry32(i + 3)) } }); assert.equal(r.status, 200, JSON.stringify(r.json)); }
  const fin = s.db.prepare('SELECT * FROM game_matches WHERE id=?').get(w.id); assert.equal(fin.status, 'finished'); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 0);
  if (fin.winner) { assert.equal(balanceOf(s.db, cashId(fin.winner)), 3000 - 100 + 200); assert.equal((await ok(s, 'GET', '/api/scoreboard?kind=suwe', { uid: a })).rows[0].wins, 1); } else for (const u of users) assert.equal(balanceOf(s.db, cashId(u)), 3000);
  assert.equal(checkInvariants(s.db).ok, true);
});
// ------------------------------------------------------------------ single player (casual)
const playStage = async (s, u, run, skillInput) => { s.app.clock.advance(14000); return call(s, 'POST', '/api/casual/suwe/play', { uid: u, body: { runId: run.runId, ...skillInput } }); };
test('suwe single player: a run pays at the end, small and capped, through the ledger inside the shared daily cap; instant answers refused; 3 lives; houses pay extra', async () => {
  const s = makeServer(); let seed = 3; s.app.rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const u = adult(s); let run = (await ok(s, 'POST', '/api/casual/suwe/start', { uid: u })); assert.equal(run.stage, 1); assert.equal(run.lives, 3); assert.ok(run.plan.events.length === 12 && !JSON.stringify(run).includes('aimNoise'));
  const cfgS = s.app.balance.casual.suwe; const before = balanceOf(s.db, cashId(u)); const seedOf = () => s.db.prepare('SELECT seed FROM casual_runs WHERE id=?').get(run.runId).seed;
  const args = (st) => ({ seed: `${seedOf()}:${st.attempt}`, stage: st.stage, seat: 0, houses: st.houses }); const stateOf = () => JSON.parse(s.db.prepare('SELECT state FROM casual_runs WHERE id=?').get(run.runId).state);
  assert.equal((await call(s, 'POST', '/api/casual/suwe/play', { uid: u, body: { runId: run.runId, ...perfect(args(stateOf())) } })).json.error, 'TOO_FAST');
  let last; for (let i = 0; i < 12; i++) { last = await ok(s, 'POST', '/api/casual/suwe/play', { uid: u, body: { runId: run.runId, ...perfect(args(stateOf())) } }).catch(async () => { s.app.clock.advance(20000); return ok(s, 'POST', '/api/casual/suwe/play', { uid: u, body: { runId: run.runId, ...perfect(args(stateOf())) } }); }); if (i < 11) s.app.clock.advance(1000); }
  assert.equal(last.phase, 'house'); assert.equal(last.cleared, 12); s.app.clock.advance(15000); const hs = stateOf(); const hv = perfectHouse({ seed: `${seedOf()}:${hs.attempt}`, lap: 1, seat: 0, houses: hs.houses }); const fin = await ok(s, 'POST', '/api/casual/suwe/play', { uid: u, body: { runId: run.runId, ...hv } });
  assert.equal(fin.done, true); assert.equal(fin.result.claimed, true); assert.equal(fin.reward, Math.min(cfgS.perRunCap, 12 * cfgS.perStage + cfgS.perHouse)); assert.equal(balanceOf(s.db, cashId(u)) - before, fin.reward); assert.ok(fin.reward <= cfgS.perRunCap); assert.equal(checkInvariants(s.db).ok, true);
  assert.equal((await call(s, 'POST', '/api/casual/suwe/play', { uid: u, body: { runId: run.runId, aim: 1, taps: [] } })).json.error, 'RUN_OVER'); assert.equal(s.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE reason='casual_reward' AND user_id=?").get(u).n, 1);
  // lives: three mistakes end the run
  run = await ok(s, 'POST', '/api/casual/suwe/start', { uid: u }); let r; for (let i = 0; i < 3; i++) { r = await playStage(s, u, run, { aim: 3, taps: [1] }); assert.equal(r.status, 200); } assert.equal(r.json.done, true); assert.equal(r.json.reward, 0); assert.equal(r.json.lives, 0);
});
test('suwe single player: a brand-new account plays without a payout; the daily cap is shared; a stranger cannot play someone else\'s run; needs login', async () => {
  const s = makeServer(); const n = mkUser(s, { cash: 100 }); const run = await ok(s, 'POST', '/api/casual/suwe/start', { uid: n }); const other = adult(s); assert.equal((await call(s, 'POST', '/api/casual/suwe/play', { uid: other, body: { runId: run.runId, aim: 1, taps: [] } })).json.error, 'NO_RUN');
  assert.equal((await call(s, 'POST', '/api/casual/suwe/start', { body: {} })).status, 401); const ov = await ok(s, 'GET', '/api/casual', { uid: other }); assert.ok(ov.games.some(g => g.id === 'suwe')); assert.equal(s.db.prepare("SELECT COUNT(*) n FROM casual_runs WHERE kind='suwe' AND user_id=?").get(n).n, 1);
  const again = await ok(s, 'GET', '/api/casual/suwe', { uid: n }); assert.equal(again.run.runId, run.runId, 'a reload resumes the open run'); void DAY; void GAMES;
});
