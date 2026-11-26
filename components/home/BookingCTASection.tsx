import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';
import type { BusinessSettings } from '@/types/database';

export default function BookingCTASection({
  settings,
}: {
  settings: BusinessSettings;
}) {
  const waHref = buildWhatsAppUrl(
    settings.whatsapp,
    `Hello ${settings.business_name}, I would like to discuss planning an upcoming celebration.`
  );

  return (
    <section className="bg-beige/60 py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
        <p className="eyebrow-label">BEGIN YOUR CELEBRATION</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-medium text-espresso leading-tight">
          Ready to compose an unforgettable gathering?
        </h2>
        <p className="text-base text-muted leading-relaxed max-w-2xl mx-auto">
          Calculate an indicative estimate in minutes, request your preferred event
          date for studio review, or connect directly with our planners on WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-espresso transition-colors shadow-subtle"
          >
            <span>Request a Booking</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/estimate"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-sand bg-white text-espresso text-xs font-medium uppercase tracking-[0.16em] hover:border-mocha transition-colors"
          >
            <span>Calculate Event Cost</span>
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-espresso/20 bg-ivory text-espresso text-xs font-medium uppercase tracking-[0.16em] hover:border-mocha transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-mocha" />
            <span>WhatsApp Studio</span>
          </a>
        </div>
      </div>
    </section>
  );
}
