import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/simulator/',
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/android/components'),
      containers: path.resolve(__dirname, 'src/android/containers'),
      store: path.resolve(__dirname, 'src/android/store'),
    },
  },
  build: { outDir: '../simulator-dist', emptyOutDir: true },
})
