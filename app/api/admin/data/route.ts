import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { isAdminAuthenticatedFromCookies } from '@/lib/security/rateLimit';
import {
  deleteAvailabilitySlot,
  deletePortfolioProject,
  deleteService,
  deleteTestimonial,
  getAvailabilitySlots,
  getBookings,
  getBusinessSettings,
  getEnquiries,
  getPackages,
  getPortfolioProjects,
  getPricingRules,
  getServices,
  getTestimonials,
  saveBusinessSettings,
  updateBooking,
  updateEnquiry,
  updateServerAdminPasscode,
  upsertAvailabilitySlot,
  upsertPackage,
  upsertPortfolioProject,
  upsertPricingRule,
  upsertService,
  upsertTestimonial,
} from '@/lib/data/repository';
import { sendBookingStatusEmail } from '@/lib/email/resend';
import { slugify } from '@/lib/utils';
import type {
  AvailabilitySlot,
  BusinessSettings,
  PortfolioProject,
  TestimonialRecord,
} from '@/types/database';
import type { BookingRecord, EnquiryRecord } from '@/types/booking';
import type { PackageTier, PricingRule } from '@/types/pricing';
import type { ServiceItem } from '@/types/service';

export const dynamic = 'force-dynamic';

function unauthorized() {
  return NextResponse.json({ error: 'Admin authentication required.' }, { status: 401 });
}

