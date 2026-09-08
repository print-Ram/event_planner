'use client';

import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, Clock, CheckCircle, Award } from 'lucide-react';

export default function Testimonials() {
  const trustPillars = [
    {
      icon: HeartHandshake,
      title: 'Authentic Telugu Tradition',
      telugu: 'మన సంస్కృతి... మన వేడుకల్లో',
      description: 'Deep understanding of Andhra & Telangana rituals, festive aesthetics, pelli mandapam decor, and traditional hospitality.',
    },
    {
      icon: ShieldCheck,
      title: '100% Transparent Planning',
      telugu: 'నమ్మకమైన సేవల బాధ్యత',
      description: 'No hidden charges or last-minute surprises. Every vendor, item, and floral detail is itemized in your customized quote.',
    },
    {
      icon: Sparkles,
      title: 'Tailored Event Design',
      telugu: 'సృజనాత్మకత నిండిన అలంకరణ',
      description: 'We never copy generic templates. Every mandapam, theme party, or birthday backdrop is custom-designed around your story.',
    },
    {
      icon: Clock,
      title: 'Flawless On-Time Execution',
      telugu: 'సమయ పాలన... పరిపూర్ణత',
      description: 'Punctual setup completion hours before guests arrive, leaving you relaxed to enjoy your celebration.',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-[#FFFDF7] relative border-t border-wedding-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wedding-kumkum/10 text-wedding-kumkum text-xs font-extrabold border border-wedding-kumkum/20">
            <Award className="w-4 h-4 text-wedding-ruby" />
            <span>Why Choose Sri Ram Events</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-wedding-text tracking-tight">
            Crafting Celebrations With <span className="kumkum-text">Integrity & Warmth</span>
          </h2>

          <p className="text-base text-wedding-muted font-medium">
            Your celebration deserves care, respect, and meticulous execution. Here is how we guarantee an unforgettable event experience.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {trustPillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={idx}
                className="wedding-card rounded-3xl p-8 border border-wedding-border hover:border-wedding-turmeric transition-all duration-300 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-wedding-kumkum/10 border border-wedding-kumkum/20 flex items-center justify-center text-wedding-kumkum shrink-0">
                    <IconComp className="w-6 h-6 text-wedding-ruby" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-wedding-kumkum">{pillar.telugu}</span>
                    <h3 className="text-xl font-black text-wedding-text">{pillar.title}</h3>
                  </div>
                </div>

                <p className="text-sm font-medium text-wedding-muted leading-relaxed pl-16">
                  {pillar.description}
                </p>

                <div className="pt-2 pl-16 flex items-center gap-2 text-xs font-extrabold text-wedding-leaf">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Sri Ram Quality Commitment Guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
