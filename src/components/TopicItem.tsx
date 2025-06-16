import React from 'react';
import * as LucideIcons from 'lucide-react';
import { DSATopic } from '../types';

interface TopicItemProps {
  topic: DSATopic;
  onSelect: () => void;
}

const TopicItem: React.FC<TopicItemProps> = ({ topic, onSelect }) => {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[topic.icon] || LucideIcons.Circle;

  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 group"
    >
      <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
        <IconComponent className="w-4 h-4 group-hover:text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">{topic.name}</div>
        <div className="text-xs text-slate-500 truncate">{topic.description}</div>
      </div>
    </button>
  );
};

export default TopicItem;