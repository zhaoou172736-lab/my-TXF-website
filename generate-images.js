import fs from 'fs';
import path from 'path';

// 创建图片目录（如果不存在）
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// 图片配置：名称和对应显示文本
const imageConfigs = [
  { name: 'about', text: '关于唐小肥' },
  { name: 'media', text: '自媒体系统' },
  { name: 'editing', text: '剪辑系统' },
  { name: 'color', text: '调色系统' },
  { name: 'cover', text: '封面系统' },
  { name: 'support', text: '服务与支持' },
];

// 生成SVG图片
imageConfigs.forEach(({ name, text }) => {
  const svgContent = `
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <!-- 背景渐变 -->
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a1a2e" />
      <stop offset="100%" stop-color="#16213e" />
    </linearGradient>
  </defs>
  
  <!-- 背景矩形 -->
  <rect width="100%" height="100%" fill="url(#bgGradient)" />
  
  <!-- 装饰圆形 -->
  <circle cx="200" cy="200" r="150" fill="rgba(255,255,255,0.1)" />
  <circle cx="1000" cy="600" r="200" fill="rgba(46, 213, 115, 0.1)" />
  
  <!-- 文本内容已移除 -->

    <!-- 底部水印已移除 -->
  
</svg>
  `;

  // 写入SVG文件
  const filePath = path.join(publicDir, `${name}.svg`);
  fs.writeFileSync(filePath, svgContent.trim());
  console.log(`生成图片: ${filePath}`);
});

console.log('所有图片生成完成！');
