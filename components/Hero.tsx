'use client';

import React from 'react';
import { ArrowRight, Calendar, Sparkles, Star, Award, HeartHandshake, ShieldCheck } from 'lucide-react';
import HeroCarousel from './HeroCarousel';

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FFFDF7] via-[#FFF9EE] to-[#FAF4E8] pt-32 pb-20"
    >
      {/* Background Decorative Ambient Circles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-wedding-marigold/10 blur-3xl" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-wedding-kumkum/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & Call to Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Telugu Culture Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-wedding-kumkum/10 border border-wedding-kumkum/30 text-wedding-kumkum text-xs sm:text-sm font-extrabold shadow-sm">
              <Sparkles className="w-4 h-4 text-wedding-ruby animate-pulse" />
              <span>మీ వేడుక... మా బాధ్యత • Your Celebration... Our Responsibility</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-wedding-text leading-[1.15]">
              Your Special <span className="kumkum-text">Moments.</span> <br />
              Our Passionate <span className="gold-text">Celebration.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg font-medium leading-relaxed text-wedding-muted max-w-2xl mx-auto lg:mx-0">
              Sri Ram Events crafts grand weddings, joyous birthdays, traditional house warmings, and bespoke private gatherings with authentic Telugu cultural warmth, stunning floral mandapams, and end-to-end event execution.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-wedding-kumkum via-wedding-ruby to-wedding-marigold text-white font-black text-base shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Calendar className="w-5 h-5" />
                <span>Plan My Event</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#estimator"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white border border-wedding-border text-wedding-text font-extrabold text-base shadow-sm hover:border-wedding-kumkum hover:text-wedding-kumkum hover:bg-wedding-cream transition-all flex items-center justify-center gap-2"
              >
                <span>Estimate Event Cost</span>
              </a>
            </div>

            {/* Quick Guarantees Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-bold text-wedding-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-wedding-leaf" />
                <span>100% Customized Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-wedding-ruby" />
                <span>Dedicated Event Host</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-wedding-marigold fill-wedding-marigold" />
                <span>4.9 / 5 Customer Rating</span>
              </div>
            </div>

          </div>

          {/* Right Column: Auto-Moving Instagram Showcase Carousel */}
          <div className="lg:col-span-5 relative">
            <HeroCarousel />
          </div>

        </div>

        {/* Bottom Trust Statistics Grid */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="wedding-card rounded-2xl p-5 text-center">
            <Sparkles className="w-6 h-6 text-wedding-ruby mx-auto mb-2" />
            <h3 className="text-2xl sm:text-3xl font-black text-wedding-text">500+</h3>
            <p className="text-xs font-bold text-wedding-muted mt-1">Events Celebrated</p>
          </div>

          <div className="wedding-card rounded-2xl p-5 text-center">
            <Award className="w-6 h-6 text-wedding-marigold mx-auto mb-2" />
            <h3 className="text-2xl sm:text-3xl font-black text-wedding-text">100%</h3>
            <p className="text-xs font-bold text-wedding-muted mt-1">Authentic Decor</p>
          </div>

          <div className="wedding-card rounded-2xl p-5 text-center">
            <HeartHandshake className="w-6 h-6 text-wedding-ruby mx-auto mb-2" />
            <h3 className="text-2xl sm:text-3xl font-black text-wedding-text">End-to-End</h3>
            <p className="text-xs font-bold text-wedding-muted mt-1">Planning Support</p>
          </div>

          <div className="wedding-card rounded-2xl p-5 text-center">
            <Star className="w-6 h-6 text-wedding-turmeric fill-wedding-turmeric mx-auto mb-2" />
            <h3 className="text-2xl sm:text-3xl font-black text-wedding-text">4.9 / 5.0</h3>
            <p className="text-xs font-bold text-wedding-muted mt-1">Trusted Reviews</p>
          </div>
        </div>

      </div>
    </section>
  );
}

