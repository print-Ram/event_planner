'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { PORTFOLIO_CATEGORIES } from '@/lib/seedData';
import type { PortfolioProject } from '@/types/database';
import { cn } from '@/lib/utils';

export default function FeaturedPortfolioSection({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filtered =
    selectedCategory === 'All'
      ? projects.slice(0, 6)
      : projects.filter((p) => p.category === selectedCategory).slice(0, 6);

  return (
    <section className="bg-ivory py-20 lg:py-28 border-b border-beige/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="eyebrow-label">FEATURED PORTFOLIO</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-espresso">
              Celebrations crafted by our studio
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {PORTFOLIO_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-4 py-2 rounded-full text-xs font-medium transition-colors border',
                  selectedCategory === category
                    ? 'bg-espresso text-ivory border-espresso'
                    : 'bg-white text-espresso/80 border-beige hover:border-sand'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group luxury-card rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-cream relative">
                <img
                  src={project.cover_image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {project.is_demo && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-espresso/80 text-ivory text-[10px] uppercase tracking-wider">
                    Concept Showcase
                  </span>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.16em] text-mocha font-semibold">
                    <span>{project.category}</span>
                    {project.location && (
                      <span className="inline-flex items-center gap-1 text-muted font-normal normal-case tracking-normal">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-espresso group-hover:text-mocha transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-espresso pt-2">
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-sand bg-white text-espresso text-xs font-medium uppercase tracking-[0.16em] hover:border-mocha hover:bg-cream transition-colors"
          >
            <span>Explore Complete Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
