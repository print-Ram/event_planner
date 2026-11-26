'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import type { ServiceItem } from '@/types/service';
import { cn, formatCurrency } from '@/lib/utils';

export default function ServicesCatalog({
  services,
  initialCategory = 'All',
  currencySymbol = '₹',
}: {
  services: ServiceItem[];
  initialCategory?: string;
  currencySymbol?: string;
}) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(services.map((s) => s.category)));
    return ['All', ...unique];
  }, [services]);

  const [selectedCategory, setSelectedCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : 'All'
  );

  const visibleServices =
    selectedCategory === 'All'
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-medium border transition-colors',
              selectedCategory === cat
                ? 'bg-espresso text-ivory border-espresso'
                : 'bg-white text-espresso border-beige hover:border-sand'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleServices.map((service) => (
          <article
            key={service.id}
            className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[4/3] bg-cream overflow-hidden">
                <img
                  src={service.image_url}
                  alt={service.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-mocha font-semibold">
                    {service.category}
                  </span>
                  {service.starting_price ? (
                    <span className="text-xs text-muted">
                      From {formatCurrency(service.starting_price, currencySymbol)}
                    </span>
                  ) : (
                    <span className="text-xs text-muted">Custom quote</span>
                  )}
                </div>

                <h2 className="font-serif text-3xl text-espresso">
                  {service.title}
                </h2>

                <p className="text-sm text-muted leading-relaxed">
                  {service.short_description}
                </p>

                {service.whats_included.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-beige/70">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-taupe font-semibold">
                      What’s Included
                    </p>
                    <ul className="space-y-1.5">
                      {service.whats_included.slice(0, 3).map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-espresso/80"
                        >
                          <Check className="w-3.5 h-3.5 text-mocha shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.optional_addons.length > 0 && (
                  <p className="text-xs text-muted">
                    <strong className="text-espresso/85 font-medium">
                      Optional add-ons:
                    </strong>{' '}
                    {service.optional_addons.slice(0, 2).join(', ')}
                  </p>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-cream/60 border-t border-beige flex items-center justify-between gap-3">
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-espresso hover:text-mocha"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/book?service=${encodeURIComponent(service.title)}`}
                className="px-4 py-2 rounded-full bg-mocha text-white text-xs font-medium hover:bg-espresso transition-colors"
              >
                Request Quote
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
