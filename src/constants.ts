// src/constants.ts

export const MENU_DATA = [
  { label: '关于唐小肥', href: '/about' },
  { label: '自媒体系统', href: '/media', children: [{ label: '流量密码', href: '/media#media-traffic' }, { label: '爆款逻辑', href: '/media#media-viral' }] },
  { label: '选题系统', href: '/topic', children: [{ label: '选题技巧', href: '/topic#topic-skills' }, { label: '剧本打造', href: '/topic#topic-creating' }, { label: '博主拆解', href: '/topic#topic-blogger' }] },
  { label: '剪辑系统', href: '/editing', children: [{ label: '剪映实操', href: '/editing#editing-capcut' }, { label: 'PR 进阶', href: '/editing#editing-pr' }] },
  { label: '调色系统', href: '/color-grading', children: [{ label: '调色原理', href: '/color-grading#color-theory' }, { label: 'LUTs 预设', href: '/color-grading#color-luts' }] },
  { label: '封面系统', href: '/cover', children: [{ label: 'PS 模板', href: '/cover#cover-ps' }, { label: '爆款字体', href: '/cover#cover-fonts' }] },
  { label: '小肥复盘', href: '/topic-review' },
  { label: '工具', href: '/tools', children: [{ label: '创作工具', href: '/tools#tools-creative' }, { label: '数据分析', href: '/tools#tools-data' }, { label: '游戏设计工具', href: '/game-design' }] },
  { label: '服务与支持', href: '/services', children: [{ label: '联系我们', href: '/services' }, { label: '加入社群', href: '/services' }] },
];

// 这里的顺序已经调整为：关于 -> 自媒体 -> 选题 -> 剪辑 -> 调色 -> 封面 -> 服务
// 图片链接已改为本地 '/bg.jpg'
export const HERO_SLIDES = [
  {
    id: 'about',
    tag: '个人介绍',
    label: '关于唐小肥',
    title: '关于唐小肥',
    subtitle: '十年磨一剑，个人IP时间线',
    cta: '了解更多',
    // 确保你的 public 文件夹里有 bg.jpg
    imageUrl: '/about.svg',
  },
  {
    id: 'media',
    tag: '全案教学',
    label: '自媒体系统',
    title: '自媒体系统',
    subtitle: '从 0 到 1 打造个人 IP，掌握流量密码',
    cta: '探索课程',
    imageUrl: '/media.svg',
  },
  {
    id: 'topic',
    tag: '内容策划',
    label: '选题系统',
    title: '选题系统',
    subtitle: '精准选题，把握流量密码，打造爆款内容',
    cta: '学习选题',
    imageUrl: '/media.svg',
  },
  {
    id: 'editing',
    tag: '后期制作',
    label: '剪辑系统',
    title: '剪辑系统',
    subtitle: '像艺术家一样剪辑，让画面会说话',
    cta: '开始学习',
    imageUrl: '/editing.svg',
  },
  {
    id: 'color',
    tag: 'DJI 运载无人机',
    label: '调色系统',
    title: '调色系统',
    subtitle: '专业系统化课程，赋能内容创作',
    cta: '了解更多',
    imageUrl: '/color.svg',
  },
  {
    id: 'cover',
    tag: '视觉设计',
    label: '封面系统',
    title: '封面系统',
    subtitle: '一眼入魂的视觉设计，提升点击率的核心',
    cta: '查看模板',
    imageUrl: '/cover.svg',
  },
  {
    id: 'support',
    tag: '客户服务',
    label: '服务与支持',
    title: '服务与支持',
    subtitle: '社群陪伴、答疑解惑，助你一路同行',
    cta: '联系我们',
    imageUrl: '/support.svg',
  },
];