import React from 'react';
import type { Metadata } from 'next';
import SiteShell from '@/components/layout/SiteShell';
import BookingRequestWizard from '@/components/booking/BookingRequestWizard';
import {
  getAvailabilitySlots,
  getBookings,
  getBusinessSettings,
  getPackages,
} from '@/lib/data/repository';
import { getUnavailableDatesList } from '@/lib/availability/checker';

export const revalidate = 15;

export const metadata: Metadata = {
  title: 'Request a Booking',
  description:
    'Check studio date availability and submit a manual-review booking request for your celebration.',
};

export default async function BookPage({
  searchParams,
}: {
  searchParams?: Promise<{ service?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const [packages, settings, slots, bookings] = await Promise.all([
    getPackages(false),
    getBusinessSettings(),
    getAvailabilitySlots(),
    getBookings(),
  ]);

  const unavailableDates = getUnavailableDatesList(slots, bookings);

  return (
    <SiteShell>
      <section className="bg-ivory py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <p className="eyebrow-label">BOOKING REQUEST</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-medium text-espresso">
              Reserve your celebration date
            </h1>
            <p className="text-base text-muted leading-relaxed">
              Submit your preferred date, location, and package tier. Our team reviews
              every booking request manually before confirming availability.
            </p>
          </div>

          <BookingRequestWizard
            packages={packages}
            settings={settings}
            unavailableDates={unavailableDates}
            initialService={resolvedSearchParams?.service}
          />
        </div>
      </section>
    </SiteShell>
  );
}
