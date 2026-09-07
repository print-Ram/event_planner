'use client';

import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import SingleLineRangoli from './SingleLineRangoli';

export default function Footer() {
  return (
    <footer className="bg-wedding-ivory border-t border-wedding-border pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/sri-ram-icon.png"
                alt="Sri Ram Events Logo"
                className="w-12 h-12 object-cover rounded-xl border border-wedding-border shadow-md bg-black"
              />
              <span className="text-2xl font-black text-wedding-text">
                Sri Ram <span className="kumkum-text">Events</span>
              </span>
            </div>
            <p className="text-xs text-wedding-muted max-w-md leading-relaxed font-medium">
              Premieres of authentic Andhra village heritage and traditional wedding styling. Bringing hand-drawn single-line Rangolis, Kondapalli Koluvu displays, and grand Telugu wedding celebrations to life.
            </p>
            <div className="text-xs text-wedding-kumkum font-bold font-mono">
              WE PLAN. YOU CELEBRATE. • మీ ప్రతి శుభకార్యానికి సదా సిద్ధం
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-wedding-text uppercase tracking-wider">Contact & Address</h4>
            <div className="space-y-2 text-xs text-wedding-muted font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-wedding-kumkum shrink-0 mt-0.5" />
                <span>Sri Ram Events, Main Road, Chittoor District, Andhra Pradesh 517325</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-wedding-marigold shrink-0" />
                <span>+91 98765 43210 / +91 87654 32109</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-wedding-kumkum shrink-0" />
                <span>contact@sriramevents.in</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-wedding-text uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-wedding-muted font-medium">
              <li><a href="#hero" className="hover:text-wedding-kumkum transition-colors">Home</a></li>
              <li><a href="#rangoli-studio" className="hover:text-wedding-kumkum transition-colors">Single-Line Rangoli Studio</a></li>
              <li><a href="#bommala-koluvu" className="hover:text-wedding-kumkum transition-colors">Cultural Dolls Showcase</a></li>
              <li><a href="#services" className="hover:text-wedding-kumkum transition-colors">Service Offerings</a></li>
              <li><a href="#estimator" className="hover:text-wedding-kumkum transition-colors">Cost Estimator</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-wedding-border flex flex-col sm:flex-row items-center justify-between text-xs text-wedding-muted font-medium gap-4">
          <p>© {new Date().getFullYear()} Sri Ram Events. All rights reserved. We plan you Celebrate.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with Authentic Telugu Pride</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
