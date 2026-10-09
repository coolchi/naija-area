// The static demo runs the real core on sql.js through server/lib/sqljs-adapter.js. This runs the same game flows on that adapter in Node,
// so a divergence from better-sqlite3 (transactions, savepoints, lastInsertRowid, BLOBs) is caught by `npm test`.
import test from 'node:test'; import assert from 'node:assert/strict'; import { createRequire } from 'node:module';
process.env.NA_BCRYPT_COST = '4';
import { wrapSqlJs } from '../server/lib/sqljs-adapter.js';
import { createApp } from '../server/core/app.js';
import { nodePlatform } from '../server/platform-node.js';
import { dispatch } from '../server/core/routes.js';
import { BALANCE } from '../server/config/balance.js';
import { loadCity } from '../server/createServer.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import * as auth from '../server/core/auth.js';
import { teleport } from '../server/core/world.js';
import * as ads from '../server/core/ads.js';
import { png } from './helpers.js';
const require = createRequire(import.meta.url);

const mk = async () => { const SQL = await require('sql.js/dist/sql-asm.js')(); const db = wrapSqlJs(SQL); db.pragma('foreign_keys = ON'); const balance = structuredClone(BALANCE); balance.shops.enforceHours = false; const app = createApp({ db, platform: nodePlatform({}), cityJson: loadCity(), balance }); app.devRoutes = true; return { app, db }; };
const call = (app, method, path, o = {}) => dispatch(app, { method, path, query: o.query || {}, body: o.body || {}, raw: o.raw, headers: o.headers || {}, ip: '127.0.0.1', uid: o.uid, isAdmin: !!o.admin });

