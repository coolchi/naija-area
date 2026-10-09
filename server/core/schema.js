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
  x INTEGER NOT NULL DEFAULT 0, z INTEGER NOT NULL DEFAULT 0, rot INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (property_id, item_id)
);
CREATE TABLE IF NOT EXISTS knocks (       -- visitor knock flow: host accepts/declines; unanswered knocks time out (~95 s)
  id INTEGER PRIMARY KEY AUTOINCREMENT, property_id TEXT NOT NULL, visitor_id INTEGER NOT NULL, owner_id INTEGER NOT NULL,
  status TEXT NOT NULL,                   -- pending | accepted | declined | expired | cancelled | ended
  created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL, decided_at INTEGER
);
CREATE INDEX IF NOT EXISTS ix_knock_owner ON knocks(owner_id, status);
CREATE INDEX IF NOT EXISTS ix_knock_visitor ON knocks(visitor_id, status);
CREATE TABLE IF NOT EXISTS land_plots (
  plot_id TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id), paid_price INTEGER NOT NULL, bought_at INTEGER NOT NULL, last_check_at INTEGER NOT NULL, levies_paid INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS work_tasks (   -- timing mini-game attached to a shift (server picks the target, server clock judges the tap)
  shift_id INTEGER PRIMARY KEY, started_at INTEGER NOT NULL, period_ms INTEGER NOT NULL, target REAL NOT NULL, width REAL NOT NULL, result TEXT, bonus_pct INTEGER NOT NULL DEFAULT 0
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

-- ---- trust & safety (phase 2)
CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT, reporter_id INTEGER NOT NULL, kind TEXT NOT NULL,       -- house_name | chat | ad_creative
  target_ref TEXT NOT NULL, target_user_id INTEGER, reason TEXT NOT NULL, detail TEXT, snapshot TEXT,
  status TEXT NOT NULL DEFAULT 'open',                  -- open | actioned | dismissed
  created_at INTEGER NOT NULL, resolved_at INTEGER, resolved_by TEXT, resolution TEXT,
  UNIQUE (reporter_id, kind, target_ref)
);
CREATE INDEX IF NOT EXISTS ix_reports_status ON reports(status, id);
CREATE INDEX IF NOT EXISTS ix_reports_target ON reports(kind, target_ref);
CREATE TABLE IF NOT EXISTS user_blocks (               -- mute = I do not see them; block = mute + they cannot DM/knock/sit with me
  blocker_id INTEGER NOT NULL, blocked_id INTEGER NOT NULL, kind TEXT NOT NULL, created_at INTEGER NOT NULL,
  PRIMARY KEY (blocker_id, blocked_id)
);
CREATE INDEX IF NOT EXISTS ix_blocks_blocked ON user_blocks(blocked_id);

-- ---- venues + games (phase 2)
CREATE TABLE IF NOT EXISTS game_matches (
  id INTEGER PRIMARY KEY AUTOINCREMENT, venue_id TEXT NOT NULL, station_id TEXT NOT NULL, kind TEXT NOT NULL,   -- whot | ludo
  p1 INTEGER NOT NULL, p2 INTEGER, stake INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL,                       -- waiting | active | finished | cancelled
  state TEXT, turn_user INTEGER, winner INTEGER, result TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, deadline_at INTEGER
);
CREATE INDEX IF NOT EXISTS ix_match_station ON game_matches(venue_id, station_id, status);
CREATE INDEX IF NOT EXISTS ix_match_p1 ON game_matches(p1, status);
CREATE INDEX IF NOT EXISTS ix_match_p2 ON game_matches(p2, status);
CREATE TABLE IF NOT EXISTS game_players (        -- seats at a table (2 for Whot, 2 to 4 for Ludo); out=1 once someone has resigned/timed out of an active game
  match_id INTEGER NOT NULL, user_id INTEGER NOT NULL, seat INTEGER NOT NULL, out INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (match_id, user_id)
);
CREATE INDEX IF NOT EXISTS ix_gp_user ON game_players(user_id);
CREATE TABLE IF NOT EXISTS game_scores (
  week INTEGER NOT NULL, kind TEXT NOT NULL, user_id INTEGER NOT NULL, wins INTEGER NOT NULL DEFAULT 0, losses INTEGER NOT NULL DEFAULT 0, draws INTEGER NOT NULL DEFAULT 0, points INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (week, kind, user_id)
);

-- ---- cars + homes social (phase 2)
CREATE TABLE IF NOT EXISTS player_cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, model TEXT NOT NULL, paid INTEGER NOT NULL, bought_at INTEGER NOT NULL, active INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS ix_cars_user ON player_cars(user_id);
CREATE TABLE IF NOT EXISTS house_loves (
  property_id TEXT NOT NULL, user_id INTEGER NOT NULL, day TEXT NOT NULL, created_at INTEGER NOT NULL, PRIMARY KEY (property_id, user_id, day)
);
CREATE TABLE IF NOT EXISTS room_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT, property_id TEXT NOT NULL, user_id INTEGER NOT NULL, username TEXT NOT NULL, kind TEXT NOT NULL, text TEXT, created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_room_events ON room_events(property_id, id);
`;

/** Add columns to databases created by earlier versions (CREATE TABLE IF NOT EXISTS never alters an existing table). Idempotent. */
export function migrate(db) {
  const cols = (t) => db.prepare(`PRAGMA table_info(${t})`).all().map(c => c.name);
  const add = (t, c, def) => { if (!cols(t).includes(c)) db.exec(`ALTER TABLE ${t} ADD COLUMN ${c} ${def}`); };
  add('property_items', 'x', 'INTEGER NOT NULL DEFAULT 0'); add('property_items', 'z', 'INTEGER NOT NULL DEFAULT 0'); add('property_items', 'rot', 'INTEGER NOT NULL DEFAULT 0');
  add('users', 'chat_muted_until', 'INTEGER NOT NULL DEFAULT 0');
  add('property_owner', 'name_hidden', 'INTEGER NOT NULL DEFAULT 0'); add('property_owner', 'wall_color', "TEXT NOT NULL DEFAULT 'cream'"); add('property_owner', 'floor_color', "TEXT NOT NULL DEFAULT 'oak'");
  add('player_state', 'mood', 'REAL NOT NULL DEFAULT 60');
}
