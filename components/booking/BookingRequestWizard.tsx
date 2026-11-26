'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Loader2,
  Send,
} from 'lucide-react';
import {
  ESTIMATOR_EVENT_TYPES,
  ESTIMATOR_SERVICE_OPTIONS,
} from '@/lib/seedData';
import { buildWhatsAppUrl, cn, formatCurrency } from '@/lib/utils';
import type { BusinessSettings } from '@/types/database';
import type { PackageTier } from '@/types/pricing';

interface UnavailableDateInfo {
  date: string;
  reason: string;
  status: 'unavailable' | 'booked';
}

export default function BookingRequestWizard({
  packages,
  settings,
  unavailableDates,
  initialService,
}: {
  packages: PackageTier[];
  settings: BusinessSettings;
  unavailableDates: UnavailableDateInfo[];
  initialService?: string;
}) {
  const [step, setStep] = useState<'details' | 'review' | 'confirmed'>('details');
  const [eventType, setEventType] = useState(
    initialService || ESTIMATOR_EVENT_TYPES[0]
  );
  const [eventDate, setEventDate] = useState('');
  const [alternativeDate, setAlternativeDate] = useState('');
  const [location, setLocation] = useState('');
  const [guestCount, setGuestCount] = useState(150);
  const [packageId, setPackageId] = useState(packages[1]?.id || packages[0]?.id || 'premium');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Planning',
    'Decoration',
  ]);
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  const blockedEntry = useMemo(
    () => unavailableDates.find((d) => d.date === eventDate),
    [unavailableDates, eventDate]
  );

  const selectedPackage = packages.find((p) => p.id === packageId);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!eventDate) {
      setError('Please select a preferred event date.');
      return;
    }
    if (blockedEntry) {
      setError(
        `Your selected date (${eventDate}) is unavailable: ${blockedEntry.reason}`
      );
      return;
    }
    if (selectedServices.length === 0) {
      setError('Please select at least one service.');
      return;
    }
    setStep('review');
  };

  const handleConfirmSubmit = async () => {
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerName,
          email,
          phone,
          event_type: eventType,
          event_date: eventDate,
          alternative_date: alternativeDate,
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
        setError(json.error || 'Could not submit booking request.');
        setStep('details');
        setSubmitting(false);
        return;
      }
      setBookingRef(json.booking?.booking_reference || 'SRE-PENDING');
      setStep('confirmed');
    } catch {
      setError('Network error submitting booking request.');
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 'confirmed') {
    const waHref = buildWhatsAppUrl(
      settings.whatsapp,
      `Hello ${settings.business_name}, I submitted Booking Request ${bookingRef} for ${eventType} on ${eventDate} in ${location} (${guestCount} guests).`
    );

    return (
      <div className="bg-white border border-beige rounded-2xl p-8 sm:p-12 max-w-3xl mx-auto text-center space-y-6 shadow-subtle">
        <div className="mx-auto h-14 w-14 rounded-full bg-cream border border-sand flex items-center justify-center text-mocha">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <p className="eyebrow-label">BOOKING REQUEST RECEIVED</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso">
            Reference: {bookingRef}
          </h2>
          <p className="text-sm text-muted max-w-lg mx-auto leading-relaxed">
            Your request for <strong>{eventDate}</strong> is currently marked{' '}
            <strong>Pending Studio Review</strong>. Event dates are not automatically
            confirmed until our planning team verifies logistics and approves your
            request.
          </p>
        </div>

        <div className="bg-cream border border-beige rounded-xl p-6 text-left text-sm space-y-2 max-w-md mx-auto">
          <p>
            <strong>Customer:</strong> {customerName}
          </p>
          <p>
            <strong>Event:</strong> {eventType}
          </p>
          <p>
            <strong>Preferred Date:</strong> {eventDate}
          </p>
          {alternativeDate && (
            <p>
              <strong>Alternative Date:</strong> {alternativeDate}
            </p>
          )}
          <p>
            <strong>Location:</strong> {location}
          </p>
          <p>
            <strong>Package:</strong> {selectedPackage?.name || packageId}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em]"
          >
            Share Reference on WhatsApp
          </a>
          <Link
            href="/"
            className="px-7 py-3.5 rounded-full border border-sand bg-white text-espresso text-xs font-medium uppercase tracking-[0.16em]"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 bg-white border border-beige rounded-2xl p-6 sm:p-9 shadow-subtle">
        {step === 'details' ? (
          <form onSubmit={handleReview} className="space-y-7">
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-mocha font-medium">
                  Event Category *
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
                >
                  {ESTIMATOR_EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-mocha font-medium">
                  Estimated Guest Count *
                </label>
                <input
                  type="number"
                  min={1}
                  max={50000}
                  required
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-mocha font-medium">
                  Preferred Event Date *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().slice(0, 10)}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
                />
                {blockedEntry && (
                  <p className="text-xs text-red-700 flex items-center gap-1 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{blockedEntry.reason}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-mocha font-medium">
                  Alternative Date (Optional)
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={alternativeDate}
                  onChange={(e) => setAlternativeDate(e.target.value)}
                  className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider text-mocha font-medium">
                Event Location / Venue *
              </label>
              <input
                type="text"
                required
                placeholder="City, convention hall, or residence address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-mocha font-medium">
                Select Package *
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setPackageId(pkg.id)}
                    className={cn(
                      'text-left p-4 rounded-xl border transition-colors',
                      packageId === pkg.id
                        ? 'bg-espresso text-ivory border-espresso'
                        : 'bg-ivory/60 text-espresso border-beige hover:border-sand'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xl">{pkg.name}</span>
                      <span className="text-xs opacity-80">
                        {pkg.base_price
                          ? `From ${formatCurrency(pkg.base_price, settings.currency_symbol)}`
                          : 'Custom'}
                      </span>
                    </div>
                    <p className="text-xs opacity-75 mt-1">{pkg.tagline}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-mocha font-medium">
                Required Services *
              </label>
              <div className="flex flex-wrap gap-2">
                {ESTIMATOR_SERVICE_OPTIONS.map((service) => {
                  const active = selectedServices.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={cn(
                        'px-3.5 py-2 rounded-full border text-xs transition-colors inline-flex items-center gap-1.5',
                        active
                          ? 'bg-mocha text-white border-mocha'
                          : 'bg-white text-espresso border-beige hover:border-sand'
                      )}
                    >
                      {active && <Check className="w-3 h-3" />}
                      <span>{service}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-mocha font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-mocha font-medium">
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
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-mocha font-medium">
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

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider text-mocha font-medium">
                Celebration Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ceremony timings, palette, or specific venue requirements..."
                className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
              />
            </div>

            {error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-espresso transition-colors"
            >
              Review Booking Request
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="space-y-1 border-b border-beige pb-4">
              <p className="eyebrow-label">REVIEW YOUR REQUEST</p>
              <h2 className="font-serif text-3xl text-espresso">
                Confirm details before submitting
              </h2>
            </div>

            <dl className="grid sm:grid-cols-2 gap-4 text-sm bg-cream border border-beige rounded-xl p-6">
              <div>
                <dt className="text-xs uppercase text-taupe">Event Category</dt>
                <dd className="font-medium text-espresso mt-0.5">{eventType}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-taupe">Preferred Date</dt>
                <dd className="font-medium text-espresso mt-0.5">{eventDate}</dd>
              </div>
              {alternativeDate && (
                <div>
                  <dt className="text-xs uppercase text-taupe">Alternative Date</dt>
                  <dd className="font-medium text-espresso mt-0.5">{alternativeDate}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs uppercase text-taupe">Location</dt>
                <dd className="font-medium text-espresso mt-0.5">{location}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-taupe">Guest Count</dt>
                <dd className="font-medium text-espresso mt-0.5">{guestCount}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-taupe">Package</dt>
                <dd className="font-medium text-espresso mt-0.5">
                  {selectedPackage?.name || packageId}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase text-taupe">Selected Services</dt>
                <dd className="font-medium text-espresso mt-0.5">
                  {selectedServices.join(', ')}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-taupe">Contact</dt>
                <dd className="font-medium text-espresso mt-0.5">
                  {customerName} · {phone} · {email}
                </dd>
              </div>
            </dl>

            <div className="rounded-xl bg-ivory border border-beige p-4 text-xs text-muted leading-relaxed">
              No online payment is collected now. Your booking request will enter{' '}
              <strong>Pending</strong> status while our studio confirms availability and
              prepares a formal quotation.
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="px-6 py-3 rounded-full border border-beige text-xs font-medium uppercase tracking-wider text-espresso"
              >
                Edit Details
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleConfirmSubmit}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-espresso transition-colors disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Booking Request</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Availability & Studio Review Sidebar */}
      <aside className="lg:col-span-4 space-y-6">
        <div className="bg-cream border border-beige rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-mocha">
            <Clock className="w-4 h-4" />
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em]">
              Manual Studio Approval
            </h3>
          </div>
          <p className="text-sm text-espresso/85 leading-relaxed">
            {settings.booking_policy}
          </p>
        </div>

        <div className="bg-white border border-beige rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-mocha">
            <Calendar className="w-4 h-4" />
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em]">
              Calendar Availability
            </h3>
          </div>
          {unavailableDates.length === 0 ? (
            <p className="text-sm text-muted">
              All upcoming dates are currently open for booking requests, subject to
              studio review.
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-muted">
                The following dates are already booked or marked unavailable:
              </p>
              <ul className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {unavailableDates.map((item) => (
                  <li
                    key={item.date}
                    className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-cream border border-beige"
                  >
                    <span className="font-medium text-espresso">{item.date}</span>
                    <span className="text-mocha capitalize">{item.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
