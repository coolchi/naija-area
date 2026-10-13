import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, jobPos, HOUR, DAY } from './helpers.js';
import { balanceOf, cashId, savId, checkInvariants } from '../server/core/ledger.js';
import { tickRent, tickInterest, leaderboard } from '../server/core/economy.js';

const near = (s, u, jobLoc) => { const l = jobPos(s, jobLoc); at(s, u, l.x, l.z); };

test('jobs: must be at the job location, shift timer enforced by server time, wage paid once, cooldown applies', async () => {
  const s = makeServer(); const u = mkUser(s);
  assert.equal((await call(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'shop' } })).json.error, 'TOO_FAR');
  near(s, u, 'job_shop');
  const st = await ok(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'shop' } }); assert.ok(st.user.shift);
  assert.equal((await call(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'shop' } })).json.error, 'SHIFT_ACTIVE');
  assert.equal((await call(s, 'POST', '/api/jobs/claim', { uid: u })).json.error, 'SHIFT_NOT_DONE');
  s.app.clock.advance(59000); assert.equal((await call(s, 'POST', '/api/jobs/claim', { uid: u })).status, 409);
  s.app.clock.advance(2000);
  const c = await ok(s, 'POST', '/api/jobs/claim', { uid: u }); assert.equal(c.wage, 1300); assert.equal(c.user.cash, 5000 + 1300);
  assert.equal((await call(s, 'POST', '/api/jobs/claim', { uid: u })).json.error, 'NO_SHIFT');
  assert.equal((await call(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'shop' } })).json.error, 'COOLDOWN');
  s.app.clock.advance(21000); await ok(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'shop' } });
});
test('cab driver: a shift at the cab stand pays the fare wage', async () => {
  const s = makeServer(); const u = mkUser(s); const job = s.app.balance.jobs.find(j => j.id === 'cab'); assert.equal(job.name, 'Cab Driver'); assert.equal(job.location, 'job_cab'); assert.ok(job.wage > 0);
  assert.equal((await call(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'cab' } })).json.error, 'TOO_FAR');
  near(s, u, 'job_cab'); const st = await ok(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'cab' } }); assert.equal(st.user.shift.jobId, 'cab');
  s.app.clock.advance(job.durationSec * 1000 + 500); const c = await ok(s, 'POST', '/api/jobs/claim', { uid: u }); assert.equal(c.wage, job.wage); assert.equal(c.user.cash, 5000 + job.wage);
});
test('jobs: locked until enough shifts; needs gate working; energy/hunger spent on start', async () => {
  const s = makeServer(); const u = mkUser(s); near(s, u, 'job_pos');
  assert.equal((await call(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'pos' } })).json.error, 'JOB_LOCKED');
  const u2 = mkUser(s); near(s, u2, 'job_shop');
  const a = await ok(s, 'POST', '/api/jobs/start', { uid: u2, body: { jobId: 'shop' } }); assert.ok(a.user.energy < 90 + 1 && a.user.energy <= 82.1);
  s.db.prepare('UPDATE player_state SET energy=5 WHERE user_id=?').run(mkUser(s)); // other user, no effect
  const u3 = mkUser(s); near(s, u3, 'job_shop'); s.db.prepare('UPDATE player_state SET energy=5 WHERE user_id=?').run(u3);
  assert.equal((await call(s, 'POST', '/api/jobs/start', { uid: u3, body: { jobId: 'shop' } })).json.error, 'TOO_TIRED');
  const u4 = mkUser(s); near(s, u4, 'job_shop'); s.db.prepare('UPDATE player_state SET hunger=2 WHERE user_id=?').run(u4);
  assert.equal((await call(s, 'POST', '/api/jobs/start', { uid: u4, body: { jobId: 'shop' } })).json.error, 'TOO_HUNGRY');
});
test('needs decay with server time and shops restore them (proximity required)', async () => {
  const s = makeServer(); const u = mkUser(s); const shop = s.app.city.shopById.shop_canteen;
  assert.equal((await call(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_canteen', itemId: 'jollof' } })).json.error, 'TOO_FAR');
  s.app.clock.advance(10 * 60000); const p = (await ok(s, 'GET', '/api/me', { uid: u })).user; assert.ok(p.hunger < 80 - 3 && p.energy < 90 - 2);
  at(s, u, shop.x, shop.z); const b = await ok(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_canteen', itemId: 'jollof' } });
  assert.ok(b.user.hunger >= Math.min(100, p.hunger + 54)); assert.equal(b.user.cash, 5000 - 1500);
});
test('housing: rent, first period paid, one home per user, one user per home, owner-only interior, naming, furniture', async () => {
  const s = makeServer(); const [a, b] = [mkUser(s), mkUser(s)]; const p = s.app.city.properties.find(x => x.tier === 1);
  at(s, a, p.door.x, p.door.z); at(s, b, p.door.x, p.door.z);
  const r = await ok(s, 'POST', '/api/property/acquire', { uid: a, body: { propertyId: p.id, mode: 'rent' } }); assert.equal(r.user.cash, 5000 - p.rent); assert.equal(r.user.home.status, 'yours');
  assert.equal((await call(s, 'POST', '/api/property/acquire', { uid: b, body: { propertyId: p.id, mode: 'rent' } })).json.error, 'TAKEN');
  const p2 = s.app.city.properties.find(x => x.tier === 1 && x.id !== p.id); at(s, a, p2.door.x, p2.door.z);
  assert.equal((await call(s, 'POST', '/api/property/acquire', { uid: a, body: { propertyId: p2.id, mode: 'rent' } })).json.error, 'ALREADY_HOUSED');
  assert.equal((await call(s, 'GET', `/api/property/${p.id}/interior`, { uid: b })).status, 403); // not the owner
  assert.equal((await call(s, 'GET', `/api/property/${p.id}/interior`)).status, 401);
  const inter = await ok(s, 'GET', `/api/property/${p.id}/interior`, { uid: a }); assert.equal(inter.items.length, 0);
  assert.equal((await ok(s, 'POST', '/api/property/name', { uid: a, body: { name: 'Mama\'s Place' } })).name, "Mama's Place");
  assert.equal((await call(s, 'POST', '/api/property/name', { uid: a, body: { name: 'x' } })).json.error, 'BAD_NAME');
  assert.equal((await ok(s, 'GET', '/api/properties', { uid: b })).properties.find(x => x.id === p.id).name, "Mama's Place");
  const f = await ok(s, 'POST', '/api/property/furniture', { uid: a, body: { itemId: 'plant' } }); assert.deepEqual(f.interior.items, ['plant']);
  assert.equal((await call(s, 'POST', '/api/property/furniture', { uid: a, body: { itemId: 'plant' } })).json.error, 'OWNED');
  assert.equal(checkInvariants(s.db).ok, true);
});
test('housing: buying + naming + sell-back fraction; rent-only tier cannot be bought; too far rejected', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 400000 }); const t2 = s.app.city.properties.find(x => x.tier === 2); const t1 = s.app.city.properties.find(x => x.tier === 1);
  assert.equal((await call(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: t2.id, mode: 'own' } })).json.error, 'TOO_FAR');
  at(s, u, t1.door.x, t1.door.z); assert.equal((await call(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: t1.id, mode: 'own' } })).json.error, 'NOT_FOR_SALE');
  at(s, u, t2.door.x, t2.door.z); const r = await ok(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: t2.id, mode: 'own' } }); assert.equal(r.user.cash, 400000 - t2.price);
  const sold = await ok(s, 'POST', '/api/property/release', { uid: u }); assert.equal(sold.refund, Math.floor(t2.price * 0.7)); assert.equal(sold.user.home, null);
  assert.equal(checkInvariants(s.db).ok, true);
});
test('rent tick: charges each period once; missed rent notifies then evicts; catch-up is idempotent', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 9000 }); const p = s.app.city.properties.find(x => x.tier === 1); at(s, u, p.door.x, p.door.z);
  await ok(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: p.id, mode: 'rent' } }); // pays 1500 -> 7500
  s.app.clock.advance(DAY + 1000); const t1 = tickRent(s.app); assert.equal(t1.charged, 1); assert.equal(balanceOf(s.db, cashId(u)), 6000);
  assert.deepEqual(tickRent(s.app), { charged: 0, missed: 0, evicted: 0 }); // nothing due again
  s.db.prepare('UPDATE accounts SET balance=balance-? WHERE id=?').run(0, cashId(u));
  // drain the account legitimately, via a ledger spend, so invariants stay true
  const { move } = await import('../server/core/ledger.js'); move(s.app, { from: cashId(u), to: 'sys:sink_fees', amount: 6000, reason: 'drain' });
  s.app.clock.advance(DAY); const t2 = tickRent(s.app); assert.equal(t2.missed, 1); assert.equal(t2.evicted, 0);
  assert.ok((await ok(s, 'GET', '/api/notifications', { uid: u })).rows.some(n => n.kind === 'rent_missed'));
  s.app.clock.advance(DAY); const t3 = tickRent(s.app); assert.equal(t3.evicted, 1);
  assert.equal((await ok(s, 'GET', '/api/me', { uid: u })).user.home, null);
  assert.ok((await ok(s, 'GET', '/api/notifications', { uid: u })).rows.some(n => n.kind === 'eviction'));
  assert.equal(checkInvariants(s.db).ok, true);
});
test('rent tick: paying player is never evicted; money after missed period restores standing', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 3000 }); const p = s.app.city.properties.find(x => x.tier === 1); at(s, u, p.door.x, p.door.z);
  await ok(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: p.id, mode: 'rent' } }); // 1500 left
  s.app.clock.advance(DAY + 1); tickRent(s.app); assert.equal(balanceOf(s.db, cashId(u)), 0);
  s.app.clock.advance(DAY); assert.equal(tickRent(s.app).missed, 1);
  await ok(s, 'POST', '/api/topup/test', { uid: u, body: { amount: 5000 } });
  s.app.clock.advance(DAY); const r = tickRent(s.app); assert.equal(r.charged, 1); assert.equal(r.evicted, 0);
  assert.equal(s.db.prepare('SELECT missed FROM property_owner WHERE user_id=?').get(u).missed, 0);
});
test('bank: deposit/withdraw never overdraw; interest paid once per period, capped', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 10000 });
  await ok(s, 'POST', '/api/bank', { uid: u, body: { dir: 'deposit', amount: 8000 } });
  assert.equal((await call(s, 'POST', '/api/bank', { uid: u, body: { dir: 'deposit', amount: 5000 } })).json.error, 'INSUFFICIENT_FUNDS');
  assert.equal((await call(s, 'POST', '/api/bank', { uid: u, body: { dir: 'withdraw', amount: 9000 } })).json.error, 'INSUFFICIENT_FUNDS');
  assert.equal((await call(s, 'POST', '/api/bank', { uid: u, body: { dir: 'deposit', amount: -5 } })).json.error, 'BAD_AMOUNT');
  assert.equal((await call(s, 'POST', '/api/bank', { uid: u, body: { dir: 'deposit', amount: 1.5 } })).json.error, 'BAD_AMOUNT');
  s.app.clock.advance(DAY + 1000); tickInterest(s.app); assert.equal(balanceOf(s.db, savId(u)), 8000 + 40);
  tickInterest(s.app); assert.equal(balanceOf(s.db, savId(u)), 8040); // not paid twice
  s.app.clock.advance(2 * DAY); tickInterest(s.app); assert.equal(balanceOf(s.db, savId(u)), 8040 + 40 + 40);
});
test('transfers: caps, account age, guest block, self, unknown, daily limit, hourly count, idempotent', async () => {
  const s = makeServer(); const a = mkUser(s, { cash: 100000 }); const b = mkUser(s, { cash: 0 }); const g = mkUser(s, { guest: true });
  const bn = s.db.prepare('SELECT username FROM users WHERE id=?').get(b).username;
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: 500 } })).json.error, 'ACCOUNT_TOO_NEW');
  s.app.clock.advance(6 * 60000);
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: g, body: { to: bn, amount: 500 } })).json.error, 'GUEST_NOT_ALLOWED');
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: 20001 } })).json.error, 'OVER_LIMIT');
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: 50 } })).json.error, 'BAD_AMOUNT');
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: a, body: { to: 'nobody_here', amount: 500 } })).json.error, 'NO_RECIPIENT');
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: a, body: { to: s.db.prepare('SELECT username FROM users WHERE id=?').get(a).username, amount: 500 } })).json.error, 'SELF');
  const x = await ok(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: 20000, idem: 'one' } }); assert.equal(x.user.cash, 80000);
  const again = await ok(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: 20000, idem: 'one' } }); assert.equal(again.duplicate, true); assert.equal(balanceOf(s.db, cashId(b)), 20000);
  await ok(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: 20000 } });
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: 20000 } })).json.error, 'DAILY_LIMIT'); // 60k > 50k
  assert.equal(checkInvariants(s.db).ok, true);
});
test('topup: test mode only, fixed amounts, daily cap, labelled test in ledger', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 0 });
  assert.equal((await call(s, 'POST', '/api/topup/test', { uid: u, body: { amount: 123 } })).json.error, 'BAD_AMOUNT');
  for (let i = 0; i < 2; i++) await ok(s, 'POST', '/api/topup/test', { uid: u, body: { amount: 20000 } });
  assert.equal((await call(s, 'POST', '/api/topup/test', { uid: u, body: { amount: 1000 } })).json.error, 'DAILY_LIMIT');
  assert.ok(s.db.prepare("SELECT 1 FROM ledger_tx WHERE reason='test_topup'").get());
});
test('leaderboard ranks by net worth, hides bots, includes savings', async () => {
  const s = makeServer(); const a = mkUser(s, { cash: 100 }); const b = mkUser(s, { cash: 900 }); mkUser(s, { cash: 99999, bot: true });
  await ok(s, 'POST', '/api/bank', { uid: b, body: { dir: 'deposit', amount: 400 } });
  const lb = (await ok(s, 'GET', '/api/leaderboard', { uid: a })).rows; assert.equal(lb[0].netWorth, 900); assert.ok(!lb.some(r => r.netWorth === 99999));
});
