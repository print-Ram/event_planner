'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { enquirySchema, type EnquiryInput } from '@/lib/validation/schemas';
import { ESTIMATOR_EVENT_TYPES } from '@/lib/seedData';
import { buildWhatsAppUrl } from '@/lib/utils';

export default function ContactForm({
  whatsappNumber,
  businessName,
}: {
  whatsappNumber: string;
  businessName: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      customer_name: '',
      email: '',
      phone: '',
      event_type: ESTIMATOR_EVENT_TYPES[0],
      event_date: '',
      location: '',
      message: '',
      website_url: '',
    },
  });

  const onSubmit = async (data: EnquiryInput) => {
    setServerError('');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error || 'Could not submit enquiry.');
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError('Network error. Please try again or reach out on WhatsApp.');
    }
  };

  if (submitted) {
    const vals = getValues();
    const waHref = buildWhatsAppUrl(
      whatsappNumber,
      `Hello ${businessName}, I just submitted a contact enquiry for ${vals.event_type} (${vals.customer_name}).`
    );

    return (
      <div className="bg-white border border-beige rounded-2xl p-8 sm:p-10 text-center space-y-5">
        <div className="mx-auto h-12 w-12 rounded-full bg-cream border border-sand flex items-center justify-center text-mocha">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-3xl text-espresso">Enquiry Received</h2>
        <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
          Thank you, {vals.customer_name}. Our studio has logged your enquiry and will
          respond shortly.
        </p>
        <div className="pt-2">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em]"
          >
            Continue on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-beige rounded-2xl p-7 sm:p-9 space-y-5"
    >
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register('website_url')}
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium uppercase tracking-wider text-mocha">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="Your full name"
            className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
            {...register('customer_name')}
          />
          {errors.customer_name && (
            <p className="text-xs text-red-700">{errors.customer_name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium uppercase tracking-wider text-mocha">
            Phone / WhatsApp *
          </label>
          <input
            type="tel"
            placeholder="+91 98765 43210"
            className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-xs text-red-700">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium uppercase tracking-wider text-mocha">
            Email Address *
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-red-700">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium uppercase tracking-wider text-mocha">
            Event Type *
          </label>
          <select
            className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
            {...register('event_type')}
          >
            {ESTIMATOR_EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium uppercase tracking-wider text-mocha">
            Preferred Date
          </label>
          <input
            type="date"
            className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
            {...register('event_date')}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium uppercase tracking-wider text-mocha">
            City / Venue
          </label>
          <input
            type="text"
            placeholder="Madanapalle / Tirupati / Venue"
            className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
            {...register('location')}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium uppercase tracking-wider text-mocha">
          Message &amp; Requirements
        </label>
        <textarea
          rows={4}
          placeholder="Tell us about your vision, guest count, or questions..."
          className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-3 text-sm text-espresso focus:border-mocha focus:outline-none"
          {...register('message')}
        />
      </div>

      {serverError && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-espresso transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Enquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Enquiry</span>
          </>
        )}
      </button>
    </form>
  );
}
