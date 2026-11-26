'use client';

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useAdminData } from '@/components/admin/AdminContext';

export default function AdminReviewsPage() {
  const { data, mutate } = useAdminData();
  const [customerName, setCustomerName] = useState('');
  const [eventType, setEventType] = useState('Wedding Planning');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [sourceLabel, setSourceLabel] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [published, setPublished] = useState(true);

  if (!data) return null;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutate('testimonial', {
      customer_name: customerName,
      event_type: eventType,
      rating,
      review_text: reviewText,
      source_label: sourceLabel,
      source_url: sourceUrl,
      published,
    });
    setCustomerName('');
    setReviewText('');
    setSourceLabel('');
    setSourceUrl('');
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow-label">CLIENT REVIEWS</p>
        <h1 className="font-serif text-4xl text-espresso mt-1">
          Testimonials Management
        </h1>
      </div>

      <form
        onSubmit={handleAdd}
        className="bg-white border border-beige rounded-2xl p-6 space-y-4"
      >
        <div className="flex items-center gap-2 text-mocha">
          <Plus className="w-4 h-4" />
          <h2 className="font-serif text-2xl text-espresso">
            Add Verified Client Review
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <input
            type="text"
            required
            placeholder="Client name (with permission)"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
          />
          <input
            type="text"
            required
            placeholder="Event category"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
          />
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Stars
              </option>
            ))}
          </select>
        </div>

        <textarea
          rows={3}
          required
          placeholder="Authentic client testimonial..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Source label (e.g. Google Review)"
            value={sourceLabel}
            onChange={(e) => setSourceLabel(e.target.value)}
            className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
          />
          <input
            type="url"
            placeholder="Source verification URL (optional)"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
          />
        </div>

        <label className="inline-flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="accent-mocha"
          />
          <span>Publish immediately on public website</span>
        </label>

        <div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-wider"
          >
            Save Review
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {data.testimonials.length === 0 ? (
          <div className="bg-white border border-beige rounded-2xl p-8 text-center text-sm text-muted">
            No reviews added yet. Add genuine client feedback above to publish it on
            your homepage and /reviews page.
          </div>
        ) : (
          data.testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-beige rounded-2xl p-5 flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="font-serif text-xl text-espresso">
                  {t.customer_name}{' '}
                  <span className="text-xs font-sans text-muted">· {t.event_type}</span>
                </p>
                <p className="text-sm text-espresso/85">“{t.review_text}”</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    mutate('testimonial', { ...t, published: !t.published })
                  }
                  className="px-3 py-1 rounded-lg border border-beige text-xs"
                >
                  {t.published ? 'Hide' : 'Approve'}
                </button>
                <button
                  type="button"
                  onClick={() => mutate('testimonial', { id: t.id }, 'delete')}
                  className="p-1.5 text-muted hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
