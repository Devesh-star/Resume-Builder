/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#D4577A',
        'neon-cyan': '#E88FA2',
        'neon-pink-dim': '#B84466',
        'neon-cyan-dim': '#C77489',
        'neon-pink-glow': 'rgba(212, 87, 122, 0.12)',
        'neon-cyan-glow': 'rgba(232, 143, 162, 0.12)',
        'cyber-dark': '#FAF5F0',
        'cyber-surface': '#FFFFFF',
        'cyber-elevated': '#F5EDE6',
        'cyber-glass': 'rgba(250, 245, 240, 0.85)',
        'cyber-border': 'rgba(212, 87, 122, 0.12)',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-pink': '0 4px 14px rgba(212, 87, 122, 0.15), 0 1px 3px rgba(212, 87, 122, 0.08)',
        'neon-cyan': '0 4px 14px rgba(232, 143, 162, 0.15), 0 1px 3px rgba(232, 143, 162, 0.08)',
        'neon-glow': '0 4px 20px rgba(212, 87, 122, 0.20), 0 2px 8px rgba(232, 143, 162, 0.12)',
        'neon-subtle': '0 1px 8px rgba(212, 87, 122, 0.08)',
        'card': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
        'card-hover': '0 10px 25px rgba(212,87,122,0.10), 0 4px 10px rgba(0,0,0,0.04)',
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'cyber-grid': 'cyber-grid 20s linear infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'text-shine': 'text-shine 3s ease-in-out infinite alternate',
        'fade-in': 'fade-in 0.5s ease forwards',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { boxShadow: '0 4px 14px rgba(212,87,122,0.12)' },
          '50%': { boxShadow: '0 4px 20px rgba(212,87,122,0.24)' },
        },
        'cyber-grid': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 4px 14px rgba(212,87,122,0.12)' },
          '50%': { boxShadow: '0 4px 20px rgba(212,87,122,0.24)' },
        },
        'text-shine': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        'fade-in': {
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