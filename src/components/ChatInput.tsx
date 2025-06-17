import React, { useState } from 'react';
import { Send, Code,Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
  theme: 'light' | 'dark';
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled, theme }) => {
  const [message, setMessage] = useState('');
  const [isCodeMode, setIsCodeMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`border-t p-4 ${
      theme === 'dark' 
        ? 'bg-slate-900/80 border-slate-700 backdrop-blur-sm' 
        : 'bg-white/80 border-slate-200 backdrop-blur-sm'
    }`}>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className={`relative rounded-2xl border transition-all duration-200 ${
          theme === 'dark' 
            ? 'bg-slate-800 border-slate-700 focus-within:border-blue-500' 
            : 'bg-white border-slate-300 focus-within:border-blue-500 shadow-sm'
        }`}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isCodeMode ? "Paste your code here for analysis..." : "Ask about arrays, linked lists, sorting algorithms..."}
            disabled={disabled}
            rows={1}
            className={`w-full px-4 py-3 pr-32 bg-transparent border-none outline-none resize-none min-h-[52px] max-h-32 overflow-y-auto ${
              theme === 'dark' ? 'text-white placeholder-slate-400' : 'text-slate-800 placeholder-slate-500'
            } ${isCodeMode ? 'font-mono text-sm' : ''}`}
            style={{
              height: 'auto',
              minHeight: '52px',
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 128) + 'px';
            }}
          />
          
          <div className="absolute right-2 top-2 flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsCodeMode(!isCodeMode)}
              className={`p-2 rounded-lg transition-colors ${
                isCodeMode 
                  ? 'bg-blue-500 text-white' 
                  : theme === 'dark' 
                    ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title="Toggle Code Mode"
            >
              <Code className="w-4 h-4" />
            </button>
            
            {/* <button
              type="button"
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title="Voice Input (Coming Soon)"
            >
              <Mic className="w-4 h-4" />
            </button> */}
            
            <button
              type="submit"
              disabled={disabled || !message.trim()}
              className={`p-2 rounded-lg transition-all duration-200 ${
                disabled || !message.trim()
                  ? 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105'
              }`}
            >
              {disabled ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2 px-2">
          <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Press Enter to send, Shift+Enter for new line
          </div>
          {isCodeMode && (
            <div className="text-xs text-blue-500 dark:text-blue-400 font-medium">
              Code Mode Active
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatInput;