import React from 'react';

interface AnnouncementBarProps {
  enabled: boolean;
  text: string;
}

export default function AnnouncementBar({ enabled, text }: AnnouncementBarProps) {
  if (!enabled || !text) return null;

  return (
    <div className="bg-espresso text-ivory py-2 px-4 text-center text-[11px] sm:text-xs font-medium tracking-[0.14em] uppercase border-b border-sand/20">
      <p className="max-w-7xl mx-auto truncate">{text}</p>
    </div>
  );
}
