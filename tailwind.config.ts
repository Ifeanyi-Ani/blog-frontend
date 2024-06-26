/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          400: "#707272",
          500: "#405368",
          600: "#122943",
          700: "#001935",
          800: "#001935",
        },
      },
      fontSize: {
        subtle: [
          "12px",
          {
            lineHeight: "16px",
            fontWeight: "500",
          },
        ],
      },
    },
  },
  plugins: [],
};
