/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED', // Violet 600
          hover: '#6D28D9',   // Violet 700
        },
        secondary: {
          DEFAULT: '#F5F3FF', // Violet 50
          hover: '#EDE9FE',   // Violet 100
        },
        'app-bg': '#C7D2FE', // Light periwinkle blue matching user mockup
        'app-surface': '#FFFFFF',
        'app-elevated': '#FAFAFA',
        'app-border': '#E5E7EB',
        'text-main': '#111827',
        'text-muted': '#6B7280',
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
        'card-hover': '0 10px 25px rgba(37, 99, 235, 0.05), 0 4px 10px rgba(0,0,0,0.03)',
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease forwards',
        'slide-up': 'slide-up 0.4s ease forwards',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}