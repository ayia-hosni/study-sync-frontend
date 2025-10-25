import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => {
  const progressWidth = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`h-2 relative ${className}`}>
      <div className="w-full h-2 bg-[#E0C6FD] rounded-[50px]" />
      <div 
        className="h-2 absolute bg-[#702DFF] rounded-[50px] left-0 top-0 transition-all duration-300 ease-out"
        style={{ width: `${progressWidth}%` }}
        role="progressbar"
        aria-valuenow={progressWidth}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress: ${progressWidth}%`}
      />
    </div>
  );
};
