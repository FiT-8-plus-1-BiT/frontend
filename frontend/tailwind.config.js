// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue : {
          0:"#FAFAFE",
          100:"#EBECFD",
          200:"#E1E2FB",
          300:"#C1C3F8",
          400:"#383DE7",
          500:"#3237D0",
          600:"#2D31B9",
          700:"#2A2EAD",
          800:"#22258B",
          900:"#191B68",
        },
        gray:{
          0: "#FFFFFF",
          100: "#F4F4F4",
          200: "#E0E1E4",
          300: "#9FA0A3",
          400: "#727577",
          500: "#4F5158",
          600: "#2C2E31",
          700: "#131212",
          800: "#000000",
        }
        ,
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
