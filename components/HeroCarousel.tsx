'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram, ExternalLink, Play, Pause } from 'lucide-react';

export interface InstagramPostItem {
  id: string;
  type: 'reel' | 'post';
  title: string;
  teluguTag: string;
  url: string;
  embedUrl: string;
}

export const INSTAGRAM_POSTS: InstagramPostItem[] = [
  {
    id: 'Dc736XiTT3U',
    type: 'reel',
    title: 'Grand Telugu Pelli Mandapam Decor',
    teluguTag: 'ప్రతి వేడుక ఒక మధుర జ్ఞాపకం',
    url: 'https://www.instagram.com/reel/Dc736XiTT3U/',
    embedUrl: 'https://www.instagram.com/reel/Dc736XiTT3U/embed',
  },
  {
    id: 'Dc5QlqXB3f2',
    type: 'reel',
    title: 'Vibrant Haldi & Mehendi Celebration',
    teluguTag: 'సంతోషాన్ని అందంగా జరుపుకుందాం',
    url: 'https://www.instagram.com/reel/Dc5QlqXB3f2/',
    embedUrl: 'https://www.instagram.com/reel/Dc5QlqXB3f2/embed',
  },
  {
    id: 'Dcpq4BRBt5n',
    type: 'reel',
    title: 'Traditional Floral Mandapam & Samai Lights',
    teluguTag: 'మన సంస్కృతి... మన వేడుకల్లో',
    url: 'https://www.instagram.com/reel/Dcpq4BRBt5n/',
    embedUrl: 'https://www.instagram.com/reel/Dcpq4BRBt5n/embed',
  },
  {
    id: 'DcgaVciBehv',
    type: 'reel',
    title: 'Royal Reception Stage & Crystal Lighting',
    teluguTag: 'మీ కలల వేడుకకు మా సృజనాత్మకత తోడు',
    url: 'https://www.instagram.com/reel/DcgaVciBehv/',
    embedUrl: 'https://www.instagram.com/reel/DcgaVciBehv/embed',
  },
  {
    id: 'DcdwYg2AKQj',
    type: 'reel',
    title: 'Gruhapravesam Maamidi Toranalu Entryway',
    teluguTag: 'నమ్మకమైన సేవల బాధ్యత',
    url: 'https://www.instagram.com/reel/DcdwYg2AKQj/',
    embedUrl: 'https://www.instagram.com/reel/DcdwYg2AKQj/embed',
  },
  {
    id: 'DcGyNP1BCo4',
    type: 'reel',
    title: 'Joyous Themed Birthday Party Setup',
    teluguTag: 'సృజనాత్మకత నిండిన అలంకరణ',
    url: 'https://www.instagram.com/reel/DcGyNP1BCo4/',
    embedUrl: 'https://www.instagram.com/reel/DcGyNP1BCo4/embed',
  },
  {
    id: 'DbNKtr-gcM7',
    type: 'post',
    title: 'Sri Ram Events Decor Portfolio Showcase',
    teluguTag: 'మీ వేడుక... మా బాధ్యత',
    url: 'https://www.instagram.com/p/DbNKtr-gcM7/',
    embedUrl: 'https://www.instagram.com/p/DbNKtr-gcM7/embed',
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-movement interval (3.5 seconds)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % INSTAGRAM_POSTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % INSTAGRAM_POSTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + INSTAGRAM_POSTS.length) % INSTAGRAM_POSTS.length);
  };

  const currentItem = INSTAGRAM_POSTS[currentIndex];

  return (
    <div
      className="relative w-full max-w-lg mx-auto lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-2 border-wedding-turmeric/60 bg-white p-2"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Header Banner Badge */}
      <div className="flex items-center justify-between px-3 py-2 bg-wedding-ivory rounded-t-2xl border-b border-wedding-border">
        <div className="flex items-center gap-2 text-xs font-black text-wedding-kumkum">
          <Instagram className="w-4 h-4 text-pink-600 shrink-0" />
          <span>SR Events Instagram Media (@sriram.events_)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded-lg bg-white border border-wedding-border text-wedding-muted hover:text-wedding-kumkum transition-colors text-xs"
            title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <a
            href="https://www.instagram.com/sriram.events_/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-bold text-wedding-ruby hover:underline"
          >
            <span>Follow</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Carousel Main Container */}
      <div className="relative aspect-[4/5] sm:aspect-[4/3] w-full overflow-hidden bg-black rounded-b-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex flex-col items-center justify-center relative"
          >
            {/* Embedded Instagram Reel / Post Iframe */}
            <iframe
              src={currentItem.embedUrl}
              className="w-full h-full border-0 rounded-b-2xl bg-white"
              title={currentItem.title}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              loading="lazy"
            ></iframe>

            {/* Slide Title & Telugu Accent Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none text-white space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-wedding-marigold text-black">
                  {currentItem.type === 'reel' ? '🎥 Video Reel' : '📸 Event Photo'}
                </span>
                <span className="text-[11px] font-bold text-amber-300">
                  {currentIndex + 1} / {INSTAGRAM_POSTS.length}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-extrabold drop-shadow">
                {currentItem.title}
              </h4>
              <p className="text-[11px] font-semibold text-white/80">
                {currentItem.teluguTag}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrow Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md shadow-lg border border-white/20 transition-all hover:scale-110 active:scale-95 z-30"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md shadow-lg border border-white/20 transition-all hover:scale-110 active:scale-95 z-30"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Carousel Dot Indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30">
          {INSTAGRAM_POSTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx ? 'w-6 bg-wedding-marigold' : 'w-2 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
