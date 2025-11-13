import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration pour GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/my-site/', // my-site
})
