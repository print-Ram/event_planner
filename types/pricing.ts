export type PricingType = 'fixed' | 'per_guest' | 'addon';

export interface PackageTier {
  id: string;
  name: 'Essential' | 'Premium' | 'Luxury' | 'Custom' | string;
  tagline: string;
  description: string;
  base_price: number | null;
  minimum_amount: number | null;
  features: string[];
  active: boolean;
  display_order: number;
}

export interface PricingRule {
  id: string;
  service_id?: string | null;
  service_key: string;
  label: string;
  pricing_type: PricingType;
  amount: number;
  minimum_quantity?: number;
  maximum_quantity?: number;
  active: boolean;
}

export interface EstimateLineItem {
  label: string;
  type: 'package' | 'service' | 'guest' | 'tax' | 'discount';
  amount: number;
}

export interface EstimateBreakdown {
  configured: boolean;
  items: EstimateLineItem[];
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  estimated_minimum: number | null;
  estimated_maximum: number | null;
  display_label: string;
}

export interface EstimateRecord {
  id: string;
  enquiry_id?: string;
  customer_name?: string;
  email?: string;
  phone?: string;
  event_type: string;
  event_date?: string;
  location?: string;
  guest_count: number;
  package_id: string;
  package_name: string;
  selected_services: string[];
  notes?: string;
  pricing_breakdown: EstimateBreakdown;
  estimated_minimum: number | null;
  estimated_maximum: number | null;
  created_at: string;
}
