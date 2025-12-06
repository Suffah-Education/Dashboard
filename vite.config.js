import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Build optimization
  build: {
    // Smaller chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'ui-vendor': ['lucide-react', 'react-icons'],
        },
      },
    },
    // Chunk size warnings (in kb)
    chunkSizeWarningLimit: 1000,
    // Minify aggressively
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
      },
    },
  },
  
  // Development optimization
  server: {
    hmr: true,
  },
})
