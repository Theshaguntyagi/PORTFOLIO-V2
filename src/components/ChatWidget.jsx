import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Trash2 } from 'lucide-react';
import api from '../services/api';
import '../styles/ChatWidget.css';

const ChatWidget = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hi! I\'m Shagun\'s AI assistant powered by Perplexity AI. How can I help you today?' 
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  
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

    // Listen for storage changes (when theme is changed in another tab/component)
    window.addEventListener('storage', handleThemeChange);
    
    // Optional: Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      window.removeEventListener('storage', handleThemeChange);
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    initializeSession();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const initializeSession = async () => {
    try {
      const storedSessionId = localStorage.getItem('chat-session-id');
      if (storedSessionId) {
        setSessionId(storedSessionId);
        const history = await api.chat.getHistory(storedSessionId);
        if (history && history.length > 0) {
          setChatMessages(history.map(msg => ({
            role: msg.role,
            content: msg.content
          })));
        }
      } else {
        const response = await api.chat.createSession();
        const newSessionId = response.sessionId;
        setSessionId(newSessionId);
        localStorage.setItem('chat-session-id', newSessionId);
      }
    } catch (error) {
      console.error('Error initializing session:', error);
      setSessionId('fallback-' + Date.now());
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || isTyping) return;
    
    const userMessage = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    try {
      const response = await api.chat.sendMessage(sessionId, chatInput);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.message 
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I\'m having trouble connecting right now. Please try again in a moment.' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = async () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      try {
        await api.chat.clearHistory(sessionId);
        setChatMessages([
          { 
            role: 'assistant', 
            content: 'Chat history cleared. How can I help you?' 
          }
        ]);
      } catch (error) {
        console.error('Error clearing chat:', error);
      }
    }
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
              <span className="chat-header-title">AI Assistant</span>
            </div>
            <div className="chat-header-actions">
              <button 
                onClick={clearChat} 
                className="chat-header-btn"
                title="Clear chat history"
              >
                <Trash2 size={18} />
              </button>
              <button 
                onClick={() => setChatOpen(false)} 
                className="chat-header-btn"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="chat-messages">
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
                  {msg.content}
                </div>
              </div>
            ))}
            
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
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className={`chat-input-area ${!isDark ? 'chat-input-area-light' : ''}`}>
            <div className="chat-input-wrapper">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isTyping}
                className={`chat-input ${!isDark ? 'chat-input-light' : ''}`}
              />
              <button
                onClick={sendChatMessage}
                disabled={!chatInput.trim() || isTyping}
                className="chat-send-btn"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="chat-footer-text">
              Powered by Perplexity AI
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setChatOpen(true)}
          className="chat-float-btn"
        >
          <MessageSquare size={28} />
          <span className="chat-float-pulse"></span>
          <div className="chat-tooltip">
            Chat with AI Assistant
          </div>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;