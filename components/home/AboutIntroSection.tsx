import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MotionReveal from '@/components/ui/MotionReveal';
import type { BusinessSettings } from '@/types/database';

export default function AboutIntroSection({
  settings,
}: {
  settings: BusinessSettings;
}) {
  return (
    <section className="bg-cream py-20 lg:py-28 border-b border-beige/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <MotionReveal className="lg:col-span-5 order-2 lg:order-1">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-sand/40 bg-ivory shadow-editorial">
              <img
                src="/events/real/reception_stage.jpg"
                alt="Editorial reception stage design"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1} className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <p className="eyebrow-label">OUR STUDIO</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-espresso leading-[1.12]">
              More than events.
              <br />
              We create experiences.
            </h2>
            <p className="text-base text-espresso/80 leading-relaxed max-w-2xl">
              {settings.about_story}
            </p>
            <p className="text-base text-muted leading-relaxed max-w-2xl">
              {settings.about_philosophy}
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-mocha hover:text-espresso border-b border-mocha/40 pb-1.5 transition-colors"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
