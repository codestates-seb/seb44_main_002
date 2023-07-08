/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'gradi-to': '#1A344A',
        'gradi-from': '#4A4676',
        'gray-100': '#E6E6E6',
        'gray-200': '#B3B3B3',
        'gray-300': '#7B7B7B',
        'gray-400': '#8F8F8F',
        'pointPurple-100': '#BB40F1',
        'pointPurple-200': '#BC4096',
        'yellow-100': '#FFD600',
      },
    },
  },
  plugins: [],
};
