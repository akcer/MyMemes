const colors = require('tailwindcss/colors');

module.exports = {
  //mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    //colors: { gray: colors.warmGray },
    extend: {
      colors: { gray: colors.warmGray },
    },
  },
  variants: {
    extend: { transform: ['hover', 'active'], scale: ['hover', 'active'] },
  },
  plugins: [],
};
