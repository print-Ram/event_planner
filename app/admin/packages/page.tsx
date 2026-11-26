'use client';

import React, { useState } from 'react';
import { useAdminData } from '@/components/admin/AdminContext';
import type { PackageTier, PricingRule } from '@/types/pricing';

export default function AdminPackagesPage() {
  const { data, mutate } = useAdminData();
  const [pkgDrafts, setPkgDrafts] = useState<Record<string, PackageTier>>({});
  const [ruleDrafts, setRuleDrafts] = useState<Record<string, PricingRule>>({});

  if (!data) return null;

  return (
    <div className="space-y-10">
      <div>
        <p className="eyebrow-label">PACKAGES &amp; PRICING RULES</p>
        <h1 className="font-serif text-4xl text-espresso mt-1">
          Packages &amp; Estimator Pricing
        </h1>
      </div>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-espresso">Packages</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {data.packages.map((pkg) => {
            const draft = pkgDrafts[pkg.id] || pkg;
            return (
              <div
                key={pkg.id}
                className="bg-white border border-beige rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-espresso">{draft.name}</h3>
                  <label className="text-xs flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={draft.active}
                      onChange={(e) =>
                        setPkgDrafts((prev) => ({
                          ...prev,
                          [pkg.id]: { ...draft, active: e.target.checked },
                        }))
                      }
                      className="accent-mocha"
                    />
                    <span>Active</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] uppercase text-muted">
                      Base Price (₹)
                    </label>
                    <input
                      type="number"
                      value={draft.base_price ?? ''}
                      placeholder="Custom"
                      onChange={(e) =>
                        setPkgDrafts((prev) => ({
                          ...prev,
                          [pkg.id]: {
                            ...draft,
                            base_price: e.target.value ? Number(e.target.value) : null,
                          },
                        }))
                      }
                      className="w-full rounded-xl border border-beige bg-ivory/50 px-3 py-2 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase text-muted">
                      Minimum Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={draft.minimum_amount ?? ''}
                      placeholder="None"
                      onChange={(e) =>
                        setPkgDrafts((prev) => ({
                          ...prev,
                          [pkg.id]: {
                            ...draft,
                            minimum_amount: e.target.value ? Number(e.target.value) : null,
                          },
                        }))
                      }
                      className="w-full rounded-xl border border-beige bg-ivory/50 px-3 py-2 text-sm mt-1"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    mutate('package', draft as unknown as Record<string, unknown>)
                  }
                  className="px-5 py-2 rounded-full bg-mocha text-white text-xs font-medium hover:bg-espresso"
                >
                  Save Package
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-espresso">Service Pricing Rules</h2>
        <div className="bg-white border border-beige rounded-2xl divide-y divide-beige">
          {data.pricingRules.map((rule) => {
            const draft = ruleDrafts[rule.id] || rule;
            return (
              <div
                key={rule.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <p className="text-sm font-medium text-espresso">{draft.label}</p>
                  <p className="text-xs text-muted">
                    Key: {draft.service_key} · Type: {draft.pricing_type}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={draft.amount}
                    onChange={(e) =>
                      setRuleDrafts((prev) => ({
                        ...prev,
                        [rule.id]: { ...draft, amount: Number(e.target.value) },
                      }))
                    }
                    className="w-28 rounded-xl border border-beige bg-ivory/50 px-3 py-1.5 text-sm"
                  />
                  <label className="text-xs flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={draft.active}
                      onChange={(e) =>
                        setRuleDrafts((prev) => ({
                          ...prev,
                          [rule.id]: { ...draft, active: e.target.checked },
                        }))
                      }
                      className="accent-mocha"
                    />
                    <span>Active</span>
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      mutate('pricing_rule', draft as unknown as Record<string, unknown>)
                    }
                    className="px-4 py-1.5 rounded-full bg-mocha text-white text-xs"
                  >
                    Save
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
