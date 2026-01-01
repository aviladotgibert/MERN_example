import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/'  
//base: '/MERN_example/'  // ← ¡IMPORTANTE! Nombre de tu repo
})
