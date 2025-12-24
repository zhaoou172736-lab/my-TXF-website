import React from 'react';
import { ChevronRight } from 'lucide-react';

// 添加平滑滚动效果
if (typeof window !== 'undefined') {
  document.documentElement.style.scrollBehavior = 'smooth';
}

const TopicSystem: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 leading-relaxed tracking-wide">
      {/* 1. 选题系统 - 主区域 */}
      <section id="topic-main" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/topic-system-cover.svg"
            alt="选题系统"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 cursor-pointer" onClick={() => window.history.back()} />
        </div>
        <div className="absolute inset-0 z-5 cursor-pointer" onClick={() => window.history.back()} />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-white font-sans tracking-wide">
            <a href="/topic" target="_blank" className="text-white hover:text-blue-300 transition-colors">选题系统</a>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">精准选题，把握流量密码，打造爆款内容</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/topic" target="_blank" className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-sans font-normal rounded-md transition-colors border border-white/30 tracking-wide">
                免费试看
              </a>
            <button 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-normal rounded-md transition-colors inline-flex items-center tracking-wide cursor-pointer"
              onClick={() => {
                // 跳转到选题系统的详情页面
                window.location.href = '/topic';
              }}
            >
                前往选题 <ChevronRight size={16} className="ml-2" />
              </button>
          </div>
        </div>
      </section>

      {/* 2. 剧本打造 - 作为选题系统的一部分 */}
      <section id="topic-creating" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/topic-skills-cover.svg"
            alt="剧本打造"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-white font-sans tracking-wide">剧本打造</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">掌握专业的剧本创作技巧，打造引人入胜的内容</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/topic" target="_blank" className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-sans font-normal rounded-md transition-colors border border-white/30 tracking-wide">
                免费试看
              </a>
            <button 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-normal rounded-md transition-colors inline-flex items-center tracking-wide cursor-pointer"
              onClick={() => {
                // 跳转到剧本创作页面或相关功能
                alert('剧本创作功能正在开发中，敬请期待！');
                // 或者跳转到合适的页面
                // window.location.href = '/topic-creating';
              }}
            >
                前往创作 <ChevronRight size={16} className="ml-2" />
              </button>
          </div>
        </div>
      </section>

      {/* 3. 博主拆解 - 新增的section */}
      <section id="topic-blogger" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/topic-skills-cover.svg"
            alt="博主拆解"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-white font-sans tracking-wide">博主拆解</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">深入分析优秀博主的创作模式，学习成功经验</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/topic" target="_blank" className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-sans font-normal rounded-md transition-colors border border-white/30 tracking-wide">
                免费试看
              </a>
            <button 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-normal rounded-md transition-colors inline-flex items-center tracking-wide cursor-pointer"
              onClick={() => {
                // 跳转到小肥复盘页面，传递博主拆解的参数
                window.location.href = '/topic-review?type=blogger';
              }}
            >
                查看拆解 <ChevronRight size={16} className="ml-2" />
              </button>
          </div>
        </div>
      </section>

      {/* 页脚区域 */}
      <footer className="bg-gray-900 text-white py-12 font-sans tracking-wide">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="mb-4 font-sans tracking-wide">© 2023 选题系统课程. 保留所有权利.</p>
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

export default TopicSystem;