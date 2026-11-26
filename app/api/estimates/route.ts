import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { estimateSubmissionSchema } from '@/lib/validation/schemas';
import {
  createEnquiry,
  createEstimate,
  getBusinessSettings,
  getPackages,
  getPricingRules,
} from '@/lib/data/repository';
import { calculateEventEstimate } from '@/lib/pricing/calculator';
import { sendEnquiryEmails } from '@/lib/email/resend';
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit';
import type { EstimateRecord } from '@/types/pricing';
import type { EnquiryRecord } from '@/types/booking';

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(`estimate:${ip}`, 10, 60_000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = estimateSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid estimate submission.' },
        { status: 400 }
      );
    }

    if (parsed.data.website_url) {
      return NextResponse.json({ ok: true });
    }

    const [packages, pricingRules, settings] = await Promise.all([
      getPackages(false),
      getPricingRules(false),
      getBusinessSettings(),
    ]);

    const pkg = packages.find((p) => p.id === parsed.data.package_id);
    const breakdown = calculateEventEstimate({
      packageId: parsed.data.package_id,
      selectedServices: parsed.data.selected_services,
      guestCount: parsed.data.guest_count,
      packages,
      pricingRules,
      settings,
    });

    const estimateId = crypto.randomUUID();
    const enquiryId = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const enquiry: EnquiryRecord = {
      id: enquiryId,
      customer_name: parsed.data.customer_name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      event_type: parsed.data.event_type,
      event_date: parsed.data.event_date || '',
      location: parsed.data.location || '',
      guest_count: parsed.data.guest_count,
      budget: breakdown.display_label,
      message: parsed.data.notes || '',
      estimate_id: estimateId,
      estimate_summary: `${pkg?.name || parsed.data.package_id} · ${parsed.data.guest_count} guests · ${breakdown.display_label}`,
      status: 'New',
      admin_notes: '',
      created_at: createdAt,
    };

    const estimate: EstimateRecord = {
      id: estimateId,
      enquiry_id: enquiryId,
      customer_name: parsed.data.customer_name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      event_type: parsed.data.event_type,
      event_date: parsed.data.event_date || '',
      location: parsed.data.location || '',
      guest_count: parsed.data.guest_count,
      package_id: parsed.data.package_id,
      package_name: pkg?.name || parsed.data.package_id,
      selected_services: parsed.data.selected_services,
      notes: parsed.data.notes || '',
      pricing_breakdown: breakdown,
      estimated_minimum: breakdown.estimated_minimum,
      estimated_maximum: breakdown.estimated_maximum,
      created_at: createdAt,
    };

    await Promise.all([createEnquiry(enquiry), createEstimate(estimate)]);
    await sendEnquiryEmails(enquiry, settings, true);

    return NextResponse.json({ ok: true, estimate, enquiry }, { status: 201 });
  } catch (err) {
    console.error('[API /estimates] Failed:', err);
    return NextResponse.json(
      { error: 'Unable to save estimate right now. Please try again.' },
      { status: 500 }
    );
  }
}
