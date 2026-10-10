-- 0020: skins shop and battle pass: owned and worn skins, season progress, tier claims, daily XP log. Mirrors later-schema.js (n: 20).
CREATE TABLE IF NOT EXISTS skins_owned (user_id BIGINT NOT NULL, skin_id TEXT NOT NULL, how TEXT NOT NULL, price_paid BIGINT NOT NULL DEFAULT 0, acquired_at BIGINT NOT NULL, PRIMARY KEY (user_id, skin_id));
CREATE TABLE IF NOT EXISTS skins_equipped (user_id BIGINT NOT NULL, slot TEXT NOT NULL, skin_id TEXT NOT NULL, PRIMARY KEY (user_id, slot));
CREATE TABLE IF NOT EXISTS pass_progress (user_id BIGINT NOT NULL, season TEXT NOT NULL, xp BIGINT NOT NULL DEFAULT 0, premium BIGINT NOT NULL DEFAULT 0, premium_at BIGINT, cash_claimed BIGINT NOT NULL DEFAULT 0, login_day TEXT, PRIMARY KEY (user_id, season));
CREATE TABLE IF NOT EXISTS pass_claims (user_id BIGINT NOT NULL, season TEXT NOT NULL, tier BIGINT NOT NULL, track TEXT NOT NULL, claimed_at BIGINT NOT NULL, PRIMARY KEY (user_id, season, tier, track));
CREATE TABLE IF NOT EXISTS pass_xp_log (user_id BIGINT NOT NULL, day TEXT NOT NULL, source TEXT NOT NULL, n BIGINT NOT NULL DEFAULT 0, xp BIGINT NOT NULL DEFAULT 0, PRIMARY KEY (user_id, day, source));
