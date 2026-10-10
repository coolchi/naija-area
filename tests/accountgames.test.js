// Account download and closing cover the table games and word/board games: chess, Word Duel, Landlord Lagos, Suwe (table + street run), Find Am and the Sports Hall (ping pong, tennis).
// These games added no tables; their data lives in game_matches/game_players/game_scores and casual_runs/casual_daily, so this checks the download lists it and closing leaves nothing behind
// (and registers with registerPlayerData in server/core/gamedata.js). GAME MONEY ONLY.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at } from './helpers.js';
import { checkInvariants, balanceOf, cashId, move, SYS } from '../server/core/ledger.js';
import { registeredNames } from '../server/core/account.js';
import { enterCity } from '../server/core/cities.js';
import * as auth from '../server/core/auth.js';

const mkReg = (s, name) => auth.signup(s.app, { username: name, password: 'secret-pass-1', age18: true }, 'ip');
const V = (s, id) => s.app.city.venues.find(v => v.id === id);
const enter = async (s, u, id) => { const v = V(s, id); at(s, u, v.x, v.z); await ok(s, 'POST', '/api/heartbeat', { uid: u, body: {} }); return ok(s, 'POST', '/api/venue/enter', { uid: u, body: { venueId: id } }); };

test('the games register their data with the account module', () => { assert.ok(registeredNames().includes('tableGamesAndWordGames')); });

test('download lists the table matches and word/Suwe runs; closing erases scores and runs and scrubs the @name from finished match text; the ledger holds', async () => {
  const s = makeServer(); const ada = await mkReg(s, 'ada_chess'); const bob = mkUser(s, { cash: 3000, ageMs: 10 * 60000 });
  s.db.prepare("UPDATE users SET created_at=? WHERE id=?").run(s.app.clock.now() - 3600000, ada); // not a brand new account
  // fund the account through the ledger
  move(s.app, { from: SYS.FAUCET_CASUAL, to: cashId(ada), amount: 1000, reason: 'test_grant', userId: ada, idemKey: 'grant:ada' });
  // 1. a staked chess match, ada resigns -> result text "@ada_chess resigned"
  await enter(s, ada, 'venue_viewing'); await enter(s, bob, 'venue_viewing');
  const w = (await call(s, 'POST', '/api/game/sit', { uid: ada, body: { venueId: 'venue_viewing', stationId: 'chess1', stake: 100 } })).json; assert.equal(w.status, 'waiting', JSON.stringify(w));
  assert.equal((await call(s, 'POST', '/api/game/sit', { uid: bob, body: { venueId: 'venue_viewing', stationId: 'chess1', stake: 0 } })).json.status, 'active');
  await ok(s, 'POST', '/api/game/leave', { uid: ada, body: { matchId: w.id } }); assert.equal(s.db.prepare('SELECT status FROM game_matches WHERE id=?').get(w.id).status, 'finished');
  assert.ok(s.db.prepare('SELECT result FROM game_matches WHERE id=?').get(w.id).result.includes('@ada_chess'));
  await ok(s, 'POST', '/api/venue/leave', { uid: ada, body: {} }); await ok(s, 'POST', '/api/venue/leave', { uid: bob, body: {} });
  // 2. the Sports Hall: a ping pong match against a bot, left early
  enterCity(s.app, ada, 'lagos-lekki'); const hall = s.app.cities['lagos-lekki'].venueById.lk_venue_sports; at(s, ada, hall.x, hall.z); await ok(s, 'POST', '/api/heartbeat', { uid: ada, body: {} }); await ok(s, 'POST', '/api/venue/enter', { uid: ada, body: { venueId: 'lk_venue_sports' } });
  const pp = await ok(s, 'POST', '/api/sports/bot', { uid: ada, body: { venueId: 'lk_venue_sports', stationId: s.app.cities['lagos-lekki'].venueById.lk_venue_sports.stations.find(x => x.game === 'pingpong').id, level: 'rookie' } });
  await ok(s, 'POST', '/api/game/leave', { uid: ada, body: { matchId: pp.id } }); await ok(s, 'POST', '/api/venue/leave', { uid: ada, body: {} });
  // 3. Find Am and Suwe street runs
  await ok(s, 'GET', '/api/casual/wordsearch', { uid: ada }); await ok(s, 'POST', '/api/casual/suwe/start', { uid: ada, body: {} });
  assert.ok(s.db.prepare("SELECT COUNT(*) n FROM casual_runs WHERE user_id=? AND kind IN ('wordsearch','suwe')").get(ada).n >= 2);
  assert.ok(s.db.prepare('SELECT COUNT(*) n FROM game_scores WHERE user_id=?').get(ada).n >= 1);
  // download
  const dl = await ok(s, 'GET', '/api/account/export', { uid: ada }); const g = dl.tableGamesAndWordGames;
  assert.ok(g.tableMatches.some(m => m.game === 'chess' && m.stake === 100 && m.youWon === false && m.venue === 'venue_viewing'), 'chess match listed'); assert.ok(g.tableMatches.some(m => m.game === 'pingpong'), 'sports match listed');
  assert.ok(g.wordSearchAndSuweRuns.some(r => r.game === 'wordsearch') && g.wordSearchAndSuweRuns.some(r => r.game === 'suwe'), 'runs listed'); assert.ok(!JSON.stringify(dl).includes('pass_hash'));
  // close
  const bal = balanceOf(s.db, cashId(ada)); const r = await ok(s, 'POST', '/api/account/delete', { uid: ada, body: { confirm: 'DELETE', password: 'secret-pass-1' } }); assert.equal(r.ok, true); assert.equal(r.forfeited, bal);
  assert.equal(s.db.prepare('SELECT COUNT(*) n FROM casual_runs WHERE user_id=?').get(ada).n, 0); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM game_scores WHERE user_id=?').get(ada).n, 0); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM casual_daily WHERE user_id=?').get(ada).n, 0);
  assert.equal(s.db.prepare("SELECT COUNT(*) n FROM game_matches WHERE result LIKE '%ada_chess%'").get().n, 0, 'the closed name is gone from match text');
  assert.equal(s.db.prepare('SELECT result FROM game_matches WHERE id=?').get(w.id).result, 'a player resigned'); assert.ok(r.kept.some(k => /finished table-game matches/.test(k)));
  assert.equal(s.db.prepare('SELECT username FROM users WHERE id=?').get(ada).username, `deleted_${ada}`); assert.equal(checkInvariants(s.db).ok, true);
});
