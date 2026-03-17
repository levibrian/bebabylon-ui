import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'blog-dca': resolve(__dirname, 'blog/what-is-dca.html'),
      },
    },
  },
})
