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
  { n: 5, name: 'tutorial', sql: `
CREATE TABLE IF NOT EXISTS tutorial_state (user_id INTEGER PRIMARY KEY, start_x REAL NOT NULL, start_z REAL NOT NULL, acks TEXT NOT NULL DEFAULT '[]', skipped INTEGER NOT NULL DEFAULT 0, done_at INTEGER, reward INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL);` },
  { n: 6, name: 'missions', sql: `
CREATE TABLE IF NOT EXISTS login_days (user_id INTEGER NOT NULL, day INTEGER NOT NULL, PRIMARY KEY (user_id, day));
CREATE TABLE IF NOT EXISTS mission_claims (user_id INTEGER NOT NULL, mission_id TEXT NOT NULL, period INTEGER NOT NULL, reward INTEGER NOT NULL, claimed_at INTEGER NOT NULL, PRIMARY KEY (user_id, mission_id, period));
CREATE TABLE IF NOT EXISTS streak_claims (user_id INTEGER NOT NULL, day INTEGER NOT NULL, streak INTEGER NOT NULL, reward INTEGER NOT NULL, claimed_at INTEGER NOT NULL, PRIMARY KEY (user_id, day));` },
  { n: 7, name: 'achievements', sql: `
CREATE TABLE IF NOT EXISTS achievements (user_id INTEGER NOT NULL, id TEXT NOT NULL, earned_at INTEGER NOT NULL, PRIMARY KEY (user_id, id));
CREATE TABLE IF NOT EXISTS player_titles (user_id INTEGER PRIMARY KEY, title_id TEXT NOT NULL DEFAULT '', updated_at INTEGER NOT NULL);` },
  { n: 8, name: 'sanctions', sql: `
CREATE TABLE IF NOT EXISTS sanctions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, kind TEXT NOT NULL, reason TEXT NOT NULL, note TEXT NOT NULL DEFAULT '', until_at INTEGER, actor TEXT NOT NULL, report_ref TEXT, created_at INTEGER NOT NULL, lifted_at INTEGER, lifted_by TEXT);
CREATE INDEX IF NOT EXISTS ix_sanctions_user ON sanctions(user_id, id);
CREATE INDEX IF NOT EXISTS ix_sanctions_kind ON sanctions(kind, lifted_at);` },
  { n: 9, name: 'guardian', sql: `
CREATE TABLE IF NOT EXISTS guardian_settings (user_id INTEGER PRIMARY KEY, chat_mode TEXT NOT NULL DEFAULT 'all', max_stake INTEGER, transfers_off INTEGER NOT NULL DEFAULT 0, topup_daily_ngn INTEGER, play_limit_min INTEGER, curfew_start INTEGER, curfew_end INTEGER, break_every_min INTEGER, pin_hash TEXT, pin_fails INTEGER NOT NULL DEFAULT 0, pin_locked_until INTEGER NOT NULL DEFAULT 0, updated_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS guardian_play (user_id INTEGER NOT NULL, day INTEGER NOT NULL, ms INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (user_id, day));` },
  { n: 10, name: 'seasons', sql: `
CREATE TABLE IF NOT EXISTS season_awards (season INTEGER NOT NULL, board TEXT NOT NULL, user_id INTEGER NOT NULL, place INTEGER NOT NULL, score INTEGER NOT NULL, prize INTEGER NOT NULL DEFAULT 0, awarded_at INTEGER NOT NULL, PRIMARY KEY (season, board, user_id));
CREATE INDEX IF NOT EXISTS ix_season_awards_user ON season_awards(user_id, season);
CREATE TABLE IF NOT EXISTS season_settled (season INTEGER PRIMARY KEY, settled_at INTEGER NOT NULL);` }
];
export function applyLater(db) { for (const c of LATER) db.exec(c.sql); }
