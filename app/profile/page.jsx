'use client';

import { useState } from 'react';
import { currentUser } from '@/data/users';
import { useTheme } from '@/context/ThemeContext';
import Avatar from '@/components/Avatar';
import Link from 'next/link';

const STATUS_OPTIONS = ['online', 'offline', 'away'];

export default function ProfilePage() {
  const { isDark, toggleTheme } = useTheme();
  const [status, setStatus] = useState('online');
  const [about, setAbout] = useState(currentUser.about);
  const [name, setName] = useState('You (Alex Turner)');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const statusColors = {
    online: 'bg-emerald-400 text-emerald-700 dark:text-emerald-400',
    away: 'bg-amber-400 text-amber-700 dark:text-amber-400',
    offline: 'bg-gray-400 text-gray-600 dark:text-gray-400',
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gray-50 dark:bg-surface py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Chats
        </Link>

        {/* Profile Card */}
        <div className="bg-white dark:bg-surface-2 rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-xl">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-br from-primary via-violet-600 to-purple-800 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          </div>

          {/* Avatar area */}
          <div className="px-8 pb-6">
            <div className="-mt-10 flex items-end justify-between mb-6">
              <div className="relative">
                <Avatar
                  initials={currentUser.avatar}
                  colorClass="bg-primary"
                  size="xl"
                  online={status === 'online'}
                />
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white dark:bg-surface-3 border-2 border-gray-200 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/10 transition-colors shadow-sm">
                  <svg className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <Link
                href="/chat"
                className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary/30 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Open Chat
              </Link>
            </div>

            {/* Info */}
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm font-medium
                    bg-gray-50 dark:bg-white/5
                    text-gray-900 dark:text-white
                    border border-gray-200 dark:border-white/10
                    focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10
                    transition-all duration-200"
                />
              </div>

              {/* About */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                  About
                </label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={2}
                  placeholder="Write something about yourself..."
                  className="w-full px-4 py-3 rounded-xl text-sm resize-none
                    bg-gray-50 dark:bg-white/5
                    text-gray-900 dark:text-white
                    border border-gray-200 dark:border-white/10
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10
                    transition-all duration-200"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Status
                </label>
                <div className="flex gap-2">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-200
                        ${status === s
                          ? 'border-primary/40 bg-primary/10 text-primary dark:text-primary-light'
                          : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20'
                        }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${s === 'online' ? 'bg-emerald-400' : s === 'away' ? 'bg-amber-400' : 'bg-gray-400'}`} />
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 dark:bg-white/5 my-2" />

              {/* Theme Toggle */}
              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {isDark ? 'Dark Mode' : 'Light Mode'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none
                    ${isDark ? 'bg-primary' : 'bg-gray-200'}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300
                      ${isDark ? 'translate-x-6' : 'translate-x-0'}`}
                  />
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 dark:bg-white/5 my-2" />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Chats', value: '8' },
                  { label: 'Messages', value: '142' },
                  { label: 'Online', value: '2h 30m' },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Save */}
              <button
                onClick={handleSave}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200
                  ${saved
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 hover:shadow-primary/50'
                  }`}
              >
                {saved ? '✓ Changes Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-6 bg-white dark:bg-surface-2 rounded-3xl border border-red-100 dark:border-red-500/10 overflow-hidden">
          <div className="px-8 py-6">
            <h3 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Danger Zone
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  localStorage.removeItem('chatapp_messages');
                  localStorage.removeItem('chatapp_unread');
                  alert('Chat history cleared!');
                }}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium
                  border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400
                  hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
              >
                Clear Chat History
              </button>
              <Link
                href="/login"
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-center
                  border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400
                  hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
