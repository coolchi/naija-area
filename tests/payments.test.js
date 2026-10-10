import test from 'node:test'; import assert from 'node:assert/strict';
import { makeServer, mkUser, call, ok, newAdvertiser, submitAd, HOUR } from './helpers.js';
import { checkInvariants, balanceOf, cashId } from '../server/core/ledger.js';
import { PAYMENTS } from '../server/config/payments.js';
import { priceKobo, collectionFeeKobo, proportion } from '../server/core/payments/fees.js';
import * as pay from '../server/core/payments/index.js';
import { monipayProvider, mockProvider, checkSignature } from '../server/core/payments/providers.js';
import { nodePlatform } from '../server/platform-node.js';
import { tickAds } from '../server/core/ads.js';

const platform = nodePlatform({ secret: 'test' });
const EMAIL = 'buyer@example.com';
const mk = (o = {}, cfg = {}) => makeServer({ paymentsConfig: { ...PAYMENTS, ...cfg }, ...o });
async function buy(s, uid, pack = 'p5000', extra = {}) { return (await ok(s, 'POST', '/api/payments/topup', { uid, body: { pack, email: EMAIL, ...extra } })).payment; }
async function pay_(s, ref, opts = {}) { const pr = s.app.payments.provider; pr.complete(ref, opts); const wh = pr.webhook(ref); return call(s, 'POST', '/api/payments/webhook', { raw: wh.body, headers: wh.headers }); }
const cash = (s, uid) => balanceOf(s.db, cashId(uid));
const inv = (s) => assert.equal(checkInvariants(s.db).ok, true);

// ---------------------------------------------------------------- money maths
test('fees: Monipay collection fee ESTIMATE is 1% capped at ₦500 (50,000 kobo), VAT 7.5% on top', () => {
  assert.equal(collectionFeeKobo(100000, PAYMENTS.fee), 1000);            // ₦1,000 -> ₦10
  assert.equal(collectionFeeKobo(10000000, PAYMENTS.fee), 50000);         // ₦100,000 -> capped at ₦500
  const p = priceKobo(500000, PAYMENTS);                                   // ₦5,000 net
  assert.deepEqual([p.netKobo, p.vatKobo, p.totalKobo, p.feeEstKobo], [500000, 37500, 537500, 5375]);
  assert.equal(p.merchantNetKobo, 537500 - 5375 - 37500);
  assert.throws(() => priceKobo(0, PAYMENTS)); assert.throws(() => priceKobo(1.5, PAYMENTS));
  assert.equal(proportion(1000, 1, 3), 333);
});
test('config: packs show net, VAT line and total; test mode is announced', async () => {
  const s = mk(); const c = await ok(s, 'GET', '/api/payments/config');
  assert.equal(c.enabled, true); assert.equal(c.testMode, true); assert.equal(c.provider, 'mock');
  const p = c.packs.find(x => x.id === 'p1000'); assert.deepEqual([p.net, p.vat, p.total, p.credit], [1000, 75, 1075, 1000]);
  assert.equal((await ok(s, 'GET', '/api/config')).payments.enabled, true);
});

