-- Database Schema SQL - Run these queries in Supabase SQL editor

-- 1. Users table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  department VARCHAR(100),
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 2. Products/Inventory table
CREATE TABLE IF NOT EXISTS public.products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  sku VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  category VARCHAR(100),
  unit_price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  reorder_level INTEGER DEFAULT 10,
  unit VARCHAR(50) NOT NULL DEFAULT 'PCS',
  supplier VARCHAR(255),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_name ON public.products(name);
CREATE INDEX idx_products_sku ON public.products(sku);
CREATE INDEX idx_products_category ON public.products(category);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert products" ON public.products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 3. Customers table
CREATE TABLE IF NOT EXISTS public.customers (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  company_name VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  registered_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_customers_email ON public.customers(email);
CREATE INDEX idx_customers_name ON public.customers(name);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers are viewable by authenticated users" ON public.customers
  FOR SELECT USING (auth.role() = 'authenticated');

-- 4. Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id BIGSERIAL PRIMARY KEY,
  order_number VARCHAR(100) NOT NULL UNIQUE,
  customer_id BIGINT NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  total_amount DECIMAL(12, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  order_date DATE NOT NULL,
  delivery_date DATE,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_number ON public.orders(order_number);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_date ON public.orders(order_date);
CREATE INDEX idx_orders_customer ON public.orders(customer_id);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Orders are viewable by authenticated users" ON public.orders
  FOR SELECT USING (auth.role() = 'authenticated');

-- 5. Order Items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_order_items_product ON public.order_items(product_id);

-- 6. Invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
  id BIGSERIAL PRIMARY KEY,
  invoice_number VARCHAR(100) NOT NULL UNIQUE,
  order_id BIGINT REFERENCES public.orders(id),
  customer_id BIGINT NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  subtotal DECIMAL(12, 2) NOT NULL,
  tax_amount DECIMAL(12, 2) DEFAULT 0,
  discount_amount DECIMAL(12, 2) DEFAULT 0,
  total_amount DECIMAL(12, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'issued', 'paid', 'overdue', 'cancelled')),
  invoice_date DATE NOT NULL,
  due_date DATE,
  notes TEXT,
  ocr_data JSONB,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_invoices_number ON public.invoices(invoice_number);
CREATE INDEX idx_invoices_status ON public.invoices(status);
CREATE INDEX idx_invoices_date ON public.invoices(invoice_date);
CREATE INDEX idx_invoices_customer ON public.invoices(customer_id);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Invoices are viewable by authenticated users" ON public.invoices
  FOR SELECT USING (auth.role() = 'authenticated');

-- 7. Invoice Items table
CREATE TABLE IF NOT EXISTS public.invoice_items (
  id BIGSERIAL PRIMARY KEY,
  invoice_id BIGINT NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  description VARCHAR(500) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_invoice_items_invoice ON public.invoice_items(invoice_id);

-- 8. Payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id BIGSERIAL PRIMARY KEY,
  payment_number VARCHAR(100) NOT NULL UNIQUE,
  invoice_id BIGINT NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  order_id BIGINT REFERENCES public.orders(id),
  amount DECIMAL(12, 2) NOT NULL,
  payment_mode VARCHAR(50) NOT NULL CHECK (payment_mode IN ('cash', 'upi', 'bank', 'check', 'credit_card')),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_date DATE,
  reference_number VARCHAR(100),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_number ON public.payments(payment_number);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payments_invoice ON public.payments(invoice_id);
CREATE INDEX idx_payments_date ON public.payments(payment_date);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Payments are viewable by authenticated users" ON public.payments
  FOR SELECT USING (auth.role() = 'authenticated');

-- 9. Stock Movements table (for tracking in/out movements)
CREATE TABLE IF NOT EXISTS public.stock_movements (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  movement_type VARCHAR(50) NOT NULL CHECK (movement_type IN ('in', 'out', 'adjustment')),
  quantity INTEGER NOT NULL,
  reference_id BIGINT,
  reference_type VARCHAR(50),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_stock_movements_product ON public.stock_movements(product_id);
CREATE INDEX idx_stock_movements_date ON public.stock_movements(created_at);
CREATE INDEX idx_stock_movements_type ON public.stock_movements(movement_type);

-- 10. Invoice Storage bucket for OCR images
-- This is configured in Supabase dashboard: Storage > Create New Bucket > Name: "invoices"
-- Make it Public for serving images

-- 11. Create functions for auto-update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 12. View for Dashboard Stats
CREATE OR REPLACE VIEW public.dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM public.orders WHERE status = 'completed') as completed_orders,
  (SELECT SUM(total_amount) FROM public.orders WHERE status = 'completed') as total_revenue,
  (SELECT SUM(amount) FROM public.payments WHERE status = 'pending') as pending_payments,
  (SELECT COUNT(*) FROM public.products WHERE quantity <= reorder_level) as low_stock_count,
  (SELECT COUNT(*) FROM public.invoices WHERE status = 'pending') as pending_invoices;

-- 13. Function to auto-deduct stock on order creation
CREATE OR REPLACE FUNCTION public.deduct_stock_on_order()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.products
  SET quantity = quantity - NEW.quantity
  WHERE id = NEW.product_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER deduct_stock_trigger AFTER INSERT ON public.order_items
  FOR EACH ROW EXECUTE FUNCTION public.deduct_stock_on_order();
