// Payment providers behind ONE interface, so the game never talks to a gateway directly.
//   initialize({ reference, amountKobo, email, callbackUrl, metadata }) -> { authorizationUrl, accessCode, providerRef }
//   verify(reference)       -> { found, state: 'success'|'failed'|'pending', amountKobo, feesKobo, paidAt, providerTxnId, live }
//   refund({ reference, amountKobo, reason, refundKey }) -> { state: 'processed'|'pending'|'manual_required', providerRefundId }
//   verifyWebhook(rawBody, headers) -> boolean   (signature check on the raw bytes, constant-time)
//   parseWebhook(rawBody)   -> { event, reference, amountKobo, state, providerEventId } | null
// DELIBERATELY ABSENT: any payout / transfer method. In-game money has no cash-out, so the interface cannot even express one.
import { GameError } from '../util.js';

const provErr = (msg, extra) => new GameError('PAYMENT_PROVIDER', msg, 502, extra);
const hexOf = (sig) => String(sig || '').trim().replace(/^sha512=/i, '').toLowerCase();

/** constant-time HMAC-SHA512 (hex) check of a raw body. Accepts the header with or without a "sha512=" prefix (Monipay's docs show both). */
export function checkSignature(platform, secret, rawBody, header) {
  if (!secret || !header || rawBody == null) return false;
  const body = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(String(rawBody));
  const want = platform.hmacHex('sha512', secret, body); const got = hexOf(header);
  return got.length === want.length && platform.safeEqual(got, want);
}
const SIG_HEADER = 'x-monipay-signature';
const header = (h, name) => { if (!h) return undefined; const k = Object.keys(h).find(x => x.toLowerCase() === name); return k ? h[k] : undefined; };

// ---------------------------------------------------------------------------------------------------------------------------------
/** Monipay, built to the shape on their public developer docs (monipay.ng/api-docs, read 10 Oct 2026). TEST KEYS ONLY. */
export function monipayProvider({ platform, secretKey, publicKey, webhookSecret, baseUrl = 'https://api.monipay.ng', fetchImpl = globalThis.fetch, timeoutMs = 10000 }) {
  if (!secretKey) throw new Error('Monipay: MONIPAY_SECRET_KEY (a pri_test_ key) is required');
  for (const k of [secretKey, publicKey]) if (k && /_live_/i.test(k)) throw new Error('Monipay: live keys are refused in this build. TEST MODE ONLY (use pri_test_ / pub_test_ keys).');
  if (!/^pri_test_/.test(secretKey)) throw new Error('Monipay: the secret key must start with pri_test_ in this build');
  const secret = webhookSecret || secretKey; // docs: webhooks are signed "with your secret key"; a separate dashboard secret is used if one is given
  const call = async (method, path, body) => {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), timeoutMs);
    let res, text;
    try { res = await fetchImpl(baseUrl + path, { method, headers: { Authorization: `Bearer ${secretKey}`, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined, signal: ctl.signal }); text = await res.text(); }
    catch (e) { throw provErr(e?.name === 'AbortError' ? 'The payment provider did not answer in time.' : 'Could not reach the payment provider.'); }
    finally { clearTimeout(t); }
    let json = null; try { json = text ? JSON.parse(text) : null; } catch { /* not json */ }
    return { status: res.status, json };
  };
  return {
    id: 'monipay', mode: 'test',
    async initialize({ reference, amountKobo, email, callbackUrl, metadata }) {
      // POST /transaction/initialize: email + amount (kobo) required; reference, callback_url, currency, metadata optional (docs)
      const r = await call('POST', '/transaction/initialize', { email, amount: amountKobo, currency: 'NGN', reference, callback_url: callbackUrl, channels: ['card', 'bank_transfer', 'qr'], metadata });
      const d = r.json?.data;
      if (r.status >= 400 || !r.json || r.json.status === false || !d?.authorization_url) throw provErr('The payment provider refused to start the payment.', { providerStatus: r.status });
      return { authorizationUrl: d.authorization_url, accessCode: d.access_code || null, providerRef: d.reference || reference };
    },
    async verify(reference) {
      // GET /transaction/verify/{reference} with the PRIVATE key (docs). data.status 'success' + amount in kobo + fees + paid_at.
      const r = await call('GET', `/transaction/verify/${encodeURIComponent(reference)}`);
      if (r.status === 404) return { found: false, state: 'pending' };
      const d = r.json?.data;
      if (r.status >= 400 || !r.json || r.json.status === false || !d) throw provErr('The payment provider could not confirm the payment.', { providerStatus: r.status });
      const st = String(d.status || '').toLowerCase();
      const state = st === 'success' || st === 'successful' || st === 'approved' ? 'success' : (st === 'failed' || st === 'abandoned' || st === 'reversed' || st === 'cancelled') ? 'failed' : 'pending';
      return { found: true, state, amountKobo: Number.isFinite(d.amount) ? Math.round(d.amount) : null, feesKobo: Number.isFinite(d.fees) ? Math.round(d.fees) : null, paidAt: d.paid_at || null, providerTxnId: d.id != null ? String(d.id) : null, live: String(d.domain || '').toLowerCase() === 'live' };
    },
    async refund() {
      // NOT VERIFIED: Monipay's API reference lists no refund endpoint (only a bare "POST /refunds" line on the developer landing page, no fields or response).
      // So we never guess a call. The refund is recorded, the player's game-money credit is reversed, and a human settles the cash refund in the Monipay dashboard.
      return { state: 'manual_required', providerRefundId: null };
    },
    verifyWebhook: (raw, headers) => checkSignature(platform, secret, raw, header(headers, SIG_HEADER)),
    parseWebhook: parseMonipayEvent
  };
}
/** { event: 'charge.success', data: { id, reference, amount, currency, status, customer } } (Monipay docs, Webhooks > Overview) */
export function parseMonipayEvent(raw) {
  let j; try { j = JSON.parse(Buffer.isBuffer(raw) ? raw.toString('utf8') : String(raw)); } catch { return null; }
  if (!j || typeof j.event !== 'string' || typeof j.data !== 'object' || !j.data) return null;
  const d = j.data; const reference = typeof d.reference === 'string' ? d.reference : null;
  const state = j.event === 'charge.success' ? 'success' : j.event === 'charge.failed' ? 'failed' : 'other';
  return { event: j.event, reference, amountKobo: Number.isFinite(d.amount) ? Math.round(d.amount) : null, state, providerEventId: d.id != null ? `${j.event}:${d.id}` : null };
}

