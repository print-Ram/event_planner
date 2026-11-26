import type { BookingStatus, EnquiryStatus } from './database';
import type { EstimateBreakdown } from './pricing';

export interface EnquiryRecord {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date?: string;
  location?: string;
  guest_count?: number;
  budget?: string;
  message?: string;
  estimate_id?: string;
  estimate_summary?: string;
  status: EnquiryStatus;
  admin_notes?: string;
  created_at: string;
}

export interface BookingRecord {
  id: string;
  booking_reference: string;
  customer_name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  alternative_date?: string;
  location: string;
  guest_count: number;
  package_id: string;
  package_name: string;
  selected_services: string[];
  notes?: string;
  estimate?: EstimateBreakdown | null;
  status: BookingStatus;
  deposit_status?: 'Not Required' | 'Pending' | 'Paid';
  quoted_amount?: number | null;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}
