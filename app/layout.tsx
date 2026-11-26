import './globals.css';
import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import { getBusinessSettings } from '@/lib/data/repository';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBusinessSettings();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sriramevents.com';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${settings.business_name} | Event Planning & Luxury Design Studio`,
      template: `%s | ${settings.business_name}`,
    },
    description: `${settings.tagline} Bespoke weddings, private celebrations, floral design, and complete event execution across ${settings.service_areas}.`,
    icons: {
      icon: '/sri-ram-icon.png',
      apple: '/sri-ram-icon.png',
    },
    openGraph: {
      title: `${settings.business_name} | ${settings.tagline}`,
      description: `Bespoke event planning, decor, and curated celebrations across ${settings.service_areas}.`,
      url: baseUrl,
      siteName: settings.business_name,
      images: [
        {
          url: '/events/real/wedding_mandapam.jpg',
          width: 1200,
          height: 800,
          alt: `${settings.business_name} Showcase`,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getBusinessSettings();

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EventPlanningService',
    name: settings.business_name,
    description: settings.tagline,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sriramevents.com',
    telephone: settings.phone,
    email: settings.email,
    areaServed: settings.service_areas,
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings.location,
      addressCountry: 'IN',
    },
    sameAs: [settings.instagram_url],
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} scroll-smooth`}
    >
      <body className="antialiased selection:bg-mocha selection:text-white bg-ivory text-espresso">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
