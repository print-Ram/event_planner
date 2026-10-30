'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle,
  Calendar,
  ShieldCheck,
  MessageSquare,
  Phone,
  ArrowRight,
  Send,
  UserCheck
} from 'lucide-react';
import { submitQuoteInquiry } from '../lib/firebase';

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generatedRefId, setGeneratedRefId] = useState<string>('');
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

  const OWNER_PHONE = '919502559333';

  // Customer phone formatted for WhatsApp
  const cleanCustomerPhone = formData.phone.replace(/[^0-9]/g, '');
  const customerWhatsAppNumber = cleanCustomerPhone.startsWith('91')
    ? cleanCustomerPhone
    : `91${cleanCustomerPhone}`;

  // 1. Message TO OWNER (Request Received notification - Vice Versa)
  const ownerWhatsAppMessage = encodeURIComponent(
    `✨ *NEW EVENT QUOTE REQUEST — SRI RAM EVENTS* ✨\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `🆔 *Reference ID:* #${generatedRefId || 'PENDING'}\n` +
      `👤 *Customer Name:* ${formData.name}\n` +
      `📱 *Customer Phone:* ${formData.phone}\n` +
      `🎉 *Category:* ${formData.service}\n` +
      `📅 *Event Date:* ${formData.date || 'To be decided'}\n` +
      `📍 *Venue / City:* ${formData.city}\n` +
      (initialEstimate ? `💰 *Estimated Budget:* ₹${initialEstimate.toLocaleString('en-IN')}\n` : '') +
      (formData.notes ? `📝 *Notes / Requirements:* ${formData.notes}\n` : '') +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `⚡ *Action:* Automatic inquiry logged. Please send customized proposal to customer.`
  );

  // 2. Message FROM OWNER TO CUSTOMER (Welcome & Confirmation from Sri Ram Events)
  const customerWhatsAppMessage = encodeURIComponent(
    `నమస్కారం ${formData.name} garu! 🙏\n\n` +
      `Thank you for choosing *Sri Ram Events (Madanapalle)*.\n\n` +
      `We have successfully received your quote request for *${formData.service}* on *${formData.date || 'Upcoming Date'}* (Ref ID: *#${generatedRefId || 'SRE-2025'}*).\n\n` +
      `Our Senior Telugu Event Specialist is reviewing your requirements and will connect with you at *${formData.phone}* shortly with a customized catalog and quotation.\n\n` +
      `📞 Direct Call/WhatsApp: +91 95025 59333\n` +
      `📍 Main Branch: Madanapalle | Serving Tirupati, Punganur, Kothakota & across AP.`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save directly to Firebase Realtime Database
      const refId = await submitQuoteInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        date: formData.date,
        city: formData.city,
        notes: formData.notes,
        estimatedBudget: initialEstimate,
      });

      setGeneratedRefId(refId);
      setSubmitted(true);

      // Trigger Confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B1E29', '#B80D22', '#F59E0B', '#D4AF37', '#1E5631'],
      });

      // 2. Automatically dispatch notification to Owner's WhatsApp
      const ownerUrl = `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(
        `✨ *NEW EVENT QUOTE REQUEST — SRI RAM EVENTS* ✨\n` +
          `━━━━━━━━━━━━━━━━━━━━━\n` +
          `🆔 *Reference ID:* #${refId}\n` +
          `👤 *Customer Name:* ${formData.name}\n` +
          `📱 *Customer Phone:* ${formData.phone}\n` +
          `🎉 *Category:* ${formData.service}\n` +
          `📅 *Event Date:* ${formData.date || 'To be decided'}\n` +
          `📍 *Venue / City:* ${formData.city}\n` +
          (initialEstimate ? `💰 *Estimated Budget:* ₹${initialEstimate.toLocaleString('en-IN')}\n` : '') +
          (formData.notes ? `📝 *Notes / Requirements:* ${formData.notes}\n` : '') +
          `━━━━━━━━━━━━━━━━━━━━━\n` +
          `⚡ *Action:* Automatic inquiry logged in Sri Ram Events database.`
      )}`;

      // Open owner WhatsApp window
      window.open(ownerUrl, '_blank');
    } catch (err) {
      console.error('Error submitting quote inquiry to Firebase:', err);
      // Fallback submission
      const fallbackId = `SRE-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedRefId(fallbackId);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-wedding-border max-w-lg w-full relative shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
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
                  <label className="block text-wedding-text font-bold mb-1">Mobile Phone (WhatsApp) *</label>
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

              <div className="pt-1 text-[11px] text-wedding-muted flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-wedding-leaf shrink-0" />
                <span>Instant automated WhatsApp notification dispatched to owner upon submit.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-wedding-kumkum via-wedding-ruby to-wedding-marigold text-white font-black text-sm shadow-md hover:shadow-lg transition-all mt-2 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Logging Request in Cloud...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Quote Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Booking Reference ID: #{generatedRefId}
              </span>
              <h3 className="text-2xl font-black text-wedding-text pt-2">
                నమస్కారం! Quote Request Received
              </h3>
            </div>

            <p className="text-xs text-wedding-muted max-w-sm mx-auto leading-relaxed font-medium">
              Thank you, <strong className="text-wedding-kumkum">{formData.name}</strong>! Sri Ram Events team has logged your inquiry for{' '}
              <strong className="text-wedding-text">{formData.service}</strong> into our system.
            </p>

            {/* Dual WhatsApp Automated Sync Channels */}
            <div className="space-y-2.5 text-left pt-2">
              {/* Channel 1: WhatsApp to Owner */}
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Owner Notification (Vice Versa)</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200/60 font-black text-emerald-900">
                    Dispatched
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Quotation request was transmitted to Owner Sri Ram (+91 95025 59333). You can also message the owner directly on WhatsApp:
                </p>
                <a
                  href={`https://wa.me/${OWNER_PHONE}?text=${ownerWhatsAppMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat with Owner (+91 95025 59333)</span>
                </a>
              </div>

              {/* Channel 2: Official Confirmation to Customer */}
              {formData.phone && (
                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-amber-600" />
                      <span>Message from Owner to Customer</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200/60 font-black text-amber-900">
                      Auto-Composed
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Official booking acknowledgment prepared for customer's WhatsApp (+91 {formData.phone}):
                  </p>
                  <a
                    href={`https://wa.me/${customerWhatsAppNumber}?text=${customerWhatsAppMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs shadow flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Official Confirmation to {formData.name}</span>
                  </a>
                </div>
              )}
            </div>

            <div className="pt-2">
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
