import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// 个人简介数据
const personalInfo = {
  name: '唐小肥',
  title: '自媒体内容创作专家 | 视频剪辑师',
  bio: '拥有8年自媒体运营经验，专注于内容创作、视频剪辑与色彩调校。曾为超过50家企业提供内容营销解决方案，累计创作视频内容超过1000小时，全网粉丝总量突破500万。',
  expertise: [
    '视频剪辑与后期制作',
    '色彩分级与调色技术',
    '内容策划与脚本撰写',
    '自媒体运营与变现',
    '短视频平台算法研究'
  ]
};

// 经历数据
const experiences = [
  {
    year: '2020-至今',
    title: '独立内容创作者',
    description: '运营个人自媒体账号，专注于分享视频剪辑技巧与色彩理论，累计获得超过100万粉丝关注。'
  },
  {
    year: '2018-2020',
    title: '视频制作总监',
    description: '某知名MCN机构担任视频制作总监，带领20人团队完成日常内容创作与制作。'
  },
  {
    year: '2015-2018',
    title: '后期剪辑师',
    description: '电视台担任后期剪辑师，参与多档综艺节目后期制作工作。'
  }
];

// 作品数据
const works = [
  {
    title: '《剪辑大师课》系列教程',
    description: '系统讲解Premiere Pro与DaVinci Resolve剪辑技巧，累计播放量超500万',
    image: '/about.svg'
  },
  {
    title: '《电影感调色》实战课程',
    description: '从理论到实践的色彩分级教程，帮助学员掌握专业调色技巧',
    image: '/about.svg'
  },
  {
    title: '《爆款内容创作心法》',
    description: '分享自媒体内容创作方法论，帮助创作者提升内容质量与传播力',
    image: '/about.svg'
  }
];

const AboutTangXiaofei: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 头部英雄区域 */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/about.svg"
            alt="关于唐小肥"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* 文字和LOGO，移除红框 */}
          <div className="inline-block px-8 py-4 mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight flex items-center justify-center gap-2">
              关于唐小肥
              <svg 
                viewBox="805 1451 2510 1190" 
                className="w-auto text-white flex-shrink-0" 
                style={{ 
                  height: '0.7em', 
                  verticalAlign: 'middle', 
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
              >
                <path d="M 805.0 1451.0 822.0 1556.0 900.0 1655.0 1005.0 1701.0 1167.0 1708.0 1201.0 1726.0 1229.0 1766.0 1235.0 2638.0 1419.0 2634.0 1462.0 2605.0 1488.0 2553.0 1487.0 1787.0 1520.0 1726.0 1586.0 1701.0 1642.0 1706.0 1685.0 1735.0 1887.0 2034.0 1497.0 2638.0 1690.0 2638.0 1797.0 2597.0 1865.0 2528.0 2040.0 2258.0 2258.0 2564.0 2338.0 2622.0 2416.0 2637.0 2417.0 2366.0 2190.0 2034.0 2507.0 1558.0 2575.0 1495.0 2667.0 1451.0 2393.0 1452.0 2290.0 1487.0 2210.0 1556.0 2040.0 1809.0 1859.0 1546.0 1803.0 1498.0 1734.0 1465.0 1653.0 1451.0 Z" />
                <path d="M 3311.0 1451.0 2758.0 1454.0 2692.0 1473.0 2638.0 1500.0 2583.0 1540.0 2527.0 1599.0 2478.0 1687.0 2457.0 1781.0 2457.0 2638.0 2552.0 2638.0 2594.0 2626.0 2645.0 2593.0 2686.0 2541.0 2702.0 2503.0 2709.0 2457.0 2711.0 2158.0 2955.0 2158.0 3001.0 2148.0 3072.0 2111.0 3117.0 2071.0 3151.0 2021.0 3168.0 1976.0 3173.0 1910.0 2712.0 1911.0 2710.0 1796.0 2733.0 1744.0 2764.0 1717.0 2806.0 1704.0 3088.0 1704.0 3124.0 1698.0 3179.0 1676.0 3237.0 1634.0 3279.0 1583.0 3304.0 1524.0 Z" />
              </svg>
            </h1>
          </div>
          {/* 添加类似图一的小字 */}
          <p className="text-lg md:text-xl text-white mb-8 font-light tracking-wide">十年磨一剑，个人时间线</p>
          <div className="flex justify-center">
            <Link to="/about" className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors inline-flex items-center">
              了解更多 <ChevronRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* 个人简介部分 */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">个人简介</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">了解唐小肥的专业背景与技能特长</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {personalInfo.expertise.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 transition-transform hover:transform hover:scale-105">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-blue-600 font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">专业领域</h3>
                <p className="text-gray-600">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 经历部分 */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">职业经历</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">多年行业深耕，积累丰富实战经验</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {experiences.map((exp, index) => (
              <div key={index} className="group border border-gray-200 rounded-2xl overflow-hidden transition-all hover:shadow-xl">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{exp.year} - {exp.title}</h3>
                  <p className="text-gray-600 mb-4">{exp.description}</p>
                  <div className="text-sm text-gray-500">
                    <span>职业经历 #{index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 代表作品部分 */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">代表作品</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">精选优质内容，展示专业能力</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {works.map((work, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg transition-transform hover:-translate-y-2 duration-300">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{work.title}</h3>
                  <p className="text-white/90 mb-4">{work.description}</p>
                  <button className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md self-start hover:bg-blue-50 transition-colors">
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 页脚区域 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="mb-4">© 2023 唐小肥. 保留所有权利.</p>
            <div className="flex justify-center gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">使用条款</a>
              <a href="#" className="hover:text-white transition-colors">隐私政策</a>
              <a href="#" className="hover:text-white transition-colors">联系我们</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutTangXiaofei;