import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../constants';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const currentData = HERO_SLIDES[activeSlide] || HERO_SLIDES[0];

  // ⏳ 自动轮播逻辑
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000); // 5000 毫秒 = 5 秒切换一次

    return () => clearInterval(interval); // 清理定时器
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans">
      
      {/* 1. 背景图片层 (改为图片，支持平滑淡入淡出) */}
      {HERO_SLIDES.map((slide: any, index: number) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img 
            src={slide.imageUrl} 
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* 遮罩层：让文字更清晰 */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>
      ))}

      {/* 2. 中间主要文字内容 (z-index 30 确保在图片上面) */}
      <div className="relative z-30 h-full flex flex-col justify-center items-center text-center px-4 pt-10">
            {/* key={activeSlide} 触发文字的重新动画 */}
            <div key={activeSlide} className="animate-fade-in-up flex flex-col items-center">
              
              <span className="mb-6 text-[15px] font-normal tracking-wide text-gray-200 border border-white/30 px-3 py-1 rounded-full backdrop-blur-sm">
                 {currentData.tag}
              </span>
              
              <h1 className="text-6xl md:text-[80px] font-normal text-white mb-6 tracking-tight drop-shadow-md flex items-center justify-center gap-2">
                {currentData.id === 'about' ? (
                  <>
                    关于唐小肥 <img src="/txf-text.svg" alt="TXF" className="h-16 w-auto" />
                  </>
                ) : (
                  currentData.title
                )}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-100 mb-10 font-light tracking-wide opacity-90">
                {currentData.subtitle}
              </p>
              
              <Link 
                to={
                  currentData.id === 'about' ? '/about' :
                  currentData.id === 'media' ? '/media' :
                  currentData.id === 'topic' ? '/topic' :
                  currentData.id === 'editing' ? '/editing' :
                  currentData.id === 'color' ? '/color-grading' :
                  currentData.id === 'cover' ? '/cover' :
                  currentData.id === 'support' ? '/services' :
                  '/' 
                } 
                className="group flex items-center gap-1 px-8 py-3 rounded-full border border-white/60 text-white text-[15px] font-medium transition-all hover:bg-white hover:text-black hover:border-white"
              >
                {currentData.cta} 
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

      {/* 3. 左下角导航列表 (点击可切换) */}
      <div className="absolute bottom-16 left-8 md:left-20 z-40">
        <div className="flex flex-col gap-5">
          {HERO_SLIDES.map((slide: any, index: number) => (
            <div 
              key={slide.id}
              onClick={() => setActiveSlide(index)}
              className="group flex items-center gap-4 cursor-pointer"
            >
              {/* 竖线指示器：选中变白，未选中透明 */}
              <div className={`h-8 w-[3px] transition-all duration-300 ${
                activeSlide === index ? 'bg-white' : 'bg-white/20 group-hover:bg-white/50'
              }`} />
              
              {/* 文字：选中变亮 */}
              <span className={`text-[15px] transition-all duration-300 ${
                activeSlide === index 
                  ? 'text-white font-medium translate-x-1' 
                  : 'text-white/50 font-light group-hover:text-white group-hover:translate-x-1'
              }`}>
                {slide.label}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
