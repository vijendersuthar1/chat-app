'use client';

import { useChat } from '@/context/ChatContext';
import Avatar from './Avatar';
import { formatTime } from '@/utils/helpers';

function UserItem({ user }) {
  const { activeUserId, selectUser, unreadCounts } = useChat();
  const isActive = activeUserId === user.id;
  const unread = unreadCounts[user.id] || 0;

  return (
    <button
      onClick={() => selectUser(user.id)}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
        ${isActive
          ? 'bg-primary/15 border border-primary/20'
          : 'hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent'
        }`}
    >
      <Avatar
        initials={user.avatar}
        colorClass={user.avatarColor}
        size="md"
        online={user.status === 'online'}
      />
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold truncate ${isActive ? 'text-primary dark:text-primary-light' : 'text-gray-900 dark:text-white'}`}>
            {user.name}
          </span>
          <span className="text-[11px] text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2">
            {user.lastTime}
          </span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[140px]">
            {user.lastMessage}
          </p>
          {unread > 0 && (
            <span className="ml-2 min-w-[18px] h-[18px] px-1 bg-primary rounded-full text-[10px] font-bold text-white flex items-center justify-center flex-shrink-0">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default function UserList() {
  const { filteredUsers } = useChat();

  if (filteredUsers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">No chats found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 px-2">
      {filteredUsers.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}
