'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { users } from '@/data/users';
import { initialMessages } from '@/data/messages';

const ChatContext = createContext(null);

const STORAGE_KEY = 'chatapp_messages';
const UNREAD_KEY = 'chatapp_unread';

export function ChatProvider({ children }) {
  const [activeUserId, setActiveUserId] = useState(null);
  const [messages, setMessages] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedUnread = localStorage.getItem(UNREAD_KEY);
      if (stored) {
        setMessages(JSON.parse(stored));
      } else {
        setMessages(initialMessages);
      }
      if (storedUnread) {
        setUnreadCounts(JSON.parse(storedUnread));
      } else {
        const counts = {};
        users.forEach((u) => {
          counts[u.id] = u.unread;
        });
        setUnreadCounts(counts);
      }
    } catch {
      setMessages(initialMessages);
    }
  }, []);

  // Persist messages to localStorage
  useEffect(() => {
    if (Object.keys(messages).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Persist unread counts
  useEffect(() => {
    if (Object.keys(unreadCounts).length > 0) {
      localStorage.setItem(UNREAD_KEY, JSON.stringify(unreadCounts));
    }
  }, [unreadCounts]);

  const selectUser = useCallback((userId) => {
    setActiveUserId(userId);
    setUnreadCounts((prev) => ({ ...prev, [userId]: 0 }));
    setSidebarOpen(false);
  }, []);

  const sendMessage = useCallback((text) => {
    if (!text.trim() || !activeUserId) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: 'me',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => ({
      ...prev,
      [activeUserId]: [...(prev[activeUserId] || []), newMessage],
    }));

    // Fake reply after 1–2.5 seconds
    const user = users.find((u) => u.id === activeUserId);
    if (user) {
      const replyDelay = 1000 + Math.random() * 1500;
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replies = [
          'That\'s interesting! 😊',
          'Sure, sounds good!',
          'Got it 👍',
          'Let me think about that...',
          'Absolutely! 🚀',
          'Haha, fair enough! 😄',
          'I\'ll check and get back to you.',
          'Great idea!',
          '👋 Talk later!',
          'Noted! ✅',
        ];
        const reply = {
          id: `msg_${Date.now()}_r`,
          senderId: activeUserId,
          text: replies[Math.floor(Math.random() * replies.length)],
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => ({
          ...prev,
          [activeUserId]: [...(prev[activeUserId] || []), reply],
        }));
      }, replyDelay);
    }
  }, [activeUserId]);

  const handleTyping = useCallback(() => {
    // Clear existing timeout
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => {}, 2000);
    setTypingTimeout(timeout);
  }, [typingTimeout]);

  const activeUser = users.find((u) => u.id === activeUserId) || null;
  const activeMessages = messages[activeUserId] || [];

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.lastMessage && u.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <ChatContext.Provider
      value={{
        users,
        filteredUsers,
        activeUserId,
        activeUser,
        activeMessages,
        messages,
        unreadCounts,
        searchQuery,
        setSearchQuery,
        sidebarOpen,
        setSidebarOpen,
        isTyping,
        selectUser,
        sendMessage,
        handleTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
