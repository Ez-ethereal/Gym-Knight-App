/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}",
    "./src/**/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'knight': "url('/src/assets/knighthelmet.png')"
      }
    },
  },
  plugins: [],
}

