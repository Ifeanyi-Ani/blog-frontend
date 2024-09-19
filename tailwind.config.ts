/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: {
          DEFAULT: "hsl(210, 100%, 10%)",
          50: "hsl(210, 100%, 95%)",
          100: "hsl(210, 100%, 85%)",
          200: "hsl(210, 100%, 75%)",
          300: "hsl(210, 100%, 60%)",
          400: "hsl(210, 100%, 45%)",
          500: "hsl(210, 100%, 30%)",
          600: "hsl(210, 100%, 20%)",
          700: "hsl(210, 100%, 15%)",
          800: "hsl(210, 100%, 12%)",
          900: "hsl(210, 100%, 10%)",
          950: "hsl(210, 100%, 8%)",
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
