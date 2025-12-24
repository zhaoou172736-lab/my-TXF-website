import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 我们把 CSS 配置全删了，交给专门的文件去处理，这样就不会打架了
export default defineConfig({
  plugins: [react()],
  // 本地开发使用根路径，构建时会根据环境自动设置
  base: '/',
})