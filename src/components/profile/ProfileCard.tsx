import React from 'react';
import { AboutSection } from '@/components/profile/AboutSection';

interface ProfileCardProps {
  name: string;
  aboutText: string;
  email: string;
  avatar: string;
  dayStreak: number;
  sessions: number;
  onEditProfile: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  email,
  avatar,
  dayStreak,
  sessions,
  aboutText,
  onEditProfile
}) => {
  return (
    <aside className="bg-white dark:bg-zinc-900 shadow-[0px_14px_42px_rgba(8,15,52,0.06)] border flex w-full flex-col items-center text-center p-[25px] rounded-[20px] border-[rgba(240,240,240,1)] dark:border-zinc-800 border-solid max-md:px-5 hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <div className="bg-gradient-to-r from-[rgba(112,45,255,1)] to-[rgba(147,51,234,1)] flex w-20 flex-col items-center text-[32px] text-white font-bold whitespace-nowrap justify-center h-20 px-7 rounded-full shadow-lg max-md:px-5">
          <div>{avatar}</div>
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center">
          <div className="w-2 h-2 bg-white dark:bg-zinc-900 rounded-full"></div>
        </div>
      </div>
      <h2 className="text-[rgba(32,32,32,1)] dark:text-white text-xl font-bold mt-4">
        {name}
      </h2>
      <p className="text-[rgba(126,126,126,1)] dark:text-zinc-400 text-sm font-normal mt-1">
        {email}
      </p>
      <div className="bg-gradient-to-r from-[rgba(112,45,255,0.05)] to-[rgba(147,51,234,0.05)] dark:from-violet-900/30 dark:to-fuchsia-900/30 px-3 py-1 rounded-full mt-2">
        <span className="text-[rgba(112,45,255,1)] dark:text-violet-300 text-xs font-semibold">Premium Member</span>
      </div>
      <div className="w-full mt-4 mb-2 px-3 py-2 dark:bg-zinc-800 rounded-xl text-[rgba(32,32,32,0.85)] dark:text-zinc-200 text-sm text-left font-normal shadow-sm border border-[rgba(240,240,240,1)] dark:border-zinc-700">
        {aboutText}
      </div>
      <div className="flex w-[138px] max-w-full items-stretch gap-3 mt-[15px] bg-[rgba(249,249,249,1)] dark:bg-zinc-800 p-3 rounded-xl">
        <div className="flex flex-col items-stretch">
          <div className="text-[rgba(112,45,255,1)] dark:text-violet-300 text-2xl font-bold self-center flex items-center gap-1">
            {dayStreak}
            <span className="text-xs">🔥</span>
          </div>
          <div className="text-[rgba(126,126,126,1)] dark:text-zinc-400 text-xs font-normal">
            Day Streak
          </div>
        </div>
        <div className="bg-[rgba(240,240,240,1)] dark:bg-zinc-700 flex w-px shrink-0 h-10 my-auto" />
        <div className="flex flex-col items-stretch whitespace-nowrap">
          <div className="text-[rgba(112,45,255,1)] dark:text-violet-300 text-2xl font-bold self-center flex items-center gap-1">
            {sessions}
            <span className="text-xs">📚</span>
          </div>
          <div className="text-[rgba(126,126,126,1)] dark:text-zinc-400 text-xs font-normal">
            Sessions
          </div>
        </div>
      </div>
      <button
        onClick={() => window.location.href = '/settings'}
        className="bg-gradient-to-r from-[rgba(112,45,255,1)] to-[rgba(147,51,234,1)] dark:from-violet-700 dark:to-fuchsia-700 self-stretch flex flex-col items-center text-sm text-white font-semibold justify-center mt-5 px-[70px] py-3 rounded-xl max-md:px-5 hover:from-[rgba(112,45,255,0.9)] hover:to-[rgba(147,51,234,0.9)] dark:hover:from-violet-800 dark:hover:to-fuchsia-800 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
      >
        Edit Profile
      </button>
    </aside>
  );
};