// ---------------------------------------------------------------- top-up happy path and webhook safety
test('top-up: pay, signed webhook, server verify, ONE credit through the ledger', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 });
  const p = await buy(s, u); assert.equal(p.status, 'pending'); assert.match(p.authorizationUrl, /pay\/mock/); assert.equal(p.total, 5375);
  assert.equal(cash(s, u), 0);
  const r = await pay_(s, p.ref, { fees: 5375 }); assert.equal(r.status, 200); assert.equal(r.json.outcome, 'paid');
  assert.equal(cash(s, u), 5000);
  const it = s.db.prepare('SELECT * FROM payment_intents WHERE ref=?').get(p.ref);
  assert.equal(it.status, 'paid'); assert.equal(it.provider_fee_kobo, 5375); assert.ok(it.ledger_tx_id);
  assert.equal(s.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE reason='topup_paid'").get().n, 1);
  assert.equal(balanceOf(s.db, pay.PAID_TOPUP), -5000); inv(s);
});
test('webhook: a re-delivered or replayed event never credits twice', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const p = await buy(s, u);
  const pr = s.app.payments.provider; pr.complete(p.ref); const wh = pr.webhook(p.ref);
  assert.equal((await call(s, 'POST', '/api/payments/webhook', { raw: wh.body, headers: wh.headers })).json.outcome, 'paid');
  const again = await call(s, 'POST', '/api/payments/webhook', { raw: wh.body, headers: wh.headers }); assert.equal(again.json.duplicate, true);
  // same event re-serialised (different bytes, valid signature): the intent is already paid, so still one credit
  const body = Buffer.from(JSON.stringify({ ...JSON.parse(wh.body), extra: 1 })); const hd = { 'x-monipay-signature': platform.hmacHex('sha512', pr.secret, body) };
  assert.equal((await call(s, 'POST', '/api/payments/webhook', { raw: body, headers: hd })).json.outcome, 'already_paid');
  assert.equal(cash(s, u), 5000); assert.equal(s.db.prepare("SELECT COUNT(*) n FROM ledger_tx WHERE reason='topup_paid'").get().n, 1); inv(s);
});
test('webhook: bad, missing, tampered or wrong-secret signatures are refused and credit nothing', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const p = await buy(s, u); const pr = s.app.payments.provider; pr.complete(p.ref); const wh = pr.webhook(p.ref);
  for (const [raw, headers] of [[wh.body, {}], [wh.body, { 'x-monipay-signature': 'deadbeef' }], [Buffer.from(wh.body.toString().replace('537500', '999999999')), wh.headers], [wh.body, { 'x-monipay-signature': platform.hmacHex('sha512', 'other-secret', wh.body) }]]) {
    const r = await call(s, 'POST', '/api/payments/webhook', { raw, headers }); assert.equal(r.status, 401); assert.equal(r.json.error, 'BAD_SIGNATURE');
  }
  assert.equal((await call(s, 'POST', '/api/payments/webhook', { raw: Buffer.alloc(0), headers: wh.headers })).status, 400);
  assert.equal(cash(s, u), 0); assert.ok(s.db.prepare("SELECT COUNT(*) n FROM payment_events WHERE outcome='bad_signature'").get().n >= 4);
  // the documented "sha512=" prefix form is accepted, and so is upper case
  const pre = await call(s, 'POST', '/api/payments/webhook', { raw: wh.body, headers: { 'X-Monipay-Signature': 'sha512=' + wh.headers['x-monipay-signature'].toUpperCase() } }); assert.equal(pre.status, 200); assert.equal(cash(s, u), 5000);
});
test('webhook: a correctly signed "success" still needs the provider to confirm (the webhook is only a trigger)', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const p = await buy(s, u); const pr = s.app.payments.provider;
  const wh = pr.webhook(p.ref); // signed, says success, but the gateway never completed it
  const r = await call(s, 'POST', '/api/payments/webhook', { raw: wh.body, headers: wh.headers }); assert.equal(r.json.outcome, 'still_pending'); assert.equal(cash(s, u), 0);
});
test('webhook: unknown reference and unrelated events are acknowledged and ignored', async () => {
  const s = mk(); const pr = s.app.payments.provider; const sign = (o) => { const b = Buffer.from(JSON.stringify(o)); return { raw: b, headers: { 'x-monipay-signature': platform.hmacHex('sha512', pr.secret, b) } }; };
  const a = await call(s, 'POST', '/api/payments/webhook', sign({ event: 'charge.success', data: { id: 1, reference: 'nope', amount: 1 } })); assert.equal(a.status, 200); assert.equal(a.json.ignored, true);
  const b = await call(s, 'POST', '/api/payments/webhook', sign({ event: 'transfer.success', data: { id: 2, reference: 'x' } })); assert.equal(b.status, 200);
  assert.equal((await call(s, 'POST', '/api/payments/webhook', { raw: Buffer.from('not json'), headers: { 'x-monipay-signature': platform.hmacHex('sha512', pr.secret, Buffer.from('not json')) } })).status, 400);
});
test('amount mismatch: the provider says a different amount was paid -> held for review, no credit', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const p = await buy(s, u); const r = await pay_(s, p.ref, { amountKobo: 100 });
  assert.equal(r.json.outcome, 'review'); assert.equal(cash(s, u), 0); assert.equal(s.db.prepare('SELECT status FROM payment_intents WHERE ref=?').get(p.ref).status, 'review');
  const rec = await pay.reconcile(s.app); assert.equal(rec.ok, false); assert.ok(rec.issues.some(i => i.kind === 'needs_review'));
});
test('a LIVE transaction seen in test mode is held, never credited', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const p = await buy(s, u); const pr = s.app.payments.provider; pr.complete(p.ref);
  const orig = pr.verify; pr.verify = async (r) => ({ ...(await orig(r)), live: true }); const wh = pr.webhook(p.ref);
  const r = await call(s, 'POST', '/api/payments/webhook', { raw: wh.body, headers: wh.headers }); assert.equal(r.json.outcome, 'review'); assert.equal(cash(s, u), 0);
});
test('the player return page: server verify, no webhook needed', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const p = await buy(s, u); s.app.payments.provider.complete(p.ref);
  const st = await ok(s, 'GET', `/api/payments/status?ref=${p.ref}`, { uid: u }); assert.equal(st.payment.status, 'paid'); assert.equal(st.user.cash, 5000);
  await ok(s, 'GET', `/api/payments/status?ref=${p.ref}`, { uid: u }); assert.equal(cash(s, u), 5000);
  const other = mkUser(s); assert.equal((await call(s, 'GET', `/api/payments/status?ref=${p.ref}`, { uid: other })).status, 404);
});
test('failed payment: no credit, status failed, a later success is still honoured once', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const p = await buy(s, u); const pr = s.app.payments.provider; pr.fail(p.ref);
  const wh = pr.webhook(p.ref, 'charge.failed'); await call(s, 'POST', '/api/payments/webhook', { raw: wh.body, headers: wh.headers });
  assert.equal(s.db.prepare('SELECT status FROM payment_intents WHERE ref=?').get(p.ref).status, 'failed'); assert.equal(cash(s, u), 0);
  pr.complete(p.ref); const r = await pay.confirmPayment(s.app, p.ref); assert.equal(r.status, 'paid'); assert.equal(cash(s, u), 5000);
});

