/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      viFont: ['Vi-Regular', 'Sans'],
    },
    extend: {
      colors: {
        primary: '#ed303b',
        secondary: '#ffd300',
        dark: '#2a2a2a',
      },
    },
  },
  plugins: [],
}
