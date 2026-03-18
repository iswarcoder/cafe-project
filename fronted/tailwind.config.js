/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coffee: {
          900: "#2b1d17",
          800: "#3b2a21",
          700: "#5b3f31",
          500: "#8a5b3c",
          300: "#c8a27d",
          100: "#f4e9dc"
        },
        cream: "#fff8ef",
        mocha: "#a07154"
      },
      boxShadow: {
        soft: "0 12px 40px rgba(43, 29, 23, 0.14)"
      },
      backgroundImage: {
        "bean-glow": "radial-gradient(circle at 20% 20%, rgba(160,113,84,0.22), transparent 40%), radial-gradient(circle at 80% 15%, rgba(200,162,125,0.2), transparent 35%)"
      }
    }
  },
  plugins: []
};
