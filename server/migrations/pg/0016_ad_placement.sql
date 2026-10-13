-- 0016: ad placement (exclusive vs shared) and several designs (creatives) per campaign. Mirrors later-schema.js (n: 16) and migrate() in schema.js.
ALTER TABLE ad_campaigns ADD COLUMN IF NOT EXISTS placement TEXT NOT NULL DEFAULT 'shared';
CREATE TABLE IF NOT EXISTS ad_campaign_creatives (campaign_id BIGINT NOT NULL, creative_id BIGINT NOT NULL, position BIGINT NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'pending', reject_reason TEXT, gross BIGINT NOT NULL DEFAULT 0, valid BIGINT NOT NULL DEFAULT 0, created_at BIGINT NOT NULL, decided_at BIGINT, PRIMARY KEY (campaign_id, creative_id));
CREATE INDEX IF NOT EXISTS ix_acc_creative ON ad_campaign_creatives(creative_id);
-- campaigns that existed before get one design row each (the creative they already had)
INSERT INTO ad_campaign_creatives(campaign_id, creative_id, position, status, created_at)
  SELECT id, creative_id, 0, CASE WHEN status IN ('approved','scheduled','live','completed') THEN 'approved' WHEN status='rejected' THEN 'rejected' ELSE 'pending' END, created_at FROM ad_campaigns
  ON CONFLICT (campaign_id, creative_id) DO NOTHING;
