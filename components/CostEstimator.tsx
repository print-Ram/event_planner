'use client';

import React, { useState } from 'react';
import { Calculator, CheckCircle2, ArrowRight } from 'lucide-react';
import SingleLineRangoli from './SingleLineRangoli';

interface CostEstimatorProps {
  preselectedService?: string;
  onOpenBookingWithEstimate: (service: string, guests: number, total: number) => void;
}

export default function CostEstimator({ preselectedService, onOpenBookingWithEstimate }: CostEstimatorProps) {
  const [guests, setGuests] = useState<number>(200);
  const [selectedService, setSelectedService] = useState<string>(preselectedService || 'Weddings');
  const [themeStyle, setThemeStyle] = useState<string>('single-line-rangoli');
  const [addons, setAddons] = useState<{ [key: string]: boolean }>({
    singleLineRangoli: true,
    nadaswaram: true,
    etikoppakaGifts: false,
    bananaLeafFeast: true,
  });

  const servicesList = [
    'Weddings',
    'Wedding and engagement',
    'Event decor design',
    'Decorations',
    'Catering',
    'Birthday party planning',
    'Childrens party planning',
    'Baby shower planning',
    'Anniversary party planning',
    'Corporate and conference',
    'School event',
    'Theme parties',
    'Party planning',
    'Private event planning',
  ];

  const basePrices: { [key: string]: number } = {
    'Weddings': 85000,
    'Wedding and engagement': 65000,
    'Event decor design': 45000,
    'Decorations': 35000,
    'Catering': 50000,
    'Birthday party planning': 25000,
    'Childrens party planning': 20000,
    'Baby shower planning': 22000,
    'Anniversary party planning': 30000,
    'Corporate and conference': 75000,
    'School event': 40000,
    'Theme parties': 35000,
    'Party planning': 25000,
    'Private event planning': 60000,
  };

  const perGuestRate = 250;

  const themeMultipliers: { [key: string]: number } = {
    'single-line-rangoli': 1.15,
    'kondapalli-royal': 1.25,
    'lotus-mandapam': 1.20,
    'village-traditional': 1.0,
  };

  const addonPrices: { [key: string]: number } = {
    singleLineRangoli: 15000,
    nadaswaram: 18000,
    etikoppakaGifts: 12000,
    bananaLeafFeast: 25000,
  };

  const calculateTotal = () => {
    const base = basePrices[selectedService] || 35000;
    const guestCost = guests * perGuestRate;
    const multiplier = themeMultipliers[themeStyle] || 1.0;
    let addonsTotal = 0;
    Object.keys(addons).forEach((k) => {
      if (addons[k]) addonsTotal += addonPrices[k];
    });

    return Math.round((base + guestCost) * multiplier + addonsTotal);
  };

  const totalCost = calculateTotal();

  const toggleAddon = (key: string) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="estimator" className="py-24 relative overflow-hidden bg-wedding-ivory border-t border-wedding-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wedding-marigold/15 border border-wedding-marigold/40 text-wedding-kumkum text-xs font-bold mb-4">
            <Calculator className="w-4 h-4" />
            <span>Instant Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-wedding-text">
            Event Package <span className="kumkum-text">Cost Estimator</span>
          </h2>
          <p className="mt-4 text-wedding-muted text-sm sm:text-base font-medium">
            Customize guest count, village theme style, and add-on services to generate a real-time price estimate for Sri Ram Events.
          </p>
          <SingleLineRangoli variant="divider" color="#B80D22" className="my-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form */}
          <div className="lg:col-span-7 wedding-panel p-6 sm:p-8 rounded-3xl border border-wedding-border space-y-6">
            
            <div>
              <label className="block text-xs font-extrabold text-wedding-text uppercase tracking-wider mb-2">
                1. Select Event Service (14 Options)
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full py-3 px-4 rounded-xl bg-white border border-wedding-border text-wedding-text font-bold text-sm focus:border-wedding-kumkum focus:outline-none"
              >
                {servicesList.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-extrabold text-wedding-text uppercase tracking-wider">
                  2. Expected Guest Count
                </label>
                <span className="text-sm font-black text-wedding-kumkum px-3 py-1 rounded-lg bg-wedding-cream border border-wedding-border">
                  {guests} Guests
                </span>
              </div>
              <input
                type="range"
                min={25}
                max={2500}
                step={25}
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full accent-wedding-kumkum h-2 rounded-lg bg-gray-200 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-wedding-text uppercase tracking-wider mb-3">
                3. Choose Event Theme Style
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'single-line-rangoli', name: 'Hand-Drawn Line Rangoli', desc: 'Single-line floor motifs', badge: '+15%' },
                  { id: 'kondapalli-royal', name: 'Royal Kondapalli Koluvu', desc: '5-tier doll exhibits', badge: '+25%' },
                  { id: 'lotus-mandapam', name: 'Ethereal Lotus Mandapam', desc: 'Fresh floral lotus stages', badge: '+20%' },
                  { id: 'village-traditional', name: 'Village Traditional Andhra', desc: 'Marigold & Banana Leaf decor', badge: 'Base' },
                ].map((th) => (
                  <div
                    key={th.id}
                    onClick={() => setThemeStyle(th.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      themeStyle === th.id
                        ? 'bg-wedding-cream border-wedding-kumkum shadow-sm'
                        : 'bg-white border-wedding-border hover:border-wedding-kumkum'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-wedding-text">{th.name}</span>
                      <span className="text-[10px] font-mono text-wedding-kumkum font-bold">{th.badge}</span>
                    </div>
                    <p className="text-[11px] text-wedding-muted mt-1 font-medium">{th.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-wedding-text uppercase tracking-wider mb-3">
                4. Traditional Add-On Services
              </label>
              <div className="space-y-2.5">
                {[
                  { key: 'singleLineRangoli', title: 'Hand-Drawn Line Rangoli Entrance Art', price: '₹15,000' },
                  { key: 'nadaswaram', title: 'Live Nadaswaram & Talam Troupe', price: '₹18,000' },
                  { key: 'etikoppakaGifts', title: 'Etikoppaka Toy Return Gift Hampers', price: '₹12,000' },
                  { key: 'bananaLeafFeast', title: 'Traditional Banana Leaf Catering Setup', price: '₹25,000' },
                ].map((item) => (
                  <div
                    key={item.key}
                    onClick={() => toggleAddon(item.key)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      addons[item.key]
                        ? 'bg-wedding-cream border-wedding-kumkum text-wedding-text'
                        : 'bg-white border-wedding-border text-wedding-muted hover:border-wedding-kumkum'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        addons[item.key] ? 'bg-wedding-kumkum border-wedding-kumkum text-white' : 'border-gray-400'
                      }`}>
                        {addons[item.key] && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs font-bold text-wedding-text">{item.title}</span>
                    </div>
                    <span className="text-xs font-extrabold text-wedding-kumkum">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Pricing Summary */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-wedding-border shadow-xl relative sticky top-28 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-wedding-border">
              <h3 className="text-lg font-black text-wedding-text">Estimated Investment</h3>
              <span className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-wedding-marigold/20 text-wedding-kumkum">
                Sri Ram Quote
              </span>
            </div>

            <div className="text-center py-5 bg-wedding-cream rounded-2xl border border-wedding-border">
              <span className="text-xs text-wedding-muted font-bold uppercase tracking-wider">Estimated Total (INR)</span>
              <div className="text-4xl sm:text-5xl font-black kumkum-text mt-1">
                ₹{totalCost.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-wedding-muted font-medium mt-2">Includes setup, venue styling, and taxes</p>
            </div>

            <div className="space-y-2 text-xs text-wedding-muted font-medium border-t border-b border-wedding-border py-4">
              <div className="flex justify-between">
                <span>Selected Service:</span>
                <span className="font-bold text-wedding-text">{selectedService}</span>
              </div>
              <div className="flex justify-between">
                <span>Guest Allocation ({guests}):</span>
                <span className="font-bold text-wedding-text">₹{(guests * perGuestRate).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => onOpenBookingWithEstimate(selectedService, guests, totalCost)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-wedding-kumkum via-wedding-marigold to-wedding-turmeric text-white font-black text-sm shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>Lock In This Package Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-wedding-muted font-medium">
              🔒 No payment required now. Our event director will call to verify venue details.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
