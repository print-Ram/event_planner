import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteShell from '@/components/layout/SiteShell';
import { getBusinessSettings } from '@/lib/data/repository';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About Our Studio',
  description:
    'Discover the philosophy, planning process, and creative craft behind our event planning and design studio.',
};

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Discovery & Concept',
    detail:
      'We listen closely to your occasion, guest experience goals, venue setting, and aesthetic preferences.',
  },
  {
    step: '02',
    title: 'Design Direction & Estimate',
    detail:
      'Our studio prepares a cohesive palette, spatial layout, and transparent itemised scope tailored to your priorities.',
  },
  {
    step: '03',
    title: 'Curation & Vendor Alignment',
    detail:
      'Florists, lighting designers, caterers, and artisans are coordinated under a single master production schedule.',
  },
  {
    step: '04',
    title: 'Composed On-Site Execution',
    detail:
      'Every floral arch, plate tray, and table setting is finished well ahead of guest arrival for an effortless celebration.',
  },
];

export default async function AboutPage() {
  const settings = await getBusinessSettings();

  return (
    <SiteShell>
      {/* Editorial Hero */}
      <section className="bg-ivory py-16 lg:py-24 border-b border-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="eyebrow-label">ABOUT THE STUDIO</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-espresso leading-[1.1]">
              Thoughtful design, warm hospitality, lasting memories.
            </h1>
            <p className="text-base text-muted leading-relaxed">
              {settings.business_name} is an independent event planning and styling
              studio based in {settings.location}, serving {settings.service_areas}.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[16/11] overflow-hidden rounded-2xl border border-sand/40 bg-cream shadow-editorial">
              <img
                src="/events/real/wedding_mandapam.jpg"
                alt={`${settings.business_name} floral production`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story & Philosophy */}
      <section className="bg-cream py-16 lg:py-24 border-b border-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-4">
            <p className="eyebrow-label">OUR STORY</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso">
              Rooted in celebration &amp; cultural nuance
            </h2>
            <p className="text-base text-espresso/85 leading-relaxed whitespace-pre-line">
              {settings.about_story}
            </p>
          </div>
          <div className="lg:col-span-6 space-y-4">
            <p className="eyebrow-label">OUR PHILOSOPHY</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso">
              Restraint, warmth, and precision
            </h2>
            <p className="text-base text-espresso/85 leading-relaxed whitespace-pre-line">
              {settings.about_philosophy}
            </p>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-ivory py-16 lg:py-24 border-b border-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <p className="eyebrow-label">HOW WE WORK</p>
            <h2 className="font-serif text-3xl sm:text-5xl text-espresso">
              From initial conversation to final curtain
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((item) => (
              <div
                key={item.step}
                className="bg-white border border-beige rounded-2xl p-7 space-y-3"
              >
                <span className="font-serif text-3xl text-taupe">{item.step}</span>
                <h3 className="font-serif text-2xl text-espresso">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Collaborators & CTA */}
      <section className="bg-beige/45 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="eyebrow-label">CREATIVE COLLABORATORS</p>
          <h2 className="font-serif text-3xl sm:text-5xl text-espresso">
            A trusted circle of artisans, florists &amp; production partners
          </h2>
          <p className="text-base text-muted leading-relaxed max-w-2xl mx-auto">
            Our studio partners with seasoned floral craftsmen, structural fabricators,
            lighting engineers, traditional caterers, and documentary photographers so
            every element arrives harmonised under one creative vision.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-espresso transition-colors"
            >
              <span>Plan Your Event</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-sand bg-white text-espresso text-xs font-medium uppercase tracking-[0.16em] hover:border-mocha transition-colors"
            >
              <span>Explore Portfolio</span>
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
