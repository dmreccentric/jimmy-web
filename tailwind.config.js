/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000",
        white: "#ffffff",
        black: "#000000",
        orange: "#EB6316",
        gold: "#c59d5f",
        red: "#991b1b",
        blue: "#102a42",
      },
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
