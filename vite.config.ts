import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 生产（GitHub Pages 子路径）用 /ink-code/，本地 dev 用根路径
  base: process.env.NODE_ENV === 'production' ? '/ink-code/' : '/',
  plugins: [react()],
})
