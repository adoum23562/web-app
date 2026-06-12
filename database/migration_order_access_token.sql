-- Adds private order lookup tokens for existing Supabase databases.

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS access_token UUID NOT NULL DEFAULT uuid_generate_v4();

CREATE INDEX IF NOT EXISTS idx_orders_access_token ON orders(access_token);

DROP POLICY IF EXISTS "Customers can view own data" ON customers;
DROP POLICY IF EXISTS "Enable read access for all users" ON orders;
DROP POLICY IF EXISTS "Enable insert for all users" ON orders;
DROP POLICY IF EXISTS "Enable read access for all users" ON order_items;
DROP POLICY IF EXISTS "Enable insert for all users" ON order_items;
