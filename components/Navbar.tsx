'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Calendar, Phone, Palette } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          ? 'wedding-panel py-2.5 shadow-md border-b border-wedding-border'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center p-0.5 rounded-xl bg-gradient-to-tr from-wedding-marigold via-wedding-kumkum to-wedding-turmeric shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden">
            <img
              src="/sri-ram-icon.png"
              alt="Sri Ram Events Symbol"
              className="h-10 w-10 sm:h-12 sm:w-12 object-cover rounded-lg bg-black"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-wedding-text group-hover:text-wedding-kumkum transition-colors">
                Sri Ram <span className="kumkum-text">Events</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-wedding-marigold/20 border border-wedding-marigold/40 text-wedding-kumkum">
                Andhra Heritage
              </span>
            </div>
            <p className="text-[11px] font-semibold text-wedding-muted">We plan you Celebrate</p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-wedding-text">
          <a
            href="#hero"
            className="hover:text-wedding-kumkum transition-colors flex items-center gap-1"
          >
            Home
          </a>
          <a
            href="#rangoli-studio"
            className="hover:text-wedding-kumkum transition-colors flex items-center gap-1.5"
          >
            <Palette className="w-4 h-4 text-wedding-marigold" />
            Single-Line Rangoli
          </a>
          <a
            href="#bommala-koluvu"
            className="hover:text-wedding-kumkum transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-wedding-turmeric" />
            Cultural Dolls
          </a>
          <a
            href="#services"
            className="hover:text-wedding-kumkum transition-colors"
          >
            Services
          </a>
          <a
            href="#estimator"
            className="hover:text-wedding-kumkum transition-colors"
          >
            Estimator
          </a>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl bg-wedding-cream border border-wedding-border text-wedding-text hover:border-wedding-kumkum transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-wedding-kumkum" />
            <span>+91 Call Us</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-wedding-kumkum via-wedding-marigold to-wedding-turmeric text-white font-extrabold text-sm shadow-md hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Book Event Now
            </span>
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-wedding-cream border border-wedding-border text-wedding-text"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-wedding-bg border-t border-wedding-border mt-3 px-6 py-6 space-y-4 shadow-xl">
          <a
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-wedding-text hover:text-wedding-kumkum"
          >
            Home
          </a>
          <a
            href="#rangoli-studio"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-wedding-kumkum"
          >
            🎨 Single-Line Rangoli Studio
          </a>
          <a
            href="#bommala-koluvu"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-wedding-marigold"
          >
            🎎 Andhra Cultural Dolls (Koluvu)
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-wedding-text hover:text-wedding-kumkum"
          >
            ✨ Services & Decor
          </a>
          <a
            href="#estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-wedding-text hover:text-wedding-kumkum"
          >
            🧮 Event Cost Estimator
          </a>
          <div className="pt-4 border-t border-wedding-border">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-wedding-kumkum text-white font-extrabold text-center shadow-md"
            >
              Book Event Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
