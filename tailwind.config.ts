import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0A0A0F',
          surface: '#111118',
          elevated: '#1A1A24',
        },
        accent: {
          cyan: '#00D4FF',
          amber: '#F59E0B',
        },
        border: {
          DEFAULT: '#2A2A3A',
          bright: '#3A3A50',
        },
        'text-primary': '#F0F0FF',
        'text-secondary': '#8888AA',
        'text-muted': '#44445A',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.25)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.25)',
        'glow-cyan-lg': '0 0 40px rgba(0, 212, 255, 0.35)',
      },
      backgroundImage: {
        'radial-cyan': 'radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 70%)',
        'radial-amber': 'radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
export default config
