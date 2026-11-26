import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Instagram, MapPin } from 'lucide-react';
import SiteShell from '@/components/layout/SiteShell';
import { getPortfolioBySlug } from '@/lib/data/repository';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.cover_image }],
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);
  if (!project || !project.published) notFound();

  const gallery = Array.from(
    new Set([project.cover_image, ...(project.gallery_images || [])].filter(Boolean))
  );

  return (
    <SiteShell>
      <article className="bg-ivory py-14 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-mocha hover:text-espresso"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow-label">{project.category}</span>
                {project.is_demo && (
                  <span className="px-3 py-1 rounded-full bg-cream border border-sand text-[11px] uppercase tracking-wider text-mocha">
                    Concept Showcase
                  </span>
                )}
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-medium text-espresso leading-tight">
                {project.title}
              </h1>
              <p className="text-base text-espresso/85 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="lg:col-span-5 bg-cream border border-beige rounded-2xl p-6 space-y-5">
              {project.location && (
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-taupe font-semibold">
                    Location
                  </p>
                  <p className="mt-1 text-sm text-espresso inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-mocha" />
                    <span>{project.location}</span>
                  </p>
                </div>
              )}

              {project.services_provided.length > 0 && (
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-taupe font-semibold mb-2">
                    Services Provided
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.services_provided.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full bg-white border border-beige text-xs text-espresso"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={`/book?service=${encodeURIComponent(project.category)}`}
                  className="px-5 py-2.5 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.14em] hover:bg-espresso transition-colors"
                >
                  Plan Similar Event
                </Link>
                {project.instagram_post_url && (
                  <a
                    href={project.instagram_post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-sand bg-white text-xs font-medium text-espresso hover:border-mocha transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-mocha" />
                    <span>View on Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {project.video_url && (
            <div className="rounded-2xl overflow-hidden border border-beige bg-cream">
              <video
                src={project.video_url}
                controls
                className="w-full max-h-[540px] object-cover"
              />
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            {gallery.map((imgUrl, idx) => (
              <div
                key={`${imgUrl}-${idx}`}
                className={
                  idx === 0
                    ? 'sm:col-span-2 aspect-[16/9] overflow-hidden rounded-2xl border border-beige bg-cream'
                    : 'aspect-[4/3] overflow-hidden rounded-2xl border border-beige bg-cream'
                }
              >
                <img
                  src={imgUrl}
                  alt={`${project.title} photograph ${idx + 1}`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