export async function GET() {
  if (!isAdminAuthenticatedFromCookies()) return unauthorized();

  try {
    const [
      settings,
      services,
      packages,
      pricingRules,
      enquiries,
      bookings,
      portfolio,
      testimonials,
      availability,
    ] = await Promise.all([
      getBusinessSettings(),
      getServices(true),
      getPackages(true),
      getPricingRules(true),
      getEnquiries(),
      getBookings(),
      getPortfolioProjects(true),
      getTestimonials(true),
      getAvailabilitySlots(),
    ]);

    return NextResponse.json({
      settings,
      services,
      packages,
      pricingRules,
      enquiries,
      bookings,
      portfolio,
      testimonials,
      availability,
    });
  } catch (err) {
    console.error('[API /admin/data GET] Failed:', err);
    return NextResponse.json({ error: 'Failed to load admin data.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAdminAuthenticatedFromCookies()) return unauthorized();

  try {
    const body = (await request.json()) as {
      resource: string;
      action?: 'upsert' | 'delete';
      payload: Record<string, unknown>;
    };

    const { resource, action = 'upsert', payload } = body;

    switch (resource) {
      case 'settings': {
        const updated = await saveBusinessSettings(payload as Partial<BusinessSettings>);
        return NextResponse.json({ ok: true, data: updated });
      }
      case 'passcode': {
        const nextPass = String(payload.passcode || '').trim();
        if (nextPass.length < 4) {
          return NextResponse.json(
            { error: 'Passcode must be at least 4 characters.' },
            { status: 400 }
          );
        }
        await updateServerAdminPasscode(nextPass);
        return NextResponse.json({ ok: true });
      }
      case 'enquiry': {
        const id = String(payload.id || '');
        await updateEnquiry(id, payload as Partial<EnquiryRecord>);
        return NextResponse.json({ ok: true });
      }
      case 'booking': {
        const id = String(payload.id || '');
        const updated = await updateBooking(id, payload as Partial<BookingRecord>);
        if (updated && payload.send_email) {
          const settings = await getBusinessSettings();
          await sendBookingStatusEmail(updated, settings);
        }
        return NextResponse.json({ ok: true, data: updated });
      }
      case 'service': {
        if (action === 'delete') {
          await deleteService(String(payload.id));
          return NextResponse.json({ ok: true });
        }
        const title = String(payload.title || 'Untitled Service');
        const id = String(payload.id || slugify(title) || crypto.randomUUID());
        const item: ServiceItem = {
          id,
          title,
          slug: String(payload.slug || slugify(title) || id),
          category: String(payload.category || 'Custom Events'),
          short_description: String(payload.short_description || ''),
          description: String(payload.description || ''),
          image_url: String(payload.image_url || '/events/real/wedding_mandapam.jpg'),
          whats_included: Array.isArray(payload.whats_included)
            ? (payload.whats_included as string[])
            : [],
          optional_addons: Array.isArray(payload.optional_addons)
            ? (payload.optional_addons as string[])
            : [],
          starting_price:
            payload.starting_price !== undefined && payload.starting_price !== null
              ? Number(payload.starting_price)
              : null,
          typical_duration: String(payload.typical_duration || ''),
          active: payload.active !== false,
          featured: Boolean(payload.featured),
          display_order: Number(payload.display_order || 0),
          created_at: String(payload.created_at || new Date().toISOString()),
        };
        const saved = await upsertService(item);
        return NextResponse.json({ ok: true, data: saved });
      }
      case 'package': {
        const pkg = payload as unknown as PackageTier;
        const saved = await upsertPackage(pkg);
        return NextResponse.json({ ok: true, data: saved });
      }
      case 'pricing_rule': {
        const rule = payload as unknown as PricingRule;
        const saved = await upsertPricingRule(rule);
        return NextResponse.json({ ok: true, data: saved });
      }
      case 'portfolio': {
        if (action === 'delete') {
          await deletePortfolioProject(String(payload.id));
          return NextResponse.json({ ok: true });
        }
        const title = String(payload.title || 'Untitled Project');
        const id = String(payload.id || crypto.randomUUID());
        const project: PortfolioProject = {
          id,
          title,
          slug: String(payload.slug || slugify(title) || id),
          category: String(payload.category || 'Weddings & Engagements'),
          description: String(payload.description || ''),
          cover_image: String(payload.cover_image || '/events/real/wedding_mandapam.jpg'),
          gallery_images: Array.isArray(payload.gallery_images)
            ? (payload.gallery_images as string[])
            : [],
          video_url: payload.video_url ? String(payload.video_url) : undefined,
          location: String(payload.location || ''),
          services_provided: Array.isArray(payload.services_provided)
            ? (payload.services_provided as string[])
            : [],
          instagram_post_url: payload.instagram_post_url
            ? String(payload.instagram_post_url)
            : undefined,
          is_demo: Boolean(payload.is_demo),
          published: payload.published !== false,
          display_order: Number(payload.display_order || 0),
        };
        const saved = await upsertPortfolioProject(project);
        return NextResponse.json({ ok: true, data: saved });
      }
      case 'testimonial': {
        if (action === 'delete') {
          await deleteTestimonial(String(payload.id));
          return NextResponse.json({ ok: true });
        }
        const review: TestimonialRecord = {
          id: String(payload.id || crypto.randomUUID()),
          customer_name: String(payload.customer_name || ''),
          review_text: String(payload.review_text || ''),
          rating: payload.rating ? Number(payload.rating) : undefined,
          event_type: String(payload.event_type || ''),
          event_image: payload.event_image ? String(payload.event_image) : undefined,
          source_label: payload.source_label ? String(payload.source_label) : undefined,
          source_url: payload.source_url ? String(payload.source_url) : undefined,
          published: Boolean(payload.published),
          created_at: String(payload.created_at || new Date().toISOString()),
        };
        const saved = await upsertTestimonial(review);
        return NextResponse.json({ ok: true, data: saved });
      }
      case 'availability': {
        if (action === 'delete') {
          await deleteAvailabilitySlot(String(payload.id));
          return NextResponse.json({ ok: true });
        }
        const slot: AvailabilitySlot = {
          id: String(payload.id || payload.date || crypto.randomUUID()),
          date: String(payload.date),
          start_time: payload.start_time ? String(payload.start_time) : undefined,
          end_time: payload.end_time ? String(payload.end_time) : undefined,
          status: (payload.status as AvailabilitySlot['status']) || 'unavailable',
          notes: payload.notes ? String(payload.notes) : '',
        };
        const saved = await upsertAvailabilitySlot(slot);
        return NextResponse.json({ ok: true, data: saved });
      }
      default:
        return NextResponse.json({ error: 'Unknown resource type.' }, { status: 400 });
    }
  } catch (err) {
    console.error('[API /admin/data POST] Failed:', err);
    return NextResponse.json({ error: 'Failed to update admin resource.' }, { status: 500 });
  }
}
