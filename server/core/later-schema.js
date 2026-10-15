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
CREATE TABLE IF NOT EXISTS season_settled (season INTEGER PRIMARY KEY, settled_at INTEGER NOT NULL);` },
  { n: 11, name: 'businesses', sql: `
CREATE TABLE IF NOT EXISTS businesses (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, type TEXT NOT NULL, city_id TEXT NOT NULL, name TEXT NOT NULL, level INTEGER NOT NULL DEFAULT 1, paid INTEGER NOT NULL, bought_at INTEGER NOT NULL, settled_at INTEGER NOT NULL, accrued_gross INTEGER NOT NULL DEFAULT 0, accrued_costs INTEGER NOT NULL DEFAULT 0, day TEXT NOT NULL DEFAULT '', day_net INTEGER NOT NULL DEFAULT 0, earned_total INTEGER NOT NULL DEFAULT 0, UNIQUE (user_id, type));
CREATE INDEX IF NOT EXISTS ix_businesses_user ON businesses(user_id);
CREATE TABLE IF NOT EXISTS business_staff (id INTEGER PRIMARY KEY AUTOINCREMENT, business_id INTEGER NOT NULL, name TEXT NOT NULL, skill INTEGER NOT NULL, wage INTEGER NOT NULL, hired_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS ix_business_staff_biz ON business_staff(business_id);` },
  { n: 12, name: 'market', sql: `
CREATE TABLE IF NOT EXISTS market_listings (id INTEGER PRIMARY KEY AUTOINCREMENT, seller_id INTEGER NOT NULL, kind TEXT NOT NULL, item_ref TEXT NOT NULL, snapshot TEXT NOT NULL, ask INTEGER NOT NULL, base_value INTEGER NOT NULL, listing_fee INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'open', created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL, buyer_id INTEGER, sold_at INTEGER, sale_fee INTEGER NOT NULL DEFAULT 0, returned_at INTEGER);
CREATE INDEX IF NOT EXISTS ix_market_open ON market_listings(status, kind, ask);
CREATE INDEX IF NOT EXISTS ix_market_seller ON market_listings(seller_id, status);
CREATE INDEX IF NOT EXISTS ix_market_buyer ON market_listings(buyer_id);` },
  { n: 13, name: 'clubs', sql: `
CREATE TABLE IF NOT EXISTS clubs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, name_key TEXT NOT NULL UNIQUE, tag TEXT NOT NULL, kind TEXT NOT NULL DEFAULT 'club', motto TEXT NOT NULL DEFAULT '', color TEXT NOT NULL, is_open INTEGER NOT NULL DEFAULT 1, leader_id INTEGER NOT NULL, created_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS club_members (user_id INTEGER PRIMARY KEY, club_id INTEGER NOT NULL, role TEXT NOT NULL, joined_at INTEGER NOT NULL, muted_until INTEGER NOT NULL DEFAULT 0, hangout_at INTEGER NOT NULL DEFAULT 0);
CREATE INDEX IF NOT EXISTS ix_club_members_club ON club_members(club_id);
CREATE TABLE IF NOT EXISTS club_requests (club_id INTEGER NOT NULL, user_id INTEGER NOT NULL, kind TEXT NOT NULL, created_at INTEGER NOT NULL, invited_by INTEGER, PRIMARY KEY (club_id, user_id));
CREATE INDEX IF NOT EXISTS ix_club_requests_user ON club_requests(user_id);
CREATE TABLE IF NOT EXISTS club_chat (id INTEGER PRIMARY KEY AUTOINCREMENT, club_id INTEGER NOT NULL, user_id INTEGER NOT NULL, username TEXT NOT NULL, text TEXT NOT NULL, created_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS ix_club_chat_club ON club_chat(club_id, id);
CREATE TABLE IF NOT EXISTS club_cooldowns (user_id INTEGER PRIMARY KEY, until_ms INTEGER NOT NULL);` },
  { n: 14, name: 'events', sql: `
CREATE TABLE IF NOT EXISTS event_stock (event_key TEXT NOT NULL, item_id TEXT NOT NULL, sold INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (event_key, item_id));
CREATE TABLE IF NOT EXISTS event_buys (user_id INTEGER NOT NULL, event_key TEXT NOT NULL, item_id TEXT NOT NULL, qty INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (user_id, event_key, item_id));
CREATE TABLE IF NOT EXISTS event_claims (user_id INTEGER NOT NULL, event_key TEXT NOT NULL, claimed_at INTEGER NOT NULL, amount INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (user_id, event_key));` },
  { n: 15, name: 'pass_skins', sql: `
CREATE TABLE IF NOT EXISTS skins_owned (user_id INTEGER NOT NULL, skin_id TEXT NOT NULL, how TEXT NOT NULL, price_paid INTEGER NOT NULL DEFAULT 0, acquired_at INTEGER NOT NULL, PRIMARY KEY (user_id, skin_id));
CREATE TABLE IF NOT EXISTS skins_equipped (user_id INTEGER NOT NULL, slot TEXT NOT NULL, skin_id TEXT NOT NULL, PRIMARY KEY (user_id, slot));
CREATE TABLE IF NOT EXISTS pass_progress (user_id INTEGER NOT NULL, season TEXT NOT NULL, xp INTEGER NOT NULL DEFAULT 0, premium INTEGER NOT NULL DEFAULT 0, premium_at INTEGER, cash_claimed INTEGER NOT NULL DEFAULT 0, login_day TEXT, PRIMARY KEY (user_id, season));
CREATE TABLE IF NOT EXISTS pass_claims (user_id INTEGER NOT NULL, season TEXT NOT NULL, tier INTEGER NOT NULL, track TEXT NOT NULL, claimed_at INTEGER NOT NULL, PRIMARY KEY (user_id, season, tier, track));
CREATE TABLE IF NOT EXISTS pass_xp_log (user_id INTEGER NOT NULL, day TEXT NOT NULL, source TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0, xp INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (user_id, day, source));` }
  ,{ n: 16, name: 'ad_placement', sql: `
CREATE TABLE IF NOT EXISTS ad_campaign_creatives (campaign_id INTEGER NOT NULL, creative_id INTEGER NOT NULL, position INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'pending', reject_reason TEXT, gross INTEGER NOT NULL DEFAULT 0, valid INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL, decided_at INTEGER, PRIMARY KEY (campaign_id, creative_id));
CREATE INDEX IF NOT EXISTS ix_acc_creative ON ad_campaign_creatives(creative_id);` }
  ,{ n: 18, name: 'treasures', sql: `
CREATE TABLE IF NOT EXISTS treasure_claims (treasure_id TEXT PRIMARY KEY, user_id INTEGER NOT NULL, amount INTEGER NOT NULL, claimed_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS ix_treasure_claims_user ON treasure_claims(user_id);` }
  ,{ n: 20, name: 'referrals', sql: `
CREATE TABLE IF NOT EXISTS referral_codes (user_id INTEGER PRIMARY KEY, code TEXT NOT NULL UNIQUE, created_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS referral_edges (user_id INTEGER PRIMARY KEY, parent_id INTEGER NOT NULL, created_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS ix_referral_edges_parent ON referral_edges(parent_id);
CREATE TABLE IF NOT EXISTS referral_payouts (id INTEGER PRIMARY KEY AUTOINCREMENT, beneficiary_id INTEGER NOT NULL, source_user_id INTEGER NOT NULL, level INTEGER NOT NULL, amount INTEGER NOT NULL, created_at INTEGER NOT NULL, UNIQUE (beneficiary_id, source_user_id, level));
CREATE INDEX IF NOT EXISTS ix_referral_payouts_ben ON referral_payouts(beneficiary_id);
CREATE TABLE IF NOT EXISTS referral_invites (id INTEGER PRIMARY KEY AUTOINCREMENT, inviter_id INTEGER NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL UNIQUE, status TEXT NOT NULL DEFAULT 'pending', created_at INTEGER NOT NULL, accepted_at INTEGER, accepted_user_id INTEGER);
CREATE INDEX IF NOT EXISTS ix_referral_invites_inviter ON referral_invites(inviter_id, id);` }
  ,{ n: 24, name: 'guns_bodyguards', sql: `
CREATE TABLE IF NOT EXISTS guns_owned (user_id INTEGER NOT NULL, item_id TEXT NOT NULL, price_paid INTEGER NOT NULL, bought_at INTEGER NOT NULL, PRIMARY KEY (user_id, item_id));
CREATE TABLE IF NOT EXISTS guns_equipped (user_id INTEGER PRIMARY KEY, item_id TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS ix_guns_item ON guns_owned(item_id);
CREATE TABLE IF NOT EXISTS bodyguards (user_id INTEGER PRIMARY KEY, plan TEXT NOT NULL, paid INTEGER NOT NULL, hired_at INTEGER NOT NULL, until_at INTEGER NOT NULL, name TEXT NOT NULL);` }
  ,{ n: 27, name: 'police', sql: `
CREATE TABLE IF NOT EXISTS police_evidence (id INTEGER PRIMARY KEY AUTOINCREMENT, attacker_id INTEGER NOT NULL, victim_id INTEGER NOT NULL, kind TEXT NOT NULL, amount INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS ix_police_evidence_pair ON police_evidence(attacker_id, victim_id, expires_at);
CREATE TABLE IF NOT EXISTS police_cases (id INTEGER PRIMARY KEY AUTOINCREMENT, reporter_id INTEGER NOT NULL, accused_id INTEGER NOT NULL, reason TEXT NOT NULL, detail TEXT NOT NULL DEFAULT '', evidence_id INTEGER, created_at INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'logged');
CREATE INDEX IF NOT EXISTS ix_police_cases_reporter ON police_cases(reporter_id, id);
CREATE INDEX IF NOT EXISTS ix_police_cases_accused ON police_cases(accused_id, id);
CREATE TABLE IF NOT EXISTS police_holds (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, reason TEXT NOT NULL, charge INTEGER NOT NULL DEFAULT 0, reporter_id INTEGER, status TEXT NOT NULL DEFAULT 'held', held_at INTEGER NOT NULL, until_at INTEGER NOT NULL, auto INTEGER NOT NULL DEFAULT 0, released_at INTEGER, released_by INTEGER, release_how TEXT);
CREATE INDEX IF NOT EXISTS ix_police_holds_user ON police_holds(user_id, status, until_at);
CREATE INDEX IF NOT EXISTS ix_police_holds_active ON police_holds(status, until_at);` }
];
// 16 (ad placement, 11 Oct 2026) also adds the column ad_campaigns.placement ('shared' | 'exclusive'): SQLite: migrate() in schema.js; Postgres: ALTER in 0016_ad_placement.sql.
// Campaigns that existed before get one design row each from migrate() (SQLite) / the same INSERT in 0016 (Postgres).
export const AD_PLACEMENT_BACKFILL = `INSERT OR IGNORE INTO ad_campaign_creatives(campaign_id, creative_id, position, status, created_at)
  SELECT id, creative_id, 0, CASE WHEN status IN ('approved','scheduled','live','completed') THEN 'approved' WHEN status='rejected' THEN 'rejected' ELSE 'pending' END, created_at FROM ad_campaigns`;
export function applyLater(db) { for (const c of LATER) db.exec(c.sql); }
