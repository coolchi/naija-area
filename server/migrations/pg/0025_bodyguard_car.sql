-- 0025: optional Black G-Wagon escort on an HD bodyguard hire (+carFee once).
ALTER TABLE bodyguards ADD COLUMN IF NOT EXISTS with_car BIGINT NOT NULL DEFAULT 0;
