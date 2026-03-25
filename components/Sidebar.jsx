'use client';

import Link from 'next/link';
import { useChat } from '@/context/ChatContext';
import { currentUser } from '@/data/users';
import Avatar from './Avatar';
import SearchBar from './SearchBar';
import UserList from './UserList';

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, unreadCounts, users } = useChat();
  const totalUnread = Object.values(unreadCounts).reduce((a, b) => a + b, 0);

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-14 left-0 bottom-0 z-30 w-72 xl:w-80
          bg-white dark:bg-surface border-r border-gray-200 dark:border-white/5
          flex flex-col transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Profile Header */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 dark:border-white/5">
          <Link href="/profile">
            <Avatar initials={currentUser.avatar} colorClass="bg-primary" size="md" online />
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {currentUser.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] text-emerald-500 font-medium">Online</span>
            </div>
          </div>
          {/* Total unread badge */}
          {totalUnread > 0 && (
            <span className="min-w-[22px] h-[22px] px-1.5 bg-primary rounded-full text-xs font-bold text-white flex items-center justify-center">
              {totalUnread > 99 ? '99+' : totalUnread}
            </span>
          )}
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <SearchBar />
        </div>

        {/* Chats Label */}
        <div className="flex items-center px-4 pb-2">
          <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Chats ({users.length})
          </span>
        </div>

        {/* User List — scrollable */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
          <UserList />
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-white/5">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings & Profile
          </Link>
        </div>
      </aside>
    </>
  );
}
