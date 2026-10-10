// Account download and closing cover the Track G data (businesses, marketplace, clubs, night events). GAME MONEY ONLY.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, ok, call, HOUR } from './helpers.js';
import { checkInvariants } from '../server/core/ledger.js';
import { registeredNames } from '../server/core/account.js';
import { EVENTS } from '../server/config/events.js';
import * as auth from '../server/core/auth.js';

const mkReg = async (s, name, cash = 300000) => { const u = await auth.signup(s.app, { username: name, password: 'secret-pass-1', age18: true }, 'ip'); s.db.prepare('UPDATE users SET created_at=? WHERE id=?').run(s.app.clock.now() - 3 * HOUR, u); const { move, cashId, SYS } = await import('../server/core/ledger.js'); move(s.app, { from: SYS.FAUCET_TESTTOPUP, to: cashId(u), amount: cash, reason: 'test_topup', userId: u }); return u; };

test('the Track G modules register their data with the account module', () => { for (const n of ['businesses', 'marketplace', 'clubs', 'events']) assert.ok(registeredNames().includes(n), n); });
test('download lists what a player has in each Track G feature; closing the account removes it and leaves the ledger whole', async () => {
  const s = makeServer(); s.app.balance.events = { ...EVENTS, forced: ['night_market', 'street_owambe'] }; const u = await mkReg(s, 'ada_g'); const friend = await mkReg(s, 'bola_g');
  await ok(s, 'POST', '/api/business/buy', { uid: u, body: { type: 'barber' } });
  s.db.prepare('INSERT INTO wearables_owned(user_id,item_id,price_paid,bought_at) VALUES (?,?,?,?)').run(u, 'neck_thin', 150000, s.app.clock.now()); await ok(s, 'POST', '/api/market/list', { uid: u, body: { kind: 'wearable', ref: 'neck_thin', ask: 150000 } });
  const club = (await ok(s, 'POST', '/api/clubs/create', { uid: u, body: { name: 'Ada Gang', tag: 'ADA' } })).club; await ok(s, 'POST', '/api/clubs/join', { uid: friend, body: { clubId: club.id } }); s.app.clock.advance(2000); await ok(s, 'POST', '/api/clubs/say', { uid: u, body: { text: 'hello gang' } });
  await ok(s, 'POST', '/api/events/buy', { uid: u, body: { event: 'night_market', item: 'nm_zobo' } }); await ok(s, 'POST', '/api/events/claim', { uid: u, body: { event: 'street_owambe' } });
  const dl = await ok(s, 'GET', '/api/account/export', { uid: u }); assert.equal(dl.businesses.businesses.length, 1); assert.equal(dl.marketplace.listings.length, 1); assert.equal(dl.clubs.membership.length, 1); assert.equal(dl.clubs.chatMessages.length, 1); assert.equal(dl.events.purchases.length, 1); assert.equal(dl.events.claims.length, 1);
  const r = await ok(s, 'POST', '/api/account/delete', { uid: u, body: { confirm: 'delete', password: 'secret-pass-1' } }); assert.ok(r.ok !== false);
  for (const t of ['businesses', 'business_staff', 'club_chat', 'event_buys', 'event_claims']) assert.equal(s.db.prepare(`SELECT COUNT(*) n FROM ${t}`).get().n, 0, t);
  assert.equal(s.db.prepare("SELECT COUNT(*) n FROM market_listings WHERE seller_id=? AND status IN ('open','expired')").get(u).n, 0); assert.equal(s.db.prepare('SELECT COUNT(*) n FROM club_members WHERE user_id=?').get(u).n, 0);
  assert.equal(s.db.prepare('SELECT leader_id FROM clubs WHERE id=?').get(club.id).leader_id, friend, 'the club passed to the other member'); const inv = checkInvariants(s.db); assert.equal(inv.ok, true, JSON.stringify(inv));
});
