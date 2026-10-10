// Real-money payments (TEST MODE ONLY in this build). The game ledger stays the single source of truth for game money; this module
// only (1) opens a payment with a provider, (2) learns the outcome (webhook trigger + server-side verify, never the browser redirect),
// (3) credits game money ONCE through the ledger, (4) refunds, (5) reconciles. In-game money has no cash-out: nothing here pays out.
// All DB work is synchronous (and atomic); every provider network call is async and happens OUTSIDE any DB transaction.
import { bad, GameError } from '../util.js';
import { move, post, balanceOf, cashId } from '../ledger.js';
import { notify } from '../economy.js';
import { priceKobo, proportion, toKobo, toNgn } from './fees.js';
import { PAYMENTS } from '../../config/payments.js';

export const PAID_TOPUP = 'sys:paid_topup';       // game naira sold for real money; its balance is minus the game naira in circulation that was bought
export { PAYMENTS_SQL } from './sql.js';
const q = (app) => app.db;
const OPEN = ['created', 'pending'];

export function createPayments(app, { provider, cfg = PAYMENTS }) {
  app.db.prepare('INSERT OR IGNORE INTO accounts(id,kind,user_id,balance,allow_negative) VALUES (?,?,NULL,0,1)').run(PAID_TOPUP, 'system');
  const p = { provider, cfg, app };
  app.payments = p;
  app.onCampaignRejected = (id) => onCampaignRejected(app, id);
  return p;
}
const need = (app) => { if (!app.payments) bad('PAYMENTS_OFF', 'Payments are not available here.', 503); return app.payments; };
const row = (app, ref) => q(app).prepare('SELECT * FROM payment_intents WHERE ref=?').get(ref);
const logEvent = (app, e) => q(app).prepare('INSERT INTO payment_events(ref,source,event,signature_ok,provider_event_id,payload_sha256,outcome,detail,created_at) VALUES (?,?,?,?,?,?,?,?,?)')
  .run(e.ref ?? null, e.source, e.event ?? null, e.sig == null ? null : e.sig ? 1 : 0, e.pid ?? null, e.sha ?? null, e.outcome, e.detail ? String(e.detail).slice(0, 300) : null, app.clock.now());
const newRef = (app, tag) => `NA${tag}-${app.clock.now().toString(36)}-${app.platform.randomHex(5)}`;

// ---- public views -----------------------------------------------------------------------------------------------------------------
export function packs(app) {
  const { cfg } = need(app);
  return cfg.packs.map(pk => { const pr = priceKobo(toKobo(pk.priceNgn), cfg); return { id: pk.id, credit: pk.credit, net: toNgn(pr.netKobo), vat: toNgn(pr.vatKobo), total: toNgn(pr.totalKobo) }; });
}
export function publicConfig(app) {
  if (!app.payments) return { enabled: false };
  const { cfg, provider } = app.payments;
  return { enabled: true, provider: provider.id, testMode: true, vatRate: cfg.vatRate, currency: cfg.currency, packs: packs(app), note: 'TEST MODE: no real money moves.' };
}
const view = (r) => r && ({ ref: r.ref, purpose: r.purpose, status: r.status, net: toNgn(r.net_kobo), vat: toNgn(r.vat_kobo), total: toNgn(r.total_kobo), credit: r.credit, authorizationUrl: r.authorization_url, paidAt: r.paid_at, refunded: toNgn(r.refunded_kobo), createdAt: r.created_at, testMode: true });

