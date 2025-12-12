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
  
  // 模拟获取抖音主页数据
  const fetchDouyinData = async () => {
    setLoading(true);
    try {
      // 这里是模拟数据，实际项目中需要后端服务来获取抖音数据
      // 抖音API需要授权，前端无法直接调用
      
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟数据更新（实际应该从API获取）
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

      {/* 2. 主要内容区域 - 个人IP和品宣获客并排 */}
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
              <FadeIn delay={200} className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl backdrop-blur-sm border border-gray-700 flex-grow relative">
                {/* 加载指示器 */}
                {loading && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-50">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                
                <div className="space-y-8">
                  {/* 个人IP信息 */}
                  <div className="flex flex-col items-center text-center">
                    {/* 头像 */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-1 mb-4">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">数</span>
                      </div>
                    </div>
                    
                    {/* 昵称和ID */}
                    <h3 className="text-2xl font-semibold text-white mb-1">数据驱动</h3>
                    <p className="text-gray-400 text-sm mb-4">@data_driven_content</p>
                    
                    {/* 抖音链接 */}
                    <a 
                      href="https://v.douyin.com/6qqS0vc5nYA/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm mb-4 transition-colors"
                    >
                      访问个人IP主页
                    </a>
                    
                    {/* 简介 */}
                    <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                      基于真实数据的深入分析，揭示爆款内容的内在规律，帮你快速掌握创作技巧
                    </p>
                    
                    {/* 数据统计 */}
                    <div className="flex gap-8 mb-6">
                      <div>
                        <p className="text-white text-xl font-semibold">10.2w</p>
                        <p className="text-gray-400 text-sm">分析案例</p>
                      </div>
                      <div>
                        <p className="text-white text-xl font-semibold">256.3w</p>
                        <p className="text-gray-400 text-sm">阅读量</p>
                      </div>
                      <div>
                        <p className="text-white text-xl font-semibold">89</p>
                        <p className="text-gray-400 text-sm">方法论</p>
                      </div>
                    </div>
                    
                    {/* 手动刷新按钮 */}
                    <button 
                      onClick={fetchDouyinData}
                      disabled={loading}
                      className="mb-6 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {loading ? '刷新中...' : '刷新数据'}
                    </button>
                    
                    {/* 作品展示 */}
                    <div className="grid grid-cols-3 gap-4 w-full">
                      {douyinData.videos.map((item) => (
                        <div key={item} className="aspect-square bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                          <span className="text-gray-500">作品{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
            
            {/* 右侧 - 抖音主页 */}
            <div className="flex flex-col h-full">
              {/* 品宣获客标题 - 居中 */}
              <FadeIn delay={300} className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-normal text-white">品宣获客</h2>
              </FadeIn>
              
              {/* 抖音主页卡片 - 苹果17风格 */}
              <FadeIn delay={300} className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl backdrop-blur-sm border border-gray-700 flex-grow relative">
                {/* 加载指示器 */}
                {loading && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-50">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                
                <div className="space-y-8">
                  {/* 抖音个人信息 */}
                  <div className="flex flex-col items-center text-center">
                    {/* 头像 */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-1 mb-4">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">小</span>
                      </div>
                    </div>
                    
                    {/* 昵称和ID */}
                    <h3 className="text-2xl font-semibold text-white mb-1">{douyinData.nickname}</h3>
                    <p className="text-gray-400 text-sm mb-4">{douyinData.userId}</p>
                    
                    {/* 抖音链接 */}
                    <a 
                      href={douyinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm mb-4 transition-colors"
                    >
                      访问抖音主页
                    </a>
                    
                    {/* 简介 */}
                    <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                      {douyinData.bio}
                    </p>
                    
                    {/* 数据统计 */}
                    <div className="flex gap-8 mb-6">
                      <div>
                        <p className="text-white text-xl font-semibold">{douyinData.followers}</p>
                        <p className="text-gray-400 text-sm">粉丝</p>
                      </div>
                      <div>
                        <p className="text-white text-xl font-semibold">{douyinData.likes}</p>
                        <p className="text-gray-400 text-sm">获赞</p>
                      </div>
                      <div>
                        <p className="text-white text-xl font-semibold">{douyinData.works}</p>
                        <p className="text-gray-400 text-sm">作品</p>
                      </div>
                    </div>
                    
                    {/* 手动刷新按钮 */}
                    <button 
                      onClick={fetchDouyinData}
                      disabled={loading}
                      className="mb-6 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {loading ? '刷新中...' : '刷新数据'}
                    </button>
                    
                    {/* 作品展示 */}
                    <div className="grid grid-cols-3 gap-4 w-full">
                      {douyinData.videos.map((item) => (
                        <div key={item} className="aspect-square bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                          <span className="text-gray-500">作品{item}</span>
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


    </div>
  );
};

export default XiaofeiTopicReview;