import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Bot, User, Cpu, Share2, Check } from 'lucide-react';
import { Message, ChatStatus } from '../types';
import { sendMessageStream, initializeChat } from '../services/geminiService';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: "I’m an AI assistant running on Google Gemini, embedded here on VisionaryDirector.com to help you explore what we’re building.\n\nIn the future, you’ll be able to choose which model powers me — Gemini, GPT-4.1, Claude, or others — using your own API keys."
    }
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<ChatStatus>(ChatStatus.IDLE);
  const [isSharing, setIsSharing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = [
    "How does M Forms save me money?",
    "What do you mean by a Shopping Town?",
    "Can I use Gemini to direct OpenAI models?"
  ];

  useEffect(() => {
    initializeChat();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleShare = async () => {
    const shareData = {
        title: 'Visionary Director',
        text: 'Join the waitlist for Visionary Director - The future of AI Model Aggregation.',
        url: 'https://www.visionarydirector.com'
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        // Fallback to clipboard
        try {
            await navigator.clipboard.writeText(shareData.url);
            setIsSharing(true);
            setTimeout(() => setIsSharing(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
  };

  const handleSend = async (messageOverride?: string) => {
    const contentToSend = typeof messageOverride === 'string' ? messageOverride : input;
    if (!contentToSend.trim() || status === ChatStatus.LOADING || status === ChatStatus.STREAMING) return;

    const userMessage: Message = {
      role: 'user',
      content: contentToSend,
      id: Date.now().toString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setStatus(ChatStatus.LOADING);

    const modelMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { role: 'model', content: '', id: modelMessageId }]);

    try {
      setStatus(ChatStatus.STREAMING);
      const stream = sendMessageStream(userMessage.content);
      
      let fullContent = '';

      for await (const chunk of stream) {
        fullContent += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === modelMessageId 
            ? { ...msg, content: fullContent }
            : msg
        ));
      }
      setStatus(ChatStatus.IDLE);
    } catch (error) {
      console.error(error);
      setStatus(ChatStatus.ERROR);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="flex flex-col h-[600px] w-full bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5 transition-all duration-500">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Visionary Assistant</h3>
              <p className="text-xs text-cyan-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                Powered by Gemini 3
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleShare}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5 group relative"
            title="Share with friends"
          >
            {isSharing ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5 text-gray-400 group-hover:text-white" />}
            {isSharing && (
              <span className="absolute right-0 top-full mt-2 text-xs bg-black/90 text-white px-2 py-1 rounded border border-white/10 whitespace-nowrap z-50">
                  Link copied!
              </span>
            )}
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex-shrink-0 flex items-center justify-center border border-white/10 mt-1">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              )}
              
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-md ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-800/80 text-gray-200 border border-white/5 rounded-tl-none'
                }`}
              >
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    strong: ({node, ...props}) => <span className="font-bold text-cyan-300" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2" {...props} />,
                    p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center border border-white/10 mt-1">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
              )}
            </div>
          ))}
          {status === ChatStatus.STREAMING && (
             <div className="flex items-center gap-2 text-cyan-500/50 text-xs ml-12">
               <span className="animate-bounce">●</span>
               <span className="animate-bounce delay-100">●</span>
               <span className="animate-bounce delay-200">●</span>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-900/80 border-t border-white/10">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about M Forms or the Shopping Town..."
              className="w-full bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all shadow-inner"
              disabled={status === ChatStatus.LOADING || status === ChatStatus.STREAMING}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || status === ChatStatus.LOADING || status === ChatStatus.STREAMING}
              className="absolute right-2 p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-xs text-slate-500 mt-2">
            Visionary AI can make mistakes. Please verify important info.
          </p>
        </div>
      </div>
      
      {/* Suggestions Area */}
      <div className="mt-6 flex items-start gap-4 p-4 bg-blue-900/10 border border-blue-500/20 rounded-xl backdrop-blur-sm transition-all hover:bg-blue-900/20 hover:border-blue-500/30">
         <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
           <Bot className="w-5 h-5 text-blue-400" />
         </div>
         <div className="flex-1">
           <h4 className="text-sm font-semibold text-blue-300 mb-2">Try asking:</h4>
           <div className="flex flex-col gap-2">
             {suggestions.map((question, idx) => (
                <button
                   key={idx}
                   onClick={() => handleSend(question)}
                   disabled={status === ChatStatus.LOADING || status === ChatStatus.STREAMING}
                   className="text-left text-xs text-blue-200/80 hover:text-white hover:bg-blue-500/20 px-3 py-2 rounded-lg transition-all flex items-center gap-2 border border-transparent hover:border-blue-500/20 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                   <span className="w-1.5 h-1.5 rounded-full bg-blue-400/50 group-hover:bg-blue-400 transition-colors"></span>
                   {question}
                </button>
             ))}
           </div>
         </div>
      </div>
    </>
  );
};