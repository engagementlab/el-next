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
      },
      colors: {
        blossom: '#ba739a',
        blue: '#1aaae0',
        gold: '#ffde5f',
      },
    },
  },
};
