'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type {
  AvailabilitySlot,
  BusinessSettings,
  PortfolioProject,
  TestimonialRecord,
} from '@/types/database';
import type { BookingRecord, EnquiryRecord } from '@/types/booking';
import type { PackageTier, PricingRule } from '@/types/pricing';
import type { ServiceItem } from '@/types/service';

export interface AdminDataset {
  settings: BusinessSettings;
  services: ServiceItem[];
  packages: PackageTier[];
  pricingRules: PricingRule[];
  enquiries: EnquiryRecord[];
  bookings: BookingRecord[];
  portfolio: PortfolioProject[];
  testimonials: TestimonialRecord[];
  availability: AvailabilitySlot[];
}

interface AdminContextValue {
  authenticated: boolean;
  loading: boolean;
  data: AdminDataset | null;
  refresh: () => Promise<void>;
  mutate: (
    resource: string,
    payload: Record<string, unknown>,
    action?: 'upsert' | 'delete'
  ) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextValue>({
  authenticated: false,
  loading: true,
  data: null,
  refresh: async () => {},
  mutate: async () => false,
  logout: async () => {},
});

export function useAdminData() {
  return useContext(AdminContext);
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AdminDataset | null>(null);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/data', { cache: 'no-store' });
      if (res.status === 401) {
        setAuthenticated(false);
        setData(null);
        return;
      }
      if (res.ok) {
        const json = (await res.json()) as AdminDataset;
        setData(json);
        setAuthenticated(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      const json = await res.json();
      if (!res.ok) {
        setLoginError(json.error || 'Invalid credentials.');
        return;
      }
      setPasscode('');
      await loadData();
    } catch {
      setLoginError('Unable to sign in right now.');
    } finally {
      setLoggingIn(false);
    }
  };

  const mutate = useCallback(
    async (
      resource: string,
      payload: Record<string, unknown>,
      action: 'upsert' | 'delete' = 'upsert'
    ): Promise<boolean> => {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resource, action, payload }),
      });
      if (res.ok) {
        await loadData();
        return true;
      }
      return false;
    },
    [loadData]
  );

  const logout = useCallback(async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setAuthenticated(false);
    setData(null);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center text-sm text-muted">
        Loading studio administration...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border border-beige rounded-2xl p-8 sm:p-10 shadow-editorial space-y-6">
          <div className="space-y-2 text-center">
            <p className="eyebrow-label">STUDIO ADMINISTRATION</p>
            <h1 className="font-serif text-3xl text-espresso">Admin Sign In</h1>
            <p className="text-xs text-muted">
              Protected access for managing bookings, enquiries, pricing, portfolio,
              and studio settings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider text-mocha font-medium">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter studio passcode"
                className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-espresso transition-colors disabled:opacity-60"
            >
              {loggingIn ? 'Verifying...' : 'Enter Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <AdminContext.Provider
      value={{
        authenticated,
        loading,
        data,
        refresh: loadData,
        mutate,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
