'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone, Calendar, Sparkles } from 'lucide-react';

interface ServiceNavbarProps {
  onOpenBooking: () => void;
}

export default function ServiceNavbar({ onOpenBooking }: ServiceNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFFDF7]/95 backdrop-blur-md py-3 shadow-lg border-b border-wedding-border'
          : 'bg-gradient-to-b from-[#FFFDF7] via-[#FFFDF7]/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Back Link */}
        <div className="flex items-center gap-4">
          <Link
            href="/#services"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-wedding-ivory border border-wedding-border text-xs font-bold text-wedding-kumkum hover:bg-wedding-cream transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">All Events</span>
          </Link>

          <Link href="/" className="flex items-center gap-3 group">
            <div
              onDoubleClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('open-admin-portal'));
              }}
              title=""
              className="relative flex items-center justify-center p-1 rounded-xl bg-gradient-to-tr from-wedding-kumkum via-wedding-marigold to-wedding-turmeric shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden cursor-pointer"
            >
              <img
                src="/sri-ram-icon.png"
                alt="Sri Ram Events Symbol"
                className="h-9 w-9 sm:h-10 sm:w-10 object-cover rounded-lg bg-black"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-wedding-text group-hover:text-wedding-kumkum transition-colors">
                  Sri Ram <span className="kumkum-text">Events</span>
                </span>
              </div>
              <p className="text-[10px] font-semibold text-wedding-muted">Madanapalle • Tirupati • Punganur</p>
            </div>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <a
            href="tel:+919502559333"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-wedding-ivory border border-wedding-border text-wedding-text hover:border-wedding-kumkum hover:text-wedding-kumkum transition-all shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-wedding-ruby" />
            <span>+91 95025 59333</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-wedding-kumkum to-wedding-ruby text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Event</span>
          </button>
        </div>
      </div>
    </header>
  );
}
