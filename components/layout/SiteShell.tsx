import React from 'react';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileStickyBar from './MobileStickyBar';
import NavigationProgress from './NavigationProgress';
import { getBusinessSettings, getServices } from '@/lib/data/repository';

export default async function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, services] = await Promise.all([
    getBusinessSettings(),
    getServices(false),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-espresso pb-16 lg:pb-0">
      <NavigationProgress delayMs={200} />
      <AnnouncementBar
        enabled={settings.announcement_enabled}
        text={settings.announcement_text}
      />
      <Navbar settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} services={services} />
      <MobileStickyBar settings={settings} />
    </div>
  );
}
