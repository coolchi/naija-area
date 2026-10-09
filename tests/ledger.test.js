import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, at, jobPos } from './helpers.js';
import { post, move, checkInvariants, balanceOf, cashId, SYS } from '../server/core/ledger.js';
import { claimShift, startShift, shopBuy } from '../server/core/economy.js';

test('ledger: unbalanced and zero legs are refused', () => {
  const s = makeServer(); const u = mkUser(s);
  assert.throws(() => post(s.app, { reason: 't', legs: [{ account: cashId(u), amount: 5 }, { account: SYS.SINK_FEES, amount: -4 }] }), /unbalanced/);
  assert.throws(() => post(s.app, { reason: 't', legs: [{ account: cashId(u), amount: 0 }, { account: SYS.SINK_FEES, amount: 0 }] }), /non-zero/);
  assert.equal(checkInvariants(s.db).ok, true);
});
test('ledger: user balance can never go negative (no overdraft), failed tx leaves no trace', () => {
  const s = makeServer(); const u = mkUser(s, { cash: 1000 });
  assert.throws(() => move(s.app, { from: cashId(u), to: SYS.SINK_FEES, amount: 1001, reason: 'x' }), (e) => e.code === 'INSUFFICIENT_FUNDS');
  assert.equal(balanceOf(s.db, cashId(u)), 1000);
  assert.equal(s.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE reason='x'").get().n, 0);
  assert.equal(checkInvariants(s.db).ok, true);
});
test('ledger: idempotency key replays do not double-spend', () => {
  const s = makeServer(); const u = mkUser(s, { cash: 1000 });
  const a = move(s.app, { from: cashId(u), to: SYS.SINK_FEES, amount: 600, reason: 'x', idemKey: 'k1' });
  const b = move(s.app, { from: cashId(u), to: SYS.SINK_FEES, amount: 600, reason: 'x', idemKey: 'k1' });
  assert.equal(a.duplicate, false); assert.equal(b.duplicate, true); assert.equal(balanceOf(s.db, cashId(u)), 400);
});
test('ledger: rows are append-only (UPDATE/DELETE blocked by triggers)', () => {
  const s = makeServer(); mkUser(s);
  assert.throws(() => s.db.prepare('UPDATE ledger_entries SET amount=999').run(), /append-only/);
  assert.throws(() => s.db.prepare('DELETE FROM ledger_entries').run(), /append-only/);
  assert.throws(() => s.db.prepare('DELETE FROM ledger_tx').run(), /append-only/);
});
test('ledger: DB CHECK constraint also forbids negative user balance even if code is bypassed', () => {
  const s = makeServer(); const u = mkUser(s, { cash: 10 });
  assert.throws(() => s.db.prepare('UPDATE accounts SET balance=-1 WHERE id=?').run(cashId(u)), /CHECK/);
});
test('ledger: concurrent claims of ONE shift pay exactly once (double-spend/duplicate-payout)', async () => {
  const s = makeServer(); const u = mkUser(s); const loc = jobPos(s, 'job_shop'); at(s, u, loc.x, loc.z);
  await ok(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'shop' } });
  s.app.clock.advance(61000);
  const before = balanceOf(s.db, cashId(u));
  const rs = await Promise.all(Array.from({ length: 15 }, () => call(s, 'POST', '/api/jobs/claim', { uid: u })));
  assert.equal(rs.filter(r => r.status === 200).length, 1);
  assert.equal(balanceOf(s.db, cashId(u)) - before, 1300);
  assert.equal(checkInvariants(s.db).ok, true);
});
test('ledger: concurrent purchases cannot spend more than the balance', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 1000 }); const shop = s.app.city.shopById.shop_canteen; at(s, u, shop.x, shop.z);
  const rs = await Promise.all(Array.from({ length: 12 }, () => call(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_canteen', itemId: 'jollof' } })));
  assert.equal(rs.filter(r => r.status === 200).length, 0); // jollof costs 1500 > 1000
  const rs2 = await Promise.all(Array.from({ length: 12 }, () => call(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_canteen', itemId: 'amala' } })));
  assert.equal(rs2.filter(r => r.status === 200).length, 0); // 1100 > 1000
  const rs3 = await Promise.all(Array.from({ length: 12 }, () => call(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_canteen', itemId: 'zobo' } })));
  assert.equal(rs3.filter(r => r.status === 200).length, 3); // 300 each: 3 fit in 1000
  assert.equal(balanceOf(s.db, cashId(u)), 100);
  assert.equal(checkInvariants(s.db).ok, true);
});
test('ledger: same idempotency key on /shop/buy replays safely', async () => {
  const s = makeServer(); const u = mkUser(s, { cash: 5000 }); const shop = s.app.city.shopById.shop_mart; at(s, u, shop.x, shop.z);
  const b = { shopId: 'shop_mart', itemId: 'pie', idem: 'abc' };
  await ok(s, 'POST', '/api/shop/buy', { uid: u, body: b }); const r2 = await ok(s, 'POST', '/api/shop/buy', { uid: u, body: b });
  assert.equal(r2.duplicate, true); assert.equal(balanceOf(s.db, cashId(u)), 5000 - 400);
});
test('ledger: invariants hold after a mixed random workload', async () => {
  const s = makeServer(); const users = Array.from({ length: 6 }, () => mkUser(s, { cash: 8000, ageMs: 0 })); s.app.clock.advance(10 * 60000);
  const shop = s.app.city.shopById.shop_mart;
  for (let i = 0; i < 200; i++) {
    const u = users[i % users.length]; at(s, u, shop.x, shop.z);
    const r = i % 3;
    if (r === 0) await call(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_mart', itemId: 'pie' } });
    else if (r === 1) await call(s, 'POST', '/api/bank', { uid: u, body: { dir: i % 2 ? 'deposit' : 'withdraw', amount: 100 + (i % 7) * 300 } });
    else await call(s, 'POST', '/api/transfer', { uid: u, body: { to: s.db.prepare('SELECT username FROM users WHERE id=?').get(users[(i + 1) % users.length]).username, amount: 150 + (i % 5) * 100 } });
  }
  const inv = checkInvariants(s.db); assert.equal(inv.ok, true, JSON.stringify(inv));
});