// ---------------------------------------------------------------- who may buy
test('top-up rules: guests, bad pack, bad email, daily limit, open limit, idempotent start', async () => {
  const s = mk({}, { maxPerUserPerDayKobo: 1500000 }); const u = mkUser(s, { cash: 0 });
  assert.equal((await call(s, 'POST', '/api/payments/topup', { uid: mkUser(s, { guest: true }), body: { pack: 'p1000', email: EMAIL } })).json.error, 'GUEST_CANNOT_PAY');
  assert.equal((await call(s, 'POST', '/api/payments/topup', { uid: u, body: { pack: 'nope', email: EMAIL } })).json.error, 'BAD_PACK');
  assert.equal((await call(s, 'POST', '/api/payments/topup', { uid: u, body: { pack: 'p1000', email: 'x' } })).json.error, 'BAD_EMAIL');
  assert.equal((await call(s, 'POST', '/api/payments/topup', {})).status, 401);
  const a = await buy(s, u, 'p1000', { idem: 'k1' }); const b = await buy(s, u, 'p1000', { idem: 'k1' }); assert.equal(a.ref, b.ref);
  assert.equal((await call(s, 'POST', '/api/payments/topup', { uid: u, body: { pack: 'p20000', email: EMAIL } })).json.error, 'DAILY_LIMIT'); // 21,500 > 15,000 limit
  await buy(s, u, 'p1000'); await buy(s, u, 'p1000');
  assert.equal((await call(s, 'POST', '/api/payments/topup', { uid: u, body: { pack: 'p1000', email: EMAIL } })).json.error, 'TOO_MANY_OPEN');
});
test('age gate hook: an unconfirmed or blocked player cannot start a payment', async () => {
  const s = mk(); const u = mkUser(s); s.db.prepare('UPDATE users SET age_confirmed_at=NULL WHERE id=?').run(u);
  assert.equal((await call(s, 'POST', '/api/payments/topup', { uid: u, body: { pack: 'p1000', email: EMAIL } })).json.error, 'AGE_REQUIRED');
});
test('closed loop: buyers cannot send money to other players; others still can', async () => {
  const s = mk({ balance: undefined }); const a = mkUser(s, { cash: 0, ageMs: 10 * 60000 }); const b = mkUser(s, { cash: 5000, ageMs: 10 * 60000 });
  const sender = s.db.prepare('SELECT username FROM users WHERE id=?').get(b).username; const dest = s.db.prepare('SELECT username FROM users WHERE id=?').get(a).username;
  await ok(s, 'POST', '/api/transfer', { uid: b, body: { to: dest, amount: 200, idem: 'x1' } }); // never bought: fine
  const p = await buy(s, a); await pay_(s, p.ref);
  const r = await call(s, 'POST', '/api/transfer', { uid: a, body: { to: sender, amount: 200, idem: 'x2' } }); assert.equal(r.json.error, 'PURCHASED_CURRENCY');
});

