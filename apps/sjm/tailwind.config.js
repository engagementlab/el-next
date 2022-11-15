const defaultTheme = require(`tailwindcss/defaultTheme`);

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/components/src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [`Inter`, ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blossom: '#ba739a',
        gold: '#ffde5f',
      },
    },
  },
};
