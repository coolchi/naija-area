// SQLite schema (better-sqlite3 in Node, sql.js in the static demo). PRODUCTION TARGET IS POSTGRES: same tables,
// swap INTEGER ms timestamps for timestamptz, add real row locks (SELECT ... FOR UPDATE) instead of SQLite's single-writer lock.
export const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE COLLATE NOCASE,
  pass_hash TEXT,
  is_guest INTEGER NOT NULL DEFAULT 0,
  is_bot INTEGER NOT NULL DEFAULT 0,
  age_confirmed_at INTEGER,
  color TEXT NOT NULL DEFAULT '#2e9b5e',
  created_at INTEGER NOT NULL,
  last_seen INTEGER,
  signup_ip_hash TEXT
);
CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY,                 -- 'u:<uid>' cash, 's:<uid>' savings, 'sys:<name>' system accounts
  kind TEXT NOT NULL,                  -- 'cash' | 'savings' | 'system'
  user_id INTEGER,
  balance INTEGER NOT NULL DEFAULT 0,  -- materialised; always equals SUM(ledger_entries.amount) (tested)
  allow_negative INTEGER NOT NULL DEFAULT 0,
  CHECK (allow_negative = 1 OR balance >= 0)
);
CREATE TABLE IF NOT EXISTS ledger_tx (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  idem_key TEXT UNIQUE,
  reason TEXT NOT NULL,
  ref TEXT,
  user_id INTEGER,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS ledger_entries (   -- APPEND-ONLY (triggers below block UPDATE/DELETE)
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tx_id INTEGER NOT NULL REFERENCES ledger_tx(id),
  account_id TEXT NOT NULL REFERENCES accounts(id),
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_le_account ON ledger_entries(account_id, id);
CREATE INDEX IF NOT EXISTS ix_le_tx ON ledger_entries(tx_id);
CREATE TRIGGER IF NOT EXISTS le_no_update BEFORE UPDATE ON ledger_entries BEGIN SELECT RAISE(ABORT, 'ledger is append-only'); END;
CREATE TRIGGER IF NOT EXISTS le_no_delete BEFORE DELETE ON ledger_entries BEGIN SELECT RAISE(ABORT, 'ledger is append-only'); END;
CREATE TRIGGER IF NOT EXISTS ltx_no_update BEFORE UPDATE ON ledger_tx BEGIN SELECT RAISE(ABORT, 'ledger is append-only'); END;
CREATE TRIGGER IF NOT EXISTS ltx_no_delete BEFORE DELETE ON ledger_tx BEGIN SELECT RAISE(ABORT, 'ledger is append-only'); END;

CREATE TABLE IF NOT EXISTS player_state (
  user_id INTEGER PRIMARY KEY REFERENCES users(id),
  x REAL NOT NULL, z REAL NOT NULL, ry REAL NOT NULL DEFAULT 0,
  mode TEXT NOT NULL DEFAULT 'walk',
  energy REAL NOT NULL, hunger REAL NOT NULL, needs_at INTEGER NOT NULL,
  total_shifts INTEGER NOT NULL DEFAULT 0,
  savings_interest_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS shifts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  job_id TEXT NOT NULL,
  started_at INTEGER NOT NULL,
  ends_at INTEGER NOT NULL,
  wage INTEGER NOT NULL,
  status TEXT NOT NULL,                -- active | claimed
  claimed_at INTEGER
);
CREATE UNIQUE INDEX IF NOT EXISTS ux_one_active_shift ON shifts(user_id) WHERE status='active';
CREATE INDEX IF NOT EXISTS ix_shift_user ON shifts(user_id, job_id, claimed_at);

CREATE TABLE IF NOT EXISTS property_owner (
  property_id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  mode TEXT NOT NULL,                  -- 'rent' | 'own'
  custom_name TEXT,
  next_rent_due INTEGER,
  missed INTEGER NOT NULL DEFAULT 0,
  since INTEGER NOT NULL,
  paid_price INTEGER NOT NULL DEFAULT 0
);
CREATE UNIQUE INDEX IF NOT EXISTS ux_one_home_per_user ON property_owner(user_id);
CREATE TABLE IF NOT EXISTS property_items (
  property_id TEXT NOT NULL, item_id TEXT NOT NULL, user_id INTEGER NOT NULL, bought_at INTEGER NOT NULL,
  PRIMARY KEY (property_id, item_id)
);
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL, kind TEXT NOT NULL, text TEXT NOT NULL, created_at INTEGER NOT NULL, read_at INTEGER
);
CREATE INDEX IF NOT EXISTS ix_notif_user ON notifications(user_id, id);
CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, username TEXT NOT NULL,
  x REAL NOT NULL, z REAL NOT NULL, text TEXT NOT NULL, created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT, actor TEXT, action TEXT NOT NULL, detail TEXT, created_at INTEGER NOT NULL
);

