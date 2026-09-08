'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Calendar, Phone, PartyPopper } from 'lucide-react';

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
          ? 'bg-[#FFFDF7]/95 backdrop-blur-md py-3 shadow-lg border-b border-wedding-border'
          : 'bg-gradient-to-b from-[#FFFDF7] via-[#FFFDF7]/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center p-1 rounded-xl bg-gradient-to-tr from-wedding-kumkum via-wedding-marigold to-wedding-turmeric shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden">
            <img
              src="/sri-ram-icon.png"
              alt="Sri Ram Events Symbol"
              className="h-10 w-10 sm:h-11 sm:w-11 object-cover rounded-lg bg-black"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-wedding-text group-hover:text-wedding-kumkum transition-colors">
                Sri Ram <span className="kumkum-text">Events</span>
              </span>
            </div>
            <p className="text-[11px] font-semibold text-wedding-muted">We plan, you Celebrate</p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-extrabold text-wedding-text">
          <a
            href="#hero"
            className="hover:text-wedding-kumkum transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-wedding-kumkum hover:after:w-full after:transition-all"
          >
            Home
          </a>
          <a
            href="#services"
            className="hover:text-wedding-kumkum transition-colors flex items-center gap-1.5 py-1"
          >
            <PartyPopper className="w-4 h-4 text-wedding-ruby" />
            Events We Celebrate
          </a>
          <a
            href="#estimator"
            className="hover:text-wedding-kumkum transition-colors flex items-center gap-1.5 py-1"
          >
            <Sparkles className="w-4 h-4 text-wedding-turmeric" />
            Cost Estimator
          </a>
          <a
            href="#why-us"
            className="hover:text-wedding-kumkum transition-colors py-1"
          >
            Why Choose Us
          </a>
          <a
            href="#contact"
            className="hover:text-wedding-kumkum transition-colors py-1"
          >
            Contact Us
          </a>
        </nav>

        {/* Desktop CTA Action Buttons */}
        <div className="hidden lg:flex items-center gap-3.5">
          <a
            href="tel:+919502559333"
            className="flex items-center gap-2 text-xs font-bold px-3.5 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-border text-wedding-text hover:border-wedding-kumkum hover:text-wedding-kumkum transition-all shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-wedding-ruby" />
            <span>+91 95025 59333</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-wedding-kumkum via-wedding-ruby to-wedding-marigold text-white font-extrabold text-sm shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Request Customized Quote
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-wedding-ivory border border-wedding-border text-wedding-text hover:text-wedding-kumkum focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-wedding-border px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="pb-3 border-b border-wedding-border/60">
            <span className="text-xs font-extrabold uppercase tracking-wider text-wedding-kumkum">
              మీ వేడుక... మా బాధ్యత.
            </span>
          </div>

          <a
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-extrabold text-wedding-text hover:text-wedding-kumkum py-1"
          >
            🏠 Home
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-extrabold text-wedding-kumkum py-1"
          >
            🎉 Events We Celebrate
          </a>
          <a
            href="#estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-extrabold text-wedding-text hover:text-wedding-kumkum py-1"
          >
            🧮 Interactive Cost Estimator
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-extrabold text-wedding-text hover:text-wedding-kumkum py-1"
          >
            🌟 Why Sri Ram Events
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-extrabold text-wedding-text hover:text-wedding-kumkum py-1"
          >
            📞 Contact & Location
          </a>

          <div className="pt-4 border-t border-wedding-border flex flex-col gap-3">
            <a
              href="tel:+919502559333"
              className="w-full py-3 rounded-xl bg-wedding-ivory border border-wedding-border text-wedding-text font-extrabold text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-wedding-ruby" />
              <span>Call +91 95025 59333</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-wedding-kumkum to-wedding-ruby text-white font-extrabold text-center shadow-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Get Personalized Quote</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
