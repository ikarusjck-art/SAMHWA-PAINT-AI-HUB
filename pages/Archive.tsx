import React from 'react';
import { PlayCircle, FileText, Download, Clock, Map, Star, Award, ChevronRight, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Archive: React.FC = () => {
  const { isApproved } = useAuth();

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">공부 자료실</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            사내 스터디 자료와 제가 정리해둔 AI 활용 팁들을 모아두었습니다.<br/>
            <span className="text-sm text-gray-500">* 모든 자료는 자유롭게 이용 가능합니다.</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Curriculum Roadmap */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 flex items-center gap-2">
            <Map className="text-primary" /> 추천 학습 순서
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl border-l-4 border-blue-400 shadow-sm">
              <div className="text-blue-500 font-bold mb-2 flex items-center justify-between">
                <span>STEP 01</span>
                <Star size={16} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI랑 친해지기</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                거창한 이론보다는, 어떻게 질문해야 원하는 답을 얻을 수 있는지 기초부터 알아봅니다.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 mb-4">
                <li>• LLM이 뭔가요?</li>
                <li>• 페르소나 설정하기</li>
                <li>• 거짓 답변(환각) 구별하기</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl border-l-4 border-primary shadow-sm">
              <div className="text-primary font-bold mb-2 flex items-center justify-between">
                <span>STEP 02</span>
                <Star size={16} fill="currentColor" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">내 업무에 써먹기</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                실제 우리가 하는 문헌 조사, 실험 데이터 정리에 바로 쓸 수 있는 프롬프트를 연습합니다.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 mb-4">
                <li>• 논문 빨리 읽기</li>
                <li>• 실험 데이터 엑셀 정리</li>
                <li>• 예시(Shot) 몇 개로 성능 높이기</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl border-l-4 border-secondary shadow-sm">
              <div className="text-secondary font-bold mb-2 flex items-center justify-between">
                <span>STEP 03</span>
                <Award size={16} fill="currentColor" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">조심할 점 & 보안</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                우리 회사의 소중한 데이터를 지키면서 안전하게 쓰는 방법을 꼭 숙지해주세요.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 mb-4">
                <li>• 보안 가이드라인 준수</li>
                <li>• 저작권 이슈 피해가기</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 flex items-center gap-2">
            <PlayCircle className="text-secondary" /> 지난 스터디 영상
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={`https://loremflickr.com/800/600/presentation,seminar?random=${item}`} 
                    alt="Webinar Thumbnail" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                       <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <PlayCircle size={32} className="text-white" fill="currentColor" />
                       </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3 text-xs font-semibold">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">스터디 녹화</span>
                    <span className="text-gray-400">2024.05.{10 + item}</span>
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2 line-clamp-2 text-lg group-hover:text-primary transition-colors">
                    {item}차 AI 활용 스터디
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                    지난주 회의실에서 진행했던 프롬프트 엔지니어링 기초 세션 녹화본입니다.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Documents Section */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 flex items-center gap-2">
            <FileText className="text-indigo-600" /> 공유 자료
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100 overflow-hidden">
            {[
              { name: "생성형 AI 활용 가이드북 v1.2.pdf", cat: "가이드", size: "12.5MB" },
              { name: "2024년 1분기 AI 트렌드 리포트.pdf", cat: "참고", size: "4.2MB" },
              { name: "도료/화학 분야 특화 프롬프트 모음집.xlsx", cat: "템플릿", size: "1.8MB" },
              { name: "필독_사내 보안 규정.pdf", cat: "보안", size: "1.1MB" }
            ].map((file, idx) => (
              <div key={idx} className="p-6 flex items-center justify-between hover:bg-blue-50/50 transition-colors group">
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-gray-100 rounded-lg text-gray-500 group-hover:bg-white group-hover:text-primary transition-colors shadow-sm">
                    <FileText size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{file.cat}</span>
                    </div>
                    <h4 className="font-bold text-neutral-900 text-lg group-hover:text-primary transition-colors">{file.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">업데이트: 2024.05.{20 - idx} • {file.size}</p>
                  </div>
                </div>
                <button 
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium border rounded-lg transition-all shadow-sm text-gray-700 border-gray-300 hover:bg-primary hover:text-white hover:border-primary"
                >
                  <Download size={18} /> 
                  <span className="hidden sm:inline">다운로드</span>
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Archive;