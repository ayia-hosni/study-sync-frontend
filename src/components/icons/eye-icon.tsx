import React from 'react';

interface EyeIconProps {
  className?: string;
  onClick?: () => void;
}

export const EyeIcon: React.FC<EyeIconProps> = ({ className = "", onClick }) => {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className}`}
      onClick={onClick}
    >
      <path 
        d="M12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.33696 12.5 8.70107 12.2366 8.23223 11.7678C7.76339 11.2989 7.5 10.663 7.5 10C7.5 9.33696 7.76339 8.70107 8.23223 8.23223C8.70107 7.76339 9.33696 7.5 10 7.5C10.663 7.5 11.2989 7.76339 11.7678 8.23223C12.2366 8.70107 12.5 9.33696 12.5 10Z" 
        stroke="black" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M2.04834 10.0001C3.11001 6.61925 6.26917 4.16675 10 4.16675C13.7317 4.16675 16.89 6.61925 17.9517 10.0001C16.89 13.3809 13.7317 15.8334 10 15.8334C6.26917 15.8334 3.11001 13.3809 2.04834 10.0001Z" 
        stroke="black" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};
