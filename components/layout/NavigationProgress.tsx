'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import DelayedSkeleton from '@/components/ui/DelayedSkeleton';

export default function NavigationProgress({ delayMs = 200 }: { delayMs?: number }) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const timerRef = useRef<number | null>(null);
  const maxTimeoutRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (maxTimeoutRef.current !== null) {
      window.clearTimeout(maxTimeoutRef.current);
      maxTimeoutRef.current = null;
    }
  };

  // Clear loading state immediately once the destination pathname renders
  useEffect(() => {
    clearTimers();
    setIsNavigating(false);
    setShowOverlay(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;

      const nextPath = href.split('?')[0].split('#')[0];
      if (nextPath === pathname) return;

      clearTimers();
      setIsNavigating(true);

      // Only reveal the skeleton & top bar if routing takes longer than delayMs
      timerRef.current = window.setTimeout(() => {
        setShowOverlay(true);
      }, delayMs);

      // Safety cap so indicator never gets stuck on aborted navigation
      maxTimeoutRef.current = window.setTimeout(() => {
        setIsNavigating(false);
        setShowOverlay(false);
      }, 12000);
    };

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
      clearTimers();
    };
  }, [pathname, delayMs]);

  if (!isNavigating || !showOverlay) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-beige overflow-hidden"
      >
        <div className="h-full w-1/2 bg-mocha animate-[pulse_1s_ease-in-out_infinite] translate-x-1/2" />
      </div>
      <div
        role="status"
        aria-live="polite"
        className="fixed inset-0 top-[72px] z-30 bg-ivory/95 backdrop-blur-sm overflow-hidden"
      >
        <DelayedSkeleton delayMs={0} variant="editorial" />
      </div>
    </>
  );
}