// ---------------------------------------------------------------- refunds
test('refund: full refund reverses the credit once, cash refund goes to the provider, invariants hold', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const p = await buy(s, u); await pay_(s, p.ref);
  const a = await ok(s, 'POST', `/api/admin/payments/${p.ref}/refund`, { admin: true, body: { reason: 'test', idem: 'r1' } }); assert.equal(a.refund.amount_kobo, 537500); assert.equal(a.refund.credit_reversed, 5000);
  const b = await ok(s, 'POST', `/api/admin/payments/${p.ref}/refund`, { admin: true, body: { reason: 'test', idem: 'r1' } }); assert.equal(b.duplicate, true);
  assert.equal(cash(s, u), 0); assert.equal(balanceOf(s.db, pay.PAID_TOPUP), 0); inv(s);
  assert.equal((await call(s, 'POST', `/api/admin/payments/${p.ref}/refund`, { admin: true, body: { reason: 'again' } })).json.error, 'NOT_REFUNDABLE');
  assert.equal(await pay.processRefunds(s.app), 1); assert.equal(s.db.prepare('SELECT status FROM payment_refunds WHERE id=?').get(a.refund.id).status, 'processed');
  assert.equal(s.db.prepare('SELECT status FROM payment_intents WHERE ref=?').get(p.ref).status, 'refunded');
  assert.equal((await pay.reconcile(s.app)).ok, true);
});
test('refund: partial refunds reverse the credit in proportion and cannot exceed what was paid', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const p = await buy(s, u); await pay_(s, p.ref);
  const r1 = pay.requestRefund(s.app, p.ref, { amountKobo: 268750, reason: 'half' }); assert.equal(r1.refund.credit_reversed, 2500); assert.equal(cash(s, u), 2500);
  assert.equal(s.db.prepare('SELECT status FROM payment_intents WHERE ref=?').get(p.ref).status, 'partially_refunded');
  assert.throws(() => pay.requestRefund(s.app, p.ref, { amountKobo: 268751 }), (e) => e.code === 'BAD_AMOUNT');
  const r2 = pay.requestRefund(s.app, p.ref, {}); assert.equal(r2.refund.amount_kobo, 268750); assert.equal(r2.refund.credit_reversed, 2500); assert.equal(cash(s, u), 0);
  assert.equal(balanceOf(s.db, pay.PAID_TOPUP), 0); inv(s); assert.equal((await pay.reconcile(s.app)).ok, true);
});
test('refund: if the player already spent the game money, only what is still there can be refunded', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const p = await buy(s, u); await pay_(s, p.ref);
  s.db.prepare('UPDATE accounts SET balance=1000 WHERE id=?').run(cashId(u)); // simulate spending (kept simple: tampering only to set the scene)
  s.db.prepare("INSERT INTO ledger_tx(reason,created_at) VALUES ('spent',1)").run();
  const tx = s.db.prepare("SELECT MAX(id) id FROM ledger_tx").get().id;
  s.db.prepare("INSERT INTO ledger_entries(tx_id,account_id,amount,balance_after,created_at) VALUES (?,?,?,?,1)").run(tx, cashId(u), -4000, 1000);
  s.db.prepare("INSERT INTO ledger_entries(tx_id,account_id,amount,balance_after,created_at) VALUES (?,?,?,?,1)").run(tx, 'sys:sink_shops', 4000, 4000);
  s.db.prepare("UPDATE accounts SET balance=balance+4000 WHERE id='sys:sink_shops'").run(); inv(s);
  assert.throws(() => pay.requestRefund(s.app, p.ref, {}), (e) => e.code === 'PLAYER_SPENT_CREDIT' && e.extra.maxRefundKobo === 107500);
  pay.requestRefund(s.app, p.ref, { amountKobo: 107500 }); assert.equal(cash(s, u), 0); inv(s);
});
test('refund: the Monipay provider cannot send a cash refund (no documented API), so it is recorded and settled by hand', async () => {
  const calls = []; const fetchImpl = async (url, o) => { calls.push([url, o]); return { status: 200, text: async () => JSON.stringify({ status: true, data: {} }) }; };
  const prov = monipayProvider({ platform, secretKey: 'pri_test_abc', fetchImpl });
  const s = mk({ paymentsProvider: Object.assign(Object.create(prov), { initialize: async () => ({ authorizationUrl: 'https://checkout.monipay.ng/pay/x' }), verify: async () => ({ found: true, state: 'success', amountKobo: 537500, feesKobo: 5375, providerTxnId: 'M1', live: false }) }) });
  const u = mkUser(s, { cash: 0 }); const p = await buy(s, u); await pay.confirmPayment(s.app, p.ref); assert.equal(cash(s, u), 5000);
  const r = pay.requestRefund(s.app, p.ref, { reason: 'x' }); await pay.processRefunds(s.app);
  assert.equal(s.db.prepare('SELECT status FROM payment_refunds WHERE id=?').get(r.refund.id).status, 'pending_manual'); assert.equal(calls.length, 0); // no network call was invented
  assert.ok((await pay.reconcile(s.app)).ok); // young manual refunds are fine
  await ok(s, 'POST', `/api/admin/payments/refunds/${r.refund.id}/settle`, { admin: true, body: { providerRefundId: 'dash-123' } });
  assert.equal(s.db.prepare('SELECT status FROM payment_refunds WHERE id=?').get(r.refund.id).status, 'processed');
  assert.equal((await call(s, 'POST', `/api/admin/payments/refunds/${r.refund.id}/settle`, { admin: true, body: {} })).status, 409);
});

