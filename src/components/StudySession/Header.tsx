import React from 'react';

interface HeaderProps {
  sessionTitle: string;
  sessionSubtitle: string;
  currentTopic: string;
  sessionTime: string;
  onLeaveSession: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  sessionTitle,
  sessionSubtitle,
  currentTopic,
  sessionTime,
  onLeaveSession
}) => {
  return (
    <header className="w-full h-[58px] shadow-[0px_2px_8px_0px_rgba(8,15,52,0.06)] flex items-center justify-between bg-white px-6 py-0 border-b-[0.889px] border-b-[#D8D8D8] border-solid">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 flex items-center justify-center bg-[#702DFF] rounded-[50%]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4C8 4 8.2207 6.0599 9.1214 6.9606C10.022 7.8613 12 8 12 8C12 8 10.022 8.1387 9.1214 9.0394C8.2207 9.9401 8 12 8 12C8 12 7.7793 9.9401 6.8786 9.0394C5.978 8.1387 4 8 4 8C4 8 5.978 7.8613 6.8786 6.9606C7.7793 6.0599 8 4 8 4Z" fill="white"/>
          </svg>
        </div>
        <div>
          <h1 className="text-[#202020] text-base font-bold leading-6">
            {sessionTitle}
          </h1>
          <p className="text-[#7E7E7E] text-xs font-normal leading-[18px]">
            {sessionSubtitle}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="text-black text-xl font-normal leading-[30px]" role="img" aria-label="ruler">
            📐
          </span>
          <span className="text-[#202020] text-sm font-bold leading-[21px]">
            {currentTopic}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#7E7E7E] text-xs font-normal leading-[18px]">
            Session time:
          </span>
          <time className="text-[#702DFF] text-sm font-bold leading-[21px]">
            {sessionTime}
          </time>
        </div>
        <button 
          onClick={onLeaveSession}
          className="w-[114px] h-[34px] flex items-center justify-center bg-[#F13E3E] rounded-lg hover:bg-[#d63333] transition-colors"
          aria-label="Leave current session"
        >
          <span className="text-white text-xs font-bold leading-[18px]">
            Leave Session
          </span>
        </button>
      </div>
    </header>
  );
};
