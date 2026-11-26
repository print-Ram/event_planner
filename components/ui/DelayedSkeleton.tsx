'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface DelayedSkeletonProps {
  delayMs?: number;
  variant?: 'editorial' | 'grid' | 'wizard';
}

export default function DelayedSkeleton({
  delayMs = 200,
  variant = 'editorial',
}: DelayedSkeletonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  if (!visible) {
    return <div className="min-h-[60vh] bg-ivory" aria-hidden="true" />;
  }

  return (
    <div
      role="status"
      aria-label="Loading page content"
      className="min-h-[70vh] bg-ivory animate-in fade-in duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 space-y-12">
        <div className="space-y-4 max-w-2xl">
          <div className="h-3 w-32 rounded-full bg-beige/70 animate-pulse" />
          <div className="h-10 sm:h-12 w-4/5 rounded-xl bg-beige/80 animate-pulse" />
          <div className="h-4 w-full rounded-lg bg-cream animate-pulse" />
          <div className="h-4 w-2/3 rounded-lg bg-cream animate-pulse" />
        </div>

        {variant === 'editorial' && (
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="h-48 rounded-2xl bg-cream border border-beige/60 animate-pulse" />
              <div className="flex gap-3">
                <div className="h-11 w-40 rounded-full bg-beige/80 animate-pulse" />
                <div className="h-11 w-36 rounded-full bg-cream border border-beige animate-pulse" />
              </div>
            </div>
            <div className="lg:col-span-6 aspect-[4/3] rounded-2xl bg-beige/55 animate-pulse" />
          </div>
        )}

        {variant === 'grid' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-beige bg-white overflow-hidden"
              >
                <div
                  className={cn(
                    'aspect-[4/3] bg-beige/55 animate-pulse',
                    idx % 2 === 1 && 'bg-cream'
                  )}
                />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-24 rounded-full bg-beige/70 animate-pulse" />
                  <div className="h-6 w-3/4 rounded-lg bg-beige/80 animate-pulse" />
                  <div className="h-4 w-full rounded-lg bg-cream animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {variant === 'wizard' && (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 h-96 rounded-2xl bg-white border border-beige p-8 space-y-5">
              <div className="h-2 w-full rounded-full bg-beige/60 animate-pulse" />
              <div className="h-8 w-1/2 rounded-lg bg-beige/80 animate-pulse" />
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-14 rounded-xl bg-cream animate-pulse" />
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 h-72 rounded-2xl bg-cream border border-beige animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