// ---------------------------------------------------------------------------------------------------------------------------------
/** A stand-in gateway that behaves like the Monipay shape above (same signature scheme, same event names) with NO network. Used in tests, the demo and local play. */
export function mockProvider({ platform, secret = 'mock-webhook-secret', now = () => Date.now() } = {}) {
  const txns = new Map(); let n = 0; const refunds = new Map();
  const api = {
    id: 'mock', mode: 'test', txns, secret,
    async initialize({ reference, amountKobo }) {
      if (txns.has(reference)) throw provErr('Duplicate reference.');
      txns.set(reference, { amountKobo, state: 'pending', fees: 0, paidAt: null, id: `MOCK${++n}` });
      return { authorizationUrl: `/pay/mock?ref=${encodeURIComponent(reference)}`, accessCode: `ac_${n}`, providerRef: reference };
    },
    async verify(reference) {
      const t = txns.get(reference); if (!t) return { found: false, state: 'pending' };
      return { found: true, state: t.state, amountKobo: t.amountKobo, feesKobo: t.fees, paidAt: t.paidAt, providerTxnId: t.id, live: false };
    },
    async refund({ reference, amountKobo, refundKey }) {
      const t = txns.get(reference); if (!t || t.state !== 'success') throw provErr('Nothing to refund.');
      if (refunds.has(refundKey)) return refunds.get(refundKey);
      const out = { state: 'processed', providerRefundId: `MRF${refunds.size + 1}` }; refunds.set(refundKey, out); t.refunded = (t.refunded || 0) + amountKobo; return out;
    },
    verifyWebhook: (raw, headers) => checkSignature(platform, secret, raw, header(headers, SIG_HEADER)),
    parseWebhook: parseMonipayEvent,
    // ---- test controls (never exposed by a real provider)
    complete(reference, { fees = 0, amountKobo } = {}) { const t = txns.get(reference); if (!t) throw new Error('unknown reference'); t.state = 'success'; t.paidAt = new Date(now()).toISOString(); t.fees = fees; if (amountKobo != null) t.amountKobo = amountKobo; return t; },
    fail(reference) { const t = txns.get(reference); if (!t) throw new Error('unknown reference'); t.state = 'failed'; return t; },
    /** a signed webhook as Monipay would deliver it: { body: Buffer, headers } */
    webhook(reference, event = 'charge.success') {
      const t = txns.get(reference); const body = Buffer.from(JSON.stringify({ event, data: { id: t.id, reference, amount: t.amountKobo, currency: 'NGN', status: event === 'charge.success' ? 'success' : 'failed', customer: { email: 'test@example.com' } } }));
      return { body, headers: { 'x-monipay-signature': platform.hmacHex('sha512', secret, body) } };
    }
  };
  return api;
}
