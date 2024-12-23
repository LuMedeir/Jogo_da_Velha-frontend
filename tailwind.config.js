/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        'white-opacity': '#ffffffcc',
        'gray-hover': '#ddd',
        'green-capim': '#38b71b',
        'black-opacity': '#0000008f',
      },
    }
  }
}

