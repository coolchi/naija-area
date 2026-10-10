-- 0014: night events and festivals: limited stock, per-player purchase counts, once-per-event claims. Mirrors later-schema.js (n: 14).
CREATE TABLE IF NOT EXISTS event_stock (event_key TEXT NOT NULL, item_id TEXT NOT NULL, sold BIGINT NOT NULL DEFAULT 0, PRIMARY KEY (event_key, item_id));
CREATE TABLE IF NOT EXISTS event_buys (user_id BIGINT NOT NULL, event_key TEXT NOT NULL, item_id TEXT NOT NULL, qty BIGINT NOT NULL DEFAULT 0, PRIMARY KEY (user_id, event_key, item_id));
CREATE TABLE IF NOT EXISTS event_claims (user_id BIGINT NOT NULL, event_key TEXT NOT NULL, claimed_at BIGINT NOT NULL, amount BIGINT NOT NULL DEFAULT 0, PRIMARY KEY (user_id, event_key));
