/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#FAFAF7',
        'bg-card': '#FFFFFF',
        'ink': '#0A0A0A',
        'ink-muted': '#6B6B6B',
        'accent': '#FF3B1F',
        'border': '#E5E5E0',
        'sidebar': '#F5F5F0',
      },
      fontFamily: {
        'display': ['"Inter Tight"', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'body-lg': ['15px', { lineHeight: '1.5' }],
        'body': ['14px', { lineHeight: '1.5' }],
        'body-sm': ['13px', { lineHeight: '1.4' }],
        'label': ['11px', { lineHeight: '1.2', letterSpacing: '0.06em' }],
        'label-xs': ['10px', { lineHeight: '1.2', letterSpacing: '0.08em' }],
        'price': ['15px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
    },
  },
  plugins: [],
}
