import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Disabling the public directory copying to the dist folder
  publicDir: false,
  main: {
    // Specify entry point for the main process
    entry: 'src/main/index.js'
    // Additional configurations for the main process build
  },
  preload: {
    // Specify entry point for the preload script
    input: 'src/preload/index.js',
    // Output path for the preload script within the renderer bundle
    output: 'preload.js'
    // Additional configurations for the preload script build
  },
  renderer: {
    plugins: [react()]
    // Other configurations for the renderer process
  },
  build: {
    rollupOptions: {
      output: {
        format: 'cjs'
      }
    }
  }
})
