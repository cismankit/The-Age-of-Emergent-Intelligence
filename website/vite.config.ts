import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves from a subpath; Vercel (robotbod.ai) serves from the root.
// VITE_BASE overrides; Vercel sets VERCEL=1 automatically.
const base =
  process.env.VITE_BASE ??
  (process.env.VERCEL ? '/' : '/The-Age-of-Emergent-Intelligence/')

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
})
