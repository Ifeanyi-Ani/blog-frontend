/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },

        customBlue: {
          DEFAULT: 'hsl(210, 100%, 10%)',
          50: 'hsl(210, 100%, 95%)',
          100: 'hsl(210, 100%, 85%)',
          200: 'hsl(210, 100%, 75%)',
          300: 'hsl(210, 100%, 60%)',
          400: 'hsl(210, 100%, 45%)',
          500: 'hsl(210, 100%, 30%)',
          600: 'hsl(210, 100%, 20%)',
          700: 'hsl(210, 100%, 15%)',
          800: 'hsl(210, 100%, 12%)',
          900: 'hsl(210, 100%, 10%)',
          950: 'hsl(210, 100%, 8%)',
        },
        customRed: {
          DEFAULT: 'hsl(345, 100%, 28%)',
          50: 'hsl(345, 100%, 95%)',
          100: 'hsl(345, 100%, 85%)',
          200: 'hsl(345, 100%, 75%)',
          300: 'hsl(345, 100%, 60%)',
          400: 'hsl(345, 100%, 45%)',
          500: 'hsl(345, 100%, 30%)',
          600: 'hsl(345, 100%, 28%)',
          700: 'hsl(345, 100%, 20%)',
          800: 'hsl(345, 100%, 15%)',
          900: 'hsl(345, 100%, 10%)',
          950: 'hsl(345, 100%, 8%)',
        },
        customGold: {
          DEFAULT: 'hsl(46, 65%, 53%)',
          50: 'hsl(46, 65%, 95%)',
          100: 'hsl(46, 65%, 85%)',
          200: 'hsl(46, 65%, 75%)',
          300: 'hsl(46, 65%, 60%)',
          400: 'hsl(46, 65%, 45%)',
          500: 'hsl(46, 65%, 35%)',
          600: 'hsl(46, 65%, 30%)',
          700: 'hsl(46, 65%, 25%)',
          800: 'hsl(46, 65%, 20%)',
          900: 'hsl(46, 65%, 15%)',
          950: 'hsl(46, 65%, 10%)',
        },
        neonPink: {
          DEFAULT: 'hsl(320, 100%, 50%)',
          100: 'hsl(320, 100%, 90%)',
          200: 'hsl(320, 100%, 80%)',
          300: 'hsl(320, 100%, 70%)',
          400: 'hsl(320, 100%, 60%)',
          500: 'hsl(320, 100%, 50%)',
          600: 'hsl(320, 100%, 40%)',
          700: 'hsl(320, 100%, 30%)',
          800: 'hsl(320, 100%, 20%)',
          900: 'hsl(320, 100%, 10%)',
        },
        electricCyan: {
          DEFAULT: 'hsl(180, 100%, 50%)',
          100: 'hsl(180, 100%, 90%)',
          200: 'hsl(180, 100%, 80%)',
          300: 'hsl(180, 100%, 70%)',
          400: 'hsl(180, 100%, 60%)',
          500: 'hsl(180, 100%, 50%)',
          600: 'hsl(180, 100%, 40%)',
          700: 'hsl(180, 100%, 30%)',
          800: 'hsl(180, 100%, 20%)',
          900: 'hsl(180, 100%, 10%)',
        },
      },
      fontSize: {
        subtle: [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: '500',
          },
        ],
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': {
            textShadow:
              '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0ff, 0 0 20px #0ff, 0 0 35px #0ff, 0 0 40px #0ff, 0 0 50px #0ff',
          },
          '100%': {
            textShadow:
              '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0ff, 0 0 40px #0ff, 0 0 70px #0ff, 0 0 80px #0ff, 0 0 100px #0ff',
          },
        },
      },
    },
  },
  plugins: [],
};
