const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/web/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B213E', // Deep Blue
        secondary: '#334155', // Slate 700
        accent: '#A3B939', // Lime Green
        accentHover: '#82932E',
        background: '#F1F5F9', // Light Gray
        surface: '#FFFFFF',
        avocado: {
          100: 'oklch(0.99 0 0)',
          200: 'oklch(0.98 0.04 113.22)',
          300: 'oklch(0.94 0.11 115.03)',
          400: 'oklch(0.92 0.19 114.08)',
          500: 'oklch(0.84 0.18 117.33)',
          600: 'oklch(0.53 0.12 118.34)',
        },
      },
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
        display: ['Satoshi', 'sans-serif'],
      },
      screens: {
        '3xl': '120rem',
      },
    },
  },
  plugins: [],
}
