import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MotionReveal from '@/components/ui/MotionReveal';
import type { ServiceItem } from '@/types/service';

export default function FeaturedServicesSection({
  services,
}: {
  services: ServiceItem[];
}) {
  const featured = services.filter((s) => s.featured).slice(0, 4);
  const items = featured.length > 0 ? featured : services.slice(0, 4);

  return (
    <section className="bg-beige/45 py-20 lg:py-28 border-b border-beige/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <MotionReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="eyebrow-label">FEATURED SERVICES</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-espresso">
              Signature styling &amp; full-service planning
            </h2>
          </div>
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-espresso transition-colors self-start md:self-auto"
          >
            <span>Estimate Your Event</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </MotionReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((service, idx) => (
            <MotionReveal key={service.id} delay={idx * 0.06}>
              <div className="luxury-card rounded-2xl overflow-hidden grid sm:grid-cols-12 h-full">
                <div className="sm:col-span-5 aspect-[4/3] sm:aspect-auto bg-cream overflow-hidden">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-mocha font-semibold">
                      {service.category}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-espresso">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {service.short_description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-beige/60">
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-xs font-semibold uppercase tracking-[0.16em] text-espresso hover:text-mocha inline-flex items-center gap-1.5"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/book?service=${encodeURIComponent(service.title)}`}
                      className="text-xs font-medium text-mocha hover:text-espresso"
                    >
                      Request Quote
                    </Link>
                  </div>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
