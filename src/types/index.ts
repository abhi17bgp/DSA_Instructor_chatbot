export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface DSATopic {
  id: string;
  name: string;
  icon: string;
  description: string;
  prompt: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  currentTopic: string | null;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  codeMode: boolean;
}