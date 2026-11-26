import type { BusinessSettings } from '@/types/database';

export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  id: 'default',
  business_name: 'Sri Ram Events',
  tagline: 'Thoughtfully planned. Beautifully celebrated.',
  logo_url: '/sri-ram-logo.png',
  monogram: 'SR',
  email: 'contact@sriramevents.com',
  phone: '+91 95025 59333',
  whatsapp: '919502559333',
  instagram_handle: '@sriram.events_',
  instagram_url: 'https://www.instagram.com/sriram.events_/',
  instagram_enabled: true,
  instagram_columns: 3,
  announcement_enabled: true,
  announcement_text:
    'Now accepting bespoke wedding & celebration bookings across Andhra Pradesh · Main Studio: Madanapalle',
  location: 'Madanapalle, Andhra Pradesh, India',
  currency: 'INR',
  currency_symbol: '₹',
  timezone: 'Asia/Kolkata',
  service_areas: 'Madanapalle (Main Branch), Tirupati, Punganur, Kothakota & across Andhra Pradesh',
  about_story:
    'Rooted in Madanapalle and serving families and organisations across Tirupati, Punganur, Kothakota, and Andhra Pradesh, Sri Ram Events is a bespoke event planning and design studio dedicated to purposeful, warm, and impeccably executed celebrations. Every gathering is shaped around your story—balancing refined contemporary styling with deep respect for cultural ritual and hospitality.',
  about_philosophy:
    'We believe extraordinary events begin with calm, transparent planning. Rather than relying on repetitive templates, our studio curates tailored floral compositions, architectural lighting, and seamless guest experiences so hosts can remain fully present with the people who matter most.',
  booking_policy:
    'All booking requests undergo manual studio review to verify venue logistics, floral sourcing, and team availability. Preferred dates are provisionally held only after our studio confirms availability and formal approval is issued.',
  cancellation_policy:
    'Cancellations or date rescheduling requests must be communicated in writing at the earliest opportunity. Any non-recoverable vendor commitments or custom fabrication deposits incurred prior to cancellation are adjusted transparently per the agreed quotation.',
  privacy_policy:
    'Sri Ram Events collects contact details, event dates, location preferences, and requirement notes solely to prepare customised quotations, check date availability, and coordinate your celebration. Customer records are never sold or shared with unrelated third parties. Event photographs are published in our portfolio only with host permission.',
  terms_policy:
    'All online cost estimates are indicative guides based on selected tiers and guest counts. Final commercial quotations are issued after venue inspection and scope confirmation. Preferred dates submitted via the booking form remain Pending until reviewed and confirmed by Sri Ram Events.',
  tax_percentage: 0,
  discount_enabled: false,
  discount_percentage: 0,
  updated_at: '2026-01-01T00:00:00.000Z',
};
