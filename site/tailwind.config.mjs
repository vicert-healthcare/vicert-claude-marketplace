/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        swiss: {
          black: '#2c2c2c',
          white: '#f6f6f4',
          blue: '#0088ee',
          'blue-light': '#33adff',
          'blue-dark': '#0070cc',
          cream: '#f0f7ff',
        },
        'vicert-blue': '#0088ee',
        'vicert-blue-light': '#33adff',
        'vicert-blue-dark': '#0070cc',
        gray: {
          100: '#efefed',
          200: '#e0e0dd',
          300: '#ccccc8',
          500: '#8a8a86',
          600: '#636360',
          800: '#2e2e2c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
