/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#080d1a',
          900: '#0F172A', // Primary Deep Midnight Blue
          800: '#1e293b',
          700: '#334155'
        },
        cyan: {
          accent: '#06B6D4', // Electric Cyan
          glow: '#22d3ee'
        },
        status: {
          amber: '#F59E0B',   // Delayed / Platform Change
          emerald: '#10B981', // Arriving / Boarding
          rose: '#EF4444'     // Cancelled
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'sans-serif'],
        outfit: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        ptsans: ['"PT Sans"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        telugu: ['"Noto Sans Telugu"', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', 'sans-serif'],
        tamil: ['"Noto Sans Tamil"', 'sans-serif'],
        malayalam: ['"Noto Sans Malayalam"', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px -5px rgba(6, 182, 212, 0.3)',
        'emerald-glow': '0 0 20px -5px rgba(16, 185, 129, 0.3)',
        'amber-glow': '0 0 20px -5px rgba(245, 158, 11, 0.3)',
      }
    },
  },
  plugins: [],
}
