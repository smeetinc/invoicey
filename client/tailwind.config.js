/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#163300",
        background: "#F6F7F9",
        dark: "#333333",
        white: "#FFFFFF",
        accent: "#9FE870",
        grey: "#666666",
        warning: "#FFC107",
        grey: "#CCCCCC",
        error: "#A8200D",
        success: "#4CAF50",
        secondary: "#9FE870",
      },
      fontFamily: {
        clashDisplay: "'Clash Display', sans-serif",
        manrope: "'Manrope', sans-serif",
        poppins: "'Poppins', sans-serif",
        letterSpacing: {
          sm: "0.64px",
        },
      },
    },
  },
  plugins: [],
};