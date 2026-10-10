// Payments tables. Portable SQL (same text runs on SQLite and, via the adapter, on Postgres). Idempotent.
export const PAYMENTS_SQL = `
CREATE TABLE IF NOT EXISTS payment_intents (   -- one row per attempt to collect real money (TEST MODE in this build)
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ref TEXT NOT NULL UNIQUE,                    -- our reference, also sent to the provider
  idem_key TEXT UNIQUE,
  purpose TEXT NOT NULL,                       -- topup | ad_campaign
  user_id INTEGER, advertiser_id INTEGER, campaign_id INTEGER,
  provider TEXT NOT NULL,
  net_kobo INTEGER NOT NULL, vat_kobo INTEGER NOT NULL, total_kobo INTEGER NOT NULL, fee_est_kobo INTEGER NOT NULL,
  credit INTEGER NOT NULL DEFAULT 0,           -- game naira credited when paid (topup)
  email TEXT,                                  -- needed by the provider and for the VAT receipt; nothing else about the payer is kept
  status TEXT NOT NULL,                        -- created | pending | paid | failed | expired | review | partially_refunded | refunded
  authorization_url TEXT, provider_txn_id TEXT, provider_fee_kobo INTEGER, note TEXT,
  paid_at INTEGER, ledger_tx_id INTEGER, refunded_kobo INTEGER NOT NULL DEFAULT 0, credit_reversed INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_pi_user ON payment_intents(user_id, created_at);
CREATE INDEX IF NOT EXISTS ix_pi_status ON payment_intents(status, created_at);
CREATE INDEX IF NOT EXISTS ix_pi_campaign ON payment_intents(campaign_id);
CREATE TABLE IF NOT EXISTS payment_events (    -- every webhook / verify / sweep that touched a payment, kept as evidence
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ref TEXT, source TEXT NOT NULL, event TEXT, signature_ok INTEGER, provider_event_id TEXT,
  payload_sha256 TEXT UNIQUE,                  -- a re-delivered webhook has the same bytes, so it hits this and is a no-op
  outcome TEXT NOT NULL, detail TEXT, created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_pe_ref ON payment_events(ref);
CREATE TABLE IF NOT EXISTS payment_refunds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  intent_ref TEXT NOT NULL, idem_key TEXT UNIQUE,
  amount_kobo INTEGER NOT NULL, credit_reversed INTEGER NOT NULL DEFAULT 0, reason TEXT, requested_by TEXT NOT NULL,
  status TEXT NOT NULL,                        -- requested | processed | pending_manual | failed
  attempts INTEGER NOT NULL DEFAULT 0, provider_refund_id TEXT, last_error TEXT,
  created_at INTEGER NOT NULL, settled_at INTEGER
);
CREATE INDEX IF NOT EXISTS ix_pr_ref ON payment_refunds(intent_ref);
CREATE INDEX IF NOT EXISTS ix_pr_status ON payment_refunds(status);
`;
