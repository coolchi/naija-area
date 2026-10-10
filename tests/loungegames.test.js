// The Sports and Games Hall lounge (Lekki) has four slots for the Track C games: Chess, Word Duel, the Lagos property game (Landlord Lagos) and Suwe. They were "coming soon" until
// those games were registered; now each must be a normal, playable, staked table: the slot resolves to the registered game, a whole match is played through the real HTTP routes,
// the pot goes to the winner, a draw refunds, and the ledger holds. GAME MONEY ONLY.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at } from './helpers.js';
import { checkInvariants, balanceOf, cashId, SYS } from '../server/core/ledger.js';
import { enterCity } from '../server/core/cities.js';
import { GAMES } from '../server/core/games.js';
import * as sports from '../server/core/sports.js';

const VID = 'lk_venue_sports';
const adult = (s, cash = 3000) => mkUser(s, { cash, ageMs: 10 * 60000 });
async function enter(s, u) { enterCity(s.app, u, 'lagos-lekki'); const v = s.app.cities['lagos-lekki'].venueById[VID]; at(s, u, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); return ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: VID } }); }
const raw = (s, id) => s.db.prepare('SELECT * FROM game_matches WHERE id=?').get(id);
const seatOf = (s, id, u) => s.db.prepare('SELECT seat FROM game_players WHERE match_id=? AND user_id=?').get(id, u).seat;
const sit = (s, u, stationId, stake) => call(s, 'POST', '/api/game/sit', { uid: u, body: { venueId: VID, stationId, stake } });

test('the four lounge slots resolve to the registered games and are no longer coming soon', async () => {
  const s = makeServer(); const u = adult(s); const view = await enter(s, u);
  const want = { chess1: 'chess', wordduel1: 'wordduel', property1: 'landlord', suwe1: 'suwe' };
  const stations = view.venue?.stations || view.stations || s.app.cities['lagos-lekki'].venueById[VID].stations;
  for (const [id, kind] of Object.entries(want)) { const st = stations.find(x => x.id === id); assert.ok(st, id); assert.ok(!st.soon, `${id} is open`); assert.equal(sports.kindOf(s.app.cities['lagos-lekki'].venueById[VID].stations.find(x => x.id === id)), kind); assert.ok(GAMES[kind], kind); }
});

for (const [kind, station] of [['chess', 'chess1'], ['wordduel', 'wordduel1'], ['landlord', 'property1'], ['suwe', 'suwe1']]) {
  test(`lounge ${station} (${kind}): two players, staked, played to the end through the HTTP routes, pot paid or refunded, ledger holds`, async () => {
    const s = makeServer(); let seed = 11; s.app.rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const us = [adult(s), adult(s)]; for (const u of us) await enter(s, u);
    const w = (await sit(s, us[0], station, 100)).json; assert.equal(w.status, 'waiting', JSON.stringify(w)); assert.equal(w.kind, kind);
    const j = (await sit(s, us[1], station, 0)).json; assert.ok(['active', 'waiting'].includes(j.status));
    if (j.status === 'waiting') await ok(s, 'POST', '/api/game/start', { uid: us[0], body: { matchId: w.id } });
    assert.equal(raw(s, w.id).status, 'active'); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 200);
    const eng = GAMES[kind].eng; let moves = 0;
    for (let i = 0; i < 3000; i++) { s.app.clock.advance(kind === 'suwe' ? 15000 : 1500); const m = raw(s, w.id); if (m.status !== 'active') break; /* a Suwe turn takes a person a few seconds: the server refuses instant answers */ const st = JSON.parse(m.state); const seat = st.turn; const u = us.find(x => seatOf(s, w.id, x) === seat);
      const mv = eng.bot(st, seat, s.app.rng); const r = await call(s, 'POST', '/api/game/move', { uid: u, body: { matchId: w.id, ...mv } }); assert.equal(r.status, 200, JSON.stringify(r.json)); moves++; }
    const fin = raw(s, w.id); assert.equal(fin.status, 'finished'); assert.ok(moves > 3);
    if (fin.winner) assert.equal(balanceOf(s.db, cashId(fin.winner)), 3000 - 100 + 200); else for (const u of us) assert.equal(balanceOf(s.db, cashId(u)), 3000, 'a draw refunds the stake');
    assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 0); assert.equal(checkInvariants(s.db).ok, true);
  });
}
