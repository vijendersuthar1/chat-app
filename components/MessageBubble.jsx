'use client';

import { formatTime } from '@/utils/helpers';

export default function MessageBubble({ message, isSent }) {
  return (
    <div
      className={`flex items-end gap-2 animate-slide-up ${isSent ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`
          max-w-[75%] sm:max-w-[60%] px-4 py-2.5 rounded-2xl shadow-sm
          ${isSent
            ? 'bg-primary text-white rounded-br-sm'
            : 'bg-gray-100 dark:bg-surface-3 text-gray-900 dark:text-gray-100 rounded-bl-sm'
          }
        `}
      >
        <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
          {message.text}
        </p>
        <div
          className={`flex items-center gap-1 mt-1 ${isSent ? 'justify-end' : 'justify-start'}`}
        >
          <span
            className={`text-[10px] ${isSent ? 'text-white/70' : 'text-gray-400 dark:text-gray-500'}`}
          >
            {formatTime(message.timestamp)}
          </span>
          {isSent && (
            <svg className="w-3 h-3 text-white/70" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
