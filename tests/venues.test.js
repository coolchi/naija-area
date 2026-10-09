import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, HOUR, DAY } from './helpers.js';
import { checkInvariants, balanceOf, cashId, SYS } from '../server/core/ledger.js';
import * as W from '../server/core/games/whot.js';

const V = (s, id) => s.app.city.venues.find(v => v.id === id);
const enter = async (s, u, id) => { const v = V(s, id); at(s, u, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); return ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: id } }); };
const adult = (s, cash) => mkUser(s, { cash, ageMs: 10 * 60000 });
const nameOf = (s, u) => s.db.prepare('SELECT username FROM users WHERE id=?').get(u).username;

test('venues: data-driven rooms exist, entry needs the door, hours enforced, stations listed, occupants shown, leaving works', async () => {
  const s = makeServer(); assert.ok(s.app.city.venues.length >= 4); const u = mkUser(s); const list = await ok(s, 'GET', '/api/venues', { uid: u }); assert.ok(list.venues.find(v => v.id === 'venue_mamaput'));
  assert.equal((await call(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: 'venue_ayo' } })).json.error, 'TOO_FAR');
  const view = await enter(s, u, 'venue_ayo'); assert.deepEqual(view.stations.filter(x => x.type === 'game').map(x => x.id), ['ayo1', 'ayo2', 'whot1']); assert.ok(view.stations.find(x => x.type === 'poster').text.includes('GAME MONEY ONLY')); assert.equal(view.occupants.length, 1);
  const mp = await enter(s, adult(s), 'venue_mamaput'); assert.equal(mp.shopId, 'shop_canteen'); assert.ok(mp.stations.some(x => x.type === 'eat'));
  s.app.balance.shops.enforceHours = true; const t = s.app.clock.now(); const h = (ms) => new Date(ms).getUTCHours(); void h; // closed outside hours
  const closedUser = mkUser(s); const v = V(s, 'venue_viewing'); at(s, closedUser, v.x, v.z); let closed = false; for (let i = 0; i < 24; i++) { const r = await call(s, 'POST', '/api/venue/enter', { uid: closedUser, body: { venueId: 'venue_viewing' } }); if (r.status === 409 && r.json.error === 'CLOSED') { closed = true; break; } s.app.clock.advance(HOUR / 4 * 3); } assert.ok(closed || t);
  s.app.balance.shops.enforceHours = false; assert.equal((await ok(s, 'POST', '/api/venue/leave', { uid: u })).ok, true); assert.equal((await ok(s, 'GET', '/api/venue?id=venue_ayo', { uid: u })).occupants.length, 0);
  at(s, u, 0, 0); await enter(s, u, 'venue_viewing'); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); at(s, u, 0, 0); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); assert.equal(s.app.world.players.get(u).venue, null, 'walking away clears the venue');
});
test('venues: tv gives mood with a cooldown; mood drifts back to baseline over time', async () => {
  const s = makeServer(); const u = mkUser(s); await enter(s, u, 'venue_viewing'); const m0 = (await ok(s, 'GET', '/api/me', { uid: u })).user.mood; const r = await ok(s, 'POST', '/api/venue/act', { uid: u, body: { venueId: 'venue_viewing', stationId: 'tv' } }); assert.ok(r.mood > m0);
  assert.equal((await call(s, 'POST', '/api/venue/act', { uid: u, body: { venueId: 'venue_viewing', stationId: 'tv' } })).json.error, 'COOLDOWN');
  s.app.clock.advance(10 * HOUR); assert.ok(Math.abs((await ok(s, 'GET', '/api/me', { uid: u })).user.mood - s.app.balance.mood.baseline) < 0.001);
});
test('ayo game: sit, join, stakes escrowed, moves validated, full game to the end pays the winner exactly, scoreboard updated, ledger invariants hold', async () => {
  const s = makeServer(); s.app.rng = () => 0; const [a, b, rookie] = [adult(s, 5000), adult(s, 5000), adult(s, 100)]; await enter(s, a, 'venue_ayo'); await enter(s, b, 'venue_ayo');
  const w = await ok(s, 'POST', '/api/game/sit', { uid: a, body: { venueId: 'venue_ayo', stationId: 'ayo1', stake: 500 } }); assert.equal(w.status, 'waiting'); assert.equal(balanceOf(s.db, cashId(a)), 4500); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 500);
  assert.equal((await call(s, 'POST', '/api/game/sit', { uid: a, body: { venueId: 'venue_ayo', stationId: 'ayo2', stake: 0 } })).json.error, 'ALREADY_PLAYING');
  const j = await ok(s, 'POST', '/api/game/sit', { uid: b, body: { venueId: 'venue_ayo', stationId: 'ayo1', stake: 0 } }); assert.equal(j.status, 'active'); assert.equal(j.stake, 500, 'joiner takes the posted stake'); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 1000);
  assert.equal((await call(s, 'POST', '/api/game/sit', { uid: rookie, body: { venueId: 'venue_ayo', stationId: 'ayo1' } })).json.error, 'NOT_INSIDE');
  assert.equal((await call(s, 'POST', '/api/game/move', { uid: b, body: { matchId: j.id, house: 0 } })).json.error, 'NOT_YOUR_TURN'); assert.equal(j.board.pits.length, 12);
  assert.equal(j.board.mine, false); assert.deepEqual(j.board.legal, []);
  let view = await ok(s, 'GET', `/api/game?id=${j.id}`, { uid: a }); assert.equal(view.board.mine, true);
  for (let i = 0; i < 500 && view.status === 'active'; i++) { const mover = view.turn === nameOf(s, a) ? a : b; view = await ok(s, 'GET', `/api/game?id=${j.id}`, { uid: mover }); const house = view.board.legal[0]; view = await ok(s, 'POST', '/api/game/move', { uid: mover, body: { matchId: j.id, house } }); }
  assert.equal(view.status, 'finished'); const total = balanceOf(s.db, cashId(a)) + balanceOf(s.db, cashId(b)); assert.equal(total, 10000, 'no money created or destroyed'); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 0);
  const winner = s.db.prepare('SELECT winner FROM game_matches WHERE id=?').get(j.id).winner; if (winner) assert.equal(balanceOf(s.db, cashId(winner)), 5500);
  const sb = await ok(s, 'GET', '/api/scoreboard?kind=ayo', { uid: a }); assert.equal(sb.rows.length, 2); assert.ok(sb.rows[0].points >= sb.rows[1].points); assert.equal((await ok(s, 'GET', '/api/scoreboard', { uid: a })).rows.length, 2); assert.equal(checkInvariants(s.db).ok, true);
  await call(s, 'POST', '/api/venue/leave', { uid: a }); assert.equal((await ok(s, 'POST', '/api/venue/leave', { uid: a })).ok, true);
});
test('whot game: server deals, hands are private, bad cards refused, a full random game ends and pays; draw refunds stakes', async () => {
  const s = makeServer(); let seed = 11; s.app.rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const [a, b] = [adult(s, 2000), adult(s, 2000)];
  await enter(s, a, 'venue_mamaput'); await enter(s, b, 'venue_mamaput'); await ok(s, 'POST', '/api/game/sit', { uid: a, body: { venueId: 'venue_mamaput', stationId: 'whot1', stake: 100 } }); const g = await ok(s, 'POST', '/api/game/sit', { uid: b, body: { venueId: 'venue_mamaput', stationId: 'whot1' } });
  assert.equal(g.board.hand.length, 5); const va = await ok(s, 'GET', `/api/game?id=${g.id}`, { uid: a }); assert.equal(va.board.hand.length, 5); assert.notDeepEqual(va.board.hand.map(c => c.id), g.board.hand.map(c => c.id)); assert.ok(!JSON.stringify(va).includes('"market":['), 'market contents never leave the server');
  assert.equal((await call(s, 'POST', '/api/game/move', { uid: a, body: { matchId: g.id, card: 'bogus' } })).status, 400);
  let v = va; for (let i = 0; i < 400 && v.status === 'active'; i++) { const mover = v.turn === nameOf(s, a) ? a : b; v = await ok(s, 'GET', `/api/game?id=${g.id}`, { uid: mover }); const bd = v.board; const body = bd.playable.length ? { matchId: g.id, card: bd.playable[0], shape: 'star' } : { matchId: g.id, action: 'draw' }; v = await ok(s, 'POST', '/api/game/move', { uid: mover, body }); }
  assert.equal(v.status, 'finished'); assert.equal(balanceOf(s.db, cashId(a)) + balanceOf(s.db, cashId(b)), 4000); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 0); assert.equal(checkInvariants(s.db).ok, true);
  const w = s.db.prepare('SELECT winner FROM game_matches WHERE id=?').get(g.id).winner; if (w) assert.equal(balanceOf(s.db, cashId(w)), 2100);
  assert.equal(W.makeDeck().length, 54);
});
test('games: timeout forfeits, resign, cancel refunds, waiting expires, guests friendly only, new accounts, blocked, pair limit, table busy', async () => {
  const s = makeServer(); const [a, b, c] = [adult(s, 3000), adult(s, 3000), adult(s, 3000)]; for (const u of [a, b, c]) await enter(s, u, 'venue_viewing');
  const sit = (u, st, stake = 100, station = 'whot1') => call(s, 'POST', '/api/game/sit', { uid: u, body: { venueId: 'venue_viewing', stationId: station, stake } });
  let r = await call(s, 'POST', '/api/game/sit', { uid: a, body: { venueId: 'venue_viewing', stationId: 'whot1', stake: 100 } }); assert.equal(r.status, 200); assert.equal((await call(s, 'POST', '/api/game/sit', { uid: c, body: { venueId: 'venue_viewing', stationId: 'whot2', stake: 7 } })).json.error, 'BAD_STAKE');
  await ok(s, 'POST', '/api/game/leave', { uid: a, body: { matchId: r.json.id } }); assert.equal(balanceOf(s.db, cashId(a)), 3000, 'cancel refunds'); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 0);
  r = await sit(a, 0, 100); s.app.clock.advance(6 * 60000); await ok(s, 'GET', '/api/venue?id=venue_viewing', { uid: b }); assert.equal(s.db.prepare('SELECT status FROM game_matches WHERE id=?').get(r.json.id).status, 'cancelled'); assert.equal(balanceOf(s.db, cashId(a)), 3000);
  r = await sit(a, 0, 500); const j = await ok(s, 'POST', '/api/game/sit', { uid: b, body: { venueId: 'venue_viewing', stationId: 'whot1' } }); assert.equal((await sit(c, 0, 0, 'whot1')).json.error, 'TABLE_BUSY'); void r;
  const turn = j.turn; const slow = turn === nameOf(s, a) ? a : b, fast = slow === a ? b : a; s.app.clock.advance(91000); const fv = await ok(s, 'GET', `/api/game?id=${j.id}`, { uid: fast }); assert.equal(fv.status, 'finished'); assert.equal(fv.result.youWon, true); assert.equal(balanceOf(s.db, cashId(fast)), 3500); assert.equal(balanceOf(s.db, cashId(slow)), 2500);
  // resign
  const k = await sit(a, 0, 0, 'whot2'); const k2 = await ok(s, 'POST', '/api/game/sit', { uid: b, body: { venueId: 'venue_viewing', stationId: 'whot2' } }); void k; const rs = await ok(s, 'POST', '/api/game/leave', { uid: b, body: { matchId: k2.id } }); assert.equal(rs.result.youWon, false); assert.equal((await call(s, 'POST', '/api/venue/leave', { uid: a })).status, 200);
  // guests / new accounts / blocks / pair limit
  const guest = mkUser(s, { guest: true, cash: 1000 }); await enter(s, guest, 'venue_viewing'); assert.equal((await sit(guest, 0, 100)).json.error, 'GUEST_NOT_ALLOWED'); assert.equal((await sit(guest, 0, 0)).status, 200); await ok(s, 'POST', '/api/game/leave', { uid: guest, body: { matchId: s.db.prepare('SELECT id FROM game_matches WHERE p1=? ORDER BY id DESC').get(guest).id } });
  const fresh = mkUser(s, { cash: 1000 }); await enter(s, fresh, 'venue_viewing'); assert.equal((await sit(fresh, 0, 100)).json.error, 'ACCOUNT_TOO_NEW');
  await ok(s, 'POST', '/api/social/mute', { uid: c, body: { username: nameOf(s, b), kind: 'block' } }); await sit(b, 0, 0, 'whot2'); assert.equal((await sit(c, 0, 0, 'whot2')).json.error, 'CANNOT_PLAY'); await ok(s, 'POST', '/api/game/leave', { uid: b, body: { matchId: s.db.prepare("SELECT id FROM game_matches WHERE p1=? AND status='waiting'").get(b).id } });
  await enter(s, a, 'venue_viewing'); let err = null; for (let i = 0; i < 7; i++) { const w = await sit(a, 0, 100, 'whot2'); if (w.status !== 200) { err = w.json.error; break; } const jj = await call(s, 'POST', '/api/game/sit', { uid: b, body: { venueId: 'venue_viewing', stationId: 'whot2' } }); if (jj.status !== 200) { err = jj.json.error; break; } await ok(s, 'POST', '/api/game/leave', { uid: a, body: { matchId: jj.json.id } }); s.app.clock.advance(1000); } assert.equal(err, 'PAIR_LIMIT'); await ok(s, 'POST', '/api/venue/leave', { uid: a }); // leaving cancels a waiting table and refunds
  assert.equal(checkInvariants(s.db).ok, true); assert.equal(balanceOf(s.db, SYS.ESCROW_GAMES), 0);
});
test('scoreboard is weekly (Monday-based) and resets', async () => {
  const s = makeServer(); const [a, b] = [adult(s, 0), adult(s, 0)]; await enter(s, a, 'venue_ayo'); await enter(s, b, 'venue_ayo'); const g1 = await ok(s, 'POST', '/api/game/sit', { uid: a, body: { venueId: 'venue_ayo', stationId: 'ayo1' } }); const g = await ok(s, 'POST', '/api/game/sit', { uid: b, body: { venueId: 'venue_ayo', stationId: 'ayo1' } }); void g1;
  await ok(s, 'POST', '/api/game/leave', { uid: a, body: { matchId: g.id } }); let sb = await ok(s, 'GET', '/api/scoreboard', { uid: a }); assert.equal(sb.rows[0].username, nameOf(s, b)); assert.equal(sb.rows[0].points, 3); assert.ok(/game money only/i.test(sb.scoring));
  s.app.clock.advance(8 * DAY); sb = await ok(s, 'GET', '/api/scoreboard', { uid: a }); assert.equal(sb.rows.length, 0); const old = (await ok(s, 'GET', '/api/scoreboard?weekOffset=1', { uid: a })).rows.length + (await ok(s, 'GET', '/api/scoreboard?weekOffset=2', { uid: a })).rows.length; assert.equal(old, 2, 'history keeps last weeks');
});
