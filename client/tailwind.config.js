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
        error: '#FF1AE8',
      },
      dropShadow: {
        '3xl': [
          '0px 10px 8px rgba(0, 0, 0, 0.2)',
          '0px 4px 3px rgba(0, 0, 0, 0.2)',
        ],
      },
      fontFamily: {
        itim: ['Itim', 'cursive'],
      },
      animation: {
        // 사용법 : class 에 animate-애니메이션이름
        fadeInLeft1: 'fadeInLeft1 1s both',
        fadeInRight1: 'fadeInRight1 1s both',
        fadeInUp1: 'fadeInsUp1 1s both',
        fadeInDown1: 'fadeInDown1 1s both',
      },
      keyframes: {
        fadeInLeft1: {
          from: { opacity: '0', transform: 'translateX(-1%)' },
          to: { opacity: '1', transform: 'translateX(0%)' },
        },
        fadeInRight1: {
          from: { opacity: '0', transform: 'translateX(1%)' },
          to: { opacity: '1', transform: 'translateX(0%)' },
        },
        fadeInDown1: {
          from: { opacity: '0', transform: 'translateY(1%)' },
          to: { opacity: '1', transform: 'translateY(0%)' },
        },
        fadeInUp1: {
          from: { opacity: '0', transform: 'translateY(-1%)' },
          to: { opacity: '1', transform: 'translateY(0%)' },
        },
      },
    },
  },
  plugins: [],
};