// ---------------------------------------------------------------- the Monipay adapter against the documented shapes
test('monipay adapter: initialize/verify use the documented endpoints, headers and kobo amounts', async () => {
  const calls = []; const answers = [
    { status: 200, body: { status: true, message: 'Authorization URL created', data: { authorization_url: 'https://checkout.monipay.ng/pay/NAT-1', access_code: 'ac_1', reference: 'NAT-1' } } },
    { status: 200, body: { status: true, message: 'Verification successful', data: { id: 'ACX1', reference: 'NAT-1', amount: 107500, status: 'success', domain: 'test', paid_at: '2026-10-10 09:00:00', fees: 1075, currency: 'NGN' } } },
    { status: 404, body: { status: false, message: 'not found' } },
    { status: 401, body: { status: false, message: 'Invalid key' } }];
  const fetchImpl = async (url, o) => { calls.push({ url, o }); const a = answers[calls.length - 1]; return { status: a.status, text: async () => JSON.stringify(a.body) }; };
  const p = monipayProvider({ platform, secretKey: 'pri_test_secret', publicKey: 'pub_test_x', fetchImpl });
  const init = await p.initialize({ reference: 'NAT-1', amountKobo: 107500, email: 'a@b.co', callbackUrl: 'https://game.example/play?pay=NAT-1', metadata: { x: 1 } });
  assert.equal(init.authorizationUrl, 'https://checkout.monipay.ng/pay/NAT-1');
  assert.equal(calls[0].url, 'https://api.monipay.ng/transaction/initialize'); assert.equal(calls[0].o.method, 'POST'); assert.equal(calls[0].o.headers.Authorization, 'Bearer pri_test_secret');
  const body = JSON.parse(calls[0].o.body); assert.equal(body.amount, 107500); assert.equal(body.reference, 'NAT-1'); assert.equal(body.currency, 'NGN'); assert.equal(body.callback_url, 'https://game.example/play?pay=NAT-1'); assert.equal(body.email, 'a@b.co');
  const v = await p.verify('NAT-1'); assert.equal(calls[1].url, 'https://api.monipay.ng/transaction/verify/NAT-1'); assert.equal(calls[1].o.method, 'GET');
  assert.deepEqual([v.found, v.state, v.amountKobo, v.feesKobo, v.live, v.providerTxnId], [true, 'success', 107500, 1075, false, 'ACX1']);
  assert.equal((await p.verify('missing')).found, false);
  await assert.rejects(p.verify('x'), (e) => e.code === 'PAYMENT_PROVIDER' && e.status === 502);
});
test('monipay adapter: live keys are refused, a LIVE-domain answer is flagged, network trouble becomes a clean error', async () => {
  assert.throws(() => monipayProvider({ platform, secretKey: 'pri_live_x' }), /live keys are refused/);
  assert.throws(() => monipayProvider({ platform, secretKey: 'pri_test_x', publicKey: 'pub_live_y' }), /live keys are refused/);
  assert.throws(() => monipayProvider({ platform, secretKey: 'sk_whatever' }), /pri_test_/);
  assert.throws(() => monipayProvider({ platform }), /required/);
  const live = monipayProvider({ platform, secretKey: 'pri_test_x', fetchImpl: async () => ({ status: 200, text: async () => JSON.stringify({ status: true, data: { status: 'success', amount: 1, domain: 'live' } }) }) });
  assert.equal((await live.verify('r')).live, true);
  const down = monipayProvider({ platform, secretKey: 'pri_test_x', fetchImpl: async () => { throw new Error('ECONNRESET'); } });
  await assert.rejects(down.initialize({ reference: 'r', amountKobo: 5000, email: 'a@b.co' }), (e) => e.code === 'PAYMENT_PROVIDER');
  const garbage = monipayProvider({ platform, secretKey: 'pri_test_x', fetchImpl: async () => ({ status: 200, text: async () => '<html>' }) });
  await assert.rejects(garbage.verify('r'), (e) => e.code === 'PAYMENT_PROVIDER');
});
test('monipay adapter: signature is HMAC-SHA512 hex over the raw body, constant-time; webhook secret may differ from the API key', async () => {
  const p = monipayProvider({ platform, secretKey: 'pri_test_k', webhookSecret: 'whsec' }); const body = Buffer.from('{"event":"charge.success","data":{"id":9,"reference":"r1","amount":5000}}');
  const good = platform.hmacHex('sha512', 'whsec', body); assert.equal(p.verifyWebhook(body, { 'x-monipay-signature': good }), true); assert.equal(p.verifyWebhook(body, { 'x-monipay-signature': 'sha512=' + good }), true);
  assert.equal(p.verifyWebhook(body, { 'x-monipay-signature': platform.hmacHex('sha512', 'pri_test_k', body) }), false);
  assert.equal(p.verifyWebhook(Buffer.from(body.toString() + ' '), { 'x-monipay-signature': good }), false);
  assert.equal(p.verifyWebhook(body, {}), false); assert.equal(checkSignature(platform, '', body, good), false);
  assert.deepEqual(p.parseWebhook(body), { event: 'charge.success', reference: 'r1', amountKobo: 5000, state: 'success', providerEventId: 'charge.success:9' });
  assert.equal(p.parseWebhook(Buffer.from('nope')), null);
});
test('no cash-out: the provider interface has no payout or transfer, and no route can pay money out', async () => {
  const s = mk(); for (const pr of [s.app.payments.provider, monipayProvider({ platform, secretKey: 'pri_test_k' })]) for (const k of Object.keys(pr)) assert.ok(!/payout|transfer|withdraw|disburse/i.test(k), k);
  const { dispatch } = await import('../server/core/routes.js'); void dispatch;
  const src = (await import('node:fs')).readFileSync(new URL('../server/core/payments/routes.js', import.meta.url), 'utf8'); assert.ok(!/payout|withdraw|disburse/i.test(src));
});

