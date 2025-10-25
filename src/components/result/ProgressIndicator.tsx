import React from 'react';

interface ProgressIndicatorProps {
  progress?: number;
  size?: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  progress = 57, 
  size = 80 
}) => {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div 
        className="absolute rounded-full border-4 border-solid border-[#E0C6FD]"
        style={{ width: size, height: size }}
      />
      <div 
        className="absolute flex items-center justify-center bg-[#702DFF] rounded-full"
        style={{ 
          width: size * 0.6, 
          height: size * 0.6, 
          left: size * 0.2, 
          top: size * 0.2 
        }}
      >
        <span 
          className="text-xl leading-none text-black"
          role="img" 
          aria-label="Search"
        >
          🔍
        </span>
      </div>
    </div>
  );
};
