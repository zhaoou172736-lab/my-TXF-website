import React, { useState, useEffect, useRef } from 'react';
import { FadeIn } from '../components/FadeIn';
import { useSearchParams } from 'react-router-dom';

const XiaofeiTopicReview: React.FC = () => {
  // 获取URL参数
  const [searchParams] = useSearchParams();
  const workIdParam = searchParams.get('workId');
  const targetWorkId = workIdParam ? parseInt(workIdParam, 10) : undefined;
  const typeParam = searchParams.get('type');
  const isBloggerType = typeParam === 'blogger';
  
  // 博主照片状态 - 从localStorage读取持久化数据
  const [bloggerPhotos, setBloggerPhotos] = useState<{ [key: string]: string | null }>(() => {
    // 从localStorage读取博主照片数据
    const savedPhotos = localStorage.getItem('blogger_photos');
    return savedPhotos ? JSON.parse(savedPhotos) : {
      blogger1: null,
      blogger2: null,
      blogger3: null,
      blogger4: null,
      blogger5: null,
      blogger6: null
    };
  });
  
  // 保存博主照片到localStorage的辅助函数
  const saveBloggerPhotosToLocalStorage = (photos: { [key: string]: string | null }) => {
    try {
      localStorage.setItem('blogger_photos', JSON.stringify(photos));
    } catch (error) {
      console.error('保存博主照片到localStorage失败:', error);
    }
  };

  // 博主信息状态 - 包含标题、描述、粉丝数和作品数，从localStorage读取持久化数据
  const [bloggerInfo, setBloggerInfo] = useState<{
    [key: string]: {
      title: string;
      description: string;
      followers: string;
      works: string;
    }
  }>(() => {
    // 从localStorage读取博主信息数据
    const savedInfo = localStorage.getItem('blogger_info');
    if (savedInfo) {
      // 如果已有数据，确保包含新的博主4-6
      const parsedInfo = JSON.parse(savedInfo);
      return {
        // 保留已有数据
        ...parsedInfo,
        // 添加默认数据（如果不存在）
        blogger4: parsedInfo.blogger4 || {
          title: '旅行博主',
          description: '分享世界各地的旅行体验和攻略',
          followers: '98w',
          works: '2.8w'
        },
        blogger5: parsedInfo.blogger5 || {
          title: '健身博主',
          description: '提供专业的健身指导和健康生活方式建议',
          followers: '76w',
          works: '3.5w'
        },
        blogger6: parsedInfo.blogger6 || {
          title: '时尚博主',
          description: '分享最新的时尚趋势和穿搭技巧',
          followers: '112w',
          works: '2.9w'
        }
      };
    }
    // 默认数据
    return {
      blogger1: {
        title: '美妆博主',
        description: '专注于美妆教程和产品评测',
        followers: '125w',
        works: '3.2w'
      },
      blogger2: {
        title: '美食博主',
        description: '分享美食制作和探店经验',
        followers: '89w',
        works: '2.5w'
      },
      blogger3: {
        title: '科技博主',
        description: '专注于科技产品评测和技术分享',
        followers: '156w',
        works: '4.1w'
      },
      blogger4: {
        title: '旅行博主',
        description: '分享世界各地的旅行体验和攻略',
        followers: '98w',
        works: '2.8w'
      },
      blogger5: {
        title: '健身博主',
        description: '提供专业的健身指导和健康生活方式建议',
        followers: '76w',
        works: '3.5w'
      },
      blogger6: {
        title: '时尚博主',
        description: '分享最新的时尚趋势和穿搭技巧',
        followers: '112w',
        works: '2.9w'
      }
    };
  });
  
  // 保存博主信息到localStorage的辅助函数
  const saveBloggerInfoToLocalStorage = (info: typeof bloggerInfo) => {
    try {
      localStorage.setItem('blogger_info', JSON.stringify(info));
    } catch (error) {
      console.error('保存博主信息到localStorage失败:', error);
    }
  };

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
  
  // 头像上传状态 - 从localStorage读取持久化数据
  const [avatar, setAvatar] = useState<string>(() => {
    // 从localStorage读取头像数据
    const savedAvatar = localStorage.getItem('xiaofei_avatar');
    return savedAvatar || '';
  });
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 保存头像到localStorage的辅助函数
  const saveAvatarToLocalStorage = (avatarUrl: string) => {
    try {
      localStorage.setItem('xiaofei_avatar', avatarUrl);
      console.log('头像数据已保存到localStorage');
    } catch (error) {
      console.error('保存头像到localStorage失败:', error);
    }
  };
  
  // 作品数据状态管理 - 从localStorage读取持久化数据
  const [works, setWorks] = useState<Array<{
    id: number;
    image: string | null;
    uploadTime: number;
  }>>(() => {
    // 从localStorage读取数据，如果没有则使用默认值
    const savedWorks = localStorage.getItem('xiaofei_works');
    if (savedWorks) {
      try {
        return JSON.parse(savedWorks);
      } catch (error) {
        console.error('读取localStorage失败:', error);
      }
    }
    // 默认值
    return [
      { id: 1, image: null, uploadTime: Date.now() - 8 * 24 * 60 * 60 * 1000 },
      { id: 2, image: null, uploadTime: Date.now() - 7 * 24 * 60 * 60 * 1000 },
      { id: 3, image: null, uploadTime: Date.now() - 6 * 24 * 60 * 60 * 1000 },
      { id: 4, image: null, uploadTime: Date.now() - 5 * 24 * 60 * 60 * 1000 },
      { id: 5, image: null, uploadTime: Date.now() - 4 * 24 * 60 * 60 * 1000 },
      { id: 6, image: null, uploadTime: Date.now() - 3 * 24 * 60 * 60 * 1000 }
    ];
  });
  
  // 获取最大的作品ID
  const getMaxWorkId = () => {
    return Math.max(...works.map(work => work.id), 0);
  };
  
  // 保存作品数据到localStorage的辅助函数
  const saveWorksToLocalStorage = (updatedWorks: Array<{
    id: number;
    image: string | null;
    uploadTime: number;
  }>) => {
    try {
      localStorage.setItem('xiaofei_works', JSON.stringify(updatedWorks));
      console.log('作品数据已保存到localStorage');
    } catch (error) {
      console.error('保存localStorage失败:', error);
    }
  };
  
  // 加载状态
  const [loading] = useState(false);
  
  // 监听localStorage变化，确保数据同步
  useEffect(() => {
    const handleStorageChange = () => {
      const savedWorks = localStorage.getItem('xiaofei_works');
      if (savedWorks) {
        try {
          setWorks(JSON.parse(savedWorks));
        } catch (error) {
          console.error('读取localStorage失败:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // 头像上传处理
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件');
        return;
      }
      
      // 检查文件大小（限制10MB）
      if (file.size > 10 * 1024 * 1024) {
        alert('图片大小不能超过10MB');
        return;
      }
      
      // 生成预览URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const previewUrl = event.target?.result as string;
        setAvatar(previewUrl);
        // 保存到localStorage
        saveAvatarToLocalStorage(previewUrl);
        // 模拟上传过程
        uploadAvatar(previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // 模拟头像上传
  const uploadAvatar = async (previewUrl: string) => {
    setIsUploading(true);
    try {
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 这里可以添加真实的上传逻辑，比如调用后端API
      console.log('头像上传成功:', previewUrl);
      
      // 更新抖音数据中的头像
      setDouyinData(prev => ({
        ...prev,
        avatar: previewUrl
      }));
    } catch (error) {
      console.error('头像上传失败:', error);
      alert('头像上传失败，请重试');
    } finally {
      setIsUploading(false);
    }
  };

  // 点击头像触发文件选择
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // 作品图片上传处理 - 最新上传的作品放在最前面
  const handleWorkUpload = (e: React.ChangeEvent<HTMLInputElement>, workId: number) => {
    const file = e.target.files?.[0];
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件');
        return;
      }
      
      // 检查文件大小（限制10MB）
      if (file.size > 10 * 1024 * 1024) {
        alert('图片大小不能超过10MB');
        return;
      }
      
      // 生成预览URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const previewUrl = event.target?.result as string;
        const now = Date.now();
        
        // 更新作品列表：
        // 1. 找到当前作品
        // 2. 更新其图片和上传时间
        // 3. 按上传时间倒序排列，最新的在前面
        const updatedWorks = works.map(work => {
          if (work.id === workId) {
            return { ...work, image: previewUrl, uploadTime: now };
          }
          return work;
        }).sort((a, b) => b.uploadTime - a.uploadTime);
        
        // 更新状态
        setWorks(updatedWorks);
        // 保存到localStorage
        saveWorksToLocalStorage(updatedWorks);
        
        console.log(`上传了作品${workId}的图片，当前时间: ${now}`);
      };
      reader.readAsDataURL(file);
    }
  };

  // 删除作品图片
  const handleDeleteWork = (workId: number) => {
    // 确认删除操作
    if (window.confirm('确定要删除这张图片吗？')) {
      // 删除指定作品
      const updatedWorks = works.filter(work => work.id !== workId)
                                .sort((a, b) => b.uploadTime - a.uploadTime);
      
      // 更新状态
      setWorks(updatedWorks);
      // 保存到localStorage
      saveWorksToLocalStorage(updatedWorks);
      
      console.log(`删除了作品${workId}的图片`);
    }
  };

  // 查看复盘 - 跳转到本地飞书多维表格页面，只显示当前作品的数据
  const handleViewReview = (workId: number) => {
    // 使用React Router的navigate函数跳转到本地飞书多维表格页面，传递workId参数
    window.location.href = `/flybook-table?workId=${workId}`;
    console.log(`查看作品${workId}的复盘，跳转到本地飞书多维表格页面`);
  };

  // 新增作品功能
  const handleAddWork = () => {
    const newWorkId = getMaxWorkId() + 1;
    const now = Date.now();
    
    // 添加新作品到列表最前面
    const newWork = { id: newWorkId, image: null, uploadTime: now };
    const updatedWorks = [newWork, ...works];
    
    // 更新状态
    setWorks(updatedWorks);
    // 保存到localStorage
    saveWorksToLocalStorage(updatedWorks);
    
    // 同时更新douyinData的videos数组
    setDouyinData(prev => ({
      ...prev,
      videos: [newWorkId, ...prev.videos]
    }));
    
    console.log(`新增了作品${newWorkId}`);
  };
  
  // 根据URL参数过滤作品，如果有targetWorkId则只显示对应的作品
  const displayWorks = targetWorkId 
    ? works.filter(work => work.id === targetWorkId)
    : works;
  

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* 1. 主区域 - 根据类型显示不同标题 */}
      <section id="topic-review-main" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/topic-review-cover.svg"
            alt={isBloggerType ? "博主拆解" : "小肥复盘"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-white font-sans tracking-wide">
            {isBloggerType ? "博主拆解" : "小肥复盘"}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-sans leading-relaxed tracking-wide font-normal">
            {isBloggerType 
              ? "深入分析优秀博主的创作模式，学习成功经验" 
              : "深入剖析爆款选题，总结创作经验，助你快速成长"}
          </p>
        </div>
      </section>

      {/* 2. 主要内容区域 - 根据类型显示不同内容 */}
      <section id="topic-review-features" className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* 博主拆解类型 - 显示博主相关内容 */}
          {isBloggerType ? (
            <div className="space-y-12">
              {/* 博主拆解标题 */}
              <FadeIn className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-normal text-white">博主拆解</h2>
              </FadeIn>
              
              {/* 博主列表 - 卡片布局 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* 博主卡片 1 */}
                <FadeIn className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl backdrop-blur-sm border border-gray-700">
                  {/* 可上传照片的博主头像 */}
                  <div className="relative aspect-square rounded-xl mb-4 overflow-hidden group">
                    {/* 隐藏的文件输入 */}
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const imageUrl = event.target?.result as string;
                            const updatedPhotos = { ...bloggerPhotos, blogger1: imageUrl };
                            setBloggerPhotos(updatedPhotos);
                            saveBloggerPhotosToLocalStorage(updatedPhotos);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                      id="blogger1-upload"
                    />
                    
                    {/* 照片预览或默认背景 */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-800 relative cursor-pointer">
                      {bloggerPhotos.blogger1 ? (
                        <img
                          src={bloggerPhotos.blogger1}
                          alt="美妆博主"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div 
                          className="w-full h-full flex items-center justify-center"
                          onClick={() => document.getElementById('blogger1-upload')?.click()}
                        >
                          <span className="text-white text-6xl font-bold">博</span>
                        </div>
                      )}
                      
                      {/* 悬停操作工具栏 */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                        <div className="flex gap-4 mb-4">
                          {/* 上传图片按钮 */}
                          <button
                            className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/40 flex items-center justify-center transition-colors"
                            onClick={() => document.getElementById('blogger1-upload')?.click()}
                            title="上传图片"
                          >
                            <span className="text-white text-xl font-bold">+</span>
                          </button>
                          
                          {/* 删除图片按钮 */}
                          {bloggerPhotos.blogger1 && (
                            <button
                              className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/40 flex items-center justify-center transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                const updatedPhotos = { ...bloggerPhotos, blogger1: null };
                                setBloggerPhotos(updatedPhotos);
                                saveBloggerPhotosToLocalStorage(updatedPhotos);
                              }}
                              title="删除图片"
                            >
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 可编辑的博主标题 */}
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    <input
                      type="text"
                      value={bloggerInfo.blogger1.title}
                      onChange={(e) => {
                        const updatedInfo = {
                          ...bloggerInfo,
                          blogger1: {
                            ...bloggerInfo.blogger1,
                            title: e.target.value
                          }
                        };
                        setBloggerInfo(updatedInfo);
                        saveBloggerInfoToLocalStorage(updatedInfo);
                      }}
                      className="bg-transparent border-none outline-none w-full text-white"
                      placeholder="输入博主标题"
                    />
                  </h3>
                  
                  {/* 可编辑的博主描述 - 支持多行输入 */}
                  <p className="text-gray-400 text-sm mb-4">
                    <textarea
                      value={bloggerInfo.blogger1.description}
                      onChange={(e) => {
                        const updatedInfo = {
                          ...bloggerInfo,
                          blogger1: {
                            ...bloggerInfo.blogger1,
                            description: e.target.value
                          }
                        };
                        setBloggerInfo(updatedInfo);
                        saveBloggerInfoToLocalStorage(updatedInfo);
                      }}
                      className="bg-transparent border-none outline-none w-full text-gray-400 resize-none min-h-[100px]"
                      placeholder="输入博主描述（支持换行）"
                      rows={3}
                    />
                  </p>
                  
                  {/* 可编辑的博主数据 */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-white font-bold">
                        <input
                          type="text"
                          value={bloggerInfo.blogger1.followers}
                          onChange={(e) => {
                            const updatedInfo = {
                              ...bloggerInfo,
                              blogger1: {
                                ...bloggerInfo.blogger1,
                                followers: e.target.value
                              }
                            };
                            setBloggerInfo(updatedInfo);
                            saveBloggerInfoToLocalStorage(updatedInfo);
                          }}
                          className="bg-transparent border-none outline-none w-full text-white text-center"
                          placeholder="粉丝数"
                        />
                      </div>
                      <div className="text-gray-500 text-xs">粉丝</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-white font-bold">
                        <input
                          type="text"
                          value={bloggerInfo.blogger1.works}
                          onChange={(e) => {
                            const updatedInfo = {
                              ...bloggerInfo,
                              blogger1: {
                                ...bloggerInfo.blogger1,
                                works: e.target.value
                              }
                            };
                            setBloggerInfo(updatedInfo);
                            saveBloggerInfoToLocalStorage(updatedInfo);
                          }}
                          className="bg-transparent border-none outline-none w-full text-white text-center"
                          placeholder="作品数"
                        />
                      </div>
                      <div className="text-gray-500 text-xs">作品</div>
                    </div>
                  </div>
                  <button 
                    className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    onClick={() => window.location.href = `/blogger-detail/1`}
                  >
                    查看拆解
                  </button>
                </FadeIn>
                
                {/* 博主卡片 2 */}
                <FadeIn className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl backdrop-blur-sm border border-gray-700">
                  {/* 可上传照片的博主头像 */}
                  <div className="relative aspect-square rounded-xl mb-4 overflow-hidden group">
                    {/* 隐藏的文件输入 */}
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const imageUrl = event.target?.result as string;
                            const updatedPhotos = { ...bloggerPhotos, blogger2: imageUrl };
                            setBloggerPhotos(updatedPhotos);
                            saveBloggerPhotosToLocalStorage(updatedPhotos);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                      id="blogger2-upload"
                    />
                    
                    {/* 照片预览或默认背景 */}
                    <div className="w-full h-full bg-gradient-to-br from-green-900 to-green-800 relative cursor-pointer">
                      {bloggerPhotos.blogger2 ? (
                        <img
                          src={bloggerPhotos.blogger2}
                          alt="美食博主"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div 
                          className="w-full h-full flex items-center justify-center"
                          onClick={() => document.getElementById('blogger2-upload')?.click()}
                        >
                          <span className="text-white text-6xl font-bold">主</span>
                        </div>
                      )}
                      
                      {/* 悬停操作工具栏 */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                        <div className="flex gap-4 mb-4">
                          {/* 上传图片按钮 */}
                          <button
                            className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/40 flex items-center justify-center transition-colors"
                            onClick={() => document.getElementById('blogger2-upload')?.click()}
                            title="上传图片"
                          >
                            <span className="text-white text-xl font-bold">+</span>
                          </button>
                          
                          {/* 删除图片按钮 */}
                          {bloggerPhotos.blogger2 && (
                            <button
                              className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/40 flex items-center justify-center transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                const updatedPhotos = { ...bloggerPhotos, blogger2: null };
                                setBloggerPhotos(updatedPhotos);
                                saveBloggerPhotosToLocalStorage(updatedPhotos);
                              }}
                              title="删除图片"
                            >
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 可编辑的博主标题 */}
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    <input
                      type="text"
                      value={bloggerInfo.blogger2.title}
                      onChange={(e) => {
                        const updatedInfo = {
                          ...bloggerInfo,
                          blogger2: {
                            ...bloggerInfo.blogger2,
                            title: e.target.value
                          }
                        };
                        setBloggerInfo(updatedInfo);
                        saveBloggerInfoToLocalStorage(updatedInfo);
                      }}
                      className="bg-transparent border-none outline-none w-full text-white"
                      placeholder="输入博主标题"
                    />
                  </h3>
                  
                  {/* 可编辑的博主描述 - 支持多行输入 */}
                  <p className="text-gray-400 text-sm mb-4">
                    <textarea
                      value={bloggerInfo.blogger2.description}
                      onChange={(e) => {
                        const updatedInfo = {
                          ...bloggerInfo,
                          blogger2: {
                            ...bloggerInfo.blogger2,
                            description: e.target.value
                          }
                        };
                        setBloggerInfo(updatedInfo);
                        saveBloggerInfoToLocalStorage(updatedInfo);
                      }}
                      className="bg-transparent border-none outline-none w-full text-gray-400 resize-none min-h-[100px]"
                      placeholder="输入博主描述（支持换行）"
                      rows={5}
                    />
                  </p>
                  
                  {/* 可编辑的博主数据 */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-white font-bold">
                        <input
                          type="text"
                          value={bloggerInfo.blogger2.followers}
                          onChange={(e) => {
                            const updatedInfo = {
                              ...bloggerInfo,
                              blogger2: {
                                ...bloggerInfo.blogger2,
                                followers: e.target.value
                              }
                            };
                            setBloggerInfo(updatedInfo);
                            saveBloggerInfoToLocalStorage(updatedInfo);
                          }}
                          className="bg-transparent border-none outline-none w-full text-white text-center"
                          placeholder="粉丝数"
                        />
                      </div>
                      <div className="text-gray-500 text-xs">粉丝</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-white font-bold">
                        <input
                          type="text"
                          value={bloggerInfo.blogger2.works}
                          onChange={(e) => {
                            const updatedInfo = {
                              ...bloggerInfo,
                              blogger2: {
                                ...bloggerInfo.blogger2,
                                works: e.target.value
                              }
                            };
                            setBloggerInfo(updatedInfo);
                            saveBloggerInfoToLocalStorage(updatedInfo);
                          }}
                          className="bg-transparent border-none outline-none w-full text-white text-center"
                          placeholder="作品数"
                        />
                      </div>
                      <div className="text-gray-500 text-xs">作品</div>
                    </div>
                  </div>
                  <button 
                    className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    onClick={() => window.location.href = `/blogger-detail/2`}
                  >
                    查看拆解
                  </button>
                </FadeIn>
                
                {/* 博主卡片 3 */}
                <FadeIn className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl backdrop-blur-sm border border-gray-700">
                  {/* 可上传照片的博主头像 */}
                  <div className="relative aspect-square rounded-xl mb-4 overflow-hidden group">
                    {/* 隐藏的文件输入 */}
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const imageUrl = event.target?.result as string;
                            const updatedPhotos = { ...bloggerPhotos, blogger3: imageUrl };
                            setBloggerPhotos(updatedPhotos);
                            saveBloggerPhotosToLocalStorage(updatedPhotos);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                      id="blogger3-upload"
                    />
                    
                    {/* 照片预览或默认背景 */}
                    <div className="w-full h-full bg-gradient-to-br from-purple-900 to-purple-800 relative cursor-pointer">
                      {bloggerPhotos.blogger3 ? (
                        <img
                          src={bloggerPhotos.blogger3}
                          alt="科技博主"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div 
                          className="w-full h-full flex items-center justify-center"
                          onClick={() => document.getElementById('blogger3-upload')?.click()}
                        >
                          <span className="text-white text-6xl font-bold">拆</span>
                        </div>
                      )}
                      
                      {/* 悬停操作工具栏 */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                        <div className="flex gap-4 mb-4">
                          {/* 上传图片按钮 */}
                          <button
                            className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/40 flex items-center justify-center transition-colors"
                            onClick={() => document.getElementById('blogger3-upload')?.click()}
                            title="上传图片"
                          >
                            <span className="text-white text-xl font-bold">+</span>
                          </button>
                          
                          {/* 删除图片按钮 */}
                          {bloggerPhotos.blogger3 && (
                            <button
                              className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/40 flex items-center justify-center transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                const updatedPhotos = { ...bloggerPhotos, blogger3: null };
                                setBloggerPhotos(updatedPhotos);
                                saveBloggerPhotosToLocalStorage(updatedPhotos);
                              }}
                              title="删除图片"
                            >
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 可编辑的博主标题 */}
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    <input
                      type="text"
                      value={bloggerInfo.blogger3.title}
                      onChange={(e) => {
                        const updatedInfo = {
                          ...bloggerInfo,
                          blogger3: {
                            ...bloggerInfo.blogger3,
                            title: e.target.value
                          }
                        };
                        setBloggerInfo(updatedInfo);
                        saveBloggerInfoToLocalStorage(updatedInfo);
                      }}
                      className="bg-transparent border-none outline-none w-full text-white"
                      placeholder="输入博主标题"
                    />
                  </h3>
                  
                  {/* 可编辑的博主描述 - 支持多行输入 */}
                  <p className="text-gray-400 text-sm mb-4">
                    <textarea
                      value={bloggerInfo.blogger3.description}
                      onChange={(e) => {
                        const updatedInfo = {
                          ...bloggerInfo,
                          blogger3: {
                            ...bloggerInfo.blogger3,
                            description: e.target.value
                          }
                        };
                        setBloggerInfo(updatedInfo);
                        saveBloggerInfoToLocalStorage(updatedInfo);
                      }}
                      className="bg-transparent border-none outline-none w-full text-gray-400 resize-none min-h-[100px]"
                      placeholder="输入博主描述（支持换行）"
                      rows={5}
                    />
                  </p>
                  
                  {/* 可编辑的博主数据 */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-white font-bold">
                        <input
                          type="text"
                          value={bloggerInfo.blogger3.followers}
                          onChange={(e) => {
                            const updatedInfo = {
                              ...bloggerInfo,
                              blogger3: {
                                ...bloggerInfo.blogger3,
                                followers: e.target.value
                              }
                            };
                            setBloggerInfo(updatedInfo);
                            saveBloggerInfoToLocalStorage(updatedInfo);
                          }}
                          className="bg-transparent border-none outline-none w-full text-white text-center"
                          placeholder="粉丝数"
                        />
                      </div>
                      <div className="text-gray-500 text-xs">粉丝</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-white font-bold">
                        <input
                          type="text"
                          value={bloggerInfo.blogger3.works}
                          onChange={(e) => {
                            const updatedInfo = {
                              ...bloggerInfo,
                              blogger3: {
                                ...bloggerInfo.blogger3,
                                works: e.target.value
                              }
                            };
                            setBloggerInfo(updatedInfo);
                            saveBloggerInfoToLocalStorage(updatedInfo);
                          }}
                          className="bg-transparent border-none outline-none w-full text-white text-center"
                          placeholder="作品数"
                        />
                      </div>
                      <div className="text-gray-500 text-xs">作品</div>
                    </div>
                  </div>
                  <button 
                    className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    onClick={() => window.location.href = `/blogger-detail/3`}
                  >
                    查看拆解
                  </button>
                </FadeIn>
                
                {/* 博主卡片 4 */}
                <FadeIn className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl backdrop-blur-sm border border-gray-700">
                  {/* 可上传照片的博主头像 */}
                  <div className="relative aspect-square rounded-xl mb-4 overflow-hidden group">
                    {/* 隐藏的文件输入 */}
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const imageUrl = event.target?.result as string;
                            const updatedPhotos = { ...bloggerPhotos, blogger4: imageUrl };
                            setBloggerPhotos(updatedPhotos);
                            saveBloggerPhotosToLocalStorage(updatedPhotos);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                      id="blogger4-upload"
                    />
                    
                    {/* 照片预览或默认背景 */}
                    <div className="w-full h-full bg-gradient-to-br from-orange-900 to-orange-800 relative cursor-pointer">
                      {bloggerPhotos.blogger4 ? (
                        <img
                          src={bloggerPhotos.blogger4}
                          alt="旅行博主"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div 
                          className="w-full h-full flex items-center justify-center"
                          onClick={() => document.getElementById('blogger4-upload')?.click()}
                        >
                          <span className="text-white text-6xl font-bold">旅</span>
                        </div>
                      )}
                      
                      {/* 悬停操作工具栏 */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                        <div className="flex gap-4 mb-4">
                          {/* 上传图片按钮 */}
                          <button
                            className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/40 flex items-center justify-center transition-colors"
                            onClick={() => document.getElementById('blogger4-upload')?.click()}
                            title="上传图片"
                          >
                            <span className="text-white text-xl font-bold">+</span>
                          </button>
                          
                          {/* 删除图片按钮 */}
                          {bloggerPhotos.blogger4 && (
                            <button
                              className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/40 flex items-center justify-center transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                const updatedPhotos = { ...bloggerPhotos, blogger4: null };
                                setBloggerPhotos(updatedPhotos);
                                saveBloggerPhotosToLocalStorage(updatedPhotos);
                              }}
                              title="删除图片"
                            >
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 可编辑的博主标题 */}
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    <input
                      type="text"
                      value={bloggerInfo.blogger4.title}
                      onChange={(e) => {
                        const updatedInfo = {
                          ...bloggerInfo,
                          blogger4: {
                            ...bloggerInfo.blogger4,
                            title: e.target.value
                          }
                        };
                        setBloggerInfo(updatedInfo);
                        saveBloggerInfoToLocalStorage(updatedInfo);
                      }}
                      className="bg-transparent border-none outline-none w-full text-white"
                      placeholder="输入博主标题"
                    />
                  </h3>
                  
                  {/* 可编辑的博主描述 - 支持多行输入 */}
                  <p className="text-gray-400 text-sm mb-4">
                    <textarea
                      value={bloggerInfo.blogger4.description}
                      onChange={(e) => {
                        const updatedInfo = {
                          ...bloggerInfo,
                          blogger4: {
                            ...bloggerInfo.blogger4,
                            description: e.target.value
                          }
                        };
                        setBloggerInfo(updatedInfo);
                        saveBloggerInfoToLocalStorage(updatedInfo);
                      }}
                      className="bg-transparent border-none outline-none w-full text-gray-400 resize-none min-h-[100px]"
                      placeholder="输入博主描述（支持换行）"
                      rows={5}
                    />
                  </p>
                  
                  {/* 可编辑的博主数据 */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-white font-bold">
                        <input
                          type="text"
                          value={bloggerInfo.blogger4.followers}
                          onChange={(e) => {
                            const updatedInfo = {
                              ...bloggerInfo,
                              blogger4: {
                                ...bloggerInfo.blogger4,
                                followers: e.target.value
                              }
                            };
                            setBloggerInfo(updatedInfo);
                            saveBloggerInfoToLocalStorage(updatedInfo);
                          }}
                          className="bg-transparent border-none outline-none w-full text-white text-center"
                          placeholder="粉丝数"
                        />
                      </div>
                      <div className="text-gray-500 text-xs">粉丝</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-white font-bold">
                        <input
                          type="text"
                          value={bloggerInfo.blogger4.works}
                          onChange={(e) => {
                            const updatedInfo = {
                              ...bloggerInfo,
                              blogger4: {
                                ...bloggerInfo.blogger4,
                                works: e.target.value
                              }
                            };
                            setBloggerInfo(updatedInfo);
                            saveBloggerInfoToLocalStorage(updatedInfo);
                          }}
                          className="bg-transparent border-none outline-none w-full text-white text-center"
                          placeholder="作品数"
                        />
                      </div>
                      <div className="text-gray-500 text-xs">作品</div>
                    </div>
                  </div>
                  <button 
                    className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    onClick={() => window.location.href = `/blogger-detail/4`}
                  >
                    查看拆解
                  </button>
                </FadeIn>
                
                {/* 博主卡片 5 */}
                <FadeIn className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl backdrop-blur-sm border border-gray-700">
                  {/* 可上传照片的博主头像 */}
                  <div className="relative aspect-square rounded-xl mb-4 overflow-hidden group">
                    {/* 隐藏的文件输入 */}
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const imageUrl = event.target?.result as string;
                            const updatedPhotos = { ...bloggerPhotos, blogger5: imageUrl };
                            setBloggerPhotos(updatedPhotos);
                            saveBloggerPhotosToLocalStorage(updatedPhotos);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                      id="blogger5-upload"
                    />
                    
                    {/* 照片预览或默认背景 */}
                    <div className="w-full h-full bg-gradient-to-br from-red-900 to-red-800 relative cursor-pointer">
                      {bloggerPhotos.blogger5 ? (
                        <img
                          src={bloggerPhotos.blogger5}
                          alt="健身博主"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div 
                          className="w-full h-full flex items-center justify-center"
                          onClick={() => document.getElementById('blogger5-upload')?.click()}
                        >
                          <span className="text-white text-6xl font-bold">健</span>
                        </div>
                      )}
                      
                      {/* 悬停操作工具栏 */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                        <div className="flex gap-4 mb-4">
                          {/* 上传图片按钮 */}
                          <button
                            className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/40 flex items-center justify-center transition-colors"
                            onClick={() => document.getElementById('blogger5-upload')?.click()}
                            title="上传图片"
                          >
                            <span className="text-white text-xl font-bold">+</span>
                          </button>
                          
                          {/* 删除图片按钮 */}
                          {bloggerPhotos.blogger5 && (
                            <button
                              className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/40 flex items-center justify-center transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                const updatedPhotos = { ...bloggerPhotos, blogger5: null };
                                setBloggerPhotos(updatedPhotos);
                                saveBloggerPhotosToLocalStorage(updatedPhotos);
                              }}
                              title="删除图片"
                            >
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 可编辑的博主标题 */}
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    <input
                      type="text"
                      value={bloggerInfo.blogger5.title}
                      onChange={(e) => {
                        const updatedInfo = {
                          ...bloggerInfo,
                          blogger5: {
                            ...bloggerInfo.blogger5,
                            title: e.target.value
                          }
                        };
                        setBloggerInfo(updatedInfo);
                        saveBloggerInfoToLocalStorage(updatedInfo);
                      }}
                      className="bg-transparent border-none outline-none w-full text-white"
                      placeholder="输入博主标题"
                    />
                  </h3>
                  
                  {/* 可编辑的博主描述 - 支持多行输入 */}
                  <p className="text-gray-400 text-sm mb-4">
                    <textarea
                      value={bloggerInfo.blogger5.description}
                      onChange={(e) => {
                        const updatedInfo = {
                          ...bloggerInfo,
                          blogger5: {
                            ...bloggerInfo.blogger5,
                            description: e.target.value
                          }
                        };
                        setBloggerInfo(updatedInfo);
                        saveBloggerInfoToLocalStorage(updatedInfo);
                      }}
                      className="bg-transparent border-none outline-none w-full text-gray-400 resize-none min-h-[100px]"
                      placeholder="输入博主描述（支持换行）"
                      rows={5}
                    />
                  </p>
                  
                  {/* 可编辑的博主数据 */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-white font-bold">
                        <input
                          type="text"
                          value={bloggerInfo.blogger5.followers}
                          onChange={(e) => {
                            const updatedInfo = {
                              ...bloggerInfo,
                              blogger5: {
                                ...bloggerInfo.blogger5,
                                followers: e.target.value
                              }
                            };
                            setBloggerInfo(updatedInfo);
                            saveBloggerInfoToLocalStorage(updatedInfo);
                          }}
                          className="bg-transparent border-none outline-none w-full text-white text-center"
                          placeholder="粉丝数"
                        />
                      </div>
                      <div className="text-gray-500 text-xs">粉丝</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-white font-bold">
                        <input
                          type="text"
                          value={bloggerInfo.blogger5.works}
                          onChange={(e) => {
                            const updatedInfo = {
                              ...bloggerInfo,
                              blogger5: {
                                ...bloggerInfo.blogger5,
                                works: e.target.value
                              }
                            };
                            setBloggerInfo(updatedInfo);
                            saveBloggerInfoToLocalStorage(updatedInfo);
                          }}
                          className="bg-transparent border-none outline-none w-full text-white text-center"
                          placeholder="作品数"
                        />
                      </div>
                      <div className="text-gray-500 text-xs">作品</div>
                    </div>
                  </div>
                  <button 
                    className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    onClick={() => window.location.href = `/blogger-detail/5`}
                  >
                    查看拆解
                  </button>
                </FadeIn>
                
                {/* 博主卡片 6 */}
                <FadeIn className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl backdrop-blur-sm border border-gray-700">
                  {/* 可上传照片的博主头像 */}
                  <div className="relative aspect-square rounded-xl mb-4 overflow-hidden group">
                    {/* 隐藏的文件输入 */}
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const imageUrl = event.target?.result as string;
                            const updatedPhotos = { ...bloggerPhotos, blogger6: imageUrl };
                            setBloggerPhotos(updatedPhotos);
                            saveBloggerPhotosToLocalStorage(updatedPhotos);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                      id="blogger6-upload"
                    />
                    
                    {/* 照片预览或默认背景 */}
                    <div className="w-full h-full bg-gradient-to-br from-pink-900 to-pink-800 relative cursor-pointer">
                      {bloggerPhotos.blogger6 ? (
                        <img
                          src={bloggerPhotos.blogger6}
                          alt="时尚博主"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div 
                          className="w-full h-full flex items-center justify-center"
                          onClick={() => document.getElementById('blogger6-upload')?.click()}
                        >
                          <span className="text-white text-6xl font-bold">时</span>
                        </div>
                      )}
                      
                      {/* 悬停操作工具栏 */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                        <div className="flex gap-4 mb-4">
                          {/* 上传图片按钮 */}
                          <button
                            className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/40 flex items-center justify-center transition-colors"
                            onClick={() => document.getElementById('blogger6-upload')?.click()}
                            title="上传图片"
                          >
                            <span className="text-white text-xl font-bold">+</span>
                          </button>
                          
                          {/* 删除图片按钮 */}
                          {bloggerPhotos.blogger6 && (
                            <button
                              className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/40 flex items-center justify-center transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                const updatedPhotos = { ...bloggerPhotos, blogger6: null };
                                setBloggerPhotos(updatedPhotos);
                                saveBloggerPhotosToLocalStorage(updatedPhotos);
                              }}
                              title="删除图片"
                            >
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 可编辑的博主标题 */}
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    <input
                      type="text"
                      value={bloggerInfo.blogger6.title}
                      onChange={(e) => {
                        const updatedInfo = {
                          ...bloggerInfo,
                          blogger6: {
                            ...bloggerInfo.blogger6,
                            title: e.target.value
                          }
                        };
                        setBloggerInfo(updatedInfo);
                        saveBloggerInfoToLocalStorage(updatedInfo);
                      }}
                      className="bg-transparent border-none outline-none w-full text-white"
                      placeholder="输入博主标题"
                    />
                  </h3>
                  
                  {/* 可编辑的博主描述 - 支持多行输入 */}
                  <p className="text-gray-400 text-sm mb-4">
                    <textarea
                      value={bloggerInfo.blogger6.description}
                      onChange={(e) => {
                        const updatedInfo = {
                          ...bloggerInfo,
                          blogger6: {
                            ...bloggerInfo.blogger6,
                            description: e.target.value
                          }
                        };
                        setBloggerInfo(updatedInfo);
                        saveBloggerInfoToLocalStorage(updatedInfo);
                      }}
                      className="bg-transparent border-none outline-none w-full text-gray-400 resize-none min-h-[100px]"
                      placeholder="输入博主描述（支持换行）"
                      rows={5}
                    />
                  </p>
                  
                  {/* 可编辑的博主数据 */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-white font-bold">
                        <input
                          type="text"
                          value={bloggerInfo.blogger6.followers}
                          onChange={(e) => {
                            const updatedInfo = {
                              ...bloggerInfo,
                              blogger6: {
                                ...bloggerInfo.blogger6,
                                followers: e.target.value
                              }
                            };
                            setBloggerInfo(updatedInfo);
                            saveBloggerInfoToLocalStorage(updatedInfo);
                          }}
                          className="bg-transparent border-none outline-none w-full text-white text-center"
                          placeholder="粉丝数"
                        />
                      </div>
                      <div className="text-gray-500 text-xs">粉丝</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-white font-bold">
                        <input
                          type="text"
                          value={bloggerInfo.blogger6.works}
                          onChange={(e) => {
                            const updatedInfo = {
                              ...bloggerInfo,
                              blogger6: {
                                ...bloggerInfo.blogger6,
                                works: e.target.value
                              }
                            };
                            setBloggerInfo(updatedInfo);
                            saveBloggerInfoToLocalStorage(updatedInfo);
                          }}
                          className="bg-transparent border-none outline-none w-full text-white text-center"
                          placeholder="作品数"
                        />
                      </div>
                      <div className="text-gray-500 text-xs">作品</div>
                    </div>
                  </div>
                  <button 
                    className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    onClick={() => window.location.href = `/blogger-detail/6`}
                  >
                    查看拆解
                  </button>
                </FadeIn>
              </div>
              
              {/* 博主拆解说明 */}
              <FadeIn className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl backdrop-blur-sm border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-white">关于博主拆解</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  我们深入分析优秀博主的创作模式，包括内容选题、拍摄风格、文案撰写、发布策略等方面，
                  帮助你学习成功经验，优化自己的创作内容，提升账号影响力。
                </p>
                <p className="text-gray-300 leading-relaxed">
                  通过博主拆解，你可以了解不同领域的爆款逻辑，掌握行业趋势，
                  找到适合自己的创作方向，快速成长为优秀的内容创作者。
                </p>
              </FadeIn>
            </div>
          ) : (
            /* 默认小肥复盘内容 - 保留原有内容 */
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
                      {/* 头像上传功能 */}
                      <div className="relative">
                        {/* 隐藏的文件输入 */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleAvatarUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        
                        {/* 可点击的头像容器 */}
                        <div 
                          className="w-20 h-20 rounded-full bg-black p-1 mb-4 border-2 border-white/20 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={handleAvatarClick}
                        >
                          {/* 头像预览 */}
                          <div className="w-full h-full rounded-full overflow-hidden">
                            {avatar || douyinData.avatar ? (
                              <img
                                src={avatar || douyinData.avatar}
                                alt="头像"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-black flex items-center justify-center">
                                <span className="text-white text-3xl font-bold">兴</span>
                              </div>
                            )}
                          </div>
                          
                          {/* 上传中指示器 */}
                          {isUploading && (
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <div className="w-8 h-8 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                            </div>
                          )}
                          
                          {/* 上传提示 */}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                            更换头像
                          </div>
                        </div>
                      </div>
                      
                      {/* 昵称和ID */}
                      <h3 className="text-xl font-medium text-white mb-1">兴大地整装木作</h3>
                      
                      {/* 作品展示 - 抖音网格风格，最新作品在左上角 */}
                      <div className="grid grid-cols-3 gap-1 w-full mt-2">
                        {/* 作品列表 - 按上传时间倒序排列，最新的在最前面 */}
                        {displayWorks.map((work) => (
                          <div key={work.id} className={`relative ${targetWorkId === work.id ? 'ring-2 ring-white/50' : ''}`}>
                            {/* 隐藏的文件输入 */}
                            <input
                              type="file"
                              onChange={(e) => handleWorkUpload(e, work.id)}
                              accept="image/*"
                              className="hidden"
                              id={`work-upload-${work.id}`}
                            />
                            
                            {/* 可点击上传的作品项 - 3:4比例 */}
                            <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden group">
                              {/* 作品图片预览 */}
                              {work.image ? (
                                <img
                                  src={work.image}
                                  alt={`作品${work.id}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center">
                                  <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center mb-2">
                                    <span className="text-white text-sm font-bold">+</span>
                                  </div>
                                  <span className="text-gray-500 text-xs">点击上传作品{work.id}</span>
                                </div>
                              )}
                              
                              {/* 悬停操作工具栏 */}
                              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                                {/* 顶部操作按钮组 */}
                                <div className="flex gap-4 mb-4">
                                  {/* 1. 加号图标 - 更换图片 */}
                                  <button
                                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      document.getElementById(`work-upload-${work.id}`)?.click();
                                    }}
                                    title="更换图片"
                                  >
                                    <span className="text-white text-sm font-bold">+</span>
                                  </button>
                                  
                                  {/* 2. 删除图标 - 删除已添加的图片 */}
                                  {work.image && (
                                    <button
                                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteWork(work.id);
                                      }}
                                      title="删除图片"
                                    >
                                      {/* 垃圾桶图标 */}
                                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                                
                                {/* 3. 查看复盘按钮 - 跳转新网页 */}
                                <button
                                  className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewReview(work.id);
                                  }}
                                  title="查看复盘"
                                >
                                  查看复盘
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* 新增作品按钮 - 加号框 - 只有在没有指定workId时显示 */}
                        {!targetWorkId && (
                          <div 
                            className="aspect-[3/4] bg-gray-800/50 relative overflow-hidden group cursor-pointer hover:bg-gray-700/50 transition-all"
                            onClick={handleAddWork}
                          >
                            {/* 加号图标 */}
                            <div className="w-full h-full flex flex-col items-center justify-center">
                              <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center mb-2">
                                <span className="text-white text-lg font-bold">+</span>
                              </div>
                              <span className="text-gray-400 text-xs">新增作品</span>
                            </div>
                            
                            {/* 悬停效果 */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                              <span className="text-white text-sm">点击添加作品</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          )}
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