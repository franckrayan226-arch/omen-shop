/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette commune
        'common-bg': '#FAFAFA',
        'common-ink': '#0A0A0A',
        'common-gray': '#8C8C8C',
        'common-border': '#E2E2E2',
        'common-accent': '#FF3B1F',
        
        // Section MODE
        'mode-bg': '#FAFAFA',
        'mode-ink': '#0A0A0A',
        'mode-accent': '#FF3B1F',
        
        // Section BIEN-ÊTRE
        'bienetre-bg': '#F5F1EA',
        'bienetre-ink': '#2B2621',
        'bienetre-accent': '#7A8B5C',
        
        // Section ÉLECTRONIQUE
        'electronique-bg': '#0A0A0A',
        'electronique-ink': '#F5F5F5',
        'electronique-accent': '#00D4FF',
      },
      fontFamily: {
        'anton': ['var(--font-anton)', 'sans-serif'],
        'fraunces': ['var(--font-fraunces)', 'serif'],
        'manrope': ['var(--font-manrope)', 'sans-serif'],
        'mono': ['var(--font-plexmono)', 'monospace'],
      },
      fontSize: {
        'hero': ['44px', { lineHeight: '0.92', letterSpacing: 'normal' }],
        'hero-lg': ['56px', { lineHeight: '0.95', letterSpacing: 'normal' }],
        'section-title': ['28px', { lineHeight: '1', letterSpacing: 'normal' }],
        'section-title-lg': ['32px', { lineHeight: '1', letterSpacing: 'normal' }],
        'body': ['14px', { lineHeight: '1.5', letterSpacing: 'normal' }],
        'body-lg': ['15px', { lineHeight: '1.5', letterSpacing: 'normal' }],
        'label': ['10px', { lineHeight: '1.2', letterSpacing: '0.06em' }],
        'label-lg': ['11px', { lineHeight: '1.2', letterSpacing: '0.12em' }],
        'data-sm': ['13px', { lineHeight: '1.2', letterSpacing: 'normal' }],
        'data': ['15px', { lineHeight: '1.2', letterSpacing: 'normal' }],
        'data-lg': ['20px', { lineHeight: '1.2', letterSpacing: 'normal' }],
      },
    },
  },
  plugins: [],
}