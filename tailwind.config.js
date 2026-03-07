/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#F3E8FE',        // primary brand (lavender)
        'brand-dark': '#E9D5FF', // hover/emphasis
        primary: '#6D28D9',      // violet for text/buttons on brand/white
        'primary-hover': '#5B21B6',
        secondary: '#7C3AED',    // purple accent (brand family)
        'secondary-hover': '#6D28D9',
        accent: '#7C3AED',
        'accent-hover': '#6D28D9',
        success: '#6B21A8',
        surface: '#F3E8FE',      // app background = brand
        text: '#1C1917',
        'text-muted': '#6B7280',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'btn': '10px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'card-hover': '0 12px 28px -8px rgb(243 232 254 / 0.4), 0 4px 14px -4px rgb(0 0 0 / 0.06)',
        'glow': '0 0 0 1px rgb(243 232 254 / 0.5), 0 8px 24px -4px rgb(243 232 254 / 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out',
        'hover-lift': 'hoverLift 0.25s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        hoverLift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-2px)' },
        },
      },
    },
  },
  plugins: [],
}
