'use client';

export function formatTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diff = now - date;
  const oneDay = 86400000;

  if (diff < oneDay && date.getDate() === now.getDate()) return 'Today';
  if (diff < 2 * oneDay) return 'Yesterday';
  return date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
}

export function generateId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function groupMessagesByDate(messages) {
  const groups = {};
  messages.forEach((msg) => {
    const label = formatDate(msg.timestamp);
    if (!groups[label]) groups[label] = [];
    groups[label].push(msg);
  });
  return groups;
}
