import React from 'react';

export const StarIcon: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M12 6C12 6 12.3311 9.0899 13.6821 10.4409C15.033 11.7919 18 12 18 12C18 12 15.033 12.2081 13.6821 13.5591C12.3311 14.9101 12 18 12 18C12 18 11.6689 14.9101 10.3179 13.5591C8.967 12.2081 6 12 6 12C6 12 8.967 11.7919 10.3179 10.4409C11.6689 9.0899 12 6 12 6Z" 
        fill="white"
      />
    </svg>
  );
};
