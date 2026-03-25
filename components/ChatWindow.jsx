'use client';

import { useEffect, useRef } from 'react';
import { useChat } from '@/context/ChatContext';
import Avatar from './Avatar';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { formatDate } from '@/utils/helpers';
import { groupMessagesByDate } from '@/utils/helpers';

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 select-none">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-pulse-soft">
        <svg className="w-10 h-10 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          Start a conversation
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
          Select a contact from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
}

export default function ChatWindow() {
  const { activeUser, activeMessages, isTyping, setSidebarOpen } = useChat();
  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, isTyping]);

  if (!activeUser) {
    return (
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-surface-2">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center px-4 py-3 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-surface">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="ml-3 font-semibold text-gray-900 dark:text-white">Chats</span>
        </div>
        <EmptyState />
      </div>
    );
  }

  const grouped = groupMessagesByDate(activeMessages);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-50 dark:bg-surface-2">
      {/* Chat Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-surface border-b border-gray-200 dark:border-white/5 shadow-sm">
        {/* Mobile back / sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <Avatar
          initials={activeUser.avatar}
          colorClass={activeUser.avatarColor}
          size="md"
          online={activeUser.status === 'online'}
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {activeUser.name}
          </h2>
          <p className={`text-xs font-medium ${
            activeUser.status === 'online'
              ? 'text-emerald-500'
              : activeUser.status === 'away'
              ? 'text-amber-500'
              : 'text-gray-400'
          }`}>
            {isTyping ? 'typing...' : activeUser.status === 'online' ? 'Online' : activeUser.status === 'away' ? 'Away' : 'Offline'}
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1 scroll-smooth">
        {activeMessages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-gray-400 dark:text-gray-500 italic">
              No messages yet. Say hi! 👋
            </p>
          </div>
        ) : (
          Object.entries(grouped).map(([dateLabel, msgs]) => (
            <div key={dateLabel} className="flex flex-col gap-1">
              {/* Date Divider */}
              <div className="flex items-center gap-3 my-3">
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
                <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-surface-2 px-2">
                  {dateLabel}
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
              </div>
              <div className="flex flex-col gap-2">
                {msgs.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isSent={msg.senderId === 'me'}
                  />
                ))}
              </div>
            </div>
          ))
        )}
        {isTyping && (
          <div className="mt-2">
            <TypingIndicator user={activeUser} />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput />
    </div>
  );
}
