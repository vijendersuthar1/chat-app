'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const features = [
  {
    icon: '💬',
    title: 'Real-time Messaging',
    desc: 'Instant message delivery with smooth animations and typing indicators.',
  },
  {
    icon: '🔒',
    title: 'Private & Secure',
    desc: 'Your conversations are yours. Messages stored locally on your device.',
  },
  {
    icon: '🌓',
    title: 'Dark & Light Mode',
    desc: 'Beautiful interface that adapts to your preferred visual style.',
  },
  {
    icon: '📱',
    title: 'Fully Responsive',
    desc: 'Works perfectly on any screen — mobile, tablet, or desktop.',
  },
  {
    icon: '😊',
    title: 'Emoji Support',
    desc: 'Express yourself with a built-in emoji picker for every message.',
  },
  {
    icon: '🔔',
    title: 'Unread Badges',
    desc: 'Never miss a message with visual unread notification badges.',
  },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gray-50 dark:bg-surface overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-20 pb-24 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6
          bg-primary/10 text-primary border border-primary/20
          transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Next.js Chat Application
        </div>

        {/* Headline */}
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight max-w-3xl mb-6
          transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Connect with anyone,{' '}
          <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
            anywhere.
          </span>
        </h1>

        {/* Subheadline */}
        <p className={`text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-10 leading-relaxed
          transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          A modern, fast, and beautiful chat experience. Send messages, share emojis,
          and stay connected — all in your browser.
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row items-center gap-4
          transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link
            href="/chat"
            className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-2xl
              shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105
              transition-all duration-200 text-sm"
          >
            Open Chat →
          </Link>
          <Link
            href="/login"
            className="px-8 py-3.5 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10
              text-gray-800 dark:text-white border border-gray-200 dark:border-white/10
              font-semibold rounded-2xl transition-all duration-200 text-sm"
          >
            Sign In
          </Link>
        </div>

        {/* Preview Card */}
        <div className={`mt-16 relative max-w-2xl w-full mx-auto
          transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-surface-2 rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
            {/* Mock header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-surface">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 h-6 bg-gray-200 dark:bg-white/10 rounded-full" />
            </div>
            {/* Mock chat */}
            <div className="p-5 flex flex-col gap-3">
              {[
                { text: 'Hey! How are you doing? 😊', sent: false },
                { text: "I'm great! Working on a Next.js chat app 🚀", sent: true },
                { text: 'That sounds amazing! Send me a link when it\'s done!', sent: false },
                { text: 'Sure! It has dark mode, emoji support, and more 🎉', sent: true },
              ].map((msg, i) => (
                <div key={i} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm max-w-xs
                      ${msg.sent
                        ? 'bg-primary text-white rounded-br-sm'
                        : 'bg-gray-100 dark:bg-surface-3 text-gray-800 dark:text-gray-100 rounded-bl-sm'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {/* Fake input */}
              <div className="flex items-center gap-2 mt-2 pt-3 border-t border-gray-100 dark:border-white/5">
                <div className="flex-1 h-9 bg-gray-100 dark:bg-white/5 rounded-xl" />
                <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Everything you need
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Packed with features to make your chat experience seamless and fun.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white dark:bg-surface-2 border border-gray-200 dark:border-white/5 rounded-2xl p-6
                hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10
                transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-primary to-violet-600 rounded-3xl p-12 shadow-2xl shadow-primary/30">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to start chatting?
          </h2>
          <p className="text-white/80 mb-8 text-sm sm:text-base">
            Join thousands of people already using ChatApp to stay connected.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-semibold rounded-2xl 
              hover:bg-gray-50 hover:scale-105 transition-all duration-200 shadow-xl shadow-black/20"
          >
            Start Chatting Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
