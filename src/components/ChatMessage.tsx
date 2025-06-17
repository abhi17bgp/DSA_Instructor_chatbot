
// import React from 'react';
// import ReactMarkdown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { User, Bot, Copy, Check } from 'lucide-react';
// import { Message } from '../types';

// interface ChatMessageProps {
//   message: Message;
//   theme: 'light' | 'dark';
// }

// const ChatMessage: React.FC<ChatMessageProps> = ({ message, theme }) => {
//   const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

//   const handleCopyCode = async (code: string) => {
//     try {
//       await navigator.clipboard.writeText(code);
//       setCopiedCode(code);
//       setTimeout(() => setCopiedCode(null), 2000);
//     } catch (err) {
//       console.error('Failed to copy code:', err);
//     }
//   };

//   const isUser = message.type === 'user';
//   const isDark = theme === 'dark';

//   return (
//     <div className={`flex gap-4 p-6 ${isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
//       {!isUser && (
//         <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
//           isDark ? 'bg-blue-600' : 'bg-blue-500'
//         }`}>
//           <Bot className="w-4 h-4 text-white" />
//         </div>
//       )}
      
//       <div className={`max-w-3xl ${isUser ? 'order-first' : ''}`}>
//         <div className={`rounded-2xl px-4 py-3 ${
//           isUser 
//             ? isDark 
//               ? 'bg-blue-600 text-white' 
//               : 'bg-blue-500 text-white'
//             : isDark 
//               ? 'bg-slate-800 border border-slate-700' 
//               : 'bg-white border border-slate-200 shadow-sm'
//         }`}>
//           {isUser ? (
//             <p className="text-sm leading-relaxed">{message.content}</p>
//           ) : (
//             <div className={`prose prose-sm max-w-none ${
//               isDark 
//                 ? 'prose-invert prose-slate' 
//                 : 'prose-slate'
//             }`}>
//               <ReactMarkdown
//                 components={{
//                   code({ node, inline, className, children, ...props }) {
//                     const match = /language-(\w+)/.exec(className || '');
//                     const codeString = String(children).replace(/\n$/, '');
                    
//                     if (!inline && match) {
//                       return (
//                         <div className="relative group">
//                           <button
//                             onClick={() => handleCopyCode(codeString)}
//                             className={`absolute top-2 right-2 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
//                               isDark 
//                                 ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' 
//                                 : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
//                             }`}
//                             title="Copy code"
//                           >
//                             {copiedCode === codeString ? (
//                               <Check className="w-3 h-3" />
//                             ) : (
//                               <Copy className="w-3 h-3" />
//                             )}
//                           </button>
//                           <SyntaxHighlighter
//                             style={isDark ? oneDark : oneLight}
//                             language={match[1]}
//                             PreTag="div"
//                             customStyle={{
//                               margin: 0,
//                               borderRadius: '0.5rem',
//                               fontSize: '0.875rem',
//                               lineHeight: '1.5',
//                             }}
//                             {...props}
//                           >
//                             {codeString}
//                           </SyntaxHighlighter>
//                         </div>
//                       );
//                     }
                    
//                     return (
//                       <code 
//                         className={`px-1.5 py-0.5 rounded text-sm font-mono ${
//                           isDark 
//                             ? 'bg-slate-700 text-slate-200' 
//                             : 'bg-slate-100 text-slate-800'
//                         }`} 
//                         {...props}
//                       >
//                         {children}
//                       </code>
//                     );
//                   },
//                   p({ children }) {
//                     return <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>;
//                   },
//                   ul({ children }) {
//                     return <ul className="mb-3 last:mb-0 space-y-1">{children}</ul>;
//                   },
//                   ol({ children }) {
//                     return <ol className="mb-3 last:mb-0 space-y-1">{children}</ol>;
//                   },
//                   li({ children }) {
//                     return <li className="leading-relaxed">{children}</li>;
//                   },
//                   h1({ children }) {
//                     return <h1 className="text-xl font-bold mb-3 mt-4 first:mt-0">{children}</h1>;
//                   },
//                   h2({ children }) {
//                     return <h2 className="text-lg font-semibold mb-2 mt-4 first:mt-0">{children}</h2>;
//                   },
//                   h3({ children }) {
//                     return <h3 className="text-base font-semibold mb-2 mt-3 first:mt-0">{children}</h3>;
//                   },
//                   blockquote({ children }) {
//                     return (
//                       <blockquote className={`border-l-4 pl-4 my-3 italic ${
//                         isDark ? 'border-slate-600' : 'border-slate-300'
//                       }`}>
//                         {children}
//                       </blockquote>
//                     );
//                   },
//                 }}
//               >
//                 {message.content}
//               </ReactMarkdown>
//             </div>
//           )}
//         </div>
        
