import React from 'react';
import Link from 'next/link';
import { ExternalLink, Quote, Star } from 'lucide-react';
import MotionReveal from '@/components/ui/MotionReveal';
import type { TestimonialRecord } from '@/types/database';

export default function ReviewsSection({
  reviews,
}: {
  reviews: TestimonialRecord[];
}) {
  return (
    <section className="bg-cream py-20 lg:py-28 border-b border-beige/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <MotionReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="eyebrow-label">CLIENT PERSPECTIVES</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-espresso">
              Words from families &amp; hosts
            </h2>
          </div>
          <Link
            href="/reviews"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-mocha hover:text-espresso border-b border-mocha/40 pb-1 self-start md:self-auto"
          >
            View Reviews
          </Link>
        </MotionReveal>

        {reviews.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-7">
            {reviews.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="luxury-card rounded-2xl p-7 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Quote className="w-5 h-5 text-sand" />
                    {review.rating && (
                      <div className="flex items-center gap-0.5 text-bronze">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
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
                    <p className="font-serif text-lg font-medium text-espresso">
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
                      <span>{review.source_label || 'Source'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-beige bg-ivory p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <h3 className="font-serif text-2xl text-espresso">
                Verified client testimonials appear here once published
              </h3>
              <p className="text-sm text-muted">
                We only display authentic reviews shared with host permission. Studio
                administrators can add and approve verified client reviews from the dashboard.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full border border-sand bg-white text-xs font-medium uppercase tracking-[0.16em] text-espresso hover:border-mocha transition-colors shrink-0"
            >
              Share Feedback
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
