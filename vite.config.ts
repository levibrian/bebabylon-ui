import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@babylon/tokens/css': resolve(__dirname, '../babylon-tokens/dist/tokens.css'),
      '@babylon/tokens/tailwind': resolve(__dirname, '../babylon-tokens/dist/tailwind.tokens.js'),
      '@babylon/tokens': resolve(__dirname, '../babylon-tokens/dist/tailwind.tokens.js'),
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'blog-dca': resolve(__dirname, 'blog/what-is-dca.html'),
        'blog-inflation': resolve(__dirname, 'blog/beat-inflation.html'),
        'blog-first-portfolio': resolve(__dirname, 'blog/first-portfolio.html'),
      },
    },
  },
})
