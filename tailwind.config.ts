import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        lora: ['Lora', 'Georgia', 'serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        ink: '#1a1814',
        paper: '#f7f4ef',
        cream: '#ede9e1',
        accent: '#c84b2f',
        muted: '#8c8680',
        border: '#d4cfc7',
      },
    },
  },
  plugins: [],
}
export default config
