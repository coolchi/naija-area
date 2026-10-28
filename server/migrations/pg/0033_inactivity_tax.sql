-- 0033: inactivity tax (1% of cash + bank per full day away past 24 h; net worth under ₦1M exempt). One row per (player, away stretch, day): never charged twice.
CREATE TABLE IF NOT EXISTS inactivity_tax_charges (
  user_id BIGINT NOT NULL,
  away_from BIGINT NOT NULL,
  n BIGINT NOT NULL,
  amount BIGINT NOT NULL,
  net_worth BIGINT NOT NULL,
  from_cash BIGINT NOT NULL DEFAULT 0,
  from_bank BIGINT NOT NULL DEFAULT 0,
  charged_at BIGINT NOT NULL,
  notified BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, away_from, n)
);
CREATE INDEX IF NOT EXISTS ix_inactivity_tax_notice ON inactivity_tax_charges(user_id, notified);
