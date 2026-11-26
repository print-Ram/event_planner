'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useAdminData } from '@/components/admin/AdminContext';
import type { BusinessSettings } from '@/types/database';

export default function AdminSettingsPage() {
  const { data, mutate } = useAdminData();
  const [form, setForm] = useState<BusinessSettings | null>(null);
  const [newPasscode, setNewPasscode] = useState('');
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    if (data?.settings && !form) {
      setForm(data.settings);
    }
  }, [data, form]);

  if (!data || !form) return null;

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMsg('');
    const ok = await mutate(
      'settings',
      form as unknown as Record<string, unknown>
    );
    if (ok) {
      setSavedMsg('Studio settings updated.');
      setTimeout(() => setSavedMsg(''), 3500);
    }
  };

  const handleUpdatePasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasscode.trim().length < 4) return;
    const ok = await mutate('passcode', { passcode: newPasscode.trim() });
    if (ok) {
      setNewPasscode('');
      setSavedMsg('Admin passcode updated.');
      setTimeout(() => setSavedMsg(''), 3500);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <p className="eyebrow-label">BUSINESS &amp; INSTAGRAM SETTINGS</p>
        <h1 className="font-serif text-4xl text-espresso mt-1">
          Studio Configuration
        </h1>
      </div>

      {savedMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{savedMsg}</span>
        </div>
      )}

      <form
        onSubmit={handleSaveSettings}
        className="bg-white border border-beige rounded-2xl p-6 sm:p-8 space-y-6"
      >
        <h2 className="font-serif text-2xl text-espresso">Brand &amp; Contact</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase text-muted">Business Name</label>
            <input
              type="text"
              value={form.business_name}
              onChange={(e) => setForm({ ...form, business_name: e.target.value })}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Monogram Initials</label>
            <input
              type="text"
              maxLength={4}
              value={form.monogram}
              onChange={(e) => setForm({ ...form, monogram: e.target.value })}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs uppercase text-muted">Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">
              WhatsApp Number (with country code, digits only)
            </label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs uppercase text-muted">Service Areas</label>
            <input
              type="text"
              value={form.service_areas}
              onChange={(e) => setForm({ ...form, service_areas: e.target.value })}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
        </div>

        <hr className="border-beige" />

        <h2 className="font-serif text-2xl text-espresso">
          Instagram &amp; Announcement Bar
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase text-muted">Instagram Handle</label>
            <input
              type="text"
              value={form.instagram_handle}
              onChange={(e) => setForm({ ...form, instagram_handle: e.target.value })}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Instagram Profile URL</label>
            <input
              type="url"
              value={form.instagram_url}
              onChange={(e) => setForm({ ...form, instagram_url: e.target.value })}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
          <label className="inline-flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={form.instagram_enabled}
              onChange={(e) =>
                setForm({ ...form, instagram_enabled: e.target.checked })
              }
              className="accent-mocha"
            />
            <span>Display Instagram Feed on Homepage</span>
          </label>
          <label className="inline-flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={form.announcement_enabled}
              onChange={(e) =>
                setForm({ ...form, announcement_enabled: e.target.checked })
              }
              className="accent-mocha"
            />
            <span>Show Top Announcement Bar</span>
          </label>
          <div className="sm:col-span-2">
            <label className="text-xs uppercase text-muted">Announcement Text</label>
            <input
              type="text"
              value={form.announcement_text}
              onChange={(e) => setForm({ ...form, announcement_text: e.target.value })}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
        </div>

        <hr className="border-beige" />

        <h2 className="font-serif text-2xl text-espresso">
          Pricing, Tax &amp; Policies
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs uppercase text-muted">Currency Symbol</label>
            <input
              type="text"
              value={form.currency_symbol}
              onChange={(e) => setForm({ ...form, currency_symbol: e.target.value })}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Tax Percentage (%)</label>
            <input
              type="number"
              min={0}
              max={50}
              value={form.tax_percentage}
              onChange={(e) =>
                setForm({ ...form, tax_percentage: Number(e.target.value) })
              }
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">
              Privilege Discount (%)
            </label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                checked={form.discount_enabled}
                onChange={(e) =>
                  setForm({ ...form, discount_enabled: e.target.checked })
                }
                className="accent-mocha"
              />
              <input
                type="number"
                min={0}
                max={50}
                value={form.discount_percentage}
                onChange={(e) =>
                  setForm({ ...form, discount_percentage: Number(e.target.value) })
                }
                className="w-full rounded-xl border border-beige bg-ivory/50 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase text-muted">About Story</label>
            <textarea
              rows={3}
              value={form.about_story}
              onChange={(e) => setForm({ ...form, about_story: e.target.value })}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Booking Policy</label>
            <textarea
              rows={2}
              value={form.booking_policy}
              onChange={(e) => setForm({ ...form, booking_policy: e.target.value })}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Cancellation Policy</label>
            <textarea
              rows={2}
              value={form.cancellation_policy}
              onChange={(e) =>
                setForm({ ...form, cancellation_policy: e.target.value })
              }
              className="w-full rounded-xl border border-beige bg-ivory/50 px-3.5 py-2.5 text-sm mt-1"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-7 py-3 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-espresso transition-colors"
        >
          Save All Settings
        </button>
      </form>

      <form
        onSubmit={handleUpdatePasscode}
        className="bg-white border border-beige rounded-2xl p-6 space-y-4 max-w-md"
      >
        <h2 className="font-serif text-2xl text-espresso">Change Admin Passcode</h2>
        <input
          type="password"
          minLength={4}
          required
          placeholder="Enter new studio passcode"
          value={newPasscode}
          onChange={(e) => setNewPasscode(e.target.value)}
          className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
        />
        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-espresso text-ivory text-xs font-medium uppercase tracking-wider"
        >
          Update Passcode
        </button>
      </form>
    </div>
  );
}
