import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // When deploying to GitHub Pages for a repo site, set base to `/{repo-name}/`.
  // Update this if your repo is named differently or you use a custom domain.
  base: '/Portfolio-v2/',
  plugins: [react()],
})
