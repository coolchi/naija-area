-- 0004: record of closed accounts (the user row is kept but anonymised so the money ledger stays whole). Mirrors later-schema.js (n: 4).
CREATE TABLE IF NOT EXISTS account_deletions (user_id BIGINT PRIMARY KEY, deleted_at BIGINT NOT NULL, was_guest BIGINT NOT NULL DEFAULT 0, forfeited BIGINT NOT NULL DEFAULT 0, kept TEXT NOT NULL DEFAULT '');