-- ADS -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS advertisers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL, brand_name TEXT NOT NULL, access_key TEXT NOT NULL UNIQUE, created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS ad_creatives (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  advertiser_id INTEGER, mime TEXT NOT NULL, bytes INTEGER NOT NULL, width INTEGER NOT NULL, height INTEGER NOT NULL,
  sha256 TEXT NOT NULL, data BLOB NOT NULL, created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS ad_campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  advertiser_id INTEGER NOT NULL REFERENCES advertisers(id),
  creative_id INTEGER NOT NULL REFERENCES ad_creatives(id),
  surface TEXT NOT NULL, tier TEXT NOT NULL, units INTEGER NOT NULL, days INTEGER NOT NULL,
  link_url TEXT NOT NULL, headline TEXT,
  price_net INTEGER NOT NULL, price_vat INTEGER NOT NULL, price_total INTEGER NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'test_mode_no_payment',
  status TEXT NOT NULL,                -- submitted|auto_checks|human_review|approved|rejected|scheduled|live|completed
  reject_reason TEXT, flags TEXT,
  requested_start INTEGER, start_at INTEGER, end_at INTEGER,
  is_demo INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_camp_status ON ad_campaigns(status);
CREATE TABLE IF NOT EXISTS ad_transitions (
  id INTEGER PRIMARY KEY AUTOINCREMENT, campaign_id INTEGER NOT NULL, from_status TEXT, to_status TEXT NOT NULL,
  actor TEXT NOT NULL, note TEXT, created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS ad_assignments (   -- which boards a campaign sits on, and its rotation position (0-3)
  campaign_id INTEGER NOT NULL, slot_id TEXT NOT NULL, position INTEGER NOT NULL,
  PRIMARY KEY (campaign_id, slot_id)
);
CREATE TABLE IF NOT EXISTS ad_impressions (   -- VALID (filtered-in) impressions only; unique per player per creative per window
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaign_id INTEGER NOT NULL, slot_id TEXT NOT NULL, user_id INTEGER NOT NULL, win INTEGER NOT NULL,
  pct INTEGER, ms INTEGER, created_at INTEGER NOT NULL,
  UNIQUE (user_id, campaign_id, win)
);
CREATE TABLE IF NOT EXISTS ad_stats (         -- daily counters. gross = every claim received; valid = passed validation + IVT filter
  campaign_id INTEGER NOT NULL, day TEXT NOT NULL,
  gross INTEGER NOT NULL DEFAULT 0, valid INTEGER NOT NULL DEFAULT 0,
  taps_gross INTEGER NOT NULL DEFAULT 0, taps_valid INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (campaign_id, day)
);
CREATE TABLE IF NOT EXISTS ad_filter_reasons (
  campaign_id INTEGER NOT NULL, kind TEXT NOT NULL, reason TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (campaign_id, kind, reason)
);
CREATE TABLE IF NOT EXISTS ad_taps (
  id INTEGER PRIMARY KEY AUTOINCREMENT, campaign_id INTEGER NOT NULL, user_id INTEGER NOT NULL,
  valid INTEGER NOT NULL, reason TEXT, created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_taps ON ad_taps(campaign_id, user_id, created_at);
`;
