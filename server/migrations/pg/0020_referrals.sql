-- 0020: 3-level referral codes, edges, payouts, and email invites. Mirrors later-schema.js (n: 20).
CREATE TABLE IF NOT EXISTS referral_codes (user_id BIGINT PRIMARY KEY, code TEXT NOT NULL UNIQUE, created_at BIGINT NOT NULL);
CREATE TABLE IF NOT EXISTS referral_edges (user_id BIGINT PRIMARY KEY, parent_id BIGINT NOT NULL, created_at BIGINT NOT NULL);
CREATE INDEX IF NOT EXISTS ix_referral_edges_parent ON referral_edges(parent_id);
CREATE TABLE IF NOT EXISTS referral_payouts (id BIGSERIAL PRIMARY KEY, beneficiary_id BIGINT NOT NULL, source_user_id BIGINT NOT NULL, level BIGINT NOT NULL, amount BIGINT NOT NULL, created_at BIGINT NOT NULL, UNIQUE (beneficiary_id, source_user_id, level));
CREATE INDEX IF NOT EXISTS ix_referral_payouts_ben ON referral_payouts(beneficiary_id);
CREATE TABLE IF NOT EXISTS referral_invites (id BIGSERIAL PRIMARY KEY, inviter_id BIGINT NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL UNIQUE, status TEXT NOT NULL DEFAULT 'pending', created_at BIGINT NOT NULL, accepted_at BIGINT, accepted_user_id BIGINT);
CREATE INDEX IF NOT EXISTS ix_referral_invites_inviter ON referral_invites(inviter_id, id);