//         <div className={`text-xs mt-2 ${
//           isUser ? 'text-right' : 'text-left'
//         } ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
//           {message.timestamp.toLocaleTimeString([], { 
//             hour: '2-digit', 
//             minute: '2-digit' 
//           })}
//         </div>
//       </div>

//       {isUser && (
//         <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
//           isDark ? 'bg-slate-700' : 'bg-slate-200'
//         }`}>
//           <User className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatMessage;
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { User, Bot, Copy, Check } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  theme: 'light' | 'dark';
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, theme }) => {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const isUser = message.type === 'user';
  const isDark = theme === 'dark';

  return (
    <div className={`flex gap-4 p-6 ${isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
      {!isUser && (
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isDark ? 'bg-blue-600' : 'bg-blue-500'
        }`}>
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-3xl ${isUser ? 'order-first' : ''}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? isDark 
              ? 'bg-blue-600 text-white' 
              : 'bg-blue-500 text-white'
            : isDark 
              ? 'bg-slate-800 border border-slate-700' 
              : 'bg-white border border-slate-200 shadow-sm'
        }`}>
          {isUser ? (
            <p className="text-sm leading-relaxed">{message.content}</p>
          ) : (
            <div className={`prose prose-sm max-w-none ${
              isDark 
                ? 'prose-invert prose-slate' 
                : 'prose-slate'
            }`}>
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }: CodeProps) {
                    const match = /language-(\w+)/.exec(className || '');
                    const codeString = String(children).replace(/\n$/, '');
                    
                    if (!inline && match) {
                      return (
                        <div className="relative group">
                          <button
                            onClick={() => handleCopyCode(codeString)}
                            className={`absolute top-2 right-2 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                              isDark 
                                ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' 
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                            }`}
                            title="Copy code"
                          >
                            {copiedCode === codeString ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                          <SyntaxHighlighter
                            style={isDark ? oneDark : oneLight}
                            language={match[1]}
                            PreTag="div"
                            customStyle={{
                              margin: 0,
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              lineHeight: '1.5',
                            } as React.CSSProperties}
                            {...props}
                          >
                            {codeString}
                          </SyntaxHighlighter>
                        </div>
                      );
                    }
                    
                    return (
                      <code 
                        className={`px-1.5 py-0.5 rounded text-sm font-mono ${
                          isDark 
                            ? 'bg-slate-700 text-slate-200' 
                            : 'bg-slate-100 text-slate-800'
                        }`} 
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  p({ children }) {
                    return <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>;
                  },
                  ul({ children }) {
                    return <ul className="mb-3 last:mb-0 space-y-1">{children}</ul>;
                  },
                  ol({ children }) {
                    return <ol className="mb-3 last:mb-0 space-y-1">{children}</ol>;
                  },
                  li({ children }) {
                    return <li className="leading-relaxed">{children}</li>;
                  },
                  h1({ children }) {
                    return <h1 className="text-xl font-bold mb-3 mt-4 first:mt-0">{children}</h1>;
                  },
                  h2({ children }) {
                    return <h2 className="text-lg font-semibold mb-2 mt-4 first:mt-0">{children}</h2>;
                  },
                  h3({ children }) {
                    return <h3 className="text-base font-semibold mb-2 mt-3 first:mt-0">{children}</h3>;
                  },
                  blockquote({ children }) {
                    return (
                      <blockquote className={`border-l-4 pl-4 my-3 italic ${
                        isDark ? 'border-slate-600' : 'border-slate-300'
                      }`}>
                        {children}
                      </blockquote>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        
        <div className={`text-xs mt-2 ${
          isUser ? 'text-right' : 'text-left'
        } ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>

      {isUser && (
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isDark ? 'bg-slate-700' : 'bg-slate-200'
        }`}>
          <User className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
