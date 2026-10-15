-- 0019: outside paint colour written on the house (hex from the wall palette, or null).
ALTER TABLE property_owner ADD COLUMN IF NOT EXISTS facade TEXT;
