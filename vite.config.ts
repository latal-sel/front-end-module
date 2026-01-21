import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],

      },
    }),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Proxy API requests to the backend during development to avoid CORS
      // Use env var VITE_API_BASE_URL if set, otherwise fallback to http://localhost:3000
      '/api': {
        target: 'http://192.168.200.1/api',
        changeOrigin: true,
        secure: false,
      },
      // If your frontend calls /network-config directly (as in this project), proxy it too
      '/network-config': {
        target: 'http://192.168.200.1/api',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})
