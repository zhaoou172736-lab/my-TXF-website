import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const BloggerDetailPage: React.FC = () => {
  // 获取路由参数
  const { id } = useParams<{ id: string }>();
  const bloggerId = parseInt(id || '1', 10);

  // 从localStorage读取作品数据 - 根据博主ID区分
  const [bloggerWorks, setBloggerWorks] = useState<Array<{id: number;image: string | null;views: string;likes: string;comments: string;shares: string;date: string;uploadTime: number;}>>(() => {
    // 从localStorage读取数据，使用带博主ID的键名
    const savedWorks = localStorage.getItem(`blogger_works_${bloggerId}`);
    if (savedWorks) {
      try {
        const works = JSON.parse(savedWorks);
        // 为每个作品生成模拟的社交数据
        return works.map((work: any) => ({
          ...work,
          views: `${Math.floor(Math.random() * 1000000).toLocaleString()}`,
          likes: `${Math.floor(Math.random() * 100000).toLocaleString()}`,
          comments: `${Math.floor(Math.random() * 10000).toLocaleString()}`,
          shares: `${Math.floor(Math.random() * 5000).toLocaleString()}`,
          date: `${Math.floor(Math.random() * 30) + 1}天前`
        }));
      } catch (error) {
        console.error('读取localStorage失败:', error);
      }
    }
    // 默认数据
    return Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      image: null,
      views: `${Math.floor(Math.random() * 1000000).toLocaleString()}`,
      likes: `${Math.floor(Math.random() * 100000).toLocaleString()}`,
      comments: `${Math.floor(Math.random() * 10000).toLocaleString()}`,
      shares: `${Math.floor(Math.random() * 5000).toLocaleString()}`,
      date: `${Math.floor(Math.random() * 30) + 1}天前`,
      uploadTime: Date.now() - i * 24 * 60 * 60 * 1000
    }));
  });

  // 文件输入引用
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 保存作品数据到localStorage
  const saveWorksToLocalStorage = (works: any[]) => {
    // 只保存必要的数据，不包括模拟的社交数据
    const worksToSave = works.map(({ views, likes, comments, shares, date, ...rest }) => rest);
    localStorage.setItem(`blogger_works_${bloggerId}`, JSON.stringify(worksToSave));
  };

  // 监听localStorage变化，确保数据同步
  useEffect(() => {
    const handleStorageChange = () => {
      const savedWorks = localStorage.getItem(`blogger_works_${bloggerId}`);
      if (savedWorks) {
        try {
          const works = JSON.parse(savedWorks);
          // 为每个作品生成模拟的社交数据
          const updatedWorks = works.map((work: any) => ({
            ...work,
            views: `${Math.floor(Math.random() * 1000000).toLocaleString()}`,
            likes: `${Math.floor(Math.random() * 100000).toLocaleString()}`,
            comments: `${Math.floor(Math.random() * 10000).toLocaleString()}`,
            shares: `${Math.floor(Math.random() * 5000).toLocaleString()}`,
            date: `${Math.floor(Math.random() * 30) + 1}天前`
          }));
          setBloggerWorks(updatedWorks);
        } catch (error) {
          console.error('读取localStorage失败:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [bloggerId]);

  // 添加新作品
  const handleAddWork = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string;
      const newWork = {
        id: Date.now(), // 使用时间戳作为唯一ID
        image: imageDataUrl,
        views: `${Math.floor(Math.random() * 1000000).toLocaleString()}`,
        likes: `${Math.floor(Math.random() * 100000).toLocaleString()}`,
        comments: `${Math.floor(Math.random() * 10000).toLocaleString()}`,
        shares: `${Math.floor(Math.random() * 5000).toLocaleString()}`,
        date: '刚刚',
        uploadTime: Date.now()
      };

      const updatedWorks = [...bloggerWorks, newWork];
      setBloggerWorks(updatedWorks);
      saveWorksToLocalStorage(updatedWorks);
    };
    reader.readAsDataURL(file);
  };

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleAddWork(files[0]);
      // 清空文件输入，以便可以重复选择同一个文件
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // 点击添加按钮触发文件选择
  const handleAddButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 删除作品
  const handleDeleteWork = (workId: number) => {
    // 确认删除操作
    if (window.confirm('确定要删除这个作品吗？')) {
      // 删除指定作品
      const updatedWorks = bloggerWorks.filter(work => work.id !== workId);
      
      // 更新状态
      setBloggerWorks(updatedWorks);
      saveWorksToLocalStorage(updatedWorks);
      
      console.log(`删除了作品${workId}`);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* 隐藏的文件输入 */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* 作品栏 - 类似抖音作品网格布局 */}
      <section className="py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-1">
            {bloggerWorks.map((work) => (
              <div key={work.id} className="relative aspect-[3/4] overflow-hidden group">
                {/* 作品图片 */}
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 relative">
                  {/* 显示实际图片或默认占位 */}
                  {work.image ? (
                    <img
                      src={work.image}
                      alt={`作品 ${work.id}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                      <span className="text-white text-2xl">作品 {work.id}</span>
                    </div>
                  )}
                  
                  {/* 悬停效果 - 显示操作按钮 */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* 操作按钮 - 顶部 */}
                    <div className="absolute top-2 right-2 flex gap-2">
                      {/* 删除作品按钮 */}
                      <button
                        className="w-10 h-10 rounded-full bg-white/30 hover:bg-white/40 flex items-center justify-center transition-colors"
                        onClick={() => handleDeleteWork(work.id)}
                        title="删除作品"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* 作品拆解按钮 - 右下角 */}
                    <div className="absolute bottom-2 right-2">
                      <button
                        className="px-4 py-2 bg-white/30 hover:bg-white/40 rounded-full text-white text-sm font-medium transition-colors"
                        onClick={() => window.location.href = `/flybook-table?workId=${work.id}`}
                        title="作品拆解"
                      >
                        作品拆解
                      </button>
                    </div>
                  </div>
                  

                </div>
              </div>
            ))}
            
            {/* 添加新作品按钮 */}
            <div 
              onClick={handleAddButtonClick}
              className="relative aspect-[3/4] overflow-hidden group cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-white">
                  <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-lg">添加新作品</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BloggerDetailPage;