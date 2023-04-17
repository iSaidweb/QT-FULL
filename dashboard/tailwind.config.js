/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        tablet: {'max': '999px'},
        tablet2: {'max': '910px'},
        phone: {'max': '649px'}
      }
    },
  },
  plugins: [],
}