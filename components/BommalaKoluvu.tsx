'use client';

import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, ChevronRight, Star } from 'lucide-react';
import SingleLineRangoli from './SingleLineRangoli';

interface DollItem {
  id: string;
  name: string;
  teluguName: string;
  origin: string;
  description: string;
  badge: string;
  icon: string;
}

export default function BommalaKoluvu() {
  const [activeTier, setActiveTier] = useState<number>(5);
  const [selectedDoll, setSelectedDoll] = useState<DollItem | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const dolls: DollItem[] = [
    {
      id: 'aata-bomma',
      name: 'Kondapalli Dancing Doll',
      teluguName: 'కొండపల్లి ఆట బొమ్మ',
      origin: 'Kondapalli, NTR District',
      description: 'Handcrafted from light softwood (Tella Poniki) with dynamic head and waist bobble balance physics. Symbolizes grace and joyful Andhra festivities.',
      badge: 'GI Tagged Art',
      icon: '💃',
    },
    {
      id: 'raja-rani',
      name: 'Royal Kondapalli Raja Rani',
      teluguName: 'రాజా రాణి జంట',
      origin: 'Kondapalli Heritage',
      description: 'Regal wooden king and queen pair painted in vibrant vegetable colors, representing royal patronages of Vijayanagara empire dynasties.',
      badge: 'Royal Heritage',
      icon: '👑',
    },
    {
      id: 'etikoppaka-bullock',
      name: 'Etikoppaka Lacquer Bullock Cart',
      teluguName: 'ఏటికొప్పాక ఎడ్ల బండి',
      origin: 'Etikoppaka, Anakapalli',
      description: 'Eco-friendly turned wood craftsmanship coated with natural lacquer derived from trees. Represents agricultural prosperity during Sankranti.',
      badge: 'Eco Natural Lacquer',
      icon: '🐂',
    },
    {
      id: 'tholu-bommalata',
      name: 'Tholu Bommalata Leather Puppet',
      teluguName: 'తోలుబొమ్మలాట పప్పెట్',
      origin: 'Anantapur Tradition',
      description: 'Translucent goat leather shadow puppets hand-painted with intricate mythological characters from Ramayana & Mahabharata.',
      badge: 'Shadow Puppetry',
      icon: '🎭',
    },
    {
      id: 'ambari-elephant',
      name: 'Kondapalli Ambari Elephant',
      teluguName: 'అంబారీ ఏనుగు',
      origin: 'Temple Procession Art',
      description: 'Majestic royal elephant carrying golden Howdah (Ambari) with ornate temple umbrellas, used in grand wedding Mandapam entrances.',
      badge: 'Procession Decor',
      icon: '🐘',
    },
    {
      id: 'harvest-pair',
      name: 'Sankranti Farmer & Milkmaid',
      teluguName: 'రైతు - పాలకారి జంట',
      origin: 'Rural Andhra Folk',
      description: 'Authentic depiction of rural Andhra village life during the harvest festival (Pongal / Sankranti) celebrating nature abundance.',
      badge: 'Festive Special',
      icon: '🌾',
    },
  ];

  return (
    <section id="bommala-koluvu" className="py-24 relative overflow-hidden bg-wedding-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wedding-marigold/15 border border-wedding-marigold/40 text-wedding-kumkum text-xs font-bold mb-4">
              <Sparkles className="w-4 h-4 text-wedding-marigold" />
              <span>Authentic Andhra Heritage</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-wedding-text">
              Bommala Koluvu <span className="kumkum-text">Cultural Showcase</span>
            </h2>
            <p className="mt-3 text-wedding-muted text-sm sm:text-base max-w-2xl font-medium">
              Immerse in authentic Kondapalli softwood, Etikoppaka lacquerware, and Tholu Bommalata shadow puppet exhibits with marigold drapes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                isPlayingAudio
                  ? 'bg-wedding-kumkum text-white border-wedding-kumkum shadow-md'
                  : 'bg-white text-wedding-text border-wedding-border hover:bg-wedding-cream'
              }`}
            >
              {isPlayingAudio ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
              <span>{isPlayingAudio ? 'Nadaswaram Audio ON' : 'Play Festive Audio'}</span>
            </button>

            <div className="flex items-center bg-white p-1 rounded-xl border border-wedding-border">
              {[3, 5, 7].map((steps) => (
                <button
                  key={steps}
                  onClick={() => setActiveTier(steps)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTier === steps
                      ? 'bg-wedding-kumkum text-white shadow-sm'
                      : 'text-wedding-muted hover:text-wedding-text'
                  }`}
                >
                  {steps}-Step Koluvu
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Multi-Tier Koluvu Step Illustration */}
        <div className="mb-16 p-6 sm:p-10 rounded-3xl bg-white border border-wedding-border shadow-lg relative overflow-hidden">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest text-wedding-kumkum font-bold">
              Village Festive Setup • {activeTier}-Tiered Grand Koluvu Steps
            </span>
          </div>

          <div className="space-y-3 max-w-4xl mx-auto">
            {Array.from({ length: activeTier }).map((_, idx) => {
              const widthPercentage = 100 - idx * (60 / activeTier);
              return (
                <div
                  key={idx}
                  style={{ width: `${widthPercentage}%` }}
                  className="mx-auto h-16 sm:h-20 rounded-2xl bg-wedding-cream border border-wedding-border flex items-center justify-around px-4 shadow-sm transition-all hover:border-wedding-kumkum"
                >
                  <span className="text-xs font-extrabold text-wedding-kumkum">Step {idx + 1}</span>
                  <div className="flex items-center gap-4 text-xl sm:text-2xl animate-float">
                    {idx === 0 && '👑 👰 🤵 👑'}
                    {idx === 1 && '💃 🕺 💃 🕺'}
                    {idx === 2 && '🐘 🐂 🐎 🐫'}
                    {idx === 3 && '🌾 🏺 🥥 🌺'}
                    {idx === 4 && '🎭 🪕 🥁 🪘'}
                    {idx >= 5 && '🌸 🌼 🪔 ✨'}
                  </div>
                  <span className="text-[10px] text-wedding-muted uppercase tracking-wider font-bold hidden sm:inline">
                    {idx === 0 ? 'Deities & Royalty' : idx === 1 ? 'Kondapalli Dancers' : 'Animals & Transport'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dolls.map((doll) => (
            <div
              key={doll.id}
              onClick={() => setSelectedDoll(doll)}
              className="group wedding-card p-6 rounded-3xl cursor-pointer border border-wedding-border hover:border-wedding-kumkum transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl p-3 rounded-2xl bg-wedding-cream border border-wedding-border group-hover:scale-110 transition-transform duration-300">
                    {doll.icon}
                  </span>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-wedding-marigold/20 text-wedding-kumkum border border-wedding-marigold/40">
                    {doll.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-wedding-text group-hover:text-wedding-kumkum transition-colors">
                  {doll.name}
                </h3>
                <p className="text-xs font-bold text-wedding-marigold mt-0.5">{doll.teluguName}</p>
                <p className="text-xs text-wedding-muted mt-1 font-mono">📍 {doll.origin}</p>

                <p className="mt-4 text-xs text-wedding-muted leading-relaxed font-medium line-clamp-3">
                  {doll.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-wedding-border flex items-center justify-between text-xs font-bold text-wedding-kumkum">
                <span>View Details & Setup</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {selectedDoll && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white p-8 rounded-3xl border border-wedding-border max-w-lg w-full relative shadow-2xl">
              <button
                onClick={() => setSelectedDoll(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl font-bold"
              >
                ✕
              </button>

              <div className="text-5xl mb-4">{selectedDoll.icon}</div>
              <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-wedding-marigold/20 text-wedding-kumkum border border-wedding-marigold/40">
                {selectedDoll.badge}
              </span>

              <h3 className="text-2xl font-black text-wedding-text mt-3">{selectedDoll.name}</h3>
              <p className="text-sm font-bold text-wedding-kumkum">{selectedDoll.teluguName}</p>
              <p className="text-xs text-wedding-muted mt-1 font-mono">Origin: {selectedDoll.origin}</p>

              <p className="mt-4 text-sm text-wedding-text leading-relaxed font-medium">
                {selectedDoll.description}
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-wedding-cream border border-wedding-border text-xs space-y-2">
                <div className="flex items-center gap-2 text-wedding-kumkum font-bold">
                  <Star className="w-4 h-4" />
                  <span>Sri Ram Events Village Setup:</span>
                </div>
                <p className="text-wedding-muted font-medium">
                  We supply authentic handcrafted Kondapalli/Etikoppaka dolls with marigold flower garlands, illuminated brass lamps, and traditional village mandapam backdrops.
                </p>
              </div>

              <button
                onClick={() => setSelectedDoll(null)}
                className="mt-6 w-full py-3 rounded-xl bg-wedding-kumkum text-white font-bold text-sm shadow-md hover:bg-red-700 transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
