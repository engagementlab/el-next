/** @type {import('tailwindcss').Config} */
const defaultTheme = require(`tailwindcss/defaultTheme`);
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/components/src/**/*.tsx',
    './types.ts',
  ],
  theme: {
    borderRadius: {
      full: '100%',
    },
    extend: {
      fontFamily: {
        sans: [`var(--font-base)`],
      },
      borderRadius: {
        large: '38px',
      },
      dropShadow: {
        purple: '3px 5px 0 rgba(227,191,255,1)',
        'green-blue': '3px 5px 0 rgba(187,235,231,1)',
      },
      screens: {
        tall: {
          raw: `only screen and (max-height: 960px) and (max-width: 480px)`,
        },
        wide: {
          raw: `only screen and (max-height: 480px) and (max-width: 960px)`,
        },
        portrait: {
          raw: '(orientation: portrait)',
        },
        landscape: {
          raw: '(orientation: landscape)',
        },
      },
      animation: {
        fill: 'fillBar 3500ms cubic-bezier(0.785, 0.135, 0.150, 0.860) forwards',
        enterNoun:
          'enterFromTop 900ms cubic-bezier(0.785, 0.135, 0.150, 0.860) forwards',
        unBlur:
          'fromBlur 750ms cubic-bezier(0.785, 0.135, 0.150, 0.860) forwards',
      },
      keyframes: {
        fromBlur: {
          '0%': { filter: 'blur(4px)' },
          '100%': { filter: 'blur(0px)' },
        },
        fillBar: {
          '0%': {
            width: 0,
          },
          '100%': {
            width: '100%',
          },
        },
        enterFromTop: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-50%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate(0)',
          },
        },
      },
    },
    colors: {
      black: '#000',
      blue: '#438EA0',
      grey: '#707070',
      'green-blue': '#5EB89E',
      green: '#00A494',
      leaf: '#6FB42C',
      purple: '#7C4E9F',
      red: '#FF0001',
      stone: '#555555',
      slate: '#444444',
      white: '#FFF',
      yellow: '#F6A536',
      yellowlt: '#FFF1DB',
      teal: '#00A494',
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
