// Sports and Games Hall (10 Oct 2026): ping pong + tennis engines (rules, determinism, hidden aim), the shared rally kernel, the City Sports Hall venue, staked two-player matches,
// bot matches with the capped prize, coming-soon slots, and bots finishing whole matches. GAME MONEY ONLY.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at } from './helpers.js';
import { checkInvariants, balanceOf, cashId, SYS } from '../server/core/ledger.js';
import { enterCity } from '../server/core/cities.js';
import { GAMES } from '../server/core/games.js';
import * as sports from '../server/core/sports.js';
import { prep } from '../server/core/sports-games.js';
import * as pp from '../server/core/games/pingpong.js';
import * as tn from '../server/core/games/tennis.js';
import { LEVELS, mulberry32, meterAt, METER_MS, rngFor, reachOf, returnProb, errProb } from '../server/core/games/rally.js';
import { addSportsHall } from '../tools/add-sports-hall.mjs';
import fs from 'node:fs';

const rng0 = (seed = 7) => mulberry32(seed);
const VID = 'lk_venue_sports';
const adult = (s, cash = 3000) => mkUser(s, { cash, ageMs: 10 * 60000 });
async function enter(s, u) { enterCity(s.app, u, 'lagos-lekki'); const v = s.app.cities['lagos-lekki'].venueById[VID]; at(s, u, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); return ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: VID } }); }
const raw = (s, id) => s.db.prepare('SELECT * FROM game_matches WHERE id=?').get(id);
const seatOf = (s, id, u) => s.db.prepare('SELECT seat FROM game_players WHERE match_id=? AND user_id=?').get(id, u).seat;
/** wait (in server time) until the timing meter is near the top or the bottom */
const meterTo = (s, want) => { for (let i = 0; i < 400; i++) { const m = meterAt(s.app.clock.now()); if (want === 'high' ? m > 0.97 : m < 0.03) return; s.app.clock.advance(20); } throw new Error('meter'); };
const play = (E, st, r) => { const seat = st.turn; const res = E.play(st, seat, E.bot(st, seat, r)); assert.ok(!res.error, JSON.stringify(res)); return res; };

