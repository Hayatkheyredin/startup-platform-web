/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#fff0f7',        // light pink tint (#ff5bae based)
        'brand-dark': '#ffd6eb', // hover/emphasis
        primary: '#ff5bae',      // MELIKA pink
        'primary-hover': '#e84a9d',
        secondary: '#ff5bae',
        'secondary-hover': '#e84a9d',
        accent: '#ff5bae',
        'accent-hover': '#e84a9d',
        success: '#e84a9d',
        surface: '#fff0f7',      // app background = brand
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
        'card-hover': '0 12px 28px -8px rgb(255 91 174 / 0.25), 0 4px 14px -4px rgb(0 0 0 / 0.06)',
        'glow': '0 0 0 1px rgb(255 91 174 / 0.2), 0 8px 24px -4px rgb(255 91 174 / 0.15)',
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
