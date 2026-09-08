'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function WeddingIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#FFFDF7] via-[#FFF5F6] to-[#FCE8EB] p-2 ${className}`}>
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full h-full flex items-center justify-center relative z-10"
      >
        <img
          src="/events/wedding.jpg"
          alt="Wedding Celebration Illustration"
          className="w-full h-full object-contain drop-shadow-lg rounded-xl"
        />
      </motion.div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-wedding-ruby/30 shadow-sm flex items-center gap-1.5 text-xs font-bold text-wedding-ruby z-20">
        <span>🌸 Traditional Pelli Mandapam</span>
      </div>
    </div>
  );
}
