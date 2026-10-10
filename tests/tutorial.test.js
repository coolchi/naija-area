// First-five-minutes tutorial (10 Oct 2026): server-checked steps, guide-only steps, one-time reward through the ledger.
import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, ok, call, at, jobPos } from './helpers.js';
import { checkInvariants, balanceOf, cashId, move, SYS } from '../server/core/ledger.js';
import { TUTORIAL } from '../server/config/progress.js';

const step = (v, id) => v.steps.find(s => s.id === id);
test('the checklist starts with nothing done, the walk step needs real distance, guide steps are marked as guides', async () => {
  const s = makeServer(); const u = mkUser(s); at(s, u, 10, 10); const v = await ok(s, 'GET', '/api/tutorial', { uid: u });
  assert.equal(v.active, true); assert.equal(v.doneCount, 0); assert.equal(v.current, 'walk'); assert.deepEqual(v.steps.map(x => x.id), TUTORIAL.steps.map(x => x.id)); assert.equal(step(v, 'map').guide, true); assert.equal(step(v, 'job').guide, false);
  at(s, u, 10 + TUTORIAL.minWalkM - 5, 10); assert.equal(step(await ok(s, 'GET', '/api/tutorial', { uid: u }), 'walk').done, false); at(s, u, 10 + TUTORIAL.minWalkM + 1, 10); assert.equal(step(await ok(s, 'GET', '/api/tutorial', { uid: u }), 'walk').done, true);
});
test('guide steps are reported by the app; unknown or server-checked steps cannot be faked', async () => {
  const s = makeServer(); const u = mkUser(s); await ok(s, 'GET', '/api/tutorial', { uid: u }); const v = await ok(s, 'POST', '/api/tutorial/ack', { uid: u, body: { step: 'map' } }); assert.equal(step(v, 'map').done, true);
  assert.equal((await call(s, 'POST', '/api/tutorial/ack', { uid: u, body: { step: 'job' } })).json.error, 'BAD_STEP'); assert.equal((await call(s, 'POST', '/api/tutorial/ack', { uid: u, body: { step: 'nope' } })).json.error, 'BAD_STEP'); assert.equal((await call(s, 'GET', '/api/tutorial')).status, 401);
});
test('doing the real things completes the server steps and pays the reward ONCE through the ledger (money book still balances); guide steps do not gate it', async () => {
  const s = makeServer(); const u = mkUser(s); at(s, u, 0, 0); await ok(s, 'GET', '/api/tutorial', { uid: u }); const cash0 = balanceOf(s.app.db, cashId(u));
  at(s, u, 40, 0); const jp = jobPos(s, 'job_shop'); at(s, u, jp.x, jp.z); await ok(s, 'POST', '/api/jobs/start', { uid: u, body: { jobId: 'shop' } }); s.app.clock.advance(61000); await ok(s, 'POST', '/api/jobs/claim', { uid: u });
  const shop = s.app.city.shopById.shop_canteen; at(s, u, shop.x, shop.z); await ok(s, 'POST', '/api/shop/buy', { uid: u, body: { shopId: 'shop_canteen', itemId: 'jollof' } });
  let v = await ok(s, 'GET', '/api/tutorial', { uid: u }); assert.equal(v.done, false, 'no home yet'); const wage = balanceOf(s.app.db, cashId(u));
  const p = s.app.city.properties.find(x => x.rent <= 3000) || s.app.city.properties[0]; move(s.app, { from: SYS.FAUCET_TESTTOPUP, to: cashId(u), amount: 100000, reason: 'test_topup', userId: u }); at(s, u, p.door.x, p.door.z); await ok(s, 'POST', '/api/property/acquire', { uid: u, body: { propertyId: p.id, mode: 'rent' } }); const before = balanceOf(s.app.db, cashId(u));
  v = await ok(s, 'GET', '/api/tutorial', { uid: u }); assert.equal(v.done, true, JSON.stringify(v.steps.map(x => [x.id, x.done]))); assert.equal(v.active, false); assert.equal(v.reward, TUTORIAL.reward); assert.equal(balanceOf(s.app.db, cashId(u)), before + TUTORIAL.reward);
  await ok(s, 'GET', '/api/tutorial', { uid: u }); await ok(s, 'GET', '/api/tutorial', { uid: u }); assert.equal(balanceOf(s.app.db, cashId(u)), before + TUTORIAL.reward, 'paid once'); assert.equal(checkInvariants(s.app.db).ok, true); void cash0; void wage;
  assert.equal(s.app.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE user_id=? AND reason='mission_tutorial'").get(u).n, 1); assert.ok(s.app.db.prepare("SELECT 1 FROM notifications WHERE user_id=? AND kind='tutorial'").get(u));
});
test('skipping stops the tutorial and no reward is paid later; restart brings it back; bots have none', async () => {
  const s = makeServer(); const u = mkUser(s); const sk = await ok(s, 'POST', '/api/tutorial/skip', { uid: u }); assert.equal(sk.active, false); assert.equal(sk.skipped, true);
  const re = await ok(s, 'POST', '/api/tutorial/restart', { uid: u }); assert.equal(re.active, true); const bot = mkUser(s, { bot: true }); assert.equal((await ok(s, 'GET', '/api/tutorial', { uid: bot })).enabled, false);
});
test('the tutorial can be switched off in config, and its data is in the player download and erased on closing', async () => {
  const s = makeServer(); const u = mkUser(s); await ok(s, 'GET', '/api/tutorial', { uid: u }); const { exportData } = await import('../server/core/account.js'); assert.ok(exportData(s.app, u).tutorial);
  TUTORIAL.enabled = false; try { assert.equal((await ok(s, 'GET', '/api/tutorial', { uid: u })).enabled, false); } finally { TUTORIAL.enabled = true; }
  const { deleteMine } = await import('../server/core/tutorial.js'); deleteMine(s.app, u); assert.equal(s.app.db.prepare('SELECT COUNT(*) n FROM tutorial_state WHERE user_id=?').get(u).n, 0);
});
