import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Mail, Phone, MessageSquare, MapPin } from 'lucide-react';

// 服务项目数据
const services = [
  {
    title: '一对一视频指导',
    description: '专业导师在线指导，针对您的具体问题提供定制化解决方案',
    features: [
      '60分钟高清视频通话',
      '实时屏幕共享演示',
      '个性化问题解答',
      '后续跟进邮件总结'
    ],
    price: '¥299/次'
  },
  {
    title: '项目代做服务',
    description: '专业团队为您完成视频剪辑、调色、封面设计等项目需求',
    features: [
      '专业团队操刀',
      '快速交付周期',
      '3次免费修改',
      '商业使用授权'
    ],
    price: '¥899起'
  },
  {
    title: '系统课程培训',
    description: '系统化学习视频制作全流程，从入门到精通掌握核心技能',
    features: [
      '40+小时高清课程',
      '课程资料永久访问',
      '学习社群交流',
      '结业证书颁发'
    ],
    price: '¥1299/套'
  },
  {
    title: '模板素材会员',
    description: '海量模板、预设、素材资源下载，助力您的创作效率提升',
    features: [
      '1000+模板资源',
      '每周更新内容',
      '多平台适配',
      '无水印使用'
    ],
    price: '¥199/月'
  }
];

// FAQ数据
const faqs = [
  {
    question: '服务流程是怎样的？',
    answer: '首先选择您需要的服务类型并提交需求，我们的客服会在24小时内与您联系确认细节，确认后支付预付款，我们开始服务，完成后您验收并支付尾款，最后提供售后服务。'
  },
  {
    question: '如何保证服务质量？',
    answer: '我们所有服务人员均经过严格筛选和专业培训，拥有丰富的行业经验。服务过程中会保持与您的密切沟通，确保最终成果符合预期。所有服务提供质量保障期。'
  },
  {
    question: '付款方式有哪些？',
    answer: '我们支持微信支付、支付宝、银行转账等多种付款方式。对于大额服务项目，可提供分期付款方案，具体可咨询客服人员。'
  },
  {
    question: '是否提供发票？',
    answer: '是的，我们可以为所有付费服务提供正规增值税普通发票或专用发票，您只需在付款后提供相关开票信息即可。'
  },
  {
    question: '服务不满意怎么办？',
    answer: '我们提供服务修改机制，基础服务包含3次免费修改机会。如仍无法满足您的需求，可根据实际情况协商退款或更换服务内容。'
  }
];

const ServicesSupport: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 头部英雄区域 */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/services.svg"
            alt="服务与支持"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 cursor-pointer" onClick={() => navigate(-1)} />
        </div>
        <div className="absolute inset-0 z-5 cursor-pointer" onClick={() => navigate(-1)} />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <Link to="/services" className="text-white hover:text-blue-300 transition-colors">服务与支持</Link>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">专业的服务，全方位的支持，助您创作无忧</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services" className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium rounded-md transition-colors border border-white/30">
                常见问题
              </Link>
            <Link to="/services" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors inline-flex items-center">
                联系我们 <ChevronRight size={16} className="ml-2" />
              </Link>
          </div>
        </div>
      </section>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* 服务项目部分 */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">我们的服务</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">专业的服务体系，满足您的多样化需求</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden transition-all hover:shadow-xl">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check size={18} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                    <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
                      立即购买
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 支持渠道部分 */}
        <section className="mb-24 bg-gray-50 py-16 rounded-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">支持渠道</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">多种方式联系我们，随时获取帮助</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">邮件支持</h3>
              <p className="text-gray-600 mb-4">发送邮件至我们的支持邮箱</p>
              <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">电话咨询</h3>
              <p className="text-gray-600 mb-4">工作日9:00-18:00提供服务</p>
              <a href="tel:4001234567" className="text-blue-600 hover:underline">400-123-4567</a>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">在线客服</h3>
              <p className="text-gray-600 mb-4">实时在线聊天，快速解决问题</p>
              <button className="text-blue-600 hover:underline">开始对话</button>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">线下服务</h3>
              <p className="text-gray-600 mb-4">预约面对面交流指导</p>
              <button className="text-blue-600 hover:underline">预约时间</button>
            </div>
          </div>
        </section>

        {/* FAQ部分 */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">常见问题</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">解答您最关心的问题</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 联系我们部分 */}
        <section className="bg-blue-600 text-white rounded-3xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">需要更多帮助？</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">如果您有任何问题或需求，欢迎随时联系我们，我们将竭诚为您服务</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors">
                立即咨询
              </button>
              <button className="px-8 py-3 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800 transition-colors border border-white/30">
                提交需求
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 页脚区域 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="mb-4">© 2023 服务与支持中心. 保留所有权利.</p>
            <div className="flex justify-center gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">使用条款</a>
              <a href="#" className="hover:text-white transition-colors">隐私政策</a>
              <a href="#" className="hover:text-white transition-colors">联系我们</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesSupport;