import type { Config } from 'tailwindcss'

export default {
  content: [
    './packages/**/*.{js,ts,vue,md}',
    './.vitepress/**/*.{js,ts,vue,md}',
  ],
  theme: {
  },
  plugins: [],
} satisfies Config
