/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
    },
  },
};
