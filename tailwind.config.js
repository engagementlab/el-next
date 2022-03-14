const defaultTheme = require(`tailwindcss/defaultTheme`);

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [`Inter`, ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      black: '#000',
      bluegreen: '#026670',
      coated: '#2D3130',
      purple: '#8D33D2',
      'green-blue': '#5EB89E',
    },
  },
  plugins: [],
};
