/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors :
      {
        primary : colors.blue,
        success: colors.green 
      },
      container: {
        screens:{
          xl:'1024px'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

