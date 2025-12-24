import React, { useState, useEffect } from 'react';

// 定义组件props类型
interface FlybookTableProps {
  workId?: string;
  bloggerId?: string;
}

// 定义作品数据类型
interface Work {
  id: number;
  image?: string;
  uploadTime?: number;
  title: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  commentRate: string;
  interactionRate: string;
  likeRate: string;
  repostRate: string;
  followerGrowth: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  saves: number;
  mainTopicTrend: number;
  secondaryTopicTrend: number;
  fanIncrease: number;
  avgPlayDuration?: number; // 平均播放时长
  profileVisits?: number; // 主页访问量
  finishRate?: string; // 完播率
  fiveSecRate?: string; // 5s完播率
  bounceRate?: string; // 2s跳出率
  clickRate?: string; // 封面点击率
  collects?: number; // 收藏量
  newFollowers?: number; // 粉丝增量
}

// 飞书多维表格组件
const FlybookTable: React.FC<FlybookTableProps> = ({ workId }) => {
  // 从localStorage读取作品数据
  const getWorksFromLocalStorage = (): Array<{ id: number; image: string | null; uploadTime: number }> => {
    try {
      const savedWorks = localStorage.getItem('xiaofei_works');
      if (savedWorks) {
        return JSON.parse(savedWorks);
      }
    } catch (error) {
      console.error('读取作品数据失败:', error);
    }
    // 默认数据
    return [
      { id: 1, image: null, uploadTime: Date.now() - 8 * 24 * 60 * 60 * 1000 }
    ];
  };
  
  // 存储上传的文件列表，用于预览
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // 默认作品数据
  const defaultWorks: Omit<Work, 'image' | 'uploadTime'>[] = [
    {
      id: 1,
      title: '长乐府1',
      date: '2025-12-23 20:10',
      status: 'approved',
      commentRate: '7.32%',
      interactionRate: '41.92%',
      likeRate: '-',
      repostRate: '32.31%',
      followerGrowth: '86%',
      views: 18,
      likes: 1,
      shares: 2,
      comments: 0,
      saves: 20,
      mainTopicTrend: 0,
      secondaryTopicTrend: 0,
      fanIncrease: 377
    }
  ];

  // 作品数据状态
  const [data, setData] = useState<Work[]>(() => {
    // 从localStorage读取作品封面数据
    const worksFromStorage = getWorksFromLocalStorage();

    // 合并数据
    const mergedWorks = defaultWorks.map(work => {
      const storageWork = worksFromStorage.find(w => w.id === work.id);
      return {
        ...work,
        image: storageWork?.image || undefined,
        uploadTime: storageWork?.uploadTime
      };
    });

    // 如果有workId参数，只返回对应的作品
    if (workId) {
      const targetId = parseInt(workId, 10);
      return mergedWorks.filter(work => work.id === targetId);
    }

    return mergedWorks;
  });

  // 监听localStorage变化和workId变化，实时更新数据
  useEffect(() => {
    const updateData = () => {
      // 从localStorage读取作品封面数据
      const worksFromStorage = getWorksFromLocalStorage();
      
      // 合并数据
      const mergedWorks = defaultWorks.map(work => {
        const storageWork = worksFromStorage.find(w => w.id === work.id);
        return {
          ...work,
          image: storageWork?.image || undefined,
          uploadTime: storageWork?.uploadTime
        };
      });

      // 如果有workId参数，只返回对应的作品
      if (workId) {
        const targetId = parseInt(workId, 10);
        setData(mergedWorks.filter(work => work.id === targetId));
      } else {
        setData(mergedWorks);
      }
    };
    
    const handleStorageChange = () => {
      updateData();
    };

    window.addEventListener('storage', handleStorageChange);
    updateData(); // 初始化数据
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [workId]);

  // 处理作品上传
  const handleWorkUpload = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files?.[0];
    if (file) {
      // 使用FileReader生成持久化的base64编码URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        const now = Date.now();

        setData(prevData => 
          prevData.map(work => 
            work.id === id ? { ...work, image: imageUrl, uploadTime: now } : work
          )
        );

        // 同步更新到localStorage
        const savedWorks = getWorksFromLocalStorage();
        const updatedWorks = savedWorks.map(work => {
          if (work.id === id) {
            return { ...work, image: imageUrl, uploadTime: now };
          }
          return work;
        });

        try {
          localStorage.setItem('xiaofei_works', JSON.stringify(updatedWorks));
          console.log('作品封面已保存到localStorage');
        } catch (error) {
          console.error('保存作品封面失败:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 处理删除作品
  const handleDeleteWork = (id: number) => {
    setData(prevData => 
      prevData.map(work => 
        work.id === id ? { ...work, image: undefined } : work
      )
    );

    // 同步更新到localStorage
    const savedWorks = getWorksFromLocalStorage();
    const updatedWorks = savedWorks.map(work => {
      if (work.id === id) {
        return { ...work, image: null };
      }
      return work;
    });

    try {
      localStorage.setItem('xiaofei_works', JSON.stringify(updatedWorks));
      console.log('作品封面已从localStorage删除');
    } catch (error) {
      console.error('删除作品封面失败:', error);
    }
  };

  // 处理独立文件上传区域的文件上传
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // 直接处理文件，不依赖事件对象
      processFiles(Array.from(files));
      // 清空文件输入
      e.target.value = '';
    }
  };
  
  // 数据映射配置 - 定义表头与数据字段的映射关系
  const dataMapping = {
    '播放量': 'views',
    '完播率': 'finishRate',
    '5s完播率': 'fiveSecRate',
    '2s跳出率': 'bounceRate',
    '平均播放时长': 'avgPlayDuration',
    '封面点击率': 'clickRate',
    '点赞量': 'likes',
    '评论量': 'comments',
    '分享量': 'shares',
    '收藏量': 'collects',
    '主页访问量': 'profileVisits',
    '粉丝增量': 'newFollowers'
  };
  
  // 模拟数据 - 对应截图中的数据
  const mockScreenshotData = {
    views: 377,
    finishRate: '7.32%',
    fiveSecRate: '41.92%',
    bounceRate: '32.31%',
    avgPlayDuration: 8,
    clickRate: '-',
    likes: 18,
    comments: 2,
    shares: 1,
    collects: 0,
    profileVisits: 20,
    newFollowers: 0
  };
  
  // 模拟截图数据解析 - 1.5秒延迟
  const mockScreenshotParse = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return mockScreenshotData;
  };
  
  // 处理截图上传
  const handleScreenshotUpload = async (files: File[]) => {
    console.log('上传函数触发了');
    if (files.length > 0) {
      console.log('开始解析截图数据...');
      
      // 模拟1.5秒延迟解析
      const mockData = await mockScreenshotParse();
      console.log('生成的 Mock 数据:', mockData);
      
      // 处理数据映射和转换
      const processedData: any = {};
      
      // 遍历解析的数据
      for (const [key, value] of Object.entries(mockData)) {
        let processedValue = value;
        
        // 根据字段类型进行特殊处理
        switch (key) {
          case 'avgPlayDuration':
            // 确保是数字类型
            processedValue = typeof value === 'string' ? parseInt(value.replace(/秒/g, ''), 10) : value;
            break;
          case 'clickRate':
            // 如果是横杠，赋值为0
            processedValue = value === '-' ? '0%' : value;
            break;
          case 'finishRate':
          case 'fiveSecRate':
          case 'bounceRate':
            // 确保保留%符号
            processedValue = typeof value === 'number' ? `${value}%` : value;
            break;
          default:
            // 其他字段保持原样
            processedValue = value;
        }
        
        processedData[key] = processedValue;
      }
      
      console.log('截图数据解析完成:', processedData);
      
      // 更新表格数据
      updateTableData(processedData);
      console.log('页面变量已更新');
      
      return processedData;
    }
    return null;
  };
  
  // 处理文件的核心函数
  const processFiles = (files: File[]) => {
    if (files.length > 0) {
      // 这里可以添加文件上传逻辑
      // 目前只做简单的日志记录和预览显示
      files.forEach(file => {
        console.log(`上传了文件: ${file.name}，类型: ${file.type}，大小: ${file.size} bytes`);
        
        // 尝试解析文件内容，提取数据
        parseFileData(file);
      });
      
      // 如果是图片文件，调用截图上传处理函数
      const imageFiles = files.filter(file => file.type.startsWith('image/'));
      if (imageFiles.length > 0) {
        handleScreenshotUpload(imageFiles);
      }
      
      // 将文件添加到上传列表用于预览
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };
  
  // 解析文件数据
  const parseFileData = (file: File) => {
    // 根据文件类型实现不同的解析逻辑
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      // 解析CSV文件
      parseCSVFile(file);
    } else if (file.type.startsWith('image/')) {
      // 处理图片文件，目前只显示预览
      console.log('图片文件已显示预览');
    } else {
      // 其他文件类型，使用模拟数据
      const mockData = generateMockData();
      updateTableData(mockData);
    }
  };
  
  // 解析CSV文件
  const parseCSVFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      // 解析CSV内容
      const rows = content.split('\n').filter(row => row.trim() !== '');
      
      if (rows.length < 2) {
        console.error('CSV文件格式不正确，需要至少包含表头和一行数据');
        return;
      }
      
      // 获取CSV表头和数据行
      const headers = rows[0].split(',').map(header => header.trim());
      const dataRow = rows[1].split(',').map(value => value.trim());
      
      // 将CSV数据映射到表格数据
      const mappedData = mapCSVData(headers, dataRow);
      
      // 更新表格数据
      updateTableData(mappedData);
    };
    reader.readAsText(file);
  };
  
  // 将CSV数据映射到表格数据
  const mapCSVData = (headers: string[], data: string[]) => {
    const mappedData: any = {};
    
    headers.forEach((header, index) => {
      // 查找匹配的数据映射
      for (const [tableHeader, fieldName] of Object.entries(dataMapping)) {
        if (header.includes(tableHeader) || tableHeader.includes(header)) {
          // 映射数据
          const value = data[index];
          
          // 根据字段类型转换数据
          switch (fieldName) {
            case 'views':
            case 'likes':
            case 'shares':
            case 'comments':
            case 'saves':
            case 'fanIncrease':
            case 'avgPlayDuration':
            case 'profileVisits':
              mappedData[fieldName] = parseInt(value, 10) || 0;
              break;
            case 'likeRate':
            case 'repostRate':
            case 'commentRate':
            case 'interactionRate':
              // 确保数据格式为百分比
              mappedData[fieldName] = value.endsWith('%') ? value : `${value}%`;
              break;
            default:
              mappedData[fieldName] = value;
          }
          break;
        }
      }
    });
    
    return mappedData;
  };
  
  // 更新表格数据
  const updateTableData = (newData: any) => {
    setData(prevData => {
      return prevData.map(work => ({
        ...work,
        ...newData
      }));
    });
  };
  
  // 生成模拟数据
  const generateMockData = () => {
    return {
      views: Math.floor(Math.random() * 10000),
      likeRate: `${(Math.random() * 100).toFixed(2)}%`,
      repostRate: `${(Math.random() * 100).toFixed(2)}%`,
      commentRate: `${(Math.random() * 100).toFixed(2)}%`,
      interactionRate: `${(Math.random() * 100).toFixed(2)}%`,
      avgPlayDuration: Math.floor(Math.random() * 60) + 10,
      likes: Math.floor(Math.random() * 1000),
      shares: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
      saves: Math.floor(Math.random() * 200),
      profileVisits: Math.floor(Math.random() * 500),
      fanIncrease: Math.floor(Math.random() * 100)
    };
  };

  // 处理查看复盘 - 传递作品ID参数
  const handleViewReview = (id: number) => {
    // 跳转到复盘页面，传递workId参数
    window.location.href = `/topic-review?workId=${id}`;
  };

  return (
    <div className="container mx-auto p-4">
      {/* 爆款视频架构师分析 */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-center mb-6">爆款视频架构师分析</h1>
        
        {/* 作品信息 */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            {data.map((row) => (
              <div key={row.id} className="relative aspect-[3/4] w-32 mx-auto group">
                {row.image ? (
                  <img
                    src={row.image}
                    alt={`${row.title}`}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg flex items-center justify-center">
                    <span className="text-white text-xl">+</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            {data.map((row) => (
              <h2 key={row.id} className="text-2xl font-semibold">{row.title}</h2>
            ))}
          </div>
        </div>
        
        {/* 螺旋式上升叙事结构 */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">螺旋式上升叙事结构</h3>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="relative h-64">
              {/* 螺旋线图表 */}
              <svg className="w-full h-full" viewBox="0 0 800 300">
                <defs>
                  <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#2196F3" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path 
                  d="M50,150 Q150,50 250,150 T450,150 T650,150"
                  stroke="url(#spiralGradient)" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeLinecap="round"
                />
                
                {/* 关键节点 */}
                <circle cx="50" cy="150" r="12" fill="#FF5722" />
                <circle cx="250" cy="150" r="12" fill="#FF5722" />
                <circle cx="450" cy="150" r="12" fill="#FF5722" />
                <circle cx="650" cy="150" r="12" fill="#FF5722" />
                
                {/* 节点标签 */}
                <text x="50" y="120" textAnchor="middle" className="text-sm font-semibold">Hook</text>
                <text x="250" y="120" textAnchor="middle" className="text-sm font-semibold">冲突</text>
                <text x="450" y="120" textAnchor="middle" className="text-sm font-semibold">高潮</text>
                <text x="650" y="120" textAnchor="middle" className="text-sm font-semibold">反转</text>
              </svg>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-xs text-gray-600">Hook时长</div>
                <div className="text-lg font-bold">3.5s</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-xs text-gray-600">冲突占比</div>
                <div className="text-lg font-bold">40%</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-xs text-gray-600">高潮位置</div>
                <div className="text-lg font-bold">65%</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-xs text-gray-600">反转效果</div>
                <div className="text-lg font-bold">92%</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 视频节奏心电图 */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">视频节奏心电图</h3>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="relative h-48">
              <svg className="w-full h-full" viewBox="0 0 800 200">
                <defs>
                  <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F44336" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#E91E63" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,100 Q50,50 100,100 T200,100 T300,100 T400,100 T500,100 T600,100 T700,100 T800,100"
                  stroke="url(#ecgGradient)" 
                  strokeWidth="4" 
                  fill="none"
                />
                
                {/* 时间轴 */}
                <line x1="0" y1="180" x2="800" y2="180" stroke="#ccc" strokeWidth="2" />
                <text x="0" y="195" textAnchor="start" className="text-xs text-gray-500">0s</text>
                <text x="200" y="195" textAnchor="middle" className="text-xs text-gray-500">5s</text>
                <text x="400" y="195" textAnchor="middle" className="text-xs text-gray-500">10s</text>
                <text x="600" y="195" textAnchor="middle" className="text-xs text-gray-500">15s</text>
                <text x="800" y="195" textAnchor="end" className="text-xs text-gray-500">20s</text>
              </svg>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-600">平均节奏</div>
                <div className="text-lg font-bold">2.3s/切</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-600">高潮节奏</div>
                <div className="text-lg font-bold">1.1s/切</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-600">节奏变化</div>
                <div className="text-lg font-bold">78%</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 人设维度解析 */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">人设维度解析</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-medium mb-3">专业度</h4>
              <div className="relative h-4 bg-gray-200 rounded-full mb-2">
                <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="text-right text-sm text-gray-600">85%</div>
              <p className="mt-3 text-sm text-gray-700">内容专业，信息密度高，有独特见解</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-medium mb-3">亲和力</h4>
              <div className="relative h-4 bg-gray-200 rounded-full mb-2">
                <div className="absolute top-0 left-0 h-full bg-green-500 rounded-full" style={{ width: '72%' }}></div>
              </div>
              <div className="text-right text-sm text-gray-600">72%</div>
              <p className="mt-3 text-sm text-gray-700">语言通俗易懂，情绪饱满，容易产生共鸣</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-medium mb-3">独特性</h4>
              <div className="relative h-4 bg-gray-200 rounded-full mb-2">
                <div className="absolute top-0 left-0 h-full bg-purple-500 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <div className="text-right text-sm text-gray-600">90%</div>
              <p className="mt-3 text-sm text-gray-700">有鲜明的个人风格和差异化定位</p>
            </div>
          </div>
        </div>
        
        {/* 万能SOP生成器 */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">万能SOP生成器</h3>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ol className="space-y-4">
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div>
                  <h4 className="font-medium">选题策划</h4>
                  <p className="text-sm text-gray-700">基于热点+个人优势+用户需求的三维选题法</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div>
                  <h4 className="font-medium">脚本撰写</h4>
                  <p className="text-sm text-gray-700">采用「黄金3秒+冲突升级+价值输出+行动指令」结构</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div>
                  <h4 className="font-medium">拍摄执行</h4>
                  <p className="text-sm text-gray-700">固定机位+自然光线+简洁背景+稳定画面</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <div>
                  <h4 className="font-medium">剪辑包装</h4>
                  <p className="text-sm text-gray-700">快节奏剪辑+动态字幕+情绪音乐+清晰配音</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">5</div>
                <div>
                  <h4 className="font-medium">标题封面</h4>
                  <p className="text-sm text-gray-700">数字开头+痛点钩子+清晰利益+视觉冲击</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">6</div>
                <div>
                  <h4 className="font-medium">发布优化</h4>
                  <p className="text-sm text-gray-700">黄金时间发布+精准标签+互动引导</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">7</div>
                <div>
                  <h4 className="font-medium">数据复盘</h4>
                  <p className="text-sm text-gray-700">分析完播率、互动率、转化率等关键指标</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">8</div>
                <div>
                  <h4 className="font-medium">迭代优化</h4>
                  <p className="text-sm text-gray-700">基于数据反馈持续优化内容策略</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
        
        {/* 数据指标 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">核心数据指标</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-lg p-5 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-1">{data[0]?.views || 0}</div>
              <div className="text-sm text-gray-600">播放量</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-5 text-center">
              <div className="text-3xl font-bold text-green-500 mb-1">{(data[0]?.finishRate || '0%').replace('%', '')}</div>
              <div className="text-sm text-gray-600">完播率 %</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-5 text-center">
              <div className="text-3xl font-bold text-purple-500 mb-1">{data[0]?.likes || 0}</div>
              <div className="text-sm text-gray-600">点赞量</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-5 text-center">
              <div className="text-3xl font-bold text-orange-500 mb-1">{data[0]?.comments || 0}</div>
              <div className="text-sm text-gray-600">评论量</div>
            </div>
          </div>
        </div>
        
        {/* 截图数据自动录入 */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">截图数据自动录入</h3>
          <div 
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-gray-50"
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add('border-blue-400');
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove('border-blue-400');
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove('border-blue-400');
              if (e.dataTransfer.files.length > 0) {
                processFiles(Array.from(e.dataTransfer.files));
              }
            }}
            onPaste={(e) => {
              e.preventDefault();
              const items = e.clipboardData?.items;
              if (items) {
                const pastedFiles: File[] = [];
                for (let i = 0; i < items.length; i++) {
                  if (items[i].type.indexOf('image') !== -1) {
                    const file = items[i].getAsFile();
                    if (file) {
                      pastedFiles.push(file);
                    }
                  }
                }
                if (pastedFiles.length > 0) {
                  processFiles(pastedFiles);
                }
              }
            }}
          >
            {/* 隐藏的文件输入 */}
            <input
              type="file"
              onChange={handleFileUpload}
              accept="*/*"
              className="hidden"
              id={`file-upload-main`}
              multiple
            />
            
            {/* 上传区域内容 */}
            <div className="flex flex-col items-center justify-center">
              {/* 加号图标 */}
              <div 
                className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center mb-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => document.getElementById(`file-upload-main`)?.click()}
              >
                <span className="text-2xl text-gray-600">+</span>
              </div>
              
              {/* 上传提示文本 */}
              <p className="text-gray-600 mb-2">粘贴或拖拽截图至这里上传</p>
              <p className="text-gray-500 text-sm mb-4">系统将自动解析截图数据并填充到表格中</p>
              
              {/* 上传按钮 */}
              <button 
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => document.getElementById(`file-upload-main`)?.click()}
              >
                + 添加本地截图
              </button>
            </div>
          </div>
          
          {/* 文件预览列表 */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">已上传文件:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploadedFiles.map((file, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* 如果是图片类型，显示图片预览 */}
                    {file.type.startsWith('image/') ? (
                      <div className="w-full h-32 overflow-hidden">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt={file.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-500">{file.type || '文件'}</span>
                      </div>
                    )}
                    <div className="p-3">
                      <div className="text-sm font-medium truncate">{file.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {(file.size / 1024).toFixed(1)} KB
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* 数据分析报告 */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">数据分析报告</h3>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium mb-3">视频表现</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">播放量</span>
                      <span className="text-sm font-semibold">{data[0]?.views || 0}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${Math.min((data[0]?.views || 0) / 10000 * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">互动率</span>
                      <span className="text-sm font-semibold">{(data[0]?.interactionRate || '0%').replace('%', '')}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${parseFloat((data[0]?.interactionRate || '0%').replace('%', ''))}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">完播率</span>
                      <span className="text-sm font-semibold">{(data[0]?.finishRate || '0%').replace('%', '')}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${parseFloat(data[0]?.finishRate || '0%')}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3">受众分析</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">核心受众</span>
                    <span className="text-sm font-semibold">25-34岁</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">性别分布</span>
                    <span className="text-sm font-semibold">男52% | 女48%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">地域分布</span>
                    <span className="text-sm font-semibold">一线城市</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">互动高峰</span>
                    <span className="text-sm font-semibold">19:00-22:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 爆款因子分析 */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">爆款因子分析</h3>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="font-medium mb-1">选题精准</h4>
                <p className="text-sm text-gray-600">直击用户痛点，引发强烈共鸣</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h4 className="font-medium mb-1">节奏紧凑</h4>
                <p className="text-sm text-gray-600">黄金3秒钩子，全程无尿点</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="font-medium mb-1">价值输出</h4>
                <p className="text-sm text-gray-600">实用干货，让用户有所收获</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h4 className="font-medium mb-1">情绪共鸣</h4>
                <p className="text-sm text-gray-600">情感真挚，引发用户情感共鸣</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 爆款视频架构师拆解 */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">爆款视频架构师拆解</h3>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <iframe 
              src="https://your-site.com/viral-architect.html" 
              style={{width: '100%', height: '100vh', border: 'none'}} 
              title="爆款视频架构师拆解"
            ></iframe>
          </div>
        </div>
        
        {/* 优化建议 */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">优化建议</h3>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-blue-600">+</span>
                </div>
                <p className="text-sm text-gray-700">建议在视频开头增加更强烈的视觉冲击，进一步提升5秒完播率</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-blue-600">+</span>
                </div>
                <p className="text-sm text-gray-700">建议在视频中增加互动元素，如提问、投票等，提升用户参与度</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-blue-600">+</span>
                </div>
                <p className="text-sm text-gray-700">建议优化封面标题，增加更具体的利益点，提升点击率</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-blue-600">+</span>
                </div>
                <p className="text-sm text-gray-700">建议在视频结尾增加明确的行动指令，提升转化率</p>
              </li>
            </ul>
          </div>
        </div>
        
        {/* 返回按钮 */}
        <div className="text-center">
          <button
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => window.history.back()}
          >
            返回上一页
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlybookTable;