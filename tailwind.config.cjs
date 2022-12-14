/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  purge: [
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
   theme: {
     extend: {
       width: {
         '9/20':'45%',
       }
     },
   },
   variants: {},
   plugins: [],
 }