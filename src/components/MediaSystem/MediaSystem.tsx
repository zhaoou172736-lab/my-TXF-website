import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// 添加平滑滚动效果
if (typeof window !== 'undefined') {
  document.documentElement.style.scrollBehavior = 'smooth';
}

const MediaSystem: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 leading-relaxed tracking-wide">
      {/* 1. 自媒体系统 - 主区域 */}
      <section id="media-main" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/media-cover.svg"
            alt="自媒体系统"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 cursor-pointer" onClick={() => navigate(-1)} />
        </div>
        <div className="absolute inset-0 z-5 cursor-pointer" onClick={() => navigate(-1)} />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-white font-sans tracking-wide">
            <Link to="/media" className="text-white hover:text-blue-300 transition-colors">自媒体系统</Link>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">从 0 到 1 打造个人 IP，掌握流量密码</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/media" className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-sans font-normal rounded-md transition-colors border border-white/30 tracking-wide">
                免费试看
              </Link>
            <Link to="/media" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-normal rounded-md transition-colors inline-flex items-center tracking-wide">
                前往自媒体 <ChevronRight size={16} className="ml-2" />
              </Link>
          </div>
        </div>
      </section>

      {/* 2. 流量密码 - 独立区域 */}
      <section id="media-traffic" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/traffic-cover.svg"
            alt="流量密码"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-white font-sans tracking-wide">流量密码</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">掌握平台算法与内容传播规律，让你的作品脱颖而出</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/media" className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-sans font-normal rounded-md transition-colors border border-white/30 tracking-wide">
                免费试看
              </Link>
            <Link to="/media" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-normal rounded-md transition-colors inline-flex items-center tracking-wide">
                前往流量密码 <ChevronRight size={16} className="ml-2" />
              </Link>
          </div>
        </div>
      </section>

      {/* 3. 爆款逻辑 - 独立区域 */}
      <section id="media-viral" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/viral-cover.svg"
            alt="爆款逻辑"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-white font-sans tracking-wide">爆款逻辑</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">深入拆解不同类型爆款内容的创作规律与方法论</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/media" className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-sans font-normal rounded-md transition-colors border border-white/30 tracking-wide">
                免费试看
              </Link>
            <Link to="/media" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-normal rounded-md transition-colors inline-flex items-center tracking-wide">
                前往爆款逻辑 <ChevronRight size={16} className="ml-2" />
              </Link>
          </div>
        </div>
      </section>

      {/* 页脚区域 */}
      <footer className="bg-gray-900 text-white py-12 font-sans tracking-wide">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="mb-4 font-sans tracking-wide">© 2023 自媒体系统课程. 保留所有权利.</p>
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

export default MediaSystem;