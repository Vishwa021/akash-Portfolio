/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#08090D', 900: '#0d0e14', 800: '#14151d', 700: '#1c1d28' },
        muted: '#A1A1AA',
        violet: { 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed' },
        electric: { 400: '#60a5fa', 500: '#3b82f6' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 30px -4px rgba(139, 92, 246, 0.55)',
        'glow-lg': '0 0 80px -10px rgba(99, 102, 241, 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradientShift: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(40px,-30px) scale(1.15)' },
        },
        blink: { '0%, 49%': { opacity: 1 }, '50%, 100%': { opacity: 0 } },
        pulseDot: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.4)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 14s ease-in-out infinite',
        blink: 'blink 1s steps(1) infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
