'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, User, Phone, CheckCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialEstimate?: number;
}

export default function BookingModal({ isOpen, onClose, initialService, initialEstimate }: BookingModalProps) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: initialService || 'Weddings',
    date: '',
    city: 'Madanapalle / Tirupati',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B80D22', '#F59E0B', '#D4AF37', '#1E5631'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-wedding-border max-w-lg w-full relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wedding-marigold/15 border border-wedding-marigold/40 text-wedding-kumkum text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sri Ram Events Booking</span>
            </div>

            <h3 className="text-2xl font-black text-wedding-text">Book Your Celebration</h3>
            <p className="text-xs text-wedding-muted mt-1 font-medium">
              Fill in your details below and our lead Andhra event planner will reach out within 2 hours.
            </p>

            {initialEstimate && (
              <div className="mt-4 p-3 rounded-xl bg-wedding-cream border border-wedding-border flex justify-between items-center text-xs">
                <span className="text-wedding-muted font-bold">Estimated Total:</span>
                <span className="font-black text-wedding-kumkum text-sm">
                  ₹{initialEstimate.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs font-medium">
              <div>
                <label className="block text-wedding-text font-bold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Srikanth Reddy"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full py-2.5 px-3 rounded-xl bg-wedding-bg border border-wedding-border text-wedding-text focus:border-wedding-kumkum focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-wedding-text font-bold mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-wedding-bg border border-wedding-border text-wedding-text focus:border-wedding-kumkum focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-wedding-text font-bold mb-1">Event Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-wedding-bg border border-wedding-border text-wedding-text focus:border-wedding-kumkum focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-wedding-text font-bold mb-1">Service Required</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full py-2.5 px-3 rounded-xl bg-wedding-bg border border-wedding-border text-wedding-text focus:border-wedding-kumkum focus:outline-none"
                >
                  {[
                    'Weddings',
                    'Wedding and engagement',
                    'Event decor design',
                    'Decorations',
                    'Catering',
                    'Birthday party planning',
                    'Childrens party planning',
                    'Baby shower planning',
                    'Anniversary party planning',
                    'Corporate and conference',
                    'School event',
                    'Theme parties',
                    'Party planning',
                    'Private event planning',
                  ].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-wedding-text font-bold mb-1">Venue Location / City</label>
                <input
                  type="text"
                  placeholder="Madanapalle / Chittoor / Tirupati / Hyderabad"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full py-2.5 px-3 rounded-xl bg-wedding-bg border border-wedding-border text-wedding-text focus:border-wedding-kumkum focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-wedding-text font-bold mb-1">Special Village Decor Requests</label>
                <textarea
                  rows={2}
                  placeholder="e.g., Require 5-tier Kondapalli Koluvu & Hand-Drawn Single-Line Rangoli"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full py-2.5 px-3 rounded-xl bg-wedding-bg border border-wedding-border text-wedding-text focus:border-wedding-kumkum focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-wedding-kumkum text-white font-black text-sm shadow-md hover:bg-red-700 transition-all mt-2"
              >
                Confirm Booking Request
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-wedding-kumkum/10 border border-wedding-kumkum flex items-center justify-center mx-auto text-wedding-kumkum animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-wedding-text">
              నమస్కారం! Booking Confirmed
            </h3>
            <p className="text-xs text-wedding-muted max-w-sm mx-auto leading-relaxed font-medium">
              Thank you, <strong className="text-wedding-kumkum">{formData.name}</strong>! Sri Ram Events team has reserved your query for{' '}
              <strong className="text-wedding-text">{formData.service}</strong>. We will contact you at <strong>{formData.phone}</strong> shortly.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-8 py-3 rounded-xl bg-wedding-kumkum text-white font-bold text-xs hover:bg-red-700 transition-colors"
            >
              Done & Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
