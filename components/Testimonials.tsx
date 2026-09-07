'use client';

import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import SingleLineRangoli from './SingleLineRangoli';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Rajasekhar & Harini',
      role: 'Wedding & Nishchitartham',
      location: 'Tirupati',
      rating: 5,
      text: 'Sri Ram Events organized our Telugu wedding mandapam with stunning hand-drawn single-line Rangolis and authentic Kondapalli doll Koluvu. The guests loved the traditional banana leaf feast!',
    },
    {
      name: 'Dr. Anjaneyulu Naidu',
      role: 'Corporate Summit & Gala',
      location: 'Vijayawada',
      rating: 5,
      text: 'For our regional conference, Sri Ram Events delivered high-res stage setups, acoustic sound, and traditional Andhra village reception decor. Highly professional team.',
    },
    {
      name: 'Lakshmi Prasanna',
      role: 'Baby Shower (Sreemantham)',
      location: 'Madanapalle',
      rating: 5,
      text: 'The floral swing and decorated Uyyala for my daughter Sreemantham was beyond beautiful. They included authentic Kondapalli return gifts that everyone cherished!',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-wedding-bg border-t border-wedding-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wedding-marigold/15 border border-wedding-marigold/40 text-wedding-kumkum text-xs font-bold mb-4">
            <Sparkles className="w-4 h-4 text-wedding-kumkum" />
            <span>Client Praise & Google Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-wedding-text">
            Loved by Families & <span className="kumkum-text">Corporates</span>
          </h2>
          <SingleLineRangoli variant="divider" color="#B80D22" className="my-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} className="wedding-card p-6 sm:p-8 rounded-3xl border border-wedding-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-wedding-marigold mb-4">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-wedding-marigold text-wedding-marigold" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-wedding-muted leading-relaxed italic font-medium">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-wedding-border flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-wedding-text">{rev.name}</h4>
                  <p className="text-[11px] text-wedding-kumkum font-bold">{rev.role} • {rev.location}</p>
                </div>
                <Quote className="w-8 h-8 text-wedding-marigold/30" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
