import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/HRnet/', // Remplacez 'repository-name' par le nom de votre dépôt GitHub
});