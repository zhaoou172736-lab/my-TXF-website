import React, { useState, useEffect } from 'react';
import { FadeIn } from '../components/FadeIn';

const XiaofeiTopicReview: React.FC = () => {
  // 抖音主页数据状态
  const [douyinData, setDouyinData] = useState({
    avatar: '',
    nickname: '小肥同学',
    userId: '@xiaofei_topic',
    bio: '专注于短视频创作技巧分享，每日更新爆款内容分析，帮你快速涨粉变现',
    followers: '12.5w',
    likes: '328.6w',
    works: '156',
    videos: [1, 2, 3, 4, 5, 6]
  });
  
  // 加载状态
  const [loading, setLoading] = useState(false);
  
  // 抖音链接
  const douyinUrl = 'https://v.douyin.com/6qqS0vc5nYA/';
  
  // 使用模拟数据，确保页面能正常显示
  const fetchDouyinData = async () => {
    setLoading(true);
    try {
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟数据更新
      setDouyinData(prev => ({
        ...prev,
        // 模拟数据变化
        followers: (parseFloat(prev.followers) + 0.1).toFixed(1) + 'w',
        likes: (parseFloat(prev.likes) + 1.2).toFixed(1) + 'w',
        works: (parseInt(prev.works) + Math.floor(Math.random() * 3)).toString()
      }));
    } catch (error) {
      console.error('获取抖音数据失败:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // 定时获取数据（每30秒更新一次）
  useEffect(() => {
    // 初始加载
    fetchDouyinData();
    
    // 设置定时器，每30秒更新一次
    const interval = setInterval(() => {
      fetchDouyinData();
    }, 30000);
    
    // 清理定时器
    return () => clearInterval(interval);
  }, []);
  
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
          <div className="absolute inset-0 bg-black" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-white font-sans tracking-wide">
            小肥复盘
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">深入剖析爆款选题，总结创作经验，助你快速成长</p>
        </div>
      </section>

      {/* 2. 主要内容区域 - 个人IP和抖音主页并排 */}
      <section id="topic-review-features" className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* 左右并排布局 - 卡片大小一致 */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* 左侧 - 个人IP */}
            <div className="flex flex-col h-full">
              {/* 个人IP标题 - 居中 */}
              <FadeIn className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-normal text-white">个人IP</h2>
              </FadeIn>
              
              {/* 个人IP卡片 - 苹果17风格 */}
              <FadeIn className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl backdrop-blur-sm border border-gray-700 flex-grow">
                <h3 className="text-xl font-semibold mb-4 text-white">数据驱动</h3>
                <p className="text-gray-300 leading-relaxed">基于真实数据的深入分析，揭示爆款内容的内在规律</p>
              </FadeIn>
            </div>
            
            {/* 右侧 - 抖音主页 */}
            <div className="flex flex-col h-full">
              {/* 抖音主页标题 - 居中 */}
              <FadeIn delay={300} className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-normal text-white">抖音主页</h2>
              </FadeIn>
              
              {/* 抖音主页卡片 - 手机抖音风格 */}
              <FadeIn delay={300} className="bg-black p-6 rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl border border-gray-800 flex-grow relative overflow-hidden">
                {/* 抖音顶部状态栏 */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-black flex items-center justify-between px-4 z-20">
                  <div className="text-white text-xs">9:41</div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                  </div>
                </div>
                
                {/* 加载指示器 */}
                {loading && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-2xl z-50">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* 抖音主页内容 */}
                <div className="pt-4 space-y-6">
                  {/* 抖音个人信息 */}
                  <div className="flex flex-col items-center text-center">
                    {/* 头像 */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-1 mb-4 border-2 border-white/20">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">小</span>
                      </div>
                    </div>
                    
                    {/* 昵称和ID */}
                    <h3 className="text-xl font-medium text-white mb-1">{douyinData.nickname}</h3>
                    <p className="text-gray-400 text-sm mb-4">{douyinData.userId}</p>
                    
                    {/* 简介 */}
                    <p className="text-gray-300 leading-relaxed mb-6 text-sm max-w-md">
                      {douyinData.bio}
                    </p>
                    
                    {/* 关注按钮 - 抖音风格 */}
                    <button className="mb-6 px-10 py-2 bg-white text-black rounded-full text-sm font-medium transition-all hover:bg-gray-200">
                      关注
                    </button>
                    
                    {/* 数据统计 - 抖音风格 */}
                    <div className="flex gap-8 mb-6">
                      <div className="flex flex-col items-center">
                        <p className="text-white text-lg font-semibold">{douyinData.works}</p>
                        <p className="text-gray-400 text-xs mt-1">作品</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-white text-lg font-semibold">{douyinData.followers}</p>
                        <p className="text-gray-400 text-xs mt-1">粉丝</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-white text-lg font-semibold">{douyinData.likes}</p>
                        <p className="text-gray-400 text-xs mt-1">获赞</p>
                      </div>
                    </div>
                    
                    {/* 抖音导航栏 */}
                    <div className="flex w-full border-t border-gray-800 py-2">
                      <div className="flex-1 text-white font-medium text-center py-2 border-b-2 border-white">作品</div>
                      <div className="flex-1 text-gray-500 text-center py-2">喜欢</div>
                    </div>
                    
                    {/* 作品展示 - 抖音网格风格 */}
                    <div className="grid grid-cols-3 gap-1 w-full mt-2">
                      {douyinData.videos.map((item) => (
                        <div key={item} className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden group">
                          {/* 视频封面 */}
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-500 text-sm">作品{item}</span>
                          </div>
                          {/* 视频播放按钮 */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <div className="w-0 h-0 border-t-4 border-b-4 border-transparent border-r-6 border-white ml-1"></div>
                            </div>
                          </div>
                          {/* 视频点赞数 */}
                          <div className="absolute bottom-2 right-2 text-white text-xs flex items-center gap-1">
                            <span className="text-white">❤</span>
                            <span>{Math.floor(Math.random() * 1000)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                

              </FadeIn>
            </div>
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