test('sql.js adapter: schema, signup, ledger transactions, rollback, nested savepoints and BLOBs behave like better-sqlite3', async () => {
  const { app, db } = await mk(); const u = auth.newPlayer(app, { username: 'demo_user', isGuest: true, ageConfirmed: true }); assert.ok(balanceOf(db, cashId(u)) > 0);
  const r = db.prepare('INSERT INTO audit_log(actor,action,detail,created_at) VALUES (?,?,?,?)').run('t', 'x', 'y', 1); assert.equal(r.changes, 1); assert.ok(Number(r.lastInsertRowid) >= 1);
  assert.throws(() => db.transaction(() => { db.prepare("INSERT INTO audit_log(actor,action,detail,created_at) VALUES ('a','b','c',2)").run(); throw new Error('boom'); })()); assert.equal(db.prepare("SELECT COUNT(*) n FROM audit_log WHERE actor='a'").get().n, 0, 'rolled back');
  db.transaction(() => { db.prepare("INSERT INTO audit_log(actor,action,detail,created_at) VALUES ('o','b','c',3)").run(); assert.throws(() => db.transaction(() => { db.prepare("INSERT INTO audit_log(actor,action,detail,created_at) VALUES ('inner','b','c',4)").run(); throw new Error('inner'); })()); })();
  assert.equal(db.prepare("SELECT COUNT(*) n FROM audit_log WHERE actor='o'").get().n, 1); assert.equal(db.prepare("SELECT COUNT(*) n FROM audit_log WHERE actor='inner'").get().n, 0, 'nested rollback only undoes the inner part');
  assert.equal(checkInvariants(db).ok, true); assert.ok(db.prepare('PRAGMA table_info(property_items)').all().some(c => c.name === 'rot'));
});
test('sql.js adapter: a play session through the real route table (shop, travel, venue, Ayo game with a practice bot, car purchase, ad creative blob)', async () => {
  const { app, db } = await mk(); const u = auth.newPlayer(app, { username: 'demo_player', isGuest: true, ageConfirmed: true, cash: 2000000 });
  const shop = app.city.shops[0]; teleport(app, u, shop.x, shop.z); await call(app, 'POST', '/api/heartbeat', { uid: u }); const item = shop.items[0];
  assert.equal((await call(app, 'POST', '/api/shop/buy', { uid: u, body: { shopId: shop.id, itemId: item.id } })).status, 200);
  const q = await call(app, 'GET', '/api/travel/quote', { uid: u, query: { place: 'plaza' } }); assert.equal(q.status, 200);
  const v = app.city.venues.find(x => x.id === 'venue_joint'); teleport(app, u, v.x, v.z); await call(app, 'POST', '/api/heartbeat', { uid: u }); assert.equal((await call(app, 'POST', '/api/venue/enter', { uid: u, body: { venueId: 'venue_joint' } })).status, 200);
  const { startPracticeBot } = await import('../server/core/practice-bot.js'); const bot = startPracticeBot(app, { intervalMs: 1e9 }); const sit = await call(app, 'POST', '/api/game/sit', { uid: u, body: { venueId: 'venue_joint', stationId: 'whot1', stake: 0 } }); assert.equal(sit.status, 200); bot.step(); bot.stop();
  let m = db.prepare('SELECT * FROM game_matches').get(); assert.equal(m.status, 'active'); for (let i = 0; i < 6; i++) { m = db.prepare('SELECT * FROM game_matches').get(); if (m.status !== 'active') break; if (m.turn_user === u) { const view = (await call(app, 'GET', '/api/game', { uid: u, query: { id: m.id } })).json; await call(app, 'POST', '/api/game/move', { uid: u, body: view.board.playable.length ? { matchId: m.id, card: view.board.playable[0], shape: 'star' } : { matchId: m.id, action: 'draw' } }); } else bot.step(); }
  await call(app, 'POST', '/api/game/leave', { uid: u, body: { matchId: m.id } }); await call(app, 'POST', '/api/venue/leave', { uid: u });
  const mv = app.city.venues.find(x => x.id === 'venue_motors'); teleport(app, u, mv.x, mv.z); await call(app, 'POST', '/api/heartbeat', { uid: u }); await call(app, 'POST', '/api/venue/enter', { uid: u, body: { venueId: 'venue_motors' } }); assert.equal((await call(app, 'POST', '/api/garage/buy', { uid: u, body: { model: 'kekere' } })).status, 200);
  const adv = ads.getOrCreateAdvertiser(app, { email: 'x@example.com', brand: 'Demo Brand' }); const up = ads.uploadCreative(app, adv.id, png(), 'image/png'); const c = ads.getCreative(app, up.creativeId); assert.ok(c.data.length > 100); assert.equal(c.mime, 'image/png');
  assert.equal(checkInvariants(db).ok, true);
});
test('sql.js adapter: casual games (word of the day, tile-merge replay, memory) and the new table games run on the demo database too', async () => {
  const { app, db } = await mk(); const u = auth.newPlayer(app, { username: 'demo_casual', isGuest: true, ageConfirmed: true, cash: 1000 }); app.balance.casual.minAccountAgeMs = 0;
  const { wordOfDay } = await import('../server/core/casual.js'); const { ANSWERS } = await import('../server/config/words.js'); const day = new Date(app.clock.now()).toISOString().slice(0, 10);
  const r = await call(app, 'POST', '/api/casual/word/guess', { uid: u, body: { word: wordOfDay(app, day) } }); assert.equal(r.status, 200); assert.equal(r.json.status, 'won'); assert.ok(r.json.reward > 0); assert.ok(ANSWERS.length > 100);
  const M = await import('../server/core/casual/merge.js'); const st = await call(app, 'POST', '/api/casual/merge/start', { uid: u }); const g = M.newGame(st.json.seed); let log = ''; for (let i = 0; i < 400 && !g.over; i++) for (const d of 'LDRU') if (M.step(g, d)) { log += d; break; }
  app.clock.advance(log.length * 200); const sub = await call(app, 'POST', '/api/casual/merge/submit', { uid: u, body: { runId: st.json.runId, moves: log } }); assert.equal(sub.status, 200); assert.equal(sub.json.score, g.score);
  const mem = await call(app, 'POST', '/api/casual/memory/start', { uid: u }); assert.equal(mem.json.cards, 16); assert.equal(checkInvariants(db).ok, true);
  for (const kind of ['dominoes', 'draughts', 'ayo']) assert.ok(app.city.venues.some(v => v.stations.some(s => s.game === kind)), kind);
});
