'use client';

import { useState, useRef } from 'react';
import { useChat } from '@/context/ChatContext';

const EMOJIS = ['😊', '😂', '❤️', '👍', '🔥', '🎉', '😍', '🙏', '😎', '👋', '🚀', '💯', '🤔', '😅', '😁'];

export default function ChatInput() {
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const { sendMessage } = useChat();
  const inputRef = useRef(null);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText('');
    setShowEmoji(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const addEmoji = (emoji) => {
    setText((prev) => prev + emoji);
    inputRef.current?.focus();
  };

  return (
    <div className="relative px-4 py-3 border-t border-gray-200 dark:border-white/5 bg-white dark:bg-surface">
      {/* Emoji Picker */}
      {showEmoji && (
        <div className="absolute bottom-full left-4 mb-2 bg-white dark:bg-surface-2 rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 p-3 animate-slide-up z-10">
          <div className="grid grid-cols-5 gap-2">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => addEmoji(emoji)}
                className="text-xl hover:scale-125 transition-transform duration-150 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Emoji Toggle */}
        <button
          onClick={() => setShowEmoji((p) => !p)}
          className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
            ${showEmoji
              ? 'bg-primary/20 text-primary'
              : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
            }`}
          aria-label="Emoji picker"
        >
          <span className="text-lg">😊</span>
        </button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full px-4 py-2.5 rounded-xl text-sm
              bg-gray-100 dark:bg-white/5
              text-gray-900 dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500
              border border-transparent
              focus:outline-none focus:border-primary/50
              transition-all duration-200"
            autoComplete="off"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
            ${text.trim()
              ? 'bg-primary hover:bg-primary-dark shadow-lg shadow-primary/30 hover:shadow-primary/50 scale-100 hover:scale-105'
              : 'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed'
            }`}
          aria-label="Send message"
        >
          <svg
            className={`w-4 h-4 ${text.trim() ? 'text-white' : 'text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
