/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunrisePink: "rgb(217,46,150)",
        sunriseYellow:"rgb(255, 231, 69)",
      },
    },
  },
  plugins: [],
}

export default config

