'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles, Users, Utensils, Camera, Music, Check, ArrowRight, ShieldAlert, Award } from 'lucide-react';

interface CostEstimatorProps {
  preselectedService?: string;
  onOpenBookingWithEstimate: (service: string, guests: number, estimate: number) => void;
}

export default function CostEstimator({
  preselectedService = 'Grand Weddings',
  onOpenBookingWithEstimate,
}: CostEstimatorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(preselectedService);
  const [guestCount, setGuestCount] = useState<number>(200);
  const [decorTier, setDecorTier] = useState<'standard' | 'deluxe' | 'royal'>('deluxe');
  const [includeCatering, setIncludeCatering] = useState<boolean>(false);
  const [includePhotography, setIncludePhotography] = useState<boolean>(true);
  const [includeEntertainment, setIncludeEntertainment] = useState<boolean>(false);

  // Realistic Town Market Base Rates (Madanapalle, Tirupati, Punganur, Kothakota)
  const eventOptions = [
    { id: 'Weddings', name: 'Grand Weddings', base: 32000, perGuest: 180, tag: '₹60K - ₹1.2L typical' },
    { id: 'Birthdays', name: 'Joyous Birthdays', base: 12000, perGuest: 80, tag: '₹18K - ₹45K typical' },
    { id: 'Private Events', name: 'Private Celebrations', base: 15000, perGuest: 100, tag: '₹22K - ₹55K typical' },
    { id: 'House Warming', name: 'House Warming (Gruhapravesam)', base: 18000, perGuest: 110, tag: '₹30K - ₹75K typical' },
    { id: 'Catering', name: 'Authentic Catering', base: 8000, perGuest: 170, tag: '₹160/plate feast' },
    { id: 'School Events', name: 'School & College Fests', base: 22000, perGuest: 80, tag: '₹45K - ₹95K typical' },
    { id: 'Theme Parties', name: 'Creative Theme Parties', base: 18000, perGuest: 110, tag: '₹32K - ₹72K typical' },
  ];

  const calculatedValue = useMemo(() => {
    const matched = eventOptions.find((e) => e.name === selectedCategory || e.id === selectedCategory) || eventOptions[0];
    let total = matched.base + guestCount * matched.perGuest;

    if (decorTier === 'deluxe') total *= 1.2;
    if (decorTier === 'royal') total *= 1.4;

    if (includeCatering) total += guestCount * 140;
    if (includePhotography) total += 12000;
    if (includeEntertainment) total += 8000;

    return Math.round(total);
  }, [selectedCategory, guestCount, decorTier, includeCatering, includePhotography, includeEntertainment]);

  return (
    <section id="estimator" className="py-24 bg-gradient-to-b from-[#FFFDF7] via-[#FAF4E8] to-[#FFFDF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wedding-marigold/15 text-wedding-amber text-xs font-extrabold border border-wedding-marigold/30">
            <Calculator className="w-4 h-4 text-wedding-amber" />
            <span>Town-Friendly Realistic Event Budget Estimator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-wedding-text tracking-tight">
            Visualize Your <span className="kumkum-text">Celebration Budget</span>
          </h2>

          <p className="text-base text-wedding-muted font-medium">
            Realistic, common-man friendly pricing tailored for Madanapalle, Tirupati, Punganur & surrounding towns. Every package is customized to your exact needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Estimator Controls */}
          <div className="lg:col-span-7 wedding-card rounded-3xl p-6 sm:p-8 space-y-7 border border-wedding-border shadow-lg">
            
            {/* Step 1: Select Event Category */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-wedding-kumkum flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-wedding-ruby" />
                <span>1. Select Event Category</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {eventOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedCategory(opt.name)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold text-left transition-all ${
                      selectedCategory === opt.name
                        ? 'bg-wedding-kumkum text-white shadow-md border-wedding-kumkum'
                        : 'bg-wedding-ivory border border-wedding-border text-wedding-text hover:border-wedding-kumkum'
                    }`}
                  >
                    <div>{opt.name}</div>
                    <div className={`text-[10px] ${selectedCategory === opt.name ? 'text-amber-200' : 'text-wedding-muted'}`}>
                      {opt.tag}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Guest Count Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-wider text-wedding-kumkum flex items-center gap-2">
                  <Users className="w-4 h-4 text-wedding-marigold" />
                  <span>2. Expected Guest Count</span>
                </label>
                <span className="text-base font-black text-wedding-kumkum px-3 py-1 bg-wedding-kumkum/10 rounded-lg">
                  {guestCount} Guests
                </span>
              </div>

              <input
                type="range"
                min="50"
                max="800"
                step="25"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2.5 bg-wedding-border rounded-lg appearance-none cursor-pointer accent-wedding-kumkum"
              />
              <div className="flex justify-between text-[11px] font-bold text-wedding-muted">
                <span>50 Intimate</span>
                <span>200 Typical</span>
                <span>500 Grand</span>
                <span>800 Large</span>
              </div>
            </div>

            {/* Step 3: Decoration Tier */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-wedding-kumkum flex items-center gap-2">
                <Award className="w-4 h-4 text-wedding-turmeric" />
                <span>3. Decor Complexity</span>
              </label>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'standard', name: 'Classic Festive', sub: 'Essential Floral & Backdrop' },
                  { id: 'deluxe', name: 'Deluxe Heritage', sub: 'Floral Mandapam & Stage' },
                  { id: 'royal', name: 'Grand Royal', sub: 'Bespoke Lighting & Decor' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setDecorTier(tier.id as 'standard' | 'deluxe' | 'royal')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      decorTier === tier.id
                        ? 'bg-wedding-ivory border-wedding-kumkum ring-2 ring-wedding-kumkum/20 shadow-sm'
                        : 'bg-white border-wedding-border hover:border-wedding-kumkum/40'
                    }`}
                  >
                    <div className="text-xs font-black text-wedding-text">{tier.name}</div>
                    <div className="text-[10px] font-semibold text-wedding-muted">{tier.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Additional Service Add-ons */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-wedding-kumkum">
                4. Optional Add-on Services
              </label>

              <div className="grid sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setIncludeCatering(!includeCatering)}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all ${
                    includeCatering
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                      : 'bg-white border-wedding-border text-wedding-muted'
                  }`}
                >
                  <Utensils className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Banana Leaf Feast (+₹140/head)</span>
                  {includeCatering && <Check className="w-3.5 h-3.5 ml-auto text-emerald-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => setIncludePhotography(!includePhotography)}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all ${
                    includePhotography
                      ? 'bg-amber-50 border-amber-500 text-amber-900'
                      : 'bg-white border-wedding-border text-wedding-muted'
                  }`}
                >
                  <Camera className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Photo & Video (+₹12K)</span>
                  {includePhotography && <Check className="w-3.5 h-3.5 ml-auto text-amber-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => setIncludeEntertainment(!includeEntertainment)}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all ${
                    includeEntertainment
                      ? 'bg-purple-50 border-purple-500 text-purple-900'
                      : 'bg-white border-wedding-border text-wedding-muted'
                  }`}
                >
                  <Music className="w-4 h-4 shrink-0 text-purple-600" />
                  <span>Sound & DJ (+₹8K)</span>
                  {includeEntertainment && <Check className="w-3.5 h-3.5 ml-auto text-purple-600" />}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Display Struck-Out Estimate & Quote CTA */}
          <div className="lg:col-span-5 wedding-card rounded-3xl p-6 sm:p-8 space-y-6 border border-wedding-turmeric/60 shadow-xl bg-gradient-to-b from-[#FFFDF7] to-[#FAF4E8]">
            
            <div className="flex items-center justify-between border-b border-wedding-border pb-4">
              <span className="text-xs font-black uppercase tracking-wider text-wedding-kumkum">
                Indicative Budget Benchmark
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-extrabold border border-emerald-300">
                Ground Reality Town Rates
              </span>
            </div>

            {/* Price Strikethrough Display Box */}
            <div className="text-center py-6 px-4 bg-white rounded-2xl border border-wedding-border shadow-inner space-y-3 relative overflow-hidden">
              <div className="text-xs font-bold text-wedding-muted">
                Estimated Celebration Value
              </div>

              {/* Struck-Out Price */}
              <div className="py-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight strikethrough-price">
                  ₹ {calculatedValue.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Price Disclaimer Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-50 text-wedding-kumkum text-xs font-bold border border-red-200">
                <ShieldAlert className="w-3.5 h-3.5 text-wedding-ruby shrink-0" />
                <span>Indicative only — Final quote customized to your budget</span>
              </div>
            </div>

            {/* Custom Quote Message */}
            <div className="space-y-2 text-center sm:text-left bg-wedding-ivory/80 p-4 rounded-xl border border-wedding-border">
              <h4 className="text-sm font-extrabold text-wedding-text">
                Affordable & Value-For-Money Event Packages
              </h4>
              <p className="text-xs font-medium text-wedding-muted leading-relaxed">
                Sri Ram Events operates with complete transparency. We adjust floral decor, lighting, and stage arrangements to match your exact budget—whether ₹30,000 or ₹1,20,000.
              </p>
            </div>

            {/* Direct CTA Button */}
            <button
              onClick={() => onOpenBookingWithEstimate(selectedCategory, guestCount, calculatedValue)}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-wedding-kumkum via-wedding-ruby to-wedding-marigold text-white font-black text-sm shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Get My Personalized Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-[11px] text-center font-bold text-wedding-muted">
              🔒 Call +91 95025 59333 for direct budget discussion with owner
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
