export type BookingStatus =
  | 'Pending'
  | 'Under Review'
  | 'Approved'
  | 'Awaiting Deposit'
  | 'Confirmed'
  | 'Completed'
  | 'Cancelled'
  | 'Rejected';

export type EnquiryStatus = 'New' | 'In Progress' | 'Quoted' | 'Converted' | 'Archived';

export type AvailabilityStatus = 'available' | 'unavailable' | 'booked';

export interface BusinessSettings {
  id: string;
  business_name: string;
  tagline: string;
  logo_url: string;
  monogram: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram_handle: string;
  instagram_url: string;
  instagram_enabled: boolean;
  instagram_columns: number;
  announcement_enabled: boolean;
  announcement_text: string;
  location: string;
  currency: string;
  currency_symbol: string;
  timezone: string;
  service_areas: string;
  about_story: string;
  about_philosophy: string;
  booking_policy: string;
  cancellation_policy: string;
  privacy_policy: string;
  terms_policy: string;
  tax_percentage: number;
  discount_enabled: boolean;
  discount_percentage: number;
  updated_at: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  cover_image: string;
  gallery_images: string[];
  video_url?: string;
  location: string;
  services_provided: string[];
  instagram_post_url?: string;
  is_demo?: boolean;
  published: boolean;
  display_order: number;
}

export interface TestimonialRecord {
  id: string;
  customer_name: string;
  review_text: string;
  rating?: number;
  event_type: string;
  event_image?: string;
  source_label?: string;
  source_url?: string;
  published: boolean;
  created_at: string;
}

export interface AvailabilitySlot {
  id: string;
  date: string; // YYYY-MM-DD
  start_time?: string;
  end_time?: string;
  status: AvailabilityStatus;
  notes?: string;
}

export interface InstagramPost {
  id: string;
  caption: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  is_fallback?: boolean;
}
