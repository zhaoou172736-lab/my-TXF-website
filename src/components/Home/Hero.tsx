import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../../constants';
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
      {HERO_SLIDES.map((slide, index) => (
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
                {currentData.title}
                {currentData.id === 'about' && (
                  <svg 
                    viewBox="805 1451 2510 1190" 
                    className="w-auto text-white flex-shrink-0" // 移除固定尺寸，让LOGO自适应
                    style={{ 
                      height: '0.7em', // 使用0.7em使LOGO比文字小一些
                      verticalAlign: 'middle', // 垂直居中对齐
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <path d="M 805.0 1451.0 822.0 1556.0 900.0 1655.0 1005.0 1701.0 1167.0 1708.0 1201.0 1726.0 1229.0 1766.0 1235.0 2638.0 1419.0 2634.0 1462.0 2605.0 1488.0 2553.0 1487.0 1787.0 1520.0 1726.0 1586.0 1701.0 1642.0 1706.0 1685.0 1735.0 1887.0 2034.0 1497.0 2638.0 1690.0 2638.0 1797.0 2597.0 1865.0 2528.0 2040.0 2258.0 2258.0 2564.0 2338.0 2622.0 2416.0 2637.0 2417.0 2366.0 2190.0 2034.0 2507.0 1558.0 2575.0 1495.0 2667.0 1451.0 2393.0 1452.0 2290.0 1487.0 2210.0 1556.0 2040.0 1809.0 1859.0 1546.0 1803.0 1498.0 1734.0 1465.0 1653.0 1451.0 Z" />
                    <path d="M 3311.0 1451.0 2758.0 1454.0 2692.0 1473.0 2638.0 1500.0 2583.0 1540.0 2527.0 1599.0 2478.0 1687.0 2457.0 1781.0 2457.0 2638.0 2552.0 2638.0 2594.0 2626.0 2645.0 2593.0 2686.0 2541.0 2702.0 2503.0 2709.0 2457.0 2711.0 2158.0 2955.0 2158.0 3001.0 2148.0 3072.0 2111.0 3117.0 2071.0 3151.0 2021.0 3168.0 1976.0 3173.0 1910.0 2712.0 1911.0 2710.0 1796.0 2733.0 1744.0 2764.0 1717.0 2806.0 1704.0 3088.0 1704.0 3124.0 1698.0 3179.0 1676.0 3237.0 1634.0 3279.0 1583.0 3304.0 1524.0 Z" />
                  </svg>
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
          {HERO_SLIDES.map((slide, index) => (
            <div 
              key={slide.id}
              onClick={() => setActiveSlide(index)}
              className="group flex items-center gap-4 cursor-pointer"
            >
              {/* 竖线指示器：选中变白，未选中透明 */}
              <div className={`h-8 w-[3px] transition-all duration-300 ${activeSlide === index ? 'bg-white' : 'bg-white/20 group-hover:bg-white/50'}`} />
              
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