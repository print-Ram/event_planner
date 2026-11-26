import { z } from 'zod';

const phoneRegex = /^[+]?[\d\s()-]{8,18}$/;

export const enquirySchema = z.object({
  customer_name: z.string().trim().min(2, 'Please enter your full name').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(150),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Please enter a valid phone or WhatsApp number'),
  event_type: z.string().trim().min(2, 'Please select an event type').max(100),
  event_date: z.string().trim().max(40).optional(),
  location: z.string().trim().max(150).optional(),
  guest_count: z.number().int().min(0).max(50000).optional(),
  budget: z.string().trim().max(100).optional(),
  message: z.string().trim().max(2000).optional(),
  estimate_id: z.string().trim().max(80).optional(),
  estimate_summary: z.string().trim().max(500).optional(),
  website_url: z.string().max(0).optional(), // Honeypot spam trap
});

export const estimateSubmissionSchema = z.object({
  customer_name: z.string().trim().min(2, 'Please enter your full name').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(150),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Please enter a valid phone number'),
  event_type: z.string().trim().min(2).max(100),
  event_date: z.string().trim().max(40).optional().default(''),
  location: z.string().trim().max(150).optional().default(''),
  guest_count: z.coerce.number().int().min(1, 'Guest count must be at least 1').max(50000),
  package_id: z.string().trim().min(1),
  selected_services: z.array(z.string().trim().max(80)).max(20),
  notes: z.string().trim().max(2000).optional().default(''),
  website_url: z.string().max(0).optional(),
});

export const bookingRequestSchema = z.object({
  customer_name: z.string().trim().min(2, 'Please enter your full name').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(150),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Please enter a valid phone or WhatsApp number'),
  event_type: z.string().trim().min(2, 'Please select an event category').max(100),
  event_date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please pick a preferred event date'),
  alternative_date: z
    .string()
    .trim()
    .refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), 'Invalid alternative date')
    .optional()
    .default(''),
  location: z.string().trim().min(2, 'Please enter the event city or venue').max(180),
  guest_count: z.coerce.number().int().min(1, 'Guest count must be at least 1').max(50000),
  package_id: z.string().trim().min(1, 'Please select a package'),
  selected_services: z.array(z.string().trim().max(80)).min(1, 'Select at least one service'),
  notes: z.string().trim().max(2000).optional().default(''),
  website_url: z.string().max(0).optional(),
});

export const availabilitySlotSchema = z.object({
  date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  start_time: z.string().trim().max(20).optional().default(''),
  end_time: z.string().trim().max(20).optional().default(''),
  status: z.enum(['available', 'unavailable', 'booked']),
  notes: z.string().trim().max(300).optional().default(''),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EstimateSubmissionInput = z.infer<typeof estimateSubmissionSchema>;
export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;
