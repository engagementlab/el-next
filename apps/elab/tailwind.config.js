/** @type {import('tailwindcss').Config} */
const defaultTheme = require(`tailwindcss/defaultTheme`);
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/components/src/**/*.tsx',
  ],
  theme: {
    borderRadius: {
      full: '100px',
    },
    extend: {
      fontFamily: {
        sans: [`Inter`, ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        large: '38px',
      },
    },
  },

  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme('fontSize.4xl') },
        h2: { fontSize: theme('fontSize.xl') },
        h3: { fontSize: theme('fontSize.lg') },
      });
    }),
  ],
};
