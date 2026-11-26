import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  businessName: string;
  monogram?: string;
  variant?: 'dark' | 'light';
  href?: string;
  className?: string;
}

export default function BrandLogo({
  businessName,
  monogram = 'SR',
  variant = 'dark',
  href = '/',
  className,
}: BrandLogoProps) {
  const isLight = variant === 'light';

  const content = (
    <div className={cn('inline-flex items-center gap-3 group', className)}>
      <span
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full border font-serif text-sm font-semibold tracking-wider transition-colors',
          isLight
            ? 'border-sand/40 bg-white/5 text-ivory group-hover:border-ivory'
            : 'border-sand bg-cream text-espresso group-hover:border-mocha'
        )}
      >
        {monogram}
      </span>
      <div className="flex flex-col">
        <span
          className={cn(
            'font-serif text-xl sm:text-2xl font-medium tracking-tight leading-none',
            isLight ? 'text-ivory' : 'text-espresso'
          )}
        >
          {businessName}
        </span>
        <span
          className={cn(
            'mt-1 text-[9px] font-sans font-medium uppercase tracking-[0.26em] leading-none',
            isLight ? 'text-sand/85' : 'text-mocha'
          )}
        >
          EVENT PLANNING &amp; DESIGN
        </span>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-block focus:outline-none">
      {content}
    </Link>
  );
}
