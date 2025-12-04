import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// 添加平滑滚动效果
if (typeof window !== 'undefined') {
  document.documentElement.style.scrollBehavior = 'smooth';
}

const CoverSystem: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 leading-relaxed tracking-wide">
      {/* 1. 封面系统 - 主区域 */}
      <section id="cover-main" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/cover-cover.svg"
            alt="封面系统"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 cursor-pointer" onClick={() => navigate(-1)} />
        </div>
        <div className="absolute inset-0 z-5 cursor-pointer" onClick={() => navigate(-1)} />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-white font-sans tracking-wide">
            <Link to="/cover" className="text-white hover:text-blue-300 transition-colors">封面系统</Link>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">一眼入魂的视觉设计，提升点击率的核心</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cover" className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-sans font-normal rounded-md transition-colors border border-white/30 tracking-wide">
                免费试看
              </Link>
            <Link to="/cover" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-normal rounded-md transition-colors inline-flex items-center tracking-wide">
                前往封面 <ChevronRight size={16} className="ml-2" />
              </Link>
          </div>
        </div>
      </section>

      {/* 2. PS模板 - 独立区域 */}
      <section id="cover-ps" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/ps-templates-cover.svg"
            alt="PS模板"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-white font-sans tracking-wide">PS 模板</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">专业设计模板，一键生成高点击封面</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cover" className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-sans font-normal rounded-md transition-colors border border-white/30 tracking-wide">
                免费试看
              </Link>
            <Link to="/cover" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-normal rounded-md transition-colors inline-flex items-center tracking-wide">
                前往PS模板 <ChevronRight size={16} className="ml-2" />
              </Link>
          </div>
        </div>
      </section>

      {/* 3. 爆款字体 - 独立区域 */}
      <section id="cover-fonts" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/fonts-cover.svg"
            alt="爆款字体"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-white font-sans tracking-wide">爆款字体</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">精选高辨识度字体，打造独特视觉风格</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cover" className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-sans font-normal rounded-md transition-colors border border-white/30 tracking-wide">
                免费试看
              </Link>
            <Link to="/cover" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-normal rounded-md transition-colors inline-flex items-center tracking-wide">
                前往爆款字体 <ChevronRight size={16} className="ml-2" />
              </Link>
          </div>
        </div>
      </section>

      {/* 页脚区域 */}
      <footer className="bg-gray-900 text-white py-12 font-sans tracking-wide">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="mb-4 font-sans tracking-wide">© 2023 封面系统资源. 保留所有权利.</p>
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

export default CoverSystem;