/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './out/**/*.html',
    './src/renderer/src/**/*.{vue,js,ts,jsx,tsx}',
    './src/renderer/spine_src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      HumStd: 'HummingStd',
      yuanti: 'yuanti',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: '#app',
};
