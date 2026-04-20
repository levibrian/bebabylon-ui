import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'blog-dca': resolve(__dirname, 'blog/what-is-dca.html'),
        'blog-inflation': resolve(__dirname, 'blog/beat-inflation.html'),
        'blog-first-portfolio': resolve(__dirname, 'blog/first-portfolio.html'),
        brand: resolve(__dirname, 'brand.html'),
        wip: resolve(__dirname, 'wip.html'),
      },
    },
  },
})
