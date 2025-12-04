import { Navbar } from './components/Layout/Navbar';
import { Hero } from './components/Home/Hero';
import { FloatingSidebar } from './components/Layout/FloatingSidebar';
import { Routes, Route } from 'react-router-dom';
import ColorGradingSystem from './components/ColorGrading/ColorGradingSystem';
import MediaSystem from './components/MediaSystem/MediaSystem';
import EditingSystem from './components/EditingSystem/EditingSystem';
import CoverSystem from './components/CoverSystem/CoverSystem';
import ServicesSupport from './components/ServicesSupport/ServicesSupport';
import AboutTangXiaofei from './components/AboutTangXiaofei/AboutTangXiaofei';
import TopicSystem from './components/TopicSystem/TopicSystem';
import XiaofeiTopicReview from './pages/XiaofeiTopicReview';

function App() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/about.svg")' }}>
      <Navbar />
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
      </Routes>
      <FloatingSidebar />
    </div>
  );
}

export default App;