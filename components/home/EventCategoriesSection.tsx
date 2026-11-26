import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import MotionReveal from '@/components/ui/MotionReveal';

const EVENT_CATEGORIES = [
  {
    title: 'Weddings & Engagements',
    subtitle: 'Sacred mandapams, haldi courtyards, and editorial receptions.',
    image: '/events/real/wedding_mandapam.jpg',
    href: '/services?category=Weddings+%26+Engagements',
  },
  {
    title: 'Birthdays & Anniversaries',
    subtitle: 'Milestone backdrops, intimate dinners, and family celebrations.',
    image: '/events/real/birthday_stage.jpg',
    href: '/services?category=Birthdays+%26+Anniversaries',
  },
  {
    title: 'Baby & Bridal Showers',
    subtitle: 'Serene pastel palettes, Seemantham settings, and floral lounges.',
    image: '/events/house_warming.jpg',
    href: '/services?category=Baby+%26+Bridal+Showers',
  },
  {
    title: 'Corporate Events',
    subtitle: 'Executive summits, product reveals, and gala stage production.',
    image: '/events/real/college_fest_stage.jpg',
    href: '/services?category=Corporate+Events',
  },
  {
    title: 'Private Celebrations',
    subtitle: 'Gruhapravesam entrances, garden soirées, and private proposals.',
    image: '/events/real/housewarming_entrance.jpg',
    href: '/services?category=Private+Celebrations',
  },
  {
    title: 'Custom Events',
    subtitle: 'Bespoke plate decors, cultural gatherings, and tailored concepts.',
    image: '/events/real/haldi_mehendi.jpg',
    href: '/services?category=Custom+Events',
  },
];

export default function EventCategoriesSection() {
  return (
    <section className="bg-ivory py-20 lg:py-28 border-b border-beige/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <MotionReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="eyebrow-label">EVENT CATEGORIES</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-espresso">
              Curated for every meaningful chapter
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-mocha hover:text-espresso border-b border-mocha/40 pb-1 self-start md:self-auto"
          >
            View All Services
          </Link>
        </MotionReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {EVENT_CATEGORIES.map((category, idx) => (
            <MotionReveal key={category.title} delay={idx * 0.05}>
              <Link
                href={category.href}
                className="group block luxury-card rounded-2xl overflow-hidden h-full"
              >
                <div className="aspect-[4/3] overflow-hidden bg-cream">
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-2xl font-medium text-espresso group-hover:text-mocha transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {category.subtitle}
                    </p>
                  </div>
                  <span className="mt-1 p-2 rounded-full border border-beige text-mocha group-hover:bg-mocha group-hover:text-white group-hover:border-mocha transition-colors shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
