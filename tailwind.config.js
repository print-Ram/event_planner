/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          bg: '#FFFDF7',
          ivory: '#FAF4E8',
          card: '#FFFFFF',
          cardHover: '#FFF9EF',
          kumkum: '#B80D22',
          marigold: '#F59E0B',
          amber: '#D97706',
          turmeric: '#D4AF37',
          gold: '#C59B27',
          mango: '#1E5631',
          leaf: '#2D6A4F',
          text: '#2C1A1D',
          muted: '#6B5B5E',
          border: '#E8D5B7',
        }
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'sway': 'sway 3s ease-in-out infinite',
        'pulse-warm': 'pulseWarm 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseWarm: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(184, 13, 34, 0.6))' },
        }
      }
    },
  },
  plugins: [],
};
