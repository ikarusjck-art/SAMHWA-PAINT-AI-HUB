import React from 'react';
import { Book, Database, PenTool, CheckCircle } from 'lucide-react';

const Guide: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-neutral-50 border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">AI R&D 가이드</h1>
          <p className="text-gray-600 max-w-3xl">
            연구 개발 단계별 생성형 AI 활용 방법론과 프롬프트 엔지니어링 팁을 확인하세요.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="hidden lg:block lg:col-span-1">
          <nav className="sticky top-24 space-y-1">
            <a href="#planning" className="block px-4 py-2 text-sm font-medium text-primary bg-blue-50 rounded-md">1. 연구 기획 단계</a>
            <a href="#experiment" className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">2. 실험 및 분석 단계</a>
            <a href="#reporting" className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">3. 결과 보고 단계</a>
            <a href="#ethics" className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">4. 보안 및 윤리</a>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-16">
          
          {/* Section 1 */}
          <section id="planning" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg text-primary">
                <Database size={24} />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">1. 연구 기획 및 문헌 조사</h2>
            </div>
            <div className="prose prose-blue max-w-none text-gray-600">
              <p>
                연구 초기 단계에서 방대한 논문과 특허를 효율적으로 탐색하는 것이 중요합니다. 
                AI를 활용하여 핵심 키워드를 추출하고, 관련 기술 트렌드를 요약하세요.
              </p>
              <div className="bg-gray-50 border-l-4 border-primary p-6 my-6 rounded-r-lg">
                <h4 className="font-bold text-neutral-900 mb-2">💡 추천 프롬프트 구조</h4>
                <p className="text-sm font-mono text-gray-700 bg-white p-3 border rounded border-gray-200">
                  "다음 주제에 대한 최신 연구 동향을 요약해줘: [주제]<br/>
                  특히 [특정 소재/기술]의 활용 사례를 중심으로, 장점과 한계를 3가지씩 나열해줘."
                </p>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                <li>관련 특허의 청구항 분석 및 회피 전략 브레인스토밍</li>
                <li>경쟁사 기술 동향 비교 분석 테이블 생성</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section id="experiment" className="scroll-mt-24 border-t border-gray-100 pt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg text-secondary">
                <Book size={24} />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">2. 실험 설계(DoE) 및 데이터 해석</h2>
            </div>
            <div className="prose prose-blue max-w-none text-gray-600">
              <p>
                실험 계획법(Design of Experiments) 수립 시 변수 설정을 보조받고, 
                도출된 데이터의 패턴을 해석하는 데 AI를 활용할 수 있습니다.
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-3">실험 계획 보조</h3>
                  <p className="text-sm">입력 변수와 출력 반응치를 정의하면, 효율적인 실험 조합(직교배열표 등)을 제안받을 수 있습니다.</p>
                </div>
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-3">결과 데이터 해석</h3>
                  <p className="text-sm">실험 결과 수치를 입력하고, 예상과 다른 결과가 나온 원인에 대해 화학적 메커니즘 관점의 가설을 수립합니다.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="reporting" className="scroll-mt-24 border-t border-gray-100 pt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <PenTool size={24} />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">3. 기술 보고서 및 발표 자료 작성</h2>
            </div>
            <div className="prose prose-blue max-w-none text-gray-600">
              <p>
                연구 결과를 설득력 있게 전달하기 위한 논리 구조를 잡고, 초안을 빠르게 작성합니다.
                전문 용어의 영문 표기법 교정이나 문체 다듬기에도 유용합니다.
              </p>
              <div className="bg-neutral-900 text-gray-300 p-6 rounded-lg mt-6">
                <p className="font-mono text-sm">
                  <span className="text-blue-400">User:</span> 이 실험 결과를 바탕으로 경영진 보고용 요약 장표에 들어갈 문구를 3줄로 작성해줘.<br/>
                  <span className="text-green-400">AI:</span> <br/>
                  1. 신규 첨가제 도입으로 기존 대비 내후성 20% 향상 확인<br/>
                  2. 공정 시간 15% 단축을 통한 생산 원가 절감 가능성 확보<br/>
                  3. 차년도 양산 적용을 위한 Pilot Test 계획 수립 필요
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="ethics" className="scroll-mt-24 border-t border-gray-100 pt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <CheckCircle size={24} />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">4. 보안 및 윤리 가이드라인</h2>
            </div>
            <div className="bg-red-50 border border-red-100 p-6 rounded-lg">
              <h3 className="text-secondary font-bold mb-3">⚠️ 중요: 데이터 보안 수칙</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li><strong>민감 정보 입력 금지:</strong> 회사의 기밀 배합비, 미공개 특허 내용, 개인정보 등은 절대 입력하지 마세요.</li>
                <li><strong>결과 검증 필수:</strong> AI가 생성한 화학 반응식이나 물성 데이터는 반드시 전문 지식을 바탕으로 교차 검증해야 합니다.</li>
                <li><strong>저작권 주의:</strong> 생성된 텍스트나 이미지를 대외비 문서나 마케팅 자료로 활용 시 저작권 규정을 확인하세요.</li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Guide;
