import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const XiaofeiTopicReview: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* 1. 小肥复盘 - 主区域 */}
      <section id="topic-review-main" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/topic-review-cover.svg"
            alt="小肥复盘"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-white font-sans tracking-wide">
            小肥复盘
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">深入剖析爆款选题，总结创作经验，助你快速成长</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/topic-review" className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-sans font-normal rounded-md transition-colors border border-white/30 tracking-wide">
                免费试看
              </Link>
            <Link to="/topic-review" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-normal rounded-md transition-colors inline-flex items-center tracking-wide">
                查看复盘 <ChevronRight size={16} className="ml-2" />
              </Link>
          </div>
        </div>
      </section>

      {/* 2. 复盘内容区域 */}
      <section id="topic-review-content" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-normal mb-16 text-center">近期复盘</h2>
          </FadeIn>
          
          <div className="space-y-12">
            {/* 复盘项 1 */}
            <FadeIn delay={200} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold mb-3 md:mb-0">如何打造百万播放量的科普视频</h3>
                  <span className="text-sm text-gray-500">2023-12-01</span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  本复盘详细分析了近期一条百万播放量科普视频的成功要素，包括选题方向、内容结构、剪辑节奏和标题封面设计等关键环节。
                </p>
                <Link to="/topic-review#detail-1" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                  查看完整复盘 <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </FadeIn>
            
            {/* 复盘项 2 */}
            <FadeIn delay={300} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold mb-3 md:mb-0">情感类内容的爆款逻辑</h3>
                  <span className="text-sm text-gray-500">2023-11-25</span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  通过对多条情感类爆款视频的拆解，总结出情感共鸣的核心触发点和内容创作的方法论，帮助你掌握情感类内容的创作技巧。
                </p>
                <Link to="/topic-review#detail-2" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                  查看完整复盘 <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </FadeIn>
            
            {/* 复盘项 3 */}
            <FadeIn delay={400} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold mb-3 md:mb-0">短视频标题的黄金法则</h3>
                  <span className="text-sm text-gray-500">2023-11-20</span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  分析了100条爆款短视频的标题结构，总结出能够提高点击率的标题模板和创作技巧，让你的视频在海量内容中脱颖而出。
                </p>
                <Link to="/topic-review#detail-3" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                  查看完整复盘 <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. 复盘特色区域 */}
      <section id="topic-review-features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-normal mb-6">复盘特色</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">专业、深入、实用的复盘内容，助你快速提升创作能力</p>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={200} className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-blue-600 text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">数据驱动</h3>
              <p className="text-gray-600 leading-relaxed">基于真实数据的深入分析，揭示爆款内容的内在规律</p>
            </FadeIn>
            
            <FadeIn delay={300} className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-green-600 text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">经验总结</h3>
              <p className="text-gray-600 leading-relaxed">分享实战经验和创作技巧，让你少走弯路，快速成长</p>
            </FadeIn>
            
            <FadeIn delay={400} className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-purple-600 text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">实用落地</h3>
              <p className="text-gray-600 leading-relaxed">提供可操作的方法和模板，让你能够直接应用到自己的创作中</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 页脚区域 */}
      <footer className="bg-gray-900 text-white py-12 font-sans tracking-wide">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="mb-4 font-sans tracking-wide">© 2023 小肥复盘. 保留所有权利.</p>
            <div className="flex justify-center gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors font-sans tracking-wide">使用条款</a>
              <a href="#" className="hover:text-white transition-colors font-sans tracking-wide">隐私政策</a>
              <a href="#" className="hover:text-white transition-colors font-sans tracking-wide">联系我们</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default XiaofeiTopicReview;