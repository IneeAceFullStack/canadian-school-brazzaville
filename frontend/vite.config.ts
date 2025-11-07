import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
# 2025-11-07T10:05:00 - chore: mise en place de la structure frontend/backend
# 2025-11-07T10:05:00 - chore: mise en place de la structure frontend/backend
# 2025-11-07T10:05:00 - chore: mise en place de la structure frontend/backend
# 2025-11-07T10:05:00 - chore: mise en place de la structure frontend/backend
