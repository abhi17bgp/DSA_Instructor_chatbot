import React from 'react';
import { Brain, CheckCircle, Code, Zap, BookOpen } from 'lucide-react';

interface WelcomeMessageProps {
  theme: 'light' | 'dark';
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ theme }) => {
  const features = [
    {
      icon: CheckCircle,
      text: "Explaining complex DSA concepts in simple terms"
    },
    {
      icon: Code,
      text: "Providing code examples and implementations"
    },
    {
      icon: Zap,
      text: "Analyzing time and space complexity"
    },
    {
      icon: BookOpen,
      text: "Solving algorithmic problems step by step"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full flex items-center justify-center mb-8 animate-pulse">
        <Brain className="w-10 h-10 text-white" />
      </div>
      
      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent mb-4">
        Welcome to DSA Instructor!
      </h2>
      
      <p className={`text-lg mb-8 max-w-2xl ${
        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
      }`}>
        I'm your AI-powered Data Structures and Algorithms tutor, here to guide you through your learning journey with personalized explanations and hands-on examples.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mb-8">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div 
              key={index}
              className={`flex items-center space-x-3 p-4 rounded-xl ${
                theme === 'dark' 
                  ? 'bg-slate-800/50 border border-slate-700/50' 
                  : 'bg-slate-50 border border-slate-200'
              }`}
            >
              <IconComponent className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span className={`text-sm ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {feature.text}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className={`p-4 rounded-xl ${
        theme === 'dark' 
          ? 'bg-blue-500/10 border border-blue-500/20' 
          : 'bg-blue-50 border border-blue-200'
      }`}>
        <p className="text-blue-600 dark:text-blue-400 font-medium">
          💡 Start by asking me a question about any DSA topic, or choose a topic from the sidebar!
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;