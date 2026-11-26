import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MotionReveal from '@/components/ui/MotionReveal';

export default function HeroSection() {
  return (
    <section className="relative bg-ivory border-b border-beige/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <MotionReveal className="lg:col-span-6 space-y-7">
            <p className="eyebrow-label">EVENT PLANNING · DESIGN · EXPERIENCES</p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.75rem] font-medium text-espresso leading-[1.08]">
              Thoughtfully planned.
              <br />
              <span className="italic text-mocha">Beautifully celebrated.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">
              From intimate gatherings to grand celebrations, we create unforgettable
              experiences through thoughtful planning, beautiful design and exceptional
              attention to detail.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-espresso/25 bg-white text-espresso text-xs font-medium uppercase tracking-[0.16em] hover:border-mocha hover:bg-cream transition-all"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-espresso transition-all shadow-subtle"
              >
                <span>Plan Your Event</span>
              </Link>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.12} className="lg:col-span-6">
            <div className="relative">
              <div className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] w-full overflow-hidden rounded-2xl border border-sand/40 bg-cream shadow-editorial">
                <img
                  src="/events/real/wedding_mandapam.jpg"
                  alt="Luxury floral wedding mandapam styled by the studio"
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-6 -left-6 bg-ivory border border-beige rounded-xl px-6 py-4 shadow-subtle max-w-[240px]">
                <p className="text-[10px] uppercase tracking-[0.22em] text-mocha font-semibold">
                  Bespoke Curation
                </p>
                <p className="font-serif text-lg text-espresso mt-1 leading-snug">
                  Tailored floral artistry &amp; full-service event execution
                </p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
