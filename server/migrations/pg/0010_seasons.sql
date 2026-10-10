-- 0010: seasons: the prizes and badges awarded when a season ends, and a note that a season has been settled. Mirrors later-schema.js (n: 10).
CREATE TABLE IF NOT EXISTS season_awards (season BIGINT NOT NULL, board TEXT NOT NULL, user_id BIGINT NOT NULL, place BIGINT NOT NULL, score BIGINT NOT NULL, prize BIGINT NOT NULL DEFAULT 0, awarded_at BIGINT NOT NULL, PRIMARY KEY (season, board, user_id));
CREATE INDEX IF NOT EXISTS ix_season_awards_user ON season_awards(user_id, season);
CREATE TABLE IF NOT EXISTS season_settled (season BIGINT PRIMARY KEY, settled_at BIGINT NOT NULL);
