-- 0022: NEPA blackout timer on each home (null = lights on).
ALTER TABLE property_owner ADD COLUMN IF NOT EXISTS power_dark_until BIGINT;
ALTER TABLE property_owner ADD COLUMN IF NOT EXISTS power_check_bucket BIGINT;
