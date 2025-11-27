import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Microscope, FileText, Zap, BookOpen, TrendingUp, Users, Megaphone } from 'lucide-react';
import { SUCCESS_STORIES } from '../constants';
import { useSite } from '../contexts/SiteContext';

const Home: React.FC = () => {
  const { config } = useSite();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] bg-neutral-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://loremflickr.com/1600/900/laboratory,technology,blue"
            alt="Futuristic Laboratory"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-blue-900/40"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-white">
          <div className="max-w-3xl animate-fade-in-up space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-500 bg-gray-800/50 text-gray-300 text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
              {config.mainSubtitle}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight whitespace-pre-line">
              {config.mainTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl whitespace-pre-line">
              {config.mainDescription}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/archive"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-lg text-primary bg-white hover:bg-gray-100 transition-all shadow-md"
              >
                자료 구경하기 <BookOpen size={18} className="ml-2" />
              </Link>
              <Link
                to="/smart-work"
                className="inline-flex items-center px-6 py-3 border border-gray-400 bg-transparent hover:bg-white/10 text-base font-medium rounded-lg text-white transition-all"
              >
                업무 효율화 체험 <Zap size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Banner (Dynamic) */}
      {config.showNotice && (
        <div className="bg-primary/10 border-y border-primary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-start sm:items-center gap-3">
             <Megaphone className="text-primary flex-shrink-0 mt-1 sm:mt-0" size={20} />
             <div className="flex-1">
                <span className="font-bold text-primary mr-2">{config.noticeTitle}</span>
                <span className="text-gray-700 text-sm">{config.noticeContent}</span>
             </div>
          </div>
        </div>
      )}

      {/* Intro Message Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">운영 취지</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            "거창한 시스템 도입이 아닙니다."<br/><br/>
            업무를 하면서 느꼈던 비효율적인 부분들을 AI로 조금씩 개선해보고 있습니다.<br/>
            혼자만 알고 있기 아까운 팁들을 후배 연구원들은 물론,<br/> 
            관심 있는 타 부서 동료들과도 나누고 싶어 개인적으로 만든 페이지입니다.<br/>
            부담 없이 이용하시고, 좋은 아이디어가 있다면 언제든 알려주세요.
          </p>
          <div className="mt-8 flex justify-center">
             <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">함께하는 공부</h3>
              <p className="text-gray-600 mb-4 h-20">
                사내에서 진행한 스터디 내용과 외부 세미나 요약 자료를 비정기적으로 업로드합니다.
              </p>
              <Link to="/archive" className="text-sm text-gray-500 hover:text-primary font-medium inline-flex items-center">
                자료실 이동 <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-secondary mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">실무형 툴킷</h3>
              <p className="text-gray-600 mb-4 h-20">
                SWCNT, MXene 등 연구 소재는 물론, 엑셀/이메일 등 일반 업무에 필요한 템플릿도 제공합니다.
              </p>
              <Link to="/templates" className="text-sm text-gray-500 hover:text-secondary font-medium inline-flex items-center">
                템플릿 보기 <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">자유로운 소통</h3>
              <p className="text-gray-600 mb-4 h-20">
                업무 중 막히는 부분이 있거나 AI 활용 팁이 있다면 게시판에 남겨주세요. 제가 아는 선에서 답변드립니다.
              </p>
              <Link to="/support" className="text-sm text-gray-500 hover:text-indigo-600 font-medium inline-flex items-center">
                질문하러 가기 <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Examples */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">임직원 활용 사례</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUCCESS_STORIES.map((story, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="h-48 overflow-hidden rounded-lg mb-4 relative">
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">{story.title}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {story.description}
                </p>
                <div className="text-xs text-gray-400">
                  {story.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;