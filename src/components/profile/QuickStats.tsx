import React from 'react';

interface QuickStatsProps {
  memberSince: string;
  activeSubjects: number;
  availability: string;
}

export const QuickStats: React.FC<QuickStatsProps> = ({
  memberSince,
  activeSubjects,
  availability
}) => {
  return (
    <section className="bg-white dark:bg-zinc-900 shadow-[0px_14px_42px_rgba(8,15,52,0.06)] border flex items-stretch gap-5 text-sm justify-between mt-6 px-[23px] py-[26px] rounded-[20px] border-[rgba(240,240,240,1)] dark:border-zinc-800 border-solid max-md:px-5 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-stretch text-[rgba(126,126,126,1)] dark:text-zinc-400 font-normal">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-[rgba(32,32,32,1)] dark:text-white text-base font-bold">
            Quick Stats
          </h3>
          <div className="bg-gradient-to-r from-[rgba(112,45,255,0.1)] to-[rgba(147,51,234,0.1)] dark:from-violet-900/30 dark:to-fuchsia-900/30 w-2 h-2 rounded-full"></div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs">📅</span>
            <span>Member since</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs">📖</span>
            <span>Active subjects</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs">🕐</span>
            <span>Availability</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs">⭐</span>
            <span>Rating</span>
          </div>
        </div>
      </div>
      <div className="text-[rgba(32,32,32,1)] dark:text-white font-semibold flex flex-col justify-center">
        <div className="space-y-3 text-right">
          <div className="bg-gradient-to-r from-[rgba(112,45,255,0.05)] to-[rgba(147,51,234,0.05)] dark:from-violet-900/30 dark:to-fuchsia-900/30 px-2 py-1 rounded-md">
            {memberSince}
          </div>
          <div className="flex items-center justify-end gap-1">
            <span>{activeSubjects}</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-[rgba(112,45,255,1)] dark:text-violet-300">
            {availability}
          </div>
          <div className="flex items-center justify-end gap-1">
            <span>4.9</span>
            <span className="text-yellow-500 text-xs">⭐</span>
          </div>
        </div>
      </div>
    </section>
  );
};