// ---- opening a payment --------------------------------------------------------------------------------------------------------------
const EMAIL = /^[^@\s]{1,64}@[^@\s]{1,200}\.[^@\s]{2,}$/;
function openIntent(app, { purpose, uid = null, advertiserId = null, campaignId = null, netKobo, vatKobo, email, credit = 0, idemKey = null, tag }) {
  const { cfg, provider } = need(app); const now = app.clock.now();
  if (idemKey) { const ex = q(app).prepare('SELECT * FROM payment_intents WHERE idem_key=?').get(idemKey); if (ex) return { intent: ex, duplicate: true }; }
  const pr = priceKobo(netKobo, { vatRate: cfg.vatRate, fee: cfg.fee });
  const total = vatKobo != null ? netKobo + vatKobo : pr.totalKobo; const vat = total - netKobo;
  if (total < cfg.minChargeKobo) bad('TOO_SMALL', 'That is below the minimum payment.');
  const fee = priceKobo(netKobo, { vatRate: vat / netKobo, fee: cfg.fee }).feeEstKobo;
  const ref = newRef(app, tag);
  q(app).prepare(`INSERT INTO payment_intents(ref,idem_key,purpose,user_id,advertiser_id,campaign_id,provider,net_kobo,vat_kobo,total_kobo,fee_est_kobo,credit,email,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,'created',?,?)`)
    .run(ref, idemKey, purpose, uid, advertiserId, campaignId, provider.id, netKobo, vat, total, fee, credit, email, now, now);
  return { intent: row(app, ref), duplicate: false };
}
async function openWithProvider(app, intent) {
  const { provider, cfg } = need(app); const now = app.clock.now();
  try {
    const r = await provider.initialize({ reference: intent.ref, amountKobo: intent.total_kobo, email: intent.email, callbackUrl: `${cfg.publicUrl}/play?pay=${encodeURIComponent(intent.ref)}`, metadata: { purpose: intent.purpose, intent: intent.ref } });
    q(app).prepare("UPDATE payment_intents SET status='pending', authorization_url=?, updated_at=? WHERE ref=? AND status='created'").run(r.authorizationUrl, now, intent.ref);
  } catch (e) {
    q(app).prepare("UPDATE payment_intents SET status='failed', note=?, updated_at=? WHERE ref=? AND status='created'").run('could not open with provider', now, intent.ref);
    logEvent(app, { ref: intent.ref, source: 'initialize', outcome: 'provider_error', detail: e.message });
    throw e;
  }
  return row(app, intent.ref);
}
const spentToday = (app, uid) => q(app).prepare("SELECT COALESCE(SUM(total_kobo),0) s FROM payment_intents WHERE user_id=? AND created_at>? AND status IN ('created','pending','paid','partially_refunded')").get(uid, app.clock.now() - 86400000).s;

/** Player buys a pack of game money. Returns where to send them to pay. */
export async function startTopup(app, uid, { packId, email, idemKey } = {}) {
  const { cfg } = need(app);
  const u = q(app).prepare('SELECT id, is_guest, is_bot, age_confirmed_at FROM users WHERE id=?').get(uid);
  if (!u || u.is_bot) bad('NO_USER', 'No such player.', 404);
  if (u.is_guest) bad('GUEST_CANNOT_PAY', 'Make a free account first. Guests cannot buy ₦.', 403);
  if (!u.age_confirmed_at) bad('AGE_REQUIRED', 'Confirm you are 18 or over first.', 403);
  const gate = app.ageGate?.(app, uid); if (gate) bad(gate.code, gate.message, 403);
  const pk = cfg.packs.find(x => x.id === packId); if (!pk) bad('BAD_PACK', 'Pick one of the packs.');
  const mail = String(email || '').trim().toLowerCase(); if (!EMAIL.test(mail)) bad('BAD_EMAIL', 'Enter a valid email for your receipt.');
  const netKobo = toKobo(pk.priceNgn); const pr = priceKobo(netKobo, cfg);
  if (spentToday(app, uid) + pr.totalKobo > cfg.maxPerUserPerDayKobo) bad('DAILY_LIMIT', 'Daily purchase limit reached.', 429);
  const open = q(app).prepare("SELECT COUNT(*) n FROM payment_intents WHERE user_id=? AND status IN ('created','pending')").get(uid).n;
  if (open >= 3) bad('TOO_MANY_OPEN', 'Finish or wait out your open payments first.', 429);
  const { intent, duplicate } = openIntent(app, { purpose: 'topup', uid, netKobo, email: mail, credit: pk.credit, idemKey: idemKey ? `topup:${uid}:${idemKey}` : null, tag: 'T' });
  const out = duplicate || intent.status !== 'created' ? intent : await openWithProvider(app, intent);
  return view(out);
}

