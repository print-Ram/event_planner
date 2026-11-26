import {
  DEFAULT_BUSINESS_SETTINGS,
} from '@/lib/siteConfig';
import {
  LEGACY_SERVICE_ALIASES,
  SEED_PACKAGES,
  SEED_PORTFOLIO_PROJECTS,
  SEED_PRICING_RULES,
  SEED_SERVICES,
  SEED_TESTIMONIALS,
} from '@/lib/seedData';
import { FIREBASE_DATABASE_URL, DEFAULT_ADMIN_PASSCODE } from '@/lib/firebase';
import {
  getSupabaseAdminClient,
  getSupabasePublicServerClient,
  isSupabaseServerConfigured,
} from '@/lib/supabase/server';
import type {
  AvailabilitySlot,
  BusinessSettings,
  PortfolioProject,
  TestimonialRecord,
} from '@/types/database';
import type { BookingRecord, EnquiryRecord } from '@/types/booking';
import type { EstimateRecord, PackageTier, PricingRule } from '@/types/pricing';
import type { ServiceItem } from '@/types/service';

// Helper for Firebase RTDB REST access (works in Next.js server routes & preserves existing backend)
async function fbGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${FIREBASE_DATABASE_URL}/${path}.json`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as T | null;
  } catch {
    return null;
  }
}

async function fbPut<T>(path: string, data: T): Promise<boolean> {
  try {
    const res = await fetch(`${FIREBASE_DATABASE_URL}/${path}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function fbPatch<T>(path: string, data: Partial<T>): Promise<boolean> {
  try {
    const res = await fetch(`${FIREBASE_DATABASE_URL}/${path}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function fbDelete(path: string): Promise<boolean> {
  try {
    const res = await fetch(`${FIREBASE_DATABASE_URL}/${path}.json`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch {
    return false;
  }
}

function recordMapToArray<T extends { id?: string }>(
  obj: Record<string, T> | T[] | null | undefined
): T[] {
  if (!obj) return [];
  if (Array.isArray(obj)) return obj.filter(Boolean);
  return Object.entries(obj).map(([key, val]) => ({
    ...val,
    id: val.id || key,
  }));
}

// ─── Business Settings ───────────────────────────────────────────────────────
export async function getBusinessSettings(): Promise<BusinessSettings> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient() || getSupabasePublicServerClient();
    if (sb) {
      const { data } = await sb
        .from('business_settings')
        .select('*')
        .eq('id', 'default')
        .maybeSingle();
      if (data) return { ...DEFAULT_BUSINESS_SETTINGS, ...data };
    }
  }

  const fb = await fbGet<Partial<BusinessSettings>>('site_content/settings');
  if (fb) {
    return { ...DEFAULT_BUSINESS_SETTINGS, ...fb };
  }
  return DEFAULT_BUSINESS_SETTINGS;
}

export async function saveBusinessSettings(
  updates: Partial<BusinessSettings>
): Promise<BusinessSettings> {
  const current = await getBusinessSettings();
  const next: BusinessSettings = {
    ...current,
    ...updates,
    id: 'default',
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('business_settings').upsert(next);
      return next;
    }
  }

  await fbPut('site_content/settings', next);
  return next;
}

// ─── Services ────────────────────────────────────────────────────────────────
export async function getServices(includeInactive = false): Promise<ServiceItem[]> {
  let list: ServiceItem[] = [];

  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient() || getSupabasePublicServerClient();
    if (sb) {
      const query = sb.from('services').select('*').order('display_order', { ascending: true });
      const { data } = await query;
      if (data && data.length > 0) {
        list = data as ServiceItem[];
      }
    }
  }

  if (list.length === 0) {
    const fb = await fbGet<Record<string, ServiceItem>>('site_content/studio_services');
    const fbList = recordMapToArray(fb);
    list = fbList.length > 0 ? fbList : SEED_SERVICES;
  }

  list.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  return includeInactive ? list : list.filter((s) => s.active);
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const normalized = LEGACY_SERVICE_ALIASES[slug] || slug;
  const services = await getServices(true);
  return (
    services.find((s) => s.slug === normalized || s.id === normalized) || null
  );
}

export async function upsertService(service: ServiceItem): Promise<ServiceItem> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('services').upsert(service);
      return service;
    }
  }
  await fbPut(`site_content/studio_services/${service.id}`, service);
  return service;
}

export async function deleteService(id: string): Promise<void> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('services').delete().eq('id', id);
      return;
    }
  }
  await fbDelete(`site_content/studio_services/${id}`);
}

// ─── Packages & Pricing Rules ────────────────────────────────────────────────
export async function getPackages(includeInactive = false): Promise<PackageTier[]> {
  let list: PackageTier[] = [];
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient() || getSupabasePublicServerClient();
    if (sb) {
      const { data } = await sb
        .from('packages')
        .select('*')
        .order('display_order', { ascending: true });
      if (data && data.length > 0) list = data as PackageTier[];
    }
  }
  if (list.length === 0) {
    const fb = await fbGet<Record<string, PackageTier>>('site_content/packages');
    const fbList = recordMapToArray(fb);
    list = fbList.length > 0 ? fbList : SEED_PACKAGES;
  }
  list.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  return includeInactive ? list : list.filter((p) => p.active);
}

export async function upsertPackage(pkg: PackageTier): Promise<PackageTier> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('packages').upsert(pkg);
      return pkg;
    }
  }
  await fbPut(`site_content/packages/${pkg.id}`, pkg);
  return pkg;
}

export async function getPricingRules(includeInactive = false): Promise<PricingRule[]> {
  let list: PricingRule[] = [];
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient() || getSupabasePublicServerClient();
    if (sb) {
      const { data } = await sb.from('pricing_rules').select('*');
      if (data && data.length > 0) list = data as PricingRule[];
    }
  }
  if (list.length === 0) {
    const fb = await fbGet<Record<string, PricingRule>>('site_content/pricing_rules');
    const fbList = recordMapToArray(fb);
    list = fbList.length > 0 ? fbList : SEED_PRICING_RULES;
  }
  return includeInactive ? list : list.filter((r) => r.active);
}

export async function upsertPricingRule(rule: PricingRule): Promise<PricingRule> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('pricing_rules').upsert(rule);
      return rule;
    }
  }
  await fbPut(`site_content/pricing_rules/${rule.id}`, rule);
  return rule;
}

// ─── Portfolio Projects ──────────────────────────────────────────────────────
export async function getPortfolioProjects(
  includeUnpublished = false
): Promise<PortfolioProject[]> {
  let list: PortfolioProject[] = [];
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient() || getSupabasePublicServerClient();
    if (sb) {
      const { data } = await sb
        .from('portfolio_projects')
        .select('*')
        .order('display_order', { ascending: true });
      if (data && data.length > 0) list = data as PortfolioProject[];
    }
  }
  if (list.length === 0) {
    const fb = await fbGet<Record<string, PortfolioProject>>('site_content/portfolio');
    const fbList = recordMapToArray(fb);
    list = fbList.length > 0 ? fbList : SEED_PORTFOLIO_PROJECTS;
  }
  list.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  return includeUnpublished ? list : list.filter((p) => p.published);
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioProject | null> {
  const projects = await getPortfolioProjects(true);
  return projects.find((p) => p.slug === slug || p.id === slug) || null;
}

export async function upsertPortfolioProject(
  project: PortfolioProject
): Promise<PortfolioProject> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('portfolio_projects').upsert(project);
      return project;
    }
  }
  await fbPut(`site_content/portfolio/${project.id}`, project);
  return project;
}

export async function deletePortfolioProject(id: string): Promise<void> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('portfolio_projects').delete().eq('id', id);
      return;
    }
  }
  await fbDelete(`site_content/portfolio/${id}`);
}

// ─── Testimonials / Reviews ──────────────────────────────────────────────────
export async function getTestimonials(
  includeUnpublished = false
): Promise<TestimonialRecord[]> {
  let list: TestimonialRecord[] = [];
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient() || getSupabasePublicServerClient();
    if (sb) {
      const { data } = await sb
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) list = data as TestimonialRecord[];
    }
  }
  if (list.length === 0) {
    const fb = await fbGet<Record<string, TestimonialRecord>>('site_content/testimonials');
    list = recordMapToArray(fb);
    if (list.length === 0) list = SEED_TESTIMONIALS;
  }
  list.sort((a, b) => b.created_at.localeCompare(a.created_at));
  return includeUnpublished ? list : list.filter((t) => t.published);
}

export async function upsertTestimonial(
  testimonial: TestimonialRecord
): Promise<TestimonialRecord> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('testimonials').upsert(testimonial);
      return testimonial;
    }
  }
  await fbPut(`site_content/testimonials/${testimonial.id}`, testimonial);
  return testimonial;
}

export async function deleteTestimonial(id: string): Promise<void> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('testimonials').delete().eq('id', id);
      return;
    }
  }
  await fbDelete(`site_content/testimonials/${id}`);
}

// ─── Enquiries & Estimates ───────────────────────────────────────────────────
export async function getEnquiries(): Promise<EnquiryRecord[]> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      const { data } = await sb
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) return data as EnquiryRecord[];
    }
  }

  const fbEnquiries = await fbGet<Record<string, EnquiryRecord>>('enquiries');
  const list = recordMapToArray(fbEnquiries);

  // Also merge legacy `quotes` collection so prior inquiries remain visible in Admin
  const legacyQuotes = await fbGet<Record<string, Record<string, unknown>>>('quotes');
  if (legacyQuotes) {
    for (const [key, q] of Object.entries(legacyQuotes)) {
      const id = String(q.id || key);
      if (!list.some((item) => item.id === id)) {
        list.push({
          id,
          customer_name: String(q.name || 'Guest'),
          email: String(q.email || ''),
          phone: String(q.phone || ''),
          event_type: String(q.service || 'General Event'),
          event_date: String(q.date || ''),
          location: String(q.city || ''),
          message: String(q.notes || ''),
          budget: q.estimatedBudget ? `₹${Number(q.estimatedBudget).toLocaleString('en-IN')}` : '',
          status:
            q.status === 'confirmed'
              ? 'Converted'
              : q.status === 'contacted'
                ? 'In Progress'
                : q.status === 'archived'
                  ? 'Archived'
                  : 'New',
          created_at: q.createdAt
            ? new Date(Number(q.createdAt)).toISOString()
            : new Date().toISOString(),
        });
      }
    }
  }

  list.sort((a, b) => b.created_at.localeCompare(a.created_at));
  return list;
}

export async function createEnquiry(enquiry: EnquiryRecord): Promise<EnquiryRecord> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('enquiries').insert(enquiry);
      return enquiry;
    }
  }

  await fbPut(`enquiries/${enquiry.id}`, enquiry);
  return enquiry;
}

export async function updateEnquiry(
  id: string,
  updates: Partial<EnquiryRecord>
): Promise<void> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('enquiries').update(updates).eq('id', id);
      return;
    }
  }
  await fbPatch(`enquiries/${id}`, updates);
}

export async function createEstimate(estimate: EstimateRecord): Promise<EstimateRecord> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('estimates').insert(estimate);
      return estimate;
    }
  }
  await fbPut(`estimates/${estimate.id}`, estimate);
  return estimate;
}

// ─── Bookings & Availability ─────────────────────────────────────────────────
export async function getBookings(): Promise<BookingRecord[]> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      const { data } = await sb
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) return data as BookingRecord[];
    }
  }
  const fb = await fbGet<Record<string, BookingRecord>>('bookings');
  const list = recordMapToArray(fb);
  list.sort((a, b) => b.created_at.localeCompare(a.created_at));
  return list;
}

export async function getPublicConfirmedBookingDates(): Promise<
  Array<{ event_date: string; status: BookingRecord['status'] }>
> {
  const bookings = await getBookings();
  return bookings
    .filter((b) => ['Approved', 'Awaiting Deposit', 'Confirmed'].includes(b.status))
    .map((b) => ({ event_date: b.event_date, status: b.status }));
}

export async function createBooking(booking: BookingRecord): Promise<BookingRecord> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('bookings').insert(booking);
      return booking;
    }
  }
  await fbPut(`bookings/${booking.id}`, booking);
  return booking;
}

export async function updateBooking(
  id: string,
  updates: Partial<BookingRecord>
): Promise<BookingRecord | null> {
  const nextUpdates = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      const { data } = await sb
        .from('bookings')
        .update(nextUpdates)
        .eq('id', id)
        .select('*')
        .maybeSingle();
      return (data as BookingRecord) || null;
    }
  }

  await fbPatch(`bookings/${id}`, nextUpdates);
  const updated = await fbGet<BookingRecord>(`bookings/${id}`);
  return updated;
}

export async function getAvailabilitySlots(): Promise<AvailabilitySlot[]> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient() || getSupabasePublicServerClient();
    if (sb) {
      const { data } = await sb
        .from('availability')
        .select('*')
        .order('date', { ascending: true });
      if (data) return data as AvailabilitySlot[];
    }
  }
  const fb = await fbGet<Record<string, AvailabilitySlot>>('availability');
  return recordMapToArray(fb).sort((a, b) => a.date.localeCompare(b.date));
}

export async function upsertAvailabilitySlot(
  slot: AvailabilitySlot
): Promise<AvailabilitySlot> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('availability').upsert(slot, { onConflict: 'date' });
      return slot;
    }
  }
  await fbPut(`availability/${slot.id}`, slot);
  return slot;
}

export async function deleteAvailabilitySlot(id: string): Promise<void> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('availability').delete().eq('id', id);
      return;
    }
  }
  await fbDelete(`availability/${id}`);
}

// ─── Server Admin Verification ───────────────────────────────────────────────
export async function verifyServerAdminPasscode(passcode: string): Promise<boolean> {
  const envPass = process.env.ADMIN_PASSCODE;
  if (envPass && passcode.trim() === envPass.trim()) return true;

  const fbPass = await fbGet<string>('admin_config/passcode');
  const expected = fbPass ? String(fbPass).trim() : DEFAULT_ADMIN_PASSCODE;
  return passcode.trim() === expected;
}

export async function updateServerAdminPasscode(newPasscode: string): Promise<void> {
  await fbPut('admin_config/passcode', newPasscode.trim());
}
