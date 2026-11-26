'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarCheck,
  ExternalLink,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Sparkles,
  Star,
} from 'lucide-react';
import { useAdminData } from './AdminContext';
import { cn } from '@/lib/utils';

const ADMIN_NAV = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/enquiries', label: 'Enquiries', icon: Inbox },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/services', label: 'Services', icon: Sparkles },
  { href: '/admin/packages', label: 'Packages & Pricing', icon: Package },
  { href: '/admin/portfolio', label: 'Portfolio', icon: FolderKanban },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data, logout } = useAdminData();

  return (
    <div className="min-h-screen bg-ivory flex flex-col lg:flex-row">
      <aside className="lg:w-64 bg-espresso text-ivory shrink-0 border-b lg:border-b-0 lg:border-r border-sand/20 flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-ivory/15">
            <p className="text-[10px] uppercase tracking-[0.22em] text-sand">
              Studio Admin
            </p>
            <h2 className="font-serif text-2xl mt-1">
              {data?.settings.business_name || 'Studio'}
            </h2>
          </div>

          <nav className="p-3 flex lg:flex-col gap-1 overflow-x-auto">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors',
                    active
                      ? 'bg-mocha text-white'
                      : 'text-ivory/75 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-ivory/15 flex lg:flex-col gap-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-ivory/20 text-xs text-ivory/85 hover:bg-white/10"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-xs text-ivory hover:bg-white/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-6xl w-full">{children}</main>
    </div>
  );
}
