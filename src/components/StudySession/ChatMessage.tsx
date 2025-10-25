import React from 'react';

interface ChatMessageProps {
  sender?: string;
  message: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  message,
  timestamp,
  isCurrentUser = false
}) => {
  return (
    <div className="flex flex-col gap-1">
      <article className={`w-[280px] border p-4 rounded-xl border-solid ${
        isCurrentUser 
          ? 'bg-[#702DFF] border-[#702DFF] ml-auto' 
          : 'bg-white border-[#F0F0F0]'
      }`}>
        {sender && !isCurrentUser && (
          <div className="text-[#7E7E7E] text-xs font-bold leading-[18px] mb-2">
            {sender}
          </div>
        )}
        <p className={`text-sm font-normal leading-[21px] ${
          isCurrentUser ? 'text-white' : 'text-[#202020]'
        }`}>
          {message}
        </p>
      </article>
      <time className={`text-[#7E7E7E] text-[11px] font-normal leading-[16.5px] ${
        isCurrentUser ? 'ml-auto mr-2' : 'ml-2'
      }`}>
        {timestamp}
      </time>
    </div>
  );
};
