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
          cream: '#F9F5EE',
          card: '#FFFFFF',
          cardHover: '#FFFDF9',
          kumkum: '#8B1E29', // Deep Maroon / Wine
          ruby: '#B80D22',
          marigold: '#F59E0B',
          amber: '#D97706',
          turmeric: '#D4AF37', // Muted Gold
          gold: '#C59B27',
          warmGold: '#E5C158',
          mango: '#1E5631',
          leaf: '#2D6A4F',
          text: '#1F1618',
          muted: '#5C4E51',
          border: '#E8D9C5',
          roseBg: '#FDF0ED',
        }
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'sway': 'sway 3s ease-in-out infinite',
        'pulseGlow': 'pulseGlow 3s ease-in-out infinite',
        'gentleBounce': 'gentleBounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.85', filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 20px rgba(139, 30, 41, 0.4))' },
        },
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      }
    },
  },
  plugins: [],
};

