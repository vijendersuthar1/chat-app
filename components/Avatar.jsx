'use client';

export default function Avatar({ initials, colorClass, size = 'md', online }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
  };
  const dotSizes = {
    sm: 'w-2 h-2 border',
    md: 'w-2.5 h-2.5 border',
    lg: 'w-3.5 h-3.5 border-2',
    xl: 'w-4 h-4 border-2',
  };

  return (
    <div className="relative inline-flex flex-shrink-0">
      <div
        className={`${sizes[size]} ${colorClass || 'bg-violet-500'} rounded-full flex items-center justify-center font-semibold text-white select-none`}
      >
        {initials}
      </div>
      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 ${dotSizes[size]} rounded-full border-gray-900 dark:border-surface ${online ? 'bg-emerald-400' : 'bg-gray-500'}`}
        />
      )}
    </div>
  );
}
