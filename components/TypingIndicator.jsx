'use client';

export default function TypingIndicator({ user }) {
  return (
    <div className="flex items-end gap-2 animate-fade-in">
      <div className="bg-gray-100 dark:bg-surface-3 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">
          {user?.name?.split(' ')[0]} is typing
        </span>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce-dots"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
