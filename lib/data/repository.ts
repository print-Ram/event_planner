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

// In-memory TTL cache + in-flight request deduplication for blazing-fast route transitions
interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const repoCache = new Map<string, CacheEntry<unknown>>();
const inflightRequests = new Map<string, Promise<unknown>>();

const PUBLIC_TTL_MS = 60_000;
const AVAILABILITY_TTL_MS = 10_000;

async function cachedFetch<T>(
  key: string,
  ttlMs: number,
  loader: () => Promise<T>
): Promise<T> {
  const now = Date.now();
  const cached = repoCache.get(key) as CacheEntry<T> | undefined;
  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  const inflight = inflightRequests.get(key) as Promise<T> | undefined;
  if (inflight) {
    return inflight;
  }

  const promise = loader()
    .then((result) => {
      repoCache.set(key, { value: result, expiresAt: Date.now() + ttlMs });
      return result;
    })
    .finally(() => {
      inflightRequests.delete(key);
    });

  inflightRequests.set(key, promise);
  return promise;
}

export function invalidateRepoCache(keyPrefix?: string): void {
  if (!keyPrefix) {
    repoCache.clear();
    return;
  }
  for (const key of repoCache.keys()) {
    if (key.startsWith(keyPrefix)) {
      repoCache.delete(key);
    }
  }
}

// Helper for Firebase RTDB REST access (works in Next.js server routes & preserves existing backend)
async function fbGet<T>(path: string, noStore = false): Promise<T | null> {
  try {
    const res = await fetch(`${FIREBASE_DATABASE_URL}/${path}.json`, {
      ...(noStore ? { cache: 'no-store' as const } : { next: { revalidate: 60 } }),
      signal: AbortSignal.timeout(3000),
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
  return cachedFetch('settings', PUBLIC_TTL_MS, async () => {
    if (isSupabaseServerConfigured()) {
      const sb = getSupabaseAdminClient() || getSupabasePublicServerClient();
      if (sb) {
        try {
          const { data } = await sb
            .from('business_settings')
            .select('*')
            .eq('id', 'default')
            .maybeSingle();
          if (data) return { ...DEFAULT_BUSINESS_SETTINGS, ...data };
        } catch {
          // fall back cleanly
        }
      }
    }

    const fb = await fbGet<Partial<BusinessSettings>>('site_content/settings');
    if (fb) {
      return { ...DEFAULT_BUSINESS_SETTINGS, ...fb };
    }
    return DEFAULT_BUSINESS_SETTINGS;
  });
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
      invalidateRepoCache('settings');
      return next;
    }
  }

  await fbPut('site_content/settings', next);
  invalidateRepoCache('settings');
  return next;
}

// ─── Services ────────────────────────────────────────────────────────────────
export async function getServices(includeInactive = false): Promise<ServiceItem[]> {
  const list = await cachedFetch('services', PUBLIC_TTL_MS, async () => {
    let items: ServiceItem[] = [];

    if (isSupabaseServerConfigured()) {
      const sb = getSupabaseAdminClient() || getSupabasePublicServerClient();
      if (sb) {
        try {
          const { data } = await sb
            .from('services')
            .select('*')
            .order('display_order', { ascending: true });
          if (data && data.length > 0) {
            items = data as ServiceItem[];
          }
        } catch {
          // fall back cleanly
        }
      }
    }

    if (items.length === 0) {
      const fb = await fbGet<Record<string, ServiceItem>>('site_content/studio_services');
      const fbList = recordMapToArray(fb);
      items = fbList.length > 0 ? fbList : SEED_SERVICES;
    }

    items.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    return items;
  });

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
      invalidateRepoCache('services');
      return service;
    }
  }
  await fbPut(`site_content/studio_services/${service.id}`, service);
  invalidateRepoCache('services');
  return service;
}

export async function deleteService(id: string): Promise<void> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('services').delete().eq('id', id);
      invalidateRepoCache('services');
      return;
    }
  }
  await fbDelete(`site_content/studio_services/${id}`);
  invalidateRepoCache('services');
}

