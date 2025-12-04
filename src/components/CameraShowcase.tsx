import React from 'react';
import { FadeIn } from './FadeIn';

export const CameraShowcase: React.FC = () => {
  return (
    <section className="bg-black py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <FadeIn>
                <h2 className="text-5xl md:text-7xl font-semibold text-center mb-16 clip-text-image">
                    Pro 级影像系统。<br/>
                    大片，信手拈来。
                </h2>
            </FadeIn>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                {/* Simulated Lens Graphics using CSS */}
                <FadeIn delay={200} className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                     {/* The "Island" containing lenses */}
                     <div className="absolute inset-0 bg-[#1a1a1a] rounded-[60px] border border-gray-800 shadow-2xl flex flex-wrap content-center justify-center gap-4 p-8 transform rotate-0 hover:rotate-3 transition-transform duration-700">
                        {/* Lens 1 */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-black border-4 border-[#333] relative flex items-center justify-center shadow-inner">
                            <div className="w-16 h-16 rounded-full bg-[#0d0d0d] border border-blue-900/30 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-[#1a1a2e] opacity-80"></div>
                            </div>
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/20 blur-sm rounded-full"></div>
                        </div>
                         {/* Lens 2 */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-black border-4 border-[#333] relative flex items-center justify-center shadow-inner">
                            <div className="w-16 h-16 rounded-full bg-[#0d0d0d] border border-blue-900/30 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-[#1a1a2e] opacity-80"></div>
                            </div>
                        </div>
                         {/* Lens 3 */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-black border-4 border-[#333] relative flex items-center justify-center shadow-inner">
                            <div className="w-16 h-16 rounded-full bg-[#0d0d0d] border border-blue-900/30 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-[#1a1a2e] opacity-80"></div>
                            </div>
                        </div>
                     </div>
                </FadeIn>

                <div className="flex flex-col gap-8 max-w-md text-gray-300">
                    <FadeIn delay={300}>
                        <div className="border-l border-gray-700 pl-6">
                            <h4 className="text-white text-xl font-semibold mb-2">48MP 主摄</h4>
                            <p className="text-sm leading-relaxed">
                                为你捕捉超高分辨率照片，细节和色彩都令人惊叹。即使在低光环境下，也能拍出清晰锐利的作品。
                            </p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={400}>
                        <div className="border-l border-gray-700 pl-6">
                            <h4 className="text-white text-xl font-semibold mb-2">5 倍光学变焦</h4>
                            <p className="text-sm leading-relaxed">
                                iPhone 17 Pro Max 独占 120 毫米焦距镜头，让你从远处也能拍出超清晰特写。
                            </p>
                        </div>
                    </FadeIn>
                     <FadeIn delay={500}>
                        <div className="border-l border-gray-700 pl-6">
                            <h4 className="text-white text-xl font-semibold mb-2">空间视频</h4>
                            <p className="text-sm leading-relaxed">
                                拍摄令人身临其境的 3D 视频，并在 Apple Vision Pro 上重温珍贵回忆。
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    </section>
  );
};
