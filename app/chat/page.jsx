'use client';

import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-3.5rem)] flex bg-gray-50 dark:bg-surface-2 overflow-hidden">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}