/** Advertiser pays for an approved-or-pending campaign. Auth is the advertiser's access key (checked by the route). */
export async function startCampaignPayment(app, advertiserId, campaignId, { email } = {}) {
  need(app);
  const c = q(app).prepare('SELECT c.*, a.email adv_email FROM ad_campaigns c JOIN advertisers a ON a.id=c.advertiser_id WHERE c.id=?').get(campaignId);
  if (!c || c.advertiser_id !== advertiserId) bad('NO_CAMPAIGN', 'Campaign not found.', 404);
  if (c.payment_status === 'paid') bad('ALREADY_PAID', 'That campaign is already paid.', 409);
  if (c.status === 'rejected' || c.status === 'completed') bad('NOT_PAYABLE', 'That campaign can no longer be paid.', 409);
  const mail = String(email || c.adv_email || '').trim().toLowerCase(); if (!EMAIL.test(mail)) bad('BAD_EMAIL', 'Enter a valid email for your receipt.');
  const live = q(app).prepare("SELECT * FROM payment_intents WHERE campaign_id=? AND status='pending'").get(campaignId); if (live) return view(live);
  const { intent } = openIntent(app, { purpose: 'ad_campaign', advertiserId, campaignId, netKobo: toKobo(c.price_net), vatKobo: toKobo(c.price_vat), email: mail, tag: 'A' });
  q(app).prepare("UPDATE ad_campaigns SET payment_status='awaiting_payment' WHERE id=? AND payment_status IN ('awaiting_payment','test_mode_no_payment')").run(campaignId);
  return view(intent.status === 'created' ? await openWithProvider(app, intent) : intent);
}

// ---- learning the outcome -----------------------------------------------------------------------------------------------------------
/** Apply a provider answer to an intent. Sync, atomic, idempotent: the ledger credit is keyed by the intent and a status check guards the change. */
export function applyResult(app, ref, v, source) {
  need(app); const now = app.clock.now(); const it = row(app, ref); if (!it) return { outcome: 'unknown_reference' };
  if (!v.found || v.state === 'pending') return { outcome: it.status === 'paid' ? 'already_paid' : 'still_pending' };
  if (v.live) { q(app).prepare("UPDATE payment_intents SET status='review', note=?, updated_at=? WHERE ref=? AND status IN ('created','pending','failed','expired')").run('provider says this is a LIVE transaction; this build is test mode only', now, ref); logEvent(app, { ref, source, outcome: 'live_in_test_mode' }); return { outcome: 'review' }; }
  if (v.state === 'failed') { const r = q(app).prepare("UPDATE payment_intents SET status='failed', provider_txn_id=COALESCE(?,provider_txn_id), updated_at=? WHERE ref=? AND status IN ('created','pending')").run(v.providerTxnId ?? null, now, ref); return { outcome: r.changes ? 'failed' : 'ignored' }; }
  // success: the money MUST match what we asked for, to the kobo
  if (v.amountKobo != null && v.amountKobo !== it.total_kobo) {
    q(app).prepare("UPDATE payment_intents SET status='review', note=?, provider_txn_id=?, updated_at=? WHERE ref=? AND status IN ('created','pending','failed','expired')").run(`amount mismatch: asked ${it.total_kobo}, provider says ${v.amountKobo}`, v.providerTxnId ?? null, now, ref);
    logEvent(app, { ref, source, outcome: 'amount_mismatch', detail: `${it.total_kobo} vs ${v.amountKobo}` }); return { outcome: 'review' };
  }
  return app.db.transaction(() => {
    const cur = row(app, ref);
    const ch = q(app).prepare("UPDATE payment_intents SET status='paid', paid_at=?, provider_txn_id=?, provider_fee_kobo=?, updated_at=? WHERE ref=? AND status IN ('created','pending','failed','expired')").run(now, v.providerTxnId ?? null, v.feesKobo ?? null, now, ref);
    if (ch.changes !== 1) return { outcome: cur.status === 'paid' ? 'already_paid' : 'ignored' };
    if (cur.purpose === 'topup') {
      const r = move(app, { from: PAID_TOPUP, to: cashId(cur.user_id), amount: cur.credit, reason: 'topup_paid', ref, userId: cur.user_id, idemKey: `pay:${ref}` });
      q(app).prepare('UPDATE payment_intents SET ledger_tx_id=? WHERE ref=?').run(r.txId, ref);
      notify(app, cur.user_id, 'payment', `Payment received (TEST MODE): +₦${cur.credit.toLocaleString('en-NG')}.`);
    } else if (cur.purpose === 'ad_campaign') {
      q(app).prepare("UPDATE ad_campaigns SET payment_status='paid', flags=REPLACE(COALESCE(flags,'[]'),'\"waiting_for_payment\"','\"paid\"') WHERE id=?").run(cur.campaign_id);
      const cs = q(app).prepare('SELECT status FROM ad_campaigns WHERE id=?').get(cur.campaign_id);
      if (cs) q(app).prepare('INSERT INTO ad_transitions(campaign_id,from_status,to_status,actor,note,created_at) VALUES (?,?,?,?,?,?)').run(cur.campaign_id, cs.status, cs.status, 'payments', `paid ${ref} (TEST MODE)`, now);
    }
    return { outcome: 'paid' };
  })();
}
/** Ask the provider (server to server) and apply the answer. THE source of truth: webhooks and redirects only trigger this. */
export async function confirmPayment(app, ref, source = 'verify') {
  const { provider, cfg } = need(app); const it = row(app, ref); if (!it) bad('NO_PAYMENT', 'Payment not found.', 404);
  if (it.status === 'paid' || it.status === 'refunded' || it.status === 'partially_refunded') return view(it);
  const v = await provider.verify(ref);
  const res = applyResult(app, ref, v, source); logEvent(app, { ref, source, outcome: res.outcome });
  if (res.outcome === 'still_pending' && it.status === 'pending' && app.clock.now() - it.created_at > cfg.pendingExpireMs) q(app).prepare("UPDATE payment_intents SET status='expired', updated_at=? WHERE ref=? AND status='pending'").run(app.clock.now(), ref);
  return view(row(app, ref));
}
export const publicView = (app, ref) => view(row(app, ref));
export async function myPayment(app, uid, ref) {
  const it = row(app, String(ref || '')); if (!it || it.user_id !== uid) bad('NO_PAYMENT', 'Payment not found.', 404);
  return confirmPayment(app, ref, 'return');
}

