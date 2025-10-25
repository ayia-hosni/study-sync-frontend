import React from 'react';
import { ProgressIndicator } from './ProgressIndicator';

export const WelcomeSection: React.FC = () => {
  return (
    <section className="pt-6">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-[#202020] dark:text-white text-2xl font-bold leading-8 mb-2">
            Welcome back, Aya 👋
          </div>
          <div className="text-[#7E7E7E] dark:text-neutral-300 text-sm font-normal leading-5">
            Ready to continue your growth journey?
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <div className="text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4">
              Weekly Progress
            </div>
            <div className="text-[#202020] dark:text-white text-sm font-bold leading-5">
              6/8 Habits
            </div>
          </div>
          <ProgressIndicator percentage={75} />
        </div>
      </div>

      <div className="w-full h-[172px] relative flex flex-col justify-between mb-8 p-6 rounded-[20px] bg-gradient-to-br from-[#702DFF] to-[#5a24cc] dark:from-[#232329] dark:to-[#18181b]">
        <div className="absolute w-[60px] h-[60px] opacity-20 right-4 top-4">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_95_14)">
              <path d="M30 0C30 0 31.6553 15.4498 38.1027 21.8973C44.5502 28.3447 60 30 60 30C60 30 44.5502 31.6553 38.1027 38.1027C31.6553 44.5502 30 60 30 60C30 60 28.3447 44.5502 21.8973 38.1027C15.4498 31.6553 0 30 0 30C0 30 15.4498 28.3447 21.8973 21.8973C28.3447 15.4498 30 0 30 0Z" fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_95_14">
                <rect width="60" height="60" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        
        <div>
          <div className="text-white text-lg font-bold leading-7 mb-2">
            🚀 Ready to Grow?
          </div>
          <div className="text-white text-sm font-normal leading-5 opacity-90">
            You have active habits waiting. Keep your momentum going!
          </div>
        </div>
        
        <button
          className="flex items-center gap-2 w-[194px] h-11 cursor-pointer bg-white dark:bg-neutral-900 px-6 py-0 rounded-[40px] hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
          onClick={() => window.location.href = '/rooms'}
        >
          <span className="text-[#702DFF] dark:text-violet-400 text-sm font-bold leading-5">
            Join Growth Room
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="#702DFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
};
