-- 0024: gun shop ownership + bodyguard hire contracts. Mirrors later-schema.js (n: 24).
CREATE TABLE IF NOT EXISTS guns_owned (user_id BIGINT NOT NULL, item_id TEXT NOT NULL, price_paid BIGINT NOT NULL, bought_at BIGINT NOT NULL, PRIMARY KEY (user_id, item_id));
CREATE TABLE IF NOT EXISTS guns_equipped (user_id BIGINT PRIMARY KEY, item_id TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS ix_guns_item ON guns_owned(item_id);
CREATE TABLE IF NOT EXISTS bodyguards (user_id BIGINT PRIMARY KEY, plan TEXT NOT NULL, paid BIGINT NOT NULL, hired_at BIGINT NOT NULL, until_at BIGINT NOT NULL, name TEXT NOT NULL);
