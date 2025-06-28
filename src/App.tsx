import  { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import LoadingMessage from './components/LoadingMessage';
import WelcomeMessage from './components/WelcomeMessage';
import ChatInput from './components/ChatInput';
import { GeminiAPI } from './services/geminiApi';
import { Message, AppSettings } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

// Hardcoded API key - replace with your actual Gemini API key
const GEMINI_API_KEY = 'AIzaSyDO-S35MdwZmIrydZjO-TDXhlRjQXmwK6s';

function App() {
  const [messages, setMessages] = useLocalStorage<Message[]>('dsa-chat-messages', []);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useLocalStorage<AppSettings>('dsa-app-settings', {
    theme: 'dark',
    sidebarOpen: false,
    codeMode: false
  });
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const geminiApi = useRef<GeminiAPI>(new GeminiAPI(GEMINI_API_KEY));

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    document.body.className = settings.theme === 'dark' 
      ? 'bg-slate-900 text-white' 
      : 'bg-slate-50 text-slate-900';
  }, [settings.theme]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await geminiApi.current.generateResponse(content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),  
        type: 'assistant',
        content: 'I apologize, but I\'m experiencing technical difficulties right now. Please check your API key and try again. If the problem persists, make sure you have a valid Gemini API key.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicSelect = (prompt: string) => {
    handleSendMessage(prompt);
    if (window.innerWidth < 1024) {
      setSettings(prev => ({ ...prev, sidebarOpen: false }));
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleToggleTheme = () => {
    setSettings(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  return (
    <div className={`flex h-screen ${settings.theme === 'dark' ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar
        isOpen={settings.sidebarOpen}
        onClose={() => setSettings(prev => ({ ...prev, sidebarOpen: false }))}
        settings={settings}
        onTopicSelect={handleTopicSelect}
        onClearChat={handleClearChat}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className={`flex items-center justify-between p-4 border-b ${
          settings.theme === 'dark' 
            ? 'bg-slate-900/95 border-slate-700 backdrop-blur-sm' 
            : 'bg-white/95 border-slate-200 backdrop-blur-sm'
        }`}>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSettings(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }))}
              className={`p-2 rounded-lg lg:hidden ${
                settings.theme === 'dark' 
                  ? 'hover:bg-slate-700 text-slate-300 hover:text-white' 
                  : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold">DSA Learning Assistant</h1>
              <p className={`text-sm ${settings.theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Ask me anything about Data Structures and Algorithms
              </p>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <WelcomeMessage theme={settings.theme} />
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    theme={settings.theme}
                  />
                ))}
                {isLoading && <LoadingMessage theme={settings.theme} />}
              </>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          theme={settings.theme}
        />
      </div>
    </div>
  );
}

export default App;
