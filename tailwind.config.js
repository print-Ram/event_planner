/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F6F1E9',
        cream: '#F4EFE7',
        beige: '#E5D7C7',
        sand: '#C4AE98',
        taupe: '#A58D76',
        mocha: '#79604D',
        espresso: '#332821',
        muted: '#82776D',
        bronze: '#A8895C',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        luxury: '1rem',
      },
      boxShadow: {
        editorial: '0 20px 50px -20px rgba(51, 40, 33, 0.12)',
        subtle: '0 4px 20px -4px rgba(51, 40, 33, 0.06)',
      },
    },
  },
  plugins: [],
};
