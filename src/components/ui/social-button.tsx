import React from 'react';
import { cn } from '@/lib/utils';

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  text: string;
}

const SocialButton = React.forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ icon, text, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "bg-white border flex items-center justify-center gap-2 flex-1 px-8 py-3.5 rounded-xl border-[rgba(240,240,240,1)] border-solid text-[rgba(32,32,32,1)] font-normal hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[rgba(112,45,255,0.2)] focus:border-[rgba(112,45,255,1)]",
          className
        )}
        {...props}
      >
        {icon}
        <span>{text}</span>
      </button>
    );
  }
);

SocialButton.displayName = 'SocialButton';

export { SocialButton };
