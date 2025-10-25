import React from 'react';

interface MatchCardProps {
  initial: string;
  name: string;
  matchedTime: string;
  subject: string;
  onMessage?: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  initial,
  name,
  matchedTime,
  subject,
  onMessage
}) => {
  return (
    <article className="w-[200px] h-[155px] border shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] flex flex-col justify-between bg-white p-[17px] rounded-2xl border-solid border-[#F0F0F0] max-sm:w-full hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 flex items-center justify-center bg-[#702DFF] rounded-[50%]">
          <span className="text-sm font-semibold leading-[21px] text-white">
            {initial}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-semibold leading-[21px] text-[#202020]">
            {name}
          </h3>
          <time className="text-[11px] font-normal leading-[16.5px] text-[#7E7E7E]">
            {matchedTime}
          </time>
        </div>
      </div>
      <div className="mb-3">
        <span className="text-[10px] font-semibold leading-[15px] text-[#702DFF] uppercase bg-[rgba(112,45,255,0.10)] px-3 py-1 rounded-lg">
          {subject}
        </span>
      </div>
      <button 
        className="w-full h-[34px] flex items-center justify-center cursor-pointer bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
        onClick={onMessage}
      >
        <span className="text-xs font-semibold leading-[18px] text-[#202020]">
          Message
        </span>
      </button>
    </article>
  );
};
