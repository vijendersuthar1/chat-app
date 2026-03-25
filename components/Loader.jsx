'use client';

export default function Loader({ size = 'md', text }) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizes[size]} rounded-full border-primary/20 border-t-primary animate-spin`}
      />
      {text && (
        <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse-soft">{text}</p>
      )}
    </div>
  );
}
