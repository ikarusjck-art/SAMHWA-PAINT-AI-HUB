import React, { useState } from 'react';
import { LAB_TOPICS } from '../constants';
import { ChatMessage } from '../types';
import { generateLabChat } from '../services/geminiService';
import { Send, Bot, User, Sparkles, RefreshCw, CheckCircle, Copy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LabAssistant: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { gainXp } = useAuth();

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: text, timestamp: Date.now() };
    setChatHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    gainXp(15); // Higher XP for research activities

    try {
      const response = await generateLabChat(text);
      const botMsg: ChatMessage = { role: 'model', text: response, timestamp: Date.now() };
      setChatHistory(prev => [...prev, botMsg]);
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'model', text: "시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요.", timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicClick = (prompt: string) => {
    setChatHistory([]); // Optional: Clear history for new topic or keep it
    handleSend(prompt);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('내용이 복사되었습니다.');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0f172a] text-white p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto h-[85vh] flex flex-col lg:flex-row gap-6">
        
        {/* Left Panel: Topics */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div>
             <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
               <span className="text-emerald-400">LAB ASSISTANT</span>
             </h1>
             <p className="text-slate-400 text-sm">
               구글 Gemini API를 연동해두었습니다.<br/>
               궁금한 내용을 물어보세요. (아직 테스트 중입니다!)
             </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white/90">
              <Sparkles size={18} className="text-emerald-400" /> 주요 공유 주제
            </h3>
            
            {LAB_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTopicClick(topic.prompt)}
                className="w-full text-left bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700 hover:border-emerald-500/50 p-5 rounded-xl transition-all duration-200 group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-emerald-400" />
                  <h4 className="font-bold text-white group-hover:text-emerald-300 transition-colors">{topic.title}</h4>
                </div>
                <p className="text-sm text-slate-400 mb-3 pl-6">{topic.desc}</p>
                <div className="pl-6">
                  <span className="inline-block px-2 py-1 bg-slate-700 text-xs text-emerald-400 rounded-md font-medium">
                    {topic.tag}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel: Chat Interface */}
        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="bg-[#0f766e] p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white text-lg">ChemAI Research Assistant</h2>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span>
                  <span className="text-xs text-emerald-100 font-medium">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setChatHistory([])}
              className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              title="대화 초기화"
            >
              <RefreshCw size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-6">
            {chatHistory.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                   <Bot size={40} className="text-[#0f766e]" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">안녕하세요! 화학 R&D AI 어시스턴트입니다.</h3>
                <p className="text-slate-500 max-w-sm">
                  연구 프롬프트 작성이나 소재 데이터 분석에 대해 궁금한 점을 물어보시거나,<br/>
                  왼쪽의 추천 주제를 선택해 대화를 시작해보세요.
                </p>
              </div>
            ) : (
              chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${
                      msg.role === 'user' ? 'bg-indigo-600' : 'bg-[#0f766e]'
                    }`}>
                      {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                    </div>
                    
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm relative group ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}>
                      <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                        {msg.text}
                      </div>
                      {msg.role === 'model' && (
                        <button 
                          onClick={() => copyToClipboard(msg.text)}
                          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-[#0f766e]"
                          title="복사하기"
                        >
                          <Copy size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-[#0f766e] flex-shrink-0 flex items-center justify-center mt-1">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#0f766e] rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-[#0f766e] rounded-full animate-bounce delay-75"></span>
                      <span className="w-2 h-2 bg-[#0f766e] rounded-full animate-bounce delay-150"></span>
                    </div>
                 </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="화학 반응 메커니즘이나 실험 데이터에 대해 질문해보세요..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl py-4 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:border-transparent transition-all"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className={`absolute right-2 top-2 p-2 rounded-lg transition-all ${
                  isLoading || !input.trim() 
                    ? 'text-slate-300 bg-transparent' 
                    : 'bg-[#0f766e] text-white hover:bg-[#115e59] shadow-md'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabAssistant;