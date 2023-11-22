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
        secondary: "#9FE870",
        background: "#F6F7F9",
        dark: "#333333",
        white: "#FFFFFF",
        accent: "#9FE870",
        grey: "#666666",
        warning: "#FFC107",
        lightGrey: "#CCCCCC",
        error: "#A8200D",
        success: "#4CAF50",
      },
      fontFamily: {
        clashDisplay: ["Clash Display", "sans-serif"],
        manrope: "'Manrope', sans-serif",
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      letterSpacing: {
        sm: "0.64px",
      },
    },
  },
  plugins: [],
};
