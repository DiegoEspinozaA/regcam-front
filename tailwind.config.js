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
        'navbar-color': '#303a41',
        'azul': '#5699e9',
        'hover': '#475157'
        
      },
      colors: {
        'blue-gray-800': '#3e4a52', // Reemplaza este valor con tu color personalizado
        'blue-gray-900': '#303a41', // Reemplaza este valor con tu color personalizado
      },
    },
  },
  plugins: [],
}