import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'apps/web/src/index.css'),
      },
      output: {
        assetFileNames: '[name].[ext]',
        dir: resolve(__dirname, 'apps/web/dist')
      }
    },
  },
})
