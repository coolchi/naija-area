# Payments (Monipay), TEST MODE ONLY

Queue item 27. Built 10 Oct 2026 on branch `track-b`. **No live credentials, no real money.** In-game ₦ has no cash-out, and nothing in this module can pay money out.

## What a player or advertiser sees
- **Wallet, "Buy ₦ (TEST MODE)":** pick a pack (₦1,000 / 5,000 / 20,000, price shown with the **VAT line**, e.g. "₦1,000 for ₦1,075 (incl. VAT ₦75)"), enter an email for the receipt, pay. With the stand-in gateway the game plays the customer, so one tap credits the ₦. With a real Monipay **test** key it sends the player to Monipay's hosted checkout and back to `/play?pay=<ref>`.
- **Advertiser dashboard:** a campaign that is waiting for payment shows "Payment due: net + VAT" and a "Pay now (test)" button.
- Guests cannot buy (no account to recover). The player must have confirmed 18+ (item 29 hooks in here: `app.ageGate`).

## How it works (one picture)
```
player/advertiser -> POST /api/payments/topup | /api/advertiser/campaigns/:id/pay
   server: payment_intents row (status created) -> provider.initialize -> status pending, authorizationUrl returned
customer pays at the gateway
gateway -> POST /api/payments/webhook (signed)      browser -> GET /api/payments/status?ref= (return page)
   BOTH only TRIGGER:  provider.verify(ref) (server to server, private key)  -> applyResult()
   applyResult (ONE DB transaction): intent pending->paid (conditional UPDATE) + ledger move sys:paid_topup -> player cash (idemKey pay:<ref>)
background tick (15 s): verify pending payments whose webhook never came; expire after 1 h; send recorded refunds
```
Rules that make it safe:
1. **The webhook is never trusted on its own.** Signature check on the raw bytes (HMAC-SHA512, constant-time), then a server-side verify with the provider, then the amount must match **to the kobo**, then it must not be a LIVE-domain transaction. Anything odd becomes status `review` and credits nothing.
2. **Credit exactly once.** A re-delivered webhook has identical bytes (`payment_events.payload_sha256 UNIQUE`), a re-serialised one hits the status guard, and the ledger idempotency key `pay:<ref>` is the last line. Tested.
3. **Provider calls never run inside a DB transaction** (they are async); DB changes are synchronous and atomic.
4. **Closed loop:** accounts that bought ₦ cannot send P2P transfers (plan 07: no transfers of purchased currency). Conservative rule until a lawyer says otherwise. There is no payout/transfer method in the provider interface at all (a test checks the names).
5. Daily cap per player (₦50,000, ESTIMATE), at most 3 open payments.

## Money maths (all kobo; 1 naira = 100 kobo)
- Charge = net + **VAT 7.5%** (rate from plan doc 06; whether VAT applies to this digital currency is a tax-adviser question).
- Monipay fee = **ESTIMATE 1% of the charge, capped at ₦500 (50,000 kobo)**. This comes from Sherif's own notes on Monipay's merchant pricing (plan docs 00/06), **not** from the public API docs. The merchant bears the fee; the player does not see it. When Monipay reports `fees` on verify, that real number is stored (`provider_fee_kobo`) and used instead; reconciliation shows differences as information.
- Pack ₦ credit is 1:1 with the net price: a placeholder, not a pricing decision.

## Monipay API shape used (read from Monipay's public developer docs, monipay.ng/api-docs, on 10 Oct 2026)
| What | Documented shape | Used as |
|---|---|---|
| Base URL, auth | `https://api.monipay.ng`, `Authorization: Bearer <key>`; keys `pub_test_/pri_test_` (test), `pub_live_/pri_live_` (live) | provider refuses any `_live_` key and any secret key not starting `pri_test_` |
| Initialize | `POST /transaction/initialize` body `email`, `amount` (kobo), `reference`, `callback_url`, `currency`, `channels` (`card`,`bank_transfer`,`qr`), `metadata`; reply `data.authorization_url`, `access_code`, `reference` | `monipayProvider.initialize` |
| Verify | `GET /transaction/verify/{reference}` with the **private** key; `data.status == 'success'`, `data.amount` (kobo), `data.fees`, `data.paid_at`, `data.domain` (`test`/`live`) | `monipayProvider.verify`; a `live` domain is held for review |
| Webhook | header `x-monipay-signature` = HMAC-SHA512 (hex) of the **raw body** with your secret key; events `charge.success`, `charge.failed`, ...; payload `{event, data:{id, reference, amount, status, customer}}` | `verifyWebhook`, `parseWebhook`; accepts the value with or without a `sha512=` prefix (the docs show both) |
| Errors | `{status:false, message, meta}` with 4xx/5xx | mapped to a clean 502 `PAYMENT_PROVIDER` |

