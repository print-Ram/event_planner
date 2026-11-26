-- Initial seed data for Sri Ram Events (no fabricated reviews)
INSERT INTO public.business_settings (
  id, business_name, tagline, email, phone, whatsapp, instagram_handle, instagram_url,
  location, service_areas, announcement_text
) VALUES (
  'default',
  'Sri Ram Events',
  'Thoughtfully planned. Beautifully celebrated.',
  'contact@sriramevents.com',
  '+91 95025 59333',
  '919502559333',
  '@sriram.events_',
  'https://www.instagram.com/sriram.events_/',
  'Madanapalle, Andhra Pradesh, India',
  'Madanapalle (Main Branch), Tirupati, Punganur, Kothakota & across Andhra Pradesh',
  'Now accepting bespoke wedding & celebration bookings across Andhra Pradesh · Main Studio: Madanapalle'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.packages (id, name, tagline, description, base_price, minimum_amount, features, active, display_order)
VALUES
  ('essential', 'Essential', 'Thoughtful Styling & Core Execution', 'Ideal for intimate family ceremonies and milestone gatherings.', 25000, 20000, '["Concept moodboard & colour palette direction","Signature focal stage or ceremony backdrop","Welcome entrance styling & signage","Dedicated on-site setup supervisor"]'::jsonb, true, 1),
  ('premium', 'Premium', 'Cohesive Design & Hospitality Coordination', 'Our most requested tier for weddings, engagements, and family celebrations.', 65000, 55000, '["Custom architectural backdrop & fresh floral styling","Guest seating accents, aisle florals & ambient lighting","Vendor schedule & hospitality coordination","Dedicated lead planner & production crew"]'::jsonb, true, 2),
  ('luxury', 'Luxury', 'Full-Scale Bespoke Studio Production', 'Complete creative direction, multi-zone luxury decor, and white-glove hospitality.', 145000, 120000, '["End-to-end multi-day concept, spatial & floral direction","Bespoke mandapam / stage fabrication & chandelier lighting","Full vendor, artist, and guest hospitality management","Dedicated studio director & senior execution team"]'::jsonb, true, 3),
  ('custom', 'Custom', 'Tailored to Your Exact Brief', 'Bespoke scope assembled around your venue, cultural traditions, and preferred services.', NULL, NULL, '["Fully personalised moodboard & spatial blueprint","Flexible choice of decor, catering & production services","Transparent itemised quotation after consultation"]'::jsonb, true, 4)
ON CONFLICT (id) DO NOTHING;
