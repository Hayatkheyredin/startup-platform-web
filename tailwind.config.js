/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6D28D9',      // vivid violet
        'primary-hover': '#5B21B6',
        secondary: '#E11D48',    // rose
        'secondary-hover': '#BE123C',
        accent: '#0EA5E9',       // sky
        'accent-hover': '#0284C7',
        success: '#10B981',      // emerald for active/success states
        surface: '#FAFAF9',
        text: '#1C1917',
        'text-muted': '#78716C',
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
        'card-hover': '0 12px 28px -8px rgb(109 40 217 / 0.15), 0 4px 14px -4px rgb(0 0 0 / 0.08)',
        'glow': '0 0 0 1px rgb(109 40 217 / 0.08), 0 8px 24px -4px rgb(109 40 217 / 0.15)',
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
