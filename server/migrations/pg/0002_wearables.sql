-- 0002: jewelry store and cap store: what a player owns and what they wear (one item per slot). Mirrors later-schema.js (n: 2).
CREATE TABLE IF NOT EXISTS wearables_owned (user_id BIGINT NOT NULL, item_id TEXT NOT NULL, price_paid BIGINT NOT NULL, bought_at BIGINT NOT NULL, PRIMARY KEY (user_id, item_id));
CREATE TABLE IF NOT EXISTS wearables_equipped (user_id BIGINT NOT NULL, slot TEXT NOT NULL, item_id TEXT NOT NULL, PRIMARY KEY (user_id, slot));
CREATE INDEX IF NOT EXISTS ix_wearables_item ON wearables_owned(item_id);
