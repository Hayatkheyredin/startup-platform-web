/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#fdf2f7',        // light pink tint (logo vibrant pink based)
        'brand-dark': '#fad6e8', // hover/emphasis
        primary: '#E85B84',      // MELIKA vibrant pink (logo)
        'primary-hover': '#d94a73',
        secondary: '#6C3D5A',    // MELIKA deep plum (logo)
        'secondary-hover': '#5a3450',
        accent: '#E85B84',
        'accent-hover': '#d94a73',
        success: '#6C3D5A',
        surface: '#fdf2f7',      // app background = brand
        text: '#1C1917',
        'text-muted': '#888888', // light gray from logo
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
        'card-hover': '0 12px 28px -8px rgb(232 91 132 / 0.25), 0 4px 14px -4px rgb(0 0 0 / 0.06)',
        'glow': '0 0 0 1px rgb(232 91 132 / 0.2), 0 8px 24px -4px rgb(232 91 132 / 0.15)',
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
