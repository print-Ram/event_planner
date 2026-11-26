'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { PORTFOLIO_CATEGORIES } from '@/lib/seedData';
import type { PortfolioProject } from '@/types/database';
import { cn } from '@/lib/utils';

export default function PortfolioGrid({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const [category, setCategory] = useState('All');

  const filtered =
    category === 'All'
      ? projects
      : projects.filter((p) => p.category === category);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2">
        {PORTFOLIO_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-medium border transition-colors',
              category === cat
                ? 'bg-espresso text-ivory border-espresso'
                : 'bg-white text-espresso border-beige hover:border-sand'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-beige bg-cream p-12 text-center text-sm text-muted">
          No published projects in this category yet.
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-7 space-y-7">
          {filtered.map((project, idx) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group break-inside-avoid block luxury-card rounded-2xl overflow-hidden"
            >
              <div
                className={cn(
                  'overflow-hidden bg-cream relative',
                  idx % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'
                )}
              >
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
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.16em] text-mocha font-semibold">
                  <span>{project.category}</span>
                  {project.location && (
                    <span className="inline-flex items-center gap-1 text-muted font-normal normal-case tracking-normal">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </span>
                  )}
                </div>
                <h2 className="font-serif text-2xl text-espresso group-hover:text-mocha transition-colors">
                  {project.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  {project.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-espresso pt-1">
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
