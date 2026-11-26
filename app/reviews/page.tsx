import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, Quote, Star } from 'lucide-react';
import SiteShell from '@/components/layout/SiteShell';
import { getTestimonials } from '@/lib/data/repository';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Client Reviews',
  description:
    'Authentic testimonials and feedback from families and hosts we have worked with.',
};

export default async function ReviewsPage() {
  const reviews = await getTestimonials(false);

  return (
    <SiteShell>
      <section className="bg-ivory py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-4">
            <p className="eyebrow-label">CLIENT REVIEWS</p>
            <h1 className="font-serif text-4xl sm:text-6xl font-medium text-espresso leading-tight">
              Reflections from our celebrations
            </h1>
            <p className="text-base text-muted leading-relaxed">
              Every review displayed here is an authentic client reflection published
              with permission.
            </p>
          </div>

          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between"
                >
                  {review.event_image && (
                    <div className="aspect-[16/10] overflow-hidden bg-cream">
                      <img
                        src={review.event_image}
                        alt={review.event_type}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Quote className="w-5 h-5 text-sand" />
                        {review.rating && (
                          <div className="flex items-center gap-0.5 text-bronze">
                            {Array.from({ length: review.rating }).map((_, idx) => (
                              <Star key={idx} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-espresso/85 leading-relaxed">
                        “{review.review_text}”
                      </p>
                    </div>

                    <div className="pt-4 border-t border-beige flex items-center justify-between gap-3">
                      <div>
                        <p className="font-serif text-xl text-espresso">
                          {review.customer_name}
                        </p>
                        <p className="text-xs text-muted">{review.event_type}</p>
                      </div>
                      {review.source_url && (
                        <a
                          href={review.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-mocha hover:text-espresso"
                        >
                          <span>{review.source_label || 'Verify'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-beige bg-cream p-10 sm:p-14 text-center max-w-3xl mx-auto space-y-5">
              <h2 className="font-serif text-3xl text-espresso">
                Awaiting verified client reviews
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                We never publish fabricated testimonials. Verified client stories and
                review links added by the studio administrator in the dashboard appear
                here automatically.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/portfolio"
                  className="px-6 py-3 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em]"
                >
                  Browse Portfolio
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full border border-sand bg-white text-espresso text-xs font-medium uppercase tracking-[0.16em]"
                >
                  Submit Client Feedback
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
