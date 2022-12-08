const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/components/src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-work-sans)', ...fontFamily.sans],
        overpass: ['var(--font-overpass)'],
      },
      colors: {
        blossom: '#ba739a',
        blue: '#1aaae0',
        clay: '#df8f87',
        gold: '#ffde5f',
        lavender: '#7851a9',
        pink: '#cd5fa3',
        wind: '#5face3',
      },
    },
  },
};
