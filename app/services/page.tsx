import React from 'react';
import type { Metadata } from 'next';
import SiteShell from '@/components/layout/SiteShell';
import ServicesCatalog from '@/components/services/ServicesCatalog';
import { getBusinessSettings, getServices } from '@/lib/data/repository';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore wedding planning, plate decors, engagements, birthdays, baby showers, corporate events, and custom celebration design.',
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const [services, settings] = await Promise.all([
    getServices(false),
    getBusinessSettings(),
  ]);

  return (
    <SiteShell>
      <section className="bg-ivory py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-4">
            <p className="eyebrow-label">OUR SERVICES</p>
            <h1 className="font-serif text-4xl sm:text-6xl font-medium text-espresso leading-tight">
              Tailored celebrations across every milestone
            </h1>
            <p className="text-base text-muted leading-relaxed">
              Every service tier can be tailored to your venue, guest count, and
              aesthetic preferences. Select a service to review inclusions or request a
              customised quote.
            </p>
          </div>

          <ServicesCatalog
            services={services}
            initialCategory={resolvedSearchParams?.category || 'All'}
            currencySymbol={settings.currency_symbol}
          />
        </div>
      </section>
    </SiteShell>
  );
}