// ---------------------------------------------------------------- the real HTTP path (raw body reaches the signature check)
test('http: a signed webhook posted over real HTTP credits once; a body altered in flight is rejected', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const p = await buy(s, u); const pr = s.app.payments.provider; pr.complete(p.ref); const wh = pr.webhook(p.ref);
  await new Promise(r => s.server.listen(0, '127.0.0.1', r)); const port = s.server.address().port;
  try {
    const post = (body, headers) => fetch(`http://127.0.0.1:${port}/api/payments/webhook`, { method: 'POST', body, headers: { 'content-type': 'application/json', ...headers } });
    assert.equal((await post(wh.body.toString().replace('"id"', '"id" '), wh.headers)).status, 401); // whitespace added: bytes differ
    assert.equal(cash(s, u), 0);
    const r = await post(wh.body, wh.headers); assert.equal(r.status, 200); assert.equal((await r.json()).outcome, 'paid'); assert.equal(cash(s, u), 5000);
    assert.equal((await post(wh.body, wh.headers)).status, 200); assert.equal(cash(s, u), 5000);
  } finally { await s.close(); }
});

// ---------------------------------------------------------------- the sweeper
test('sweep: a payment whose webhook never came is found by the background job; stale ones expire', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const p = await buy(s, u); s.app.payments.provider.complete(p.ref);
  assert.equal(await pay.tickPayments(s.app), 0); // too young to sweep
  s.app.clock.advance(3 * 60000); await pay.tickPayments(s.app); assert.equal(cash(s, u), 5000);
  const p2 = await buy(s, u, 'p1000'); s.app.clock.advance(2 * HOUR); await pay.tickPayments(s.app);
  assert.equal(s.db.prepare('SELECT status FROM payment_intents WHERE ref=?').get(p2.ref).status, 'expired');
});