/** POST /api/payments/webhook. Signature on the RAW bytes first, then it is only a trigger for a server-side verify. */
export async function handleWebhook(app, raw, headers) {
  const { provider } = need(app); const now = app.clock.now();
  if (!Buffer.isBuffer(raw) || !raw.length) bad('BAD_REQUEST', 'Empty webhook.', 400);
  const sha = app.platform.sha256(raw);
  if (!provider.verifyWebhook(raw, headers)) { logEvent(app, { source: 'webhook', sig: false, outcome: 'bad_signature', sha: null }); bad('BAD_SIGNATURE', 'Signature check failed.', 401); }
  const ev = provider.parseWebhook(raw); if (!ev) { logEvent(app, { source: 'webhook', sig: true, outcome: 'unreadable' }); bad('BAD_REQUEST', 'Unreadable event.', 400); }
  const seen = q(app).prepare('SELECT outcome FROM payment_events WHERE payload_sha256=?').get(sha);
  if (seen && seen.outcome !== 'retry') return { ok: true, duplicate: true };
  const meta = { ref: ev.reference, source: 'webhook', event: ev.event, sig: true, pid: ev.providerEventId };
  if (!ev.reference || !row(app, ev.reference)) { logEvent(app, { ...meta, sha, outcome: 'unknown_reference' }); return { ok: true, ignored: true }; }
  if (ev.state === 'other') { logEvent(app, { ...meta, sha, outcome: 'ignored_event' }); return { ok: true, ignored: true }; }
  try {
    const v = await provider.verify(ev.reference); const res = applyResult(app, ev.reference, v, 'webhook');
    if (seen) q(app).prepare("UPDATE payment_events SET outcome=?, created_at=? WHERE payload_sha256=?").run(res.outcome, now, sha); else logEvent(app, { ...meta, sha, outcome: res.outcome });
    return { ok: true, outcome: res.outcome };
  } catch (e) {
    if (!seen) logEvent(app, { ...meta, sha, outcome: 'retry', detail: e.message });
    throw new GameError('RETRY_LATER', 'Could not confirm yet, please retry.', 503);
  }
}

