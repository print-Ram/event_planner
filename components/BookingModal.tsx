'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle, Calendar, ShieldCheck, MessageSquare } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialEstimate?: number;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialService,
  initialEstimate,
}: BookingModalProps) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: initialService || 'Grand Weddings',
    date: '',
    city: 'Madanapalle (Main Branch)',
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
      colors: ['#8B1E29', '#B80D22', '#F59E0B', '#D4AF37', '#1E5631'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-wedding-border max-w-lg w-full relative shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-wedding-muted hover:text-wedding-kumkum text-xl font-bold p-2"
          aria-label="Close modal"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wedding-kumkum/10 border border-wedding-kumkum/20 text-wedding-kumkum text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-wedding-ruby" />
              <span>Sri Ram Events Quotation</span>
            </div>

            <h3 className="text-2xl font-black text-wedding-text">Request Customized Quote</h3>
            <p className="text-xs text-wedding-muted mt-1 font-medium leading-relaxed">
              Tell us about your celebration requirements. Our lead Telugu event specialist will contact you with a tailored proposal.
            </p>

            {initialEstimate && (
              <div className="mt-4 p-3.5 rounded-xl bg-wedding-ivory border border-wedding-border flex justify-between items-center text-xs">
                <span className="text-wedding-muted font-extrabold">Indicative Calculation:</span>
                <div className="text-right">
                  <span className="font-black text-wedding-kumkum text-sm strikethrough-price mr-2">
                    ₹{initialEstimate.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-bold text-wedding-muted block">Customized Package Applies</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 text-xs font-medium">
              <div>
                <label className="block text-wedding-text font-bold mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Srikanth Reddy"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-wedding-bg border border-wedding-border text-wedding-text focus:border-wedding-kumkum focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-wedding-text font-bold mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 95025 59333"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-wedding-bg border border-wedding-border text-wedding-text focus:border-wedding-kumkum focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-wedding-text font-bold mb-1">Event Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-wedding-bg border border-wedding-border text-wedding-text focus:border-wedding-kumkum focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-wedding-text font-bold mb-1">Event Category</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-wedding-bg border border-wedding-border text-wedding-text focus:border-wedding-kumkum focus:outline-none"
                >
                  {[
                    'Grand Weddings',
                    'Joyous Birthdays',
                    'Private Celebrations',
                    'House Warming (Gruhapravesam)',
                    'Authentic Catering',
                    'School & College Fests',
                    'Creative Theme Parties',
                  ].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-wedding-text font-bold mb-1">Venue Location / City</label>
                <input
                  type="text"
                  placeholder="Madanapalle / Tirupati / Punganur / Kothakota"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-wedding-bg border border-wedding-border text-wedding-text focus:border-wedding-kumkum focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-wedding-text font-bold mb-1">Specific Decor / Catering Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Traditional floral mandapam setup & banana leaf catering for 300 guests"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-wedding-bg border border-wedding-border text-wedding-text focus:border-wedding-kumkum focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-wedding-kumkum via-wedding-ruby to-wedding-marigold text-white font-black text-sm shadow-md hover:shadow-lg transition-all mt-2"
              >
                Submit Quote Request
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-wedding-text">
              నమస్కారం! Quote Requested
            </h3>
            <p className="text-xs text-wedding-muted max-w-sm mx-auto leading-relaxed font-medium">
              Thank you, <strong className="text-wedding-kumkum">{formData.name}</strong>! Sri Ram Events team has received your inquiry for{' '}
              <strong className="text-wedding-text">{formData.service}</strong>. We will call you at <strong>{formData.phone}</strong> shortly with a personalized quotation.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`https://wa.me/919502559333?text=Hi%20Sri%20Ram%20Events%2C%20I%20just%20submitted%20a%20quote%20request%20for%20${encodeURIComponent(formData.service)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-wedding-ivory border border-wedding-border text-wedding-text font-bold text-xs hover:border-wedding-kumkum transition-colors"
              >
                Close & Return to Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
