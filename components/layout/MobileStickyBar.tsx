'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, MessageCircle, Phone } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';
import type { BusinessSettings } from '@/types/database';

export default function MobileStickyBar({ settings }: { settings: BusinessSettings }) {
  const waHref = buildWhatsAppUrl(
    settings.whatsapp,
    `Hello ${settings.business_name}, I would like to discuss planning an event.`
  );

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-md border-t border-beige px-3 py-2.5 shadow-editorial flex items-center gap-2">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2.5 rounded-full border border-sand bg-white text-espresso text-xs font-medium flex items-center justify-center gap-1.5"
      >
        <MessageCircle className="w-3.5 h-3.5 text-mocha" />
        <span>WhatsApp</span>
      </a>
      <a
        href={`tel:${settings.phone.replace(/\s+/g, '')}`}
        className="flex-1 py-2.5 rounded-full border border-sand bg-white text-espresso text-xs font-medium flex items-center justify-center gap-1.5"
      >
        <Phone className="w-3.5 h-3.5 text-mocha" />
        <span>Call</span>
      </a>
      <Link
        href="/book"
        className="flex-1 py-2.5 rounded-full bg-mocha text-white text-xs font-medium flex items-center justify-center gap-1.5"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Book</span>
      </Link>
    </div>
  );
}
