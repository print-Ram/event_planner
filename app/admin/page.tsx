'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarCheck, CheckCircle2, Clock, Inbox } from 'lucide-react';
import { useAdminData } from '@/components/admin/AdminContext';

export default function AdminOverviewPage() {
  const { data } = useAdminData();
  if (!data) return null;

  const today = new Date().toISOString().slice(0, 10);
  const pendingBookings = data.bookings.filter((b) =>
    ['Pending', 'Under Review'].includes(b.status)
  );
  const confirmedBookings = data.bookings.filter((b) =>
    ['Approved', 'Confirmed'].includes(b.status)
  );
  const upcomingEvents = confirmedBookings.filter((b) => b.event_date >= today);

  const stats = [
    {
      label: 'Total Enquiries',
      value: data.enquiries.length,
      icon: Inbox,
      href: '/admin/enquiries',
    },
    {
      label: 'Pending Bookings',
      value: pendingBookings.length,
      icon: Clock,
      href: '/admin/bookings',
    },
    {
      label: 'Confirmed Bookings',
      value: confirmedBookings.length,
      icon: CheckCircle2,
      href: '/admin/bookings',
    },
    {
      label: 'Upcoming Events',
      value: upcomingEvents.length,
      icon: CalendarCheck,
      href: '/admin/bookings',
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <p className="eyebrow-label">DASHBOARD OVERVIEW</p>
        <h1 className="font-serif text-4xl text-espresso mt-1">
          Studio Activity
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white border border-beige rounded-2xl p-6 space-y-3 hover:border-mocha transition-colors"
            >
              <div className="flex items-center justify-between text-mocha">
                <Icon className="w-5 h-5" />
                <ArrowRight className="w-4 h-4 text-taupe" />
              </div>
              <p className="font-serif text-4xl text-espresso">{stat.value}</p>
              <p className="text-xs uppercase tracking-wider text-muted font-medium">
                {stat.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <section className="bg-white border border-beige rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-espresso">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-xs text-mocha hover:underline">
              Manage All
            </Link>
          </div>
          {data.enquiries.length === 0 ? (
            <p className="text-sm text-muted">No enquiries submitted yet.</p>
          ) : (
            <div className="divide-y divide-beige">
              {data.enquiries.slice(0, 5).map((enq) => (
                <div key={enq.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-espresso">
                      {enq.customer_name}
                    </p>
                    <p className="text-xs text-muted">
                      {enq.event_type} · {enq.event_date || 'Date flexible'}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-cream border border-beige text-[11px] text-mocha">
                    {enq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white border border-beige rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-espresso">
              Recent Booking Requests
            </h2>
            <Link href="/admin/bookings" className="text-xs text-mocha hover:underline">
              Manage All
            </Link>
          </div>
          {data.bookings.length === 0 ? (
            <p className="text-sm text-muted">No booking requests yet.</p>
          ) : (
            <div className="divide-y divide-beige">
              {data.bookings.slice(0, 5).map((bk) => (
                <div key={bk.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-espresso">
                      {bk.booking_reference} · {bk.customer_name}
                    </p>
                    <p className="text-xs text-muted">
                      {bk.event_type} · {bk.event_date}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-cream border border-beige text-[11px] text-mocha">
                    {bk.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