// ---- refunds ------------------------------------------------------------------------------------------------------------------------------
/** Record a refund and reverse the game-money credit in ONE transaction. The cash refund itself is sent by processRefunds (or settled by hand). */
export function requestRefund(app, ref, { amountKobo, reason = '', by = 'admin', idemKey = null } = {}) {
  need(app); const now = app.clock.now();
  return app.db.transaction(() => {
    if (idemKey) { const ex = q(app).prepare('SELECT * FROM payment_refunds WHERE idem_key=?').get(idemKey); if (ex) return { refund: ex, duplicate: true }; }
    const it = row(app, ref); if (!it) bad('NO_PAYMENT', 'Payment not found.', 404);
    if (!['paid', 'partially_refunded'].includes(it.status)) bad('NOT_REFUNDABLE', `A ${it.status} payment cannot be refunded.`, 409);
    const left = it.total_kobo - it.refunded_kobo; const amt = amountKobo == null ? left : amountKobo;
    if (!Number.isInteger(amt) || amt <= 0 || amt > left) bad('BAD_AMOUNT', `Refund must be between 1 and ${left} kobo.`);
    let reversed = 0;
    if (it.purpose === 'topup') {
      reversed = amt === left ? it.credit - it.credit_reversed : proportion(it.credit, amt, it.total_kobo);
      const cash = balanceOf(app.db, cashId(it.user_id));
      if (reversed > cash) bad('PLAYER_SPENT_CREDIT', 'The player has already spent that game money, so only part can be refunded.', 409, { maxRefundKobo: it.credit ? Math.floor(it.total_kobo * cash / it.credit) : 0 });
    }
    const r = q(app).prepare('INSERT INTO payment_refunds(intent_ref,idem_key,amount_kobo,credit_reversed,reason,requested_by,status,created_at) VALUES (?,?,?,?,?,?,?,?)').run(ref, idemKey, amt, reversed, String(reason).slice(0, 200), by, 'requested', now);
    const id = Number(r.lastInsertRowid);
    if (reversed > 0) move(app, { from: cashId(it.user_id), to: PAID_TOPUP, amount: reversed, reason: 'topup_refund', ref: `${ref}#${id}`, userId: it.user_id, idemKey: `refund:${id}` });
    const full = amt === left;
    q(app).prepare('UPDATE payment_intents SET refunded_kobo=refunded_kobo+?, credit_reversed=credit_reversed+?, status=?, updated_at=? WHERE ref=?').run(amt, reversed, full ? 'refunded' : 'partially_refunded', now, ref);
    if (it.purpose === 'ad_campaign' && full) q(app).prepare("UPDATE ad_campaigns SET payment_status='refunded' WHERE id=?").run(it.campaign_id);
    if (it.purpose === 'topup') notify(app, it.user_id, 'payment', `Refund recorded (TEST MODE): -₦${reversed.toLocaleString('en-NG')} game money.`);
    return { refund: q(app).prepare('SELECT * FROM payment_refunds WHERE id=?').get(id), duplicate: false };
  })();
}
/** Send recorded refunds to the provider. Retries on error; stops after cfg.refundMaxAttempts and flags it. */
export async function processRefunds(app) {
  const { provider, cfg } = need(app); let done = 0;
  for (const r of q(app).prepare("SELECT * FROM payment_refunds WHERE status='requested' ORDER BY id LIMIT 20").all()) {
    try {
      const out = await provider.refund({ reference: r.intent_ref, amountKobo: r.amount_kobo, reason: r.reason, refundKey: `rf${r.id}` });
      const st = out.state === 'processed' ? 'processed' : 'pending_manual';
      q(app).prepare('UPDATE payment_refunds SET status=?, provider_refund_id=?, settled_at=?, attempts=attempts+1 WHERE id=? AND status=?').run(st, out.providerRefundId ?? null, st === 'processed' ? app.clock.now() : null, r.id, 'requested'); done++;
    } catch (e) {
      const attempts = r.attempts + 1; q(app).prepare('UPDATE payment_refunds SET attempts=?, last_error=?, status=? WHERE id=?').run(attempts, String(e.message).slice(0, 200), attempts >= cfg.refundMaxAttempts ? 'failed' : 'requested', r.id);
    }
  }
  return done;
}
/** A human sent the cash refund from the Monipay dashboard (the API has no documented refund call): mark it settled. */
export function settleRefund(app, id, providerRefundId = null) {
  const r = q(app).prepare("UPDATE payment_refunds SET status='processed', provider_refund_id=?, settled_at=? WHERE id=? AND status IN ('pending_manual','failed','requested')").run(providerRefundId ? String(providerRefundId).slice(0, 80) : null, app.clock.now(), id);
  if (r.changes !== 1) bad('NOT_SETTLEABLE', 'That refund is not waiting to be settled.', 409); return q(app).prepare('SELECT * FROM payment_refunds WHERE id=?').get(id);
}
/** An ad that is rejected AFTER it was paid is refunded in full automatically (the rule: you only pay for ads we run). Called from ads.transition. */
export function onCampaignRejected(app, campaignId) {
  if (!app.payments) return;
  const it = q(app).prepare("SELECT ref FROM payment_intents WHERE campaign_id=? AND status='paid'").get(campaignId);
  if (it) requestRefund(app, it.ref, { reason: 'ad rejected after payment', by: 'system', idemKey: `adreject:${campaignId}` });
  q(app).prepare("UPDATE payment_intents SET status='expired', updated_at=? WHERE campaign_id=? AND status IN ('created','pending')").run(app.clock.now(), campaignId);
}

