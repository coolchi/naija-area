-- 0018: one-time treasure claims. One row per treasure, so only one player can take it.
CREATE TABLE IF NOT EXISTS treasure_claims (treasure_id TEXT PRIMARY KEY, user_id BIGINT NOT NULL, amount BIGINT NOT NULL, claimed_at BIGINT NOT NULL);
CREATE INDEX IF NOT EXISTS ix_treasure_claims_user ON treasure_claims(user_id);
