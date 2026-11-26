import React from 'react';
import type { Metadata } from 'next';
import SiteShell from '@/components/layout/SiteShell';
import EventEstimatorWizard from '@/components/estimator/EventEstimatorWizard';
import {
  getBusinessSettings,
  getPackages,
  getPricingRules,
} from '@/lib/data/repository';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Event Cost Estimator',
  description:
    'Interactive multi-step event cost estimator to explore indicative pricing for weddings, birthdays, corporate events, and custom celebrations.',
};

export default async function EstimatePage() {
  const [packages, pricingRules, settings] = await Promise.all([
    getPackages(false),
    getPricingRules(false),
    getBusinessSettings(),
  ]);

  return (
    <SiteShell>
      <section className="bg-ivory py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <p className="eyebrow-label">EVENT COST ESTIMATOR</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-medium text-espresso">
              Compose your celebration &amp; view an indicative range
            </h1>
            <p className="text-base text-muted leading-relaxed">
              Answer a few guided questions about your occasion, guest count, and
              preferred services to calculate an indicative budget range and submit it
              directly to our planning studio.
            </p>
          </div>

          <EventEstimatorWizard
            packages={packages}
            pricingRules={pricingRules}
            settings={settings}
          />
        </div>
      </section>
    </SiteShell>
  );
}