// ---- background job ------------------------------------------------------------------------------------------------------------------------
/** Called every few seconds by the server: ask about pending payments whose webhook never came, expire stale ones, send recorded refunds. */
export async function tickPayments(app) {
  if (!app.payments) return 0; const { cfg } = app.payments; const now = app.clock.now(); let n = 0;
  for (const it of q(app).prepare("SELECT ref FROM payment_intents WHERE status='pending' AND updated_at<? ORDER BY id LIMIT 20").all(now - cfg.sweepAfterMs)) {
    try { await confirmPayment(app, it.ref, 'sweep'); n++; } catch (e) { logEvent(app, { ref: it.ref, source: 'sweep', outcome: 'error', detail: e.message }); }
  }
  return n + await processRefunds(app);
}

// ---- admin views + reconciliation ------------------------------------------------------------------------------------------------------------
export function adminList(app, { status, limit = 100 } = {}) {
  const rows = status ? q(app).prepare('SELECT * FROM payment_intents WHERE status=? ORDER BY id DESC LIMIT ?').all(status, limit) : q(app).prepare('SELECT * FROM payment_intents ORDER BY id DESC LIMIT ?').all(limit);
  return rows.map(r => ({ ...view(r), id: r.id, userId: r.user_id, campaignId: r.campaign_id, provider: r.provider, feeEstimate: toNgn(r.fee_est_kobo), providerFee: r.provider_fee_kobo == null ? null : toNgn(r.provider_fee_kobo), note: r.note }));
}
/**
 * Reconcile payments against the ledger (and optionally against the provider). Nothing here changes data. `ok` is false if anything needs a human.
 * Totals are KOBO. fee figures are ESTIMATES unless providerFee is present.
 */