### NOT verified (be honest)
- **No real call has ever been made.** Everything is tested against recorded-shape fake responses. A first run with real **test** keys is the first true check. Field names such as `fees` and the exact `data.status` values come from the docs' own samples.
- **Refunds:** Monipay's API reference has **no refund endpoint** (the developer landing page lists a bare `POST /refunds` with no fields). So the provider never guesses a call: a refund reverses the game-money credit, is recorded, and shows as `pending_manual` until a person sends the cash refund from the Monipay dashboard and marks it settled (`POST /api/admin/payments/refunds/:id/settle`). The mock provider supports refunds fully so the whole flow is tested.
- Whether the webhook secret is the API key or a separate dashboard secret (the docs say "your secret key" and one page hedges). `MONIPAY_WEBHOOK_SECRET` overrides; default is the secret key.
- Whether the signature has a timestamp/replay window: the docs show none, so replay safety rests on the dedupe above and the server-side verify.
- Monipay's real fee schedule, VAT treatment on the fee, settlement timing, test cards, dispute handling.
- Inline JS popup (documented, not used).

## Refunds
`POST /api/admin/payments/:ref/refund {amountKobo?, reason, idem}` (admin). Full or partial. For a top-up the player's game money is reversed **in proportion in the same transaction**; if they already spent it only the part still in their cash can be refunded (error `PLAYER_SPENT_CREDIT` says how much). An ad that is **rejected after being paid is refunded in full automatically**. `payment_refunds` states: requested -> processed | pending_manual | failed.

## Reconciliation
`GET /api/admin/payments/reconcile[?provider=1&since=ms]` (admin) changes nothing and returns totals (gross, VAT, net, fee, refunds, merchant net, game money sold) plus `issues`: `paid_without_credit`, `credit_without_paid_payment`, `credit_amount_mismatch`, `credited_but_not_paid`, `supply_mismatch` (the `sys:paid_topup` account must equal minus the game money sold minus reversed), `refund_totals_differ`, `refund_unsettled/failed`, `stale_pending`, `needs_review`, `campaign_not_marked_paid`, and with `provider=1` also `provider_does_not_confirm`, `provider_amount_differs`, `paid_at_provider_not_applied`. `ok` is false if any non-informational issue exists.

## Ads
`NA_ADS_REQUIRE_PAYMENT=1`: a new campaign starts `awaiting_payment`; review goes on in parallel, an approved campaign waits (flag `waiting_for_payment`) and is scheduled by the ad ticker as soon as the payment is confirmed. Default is off (ads stay free in test mode).

## Configuration (environment)
`NA_PAYMENTS_PROVIDER=mock|monipay` (default mock), `MONIPAY_SECRET_KEY` (`pri_test_...`), `MONIPAY_PUBLIC_KEY`, `MONIPAY_WEBHOOK_SECRET`, `MONIPAY_BASE_URL`, `NA_PUBLIC_URL` (return URL), `NA_ADS_REQUIRE_PAYMENT`, `NA_MONIPAY_FEE_RATE`, `NA_MONIPAY_FEE_CAP_KOBO`, `NA_VAT_RATE`, `NA_PAY_MAX_PER_DAY_KOBO`. Webhook URL to give Monipay (test dashboard): `https://<host>/api/payments/webhook`.

## Before any live use (checklist, not done)
1. Monipay confirms the licence category covers these collections and the arm's-length contract exists (plan 07).
2. Lawyer: is selling in-game ₦ e-money? VAT on it? Is the "buyers cannot transfer" rule enough?
3. A real **test**-key run end to end; confirm refund API or keep the manual process.
4. Remove the free "Test top-up" (`/api/topup/test`) and the dev routes; the mock provider must not be selectable in production.
5. A separate decision to lift the `_live_` key refusal in `monipayProvider`.
6. Webhook source-IP allow-list or Cloudflare rule if Monipay publishes IPs.

## Files
`server/core/payments/{index,providers,fees,sql,routes}.js`, `server/config/payments.js`, `client/src/pay-ui.js`, `public/js/advertiser.js`, tests `tests/payments.test.js`, smoke `scripts/payments-smoke.mjs`.
