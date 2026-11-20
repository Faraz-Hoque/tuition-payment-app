import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Lets you write `import X from '@/components/ui/Card'` instead of '../../../components/ui/Card'
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
