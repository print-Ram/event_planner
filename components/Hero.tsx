'use client';

import React from 'react';
import { ArrowRight, Calendar, Sparkles, Star, Award, Zap } from 'lucide-react';
import SingleLineRangoli from './SingleLineRangoli';

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#050505] pt-32 pb-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,179,0,0.08),transparent_52%)]" />
        <div className="absolute -left-20 top-24 opacity-[0.16] blur-[0.3px]">
          <SingleLineRangoli
            variant="chukkala"
            color="#FFB300"
            dotColor="#FFE082"
            className="h-[360px] w-[360px]"
          />
        </div>
        <div className="absolute -right-24 bottom-12 opacity-[0.13]">
          <SingleLineRangoli
            variant="chukkala"
            color="#FF8F00"
            dotColor="#FFD54F"
            className="h-[430px] w-[430px]"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-7 flex justify-center">
          <div className="rounded-3xl border border-white/10 bg-black/70 p-3 shadow-[0_0_50px_rgba(255,179,0,0.10)]">
            <img
              src="/sri-ram-logo.png"
              alt="Sri Ram Events"
              className="h-auto w-full max-w-[420px] rounded-2xl object-contain"
            />
          </div>
        </div>

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-bold text-amber-300 sm:text-sm">
          <Sparkles className="h-4 w-4" />
          <span>Authentic Telugu Village Festivities & Pelli Mandapams</span>
        </div>

        <SingleLineRangoli variant="divider" color="#FFB300" dotColor="#FFE082" className="my-2" />

        <h1 className="mx-auto max-w-5xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
          Grand <span className="text-amber-300">Telugu Tradition</span> with
          {' '}Neon-Powered <span className="text-orange-300">Festive Design</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-white/60 sm:text-xl">
          Featuring authentic <strong className="font-bold text-amber-300">Chukkala Melika Muggulu</strong>,
          traditional <strong className="font-bold text-orange-300">Kondapalli Bommala Koluvu</strong>,
          floral arches, banana-leaf feasts, and beautifully staged celebrations by{' '}
          <strong className="text-white">Sri Ram Events</strong>.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <button
            onClick={onOpenBooking}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-amber-400 px-8 py-4 text-base font-black text-black shadow-[0_0_30px_rgba(255,179,0,0.22)] transition hover:scale-105 sm:w-auto"
          >
            <Calendar className="h-5 w-5" />
            <span>Book Your Celebration</span>
            <ArrowRight className="h-5 h-5" />
          </button>

          <a
            href="#rangoli-studio"
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-bold text-white transition hover:bg-white/10 sm:w-auto"
          >
            <Zap className="h-5 w-5 text-amber-300" />
            <span>Explore Neon Rangoli</span>
          </a>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <Sparkles className="mx-auto mb-2 h-5 w-5 text-amber-300" />
            <h4 className="text-xl font-extrabold text-white">1,200+</h4>
            <p className="text-xs font-medium text-white/50">Events Delivered</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <Zap className="mx-auto mb-2 h-5 w-5 text-orange-300" />
            <h4 className="text-xl font-extrabold text-white">25-Dot Muggu</h4>
            <p className="text-xs font-medium text-white/50">Chukkala Melika</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <Award className="mx-auto mb-2 h-5 w-5 text-amber-300" />
            <h4 className="text-xl font-extrabold text-white">Kondapalli</h4>
            <p className="text-xs font-medium text-white/50">Authentic Koluvu</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <Star className="mx-auto mb-2 h-5 w-5 text-amber-300" />
            <h4 className="text-xl font-extrabold text-white">4.9 / 5.0</h4>
            <p className="text-xs font-medium text-white/50">Google Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
