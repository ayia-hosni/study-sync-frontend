import React, { useState } from 'react';
import { Badge } from '../ui/badge';

interface HabitCardProps {
  emoji: string;
  roomName: string;
  timeAgo: string;
  habitTitle: string;
  habitSubtitle: string;
  streakDays?: number;
  isCompleted?: boolean;
  completionMessage?: string;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  emoji,
  roomName,
  timeAgo,
  habitTitle,
  habitSubtitle,
  streakDays,
  isCompleted = false,
  completionMessage
}) => {
  const [completed, setCompleted] = useState(isCompleted);

  const handleToggleComplete = () => {
    setCompleted(!completed);
  };

  return (
    <article className="w-full border shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] bg-white dark:bg-[#232329] mb-6 p-6 rounded-[20px] border-solid border-[#F0F0F0] dark:border-[#232329]">
      <header className="flex items-center justify-between border-b-neutral-100 mb-6 pb-4 border-b-[0.889px] border-solid dark:border-[#232329]">
        <div className="flex items-center gap-4">
          <span className="text-sm font-normal leading-5">
            {emoji}
          </span>
          <span className="text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4">
            {roomName}
          </span>
        </div>
        <time className="text-[#7E7E7E] dark:text-neutral-300 text-[10px] font-normal leading-[15px]">
          {timeAgo}
        </time>
      </header>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleComplete}
            className={`w-8 h-8 border flex items-center justify-center rounded-[50%] border-solid transition-colors ${
              completed 
                ? 'bg-emerald-500 border-emerald-500' 
                : 'bg-[#F8F9FA] dark:bg-neutral-800 border-[#E9ECEF] dark:border-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-700'
            }`}
            aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {completed ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 4.5L6 12L2.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2C8.55228 2 9 2.44772 9 3V7H13C13.5523 7 14 7.44772 14 8C14 8.55228 13.5523 9 13 9H9V13C9 13.5523 8.55228 14 8 14C7.44772 14 7 13.5523 7 13V9H3C2.44772 9 2 8.55228 2 8C2 7.44772 2.44772 7 3 7H7V3C7 2.44772 7.44772 2 8 2Z" fill="#702DFF" />
              </svg>
            )}
          </button>
          <div>
            <h3 className="text-[#202020] dark:text-white text-base font-bold leading-6">
              {habitTitle}
            </h3>
            <p className="text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4">
              {habitSubtitle}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {streakDays && (
            <Badge variant="purple" size="lg">
              {streakDays} day streak
            </Badge>
          )}
          <button className="w-8 h-8 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-[50%] hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" stroke="#9CA3AF" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>
      
      {completed && completionMessage && (
        <div className="w-full h-[42px] border border-sky-100 dark:border-sky-900 flex items-center bg-[#F0F8FF] dark:bg-[#1e293b] px-4 py-0 rounded-xl border-solid mt-4">
          <p className="text-blue-800 dark:text-blue-200 text-xs font-normal leading-4">
            {completionMessage}
          </p>
        </div>
      )}
    </article>
  );
};
