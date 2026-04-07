
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import {qrcode} from 'vite-plugin-qrcode'
import {viteSingleFile} from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), qrcode(), viteSingleFile()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
  server: {
    host: true,
    watch: {
      usePolling: true, // Regularly checks files for changes
    }
  }
})
