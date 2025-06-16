import React from 'react';
import { X, BookOpen, Trash2, Moon, Sun } from 'lucide-react';
import { dsaTopics } from '../data/topics';
import { AppSettings } from '../types';
import TopicItem from './TopicItem';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onTopicSelect: (prompt: string) => void;
  onClearChat: () => void;
  onToggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  settings, 
  onTopicSelect, 
  onClearChat, 
  onToggleTheme 
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static top-0 left-0 h-full w-80 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 
        border-r border-slate-700/50 z-50 transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">DSA Instructor</h2>
                <p className="text-xs text-slate-400">AI-Powered Learning</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Topics */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Learning Topics
              </h3>
              <div className="space-y-2">
                {dsaTopics.map((topic) => (
                  <TopicItem
                    key={topic.id}
                    topic={topic}
                    onSelect={() => onTopicSelect(topic.prompt)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-slate-700/50">
          <div className="space-y-2">
            <button
              onClick={onClearChat}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Clear Chat</span>
            </button>
            <button
              onClick={onToggleTheme}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
            >
              {settings.theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {settings.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;