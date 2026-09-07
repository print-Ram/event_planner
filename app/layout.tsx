import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sri Ram Events | We Plan You Celebrate',
  description: 'Sri Ram Events brings futuristic technology and authentic Andhra cultural decor to life. Specializing in weddings, corporate events, Rangoli artistry, and Bommala Koluvu setups.',
  keywords: 'Sri Ram Events, Andhra Pradesh Event Organizers, Telugu Wedding Decor, Rangoli Studio, Bommala Koluvu, Kondapalli Dolls, Event Planner',
  icons: {
    icon: '/sri-ram-icon.png',
    apple: '/sri-ram-icon.png',
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
      <body className="antialiased selection:bg-telugu-cyan selection:text-telugu-dark">
        {children}
      </body>
    </html>
  );
}
