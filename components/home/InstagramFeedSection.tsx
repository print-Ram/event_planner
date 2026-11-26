import React from 'react';
import { ExternalLink, Instagram, Play } from 'lucide-react';
import MotionReveal from '@/components/ui/MotionReveal';
import type { BusinessSettings, InstagramPost } from '@/types/database';

export default function InstagramFeedSection({
  settings,
  posts,
}: {
  settings: BusinessSettings;
  posts: InstagramPost[];
}) {
  if (!settings.instagram_enabled) return null;

  return (
    <section className="bg-ivory py-20 lg:py-28 border-b border-beige/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <MotionReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <p className="eyebrow-label">SOCIAL JOURNAL</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-espresso">
              Currently on Instagram.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="h-11 w-11 rounded-full border border-sand bg-cream flex items-center justify-center overflow-hidden">
                <img
                  src={settings.logo_url || '/sri-ram-icon.png'}
                  alt={settings.business_name}
                  className="h-full w-full object-cover"
                />
              </span>
              <div>
                <p className="text-sm font-semibold text-espresso">
                  {settings.instagram_handle}
                </p>
                <p className="text-xs text-muted">{settings.business_name}</p>
              </div>
            </div>
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.14em] hover:bg-espresso transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Follow on Instagram</span>
            </a>
          </div>
        </MotionReveal>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 6).map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group luxury-card rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="aspect-square overflow-hidden bg-cream relative">
                  <img
                    src={post.thumbnail_url || post.media_url}
                    alt={post.caption || 'Instagram celebration feature'}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {post.media_type === 'VIDEO' && (
                    <span className="absolute top-3 right-3 h-8 w-8 rounded-full bg-espresso/75 text-ivory flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </span>
                  )}
                </div>
                <div className="p-5 flex items-start justify-between gap-3">
                  <p className="text-sm text-espresso/85 line-clamp-2 leading-relaxed">
                    {post.caption}
                  </p>
                  <ExternalLink className="w-4 h-4 text-taupe shrink-0 mt-0.5 group-hover:text-mocha transition-colors" />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-beige bg-cream p-10 text-center space-y-4">
            <p className="text-sm text-muted">
              Explore our latest behind-the-scenes reels and celebrations directly on Instagram.
            </p>
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.14em]"
            >
              <Instagram className="w-4 h-4" />
              <span>Visit {settings.instagram_handle}</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
