import React from 'react';
import { Navbar } from './components/Layout/Navbar';
import { Hero } from './components/Home/Hero';
import { Routes, Route } from 'react-router-dom';
import ColorGradingSystem from './components/ColorGrading/ColorGradingSystem';
import MediaSystem from './components/MediaSystem/MediaSystem';
import EditingSystem from './components/EditingSystem/EditingSystem';
import CoverSystem from './components/CoverSystem/CoverSystem';
import ServicesSupport from './components/ServicesSupport/ServicesSupport';
import AboutTangXiaofei from './components/AboutTangXiaofei/AboutTangXiaofei';
import TopicSystem from './components/TopicSystem/TopicSystem';
import XiaofeiTopicReview from './pages/XiaofeiTopicReview';
import FlybookTablePage from './pages/FlybookTablePage';
import GameDesignTool from './components/GameDesignTool/GameDesignTool';
import BloggerDetailPage from './components/BloggerDetailPage';

function App() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/about.svg")' }}>
      <Navbar />
      {/* 给内容区域添加顶部内边距，避免与固定定位的导航栏重叠 */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/color-grading" element={<ColorGradingSystem />} />
          <Route path="/media" element={<MediaSystem />} />
          <Route path="/topic" element={<TopicSystem />} />
          <Route path="/topic-review" element={<XiaofeiTopicReview />} />
          <Route path="/editing" element={<EditingSystem />} />
          <Route path="/cover" element={<CoverSystem />} />
          <Route path="/services" element={<ServicesSupport />} />
          <Route path="/about" element={<AboutTangXiaofei />} />
          <Route path="/flybook-table" element={<FlybookTablePage />} />
          <Route path="/flybook-table/:workId" element={<FlybookTablePage />} />
          <Route path="/game-design" element={<GameDesignTool />} />
          <Route path="/blogger-detail/:id" element={<BloggerDetailPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;