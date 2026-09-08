'use client';

import React from 'react';
import { Calendar, Phone, MessageSquare, Sparkles } from 'lucide-react';

interface CTASectionProps {
  onOpenBooking: () => void;
}

export default function CTASection({ onOpenBooking }: CTASectionProps) {
  return (
    <section id="contact" className="py-20 bg-gradient-to-r from-wedding-kumkum via-[#7A1521] to-[#8B1E29] text-white relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-wedding-marigold/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-wedding-turmeric/20 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-wedding-warmGold text-xs font-black backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-wedding-marigold" />
          <span>మీ కలల వేడుకకు శ్రీ రామ్ ఈవెంట్స్ తోడు</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Planning Something <span className="text-wedding-warmGold">Special?</span>
        </h2>

        {/* Subheading */}
        <p className="text-base sm:text-xl font-medium text-white/85 max-w-2xl mx-auto leading-relaxed">
          Tell us what you are celebrating. We will help turn it into a memorable experience cherished for a lifetime.
        </p>

        {/* Action Pathway Grid */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
          {/* WhatsApp Direct Chat */}
          <a
            href="https://wa.me/919502559333?text=Hi%20Sri%20Ram%20Events%2C%20I%20would%20like%20to%20plan%20an%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2.5"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Instant Call */}
          <a
            href="tel:+919502559333"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-extrabold text-sm backdrop-blur-md shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2.5"
          >
            <Phone className="w-5 h-5 text-wedding-warmGold" />
            <span>Call +91 95025 59333</span>
          </a>

          {/* Request Quote Modal */}
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-wedding-marigold hover:bg-amber-400 text-wedding-text font-black text-sm shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2.5"
          >
            <Calendar className="w-5 h-5" />
            <span>Request Free Quote</span>
          </button>
        </div>

        {/* Location & Quick Notice */}
        <div className="pt-6 border-t border-white/15 text-xs font-semibold text-white/70 flex flex-wrap justify-center gap-6">
          <span>📍 Main Branch: Madanapalle | Serving Tirupati, Punganur, Kothakota & across AP & surroundings</span>
          <span>⏰ Available Mon - Sun: 8:00 AM - 9:00 PM</span>
        </div>

      </div>
    </section>
  );
}
