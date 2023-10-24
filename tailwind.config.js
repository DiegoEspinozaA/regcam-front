/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-color': '#3d484e',
        'background-color': '#f3f4f9',
        'oscuro': '#0a0a0a',
        'rojo': '#fd6c6d',
        'azul-oscuro': '#264f7e',
        
      },
    },
  },
  plugins: [],
}