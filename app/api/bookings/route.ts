import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { bookingRequestSchema } from '@/lib/validation/schemas';
import {
  createBooking,
  getAvailabilitySlots,
  getBookings,
  getBusinessSettings,
  getPackages,
  getPricingRules,
} from '@/lib/data/repository';
import { checkDateAvailability } from '@/lib/availability/checker';
import { calculateEventEstimate } from '@/lib/pricing/calculator';
import { sendBookingRequestEmails } from '@/lib/email/resend';
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit';
import { generateReferenceId } from '@/lib/utils';
import type { BookingRecord } from '@/types/booking';

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(`booking:${ip}`, 6, 60_000)) {
      return NextResponse.json(
        { error: 'Too many booking requests. Please wait a minute and try again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = bookingRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || 'Please check all required booking fields.',
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    if (parsed.data.website_url) {
      return NextResponse.json({ ok: true });
    }

    const [slots, existingBookings, packages, pricingRules, settings] = await Promise.all([
      getAvailabilitySlots(),
      getBookings(),
      getPackages(false),
      getPricingRules(false),
      getBusinessSettings(),
    ]);

    const availabilityCheck = checkDateAvailability(
      parsed.data.event_date,
      slots,
      existingBookings
    );

    if (!availabilityCheck.available) {
      return NextResponse.json(
        { error: availabilityCheck.reason || 'Requested date is unavailable.' },
        { status: 409 }
      );
    }

    const pkg = packages.find((p) => p.id === parsed.data.package_id);
    const estimate = calculateEventEstimate({
      packageId: parsed.data.package_id,
      selectedServices: parsed.data.selected_services,
      guestCount: parsed.data.guest_count,
      packages,
      pricingRules,
      settings,
    });

    const nowIso = new Date().toISOString();
    const booking: BookingRecord = {
      id: crypto.randomUUID(),
      booking_reference: generateReferenceId('SRE'),
      customer_name: parsed.data.customer_name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      event_type: parsed.data.event_type,
      event_date: parsed.data.event_date,
      alternative_date: parsed.data.alternative_date || '',
      location: parsed.data.location,
      guest_count: parsed.data.guest_count,
      package_id: parsed.data.package_id,
      package_name: pkg?.name || parsed.data.package_id,
      selected_services: parsed.data.selected_services,
      notes: parsed.data.notes || '',
      estimate,
      status: 'Pending',
      deposit_status: 'Not Required',
      quoted_amount: null,
      admin_notes: '',
      created_at: nowIso,
      updated_at: nowIso,
    };

    await createBooking(booking);
    await sendBookingRequestEmails(booking, settings);

    return NextResponse.json({ ok: true, booking }, { status: 201 });
  } catch (err) {
    console.error('[API /bookings] Failed:', err);
    return NextResponse.json(
      { error: 'Unable to submit booking request right now. Please try WhatsApp or phone.' },
      { status: 500 }
    );
  }
}
