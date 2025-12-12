import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 我们把 CSS 配置全删了，交给专门的文件去处理，这样就不会打架了
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 配置：base路径为仓库名称
  base: '/MyDJI/',
})