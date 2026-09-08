'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ThemePartyIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#FFFDF7] via-[#FAF5FF] to-[#F3E8FF] p-2 ${className}`}>
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full h-full flex items-center justify-center relative z-10"
      >
        <img
          src="/events/theme_parties.jpg"
          alt="Theme Party Illustration"
          className="w-full h-full object-contain drop-shadow-lg rounded-xl"
        />
      </motion.div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-purple-300 shadow-sm flex items-center gap-1.5 text-xs font-bold text-purple-900 z-20">
        <span>✨ Creative Custom Theme Parties</span>
      </div>
    </div>
  );
}
