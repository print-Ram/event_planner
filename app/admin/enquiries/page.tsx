'use client';

import React, { useMemo, useState } from 'react';
import { MessageCircle, Mail, Search } from 'lucide-react';
import { useAdminData } from '@/components/admin/AdminContext';
import { buildWhatsAppUrl } from '@/lib/utils';
import type { EnquiryStatus } from '@/types/database';

const ENQUIRY_STATUSES: EnquiryStatus[] = [
  'New',
  'In Progress',
  'Quoted',
  'Converted',
  'Archived',
];

export default function AdminEnquiriesPage() {
  const { data, mutate } = useAdminData();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});

  const categories = useMemo(() => {
    if (!data) return ['All'];
    return ['All', ...Array.from(new Set(data.enquiries.map((e) => e.event_type)))];
  }, [data]);

  if (!data) return null;

  const filtered = data.enquiries.filter((e) => {
    const matchesSearch =
      !search ||
      e.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || e.event_type === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow-label">ENQUIRIES &amp; ESTIMATES</p>
        <h1 className="font-serif text-4xl text-espresso mt-1">
          Customer Enquiries ({filtered.length})
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, email, or phone..."
            className="w-full rounded-xl border border-beige bg-white pl-10 pr-4 py-2.5 text-sm text-espresso focus:border-mocha focus:outline-none"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-xl border border-beige bg-white px-4 py-2.5 text-sm text-espresso focus:border-mocha focus:outline-none"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-beige rounded-2xl p-10 text-center text-sm text-muted">
          No matching enquiries found.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((enq) => (
            <div
              key={enq.id}
              className="bg-white border border-beige rounded-2xl p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-serif text-2xl text-espresso">
                      {enq.customer_name}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-cream border border-beige text-xs text-mocha">
                      {enq.event_type}
                    </span>
                  </div>
                  <p className="text-xs text-muted">
                    {enq.phone} {enq.email ? `· ${enq.email}` : ''}{' '}
                    {enq.location ? `· ${enq.location}` : ''}{' '}
                    {enq.event_date ? `· Date: ${enq.event_date}` : ''}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={enq.status}
                    onChange={(e) =>
                      mutate('enquiry', { id: enq.id, status: e.target.value })
                    }
                    className="rounded-lg border border-beige bg-ivory px-3 py-1.5 text-xs font-medium text-espresso"
                  >
                    {ENQUIRY_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {enq.phone && (
                    <a
                      href={buildWhatsAppUrl(
                        enq.phone,
                        `Hello ${enq.customer_name}, following up on your ${enq.event_type} enquiry with ${data.settings.business_name}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-beige text-mocha hover:bg-cream"
                      title="Message on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  )}
                  {enq.email && (
                    <a
                      href={`mailto:${enq.email}`}
                      className="p-2 rounded-lg border border-beige text-mocha hover:bg-cream"
                      title="Email customer"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {enq.estimate_summary && (
                <div className="rounded-xl bg-cream border border-beige px-4 py-2.5 text-xs text-espresso">
                  <strong>Submitted Estimate:</strong> {enq.estimate_summary}
                </div>
              )}

              {enq.message && (
                <p className="text-sm text-espresso/85 bg-ivory/60 rounded-xl p-3.5">
                  {enq.message}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Internal studio notes..."
                  value={notesDraft[enq.id] ?? enq.admin_notes ?? ''}
                  onChange={(e) =>
                    setNotesDraft((prev) => ({ ...prev, [enq.id]: e.target.value }))
                  }
                  className="flex-1 rounded-xl border border-beige bg-ivory/40 px-3.5 py-2 text-xs text-espresso focus:border-mocha focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    mutate('enquiry', {
                      id: enq.id,
                      admin_notes: notesDraft[enq.id] ?? enq.admin_notes ?? '',
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-mocha text-white text-xs font-medium hover:bg-espresso transition-colors"
                >
                  Save Note
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
