// HTTP routes for payments. Registered from routes.js with its `route` helper. Real-money TEST MODE only.
import { bad } from '../util.js';
import * as pay from './index.js';
import * as ads from '../ads.js';
import { profile } from '../economy.js';

export function paymentRoutes(route) {
  const needKey = (c) => { const a = ads.advertiserByKey(c.app, c.headers['x-advertiser-key'] || c.query.key); if (!a) bad('NEED_KEY', 'Advertiser access key required.', 401); return a; };
  route('GET', '/api/payments/config', (c) => pay.publicConfig(c.app));
  route('POST', '/api/payments/topup', { auth: 'user' }, async (c) => ({ ok: true, payment: await pay.startTopup(c.app, c.uid, { packId: c.body.pack, email: c.body.email, idemKey: c.body.idem }) }));
  route('GET', '/api/payments/status', { auth: 'user' }, async (c) => { const payment = await pay.myPayment(c.app, c.uid, c.query.ref); return { ok: true, payment, user: profile(c.app, c.uid) }; });
  // the webhook is called by the provider, not a browser: no session. Raw bytes are needed for the signature (see createServer.js).
  route('POST', '/api/payments/webhook', async (c) => {
    if (!c.app.limiter.hit(`pwh:${c.ip}`, c.app.payments?.cfg.webhookPerMinPerIp ?? 300, 60000, c.app.clock.now())) bad('RATE_LIMIT', 'Too many webhook calls.', 429);
    return pay.handleWebhook(c.app, c.raw, c.headers);
  });
  // advertisers
  route('POST', '/api/advertiser/campaigns/:id/pay', { rate: 'auth' }, async (c) => { const a = needKey(c); return { ok: true, payment: await pay.startCampaignPayment(c.app, a.id, Number(c.params.id), { email: c.body.email }) }; });
  // test-mode helper: only the MOCK provider has it. It plays the part of the customer paying (or failing) at the gateway, then delivers the signed webhook.
  route('POST', '/api/payments/mock/pay', async (c) => {
    const pr = c.app.payments?.provider; if (!pr || pr.id !== 'mock') bad('NOT_FOUND', 'Not found', 404);
    const ref = String(c.body.ref || ''); const it = c.app.db.prepare('SELECT * FROM payment_intents WHERE ref=?').get(ref); if (!it) bad('NO_PAYMENT', 'Payment not found.', 404);
    if (it.purpose === 'topup') { if (!c.uid) bad('LOGIN_REQUIRED', 'Please log in.', 401); if (it.user_id !== c.uid) bad('NO_PAYMENT', 'Payment not found.', 404); }
    else { const a = needKey(c); if (a.id !== it.advertiser_id) bad('NO_PAYMENT', 'Payment not found.', 404); }
    if (c.body.fail) pr.fail(ref); else pr.complete(ref, { fees: it.fee_est_kobo });
    const wh = pr.webhook(ref, c.body.fail ? 'charge.failed' : 'charge.success');
    const out = await pay.handleWebhook(c.app, wh.body, wh.headers);
    return { ok: true, outcome: out.outcome, payment: pay.publicView ? pay.publicView(c.app, ref) : undefined, user: c.uid ? profile(c.app, c.uid) : undefined };
  });
  // admin
  route('GET', '/api/admin/payments', { auth: 'admin' }, (c) => ({ rows: pay.adminList(c.app, { status: c.query.status || undefined }), testMode: true }));
  route('GET', '/api/admin/payments/reconcile', { auth: 'admin' }, async (c) => pay.reconcile(c.app, { askProvider: c.query.provider === '1', sinceMs: Number(c.query.since) || 0 }));
  route('POST', '/api/admin/payments/:ref/refund', { auth: 'admin' }, (c) => { const r = pay.requestRefund(c.app, c.params.ref, { amountKobo: c.body.amountKobo == null ? undefined : Number(c.body.amountKobo), reason: c.body.reason || 'admin refund', by: 'admin', idemKey: c.body.idem ? `admin:${c.params.ref}:${c.body.idem}` : null }); return { ok: true, ...r }; });
  route('POST', '/api/admin/payments/refunds/:id/settle', { auth: 'admin' }, (c) => ({ ok: true, refund: pay.settleRefund(c.app, Number(c.params.id), c.body.providerRefundId) }));
}
