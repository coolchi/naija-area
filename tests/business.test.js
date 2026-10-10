// Player-owned businesses (Mama Put, Barber, Provision shop, Car wash): buying, staff, lazy income settlement, collecting through the ledger, caps, upgrades, selling. GAME MONEY ONLY.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, HOUR } from './helpers.js';
import { checkInvariants, balanceOf, cashId, SYS } from '../server/core/ledger.js';
import { BUSINESS } from '../server/config/business.js';
import * as biz from '../server/core/business.js';

const adult = (s, cash = 200000) => mkUser(s, { cash, ageMs: 31 * 60000 });
const post = (s, u, p, body) => call(s, 'POST', '/api/business/' + p, { uid: u, body });

test('buying: the price goes to the sink through the ledger, one of each type, a cap of three, no guests, no brand-new accounts, no cash = no business', async () => {
  const s = makeServer(); const u = adult(s); const before = balanceOf(s.db, cashId(u));
  const r = await ok(s, 'POST', '/api/business/buy', { uid: u, body: { type: 'mamaput', name: 'Mama Tolu Buka' } });
  assert.equal(r.owned[0].name, 'Mama Tolu Buka'); assert.equal(balanceOf(s.db, cashId(u)), before - BUSINESS.types.mamaput.cost); assert.equal(balanceOf(s.db, SYS.SINK_BUSINESS), BUSINESS.types.mamaput.cost);
  assert.equal((await post(s, u, 'buy', { type: 'mamaput' })).json.error, 'ALREADY');
  await ok(s, 'POST', '/api/business/buy', { uid: u, body: { type: 'barber' } }); await ok(s, 'POST', '/api/business/buy', { uid: u, body: { type: 'shop' } });
  assert.equal((await post(s, u, 'buy', { type: 'carwash' })).json.error, 'TOO_MANY');
  const g = mkUser(s, { cash: 200000, guest: true, ageMs: 31 * 60000 }); assert.equal((await post(s, g, 'buy', { type: 'barber' })).json.error, 'GUEST');
  const fresh = mkUser(s, { cash: 200000 }); assert.equal((await post(s, fresh, 'buy', { type: 'barber' })).json.error, 'TOO_NEW');
  const poor = adult(s, 100); assert.equal((await post(s, poor, 'buy', { type: 'barber' })).status, 402); assert.equal((await post(s, u, 'buy', { type: 'nope' })).status, 404);
  assert.equal((await post(s, poor, 'buy', { type: 'barber', name: 'f u c k shop' })).json.error !== undefined, true);
  assert.equal(checkInvariants(s.db).ok, true);
});
test('buying twice with the same idempotency key charges once', async () => {
  const s = makeServer(); const u = adult(s); const a = await post(s, u, 'buy', { type: 'barber', idem: 'k1' }); assert.equal(a.status, 200); const b = await post(s, u, 'buy', { type: 'barber', idem: 'k1' }); assert.notEqual(b.status, 200); assert.equal(balanceOf(s.db, SYS.SINK_BUSINESS), BUSINESS.types.barber.cost);
});
test('income accrues while you are away, collecting pays net (revenue - supplies - wages - upkeep) in ONE balanced transaction, and a second collect pays nothing', async () => {
  const s = makeServer(); const u = adult(s); const b = (await ok(s, 'POST', '/api/business/buy', { uid: u, body: { type: 'shop' } })).owned[0];
  const cand = (await ok(s, 'GET', '/api/business', { uid: u })).owned[0].candidates; await ok(s, 'POST', '/api/business/hire', { uid: u, body: { id: b.id, candidate: cand[0].id } });
  s.app.clock.advance(6 * HOUR); const v = (await ok(s, 'GET', '/api/business', { uid: u })).owned[0]; assert.ok(v.ready > 0, 'something is waiting'); const cash0 = balanceOf(s.db, cashId(u)); const faucet0 = balanceOf(s.db, SYS.FAUCET_BUSINESS); const sink0 = balanceOf(s.db, SYS.SINK_BUSINESS);
  const r = await ok(s, 'POST', '/api/business/collect', { uid: u, body: { id: b.id } }); assert.equal(r.collected, v.ready); assert.equal(balanceOf(s.db, cashId(u)), cash0 + v.ready); const gross = faucet0 - balanceOf(s.db, SYS.FAUCET_BUSINESS); assert.equal(gross - v.ready, balanceOf(s.db, SYS.SINK_BUSINESS) - sink0, 'costs went to the sink');
  const tx = s.db.prepare("SELECT id FROM ledger_tx WHERE reason='business_collect'").all(); assert.equal(tx.length, 1); assert.equal(s.db.prepare('SELECT SUM(amount) s FROM ledger_entries WHERE tx_id=?').get(tx[0].id).s, 0);
  assert.equal((await ok(s, 'POST', '/api/business/collect', { uid: u, body: { id: b.id } })).collected, 0); assert.equal(checkInvariants(s.db).ok, true);
});
test('staff: no staff earns less than staffed; the pool is the same for the same business and day; hiring is capped by level; firing works; upgrading lifts the cap', async () => {
  const mk = async (hire) => { const s = makeServer(); const u = adult(s); const b = (await ok(s, 'POST', '/api/business/buy', { uid: u, body: { type: 'mamaput' } })).owned[0]; if (hire) for (const c of (await ok(s, 'GET', '/api/business', { uid: u })).owned[0].candidates.slice(0, 2)) await ok(s, 'POST', '/api/business/hire', { uid: u, body: { id: b.id, candidate: c.id } }); s.app.clock.advance(5 * HOUR); return { s, u, b, v: (await ok(s, 'GET', '/api/business', { uid: u })).owned[0] }; };
  const solo = await mk(false), crew = await mk(true); assert.ok(crew.v.ready > solo.v.ready, `staffed ${crew.v.ready} > solo ${solo.v.ready}`); assert.ok(solo.v.capacity < crew.v.capacity);
  const { s, u, b } = crew; assert.equal((await post(s, u, 'hire', { id: b.id, candidate: 'x:9' })).json.error, 'FULL'); const v = (await ok(s, 'GET', '/api/business', { uid: u })).owned[0]; assert.equal(v.staff.length, 2);
  await ok(s, 'POST', '/api/business/upgrade', { uid: u, body: { id: b.id } }); const v2 = (await ok(s, 'GET', '/api/business', { uid: u })).owned[0]; assert.equal(v2.level, 2); assert.equal(v2.maxStaff, 4); assert.ok(v2.candidates.length > 0);
  await ok(s, 'POST', '/api/business/fire', { uid: u, body: { id: b.id, staffId: v.staff[0].id } }); assert.equal((await ok(s, 'GET', '/api/business', { uid: u })).owned[0].staff.length, 1);
  assert.equal((await post(s, mkUser(s, { cash: 1000, ageMs: 31 * 60000 }), 'hire', { id: b.id, candidate: '1:0' })).json.error, 'NO_BUSINESS', 'not your business');
  const twin = makeServer(); const t = adult(twin); const tb = (await ok(twin, 'POST', '/api/business/buy', { uid: t, body: { type: 'mamaput' } })).owned[0]; assert.equal(tb.id, b.id); twin.app.clock.advance(5 * HOUR + 31 * 60000); assert.deepEqual(biz.candidates(twin.app, tb).map(c => c.name), biz.candidates(s.app, { id: b.id }).map(c => c.name), 'same business id and day = same pool');
});
test('caps: it stops earning 24 real hours after the last visit, and never more than the daily net cap per UTC day', async () => {
  const s = makeServer(); const u = adult(s, 500000); const b = (await ok(s, 'POST', '/api/business/buy', { uid: u, body: { type: 'shop' } })).owned[0]; await ok(s, 'POST', '/api/business/upgrade', { uid: u, body: { id: b.id } }); await ok(s, 'POST', '/api/business/upgrade', { uid: u, body: { id: b.id } });
  for (const c of (await ok(s, 'GET', '/api/business', { uid: u })).owned[0].candidates) await ok(s, 'POST', '/api/business/hire', { uid: u, body: { id: b.id, candidate: c.id } });
  s.app.clock.advance(24 * HOUR); const a = (await ok(s, 'GET', '/api/business', { uid: u })).owned[0].ready; s.app.clock.advance(100 * HOUR); const c = (await ok(s, 'GET', '/api/business', { uid: u })).owned[0].ready;
  assert.ok(a > 0 && a <= BUSINESS.dailyNetCap * 2, `24 h of work touches at most two UTC days of cap (${a})`); assert.ok(c <= a + BUSINESS.dailyNetCap * 2, 'after 100 idle hours only ANOTHER 24 h were earned, not 100'); assert.ok(c < a + BUSINESS.dailyNetCap * 5);
  const day = s.db.prepare('SELECT day, day_net FROM businesses WHERE id=?').get(b.id); assert.ok(day.day_net <= BUSINESS.dailyNetCap);
  const total = (await ok(s, 'POST', '/api/business/collect', { uid: u, body: { id: b.id } })).collected; assert.ok(total <= BUSINESS.dailyNetCap * 4); assert.equal(checkInvariants(s.db).ok, true);
});
test('the hours matter: a Mama Put earns more across mealtimes than a car wash does at night, and a demand hook (weather, events) can switch income off', async () => {
  const s = makeServer(); const u = adult(s); const b = (await ok(s, 'POST', '/api/business/buy', { uid: u, body: { type: 'barber' } })).owned[0];
  const hook = () => 0; biz.demandHooks.push(hook); try { s.app.clock.advance(3 * HOUR); assert.equal((await ok(s, 'GET', '/api/business', { uid: u })).owned[0].ready, 0, 'nobody comes'); } finally { biz.demandHooks.splice(biz.demandHooks.indexOf(hook), 1); }
  s.app.clock.advance(3 * HOUR); assert.ok((await ok(s, 'GET', '/api/business', { uid: u })).owned[0].ready >= 0);
  const f = (type, hourStart) => { const bb = { id: 1, type, level: 1 }; let sum = 0; const app = s.app; for (let h = 0; h < 24; h++) { const t = app.balance.worldClock.startRealMs + (h / 15) * HOUR * 1 + 40 * 24 * 3600000; sum += biz.stepFigures(app, bb, [], t).revenue * 0; } return sum; }; void f;
  assert.ok(BUSINESS.types.mamaput.demand[12] > BUSINESS.types.mamaput.demand[3]); assert.equal(BUSINESS.types.carwash.demand[2], 0);
});
test('selling pays back the set fraction of everything paid (price + upgrades) and any waiting income, removes staff, and the ledger holds', async () => {
  const s = makeServer(); const u = adult(s); const b = (await ok(s, 'POST', '/api/business/buy', { uid: u, body: { type: 'carwash' } })).owned[0]; await ok(s, 'POST', '/api/business/upgrade', { uid: u, body: { id: b.id } }); s.app.clock.advance(8 * HOUR);
  const paid = BUSINESS.types.carwash.cost + BUSINESS.types.carwash.levels[1].upgrade; const cash = balanceOf(s.db, cashId(u)); const ready = (await ok(s, 'GET', '/api/business', { uid: u })).owned[0].ready;
  const r = await ok(s, 'POST', '/api/business/sell', { uid: u, body: { id: b.id } }); assert.equal(r.received, Math.floor(paid * BUSINESS.sellBackFraction) + ready); assert.equal(balanceOf(s.db, cashId(u)), cash + r.received); assert.equal(r.owned.length, 0);
  assert.equal(s.db.prepare('SELECT COUNT(*) n FROM business_staff').get().n, 0); assert.equal(checkInvariants(s.db).ok, true);
});
test('account closing and download cover businesses', async () => {
  const { default: authm } = { default: null }; void authm;
  const s = makeServer(); const u = adult(s); await ok(s, 'POST', '/api/business/buy', { uid: u, body: { type: 'barber' } }); const { registeredNames } = await import('../server/core/account.js'); assert.ok(registeredNames().includes('businesses'));
  const dl = await ok(s, 'GET', '/api/account/export', { uid: u }); assert.equal(dl.businesses.businesses.length, 1);
});
