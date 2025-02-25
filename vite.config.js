// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  assetsInclude: ['**/*.xml'],
  base: "./",
  logLevel: 'warning',
  build: {
      assetsInlineLimit: 0, // Disables inlining completely
      rollupOptions: {
          output: {
              manualChunks: {
                  phaser: ['phaser']
              }
          }
      }
    }
})
