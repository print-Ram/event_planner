'use client';

import React, { useState } from 'react';
import { CalendarOff, Trash2 } from 'lucide-react';
import { useAdminData } from '@/components/admin/AdminContext';
import type { BookingStatus } from '@/types/database';

const BOOKING_STATUSES: BookingStatus[] = [
  'Pending',
  'Under Review',
  'Approved',
  'Awaiting Deposit',
  'Confirmed',
  'Completed',
  'Cancelled',
  'Rejected',
];

export default function AdminBookingsPage() {
  const { data, mutate } = useAdminData();
  const [blockDate, setBlockDate] = useState('');
  const [blockStatus, setBlockStatus] = useState<'unavailable' | 'booked'>('unavailable');
  const [blockNotes, setBlockNotes] = useState('');
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});
  const [quoteDraft, setQuoteDraft] = useState<Record<string, string>>({});
  const [sendEmailOnUpdate, setSendEmailOnUpdate] = useState(true);

  if (!data) return null;

  const handleAddBlockedDate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockDate) return;
    await mutate('availability', {
      id: blockDate,
      date: blockDate,
      status: blockStatus,
      notes: blockNotes,
    });
    setBlockDate('');
    setBlockNotes('');
  };

  return (
    <div className="space-y-10">
      <div>
        <p className="eyebrow-label">BOOKING &amp; CALENDAR MANAGEMENT</p>
        <h1 className="font-serif text-4xl text-espresso mt-1">
          Booking Requests &amp; Availability
        </h1>
      </div>

      {/* Availability Blocker */}
      <section className="bg-white border border-beige rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 text-mocha">
          <CalendarOff className="w-4 h-4" />
          <h2 className="font-serif text-2xl text-espresso">
            Manage Unavailable Dates
          </h2>
        </div>

        <form onSubmit={handleAddBlockedDate} className="grid sm:grid-cols-4 gap-3">
          <input
            type="date"
            required
            value={blockDate}
            onChange={(e) => setBlockDate(e.target.value)}
            className="rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm"
          />
          <select
            value={blockStatus}
            onChange={(e) =>
              setBlockStatus(e.target.value as 'unavailable' | 'booked')
            }
            className="rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm"
          >
            <option value="unavailable">Unavailable</option>
            <option value="booked">Booked</option>
          </select>
          <input
            type="text"
            placeholder="Reason / note (optional)"
            value={blockNotes}
            onChange={(e) => setBlockNotes(e.target.value)}
            className="rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm"
          />
          <button
            type="submit"
            className="rounded-xl bg-mocha text-white text-xs font-medium uppercase tracking-wider px-4 py-2.5 hover:bg-espresso transition-colors"
          >
            Block Date
          </button>
        </form>

        {data.availability.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {data.availability.map((slot) => (
              <div
                key={slot.id}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream border border-beige text-xs"
              >
                <span className="font-medium text-espresso">{slot.date}</span>
                <span className="text-mocha capitalize">({slot.status})</span>
                <button
                  type="button"
                  onClick={() => mutate('availability', { id: slot.id }, 'delete')}
                  className="text-muted hover:text-red-700"
                  title="Remove date block"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Booking Requests */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="font-serif text-2xl text-espresso">
            All Booking Requests ({data.bookings.length})
          </h2>
          <label className="inline-flex items-center gap-2 text-xs text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={sendEmailOnUpdate}
              onChange={(e) => setSendEmailOnUpdate(e.target.checked)}
              className="accent-mocha"
            />
            <span>Notify customer via email on status change (when Resend is configured)</span>
          </label>
        </div>

        {data.bookings.length === 0 ? (
          <div className="bg-white border border-beige rounded-2xl p-10 text-center text-sm text-muted">
            No booking requests received yet.
          </div>
        ) : (
          <div className="space-y-4">
            {data.bookings.map((bk) => (
              <div
                key={bk.id}
                className="bg-white border border-beige rounded-2xl p-6 space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-mocha">
                      {bk.booking_reference} · {bk.event_date}
                      {bk.alternative_date ? ` (Alt: ${bk.alternative_date})` : ''}
                    </p>
                    <h3 className="font-serif text-2xl text-espresso">
                      {bk.customer_name} — {bk.event_type}
                    </h3>
                    <p className="text-xs text-muted">
                      {bk.phone} · {bk.email} · {bk.location} · {bk.guest_count} guests ·{' '}
                      {bk.package_name}
                    </p>
                    <p className="text-xs text-espresso/80">
                      Services: {bk.selected_services.join(', ')}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={bk.status}
                      onChange={(e) =>
                        mutate('booking', {
                          id: bk.id,
                          status: e.target.value,
                          send_email: sendEmailOnUpdate,
                        })
                      }
                      className="rounded-lg border border-beige bg-ivory px-3 py-1.5 text-xs font-medium text-espresso"
                    >
                      {BOOKING_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    <select
                      value={bk.deposit_status || 'Not Required'}
                      onChange={(e) =>
                        mutate('booking', {
                          id: bk.id,
                          deposit_status: e.target.value,
                        })
                      }
                      className="rounded-lg border border-beige bg-cream px-3 py-1.5 text-xs text-espresso"
                    >
                      <option value="Not Required">Deposit: Not Required</option>
                      <option value="Pending">Deposit: Pending</option>
                      <option value="Paid">Deposit: Paid</option>
                    </select>
                  </div>
                </div>

                {bk.notes && (
                  <p className="text-sm text-espresso/85 bg-ivory/60 rounded-xl p-3">
                    {bk.notes}
                  </p>
                )}

                <div className="grid sm:grid-cols-12 gap-2">
                  <input
                    type="number"
                    placeholder="Quoted amount (₹)"
                    value={quoteDraft[bk.id] ?? (bk.quoted_amount ?? '')}
                    onChange={(e) =>
                      setQuoteDraft((prev) => ({ ...prev, [bk.id]: e.target.value }))
                    }
                    className="sm:col-span-3 rounded-xl border border-beige bg-ivory/40 px-3.5 py-2 text-xs text-espresso"
                  />
                  <input
                    type="text"
                    placeholder="Internal admin notes..."
                    value={notesDraft[bk.id] ?? bk.admin_notes ?? ''}
                    onChange={(e) =>
                      setNotesDraft((prev) => ({ ...prev, [bk.id]: e.target.value }))
                    }
                    className="sm:col-span-7 rounded-xl border border-beige bg-ivory/40 px-3.5 py-2 text-xs text-espresso"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      mutate('booking', {
                        id: bk.id,
                        quoted_amount: quoteDraft[bk.id]
                          ? Number(quoteDraft[bk.id])
                          : bk.quoted_amount ?? null,
                        admin_notes: notesDraft[bk.id] ?? bk.admin_notes ?? '',
                      })
                    }
                    className="sm:col-span-2 rounded-xl bg-mocha text-white text-xs font-medium py-2 hover:bg-espresso transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
