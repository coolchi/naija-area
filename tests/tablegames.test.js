import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at } from './helpers.js';
import { checkInvariants, balanceOf, cashId, SYS } from '../server/core/ledger.js';
import { GAMES } from '../server/core/games.js';
import { startPracticeBot } from '../server/core/practice-bot.js';

const V = (s, id) => s.app.city.venues.find(v => v.id === id);
const enter = async (s, u, id) => { const v = V(s, id); at(s, u, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); return ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: id } }); };
const adult = (s, cash) => mkUser(s, { cash, ageMs: 10 * 60000 });
const sit = (s, u, venueId, stationId, stake) => call(s, 'POST', '/api/game/sit', { uid: u, body: { venueId, stationId, stake } });
const raw = (s, id) => s.db.prepare('SELECT * FROM game_matches WHERE id=?').get(id);
const seatOf = (s, id, u) => s.db.prepare('SELECT seat FROM game_players WHERE match_id=? AND user_id=?').get(id, u).seat;

// each new game is played to the end through the real HTTP routes, with the engine's bot choosing moves from the SERVER-side state
for (const [kind, venue, station, n] of [['dominoes', 'venue_joint', 'domino1', 3], ['draughts', 'venue_viewing', 'draughts1', 2], ['ayo', 'venue_mamaput', 'ayo1', 2]]) {
  test(`${kind}: stations exist, escrow in, hidden info stays hidden, server validates moves, a full game pays the pot and ledger/scoreboard hold`, async () => {
    const s = makeServer(); let seed = 5; s.app.rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const us = Array.from({ length: n }, () => adult(s, 3000)); for (const u of us) await enter(s, u, venue);
    assert.ok(V(s, venue).stations.some(x => x.id === station && x.game === kind)); const w = (await sit(s, us[0], venue, station, 100)).json; assert.equal(w.status, 'waiting');
    for (let i = 1; i < n; i++) { const j = (await sit(s, us[i], venue, station, 0)).json; assert.equal(j.status, i + 1 < GAMES[kind].max ? 'waiting' : 'active'); }
    let v; if (n === 2) v = await ok(s, 'GET', `/api/game?id=${w.id}`, { uid: us[0] }); else { assert.equal((await call(s, 'POST', '/api/game/start', { uid: us[1], body: { matchId: w.id } })).json.error, 'NO_MATCH'); v = await ok(s, 'POST', '/api/game/start', { uid: us[0], body: { matchId: w.id } }); }
    assert.equal(v.status, 'active'); assert.equal(v.pot, 100 * n); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 100 * n); assert.equal(v.kind, kind);
    if (kind === 'dominoes') { const mine = await ok(s, 'GET', `/api/game?id=${w.id}`, { uid: us[1] }); assert.equal(mine.board.hand.length, 7); const st = JSON.parse(raw(s, w.id).state); assert.notDeepEqual(mine.board.hand, st.hands[seatOf(s, w.id, us[0])].map(t => t.join('-'))); assert.ok(!JSON.stringify(mine).includes(JSON.stringify(st.hands[seatOf(s, w.id, us[0])]))); }
    const eng = GAMES[kind].eng; let moves = 0;
    for (let i = 0; i < 1500; i++) { s.app.clock.advance(1500); const m = raw(s, w.id); if (m.status !== 'active') break; const st = JSON.parse(m.state); const seat = st.turn; const u = us.find(x => seatOf(s, w.id, x) === seat); assert.equal(u, m.turn_user);
      const bad = await call(s, 'POST', '/api/game/move', { uid: us.find(x => x !== u), body: { matchId: w.id, ...eng.bot(st, seat, s.app.rng) } }); assert.equal(bad.json.error, 'NOT_YOUR_TURN');
      const r = await call(s, 'POST', '/api/game/move', { uid: u, body: { matchId: w.id, ...eng.bot(st, seat, s.app.rng) } }); assert.equal(r.status, 200, JSON.stringify(r.json)); moves++; }
    const fin = raw(s, w.id); assert.equal(fin.status, 'finished'); assert.ok(moves > 5);
    if (fin.winner) { assert.equal(balanceOf(s.db, cashId(fin.winner)), 3000 - 100 + 100 * n); assert.equal((await ok(s, 'GET', `/api/scoreboard?kind=${kind}`, { uid: us[0] })).rows[0].wins, 1); }
    else for (const u of us) assert.equal(balanceOf(s.db, cashId(u)), 3000, 'a draw refunds the stake');
    assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 0); assert.equal(checkInvariants(s.db).ok, true);
  });
}
test('draughts/ayo/dominoes: illegal moves are refused with a clear error and do not change the state', async () => {
  const s = makeServer(); s.app.rng = () => 0.1; const [a, b] = [adult(s, 500), adult(s, 500)]; await enter(s, a, 'venue_viewing'); await enter(s, b, 'venue_viewing'); const w = (await sit(s, a, 'venue_viewing', 'draughts1', 0)).json; await sit(s, b, 'venue_viewing', 'draughts1', 0);
  const m = raw(s, w.id); const mover = m.turn_user; const before = m.state; const r = await call(s, 'POST', '/api/game/move', { uid: mover, body: { matchId: w.id, from: '0,0', to: '9,9' } }); assert.equal(r.status, 400); assert.equal(raw(s, w.id).state, before);
});
test('practice bot plays Dominoes, Draughts and Ayo friendly tables to the end without scoring or moving money', async () => {
  const s = makeServer(); s.app.rng = () => 0.37; const bot = startPracticeBot(s.app, { intervalMs: 1e9 }); const u = adult(s, 100);
  for (const [venue, station] of [['venue_viewing', 'draughts1'], ['venue_mamaput', 'ayo1'], ['venue_joint', 'domino1']]) {
    await enter(s, u, venue); const w = (await sit(s, u, venue, station, 0)).json; if (station === 'domino1') { bot.step(); await ok(s, 'POST', '/api/game/start', { uid: u, body: { matchId: w.id } }); } else bot.step();
    for (let i = 0; i < 3000 && raw(s, w.id).status !== 'finished'; i++) { s.app.clock.advance(1000); const m = raw(s, w.id); if (m.turn_user === u) { const st = JSON.parse(m.state); const eng = GAMES[m.kind].eng; assert.equal((await call(s, 'POST', '/api/game/move', { uid: u, body: { matchId: w.id, ...eng.bot(st, seatOf(s, w.id, u), s.app.rng) } })).status, 200); } else bot.step(); }
    assert.equal(raw(s, w.id).status, 'finished', `${station} ends`); await ok(s, 'POST', '/api/game/leave', { uid: u, body: { matchId: w.id } }).catch(() => {}); }
  assert.equal(balanceOf(s.db, cashId(u)), 100); assert.equal(s.db.prepare("SELECT COUNT(*) c FROM game_scores WHERE user_id=?").get(bot.uid).c, 0); assert.equal(checkInvariants(s.db).ok, true);
});
