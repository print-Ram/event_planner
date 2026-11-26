import React from 'react';
import type { Metadata } from 'next';
import SiteShell from '@/components/layout/SiteShell';
import { getBusinessSettings } from '@/lib/data/repository';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How customer enquiry, booking, and event image permissions are handled.',
};

export default async function PrivacyPage() {
  const settings = await getBusinessSettings();

  return (
    <SiteShell>
      <section className="bg-ivory py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3 border-b border-beige pb-8">
            <p className="eyebrow-label">LEGAL &amp; PRIVACY</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-espresso">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted">
              {settings.business_name} · {settings.location}
            </p>
          </div>

          <div className="space-y-8 text-sm sm:text-base text-espresso/85 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-2xl text-espresso">
                1. Customer Data Collection &amp; Usage
              </h2>
              <p>{settings.privacy_policy}</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-2xl text-espresso">
                2. Contact Form &amp; Estimate Information
              </h2>
              <p>
                Details submitted through our contact, estimator, and booking request
                forms—including your name, email, telephone number, event date, venue
                location, and event notes—are stored securely solely for consultation,
                availability verification, and quotation preparation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-2xl text-espresso">
                3. Customer Image Permissions
              </h2>
              <p>
                Event photographs and videos from private celebrations are published in
                our online portfolio or Instagram journal only with the host’s explicit
                permission. To request removal of an image, contact{' '}
                <a
                  href={`mailto:${settings.email}`}
                  className="text-mocha underline"
                >
                  {settings.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
