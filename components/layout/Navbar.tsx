'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import BrandLogo from '@/components/ui/BrandLogo';
import { cn } from '@/lib/utils';
import type { BusinessSettings } from '@/types/database';

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/estimate', label: 'Estimate' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar({ settings }: { settings: BusinessSettings }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300 border-b',
        scrolled
          ? 'bg-ivory/95 backdrop-blur-md border-beige shadow-subtle py-3'
          : 'bg-ivory/90 backdrop-blur-sm border-beige/60 py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <BrandLogo
          businessName={settings.business_name}
          monogram={settings.monogram}
          variant="dark"
        />

        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-espresso/85"
        >
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative py-1 transition-colors hover:text-mocha',
                  active && 'text-mocha font-semibold'
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-mocha" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/book"
            className="px-5 py-2.5 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.14em] hover:bg-espresso transition-colors shadow-sm"
          >
            Plan Your Event
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="lg:hidden p-2 rounded-full border border-beige text-espresso hover:bg-cream transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-beige bg-ivory px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              className="py-2 text-base font-medium text-espresso border-b border-beige/60"
            >
              Home
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-base font-medium text-espresso border-b border-beige/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/book"
              className="w-full py-3 rounded-full bg-mocha text-white text-center text-xs font-medium uppercase tracking-[0.16em]"
            >
              Plan Your Event
            </Link>
            <Link
              href="/estimate"
              className="w-full py-3 rounded-full border border-sand text-espresso text-center text-xs font-medium uppercase tracking-[0.16em]"
            >
              Calculate Estimate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