export async function reconcile(app, { askProvider = false, sinceMs = 0 } = {}) {
  const { provider, cfg } = need(app); const db = app.db; const now = app.clock.now(); const issues = []; const add = (ref, kind, detail) => issues.push({ ref, kind, detail });
  const its = db.prepare('SELECT * FROM payment_intents WHERE created_at>=? ORDER BY id').all(sinceMs);
  const T = { count: its.length, paid: 0, grossKobo: 0, vatKobo: 0, netKobo: 0, feeEstKobo: 0, providerFeeKobo: 0, refundedKobo: 0, creditIssued: 0, creditReversed: 0 };
  for (const it of its) {
    const paidish = ['paid', 'partially_refunded', 'refunded'].includes(it.status);
    if (paidish) {
      T.paid++; T.grossKobo += it.total_kobo; T.vatKobo += it.vat_kobo; T.netKobo += it.net_kobo; T.feeEstKobo += it.fee_est_kobo; T.providerFeeKobo += it.provider_fee_kobo || 0; T.refundedKobo += it.refunded_kobo;
      if (it.purpose === 'topup') {
        T.creditIssued += it.credit; T.creditReversed += it.credit_reversed;
        const tx = db.prepare("SELECT t.id, SUM(CASE WHEN e.amount>0 THEN e.amount ELSE 0 END) amt FROM ledger_tx t JOIN ledger_entries e ON e.tx_id=t.id WHERE t.idem_key=? GROUP BY t.id").get(`pay:${it.ref}`);
        if (!tx) add(it.ref, 'paid_without_credit', 'payment is paid but no ledger credit exists'); else if (tx.amt !== it.credit) add(it.ref, 'credit_amount_mismatch', `ledger ${tx.amt} vs intent ${it.credit}`);
      } else if (it.purpose === 'ad_campaign') {
        const c = db.prepare('SELECT payment_status FROM ad_campaigns WHERE id=?').get(it.campaign_id);
        if (!c || !['paid', 'refunded'].includes(c.payment_status)) add(it.ref, 'campaign_not_marked_paid', `campaign payment_status=${c?.payment_status}`);
      }
      if (it.provider_fee_kobo != null && it.provider_fee_kobo !== it.fee_est_kobo) add(it.ref, 'fee_differs_from_estimate', `provider ${it.provider_fee_kobo} vs estimate ${it.fee_est_kobo} (the estimate is from Sherif's notes; this is information, not an error)`);
      const rf = db.prepare("SELECT COALESCE(SUM(amount_kobo),0) a, COALESCE(SUM(credit_reversed),0) c FROM payment_refunds WHERE intent_ref=?").get(it.ref);
      if (rf.a !== it.refunded_kobo || rf.c !== it.credit_reversed) add(it.ref, 'refund_totals_differ', `refund rows ${rf.a}/${rf.c} vs intent ${it.refunded_kobo}/${it.credit_reversed}`);
    } else if (['pending', 'created'].includes(it.status) && now - it.created_at > cfg.pendingExpireMs * 2) add(it.ref, 'stale_pending', `open for ${Math.round((now - it.created_at) / 60000)} min`);
    else if (it.status === 'review') add(it.ref, 'needs_review', it.note || '');
    else if (it.status === 'failed' || it.status === 'expired') { if (db.prepare("SELECT 1 FROM ledger_tx WHERE idem_key=?").get(`pay:${it.ref}`)) add(it.ref, 'credited_but_not_paid', `status ${it.status} but a credit exists`); }
    if (askProvider && ['pending', 'paid', 'partially_refunded', 'refunded'].includes(it.status)) {
      try {
        const v = await provider.verify(it.ref);
        if (paidish && (!v.found || v.state !== 'success')) add(it.ref, 'provider_does_not_confirm', `provider: ${v.found ? v.state : 'unknown reference'}`);
        else if (paidish && v.amountKobo != null && v.amountKobo !== it.total_kobo) add(it.ref, 'provider_amount_differs', `provider ${v.amountKobo} vs ${it.total_kobo}`);
        else if (it.status === 'pending' && v.found && v.state === 'success') add(it.ref, 'paid_at_provider_not_applied', 'provider says success but we have not credited (run the sweep)');
      } catch (e) { add(it.ref, 'provider_unreachable', e.message); }
    }
  }
  // every credit in the ledger must belong to a paid payment (catches a credit with no matching payment)
  for (const t of db.prepare("SELECT ref FROM ledger_tx WHERE reason='topup_paid'").all()) { const it = row(app, t.ref); if (!it || !['paid', 'partially_refunded', 'refunded'].includes(it.status)) add(t.ref, 'credit_without_paid_payment', 'ledger credit with no paid payment'); }
  // supply identity over ALL payments: game money sold - reversed == minus the balance of the paid-topup account
  const all = db.prepare("SELECT COALESCE(SUM(credit),0) c, COALESCE(SUM(credit_reversed),0) r FROM payment_intents WHERE status IN ('paid','partially_refunded','refunded') AND purpose='topup'").get();
  const bal = balanceOf(db, PAID_TOPUP);
  if (-bal !== all.c - all.r) add(null, 'supply_mismatch', `account ${PAID_TOPUP} says ${-bal} sold, payments say ${all.c - all.r}`);
  for (const r of db.prepare("SELECT id, intent_ref, status, created_at FROM payment_refunds WHERE status IN ('pending_manual','failed','requested')").all())
    if (r.status === 'failed' || now - r.created_at > 3 * 86400000) add(r.intent_ref, r.status === 'failed' ? 'refund_failed' : 'refund_unsettled', `refund #${r.id} ${r.status}`);
  const informational = new Set(['fee_differs_from_estimate']);
  return { generatedAt: now, testMode: true, totals: { ...T, merchantNetKobo: T.grossKobo - T.vatKobo - (T.providerFeeKobo || T.feeEstKobo) - T.refundedKobo, note: 'merchantNet = gross - VAT - fee (provider fee if reported, else the ESTIMATE) - refunds' }, gameMoneySold: all.c - all.r, issues, ok: issues.every(i => informational.has(i.kind)) };
}
