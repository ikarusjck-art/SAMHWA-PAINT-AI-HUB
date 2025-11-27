import React from 'react';
import { MessageSquare, ThumbsUp, HelpCircle, Send, Users, MessageCircle, Lock } from 'lucide-react';
import { COMMUNITY_POSTS } from '../constants';
import { useAuth } from '../contexts/AuthContext';

const Support: React.FC = () => {
  const { user } = useAuth();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("소중한 의견 감사합니다. 확인 후 연락드리겠습니다.");
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">소통방</h1>
          <p className="text-lg text-gray-600">
            동료 여러분과 자유롭게 이야기하는 공간입니다.<br/>
            궁금한 점이나 좋은 팁이 있다면 편하게 남겨주세요.
          </p>
        </div>

        {/* Community Board Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
              <Users className="text-primary" /> 모두의 팁
            </h2>
            <button className="text-sm text-primary font-semibold hover:underline">
              전체글 보기 &rarr;
            </button>
          </div>
          
          <div className="grid gap-4">
            {COMMUNITY_POSTS.map((post) => (
              <div key={post.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        post.category === '노하우' ? 'bg-green-100 text-green-700' :
                        post.category === '질문' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      작성자: <span className="font-medium text-gray-700">{post.author}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={16} /> <span className="text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} /> <span className="text-sm">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <HelpCircle className="text-secondary" /> 자주 묻는 내용
          </h2>
          <div className="space-y-4">
            <details className="group bg-white p-5 rounded-xl border border-gray-200 cursor-pointer shadow-sm">
              <summary className="font-bold text-neutral-800 flex justify-between items-center list-none text-lg">
                자료는 누구나 볼 수 있나요?
                <span className="text-gray-400 group-open:rotate-180 transition-transform bg-gray-100 rounded-full p-1">▼</span>
              </summary>
              <div className="mt-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                네, Samhwa paint AI R&BD Hub는 임직원 누구나 제약 없이 모든 자료를 열람하고 다운로드할 수 있습니다.
              </div>
            </details>
            <details className="group bg-white p-5 rounded-xl border border-gray-200 cursor-pointer shadow-sm">
              <summary className="font-bold text-neutral-800 flex justify-between items-center list-none text-lg">
                제가 만든 템플릿도 올리고 싶어요.
                <span className="text-gray-400 group-open:rotate-180 transition-transform bg-gray-100 rounded-full p-1">▼</span>
              </summary>
              <div className="mt-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                언제든 환영입니다! 아래 폼으로 내용을 보내주시거나 메일 주시면 검토 후 '도구상자' 메뉴에 반영하겠습니다.
              </div>
            </details>
          </div>
        </div>

        {/* Suggestion Form */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 relative overflow-hidden">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <MessageSquare className="text-indigo-600" /> 문의 및 건의사항
          </h2>
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">이름</label>
                <input 
                  type="text" 
                  readOnly 
                  value={user?.name || ''} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500" 
                  placeholder="로그인 필요" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">소속</label>
                <input 
                  type="text" 
                  readOnly 
                  value={user?.department || ''} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500" 
                  placeholder="로그인 필요" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">유형</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow bg-white">
                <option>질문 있어요</option>
                <option>자료 요청</option>
                <option>이런 기능 있으면 좋겠어요</option>
                <option>기타</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">내용</label>
              <textarea className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow resize-none" placeholder="내용을 편하게 적어주세요."></textarea>
            </div>
            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold shadow-md transition-all bg-primary text-white hover:bg-blue-700 hover:-translate-y-0.5">
                <Send size={18} /> 보내기
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Support;