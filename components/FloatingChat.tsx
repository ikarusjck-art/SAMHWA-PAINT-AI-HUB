import React, { useState } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { generateRnDContent } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useAuth } from '../contexts/AuthContext';

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { gainXp } = useAuth();

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    gainXp(5); // Gain XP for asking

    try {
      const response = await generateRnDContent(userMsg.text);
      const botMsg: ChatMessage = { role: 'model', text: response, timestamp: Date.now() };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "오류가 발생했습니다.", timestamp: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center z-[100] animate-bounce-slow"
        title="AI 비서에게 질문하기"
      >
        <MessageCircle size={28} />
      </button>
    );
  }

  return (
    <div className={`fixed z-[100] transition-all duration-300 shadow-2xl bg-white border border-gray-200 rounded-t-xl rounded-bl-xl overflow-hidden flex flex-col ${
      isMinimized 
        ? 'bottom-6 right-6 w-72 h-14 rounded-xl' 
        : 'bottom-6 right-6 w-96 h-[500px]'
    }`}>
      {/* Header */}
      <div className="bg-primary text-white p-3 flex justify-between items-center cursor-pointer" onClick={() => !isMinimized && setIsMinimized(!isMinimized)}>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-bold text-sm">Samhwa AI 비서</span>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="hover:text-blue-200">
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            <button onClick={() => setIsOpen(false)} className="hover:text-blue-200">
                <X size={18} />
            </button>
        </div>
      </div>

      {/* Body */}
      {!isMinimized && (
        <>
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-gray-400 text-sm mt-10">
                        <p>궁금한 점이 있으신가요?<br/>언제든 물어보세요!</p>
                    </div>
                )}
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-white border text-gray-800'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white border p-3 rounded-lg flex gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="p-3 border-t bg-white">
                <div className="flex gap-2">
                    <input 
                        className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
                        placeholder="메시지를 입력하세요..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button onClick={handleSend} className="bg-primary text-white p-2 rounded-md hover:bg-blue-700">
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </>
      )}
    </div>
  );
};

export default FloatingChat;
