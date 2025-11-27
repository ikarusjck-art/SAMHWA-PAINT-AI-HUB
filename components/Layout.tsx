import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS, CONTACT_INFO } from '../constants';
import { Menu, X, Beaker, Copyright, User, LogIn, Settings, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import FloatingChat from './FloatingChat';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Login Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('');

  const location = useLocation();
  const { user, login, logout, approveUser, isApproved, isAdmin } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && dept) {
      login(name, email, dept);
      setIsLoginModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">
                  <Beaker size={20} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
                    <span className="font-bold text-xl text-primary tracking-tight">Samhwa paint AI R&BD Hub</span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-6">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                      isActive
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-500 hover:text-primary hover:border-gray-300'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* User Menu */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                   {/* XP Bar */}
                   <div className="hidden xl:flex flex-col w-24">
                        <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
                            <span className="font-bold text-primary">Lv.{user.level}</span>
                            <span>{Math.floor((user.xp / user.maxXp) * 100)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                                style={{ width: `${(user.xp / user.maxXp) * 100}%` }}
                            ></div>
                        </div>
                   </div>

                   <div className="relative group">
                    <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${isAdmin ? 'bg-purple-600' : 'bg-primary'}`}>
                        {isAdmin ? <Shield size={16} /> : <User size={16} />}
                        </div>
                        <div className="text-left">
                        <div className="leading-none flex items-center gap-1">
                            {user.name}
                            {isAdmin && <span className="text-[10px] bg-purple-100 text-purple-700 px-1 rounded">관리자</span>}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                            {user.role === 'member' || user.role === 'admin' ? user.department : '승인 대기중'}
                        </div>
                        </div>
                    </button>
                    
                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block border border-gray-100 animate-fade-in">
                        {isAdmin && (
                            <Link to="/admin" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <Settings size={14} /> 사이트 관리
                            </Link>
                        )}
                        <button 
                            onClick={() => setIsLoginModalOpen(true)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            프로필 수정
                        </button>
                        <button 
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                        초기화
                        </button>
                    </div>
                   </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-primary text-sm font-medium rounded-md text-primary hover:bg-blue-50 focus:outline-none"
                >
                  <LogIn size={16} className="mr-2" />
                  프로필 설정
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200">
            <div className="pt-2 pb-3 space-y-1 px-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    location.pathname === item.path
                      ? 'bg-blue-50 border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-3 mt-3">
                {user ? (
                   <div className="px-3 space-y-3">
                     <div className="flex items-center justify-between">
                         <span className="text-sm font-medium text-gray-700">{user.name} ({user.department})</span>
                         <span className="text-xs font-bold text-primary border border-primary px-1 rounded">Lv.{user.level}</span>
                     </div>
                     {isAdmin && (
                        <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block w-full text-left text-sm text-purple-700 font-medium">
                            관리자 페이지
                        </Link>
                     )}
                     <button onClick={() => { setIsMenuOpen(false); setIsLoginModalOpen(true); }} className="block w-full text-left text-sm text-gray-700">프로필 수정</button>
                     <button onClick={logout} className="block w-full text-left text-sm text-red-600">초기화</button>
                   </div>
                ) : (
                  <button 
                    onClick={() => { setIsMenuOpen(false); setIsLoginModalOpen(true); }}
                    className="w-full text-left pl-3 pr-4 py-2 text-primary font-medium"
                  >
                    프로필 설정
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow relative">
        {children}
      </main>

      {/* Floating Chat */}
      <FloatingChat />

      {/* Footer */}
      <footer className="bg-neutral-900 text-white pt-10 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Samhwa Paint AI R&BD Hub</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                동료 임직원들의 성장을 응원합니다.<br />
                함께 공부하고 나누며 발전하는 공간이 되길 바랍니다.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">운영자 연락처</h3>
              <p className="text-gray-400 text-sm mb-1">Email:</p>
              <div className="flex flex-col mb-3">
                {CONTACT_INFO.email.map(email => (
                  <a key={email} href={`mailto:${email}`} className="text-gray-400 hover:text-white text-sm">{email}</a>
                ))}
              </div>
              <p className="text-gray-400 text-sm mb-1">Phone:</p>
              <p className="text-gray-400 text-sm">
                {CONTACT_INFO.phone} <span className="text-xs text-gray-500 block sm:inline">{CONTACT_INFO.phoneSub}</span>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Office</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {CONTACT_INFO.address}
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-6 flex items-center justify-between">
            <p className="text-gray-500 text-sm flex items-center">
              <Copyright size={14} className="mr-1" /> 2024. 삼화페인트 장책임.
            </p>
            <div className="flex space-x-4">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="w-2 h-2 rounded-full bg-primary"></span>
            </div>
          </div>
        </div>
      </footer>

      {/* Profile Edit Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">프로필 설정</h2>
              <button onClick={() => setIsLoginModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              게시글이나 댓글에 표시될 정보를 입력해주세요.
            </p>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="예: 홍길동"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">소속 팀</label>
                <input 
                  type="text" 
                  required
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="예: 수지합성팀"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="사내 이메일"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-2"
              >
                저장하기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;