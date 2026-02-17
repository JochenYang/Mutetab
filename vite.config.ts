import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
        settings: resolve(__dirname, 'settings.html'),
        background: resolve(__dirname, 'src/background/background.ts')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          // Keep the directory structure for background script
          if (chunkInfo.name === 'background') {
            return 'src/background/background.js'
          }
          return 'assets/[name]-[hash].js'
        }
      }
    }
  }
})
