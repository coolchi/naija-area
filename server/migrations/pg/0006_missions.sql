-- 0006: login days, daily/weekly mission claims and login streak claims. Mirrors later-schema.js (n: 6).
CREATE TABLE IF NOT EXISTS login_days (user_id BIGINT NOT NULL, day BIGINT NOT NULL, PRIMARY KEY (user_id, day));
CREATE TABLE IF NOT EXISTS mission_claims (user_id BIGINT NOT NULL, mission_id TEXT NOT NULL, period BIGINT NOT NULL, reward BIGINT NOT NULL, claimed_at BIGINT NOT NULL, PRIMARY KEY (user_id, mission_id, period));
CREATE TABLE IF NOT EXISTS streak_claims (user_id BIGINT NOT NULL, day BIGINT NOT NULL, streak BIGINT NOT NULL, reward BIGINT NOT NULL, claimed_at BIGINT NOT NULL, PRIMARY KEY (user_id, day));
