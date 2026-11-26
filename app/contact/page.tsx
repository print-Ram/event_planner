import React from 'react';
import type { Metadata } from 'next';
import { Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import SiteShell from '@/components/layout/SiteShell';
import ContactForm from '@/components/forms/ContactForm';
import { getBusinessSettings } from '@/lib/data/repository';
import { buildWhatsAppUrl } from '@/lib/utils';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Connect with our planning studio via enquiry form, WhatsApp, email, or telephone.',
};

export default async function ContactPage() {
  const settings = await getBusinessSettings();
  const waHref = buildWhatsAppUrl(
    settings.whatsapp,
    `Hello ${settings.business_name}, I would like to discuss an upcoming event.`
  );

  return (
    <SiteShell>
      <section className="bg-ivory py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="eyebrow-label">CONTACT THE STUDIO</p>
              <h1 className="font-serif text-4xl sm:text-5xl font-medium text-espresso leading-tight">
                Let’s begin planning your celebration
              </h1>
              <p className="text-base text-muted leading-relaxed">
                Share your occasion details or connect directly through WhatsApp or
                Instagram for a prompt conversation with our planners.
              </p>
            </div>

            <div className="bg-cream border border-beige rounded-2xl p-7 space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-mocha shrink-0 mt-1" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-taupe font-semibold">
                    Telephone
                  </p>
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="text-espresso hover:text-mocha"
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-mocha shrink-0 mt-1" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-taupe font-semibold">
                    Email
                  </p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-espresso hover:text-mocha"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-mocha shrink-0 mt-1" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-taupe font-semibold">
                    Location &amp; Service Areas
                  </p>
                  <p className="text-espresso">{settings.service_areas}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.14em] hover:bg-espresso transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Chat</span>
              </a>
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-sand bg-white text-espresso text-xs font-medium uppercase tracking-[0.14em] hover:border-mocha transition-colors"
              >
                <Instagram className="w-4 h-4 text-mocha" />
                <span>{settings.instagram_handle}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm
              whatsappNumber={settings.whatsapp}
              businessName={settings.business_name}
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
