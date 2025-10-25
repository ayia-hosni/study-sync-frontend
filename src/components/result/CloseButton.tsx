import React from 'react';

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity ${className}`}
      aria-label="Close modal"
      type="button"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4L4 12M4 4L12 12"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
