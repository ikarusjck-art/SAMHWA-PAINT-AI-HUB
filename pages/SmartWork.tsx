import React, { useState } from 'react';
import { Briefcase, Calculator, Mail, Users, ArrowRight, Zap, Copy, RotateCcw } from 'lucide-react';
import { OFFICE_TEMPLATES } from '../constants';
import { generateOfficeTask } from '../services/geminiService';
import { useAuth } from '../contexts/AuthContext';

const SmartWork: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState(OFFICE_TEMPLATES[0]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const { gainXp } = useAuth();

  const handleGenerate = async () => {
    if (!inputPrompt) return;
    setLoading(true);
    gainXp(10); // Reward for using smart work tool
    
    // Combine template prompt with user input
    const fullPrompt = selectedTask.prompt.replace(/\[.*?\]/, inputPrompt);
    
    const response = await generateOfficeTask(fullPrompt);
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-4">
                Smart Work
            </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            단순 업무는 AI에게,<br/>우리는 더 가치 있는 일에 집중합니다.
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed">
            연구원뿐만 아니라 인사, 총무, 회계, 영업 등 전사 임직원 누구나 활용할 수 있는<br/>
            업무 자동화 및 효율화 도구를 제공합니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
                { title: '인사/총무', icon: Users, desc: '사내 공지문 작성, 교육 자료 요약', color: 'bg-orange-50 text-orange-600' },
                { title: '재무/회계', icon: Calculator, desc: '엑셀 데이터 정리, 영수증 처리 가이드', color: 'bg-green-50 text-green-600' },
                { title: '영업/마케팅', icon: Briefcase, desc: '고객 제안서 초안, 트렌드 조사', color: 'bg-blue-50 text-blue-600' },
                { title: '해외사업', icon: Mail, desc: '비즈니스 영어 이메일, 번역', color: 'bg-purple-50 text-purple-600' },
            ].map((card, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer">
                    <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
                        <card.icon size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-500">{card.desc}</p>
                </div>
            ))}
        </div>

        {/* Interactive Zone */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row h-[700px]">
            {/* Sidebar */}
            <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-200 p-6 flex flex-col">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Zap size={20} className="text-yellow-500" fill="currentColor" /> 추천 업무 레시피
                </h3>
                <div className="space-y-3 overflow-y-auto flex-1 pr-2">
                    {OFFICE_TEMPLATES.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setSelectedTask(item); setResult(''); setInputPrompt(''); }}
                            className={`w-full text-left p-4 rounded-lg border transition-all ${
                                selectedTask.id === item.id 
                                ? 'bg-white border-primary ring-1 ring-primary shadow-sm' 
                                : 'bg-transparent border-gray-200 hover:bg-white hover:border-gray-300'
                            }`}
                        >
                            <div className="text-xs font-bold text-gray-500 mb-1">{item.category}</div>
                            <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                            <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Workspace */}
            <div className="flex-1 p-8 flex flex-col">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedTask.title}</h2>
                    <p className="text-gray-600">{selectedTask.description}</p>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                    <div className="relative">
                        <textarea
                            className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-gray-50"
                            placeholder="여기에 구체적인 상황이나 내용을 입력해주세요..."
                            value={inputPrompt}
                            onChange={(e) => setInputPrompt(e.target.value)}
                        ></textarea>
                        <button 
                            onClick={handleGenerate}
                            disabled={loading}
                            className={`absolute bottom-4 right-4 px-6 py-2 rounded-lg font-bold text-white flex items-center gap-2 transition-all ${
                                loading ? 'bg-gray-400 cursor-wait' : 'bg-primary hover:bg-blue-700'
                            }`}
                        >
                            {loading ? 'AI가 생각 중...' : <><Zap size={18} /> 실행하기</>}
                        </button>
                    </div>

                    <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-6 relative overflow-y-auto">
                        {result ? (
                            <div className="prose prose-sm max-w-none">
                                {result.split('\n').map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <Briefcase size={48} className="mb-4 text-gray-300" />
                                <p>내용을 입력하고 실행 버튼을 눌러보세요.</p>
                            </div>
                        )}
                        {result && (
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button onClick={() => navigator.clipboard.writeText(result)} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600" title="복사">
                                    <Copy size={18} />
                                </button>
                                <button onClick={() => setResult('')} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600" title="초기화">
                                    <RotateCcw size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SmartWork;
