import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sri Ram Events | Premier Event Planning & Decor in Madanapalle, Tirupati, Punganur & AP',
  description: 'Sri Ram Events brings grand celebrations to life. Main branch located at Madanapalle, serving Tirupati, Punganur, Kothakota & across Andhra Pradesh with authentic wedding mandapams, birthdays, house warmings, catering, and theme parties.',
  keywords: 'Sri Ram Events Madanapalle, Event Planner Madanapalle, Telugu Wedding Decor Tirupati, Pelli Mandapam Punganur, Event Organizers Kothakota, Gruhapravesam Decor Andhra Pradesh',
  icons: {
    icon: '/sri-ram-icon.png',
    apple: '/sri-ram-icon.png',
  },
  openGraph: {
    title: 'Sri Ram Events Madanapalle | Your Moments. Our Celebration.',
    description: 'Bespoke weddings, birthdays, house warmings, catering, and event planning with main branch at Madanapalle, serving Tirupati, Punganur, Kothakota & across AP.',
    url: 'https://sriramevents.com',
    siteName: 'Sri Ram Events',
    images: [
      {
        url: '/sri-ram-logo.png',
        width: 800,
        height: 600,
        alt: 'Sri Ram Events Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/sri-ram-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/sri-ram-icon.png" />
      </head>
      <body className="antialiased selection:bg-wedding-ruby selection:text-white">
        {children}
      </body>
    </html>
  );
}
