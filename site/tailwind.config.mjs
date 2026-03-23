/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        swiss: {
          black: '#1a1a1a',
          white: '#fafafa',
          blue: '#0099ff',
          'blue-light': '#33adff',
          'blue-dark': '#0077cc',
          cream: '#f0f7ff',
        },
        'vicert-blue': '#0099ff',
        'vicert-blue-light': '#33adff',
        'vicert-blue-dark': '#0077cc',
        gray: {
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          600: '#525252',
          800: '#262626',
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
