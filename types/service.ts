export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  description: string;
  image_url: string;
  whats_included: string[];
  optional_addons: string[];
  starting_price?: number | null;
  typical_duration?: string;
  active: boolean;
  featured: boolean;
  display_order: number;
  created_at: string;
}
