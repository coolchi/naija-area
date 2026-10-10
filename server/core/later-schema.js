// Tables added AFTER the frozen Postgres baseline (0001). Each chunk here has a matching hand-written file in server/migrations/pg/NNNN_name.sql
// (tests/later-schema.test.js checks the pairing, and the Postgres parity test checks the columns). SQLite creates them idempotently at start (migrate()).
export const LATER = [
  { n: 2, name: 'wearables', sql: `
CREATE TABLE IF NOT EXISTS wearables_owned (user_id INTEGER NOT NULL, item_id TEXT NOT NULL, price_paid INTEGER NOT NULL, bought_at INTEGER NOT NULL, PRIMARY KEY (user_id, item_id));
CREATE TABLE IF NOT EXISTS wearables_equipped (user_id INTEGER NOT NULL, slot TEXT NOT NULL, item_id TEXT NOT NULL, PRIMARY KEY (user_id, slot));
CREATE INDEX IF NOT EXISTS ix_wearables_item ON wearables_owned(item_id);` },
  { n: 3, name: 'signup_office', sql: `
CREATE TABLE IF NOT EXISTS signup_profiles (user_id INTEGER PRIMARY KEY, home_city TEXT, interest_city TEXT, interests TEXT NOT NULL DEFAULT '[]', skipped INTEGER NOT NULL DEFAULT 0, completed_at INTEGER NOT NULL, updated_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS applications (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, role TEXT NOT NULL, skills TEXT NOT NULL DEFAULT '', message TEXT NOT NULL, contact TEXT, contact_ok INTEGER NOT NULL DEFAULT 0, city_id TEXT, status TEXT NOT NULL DEFAULT 'new', note TEXT NOT NULL DEFAULT '', created_at INTEGER NOT NULL, reviewed_at INTEGER);
CREATE INDEX IF NOT EXISTS ix_applications_status ON applications(status, id);
CREATE INDEX IF NOT EXISTS ix_applications_user ON applications(user_id, id);
CREATE TABLE IF NOT EXISTS office_ideas (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, role TEXT NOT NULL, category TEXT NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, why TEXT NOT NULL DEFAULT '', priority INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'new', note TEXT NOT NULL DEFAULT '', exported_at INTEGER, created_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS ix_office_ideas_status ON office_ideas(status, id);
CREATE INDEX IF NOT EXISTS ix_office_ideas_user ON office_ideas(user_id, id);` },
  { n: 4, name: 'account_deletions', sql: `
CREATE TABLE IF NOT EXISTS account_deletions (user_id INTEGER PRIMARY KEY, deleted_at INTEGER NOT NULL, was_guest INTEGER NOT NULL DEFAULT 0, forfeited INTEGER NOT NULL DEFAULT 0, kept TEXT NOT NULL DEFAULT '');` },
  { n: 5, name: 'businesses', sql: `
CREATE TABLE IF NOT EXISTS businesses (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, type TEXT NOT NULL, city_id TEXT NOT NULL, name TEXT NOT NULL, level INTEGER NOT NULL DEFAULT 1, paid INTEGER NOT NULL, bought_at INTEGER NOT NULL, settled_at INTEGER NOT NULL, accrued_gross INTEGER NOT NULL DEFAULT 0, accrued_costs INTEGER NOT NULL DEFAULT 0, day TEXT NOT NULL DEFAULT '', day_net INTEGER NOT NULL DEFAULT 0, earned_total INTEGER NOT NULL DEFAULT 0, UNIQUE (user_id, type));
CREATE INDEX IF NOT EXISTS ix_businesses_user ON businesses(user_id);
CREATE TABLE IF NOT EXISTS business_staff (id INTEGER PRIMARY KEY AUTOINCREMENT, business_id INTEGER NOT NULL, name TEXT NOT NULL, skill INTEGER NOT NULL, wage INTEGER NOT NULL, hired_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS ix_business_staff_biz ON business_staff(business_id);` },
  { n: 6, name: 'market', sql: `
CREATE TABLE IF NOT EXISTS market_listings (id INTEGER PRIMARY KEY AUTOINCREMENT, seller_id INTEGER NOT NULL, kind TEXT NOT NULL, item_ref TEXT NOT NULL, snapshot TEXT NOT NULL, ask INTEGER NOT NULL, base_value INTEGER NOT NULL, listing_fee INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'open', created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL, buyer_id INTEGER, sold_at INTEGER, sale_fee INTEGER NOT NULL DEFAULT 0, returned_at INTEGER);
CREATE INDEX IF NOT EXISTS ix_market_open ON market_listings(status, kind, ask);
CREATE INDEX IF NOT EXISTS ix_market_seller ON market_listings(seller_id, status);
CREATE INDEX IF NOT EXISTS ix_market_buyer ON market_listings(buyer_id);` },
  { n: 7, name: 'clubs', sql: `
CREATE TABLE IF NOT EXISTS clubs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, name_key TEXT NOT NULL UNIQUE, tag TEXT NOT NULL, kind TEXT NOT NULL DEFAULT 'club', motto TEXT NOT NULL DEFAULT '', color TEXT NOT NULL, is_open INTEGER NOT NULL DEFAULT 1, leader_id INTEGER NOT NULL, created_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS club_members (user_id INTEGER PRIMARY KEY, club_id INTEGER NOT NULL, role TEXT NOT NULL, joined_at INTEGER NOT NULL, muted_until INTEGER NOT NULL DEFAULT 0, hangout_at INTEGER NOT NULL DEFAULT 0);
CREATE INDEX IF NOT EXISTS ix_club_members_club ON club_members(club_id);
CREATE TABLE IF NOT EXISTS club_requests (club_id INTEGER NOT NULL, user_id INTEGER NOT NULL, kind TEXT NOT NULL, created_at INTEGER NOT NULL, invited_by INTEGER, PRIMARY KEY (club_id, user_id));
CREATE INDEX IF NOT EXISTS ix_club_requests_user ON club_requests(user_id);
CREATE TABLE IF NOT EXISTS club_chat (id INTEGER PRIMARY KEY AUTOINCREMENT, club_id INTEGER NOT NULL, user_id INTEGER NOT NULL, username TEXT NOT NULL, text TEXT NOT NULL, created_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS ix_club_chat_club ON club_chat(club_id, id);
CREATE TABLE IF NOT EXISTS club_cooldowns (user_id INTEGER PRIMARY KEY, until_ms INTEGER NOT NULL);` }
];
export function applyLater(db) { for (const c of LATER) db.exec(c.sql); }
