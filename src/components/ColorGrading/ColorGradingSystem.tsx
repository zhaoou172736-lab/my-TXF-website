import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// 添加平滑滚动效果
if (typeof window !== 'undefined') {
  document.documentElement.style.scrollBehavior = 'smooth';
}

const ColorGradingSystem: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 leading-relaxed tracking-wide">
      {/* 1. 调色系统 - 主区域 */}
      <section id="color-main" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/color-cover.svg"
            alt="调色系统"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Link to="/color-grading"><h1 className="text-4xl md:text-6xl font-normal text-white mb-6 leading-tight hover:text-blue-300 transition-colors font-sans tracking-wide">调色系统</h1></Link>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">专业系统化课程，赋能内容创作</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-sans font-normal rounded-md transition-colors border border-white/30 tracking-wide">
              免费试看
            </button>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-normal rounded-md transition-colors inline-flex items-center tracking-wide">
              前往调色 <ChevronRight size={16} className="ml-2 inline" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. 调色原理 - 独立区域 */}
      <section id="color-theory" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/color-theory-cover.svg"
            alt="调色原理"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-white font-sans tracking-wide">调色原理</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">掌握色彩理论基础与专业调色流程，从技术到艺术的全面提升</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-sans font-normal rounded-md transition-colors border border-white/30 tracking-wide">
              免费试看
            </button>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-normal rounded-md transition-colors inline-flex items-center tracking-wide">
              前往调色原理 <ChevronRight size={16} className="ml-2 inline" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. LUTs预设 - 独立区域 */}
      <section id="color-luts" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/luts-cover.svg"
            alt="LUTs预设"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-white font-sans tracking-wide">LUTs预设</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">专业级调色预设，一键实现电影级画面风格</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-sans font-normal rounded-md transition-colors border border-white/30 tracking-wide">
              免费试看
            </button>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-normal rounded-md transition-colors inline-flex items-center tracking-wide">
              前往LUTs预设 <ChevronRight size={16} className="ml-2 inline" />
            </button>
          </div>
        </div>
      </section>

      {/* 页脚区域 */}
      <footer className="bg-gray-900 text-white py-12 font-sans tracking-wide">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="mb-4 font-sans tracking-wide">© 2023 调色系统课程. 保留所有权利.</p>
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

export default ColorGradingSystem;