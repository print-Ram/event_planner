import React from 'react';
import type { Metadata } from 'next';
import SiteShell from '@/components/layout/SiteShell';
import { getBusinessSettings } from '@/lib/data/repository';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Booking request terms, indicative estimates, and studio cancellation policies.',
};

export default async function TermsPage() {
  const settings = await getBusinessSettings();

  return (
    <SiteShell>
      <section className="bg-ivory py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3 border-b border-beige pb-8">
            <p className="eyebrow-label">STUDIO POLICIES</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-espresso">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm text-muted">
              {settings.business_name} · {settings.location}
            </p>
          </div>

          <div className="space-y-8 text-sm sm:text-base text-espresso/85 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-2xl text-espresso">
                1. Indicative Estimates &amp; Quotations
              </h2>
              <p>{settings.terms_policy}</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-2xl text-espresso">
                2. Booking Review &amp; Date Confirmation
              </h2>
              <p>{settings.booking_policy}</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-2xl text-espresso">
                3. Payment &amp; Cancellation Policy
              </h2>
              <p>{settings.cancellation_policy}</p>
              <p className="text-muted">
                Online payment checkout is not processed directly on this website;
                commercial terms and deposits are settled only against approved studio
                quotations.
              </p>
            </section>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
