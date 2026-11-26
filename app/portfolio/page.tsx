import React from 'react';
import type { Metadata } from 'next';
import SiteShell from '@/components/layout/SiteShell';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import { getPortfolioProjects } from '@/lib/data/repository';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Browse curated wedding mandapams, receptions, haldi courtyards, milestone birthdays, and bespoke celebrations.',
};

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects(false);

  return (
    <SiteShell>
      <section className="bg-ivory py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-4">
            <p className="eyebrow-label">PORTFOLIO</p>
            <h1 className="font-serif text-4xl sm:text-6xl font-medium text-espresso leading-tight">
              A curated archive of celebrations
            </h1>
            <p className="text-base text-muted leading-relaxed">
              Selected installations, floral environments, and complete productions
              designed by our studio. Any concept showcases are clearly marked.
            </p>
          </div>

          <PortfolioGrid projects={projects} />
        </div>
      </section>
    </SiteShell>
  );
}