// ─── Packages & Pricing Rules ────────────────────────────────────────────────
export async function getPackages(includeInactive = false): Promise<PackageTier[]> {
  const list = await cachedFetch('packages', PUBLIC_TTL_MS, async () => {
    let items: PackageTier[] = [];
    if (isSupabaseServerConfigured()) {
      const sb = getSupabaseAdminClient() || getSupabasePublicServerClient();
      if (sb) {
        try {
          const { data } = await sb
            .from('packages')
            .select('*')
            .order('display_order', { ascending: true });
          if (data && data.length > 0) items = data as PackageTier[];
        } catch {
          // fall back cleanly
        }
      }
    }
    if (items.length === 0) {
      const fb = await fbGet<Record<string, PackageTier>>('site_content/packages');
      const fbList = recordMapToArray(fb);
      items = fbList.length > 0 ? fbList : SEED_PACKAGES;
    }
    items.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    return items;
  });

  return includeInactive ? list : list.filter((p) => p.active);
}

export async function upsertPackage(pkg: PackageTier): Promise<PackageTier> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('packages').upsert(pkg);
      invalidateRepoCache('packages');
      return pkg;
    }
  }
  await fbPut(`site_content/packages/${pkg.id}`, pkg);
  invalidateRepoCache('packages');
  return pkg;
}

export async function getPricingRules(includeInactive = false): Promise<PricingRule[]> {
  const list = await cachedFetch('pricing_rules', PUBLIC_TTL_MS, async () => {
    let items: PricingRule[] = [];
    if (isSupabaseServerConfigured()) {
      const sb = getSupabaseAdminClient() || getSupabasePublicServerClient();
      if (sb) {
        try {
          const { data } = await sb.from('pricing_rules').select('*');
          if (data && data.length > 0) items = data as PricingRule[];
        } catch {
          // fall back cleanly
        }
      }
    }
    if (items.length === 0) {
      const fb = await fbGet<Record<string, PricingRule>>('site_content/pricing_rules');
      const fbList = recordMapToArray(fb);
      items = fbList.length > 0 ? fbList : SEED_PRICING_RULES;
    }
    return items;
  });

  return includeInactive ? list : list.filter((r) => r.active);
}

export async function upsertPricingRule(rule: PricingRule): Promise<PricingRule> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('pricing_rules').upsert(rule);
      invalidateRepoCache('pricing_rules');
      return rule;
    }
  }
  await fbPut(`site_content/pricing_rules/${rule.id}`, rule);
  invalidateRepoCache('pricing_rules');
  return rule;
}

// ─── Portfolio Projects ──────────────────────────────────────────────────────
export async function getPortfolioProjects(
  includeUnpublished = false
): Promise<PortfolioProject[]> {
  const list = await cachedFetch('portfolio', PUBLIC_TTL_MS, async () => {
    let items: PortfolioProject[] = [];
    if (isSupabaseServerConfigured()) {
      const sb = getSupabaseAdminClient() || getSupabasePublicServerClient();
      if (sb) {
        try {
          const { data } = await sb
            .from('portfolio_projects')
            .select('*')
            .order('display_order', { ascending: true });
          if (data && data.length > 0) items = data as PortfolioProject[];
        } catch {
          // fall back cleanly
        }
      }
    }
    if (items.length === 0) {
      const fb = await fbGet<Record<string, PortfolioProject>>('site_content/portfolio');
      const fbList = recordMapToArray(fb);
      items = fbList.length > 0 ? fbList : SEED_PORTFOLIO_PROJECTS;
    }
    items.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    return items;
  });

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
      invalidateRepoCache('portfolio');
      return project;
    }
  }
  await fbPut(`site_content/portfolio/${project.id}`, project);
  invalidateRepoCache('portfolio');
  return project;
}

export async function deletePortfolioProject(id: string): Promise<void> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('portfolio_projects').delete().eq('id', id);
      invalidateRepoCache('portfolio');
      return;
    }
  }
  await fbDelete(`site_content/portfolio/${id}`);
  invalidateRepoCache('portfolio');
}

// ─── Testimonials / Reviews ──────────────────────────────────────────────────
export async function getTestimonials(
  includeUnpublished = false
): Promise<TestimonialRecord[]> {
  const list = await cachedFetch('testimonials', PUBLIC_TTL_MS, async () => {
    let items: TestimonialRecord[] = [];
    if (isSupabaseServerConfigured()) {
      const sb = getSupabaseAdminClient() || getSupabasePublicServerClient();
      if (sb) {
        try {
          const { data } = await sb
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });
          if (data) items = data as TestimonialRecord[];
        } catch {
          // fall back cleanly
        }
      }
    }
    if (items.length === 0) {
      const fb = await fbGet<Record<string, TestimonialRecord>>('site_content/testimonials');
      items = recordMapToArray(fb);
      if (items.length === 0) items = SEED_TESTIMONIALS;
    }
    items.sort((a, b) => b.created_at.localeCompare(a.created_at));
    return items;
  });

  return includeUnpublished ? list : list.filter((t) => t.published);
}