// ---------------------------------------------------------------- reconciliation
test('reconcile: a clean book is ok and totals add up', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const p = await buy(s, u, 'p1000'); await pay_(s, p.ref, { fees: 1075 });
  const r = await pay.reconcile(s.app, { askProvider: true }); assert.equal(r.ok, true, JSON.stringify(r.issues));
  assert.deepEqual([r.totals.paid, r.totals.grossKobo, r.totals.vatKobo, r.totals.netKobo, r.totals.providerFeeKobo, r.gameMoneySold], [1, 107500, 7500, 100000, 1075, 1000]);
  assert.equal(r.totals.merchantNetKobo, 107500 - 7500 - 1075);
  assert.equal((await ok(s, 'GET', '/api/admin/payments/reconcile', { admin: true })).ok, true); assert.equal((await ok(s, 'GET', '/api/admin/payments', { admin: true })).rows.length, 1);
  assert.equal((await call(s, 'GET', '/api/admin/payments/reconcile')).status, 401);
});
test('reconcile: catches a payment with no credit, a credit with no payment, a supply mismatch and a provider that disagrees', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const p = await buy(s, u, 'p1000'); await pay_(s, p.ref);
  s.db.prepare("UPDATE payment_intents SET status='paid', paid_at=1 WHERE ref=?").run((await buy(s, u, 'p1000')).ref); // paid with no ledger credit
  const r = await pay.reconcile(s.app); assert.equal(r.ok, false); const kinds = r.issues.map(i => i.kind);
  assert.ok(kinds.includes('paid_without_credit')); assert.ok(kinds.includes('supply_mismatch'));
  const r2 = await pay.reconcile(s.app, { askProvider: true }); assert.ok(r2.issues.some(i => i.kind === 'provider_does_not_confirm'));
  s.db.prepare("UPDATE payment_intents SET status='failed' WHERE ref=?").run(p.ref); assert.ok((await pay.reconcile(s.app)).issues.some(i => i.kind === 'credited_but_not_paid'));
});
test('reconcile: stale pending payments and fee differences are reported (fee differences are information only)', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const a = await buy(s, u, 'p1000'); await pay_(s, a.ref, { fees: 5 });
  const b = await buy(s, u, 'p1000'); s.app.clock.advance(5 * HOUR);
  const r = await pay.reconcile(s.app); const kinds = r.issues.map(i => i.kind); assert.ok(kinds.includes('fee_differs_from_estimate')); assert.ok(kinds.includes('stale_pending')); assert.equal(r.ok, false);
  s.db.prepare("UPDATE payment_intents SET status='expired' WHERE ref=?").run(b.ref); assert.equal((await pay.reconcile(s.app)).ok, true);
});

// ---------------------------------------------------------------- ad checkout
test('ads: with payment required, an approved ad waits for the money and then goes on a board', async () => {
  const s = mk({}, { adsRequirePayment: true }); const key = await newAdvertiser(s);
  const sub = await submitAd(s, key); assert.equal(sub.status, 200); const id = sub.json.campaign.id; assert.equal(s.db.prepare('SELECT payment_status FROM ad_campaigns WHERE id=?').get(id).payment_status, 'awaiting_payment');
  await ok(s, 'POST', `/api/admin/campaigns/${id}/decision`, { admin: true, body: { decision: 'approve' } });
  assert.equal(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status, 'approved'); // not scheduled: unpaid
  const pr = await ok(s, 'POST', `/api/advertiser/campaigns/${id}/pay`, { headers: { 'x-advertiser-key': key }, body: { email: 'ads@example.com' } });
  const camp = s.db.prepare('SELECT price_net, price_vat, price_total FROM ad_campaigns WHERE id=?').get(id); assert.equal(pr.payment.total, camp.price_total); assert.equal(pr.payment.vat, camp.price_vat);
  assert.equal((await ok(s, 'POST', `/api/advertiser/campaigns/${id}/pay`, { headers: { 'x-advertiser-key': key }, body: {} })).payment.ref, pr.payment.ref); // same open payment, not a second one
  assert.equal(tickAds(s.app), 0); assert.equal(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status, 'approved');
  await pay_(s, pr.payment.ref); assert.equal(s.db.prepare('SELECT payment_status FROM ad_campaigns WHERE id=?').get(id).payment_status, 'paid');
  tickAds(s.app); assert.ok(['scheduled', 'live'].includes(s.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id).status));
  assert.equal((await ok(s, 'POST', `/api/advertiser/campaigns/${id}/pay`, { headers: { 'x-advertiser-key': key }, body: {} }).catch(e => e.message)).includes?.('ALREADY_PAID'), true);
  const rec = await pay.reconcile(s.app); assert.equal(rec.ok, true, JSON.stringify(rec.issues)); inv(s);
});
test('ads: someone else cannot pay for or see my campaign; a rejected paid ad is refunded automatically', async () => {
  const s = mk({}, { adsRequirePayment: true }); const key = await newAdvertiser(s); const id = (await submitAd(s, key)).json.campaign.id; const other = await ok(s, 'POST', '/api/advertiser/register', { body: { email: 'o@example.com', brand: 'Other Co' } });
  assert.equal((await call(s, 'POST', `/api/advertiser/campaigns/${id}/pay`, { headers: { 'x-advertiser-key': other.key }, body: {} })).status, 404);
  assert.equal((await call(s, 'POST', `/api/advertiser/campaigns/${id}/pay`, { body: {} })).status, 401);
  const pr = await ok(s, 'POST', `/api/advertiser/campaigns/${id}/pay`, { headers: { 'x-advertiser-key': key }, body: {} }); await pay_(s, pr.payment.ref);
  await ok(s, 'POST', `/api/admin/campaigns/${id}/decision`, { admin: true, body: { decision: 'reject', reason: 'not allowed' } });
  const it = s.db.prepare('SELECT status, refunded_kobo, total_kobo FROM payment_intents WHERE ref=?').get(pr.payment.ref); assert.equal(it.status, 'refunded'); assert.equal(it.refunded_kobo, it.total_kobo);
  assert.equal(s.db.prepare('SELECT payment_status FROM ad_campaigns WHERE id=?').get(id).payment_status, 'refunded');
  assert.equal(await pay.processRefunds(s.app), 1); assert.equal((await pay.reconcile(s.app)).ok, true);
});
test('ads: an unpaid ad that is rejected closes its open payment; the default (test mode) flow is unchanged', async () => {
  const s = mk({}, { adsRequirePayment: true }); const key = await newAdvertiser(s); const id = (await submitAd(s, key)).json.campaign.id;
  const pr = await ok(s, 'POST', `/api/advertiser/campaigns/${id}/pay`, { headers: { 'x-advertiser-key': key }, body: {} });
  await ok(s, 'POST', `/api/admin/campaigns/${id}/decision`, { admin: true, body: { decision: 'reject', reason: 'no' } });
  assert.equal(s.db.prepare('SELECT status FROM payment_intents WHERE ref=?').get(pr.payment.ref).status, 'expired');
  const t = mk(); const k2 = await newAdvertiser(t); const id2 = (await submitAd(t, k2)).json.campaign.id; assert.equal(t.db.prepare('SELECT payment_status FROM ad_campaigns WHERE id=?').get(id2).payment_status, 'test_mode_no_payment');
  await ok(t, 'POST', `/api/admin/campaigns/${id2}/decision`, { admin: true, body: { decision: 'approve' } }); assert.equal(t.db.prepare('SELECT status FROM ad_campaigns WHERE id=?').get(id2).status, 'scheduled');
});

