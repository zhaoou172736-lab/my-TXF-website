import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f5f5f7] text-[#1d1d1f] text-xs py-10 px-4 md:px-8 border-t border-gray-200">
      <div className="max-w-[1024px] mx-auto">
        <div className="mb-6 space-y-2 text-gray-500">
            <p>1. 数据准确性以实际发布为准。屏幕圆角设计，标准矩形对角线尺寸为 6.12 英寸 (iPhone 17 Pro) 或 6.69 英寸 (iPhone 17 Pro Max)。实际可视区域较小。</p>
            <p>2. 需要使用数据线和电源适配器 (需单独购买)。</p>
            <p>3. 钛金属边框仅适用于 Pro 机型。</p>
        </div>
        
        <div className="border-t border-gray-300 my-4"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
            <div className="mb-2 md:mb-0">
                <p>Copyright © 2025 Apple Inc. 保留所有权利。</p>
            </div>
            <div className="flex gap-4 text-gray-600">
                <a href="#" className="hover:underline">隐私政策</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="hover:underline">使用条款</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="hover:underline">销售政策</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="hover:underline">法律信息</a>
            </div>
        </div>
        <div className="mt-2 text-gray-500">
            <p>京ICP备10214630号</p>
        </div>
      </div>
    </footer>
  );
};
