import React, { useState } from 'react';
import { AI_TEMPLATES } from '../constants';
import { generateRnDContent } from '../services/geminiService';
import { TemplateItem, ChatMessage } from '../types';
import { Send, Copy, RotateCcw, Sparkles, AlertCircle } from 'lucide-react';

const Templates: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleTemplateClick = (template: TemplateItem) => {
    setSelectedTemplate(template);
    setCustomPrompt(template.prompt);
    // Reset chat when selecting a new template context
    setChatHistory([]);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!customPrompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    // Add user message immediately
    const userMsg: ChatMessage = {
      role: 'user',
      text: customPrompt,
      timestamp: Date.now()
    };
    setChatHistory(prev => [...prev, userMsg]);

    try {
      const result = await generateRnDContent(customPrompt);
      
      const modelMsg: ChatMessage = {
        role: 'model',
        text: result,
        timestamp: Date.now()
      };
      setChatHistory(prev => [...prev, modelMsg]);
    } catch (e) {
      setError("AI 응답 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('내용이 클립보드에 복사되었습니다.');
  };

  return (
    <div className="bg-neutral-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col md:flex-row gap-6">
        
        {/* Left Column: Template List */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Sparkles className="text-primary" size={20} />
              추천 템플릿
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              R&D 업무에 최적화된 프롬프트 템플릿을 선택하여 빠르게 시작하세요.
            </p>
            
            <div className="space-y-3">
              {AI_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateClick(template)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    selectedTemplate?.id === template.id
                      ? 'bg-blue-50 border-primary ring-1 ring-primary'
                      : 'bg-white border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{template.category}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{template.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{template.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Playground */}
        <div className="w-full md:w-2/3 flex flex-col h-[800px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-700">Samhwa AI Assistant</h3>
            <button 
              onClick={() => { setChatHistory([]); setCustomPrompt(''); setSelectedTemplate(null); }}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-200 transition-colors"
              title="대화 초기화"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
            {chatHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center p-8">
                <Sparkles size={48} className="mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-500">AI 보조 연구원에게 질문하세요</p>
                <p className="text-sm mt-2 max-w-sm">
                  왼쪽에서 템플릿을 선택하거나, 아래 입력창에 연구 관련 질문을 직접 입력할 수 있습니다.
                </p>
              </div>
            ) : (
              chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl p-5 shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-br-none' 
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                    }`}
                  >
                    <div className="prose prose-sm max-w-none whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                    </div>
                    {msg.role === 'model' && (
                      <div className="mt-3 flex justify-end">
                        <button 
                          onClick={() => copyToClipboard(msg.text)}
                          className="text-xs text-gray-400 hover:text-primary flex items-center gap-1 transition-colors"
                        >
                          <Copy size={12} /> 복사
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></div>
                  <span className="text-sm text-gray-500 ml-2">분석 중...</span>
                </div>
              </div>
            )}
            {error && (
               <div className="flex justify-center">
                 <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg flex items-center gap-2">
                   <AlertCircle size={16} /> {error}
                 </div>
               </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="relative">
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="여기에 프롬프트를 입력하거나 템플릿 내용을 수정하세요..."
                className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none h-32 text-sm leading-relaxed"
                onKeyDown={(e) => {
                    if(e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleGenerate();
                    }
                }}
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !customPrompt.trim()}
                className={`absolute bottom-3 right-3 p-2 rounded-lg transition-all ${
                  isGenerating || !customPrompt.trim()
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-blue-700 shadow-sm'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              * AI는 실수를 할 수 있습니다. 중요한 연구 데이터는 반드시 교차 검증하십시오.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Templates;
