import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { eslint } from "rollup-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint()
  ],
  server: {
    // host: '0.0.0.0',
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
