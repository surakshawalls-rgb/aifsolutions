/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10243A',
          light: '#1a3a5c',
        },
        secondary: '#E53935',
        accent: '#FF8C32',
        background: '#FFFFFF',
        lightBg: '#F5F7FA',
        text: '#263445',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}