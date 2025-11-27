import React, { useState } from 'react';
import { useSite } from '../contexts/SiteContext';
import { useAuth } from '../contexts/AuthContext';
import { Save, Users, Type, Megaphone, Check } from 'lucide-react';

const Admin: React.FC = () => {
  const { config, updateConfig } = useSite();
  const { pendingUsers, approveUser, isAdmin } = useAuth();
  
  // Local state for form inputs to avoid too many re-renders/context updates on keystroke
  const [localConfig, setLocalConfig] = useState(config);
  const [activeTab, setActiveTab] = useState<'content' | 'users'>('content');

  if (!isAdmin) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-neutral-50">
              <div className="text-center">
                  <h1 className="text-2xl font-bold text-red-600 mb-2">접근 권한이 없습니다</h1>
                  <p className="text-gray-600">관리자만 접근 가능한 페이지입니다.</p>
              </div>
          </div>
      );
  }

  const handleSave = () => {
    updateConfig(localConfig);
    alert('사이트 설정이 저장되었습니다.');
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-neutral-900">사이트 관리자 모드</h1>
            <p className="text-gray-500">메인 페이지 문구 수정 및 사용자 승인 관리를 수행합니다.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button 
                onClick={() => setActiveTab('content')}
                className={`pb-3 px-1 font-bold transition-colors ${activeTab === 'content' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
                <div className="flex items-center gap-2"><Type size={18} /> 사이트 문구 설정</div>
            </button>
            <button 
                onClick={() => setActiveTab('users')}
                className={`pb-3 px-1 font-bold transition-colors ${activeTab === 'users' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
                <div className="flex items-center gap-2">
                    <Users size={18} /> 사용자 승인 
                    {pendingUsers.length > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{pendingUsers.length}</span>}
                </div>
            </button>
        </div>

        {activeTab === 'content' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-4xl animate-fade-in">
                <div className="space-y-8">
                    {/* Main Banner Section */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Type className="text-primary" /> 메인 배너 텍스트
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">상단 소제목 (Tagline)</label>
                                <input 
                                    value={localConfig.mainSubtitle}
                                    onChange={e => setLocalConfig({...localConfig, mainSubtitle: e.target.value})}
                                    className="w-full border p-2 rounded focus:outline-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">메인 타이틀</label>
                                <textarea 
                                    value={localConfig.mainTitle}
                                    onChange={e => setLocalConfig({...localConfig, mainTitle: e.target.value})}
                                    className="w-full border p-2 rounded h-20 focus:outline-primary"
                                />
                                <p className="text-xs text-gray-400 mt-1">줄바꿈은 화면에 그대로 반영됩니다.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">설명 문구</label>
                                <textarea 
                                    value={localConfig.mainDescription}
                                    onChange={e => setLocalConfig({...localConfig, mainDescription: e.target.value})}
                                    className="w-full border p-2 rounded h-24 focus:outline-primary"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Megaphone className="text-secondary" /> 공지사항 배너
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    id="showNotice"
                                    checked={localConfig.showNotice}
                                    onChange={e => setLocalConfig({...localConfig, showNotice: e.target.checked})}
                                    className="w-4 h-4 text-primary rounded"
                                />
                                <label htmlFor="showNotice" className="text-sm font-medium text-gray-700">공지사항 배너 표시하기</label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">공지 제목</label>
                                <input 
                                    value={localConfig.noticeTitle}
                                    onChange={e => setLocalConfig({...localConfig, noticeTitle: e.target.value})}
                                    className="w-full border p-2 rounded focus:outline-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">공지 내용</label>
                                <input 
                                    value={localConfig.noticeContent}
                                    onChange={e => setLocalConfig({...localConfig, noticeContent: e.target.value})}
                                    className="w-full border p-2 rounded focus:outline-primary"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button 
                            onClick={handleSave}
                            className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Save size={20} /> 변경사항 저장
                        </button>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'users' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-fade-in">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">부서</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">승인 관리</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pendingUsers.length > 0 ? (
                            pendingUsers.map(user => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => approveUser(user.id)}
                                            className="text-green-600 hover:text-green-900 font-bold flex items-center justify-end gap-1 ml-auto"
                                        >
                                            <Check size={16} /> 승인
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    승인 대기 중인 사용자가 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
