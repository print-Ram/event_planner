-- Luxury Event Planning Website — Supabase PostgreSQL Schema & RLS
-- Run in Supabase SQL Editor or via `supabase db push`

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Profiles (Admin & Staff)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'staff', 'user')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Business Settings (Singleton Config Row)
CREATE TABLE IF NOT EXISTS public.business_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  business_name TEXT NOT NULL DEFAULT 'Sri Ram Events',
  tagline TEXT NOT NULL DEFAULT 'Thoughtfully planned. Beautifully celebrated.',
  logo_url TEXT NOT NULL DEFAULT '/sri-ram-logo.png',
  monogram TEXT NOT NULL DEFAULT 'SR',
  email TEXT NOT NULL DEFAULT 'contact@sriramevents.com',
  phone TEXT NOT NULL DEFAULT '+91 95025 59333',
  whatsapp TEXT NOT NULL DEFAULT '919502559333',
  instagram_handle TEXT NOT NULL DEFAULT '@sriram.events_',
  instagram_url TEXT NOT NULL DEFAULT 'https://www.instagram.com/sriram.events_/',
  instagram_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  instagram_columns INTEGER NOT NULL DEFAULT 3,
  announcement_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  announcement_text TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT 'Madanapalle, Andhra Pradesh, India',
  currency TEXT NOT NULL DEFAULT 'INR',
  currency_symbol TEXT NOT NULL DEFAULT '₹',
  timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  service_areas TEXT NOT NULL DEFAULT '',
  about_story TEXT NOT NULL DEFAULT '',
  about_philosophy TEXT NOT NULL DEFAULT '',
  booking_policy TEXT NOT NULL DEFAULT '',
  cancellation_policy TEXT NOT NULL DEFAULT '',
  privacy_policy TEXT NOT NULL DEFAULT '',
  terms_policy TEXT NOT NULL DEFAULT '',
  tax_percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
  discount_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  discount_percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Services
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  short_description TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  whats_included JSONB NOT NULL DEFAULT '[]'::jsonb,
  optional_addons JSONB NOT NULL DEFAULT '[]'::jsonb,
  starting_price NUMERIC(12,2),
  typical_duration TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Packages
CREATE TABLE IF NOT EXISTS public.packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  base_price NUMERIC(12,2),
  minimum_amount NUMERIC(12,2),
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0
);

-- 5. Pricing Rules
CREATE TABLE IF NOT EXISTS public.pricing_rules (
  id TEXT PRIMARY KEY,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  service_key TEXT NOT NULL,
  label TEXT NOT NULL,
  pricing_type TEXT NOT NULL CHECK (pricing_type IN ('fixed', 'per_guest', 'addon')),
  amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  minimum_quantity INTEGER,
  maximum_quantity INTEGER,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

-- 6. Enquiries
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date TEXT,
  location TEXT,
  guest_count INTEGER,
  budget TEXT,
  message TEXT,
  estimate_id UUID,
  estimate_summary TEXT,
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'In Progress', 'Quoted', 'Converted', 'Archived')),
  admin_notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Estimates
CREATE TABLE IF NOT EXISTS public.estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID REFERENCES public.enquiries(id) ON DELETE SET NULL,
  customer_name TEXT,
  email TEXT,
  phone TEXT,
  event_type TEXT NOT NULL,
  event_date TEXT,
  location TEXT,
  guest_count INTEGER NOT NULL,
  package_id TEXT NOT NULL,
  package_name TEXT NOT NULL,
  selected_services JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT,
  pricing_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
  estimated_minimum NUMERIC(12,2),
  estimated_maximum NUMERIC(12,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Bookings
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_reference TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  alternative_date DATE,
  location TEXT NOT NULL,
  guest_count INTEGER NOT NULL,
  package_id TEXT NOT NULL,
  package_name TEXT NOT NULL,
  selected_services JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT,
  estimate JSONB,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (
    status IN ('Pending', 'Under Review', 'Approved', 'Awaiting Deposit', 'Confirmed', 'Completed', 'Cancelled', 'Rejected')
  ),
  deposit_status TEXT NOT NULL DEFAULT 'Not Required' CHECK (deposit_status IN ('Not Required', 'Pending', 'Paid')),
  quoted_amount NUMERIC(12,2),
  admin_notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Portfolio Projects
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL,
  gallery_images JSONB NOT NULL DEFAULT '[]'::jsonb,
  video_url TEXT,
  location TEXT NOT NULL DEFAULT '',
  services_provided JSONB NOT NULL DEFAULT '[]'::jsonb,
  instagram_post_url TEXT,
  is_demo BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0
);

-- 10. Testimonials / Reviews
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  review_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  event_type TEXT NOT NULL,
  event_image TEXT,
  source_label TEXT,
  source_url TEXT,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Availability Calendar
CREATE TABLE IF NOT EXISTS public.availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL,
  start_time TEXT,
  end_time TEXT,
  status TEXT NOT NULL DEFAULT 'unavailable' CHECK (status IN ('available', 'unavailable', 'booked')),
  notes TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_services_active_order ON public.services (active, display_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_published_order ON public.portfolio_projects (published, display_order);
CREATE INDEX IF NOT EXISTS idx_bookings_event_date_status ON public.bookings (event_date, status);
CREATE INDEX IF NOT EXISTS idx_enquiries_status_created ON public.enquiries (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_availability_date ON public.availability (date);

-- Helper function for RLS admin check
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (Published content & non-sensitive availability)
CREATE POLICY "Public can read business settings" ON public.business_settings FOR SELECT USING (true);
CREATE POLICY "Public can read active services" ON public.services FOR SELECT USING (active = true OR public.is_admin());
CREATE POLICY "Public can read active packages" ON public.packages FOR SELECT USING (active = true OR public.is_admin());
CREATE POLICY "Public can read active pricing rules" ON public.pricing_rules FOR SELECT USING (active = true OR public.is_admin());
CREATE POLICY "Public can read published portfolio" ON public.portfolio_projects FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY "Public can read published testimonials" ON public.testimonials FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY "Public can read availability dates" ON public.availability FOR SELECT USING (true);

-- Public Insert Policies (Validated via server routes / RLS)
CREATE POLICY "Public can submit enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit estimates" ON public.estimates FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit booking requests" ON public.bookings FOR INSERT WITH CHECK (status = 'Pending');

-- Admin Full Access Policies
CREATE POLICY "Admins manage profiles" ON public.profiles FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage settings" ON public.business_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage services" ON public.services FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage packages" ON public.packages FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage pricing rules" ON public.pricing_rules FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage enquiries" ON public.enquiries FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage estimates" ON public.estimates FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage bookings" ON public.bookings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage portfolio" ON public.portfolio_projects FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage testimonials" ON public.testimonials FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage availability" ON public.availability FOR ALL USING (public.is_admin());
