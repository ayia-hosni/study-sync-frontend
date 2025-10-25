import React from 'react';

interface NotificationItemProps {
  emoji: string;
  message: string;
  time: string;
  onMarkRead?: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  emoji,
  message,
  time,
  onMarkRead
}) => {
  return (
    <article className="flex items-start gap-[17px] px-0 py-3 rounded-xl max-sm:gap-3 max-sm:px-0 max-sm:py-2">
      <span 
        className="w-4 h-4 text-base leading-6 shrink-0" 
        role="img" 
        aria-label="notification icon"
      >
        {emoji}
      </span>
      <div className="flex-1 flex flex-col gap-1">
        <p className="text-sm font-normal leading-[21px] text-[#202020]">
          {message}
        </p>
        <time className="text-[11px] font-normal leading-[16.5px] text-[#7E7E7E]">
          {time}
        </time>
      </div>
      {onMarkRead && (
        <button 
          className="text-xs font-semibold leading-[18px] text-[#36C] cursor-pointer shrink-0 hover:underline"
          onClick={onMarkRead}
        >
          Mark Read
        </button>
      )}
    </article>
  );
};
