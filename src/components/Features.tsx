import React from 'react';
import { FadeIn } from './FadeIn';

export const Features: React.FC = () => {
  return (
    <section className="relative bg-black text-white py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn delay={0} className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-semibold mb-8">
            突破极限的性能。
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A19 Pro 芯片带来更强大的性能和更持久的续航，
            <br className="md:hidden" />
            让你在各种场景下都能游刃有余。
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left Side - Image */}
          <FadeIn delay={200} className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-3xl flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-black rounded-2xl border border-gray-800 flex items-center justify-center">
                <div className="text-9xl font-bold text-gray-800">💪</div>
              </div>
            </div>
          </FadeIn>

          {/* Right Side - Features List */}
          <div className="space-y-12">
            <FadeIn delay={400}>
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                  A19 Pro 芯片
                </h3>
                <p className="text-gray-400 text-lg">
                  基于 3 纳米工艺打造，性能提升 20%，能效提升 15%。
                  无论是游戏、视频编辑还是 AI 处理，都能轻松应对。
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={600}>
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                  钛金属机身
                </h3>
                <p className="text-gray-400 text-lg">
                  采用航空级钛金属材质，比不锈钢轻 30%，更坚固耐用。
                  精致的工艺，带来出色的手感和视觉效果。
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={800}>
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                  Pro 级摄像头系统
                </h3>
                <p className="text-gray-400 text-lg">
                  升级的三摄系统，支持 8K 视频录制和夜间模式人像。
                  全新的 LiDAR 扫描仪，带来更精准的对焦和增强现实体验。
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
