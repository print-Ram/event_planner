'use client';

import React from 'react';
import { Phone, Mail, MapPin, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1214] text-white/80 pt-16 pb-12 border-t border-wedding-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/sri-ram-icon.png"
                alt="Sri Ram Events"
                className="h-10 w-10 object-cover rounded-lg bg-black p-0.5 border border-wedding-turmeric"
              />
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  Sri Ram <span className="text-wedding-warmGold">Events</span>
                </span>
                <p className="text-[11px] font-semibold text-white/60">We plan, you Celebrate</p>
              </div>
            </div>

            <p className="text-xs font-medium leading-relaxed text-white/60">
              Transforming your milestones into unforgettable festive experiences with authentic Telugu culture, elegant mandapams, and end-to-end event execution.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-wedding-warmGold text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>సంతోషాన్ని అందంగా జరుపుకుందాం</span>
            </div>
          </div>

          {/* Event Services Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-wedding-warmGold">
              Event Categories
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-white/70">
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">Grand Weddings</a></li>
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">Joyous Birthdays</a></li>
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">Private Gatherings</a></li>
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">House Warming (Gruhapravesam)</a></li>
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">Authentic Catering</a></li>
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">School & College Fests</a></li>
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">Creative Theme Parties</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-wedding-warmGold">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-white/70">
              <li><a href="#hero" className="hover:text-wedding-warmGold transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-wedding-warmGold transition-colors">Services We Offer</a></li>
              <li><a href="#estimator" className="hover:text-wedding-warmGold transition-colors">Event Cost Estimator</a></li>
              <li><a href="#why-us" className="hover:text-wedding-warmGold transition-colors">Why Choose Us</a></li>
              <li><a href="#contact" className="hover:text-wedding-warmGold transition-colors">Request Quotation</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-wedding-warmGold">
              Contact & Location
            </h4>
            <ul className="space-y-3 text-xs font-medium text-white/70">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-wedding-warmGold shrink-0" />
                <a href="tel:+919502559333" className="hover:text-wedding-warmGold transition-colors">+91 95025 59333</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-wedding-warmGold shrink-0" />
                <span>contact@sriramevents.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-wedding-warmGold shrink-0 mt-0.5" />
                <span>Madanapalle (Main Branch), Tirupati, Punganur, Kothakota & across Andhra Pradesh</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-white/50">
          <p>© {new Date().getFullYear()} Sri Ram Events. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Telugu Celebrations</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
