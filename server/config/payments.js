// Payments config. TEST MODE ONLY in this build: live Monipay keys (pri_live_ / pub_live_) are refused at start-up.
// Every number marked ESTIMATE is a placeholder to be confirmed against Monipay's merchant contract and a Nigerian tax adviser.
const env = process.env;
const num = (k, d) => (env[k] !== undefined && env[k] !== '' ? Number(env[k]) : d);
export const PAYMENTS = {
  _note: 'TEST MODE ONLY. ESTIMATE values are placeholders.',
  provider: env.NA_PAYMENTS_PROVIDER || 'mock',                 // mock | monipay (monipay needs TEST keys: pri_test_ / pub_test_)
  baseUrl: env.MONIPAY_BASE_URL || 'https://api.monipay.ng',    // from Monipay's public docs (api.monipay.ng/transaction/initialize)
  publicUrl: env.NA_PUBLIC_URL || 'http://127.0.0.1:3000',      // where the player returns to after hosted checkout
  currency: 'NGN',
  // pricing of a collection, per Sherif's own notes on Monipay's merchant pricing ("about 1% capped at ₦500"): ESTIMATE, NOT in the public API docs.
  fee: { rate: num('NA_MONIPAY_FEE_RATE', 0.01), capKobo: num('NA_MONIPAY_FEE_CAP_KOBO', 50000) },
  // VAT line shown on every charge. 7.5% is the Nigerian standard rate (plan doc 06); whether VAT applies to this digital currency is a tax-adviser question.
  vatRate: num('NA_VAT_RATE', 0.075),
  // Packs of game money. Price (net, in naira) buys `credit` game-naira. 1:1 is an ESTIMATE/placeholder, not a pricing decision.
  packs: [{ id: 'p1000', priceNgn: 1000, credit: 1000 }, { id: 'p5000', priceNgn: 5000, credit: 5000 }, { id: 'p20000', priceNgn: 20000, credit: 20000 }],
  minChargeKobo: 5000,            // Monipay docs: "Minimum initialize amount is typically ₦50.00 → 5000 kobo"
  maxPerUserPerDayKobo: num('NA_PAY_MAX_PER_DAY_KOBO', 5000000),   // ESTIMATE: ₦50,000 a day per player
  pendingExpireMs: 60 * 60 * 1000,        // an unpaid checkout is closed after an hour (ESTIMATE)
  sweepAfterMs: 2 * 60 * 1000,            // ask the provider about a pending payment if no webhook arrived after 2 minutes
  refundMaxAttempts: 5,
  adsRequirePayment: env.NA_ADS_REQUIRE_PAYMENT === '1',       // off by default: ads stay free in test mode
  blockTransfersAfterPurchase: true,      // plan 07: no transfers of purchased currency (closed loop). Players who bought ₦ cannot send ₦ to others.
  webhookPerMinPerIp: 300
};
