import React from 'react';
import { ShoppingCart, MessageSquare } from 'lucide-react';

export const FloatingSidebar: React.FC = () => {
  return (
    <div className="fixed bottom-10 right-6 z-50 flex flex-col gap-3">
      {/* 购物车 */}
      <button className="p-3 bg-white text-black rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
        <ShoppingCart size={20} strokeWidth={1.5} />
      </button>
      
      {/* 消息/客服 */}
      <button className="p-3 bg-white text-black rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
        <MessageSquare size={20} strokeWidth={1.5} />
      </button>
      
    </div>
  );
};