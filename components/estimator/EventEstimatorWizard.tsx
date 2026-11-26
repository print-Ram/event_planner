'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Info,
  Loader2,
  Send,
} from 'lucide-react';
import {
  ESTIMATOR_EVENT_TYPES,
  ESTIMATOR_SERVICE_OPTIONS,
} from '@/lib/seedData';
import { calculateEventEstimate } from '@/lib/pricing/calculator';
import { buildWhatsAppUrl, cn, formatCurrency } from '@/lib/utils';
import type { BusinessSettings } from '@/types/database';
import type { PackageTier, PricingRule } from '@/types/pricing';

const TOTAL_STEPS = 8;

const STEP_TITLES = [
  'Event Type',
  'Event Date',
  'Location',
  'Guest Count',
  'Preferred Package',
  'Select Services',
  'Preferences & Notes',
  'Contact Details',
];

export default function EventEstimatorWizard({
  packages,
  pricingRules,
  settings,
}: {
  packages: PackageTier[];
  pricingRules: PricingRule[];
  settings: BusinessSettings;
}) {
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState(ESTIMATOR_EVENT_TYPES[0]);
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [guestCount, setGuestCount] = useState(150);
  const [packageId, setPackageId] = useState(packages[1]?.id || packages[0]?.id || 'premium');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Planning',
    'Decoration',
    'Floral styling',
  ]);
  const [notes, setNotes] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submittedEstimateId, setSubmittedEstimateId] = useState('');

  const breakdown = useMemo(
    () =>
      calculateEventEstimate({
        packageId,
        selectedServices,
        guestCount,
        packages,
        pricingRules,
        settings,
      }),
    [packageId, selectedServices, guestCount, packages, pricingRules, settings]
  );

  const selectedPackage = packages.find((p) => p.id === packageId);

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((item) => item !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/estimates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerName,
          email,
          phone,
          event_type: eventType,
          event_date: eventDate,
          location,
          guest_count: guestCount,
          package_id: packageId,
          selected_services: selectedServices,
          notes,
          website_url: websiteUrl,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Could not submit estimate.');
        setSubmitting(false);
        return;
      }
      setSubmittedEstimateId(json.estimate?.id || 'EST-SAVED');
    } catch {
      setError('Network error while saving your estimate.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedEstimateId) {
    const waUrl = buildWhatsAppUrl(
      settings.whatsapp,
      `Hello ${settings.business_name}, I submitted an event estimate for ${eventType} (${guestCount} guests, ${selectedPackage?.name || packageId} package). Indicative estimate: ${breakdown.display_label}.`
    );

    return (
      <div className="bg-white border border-beige rounded-2xl p-8 sm:p-12 max-w-3xl mx-auto text-center space-y-6 shadow-subtle">
        <div className="mx-auto h-14 w-14 rounded-full bg-cream border border-sand flex items-center justify-center text-mocha">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <p className="eyebrow-label">ESTIMATE SUBMITTED</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso">
            Your indicative estimate has been saved
          </h2>
          <p className="text-sm text-muted max-w-lg mx-auto">
            Thank you, {customerName}. Our planners have received your configuration
            and will prepare a tailored commercial quotation after reviewing venue and
            floral requirements.
          </p>
        </div>

        <div className="bg-cream border border-beige rounded-xl p-6 text-left space-y-2 text-sm max-w-md mx-auto">
          <p>
            <strong className="text-espresso">Event:</strong> {eventType}
          </p>
          <p>
            <strong className="text-espresso">Package:</strong>{' '}
            {selectedPackage?.name || packageId}
          </p>
          <p>
            <strong className="text-espresso">Guests:</strong> {guestCount}
          </p>
          <p>
            <strong className="text-espresso">Indicative Range:</strong>{' '}
            {breakdown.display_label}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em]"
          >
            Discuss on WhatsApp
          </a>
          <Link
            href={`/book?service=${encodeURIComponent(eventType)}`}
            className="px-7 py-3.5 rounded-full border border-sand bg-white text-espresso text-xs font-medium uppercase tracking-[0.16em]"
          >
            Request Preferred Date
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      {/* Guided Multi-Step Questionnaire */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-7 bg-white border border-beige rounded-2xl p-6 sm:p-9 space-y-8 shadow-subtle"
      >
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />

        {/* Progress Header */}
        <div className="space-y-3 border-b border-beige pb-5">
          <div className="flex items-center justify-between text-xs text-mocha font-medium uppercase tracking-[0.16em]">
            <span>
              Step {step} of {TOTAL_STEPS}
            </span>
            <span>{STEP_TITLES[step - 1]}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-cream overflow-hidden">
            <div
              className="h-full bg-mocha transition-all duration-300"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Event Type */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-espresso">
              What occasion are we planning?
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {ESTIMATOR_EVENT_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEventType(type)}
                  className={cn(
                    'text-left px-4 py-3.5 rounded-xl border text-sm transition-colors flex items-center justify-between',
                    eventType === type
                      ? 'bg-espresso text-ivory border-espresso'
                      : 'bg-ivory/60 text-espresso border-beige hover:border-sand'
                  )}
                >
                  <span>{type}</span>
                  {eventType === type && <Check className="w-4 h-4 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Event Date */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-espresso">
              When is your celebration planned?
            </h2>
            <p className="text-sm text-muted">
              Select a tentative or preferred date. Dates are verified manually during
              booking review.
            </p>
            <input
              type="date"
              value={eventDate}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3.5 text-sm text-espresso focus:border-mocha focus:outline-none"
            />
          </div>
        )}

        {/* Step 3: Event Location */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-espresso">
              Where will the event take place?
            </h2>
            <p className="text-sm text-muted">
              Enter your city, town, or venue name (e.g., Madanapalle, Tirupati,
              Punganur, or a specific convention hall).
            </p>
            <input
              type="text"
              placeholder="City or venue name"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3.5 text-sm text-espresso focus:border-mocha focus:outline-none"
            />
          </div>
        )}

        {/* Step 4: Approximate Guest Count */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="font-serif text-3xl text-espresso">
              Approximately how many guests?
            </h2>
            <div className="bg-cream border border-beige rounded-xl p-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wider text-mocha font-semibold">
                  Estimated Attendance
                </span>
                <span className="font-serif text-4xl text-espresso">
                  {guestCount.toLocaleString('en-IN')} guests
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={1500}
                step={10}
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-mocha"
              />
              <div className="flex justify-between text-xs text-muted">
                <span>20</span>
                <span>250</span>
                <span>500</span>
                <span>1,000</span>
                <span>1,500+</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Preferred Package */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-espresso">
              Choose your preferred package tier
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {packages.map((pkg) => {
                const selected = packageId === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setPackageId(pkg.id)}
                    className={cn(
                      'text-left p-5 rounded-xl border transition-all space-y-2',
                      selected
                        ? 'bg-espresso text-ivory border-espresso'
                        : 'bg-ivory/60 text-espresso border-beige hover:border-sand'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl">{pkg.name}</span>
                      <span
                        className={cn(
                          'text-xs font-medium',
                          selected ? 'text-sand' : 'text-mocha'
                        )}
                      >
                        {pkg.base_price
                          ? `From ${formatCurrency(pkg.base_price, settings.currency_symbol)}`
                          : 'Custom quote'}
                      </span>
                    </div>
                    <p
                      className={cn(
                        'text-xs leading-relaxed',
                        selected ? 'text-ivory/80' : 'text-muted'
                      )}
                    >
                      {pkg.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 6: Select Services */}
        {step === 6 && (
          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-espresso">
              Select the services you require
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {ESTIMATOR_SERVICE_OPTIONS.map((service) => {
                const active = selectedServices.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={cn(
                      'px-4 py-3 rounded-xl border text-left text-sm flex items-center justify-between transition-colors',
                      active
                        ? 'bg-cream border-mocha text-espresso font-medium'
                        : 'bg-white border-beige text-muted hover:border-sand'
                    )}
                  >
                    <span>{service}</span>
                    <span
                      className={cn(
                        'h-5 w-5 rounded-full border flex items-center justify-center',
                        active
                          ? 'bg-mocha border-mocha text-white'
                          : 'border-sand'
                      )}
                    >
                      {active && <Check className="w-3 h-3" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 7: Additional Preferences & Notes */}
        {step === 7 && (
          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-espresso">
              Any additional preferences or notes?
            </h2>
            <p className="text-sm text-muted">
              Share colour palettes, specific floral requests, ritual timings, or
              venue details.
            </p>
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe your aesthetic preferences, special rituals, or custom add-ons..."
              className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
            />
          </div>
        )}

        {/* Step 8: Customer Contact Details */}
        {step === 8 && (
          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-espresso">
              Where should we send your formal enquiry?
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-mocha font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-mocha font-medium mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-mocha font-medium mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-beige">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-beige text-xs font-medium uppercase tracking-wider text-espresso disabled:opacity-40"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-espresso transition-colors"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-espresso transition-colors disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Estimate as Enquiry</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>

      {/* Live Indicative Summary Panel */}
      <aside className="lg:col-span-5 bg-cream border border-beige rounded-2xl p-7 space-y-6 lg:sticky lg:top-24">
        <div className="space-y-1 border-b border-beige pb-4">
          <p className="eyebrow-label">INDICATIVE SUMMARY</p>
          <h3 className="font-serif text-3xl text-espresso">
            {breakdown.display_label}
          </h3>
        </div>

        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Event</dt>
            <dd className="font-medium text-espresso text-right">{eventType}</dd>
          </div>
          {eventDate && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Date</dt>
              <dd className="font-medium text-espresso text-right">{eventDate}</dd>
            </div>
          )}
          {location && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Location</dt>
              <dd className="font-medium text-espresso text-right">{location}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Guests</dt>
            <dd className="font-medium text-espresso text-right">
              {guestCount.toLocaleString('en-IN')}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Package</dt>
            <dd className="font-medium text-espresso text-right">
              {selectedPackage?.name || packageId}
            </dd>
          </div>
        </dl>

        {breakdown.configured && breakdown.items.length > 0 && (
          <div className="pt-4 border-t border-beige space-y-2.5">
            <p className="text-[11px] uppercase tracking-[0.16em] text-mocha font-semibold">
              Indicative Cost Breakdown
            </p>
            <ul className="space-y-2 text-xs">
              {breakdown.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between gap-2 text-espresso/85"
                >
                  <span>{item.label}</span>
                  <span className="font-medium shrink-0">
                    {formatCurrency(item.amount, settings.currency_symbol)}
                  </span>
                </li>
              ))}
              {breakdown.discount_amount > 0 && (
                <li className="flex items-center justify-between text-emerald-800">
                  <span>Studio Privilege Discount</span>
                  <span>
                    -{formatCurrency(breakdown.discount_amount, settings.currency_symbol)}
                  </span>
                </li>
              )}
              {breakdown.tax_amount > 0 && (
                <li className="flex items-center justify-between text-muted">
                  <span>Estimated Taxes ({settings.tax_percentage}%)</span>
                  <span>
                    {formatCurrency(breakdown.tax_amount, settings.currency_symbol)}
                  </span>
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="rounded-xl bg-ivory border border-beige p-4 flex items-start gap-2.5 text-xs text-muted leading-relaxed">
          <Info className="w-4 h-4 text-mocha shrink-0 mt-0.5" />
          <p>
            This calculation is an indicative estimate only and not a final
            quotation. Final pricing depends on venue dimensions, seasonal floral
            sourcing, and custom design specifications.
          </p>
        </div>
      </aside>
    </div>
  );
}