export async function upsertTestimonial(
  testimonial: TestimonialRecord
): Promise<TestimonialRecord> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('testimonials').upsert(testimonial);
      invalidateRepoCache('testimonials');
      return testimonial;
    }
  }
  await fbPut(`site_content/testimonials/${testimonial.id}`, testimonial);
  invalidateRepoCache('testimonials');
  return testimonial;
}

export async function deleteTestimonial(id: string): Promise<void> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('testimonials').delete().eq('id', id);
      invalidateRepoCache('testimonials');
      return;
    }
  }
  await fbDelete(`site_content/testimonials/${id}`);
  invalidateRepoCache('testimonials');
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

  const fbEnquiries = await fbGet<Record<string, EnquiryRecord>>('enquiries', true);
  const list = recordMapToArray(fbEnquiries);

  // Also merge legacy `quotes` collection so prior inquiries remain visible in Admin
  const legacyQuotes = await fbGet<Record<string, Record<string, unknown>>>('quotes', true);
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
  return cachedFetch('bookings', AVAILABILITY_TTL_MS, async () => {
    if (isSupabaseServerConfigured()) {
      const sb = getSupabaseAdminClient();
      if (sb) {
        try {
          const { data } = await sb
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });
          if (data) return data as BookingRecord[];
        } catch {
          // fall back cleanly
        }
      }
    }
    const fb = await fbGet<Record<string, BookingRecord>>('bookings', true);
    const list = recordMapToArray(fb);
    list.sort((a, b) => b.created_at.localeCompare(a.created_at));
    return list;
  });
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
      invalidateRepoCache('bookings');
      return booking;
    }
  }
  await fbPut(`bookings/${booking.id}`, booking);
  invalidateRepoCache('bookings');
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
      invalidateRepoCache('bookings');
      return (data as BookingRecord) || null;
    }
  }

  await fbPatch(`bookings/${id}`, nextUpdates);
  invalidateRepoCache('bookings');
  const updated = await fbGet<BookingRecord>(`bookings/${id}`, true);
  return updated;
}

export async function getAvailabilitySlots(): Promise<AvailabilitySlot[]> {
  return cachedFetch('availability', AVAILABILITY_TTL_MS, async () => {
    if (isSupabaseServerConfigured()) {
      const sb = getSupabaseAdminClient() || getSupabasePublicServerClient();
      if (sb) {
        try {
          const { data } = await sb
            .from('availability')
            .select('*')
            .order('date', { ascending: true });
          if (data) return data as AvailabilitySlot[];
        } catch {
          // fall back cleanly
        }
      }
    }
    const fb = await fbGet<Record<string, AvailabilitySlot>>('availability', true);
    return recordMapToArray(fb).sort((a, b) => a.date.localeCompare(b.date));
  });
}

export async function upsertAvailabilitySlot(
  slot: AvailabilitySlot
): Promise<AvailabilitySlot> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('availability').upsert(slot, { onConflict: 'date' });
      invalidateRepoCache('availability');
      return slot;
    }
  }
  await fbPut(`availability/${slot.id}`, slot);
  invalidateRepoCache('availability');
  return slot;
}

export async function deleteAvailabilitySlot(id: string): Promise<void> {
  if (isSupabaseServerConfigured()) {
    const sb = getSupabaseAdminClient();
    if (sb) {
      await sb.from('availability').delete().eq('id', id);
      invalidateRepoCache('availability');
      return;
    }
  }
  await fbDelete(`availability/${id}`);
  invalidateRepoCache('availability');
}

// ─── Server Admin Verification ───────────────────────────────────────────────
export async function verifyServerAdminPasscode(passcode: string): Promise<boolean> {
  const envPass = process.env.ADMIN_PASSCODE;
  if (envPass && passcode.trim() === envPass.trim()) return true;

  const fbPass = await fbGet<string>('admin_config/passcode', true);
  const expected = fbPass ? String(fbPass).trim() : DEFAULT_ADMIN_PASSCODE;
  return passcode.trim() === expected;
}

export async function updateServerAdminPasscode(newPasscode: string): Promise<void> {
  await fbPut('admin_config/passcode', newPasscode.trim());
}
