import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Plus } from 'lucide-react';
import SiteShell from '@/components/layout/SiteShell';
import { getBusinessSettings, getServiceBySlug } from '@/lib/data/repository';
import { formatCurrency } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: service.title,
    description: service.short_description,
    openGraph: {
      title: service.title,
      description: service.short_description,
      images: [{ url: service.image_url }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [service, settings] = await Promise.all([
    getServiceBySlug(params.slug),
    getBusinessSettings(),
  ]);

  if (!service || !service.active) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="bg-ivory py-12 lg:py-20 border-b border-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-mocha hover:text-espresso"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="eyebrow-label">{service.category}</p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-espresso leading-tight">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-muted leading-relaxed">
                {service.description || service.short_description}
              </p>

              <div className="flex flex-wrap gap-6 pt-2 text-sm">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-taupe font-semibold">
                    Indicative Starting Range
                  </p>
                  <p className="font-serif text-2xl text-espresso mt-1">
                    {service.starting_price
                      ? `From ${formatCurrency(service.starting_price, settings.currency_symbol)}`
                      : 'Request a personalised quote'}
                  </p>
                </div>
                {service.typical_duration && (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-taupe font-semibold">
                      Typical Schedule
                    </p>
                    <p className="font-serif text-2xl text-espresso mt-1">
                      {service.typical_duration}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href={`/book?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-espresso transition-colors"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/estimate"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-sand bg-white text-espresso text-xs font-medium uppercase tracking-[0.16em] hover:border-mocha transition-colors"
                >
                  <span>Calculate Event Cost</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-sand/40 bg-cream shadow-editorial">
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
          <div className="bg-white border border-beige rounded-2xl p-8 space-y-5">
            <h2 className="font-serif text-3xl text-espresso">What’s Included</h2>
            <ul className="space-y-3">
              {service.whats_included.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-espresso/85">
                  <Check className="w-4 h-4 text-mocha shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-beige rounded-2xl p-8 space-y-5">
            <h2 className="font-serif text-3xl text-espresso">Optional Add-Ons</h2>
            {service.optional_addons.length > 0 ? (
              <ul className="space-y-3">
                {service.optional_addons.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-espresso/85">
                    <Plus className="w-4 h-4 text-taupe shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">
                Additional decor, catering, and production add-ons can be discussed
                during your consultation.
              </p>
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
