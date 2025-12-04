/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        dji: {
          black: '#181818',
          gray: '#f5f5f5',
          blue: '#0070d5'
        }
      }
    },
  },
  plugins: []
}