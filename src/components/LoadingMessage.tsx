import React from 'react';
import { Bot } from 'lucide-react';

interface LoadingMessageProps {
  theme: 'light' | 'dark';
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({ theme }) => {
  return (
    <div className="flex justify-start mb-6 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Loading Content */}
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              DSA Instructor
            </span>
          </div>

          <div className={`
            relative px-4 py-3 rounded-2xl
            ${theme === 'dark' 
              ? 'bg-slate-800 border border-slate-700' 
              : 'bg-white border border-slate-200 shadow-sm'
            }
          `}>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400">Thinking...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessage;