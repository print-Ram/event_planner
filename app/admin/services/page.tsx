'use client';

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useAdminData } from '@/components/admin/AdminContext';
import { slugify } from '@/lib/utils';
import type { ServiceItem } from '@/types/service';

export default function AdminServicesPage() {
  const { data, mutate } = useAdminData();
  const [editing, setEditing] = useState<ServiceItem | null>(null);

  if (!data) return null;

  const startNew = () => {
    setEditing({
      id: '',
      title: '',
      slug: '',
      category: 'Custom Events',
      short_description: '',
      description: '',
      image_url: '/events/real/wedding_mandapam.jpg',
      whats_included: ['Custom consultation & concept board'],
      optional_addons: [],
      starting_price: null,
      typical_duration: '',
      active: true,
      featured: false,
      display_order: data.services.length + 1,
      created_at: new Date().toISOString(),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const slug = editing.slug || slugify(editing.title);
    await mutate('service', {
      ...editing,
      id: editing.id || slug,
      slug,
    } as unknown as Record<string, unknown>);
    setEditing(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="eyebrow-label">SERVICE CATALOGUE</p>
          <h1 className="font-serif text-4xl text-espresso mt-1">
            Services ({data.services.length})
          </h1>
        </div>
        <button
          type="button"
          onClick={startNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {editing && (
        <form
          onSubmit={handleSave}
          className="bg-white border border-beige rounded-2xl p-6 space-y-4"
        >
          <h2 className="font-serif text-2xl text-espresso">
            {editing.id ? `Edit: ${editing.title}` : 'New Service'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Service title"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
            />
            <input
              type="text"
              placeholder="Category (e.g. Weddings & Engagements)"
              value={editing.category}
              onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
            />
            <input
              type="text"
              placeholder="Image URL (e.g. /events/real/wedding_mandapam.jpg)"
              value={editing.image_url}
              onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
              className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
            />
            <input
              type="number"
              placeholder="Starting price (₹, leave blank for custom)"
              value={editing.starting_price ?? ''}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  starting_price: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
            />
          </div>

          <textarea
            rows={2}
            placeholder="Short card description"
            value={editing.short_description}
            onChange={(e) =>
              setEditing({ ...editing, short_description: e.target.value })
            }
            className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
          />
          <textarea
            rows={3}
            placeholder="Full service description"
            value={editing.description}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <textarea
              rows={3}
              placeholder="What's included (one per line)"
              value={editing.whats_included.join('\n')}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  whats_included: e.target.value.split('\n').filter(Boolean),
                })
              }
              className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
            />
            <textarea
              rows={3}
              placeholder="Optional add-ons (one per line)"
              value={editing.optional_addons.join('\n')}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  optional_addons: e.target.value.split('\n').filter(Boolean),
                })
              }
              className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={editing.active}
                onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                className="accent-mocha"
              />
              <span>Active (visible on site)</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={editing.featured}
                onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                className="accent-mocha"
              />
              <span>Featured on Homepage</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <span>Order:</span>
              <input
                type="number"
                value={editing.display_order}
                onChange={(e) =>
                  setEditing({ ...editing, display_order: Number(e.target.value) })
                }
                className="w-16 rounded-lg border border-beige px-2 py-1"
              />
            </label>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-wider"
            >
              Save Service
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-6 py-2.5 rounded-full border border-beige text-xs"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {data.services.map((service) => (
          <div
            key={service.id}
            className="bg-white border border-beige rounded-2xl p-5 flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <img
                src={service.image_url}
                alt={service.title}
                className="h-16 w-16 rounded-xl object-cover shrink-0 bg-cream"
              />
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-wider text-mocha font-medium">
                  {service.category} · #{service.display_order}
                </p>
                <h3 className="font-serif text-xl text-espresso">{service.title}</h3>
                <p className="text-xs text-muted line-clamp-2">
                  {service.short_description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setEditing(service)}
                className="px-3 py-1 rounded-lg border border-beige text-xs hover:bg-cream"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() =>
                  mutate('service', { ...service, active: !service.active })
                }
                className="px-3 py-1 rounded-lg border border-beige text-xs hover:bg-cream"
              >
                {service.active ? 'Disable' : 'Enable'}
              </button>
              <button
                type="button"
                onClick={() => mutate('service', { id: service.id }, 'delete')}
                className="p-1.5 rounded-lg border border-beige text-muted hover:text-red-700 self-end"
                title="Delete service"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
