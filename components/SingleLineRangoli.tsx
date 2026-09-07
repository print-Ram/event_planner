'use client';

import React from 'react';

interface SingleLineRangoliProps {
  className?: string;
  variant?: 'chukkala' | 'lotus' | 'padi' | 'divider' | 'corner';
  color?: string;
  dotColor?: string;
  glow?: boolean;
}

const dots: Array<[number, number]> = [
  // 1
  [120, 25],

  // 3
  [85, 55], [120, 55], [155, 55],

  // 5
  [55, 85], [87.5, 85], [120, 85], [152.5, 85], [185, 85],

  // 5
  [55, 120], [87.5, 120], [120, 120], [152.5, 120], [185, 120],

  // 5
  [55, 155], [87.5, 155], [120, 155], [152.5, 155], [185, 155],

  // 3
  [85, 185], [120, 185], [155, 185],

  // 1
  [120, 215],
];

function DotField({ dotColor }: { dotColor: string }) {
  return (
    <g fill={dotColor}>
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.1" />
      ))}
    </g>
  );
}

function ChukkalaMelika({ color }: { color: string }) {
  return (
    <g
      fill="none"
      stroke={color}
      strokeWidth="2.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Outer crown / base loops */}
      <path d="M120 10 C103 24 103 39 120 51 C137 39 137 24 120 10" />
      <path d="M120 230 C103 216 103 201 120 189 C137 201 137 216 120 230" />

      {/* Left / right terminal loops */}
      <path d="M25 120 C39 103 54 103 66 120 C54 137 39 137 25 120" />
      <path d="M215 120 C201 103 186 103 174 120 C186 137 201 137 215 120" />

      {/* Top diamond weave */}
      <path d="M55 85
               C67 73 79 73 91 85
               L120 114
               L149 85
               C161 73 173 73 185 85
               C173 97 161 97 149 85
               L120 56
               L91 85
               C79 97 67 97 55 85" />

      {/* Upper-middle crossing weave */}
      <path d="M55 120
               C68 106 77 106 90 120
               L120 150
               L150 120
               C163 106 172 106 185 120
               C172 134 163 134 150 120
               L120 90
               L90 120
               C77 134 68 134 55 120" />

      {/* Lower-middle crossing weave */}
      <path d="M55 155
               C68 141 77 141 90 155
               L120 185
               L150 155
               C163 141 172 141 185 155
               C172 169 163 169 150 155
               L120 125
               L90 155
               C77 169 68 169 55 155" />

      {/* Top-to-bottom central S weave */}
      <path d="M85 55
               C98 42 108 42 120 55
               C132 68 132 82 120 95
               C108 108 108 122 120 135
               C132 148 132 162 120 175
               C108 188 108 202 120 215" />

      {/* Mirrored central S weave */}
      <path d="M155 55
               C142 42 132 42 120 55
               C108 68 108 82 120 95
               C132 108 132 122 120 135
               C108 148 108 162 120 175
               C132 188 132 202 120 215" />

      {/* Horizontal interlocks */}
      <path d="M25 120
               C40 120 45 105 55 95
               C67 83 77 83 90 95
               C103 107 103 122 90 135
               C77 148 67 148 55 135
               C45 125 40 120 25 120" />

      <path d="M215 120
               C200 120 195 105 185 95
               C173 83 163 83 150 95
               C137 107 137 122 150 135
               C163 148 173 148 185 135
               C195 125 200 120 215 120" />

      {/* Inner diamond */}
      <path d="M120 70
               C137 87 153 103 170 120
               C153 137 137 153 120 170
               C103 153 87 137 70 120
               C87 103 103 87 120 70 Z" />

      {/* Inner counter-weave */}
      <path d="M70 120
               C87 103 103 103 120 120
               C137 137 153 137 170 120" />
      <path d="M120 70
               C103 87 103 103 120 120
               C137 137 137 153 120 170" />

      {/* Small rounded loops around the most visible central dots */}
      <path d="M120 90 C107 78 107 66 120 56 C133 66 133 78 120 90" />
      <path d="M90 120 C78 107 66 107 55 120 C66 133 78 133 90 120" />
      <path d="M150 120 C162 107 174 107 185 120 C174 133 162 133 150 120" />
      <path d="M120 150 C107 162 107 174 120 185 C133 174 133 162 120 150" />

      {/* Four diagonal petals that create the reference's woven floral center */}
      <path d="M120 120
               C99 99 84 99 74 120
               C84 141 99 141 120 120" />
      <path d="M120 120
               C141 99 156 99 166 120
               C156 141 141 141 120 120" />
      <path d="M120 120
               C99 141 84 141 74 120
               C84 99 99 99 120 120" opacity="0.01" />
      <path d="M120 120
               C141 141 156 141 166 120
               C156 99 141 99 120 120" opacity="0.01" />
    </g>
  );
}

export default function SingleLineRangoli({
  className = '',
  variant = 'chukkala',
  color = '#FFB300',
  dotColor = '#FFE082',
  glow = true,
}: SingleLineRangoliProps) {
  if (variant === 'divider') {
    return (
      <div className={`flex items-center justify-center gap-4 my-8 ${className}`}>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        <svg width="150" height="38" viewBox="0 0 150 38" fill="none">
          <path
            d="M10 19
               C20 5 30 5 40 19
               C50 33 60 33 70 19
               C80 5 90 5 100 19
               C110 33 120 33 140 19"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="75" cy="19" r="3.5" fill={dotColor} />
        </svg>
        <div className="h-px w-24 bg-gradient-to-l from-transparent via-amber-400 to-transparent" />
      </div>
    );
  }

  if (variant === 'corner') {
    return (
      <svg viewBox="0 0 100 100" fill="none" className={className}>
        <path
          d="M10 10 C42 10 42 42 42 90 M10 28 C28 28 28 42 28 73 M28 10 C28 28 42 28 73 28"
          stroke={color}
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <circle cx="18" cy="18" r="3.5" fill={dotColor} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Authentic Telugu Chukkala Melika Muggu"
    >
      <defs>
        {glow && (
          <>
            <filter id="rangoliGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="rangoliSoftGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="1.5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </>
        )}
      </defs>

      <g transform="rotate(0 120 120)">
        <g filter={glow ? 'url(#rangoliGlow)' : undefined}>
          <ChukkalaMelika color={color} />
        </g>

        <g filter={glow ? 'url(#rangoliSoftGlow)' : undefined}>
          <DotField dotColor={dotColor} />
        </g>

        {/* Tiny center bindu */}
        <circle
          cx="120"
          cy="120"
          r="3.5"
          fill={dotColor}
          filter={glow ? 'url(#rangoliSoftGlow)' : undefined}
        />
      </g>
    </svg>
  );
}
