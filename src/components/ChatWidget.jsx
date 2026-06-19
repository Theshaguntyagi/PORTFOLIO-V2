import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { getPortfolioContext } from '../data/portfolioKnowledge';
import { trackChatbotQuery } from '../services/telemetry';
import '../styles/ChatWidget.css';

const WELCOME = {
  role: 'assistant',
  content: "Hi! I'm Shagun's AI assistant. Ask me about his skills, projects, or experience.",
};

const SUGGESTIONS = [
  'What are his skills?',
  'Tell me about his projects',
  'How can I contact him?',
];

const ChatWidget = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('chat-messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch { /* ignore corrupt storage */ }
    return [WELCOME];
  });
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef(null);
  
  // ✅ Use local theme detection instead of context
  const [isDark, setIsDark] = useState(() => {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Otherwise check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // ✅ Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
      } else {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    };

    window.addEventListener('storage', handleThemeChange);
    window.addEventListener('theme-change', handleThemeChange);
    
    // Optional: Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      window.removeEventListener('storage', handleThemeChange);
      window.removeEventListener('theme-change', handleThemeChange);
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  // Persist conversation locally (no server sessions needed).
  useEffect(() => {
    try {
      localStorage.setItem('chat-messages', JSON.stringify(chatMessages));
    } catch { /* ignore quota errors */ }
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }, 50);
    }
  };

  const executeCommand = (action, param) => {
    try {
      const cleanParam = param.trim();
      if (action === 'NAVIGATE') {
        navigate(cleanParam);
      } else if (action === 'SET_THEME') {
        const t = cleanParam.toLowerCase();
        if (t === 'dark' || t === 'light') {
          localStorage.setItem('theme', t);
          window.dispatchEvent(new Event('theme-change'));
        }
      } else if (action === 'SET_LANG') {
        const lang = cleanParam.toLowerCase();
        if (['en', 'hi', 'es'].includes(lang)) {
          i18n.changeLanguage(lang);
        }
      }
    } catch (e) {
      console.warn('ChatWidget execute command failed:', action, param, e);
    }
  };

  const sendChatMessage = async (override) => {
    const text = (typeof override === 'string' ? override : chatInput).trim();
    if (!text || isTyping) return;

    const userMessage = { role: 'user', content: text };
    const nextMessages = [...chatMessages, userMessage];
    setChatMessages(nextMessages);
    setChatInput('');
    setIsTyping(true);

    trackChatbotQuery();

    // Filter welcome line out of history
    const history = nextMessages.filter(
      (m) => !(m.role === 'assistant' && m.content === WELCOME.content)
    );

    let first = true;
    let accumulatedText = '';

    try {
      if (!api.chat.isConfigured()) {
        throw new Error('not-configured');
      }

      await api.chat.completeStream(history, getPortfolioContext(), (chunk) => {
        if (first) {
          setIsTyping(false);
          first = false;
        }
        accumulatedText += chunk;
        setChatMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          const cleanText = accumulatedText.replace(/\[CMD:[^\]]+\]/g, '');
          if (last && last.role === 'assistant') {
            next[next.length - 1] = { ...last, content: cleanText };
          } else {
            next.push({ role: 'assistant', content: cleanText });
          }
          return next;
        });
      });

      // Parse and execute commands
      const commandRegex = /\[CMD:([A-Z_]+):([^\]]+)\]/g;
      let match;
      while ((match = commandRegex.exec(accumulatedText)) !== null) {
        const [_, action, param] = match;
        executeCommand(action, param);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      const msg =
        error.message === 'not-configured'
          ? "The AI assistant isn't connected yet. Meanwhile, reach Shagun at theshaguntyagi@gmail.com."
          : "Sorry, I'm having trouble connecting right now. Please try again in a moment.";

      setChatMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last && last.role === 'assistant' && !last.content) {
          next[next.length - 1] = { role: 'assistant', content: msg };
        } else if (!last || last.role !== 'assistant') {
          next.push({ role: 'assistant', content: msg });
        }
        return next;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setChatMessages([WELCOME]);
    try {
      localStorage.removeItem('chat-messages');
    } catch { /* ignore */ }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  return (
    <div className="chat-widget-container">
      {chatOpen ? (
        <div className={`chat-window ${isDark ? 'chat-window-dark' : 'chat-window-light'}`}>
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-header-content">
              <div className="chat-status-indicator"></div>
              <MessageSquare className="chat-header-icon" size={20} />
              <span className="chat-header-title">Chatterbox</span>
            </div>
            <div className="chat-header-actions">
              <button
                onClick={clearChat}
                className="chat-header-btn"
                title="Clear chat history"
                aria-label="Clear chat history"
              >
                <Trash2 size={18} />
              </button>
              <button
                onClick={() => setChatOpen(false)}
                className="chat-header-btn"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="chat-messages" ref={messagesContainerRef}>
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`chat-message ${msg.role === 'user' ? 'chat-message-user' : 'chat-message-assistant'}`}
              >
                <div
                  className={`chat-bubble ${
                    msg.role === 'user'
                      ? 'chat-bubble-user'
                      : isDark ? 'chat-bubble-assistant-dark' : 'chat-bubble-assistant-light'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            
            {/* Quick-reply suggestions (only on the fresh welcome screen) */}
            {chatMessages.length === 1 && !isTyping && (
              <div className="chat-suggestions">
                {SUGGESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className="chat-suggestion"
                    onClick={() => sendChatMessage(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chat-message chat-message-assistant">
                <div className={`chat-bubble ${isDark ? 'chat-bubble-assistant-dark' : 'chat-bubble-assistant-light'}`}>
                  <div className="typing-indicator">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Chat Input */}
          <div className={`chat-input-area ${!isDark ? 'chat-input-area-light' : ''}`}>
            <div className="chat-input-wrapper">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isTyping}
                className={`chat-input ${!isDark ? 'chat-input-light' : ''}`}
              />
              <button
                onClick={sendChatMessage}
                disabled={!chatInput.trim() || isTyping}
                className="chat-send-btn"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="chat-footer-text">
              Powered by Google Gemini
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setChatOpen(true)}
          className="chat-float-btn"
          aria-label="Open AI chat assistant"
        >
          <MessageSquare size={28} />
          <span className="chat-float-pulse"></span>
          <div className="chat-tooltip">
            Chat with Chatterbox
          </div>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;