// ---------------------------------------------------------------- mock-only helper route, and switching payments off
test('mock helper route: plays the customer, only exists for the mock provider', async () => {
  const s = mk(); const u = mkUser(s, { cash: 0 }); const p = await buy(s, u, 'p1000');
  assert.equal((await call(s, 'POST', '/api/payments/mock/pay', { body: { ref: p.ref } })).status, 401);
  const r = await ok(s, 'POST', '/api/payments/mock/pay', { uid: u, body: { ref: p.ref } }); assert.equal(r.payment.status, 'paid'); assert.equal(r.user.cash, 1000);
  const real = mk({ paymentsProvider: Object.assign(mockProvider({ platform }), { id: 'monipay' }) }); assert.equal((await call(real, 'POST', '/api/payments/mock/pay', { uid: mkUser(real), body: { ref: 'x' } })).status, 404);
});
test('payments off: routes answer 503 and the rest of the game is untouched', async () => {
  const s = makeServer({ payments: false }); assert.equal((await ok(s, 'GET', '/api/payments/config')).enabled, false);
  assert.equal((await call(s, 'POST', '/api/payments/topup', { uid: mkUser(s), body: { pack: 'p1000', email: EMAIL } })).status, 503);
  assert.equal((await call(s, 'GET', '/api/admin/payments/reconcile', { admin: true })).status, 503);
});
test('mock helper route: only the owner of a payment can play the customer (player or advertiser)', async () => {
  const s = mk({}, { adsRequirePayment: true }); const a = mkUser(s, { cash: 0 }); const b = mkUser(s); const p = await buy(s, a, 'p1000');
  assert.equal((await call(s, 'POST', '/api/payments/mock/pay', { uid: b, body: { ref: p.ref } })).status, 404);
  const key = await newAdvertiser(s); const id = (await submitAd(s, key)).json.campaign.id; const other = (await ok(s, 'POST', '/api/advertiser/register', { body: { email: 'o@example.com', brand: 'Other Co' } })).key;
  const ap = await ok(s, 'POST', `/api/advertiser/campaigns/${id}/pay`, { headers: { 'x-advertiser-key': key }, body: {} });
  assert.equal((await call(s, 'POST', '/api/payments/mock/pay', { headers: { 'x-advertiser-key': other }, body: { ref: ap.payment.ref } })).status, 404);
  assert.equal((await call(s, 'POST', '/api/payments/mock/pay', { body: { ref: ap.payment.ref } })).status, 401);
  assert.equal((await ok(s, 'POST', '/api/payments/mock/pay', { headers: { 'x-advertiser-key': key }, body: { ref: ap.payment.ref } })).payment.status, 'paid');
});
