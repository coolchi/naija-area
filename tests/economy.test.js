import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, jobPos, HOUR, DAY } from './helpers.js';
import { enterCity } from '../server/core/cities.js';
import { dayKey, dayStart } from '../server/core/rewards.js';
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
  const c = await ok(s, 'POST', '/api/jobs/claim', { uid: u }); assert.equal(c.wage, 1300); assert.equal(c.user.cash, s.app.balance.startingCash + 1300);
  assert.equal((await call(s, 'POST', '/api/jobs/claim', { uid: u })).json.error, 'NO_SHIFT');
  assert.equal((await call(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'shop' } })).json.error, 'COOLDOWN');
  s.app.clock.advance(21000); await ok(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'shop' } });
});
test('cab driver: a shift at the cab stand pays the fare wage', async () => {
  const s = makeServer(); const u = mkUser(s); const job = s.app.balance.jobs.find(j => j.id === 'cab'); assert.equal(job.name, 'Cab Driver'); assert.equal(job.location, 'job_cab'); assert.ok(job.wage > 0);
  assert.equal((await call(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'cab' } })).json.error, 'TOO_FAR');
  near(s, u, 'job_cab'); const st = await ok(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'cab' } }); assert.equal(st.user.shift.jobId, 'cab');
  s.app.clock.advance(job.durationSec * 1000 + 500); const c = await ok(s, 'POST', '/api/jobs/claim', { uid: u }); assert.equal(c.wage, job.wage); assert.equal(c.user.cash, s.app.balance.startingCash + job.wage);
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
  const jollof = shop.items.find(i => i.id === 'jollof');
  assert.ok(b.user.hunger >= Math.min(100, p.hunger + 54)); assert.equal(b.user.cash, s.app.balance.startingCash - jollof.price);
});
test('housing: rent, first period paid, one home per user, one user per home, owner-only interior, naming, furniture', async () => {
  const s = makeServer(); const [a, b] = [mkUser(s), mkUser(s)]; const p = s.app.city.properties.find(x => x.tier === 1);
  at(s, a, p.door.x, p.door.z); at(s, b, p.door.x, p.door.z);
  const r = await ok(s, 'POST', '/api/property/acquire', { uid: a, body: { propertyId: p.id, mode: 'rent' } }); assert.equal(r.user.cash, s.app.balance.startingCash - p.rent); assert.equal(r.user.home.status, 'yours');
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
  const s = makeServer(); const t2 = s.app.city.properties.find(x => x.tier === 2); const t1 = s.app.city.properties.find(x => x.tier === 1); const u = mkUser(s, { cash: t2.price + 1000 });
  assert.equal((await call(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: t2.id, mode: 'own' } })).json.error, 'TOO_FAR');
  at(s, u, t1.door.x, t1.door.z); assert.equal((await call(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: t1.id, mode: 'own' } })).json.error, 'NOT_FOR_SALE');
  at(s, u, t2.door.x, t2.door.z); const r = await ok(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: t2.id, mode: 'own' } }); assert.equal(r.user.cash, t2.price + 1000 - t2.price);
  const sold = await ok(s, 'POST', '/api/property/release', { uid: u }); assert.equal(sold.refund, Math.floor(t2.price * 0.7)); assert.equal(sold.user.home, null);
  assert.equal(checkInvariants(s.db).ok, true);
});
test('rent tick: charges each period once; missed rent notifies then evicts; catch-up is idempotent', async () => {
  const s = makeServer(); const p = s.app.city.properties.find(x => x.tier === 1); const u = mkUser(s, { cash: p.rent * 6 }); at(s, u, p.door.x, p.door.z);
  await ok(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: p.id, mode: 'rent' } });
  s.app.clock.advance(DAY + 1000); const t1 = tickRent(s.app); assert.equal(t1.charged, 1); assert.equal(balanceOf(s.db, cashId(u)), p.rent * 4);
  assert.deepEqual(tickRent(s.app), { charged: 0, missed: 0, evicted: 0 }); // nothing due again
  s.db.prepare('UPDATE accounts SET balance=balance-? WHERE id=?').run(0, cashId(u));
  // drain the account legitimately, via a ledger spend, so invariants stay true
  const { move } = await import('../server/core/ledger.js'); move(s.app, { from: cashId(u), to: 'sys:sink_fees', amount: p.rent * 4, reason: 'drain' });
  s.app.clock.advance(DAY); const t2 = tickRent(s.app); assert.equal(t2.missed, 1); assert.equal(t2.evicted, 0);
  assert.ok((await ok(s, 'GET', '/api/notifications', { uid: u })).rows.some(n => n.kind === 'rent_missed'));
  s.app.clock.advance(DAY); const t3 = tickRent(s.app); assert.equal(t3.evicted, 1);
  assert.equal((await ok(s, 'GET', '/api/me', { uid: u })).user.home, null);
  assert.ok((await ok(s, 'GET', '/api/notifications', { uid: u })).rows.some(n => n.kind === 'eviction'));
  assert.equal(checkInvariants(s.db).ok, true);
});
test('rent tick: paying player is never evicted; money after missed period restores standing', async () => {
  const s = makeServer(); const p = s.app.city.properties.find(x => x.tier === 1); const u = mkUser(s, { cash: p.rent * 2 }); at(s, u, p.door.x, p.door.z);
  await ok(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: p.id, mode: 'rent' } });
  s.app.clock.advance(DAY + 1); tickRent(s.app); assert.equal(balanceOf(s.db, cashId(u)), 0);
  s.app.clock.advance(DAY); assert.equal(tickRent(s.app).missed, 1);
  await ok(s, 'POST', '/api/topup/test', { uid: u, body: { amount: 20000 } });
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
  const s = makeServer(); const t = s.app.balance.transfer; const tx = t.maxPerTx;
  const a = mkUser(s, { cash: t.maxPerDay }); const b = mkUser(s, { cash: 0 }); const g = mkUser(s, { guest: true, cash: tx });
  const bn = s.db.prepare('SELECT username FROM users WHERE id=?').get(b).username;
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: 500 } })).json.error, 'ACCOUNT_TOO_NEW');
  s.app.clock.advance(6 * 60000);
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: g, body: { to: bn, amount: 500 } })).json.error, 'GUEST_NOT_ALLOWED');
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: tx + 1 } })).json.error, 'OVER_LIMIT');
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: t.minAmount - 1 } })).json.error, 'BAD_AMOUNT');
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: a, body: { to: 'nobody_here', amount: 500 } })).json.error, 'NO_RECIPIENT');
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: a, body: { to: s.db.prepare('SELECT username FROM users WHERE id=?').get(a).username, amount: 500 } })).json.error, 'SELF');
  const x = await ok(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: tx, idem: 'one' } }); assert.equal(x.user.cash, t.maxPerDay - tx);
  const again = await ok(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: tx, idem: 'one' } }); assert.equal(again.duplicate, true); assert.equal(balanceOf(s.db, cashId(b)), tx);
  for (let i = 1; i < t.maxPerHourCount; i++) await ok(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: tx } });
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: tx } })).json.error, 'RATE_LIMIT');
  const sent = t.maxPerHourCount;
  s.app.clock.advance(HOUR + 1000);
  const more = Math.floor(t.maxPerDay / tx) - sent;
  for (let i = 0; i < more; i++) await ok(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: tx } });
  assert.equal((await call(s, 'POST', '/api/transfer', { uid: a, body: { to: bn, amount: tx } })).json.error, 'DAILY_LIMIT');
  assert.equal(checkInvariants(s.db).ok, true);
});
test('topup: test mode only, fixed amounts, daily cap, labelled test in ledger', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 0 });
  assert.equal((await call(s, 'POST', '/api/topup/test', { uid: u, body: { amount: 123 } })).json.error, 'BAD_AMOUNT');
  for (let i = 0; i < 2; i++) await ok(s, 'POST', '/api/topup/test', { uid: u, body: { amount: 20000 } });
  assert.equal((await call(s, 'POST', '/api/topup/test', { uid: u, body: { amount: 1000 } })).json.error, 'DAILY_LIMIT');
  assert.ok(s.db.prepare("SELECT 1 FROM ledger_tx WHERE reason='test_topup'").get());
});
test('Monipay Bank: ₦1,000,000 per 1h5m shift, 55m break, 10 shifts each, 10 people a day, then come back tomorrow', async () => {
  const s = makeServer(); const job = s.app.balance.jobs.find(j => j.id === 'monipay');
  assert.equal(job.wage, 1000000); assert.equal(job.durationSec, 65 * 60); assert.equal(job.cooldownSec, 55 * 60); assert.equal(job.maxHoursPerDay, 10); assert.equal(job.dailySlots, 10);
  const island = s.app.cities['lagos-island']; const loc = island.jobLoc.job_monipay;
  assert.equal(loc.label, 'Monipay Bank'); assert.ok(island.buildings.some(b => b.id === 'isl_b44' && b.kind === 'bank' && b.label === 'Monipay Bank'));
  const dawn = s.app.clock.now(); s.app.clock.advance(dayStart(dayKey(dawn)) + HOUR - dawn); // 1am Lagos, so 10 hours of work stay in one day
  const home = mkUser(s); assert.equal((await ok(s, 'GET', '/api/jobs', { uid: home })).jobs.some(j => j.id === 'monipay'), false);
  assert.equal((await call(s, 'POST', '/api/jobs/start', { uid: home, body: { jobId: 'monipay' } })).json.error, 'NO_JOB');
  const atBank = (u) => { enterCity(s.app, u, 'lagos-island'); at(s, u, loc.x, loc.z); s.db.prepare('UPDATE player_state SET energy=5, hunger=2, mood=40 WHERE user_id=?').run(u); };
  const u = mkUser(s); atBank(u);
  const listed = (await ok(s, 'GET', '/api/jobs', { uid: u })).jobs.find(j => j.id === 'monipay');
  assert.equal(listed.slotsLeft, 10); assert.equal(listed.hoursLeft, 10); assert.equal(listed.onRoster, false);
  const st = await ok(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'monipay' } }); assert.equal(st.user.shift.jobId, 'monipay'); assert.equal(st.user.shift.wage, 1000000);
  s.app.clock.advance(job.durationSec * 1000);
  const paid = await ok(s, 'POST', '/api/jobs/claim', { uid: u }); assert.equal(paid.wage, 1000000);
  const after = (await ok(s, 'GET', '/api/jobs', { uid: u })).jobs.find(j => j.id === 'monipay');
  assert.equal(after.hoursLeft, 9); assert.equal(after.slotsLeft, 9); assert.equal(after.onRoster, true);
  assert.ok(after.cooldownLeftMs > 0, '55 m break after collecting pay');
  assert.equal((await call(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'monipay' } })).json.error, 'COOLDOWN');
  s.app.clock.advance(job.cooldownSec * 1000);
  const fillers = [];
  for (let i = 0; i < 9; i++) { const p = mkUser(s); atBank(p); fillers.push(p); await ok(s, 'POST', '/api/jobs/start', { uid: p, body: { jobId: 'monipay' } }); }
  const late = mkUser(s); atBank(late);
  assert.equal((await call(s, 'POST', '/api/jobs/start', { uid: late, body: { jobId: 'monipay' } })).json.error, 'JOB_FULL');
  await ok(s, 'POST', '/api/jobs/abandon', { uid: fillers[0] });
  await ok(s, 'POST', '/api/jobs/start', { uid: late, body: { jobId: 'monipay' } });
  await ok(s, 'POST', '/api/jobs/abandon', { uid: late });
  for (let h = 0; h < 9; h++) {
    await ok(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'monipay' } });
    s.app.clock.advance(job.durationSec * 1000);
    await ok(s, 'POST', '/api/jobs/claim', { uid: u });
    if (h < 8) s.app.clock.advance(job.cooldownSec * 1000);
  }
  assert.equal((await call(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'monipay' } })).json.error, 'COOLDOWN');
  s.app.clock.advance(job.cooldownSec * 1000);
  assert.equal((await call(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'monipay' } })).json.error, 'HOURS_DONE');
  const now = s.app.clock.now(); s.app.clock.advance(dayStart(dayKey(now) + 1) - now + 1000);
  atBank(late); await ok(s, 'POST', '/api/jobs/start', { uid: late, body: { jobId: 'monipay' } });
  atBank(u); await ok(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'monipay' } });
});
test('leaderboard ranks by net worth, hides bots, includes savings', async () => {
  const s = makeServer(); const a = mkUser(s, { cash: 100 }); const b = mkUser(s, { cash: 900 }); mkUser(s, { cash: 99999, bot: true });
  await ok(s, 'POST', '/api/bank', { uid: b, body: { dir: 'deposit', amount: 400 } });
  const lb = (await ok(s, 'GET', '/api/leaderboard', { uid: a })).rows; assert.equal(lb[0].netWorth, 900); assert.ok(!lb.some(r => r.netWorth === 99999));
});
