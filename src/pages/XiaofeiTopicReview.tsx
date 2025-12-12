import React from 'react';

const XiaofeiTopicReview: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* 1. 主区域：关于唐小肥 TXF */}
      <section id="about-txf" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-400" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-white font-sans tracking-wide">
            关于唐小肥 TXF
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">十年磨一剑，个人时间线</p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors">
            了解更多
          </button>
        </div>
      </section>

      {/* 2. 个人简介区域 */}
      <section id="personal-intro" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-normal text-center mb-12 text-gray-900">个人简介</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-center mb-16">
            了解唐小肥的专业背景与技能特长
          </p>
          
          {/* 个人简介内容 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 左侧：简介文本 */}
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                唐小肥，专注于短视频创作技巧分享，每日更新爆款内容分析，帮你快速涨粉变现。
              </p>
              <p className="text-gray-600 leading-relaxed">
                拥有丰富的短视频创作经验，深入了解抖音、快手等平台的算法机制，擅长数据分析和内容优化。
              </p>
              <p className="text-gray-600 leading-relaxed">
                累计帮助上百位创作者实现粉丝增长和变现，形成了一套完整的短视频创作方法论。
              </p>
            </div>
            
            {/* 右侧：数据统计 */}
            <div className="space-y-8">
              {/* 数据卡片 */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                  <p className="text-3xl font-bold text-gray-900">10+</p>
                  <p className="text-gray-600 text-sm mt-2">年创作经验</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                  <p className="text-3xl font-bold text-gray-900">100+</p>
                  <p className="text-gray-600 text-sm mt-2">合作创作者</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                  <p className="text-3xl font-bold text-gray-900">10w+</p>
                  <p className="text-gray-600 text-sm mt-2">累计指导粉丝</p>
                </div>
              </div>
              
              {/* 技能标签 */}
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm">短视频创作</span>
                <span className="bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm">数据分析</span>
                <span className="bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full text-sm">算法研究</span>
                <span className="bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm">内容优化</span>
                <span className="bg-red-100 text-red-800 px-4 py-1.5 rounded-full text-sm">变现策略</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default XiaofeiTopicReview;