// ------------------------------------------------------------------------------------------ rules: ping pong
test('ping pong: game to 11 win by 2, sudden point at 20-20, best of 3 games, serve changes every 2 points and every point from 10-10', () => {
  const st = pp.newGame(2, rng0()); assert.equal(st.winner, null); assert.equal(st.server, st.firstServer); assert.equal(st.turn, st.server); const f = st.firstServer;
  const srv = (a, b) => { st.points = [a, b]; return pp.serverFor(st); };
  assert.deepEqual([[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]].map(([a, b]) => srv(a, b)), [f, f, 1 - f, 1 - f, f, f].map(x => x), 'two serves each');
  assert.equal(srv(10, 10), f, 'at 10-10 (20 points played) the order restarts with the first server'); assert.equal(srv(11, 10), 1 - f); assert.equal(srv(11, 11), f); assert.equal(srv(12, 11), 1 - f, 'every point from 10-10');
  assert.equal(pp.gameOver(11, 9), true); assert.equal(pp.gameOver(11, 10), false, 'needs a 2-point lead'); assert.equal(pp.gameOver(12, 10), true); assert.equal(pp.gameOver(10, 8), false); assert.equal(pp.gameOver(13, 11), true); assert.equal(pp.gameOver(21, 20), true, 'safety: 21 wins at 20-20');
  // drive a whole match through award(): 11-9, 9-11, 12-10
  const g = pp.newGame(2, rng0(3)); const first = g.firstServer; const winPts = (w, a, b) => { g.points = [a, b]; const s = [0, 0]; s[w]++; pp.sport.award(g, w); };
  g.points = [10, 9]; pp.sport.award(g, 0); assert.deepEqual(g.games, [1, 0]); assert.deepEqual(g.points, [0, 0], 'points reset'); assert.equal(g.gameNo, 2); assert.equal(g.firstServer, 1 - first, 'the receiver of game 1 serves first in game 2'); assert.equal(g.winner, null);
  g.points = [10, 10]; pp.sport.award(g, 1); assert.deepEqual(g.points, [10, 11], '10-11 is not over'); pp.sport.award(g, 1); assert.deepEqual(g.games, [1, 1]); assert.equal(g.gameNo, 3); assert.equal(g.firstServer, first);
  g.points = [10, 4]; pp.sport.award(g, 0); assert.equal(g.winner, 0, 'two games win the match'); void winPts;
  assert.equal(pp.sport.scoreView(g).gamesToWin, 2);
});
test('ping pong: a serve fault is a point for the receiver (no second serve) and the next server follows the rotation', () => {
  let found = 0; for (let seed = 1; seed < 400 && !found; seed++) { const st = pp.newGame(2, rng0()); st.seed = seed; const s = st.turn; const r = pp.play(st, s, { shot: 'spin', aim: 1, depth: 1, timing: 0 }); if (st.log.some(e => e.k === 'error' && e.serve)) { found = seed; assert.deepEqual(st.points, s === 0 ? [0, 1] : [1, 0]); assert.equal(st.phase, 'serve'); assert.equal(st.serveNo, 1, 'no second serve in table tennis'); assert.equal(r.ok, true); } }
  assert.ok(found, 'found a faulting seed');
});
// ------------------------------------------------------------------------------------------ rules: tennis
test('tennis: 0-15-30-40, deuce and advantage, a game needs 2 clear points, golden point after 6-6, first to 4 games wins the set and the match (one short set)', () => {
  assert.deepEqual(tn.pointText(0, 0), ['0', '0']); assert.deepEqual(tn.pointText(2, 1), ['30', '15']); assert.deepEqual(tn.pointText(3, 0), ['40', '0']); assert.deepEqual(tn.pointText(3, 3), ['Deuce', 'Deuce']); assert.deepEqual(tn.pointText(4, 3), ['Adv', '40']); assert.deepEqual(tn.pointText(3, 4), ['40', 'Adv']); assert.deepEqual(tn.pointText(5, 5), ['Deuce', 'Deuce']);
  assert.equal(tn.gameDone(4, 0), true); assert.equal(tn.gameDone(4, 3), false, 'advantage is not game'); assert.equal(tn.gameDone(5, 3), true); assert.equal(tn.gameDone(6, 5), false); assert.equal(tn.gameDone(7, 6), true, 'golden point');
  const st = tn.newGame(2, rng0(5)); const first = st.firstServer; assert.equal(st.setsToWin, 1); assert.equal(tn.sport.serverFor(st), first);
  const game = (w) => { st.points = [0, 0]; for (let i = 0; i < 4; i++) tn.sport.award(st, w); };
  game(0); assert.deepEqual(st.games, [1, 0]); assert.equal(tn.sport.serverFor(st), 1 - first, 'the server changes every game'); game(1); assert.equal(tn.sport.serverFor(st), first); game(0); game(1); assert.deepEqual(st.games, [2, 2]); game(0); game(1); assert.deepEqual(st.games, [3, 3]); assert.equal(st.winner, null); game(0); assert.equal(st.winner, 0); assert.deepEqual(st.sets, [1, 0]);
  // best of 3 sets is supported by the same code
  const b3 = tn.newGame(2, rng0(5)); b3.setsToWin = 2; const g2 = (w) => { b3.points = [0, 0]; for (let i = 0; i < 4; i++) tn.sport.award(b3, w); }; for (let i = 0; i < 4; i++) g2(0); assert.deepEqual(b3.sets, [1, 0]); assert.equal(b3.winner, null); assert.deepEqual(b3.games, [0, 0]); for (let i = 0; i < 4; i++) g2(1); assert.deepEqual(b3.sets, [1, 1]); for (let i = 0; i < 4; i++) g2(0); assert.equal(b3.winner, 0);
});
test('tennis: first-serve fault gives a second serve, a second fault is a double fault (point to the receiver)', () => {
  let single = 0, dbl = 0;
  for (let seed = 1; seed < 600 && !(single && dbl); seed++) {
    const st = tn.newGame(2, rng0()); st.seed = seed; const s = st.turn; const r = tn.play(st, s, { shot: 'flat', aim: 1, depth: 1, timing: 0 }); if (!st.log.some(e => e.k === 'fault')) continue;
    assert.equal(st.serveNo, 2); assert.equal(st.turn, s, 'the same player serves again'); assert.deepEqual(st.points, [0, 0]); assert.equal(r.ok, true); single++;
    const before = st.log.length; tn.play(st, s, { shot: 'flat', aim: 1, depth: 1, timing: 0 }); if (st.log.slice(before).some(e => e.k === 'point' && e.why === 'double fault')) { dbl++; assert.deepEqual(st.points, s === 0 ? [0, 1] : [1, 0]); assert.equal(st.serveNo, 1); assert.equal(st.stats[s].faults, 2); }
  }
  assert.ok(single, 'saw a first-serve fault'); assert.ok(dbl, 'saw a double fault');
});
// ------------------------------------------------------------------------------------------ kernel, determinism, hidden information, validation
test('determinism: the same seed and the same moves give the same match, and the generator is keyed by (seed, exchange, part)', () => {
  for (const E of [pp, tn]) { const run = () => { const r = rng0(11); const st = E.newGame(2, r); st.skill = { 0: LEVELS.club, 1: LEVELS.pro }; while (st.winner == null) play(E, st, r); return JSON.stringify(st); }; assert.equal(run(), run()); }
  assert.equal(rngFor(5, 3, 1)(), rngFor(5, 3, 1)()); assert.notEqual(rngFor(5, 3, 1)(), rngFor(5, 4, 1)()); assert.notEqual(rngFor(5, 3, 1)(), rngFor(6, 3, 1)());
  // replay from the move list alone reproduces every event
  const r = rng0(4); const a = tn.newGame(2, r); const moves = []; while (a.winner == null) { const seat = a.turn; const mv = tn.bot(a, seat, r); moves.push([seat, mv]); tn.play(a, seat, mv); } const b = tn.newGame(() => 0.5); b.seed = a.seed; // same seed, fresh state
  const c = tn.newGame(2, rng0(4)); assert.equal(c.seed, a.seed); for (const [seat, mv] of moves) assert.ok(!tn.play(c, seat, mv).error); assert.deepEqual(c, a); void b;
});
test('the model: exact cover returns easy balls, wide cover rarely returns hard ones; more quality means fewer errors', () => {
  const cfg = pp.cfg; assert.equal(reachOf(cfg, 1, 1, 1, 1), 1); assert.ok(reachOf(cfg, 0, 1, 2, 1) < reachOf(cfg, 1, 1, 2, 1)); assert.ok(reachOf(cfg, 1, 0, 1, 1) < 1);
  assert.ok(returnProb(cfg, 0.25, 0.5, 1) > 0.9); assert.ok(returnProb(cfg, 0.95, 1, 1) < 0.6); assert.ok(returnProb(cfg, 0.95, 1, 0.15) < 0.2); assert.ok(errProb(0.22, 1, 0, 0.78) < errProb(0.22, 0.2, 0, 0.78)); assert.ok(errProb(0.22, 0.5, 0.5, 0.78) > errProb(0.22, 0.5, 0, 0.78), 'a stretched return is harder to control');
  for (const [p, q, r] of [[0, 0, 0], [1, 1, 1], [0.5, 0.5, 0.5]]) { const v = returnProb(cfg, p, q, r); assert.ok(v >= 0.02 && v <= 0.97); }
});
test('hidden information: the receiver never sees the aim, depth or quality of the ball in flight; resolved balls are public', () => {
  const st = pp.newGame(2, rng0()); const s = st.turn; pp.play(st, s, { shot: 'long', aim: 2, depth: 1, timing: 1 }); const v = pp.view(st, 1 - s); assert.equal(st.phase, 'rally');
  if (st.ball) { assert.deepEqual(Object.keys(v.ball).sort(), ['hitter', 'pace', 'serve', 'shot']); assert.ok(!('aim' in v.ball) && !('depth' in v.ball) && !('q' in v.ball)); const ev = st.log.find(e => e.k === 'send'); assert.ok(ev && !('aim' in ev) && !('depth' in ev), 'the log entry for a ball in flight carries no aim'); assert.ok(!JSON.stringify(v.log).includes('"aim"')); assert.ok(!('ball' in pp.view(st, s)) || pp.view(st, s).ball?.hitter === s); assert.equal(v.mine, true); assert.equal(pp.view(st, s).mine, false); }
  const r = pp.play(st, 1 - s, { shot: 'drive', aim: 0, depth: 0, coverAim: 2, coverDepth: 1, timing: 0.8 }); assert.ok(r.ok); const res = st.log.find(e => e.k === 'resolve'); assert.equal(st.hist[s].aim[res.depth * 3 + res.aim], 1, 'the resolved aim is now public history'); assert.equal(st.hist[1 - s].cover[2 + 3], 1); assert.ok(res.cover && res.quality);
});
test('validation: turn order, shot legality (smash only against a lob), forced depth, aim and cover ranges, and no moves after the end', () => {
  const st = tn.newGame(2, rng0()); const s = st.turn;
  assert.equal(tn.play(st, 1 - s, { shot: 'flat', aim: 0, depth: 0 }).error, 'NOT_YOUR_TURN'); assert.equal(tn.play(st, s, { shot: 'smash', aim: 0, depth: 0 }).error, 'BAD_MOVE', 'a smash is not a serve'); assert.equal(tn.play(st, s, { shot: 'flat', aim: 3, depth: 0 }).error, 'BAD_MOVE'); assert.equal(tn.play(st, s, { shot: 'flat', aim: 0, depth: 2 }).error, 'BAD_MOVE');
  // get to a rally
  let seed = 1; do { const n = tn.newGame(2, rng0()); n.seed = seed++; Object.assign(st, n); } while (!(tn.play(st, st.turn, { shot: 'kick', aim: 1, depth: 1, timing: 1 }).ok && st.phase === 'rally')); const r = st.turn;
  assert.equal(tn.play(st, r, { shot: 'flat', aim: 1, depth: 1 }).error, 'BAD_MOVE', 'cover is required when a ball is coming'); assert.equal(tn.play(st, r, { shot: 'smash', aim: 1, depth: 1, coverAim: 1, coverDepth: 1 }).error, 'BAD_MOVE', 'smash needs a lob'); assert.equal(tn.play(st, r, { shot: 'drop', aim: 1, depth: 1, coverAim: 1, coverDepth: 1 }).error, 'BAD_MOVE', 'a drop shot always lands short'); assert.equal(tn.play(st, r, { shot: 'flat', aim: 1, depth: 1, coverAim: 5, coverDepth: 1 }).error, 'BAD_MOVE');
  assert.equal(tn.play(st, r, { shot: 'flat', aim: 1, depth: 1, coverAim: 'x', coverDepth: 1 }).error, 'BAD_MOVE'); assert.ok(!tn.legal(st).includes('smash')); const fin = tn.newGame(2, rng0()); tn.forfeit(fin, 0); assert.equal(fin.winner, 1); assert.equal(tn.play(fin, 1, {}).error, 'GAME_OVER');
  // a lob makes the smash legal
  const L = pp.newGame(2, rng0()); L.phase = 'rally'; L.ball = { hitter: 0, shot: 'lob', serve: false, pace: 0.3, aim: 1, depth: 1, q: 0.5 }; L.turn = 1; assert.ok(pp.legal(L).includes('smash')); L.ball.shot = 'drive'; assert.ok(!pp.legal(L).includes('smash'));
});
test('bots play whole matches in both sports at every level (and a stronger bot wins more often)', () => {
  for (const [E, n, minGap] of [[pp, 50, 0.62], [tn, 50, 0.58]]) {
    const wins = { pro: 0, rookie: 0 };
    for (let i = 0; i < n; i++) { const r = rng0(100 + i); const st = E.newGame(2, r); const proSeat = i % 2; st.skill = { [proSeat]: LEVELS.pro, [1 - proSeat]: LEVELS.rookie }; let moves = 0; while (st.winner == null && moves++ < 4000) play(E, st, r); assert.ok(st.winner === 0 || st.winner === 1, 'a winner'); assert.ok(moves > 40 && moves < 1400, `moves ${moves}`); wins[st.winner === proSeat ? 'pro' : 'rookie']++; }
    assert.ok(wins.pro / n >= minGap, `${E.sport.id}: pro won ${wins.pro}/${n}`);
  }
  for (const lv of Object.values(LEVELS)) { const r = rng0(9); const st = tn.newGame(2, r); st.skill = { 0: lv, 1: lv }; while (st.winner == null) play(tn, st, r); }
});
test('the timing meter is a triangle wave of server time; people cannot send their own timing, bots supply theirs', () => {
  assert.equal(meterAt(0), 0); assert.ok(Math.abs(meterAt(METER_MS / 2) - 1) < 1e-9); assert.ok(Math.abs(meterAt(METER_MS) - 0) < 1e-9); assert.ok(Math.abs(meterAt(METER_MS * 0.25) - 0.5) < 1e-9);
  const app = { clock: { now: () => METER_MS / 2 } }; assert.equal(prep(app, {}, { timing: 0 }, false).timing, 1, 'a person gets the meter value of the server clock'); assert.equal(prep(app, {}, { timing: 0 }, true).timing, 0, 'a bot supplies its own');
  const st = pp.newGame(2, rng0()); for (const k of ['timing']) assert.ok(pp.play(st, st.turn, { shot: 'short', aim: 1, depth: 0, [k]: 99 }).ok, 'out-of-range timing is clamped, not trusted');
});
// ------------------------------------------------------------------------------------------ venue
test('the City Sports Hall is a real building and venue in Lekki: ping pong tables, tennis court, games lounge, coming-soon slots; nothing overlaps; the stadium is untouched', () => {
  const s = makeServer(); const c = s.app.cities['lagos-lekki']; const v = c.venueById[VID]; assert.ok(v); assert.equal(v.kind, 'sports'); const b = c.buildingById[v.buildingId]; assert.ok(b);
  assert.ok(!c.buildings.some(o => o.id !== b.id && Math.abs(o.x - b.x) < (o.w + b.w) / 2 && Math.abs(o.z - b.z) < (o.d + b.d) / 2), 'no building overlaps the hall'); assert.ok(c.venueById.lk_venue_stadium && c.venueById.lk_venue_stadium.stations.length === 7, 'the stadium is as it was');
  const g = (k) => v.stations.filter(x => x.game === k).length; assert.equal(g('pingpong'), 2); assert.equal(g('tennis'), 1); for (const k of ['whot', 'ludo', 'dominoes', 'draughts', 'ayo', 'football']) assert.equal(g(k), 1, k);
  for (const k of ['chess', 'wordduel', 'property', 'suwe']) assert.equal(g(k), 1, 'slot for ' + k); assert.ok(v.stations.some(x => x.type === 'board') && v.stations.some(x => x.type === 'poster')); assert.equal(new Set(v.stations.map(x => x.id)).size, v.stations.length, 'unique station ids');
  assert.ok(v.stations.length <= 16, 'the room stays inside the draw-call budget'); const R = v.room; for (const x of v.stations) assert.ok(Math.abs(x.x) < R.w / 2 && Math.abs(x.z) < R.d / 2, x.id + ' is inside the room');
  assert.ok(c.placeById[VID], 'a travel destination'); const j = JSON.parse(fs.readFileSync(new URL('../server/config/cities/lagos-lekki.json', import.meta.url))); const again = addSportsHall(JSON.parse(JSON.stringify(j))); assert.deepEqual(again, j, 'the tool is idempotent and the JSON is what the tool makes');
});
test('coming-soon slots: shown but not playable; a slot lights up by itself when its game (or an alias) is registered; kinds that are registered are not "soon"', async () => {
  const s = makeServer(); const u = adult(s); const view = await enter(s, u); const by = (id) => view.stations.find(x => x.id === id);
  for (const id of ['pp1', 'pp2', 'tennis1', 'whot1', 'ludo1', 'domino1', 'draughts1', 'ayo1', 'football1']) assert.ok(!by(id).soon, id + ' is open');
  assert.equal(sports.kindOf({ game: 'nope' }), null); assert.equal(sports.kindOf({ game: 'nope', alts: ['football'] }), 'football'); assert.equal(sports.kindOf({ game: 'whot' }), 'whot');
  const ids = ['chess1', 'wordduel1', 'property1', 'suwe1']; for (const id of ids) { const st = by(id); assert.equal(!!st.soon, !GAMES[st.game] && !(st.alts || []).some(a => GAMES[a]), id); }
  // use an unregistered game id for the slot so this test does not depend on which games exist yet (track-c registers suwe, chess, ...)
  const slot = s.app.all.venueById[VID].stations.find(x => x.id === 'suwe1'); const realGame = slot.game; slot.game = 'nope_game'; delete slot.alts;
  { const r = await call(s, 'POST', '/api/game/sit', { uid: u, body: { venueId: VID, stationId: 'suwe1', stake: 0 } }); assert.equal(r.status, 409); assert.equal(r.json.error, 'COMING_SOON'); assert.equal((await call(s, 'POST', '/api/sports/bot', { uid: u, body: { venueId: VID, stationId: 'suwe1', level: 'club' } })).json.error, 'COMING_SOON'); assert.ok((await ok(s, 'GET', `/api/venue?id=${VID}`, { uid: u })).stations.find(x => x.id === 'suwe1').soon); }
  GAMES.suwe_test = { label: 'Suwe test', min: 2, max: 2, eng: GAMES.football.eng }; slot.alts = ['suwe_test'];
  try { const v2 = (await ok(s, 'GET', `/api/venue?id=${VID}`, { uid: u })).stations.find(x => x.id === 'suwe1'); assert.ok(!v2.soon, 'it lights up'); const w = await ok(s, 'POST', '/api/game/sit', { uid: u, body: { venueId: VID, stationId: 'suwe1', stake: 0 } }); assert.equal(raw(s, w.id).kind, 'suwe_test', 'the match is created with the registered kind'); }
  finally { delete GAMES.suwe_test; delete slot.alts; slot.game = realGame; }
});
// ------------------------------------------------------------------------------------------ two players: stakes, escrow, ledger, scoreboard, forfeits
for (const [kind, station, E] of [['pingpong', 'pp1', pp], ['tennis', 'tennis1', tn]]) {
  test(`${kind}: two people play a staked match to the end through the real routes (escrow, timing from the server clock, hidden aim, winner takes the pot, weekly board, ledger holds)`, async () => {
    const s = makeServer(); let seed = 5; s.app.rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const [a, b, extra] = [adult(s, 3000), adult(s, 3000), adult(s)]; await enter(s, a); await enter(s, b); await enter(s, extra);   // (mkUser with an age advances the test clock, so make everybody first)
    const w = (await call(s, 'POST', '/api/game/sit', { uid: a, body: { venueId: VID, stationId: station, stake: 100 } })).json; assert.equal(w.status, 'waiting'); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 100);
    const j = (await call(s, 'POST', '/api/game/sit', { uid: b, body: { venueId: VID, stationId: station, stake: 0 } })).json; assert.equal(j.status, 'active'); assert.equal(j.pot, 200); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 200); assert.equal(j.kind, kind);
    assert.equal((await call(s, 'POST', '/api/game/sit', { uid: extra, body: { venueId: VID, stationId: station, stake: 0 } })).status, 409, 'table busy');
    let moves = 0; const users = [a, b]; const meterSeen = new Set();
    for (let i = 0; i < 3000; i++) {
      s.app.clock.advance(1700); const m = raw(s, w.id); if (m.status !== 'active') break; const st = JSON.parse(m.state); const seat = st.turn; const u = users.find(x => seatOf(s, w.id, x) === seat); assert.equal(u, m.turn_user);
      const mv = E.bot(st, seat, s.app.rng); const v = await ok(s, 'GET', `/api/game?id=${w.id}`, { uid: u }); if (st.ball) assert.ok(!('aim' in v.board.ball)); assert.equal(v.board.mine, true);
      const wrong = await call(s, 'POST', '/api/game/move', { uid: users.find(x => x !== u), body: { matchId: w.id, ...mv } }); assert.equal(wrong.json.error, 'NOT_YOUR_TURN');
      const expectQ = meterAt(s.app.clock.now()); meterSeen.add(Math.round(expectQ * 10)); const r = await call(s, 'POST', '/api/game/move', { uid: u, body: { matchId: w.id, ...mv, timing: 1 } }); assert.equal(r.status, 200, JSON.stringify(r.json)); moves++;
    }
    const fin = raw(s, w.id); assert.equal(fin.status, 'finished'); assert.ok(moves > 30); assert.ok(meterSeen.size > 3, 'the server clock gave a range of timings'); assert.ok(fin.winner);
    const win = fin.winner, lose = users.find(x => x !== win); assert.equal(balanceOf(s.db, cashId(win)), 3000 + 100); assert.equal(balanceOf(s.db, cashId(lose)), 3000 - 100); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 0);
    const rows = (await ok(s, 'GET', `/api/scoreboard?kind=${kind}`, { uid: a })).rows; assert.equal(rows[0].wins, 1); assert.equal(rows[0].points, s.app.balance.games.pointsWin); assert.equal(checkInvariants(s.db).ok, true);
    const tx = s.db.prepare("SELECT reason, COUNT(*) n FROM ledger_tx WHERE ref=? GROUP BY reason").all(`match:${w.id}`); assert.deepEqual(Object.fromEntries(tx.map(t => [t.reason, t.n])), { game_stake: 2, game_win: 1 }, 'audit rows: two stakes in, one pot out');
  });
}
test('the server clock decides the quality of a hit: the same serve at the top and at the bottom of the meter gets very different quality, whatever timing the client sends', async () => {
  const s = makeServer(); s.app.rng = () => 0.4; const [a, b, c, d] = [adult(s), adult(s), adult(s), adult(s)]; for (const u of [a, b, c, d]) await enter(s, u);
  const serveAt = async (station, p1, p2, level) => { const w = (await call(s, 'POST', '/api/game/sit', { uid: p1, body: { venueId: VID, stationId: station, stake: 0 } })).json; await call(s, 'POST', '/api/game/sit', { uid: p2, body: { venueId: VID, stationId: station, stake: 0 } });
    const m = raw(s, w.id); meterTo(s, level); const expect = meterAt(s.app.clock.now()); const r = await call(s, 'POST', '/api/game/move', { uid: m.turn_user, body: { matchId: w.id, shot: 'short', aim: 1, depth: 0, timing: level === 'high' ? 0 : 1 } }); assert.equal(r.status, 200);
    const st = JSON.parse(raw(s, w.id).state); return { st, expect }; };
  const hi = await serveAt('pp1', a, b, 'high'), lo = await serveAt('pp2', c, d, 'low');
  assert.ok(hi.expect > 0.97 && lo.expect < 0.03); if (hi.st.ball) assert.ok(Math.abs(hi.st.ball.q - hi.expect) < 0.002, 'quality = the server meter, not the client timing 0'); else assert.equal(hi.st.log.find(e => e.k === 'error').quality, 'perfect');
  if (lo.st.ball) assert.ok(Math.abs(lo.st.ball.q - lo.expect) < 0.002 && lo.st.ball.q < 0.05, 'quality = the server meter, not the client timing 1'); else assert.equal(lo.st.log.find(e => e.k === 'error').quality, 'poor');
});
test('forfeits: a person who runs out of the 90 s turn clock loses the match and the pot goes to the other player; resigning does the same; the weekly board counts it', async () => {
  const s = makeServer(); s.app.rng = () => 0.3; const [a, b] = [adult(s), adult(s)]; await enter(s, a); await enter(s, b); const w = (await call(s, 'POST', '/api/game/sit', { uid: a, body: { venueId: VID, stationId: 'tennis1', stake: 500 } })).json; await call(s, 'POST', '/api/game/sit', { uid: b, body: { venueId: VID, stationId: 'tennis1', stake: 0 } });
  const m = raw(s, w.id); assert.equal(m.status, 'active'); assert.equal(m.deadline_at - m.updated_at, s.app.balance.games.turnMs); const slow = m.turn_user; const fast = slow === a ? b : a; s.app.clock.advance(91000); s.app.tickNow?.(); const g = await ok(s, 'GET', `/api/game?id=${w.id}`, { uid: fast });
  assert.equal(g.status, 'finished'); assert.equal(raw(s, w.id).winner, fast); assert.equal(balanceOf(s.db, cashId(fast)), 3000 + 500); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 0);
  const w2 = (await call(s, 'POST', '/api/game/sit', { uid: a, body: { venueId: VID, stationId: 'pp2', stake: 100 } })).json; await call(s, 'POST', '/api/game/sit', { uid: b, body: { venueId: VID, stationId: 'pp2', stake: 0 } }); await ok(s, 'POST', '/api/game/leave', { uid: a, body: { matchId: w2.id } }); assert.equal(raw(s, w2.id).winner, b); assert.equal(checkInvariants(s.db).ok, true);
});
test('a person cannot stake against the bot: bot matches are friendly, and the stake of a waiting table is refunded when you leave', async () => {
  const s = makeServer(); const u = adult(s); await enter(s, u); const g = await ok(s, 'POST', '/api/sports/bot', { uid: u, body: { venueId: VID, stationId: 'pp1', level: 'club', stake: 500 } }); assert.equal(g.stake, 0); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 0); assert.equal(balanceOf(s.db, cashId(u)), 3000);
  assert.equal(g.status, 'active'); assert.deepEqual(g.players.map(p => p.name).slice(1), ['Rally_Club']);
});
// ------------------------------------------------------------------------------------------ the bot opponent and its prize
async function botMatch(s, u, station, level, { skillMe = 1 } = {}) {
  const g = await ok(s, 'POST', '/api/sports/bot', { uid: u, body: { venueId: VID, stationId: station, level } }); const id = g.id; const m0 = raw(s, id); const st = JSON.parse(m0.state); st.skill = { ...(st.skill || {}), 0: skillMe }; s.db.prepare('UPDATE game_matches SET state=? WHERE id=?').run(JSON.stringify(st), id);
  const E = GAMES[m0.kind].eng; for (let i = 0; i < 4000; i++) { const m = raw(s, id); if (m.status !== 'active') break; assert.equal(m.turn_user, u, 'it is always the person\'s turn (the bot answers at once)'); const cur = JSON.parse(m.state); meterTo(s, 'high'); const r = await call(s, 'POST', '/api/game/move', { uid: u, body: { matchId: id, ...E.bot(cur, 0, s.app.rng) } }); assert.equal(r.status, 200, JSON.stringify(r.json)); s.app.clock.advance(250); } return raw(s, id);
}
test('vs bot: the match starts active with the bot seated, the bot answers instantly, the person is never kept waiting; a win pays the capped prize once; practice games stay off the weekly board', async () => {
  const s = makeServer(); let seed = 9; s.app.rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const u = adult(s, 1000); const other = adult(s); await enter(s, u); await enter(s, other);
  assert.equal((await call(s, 'POST', '/api/sports/bot', { uid: u, body: { venueId: VID, stationId: 'whot1', level: 'club' } })).json.error, 'NO_BOT_HERE'); assert.equal((await call(s, 'POST', '/api/sports/bot', { uid: u, body: { venueId: VID, stationId: 'pp1', level: 'genius' } })).json.error, 'BAD_LEVEL');
  const lv = await ok(s, 'GET', '/api/sports/levels', { uid: u }); assert.deepEqual(lv.levels.map(l => l.id), ['rookie', 'club', 'pro']); assert.deepEqual(lv.levels.map(l => l.prize), [15, 30, 60]);
  const first = await ok(s, 'POST', '/api/sports/bot', { uid: u, body: { venueId: VID, stationId: 'pp1', level: 'rookie' } }); assert.equal(first.status, 'active'); assert.equal(first.board.mine, true); assert.equal((await call(s, 'POST', '/api/sports/bot', { uid: u, body: { venueId: VID, stationId: 'pp2', level: 'rookie' } })).json.error, 'ALREADY_PLAYING');
  assert.equal((await call(s, 'POST', '/api/sports/bot', { uid: other, body: { venueId: VID, stationId: 'pp1', level: 'rookie' } })).json.error, 'TABLE_BUSY'); await ok(s, 'POST', '/api/game/leave', { uid: u, body: { matchId: first.id } });
  const before = balanceOf(s.db, cashId(u)); let paid = 0, wins = 0;
  for (let i = 0; i < 12 && wins < 1; i++) { const m = await botMatch(s, u, 'pp1', 'rookie'); assert.equal(m.status, 'finished'); if (m.winner === u) { wins++; paid = balanceOf(s.db, cashId(u)) - before; } }
  assert.equal(wins, 1, 'a strong person beats the rookie bot'); assert.equal(paid, 15); const tx = s.db.prepare("SELECT * FROM ledger_tx WHERE reason='sports_prize'").all(); assert.equal(tx.length, 1); assert.match(tx[0].ref, /^match:\d+:pingpong$/);
  assert.equal(s.db.prepare("SELECT COUNT(*) c FROM game_scores WHERE user_id=?").get(u).c, 0, 'bot games never reach the weekly board'); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 0); assert.equal(checkInvariants(s.db).ok, true);
  assert.equal(s.db.prepare("SELECT earned FROM casual_daily WHERE user_id=?").get(u).earned, 15, 'the prize counts against the shared daily game-money cap');
});
test('vs bot prize rules: at most 3 prizes a day per game, never beyond the shared daily cap, no prize for a brand-new account or a lost or forfeited match; settle is idempotent', async () => {
  const s = makeServer(); let seed = 3; s.app.rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const u = adult(s, 100); await enter(s, u); let n = 0; const prizes = () => s.db.prepare("SELECT COUNT(*) c FROM ledger_tx WHERE reason='sports_prize' AND user_id=?").get(u).c;
  for (let i = 0; i < 40 && prizes() < 3; i++) { await botMatch(s, u, 'tennis1', 'rookie'); n++; } assert.equal(prizes(), 3); const m4 = []; for (let i = 0; i < 8; i++) { const m = await botMatch(s, u, 'tennis1', 'rookie'); m4.push(m.winner === u ? m.result : null); }
  assert.equal(prizes(), 3, 'a fourth win pays nothing'); assert.ok(m4.some(r => r && /bot prizes/.test(r)), 'the result says why: ' + JSON.stringify(m4));
  // the shared daily cap trims a prize
  const s2 = makeServer(); s2.app.rng = s.app.rng; s2.app.balance.casual.dailyCap = 20; const u2 = adult(s2, 100); await enter(s2, u2); let got = 0; for (let i = 0; i < 30 && got < 1; i++) { const m = await botMatch(s2, u2, 'pp1', 'pro'); if (m.winner === u2) got++; }
  const p2 = s2.db.prepare("SELECT amount FROM ledger_entries e JOIN ledger_tx t ON t.id=e.tx_id WHERE t.reason='sports_prize' AND e.account_id=?").all(cashId(u2)); assert.ok(p2.length >= 1 && p2[0].amount <= 20, 'trimmed to the cap: ' + JSON.stringify(p2)); assert.ok(s2.db.prepare("SELECT earned FROM casual_daily WHERE user_id=?").get(u2).earned <= 20);
  // a brand-new account plays for practice only
  const s3 = makeServer(); s3.app.rng = s.app.rng; const nu = mkUser(s3, { cash: 50 }); await enter(s3, nu); let won = null; for (let i = 0; i < 20 && !won; i++) { const m = await botMatch(s3, nu, 'pp2', 'rookie'); if (m.winner === nu) won = m; } assert.ok(won); assert.match(won.result, /Practice win/); assert.equal(s3.db.prepare("SELECT COUNT(*) c FROM ledger_tx WHERE reason='sports_prize'").get().c, 0); assert.equal(balanceOf(s3.db, cashId(nu)), 50);
  // resign and timeout never pay
  const r = await ok(s, 'POST', '/api/sports/bot', { uid: u, body: { venueId: VID, stationId: 'pp1', level: 'rookie' } }); await ok(s, 'POST', '/api/game/leave', { uid: u, body: { matchId: r.id } }); assert.equal(raw(s, r.id).winner, s.db.prepare("SELECT id FROM users WHERE username='Rally_Rookie'").get().id); assert.equal(prizes(), 3);
  for (const id of s.db.prepare("SELECT id FROM game_matches WHERE status='finished'").all().map(x => x.id)) sports.botReplies(s.app, id); assert.equal(prizes(), 3, 'idempotent');
  assert.equal(checkInvariants(s.db).ok, true); assert.equal(checkInvariants(s2.db).ok, true); void n;
});
test('the generic Practice Bot also plays friendly ping pong and tennis tables to the end without scoring or moving money', async () => {
  const { startPracticeBot } = await import('../server/core/practice-bot.js'); const s = makeServer(); s.app.rng = () => 0.37; const bot = startPracticeBot(s.app, { intervalMs: 1e9 }); const u = adult(s, 100); await enter(s, u);
  for (const station of ['pp2', 'tennis1']) { const w = (await call(s, 'POST', '/api/game/sit', { uid: u, body: { venueId: VID, stationId: station, stake: 0 } })).json; bot.step(); assert.equal(raw(s, w.id).status, 'active');
    for (let i = 0; i < 4000 && raw(s, w.id).status !== 'finished'; i++) { s.app.clock.advance(1000); const m = raw(s, w.id); if (m.turn_user === u) { const st = JSON.parse(m.state); assert.equal((await call(s, 'POST', '/api/game/move', { uid: u, body: { matchId: w.id, ...GAMES[m.kind].eng.bot(st, seatOf(s, w.id, u), s.app.rng) } })).status, 200); } else bot.step(); }
    assert.equal(raw(s, w.id).status, 'finished', station); await call(s, 'POST', '/api/game/leave', { uid: u, body: { matchId: w.id } }); }
  assert.equal(balanceOf(s.db, cashId(u)), 100); assert.equal(s.db.prepare("SELECT COUNT(*) c FROM game_scores WHERE user_id=?").get(bot.uid).c, 0); assert.equal(checkInvariants(s.db).ok, true);
});
