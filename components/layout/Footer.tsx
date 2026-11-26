'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  ref,
  onValue,
  runTransaction,
  onDisconnect,
  set,
  serverTimestamp,
} from 'firebase/database';
import { database } from '@/lib/firebase';
import BrandLogo from '@/components/ui/BrandLogo';
import { buildWhatsAppUrl } from '@/lib/utils';
import type { BusinessSettings } from '@/types/database';
import type { ServiceItem } from '@/types/service';

function useVisitorCount() {
  const [totalVisitors, setTotalVisitors] = useState<number | null>(null);
  const [liveVisitors, setLiveVisitors] = useState<number | null>(null);

  useEffect(() => {
    try {
      const hasCounted = sessionStorage.getItem('sr_counted');
      if (!hasCounted) {
        const totalRef = ref(database, 'stats/totalVisitors');
        runTransaction(totalRef, (val) => (val || 0) + 1)
          .then(() => sessionStorage.setItem('sr_counted', 'true'))
          .catch(() => {});
      }

      const totalRef = ref(database, 'stats/totalVisitors');
      const unsubTotal = onValue(totalRef, (snap) => {
        setTotalVisitors(snap.val() || 0);
      });

      const sessionId =
        sessionStorage.getItem('sr_session_id') ||
        `v_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      sessionStorage.setItem('sr_session_id', sessionId);

      const myPresenceRef = ref(database, `presence/${sessionId}`);
      const presenceCountRef = ref(database, 'stats/liveCount');
      const connectedRef = ref(database, '.info/connected');

      const unsubConn = onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
          set(myPresenceRef, { online: true, lastSeen: serverTimestamp() }).catch(
            () => {}
          );
          onDisconnect(myPresenceRef)
            .remove()
            .catch(() => {});
        }
      });

      const unsubPres = onValue(ref(database, 'presence'), (snap) => {
        const data = snap.val();
        const count = data ? Object.keys(data).length : 1;
        setLiveVisitors(Math.max(1, count));
        set(presenceCountRef, Math.max(1, count)).catch(() => {});
      });

      return () => {
        unsubTotal();
        unsubConn();
        unsubPres();
      };
    } catch {
      return undefined;
    }
  }, []);

  return { totalVisitors, liveVisitors };
}

export default function Footer({
  settings,
  services,
}: {
  settings: BusinessSettings;
  services: ServiceItem[];
}) {
  const router = useRouter();
  const { totalVisitors, liveVisitors } = useVisitorCount();

  const handleCopyrightClick = () => {
    const count = parseInt(sessionStorage.getItem('sre_admin_clicks') || '0', 10) + 1;
    sessionStorage.setItem('sre_admin_clicks', String(count));
    if (count >= 3) {
      sessionStorage.setItem('sre_admin_clicks', '0');
      router.push('/admin');
    } else {
      setTimeout(() => sessionStorage.setItem('sre_admin_clicks', '0'), 1500);
    }
  };

  const whatsAppHref = buildWhatsAppUrl(
    settings.whatsapp,
    `Hello ${settings.business_name}, I would like to enquire about planning an event.`
  );

  return (
    <footer className="bg-espresso text-ivory border-t border-sand/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-ivory/15">
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo
              businessName={settings.business_name}
              monogram={settings.monogram}
              variant="light"
            />
            <p className="text-sm leading-relaxed text-beige/90 max-w-sm">
              A luxury event planning and design studio crafting bespoke weddings,
              milestone celebrations, and refined hospitality experiences across{' '}
              {settings.service_areas}.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-sand/40 text-xs text-ivory hover:border-ivory hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{settings.instagram_handle}</span>
              </a>
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-sand/40 text-xs text-ivory hover:border-ivory hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sand">
              Studio
            </h3>
            <ul className="space-y-2.5 text-sm text-ivory/90">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/estimate" className="hover:text-white transition-colors">
                  Cost Estimator
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white transition-colors">
                  Book a Date
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Client Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sand">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm text-ivory/90">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sand">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-ivory/90">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sand shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sand shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sand shrink-0 mt-0.5" />
                <span className="leading-relaxed">{settings.service_areas}</span>
              </li>
            </ul>

            {(liveVisitors !== null || totalVisitors !== null) && (
              <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-beige">
                {liveVisitors !== null && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {liveVisitors} browsing now
                  </span>
                )}
                {totalVisitors !== null && (
                  <span>{totalVisitors.toLocaleString('en-IN')} studio visits</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-beige/85">
          <p
            onClick={handleCopyrightClick}
            className="select-none cursor-default hover:text-ivory transition-colors"
          >
            © {new Date().getFullYear()} {settings.business_name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
