import { NextResponse } from 'next/server';
import {
  getAvailabilitySlots,
  getBookings,
  getBusinessSettings,
  getPackages,
  getPricingRules,
} from '@/lib/data/repository';
import { getUnavailableDatesList } from '@/lib/availability/checker';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [slots, bookings, settings, packages, pricingRules] = await Promise.all([
      getAvailabilitySlots(),
      getBookings(),
      getBusinessSettings(),
      getPackages(false),
      getPricingRules(false),
    ]);

    const unavailableDates = getUnavailableDatesList(slots, bookings);

    return NextResponse.json({
      unavailableDates,
      settings: {
        business_name: settings.business_name,
        currency_symbol: settings.currency_symbol,
        tax_percentage: settings.tax_percentage,
        discount_enabled: settings.discount_enabled,
        discount_percentage: settings.discount_percentage,
        whatsapp: settings.whatsapp,
        phone: settings.phone,
        email: settings.email,
        booking_policy: settings.booking_policy,
      },
      packages,
      pricingRules,
    });
  } catch (err) {
    console.error('[API /bookings/availability] Failed:', err);
    return NextResponse.json(
      { error: 'Unable to load availability right now.' },
      { status: 500 }
    );
  }
}
