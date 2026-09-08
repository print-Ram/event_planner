'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HouseWarmingIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#FFFDF7] via-[#FFFBEB] to-[#FEF3C7] p-2 ${className}`}>
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full h-full flex items-center justify-center relative z-10"
      >
        <img
          src="/events/house_warming.jpg"
          alt="House Warming Illustration"
          className="w-full h-full object-contain drop-shadow-lg rounded-xl"
        />
      </motion.div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-amber-400 shadow-sm flex items-center gap-1.5 text-xs font-bold text-amber-900 z-20">
        <span>🏡 Traditional Gruhapravesam</span>
      </div>
    </div>
  );
}
