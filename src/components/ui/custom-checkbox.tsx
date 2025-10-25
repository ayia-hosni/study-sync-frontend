import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CustomCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CustomCheckbox = forwardRef<HTMLInputElement, CustomCheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            className={cn(
              "sr-only peer",
              className
            )}
            {...props}
          />
          <div className="rounded bg-white flex w-5 shrink-0 h-5 border-[rgba(240,240,240,1)] border-solid border-2 peer-checked:bg-[rgba(112,45,255,1)] peer-checked:border-[rgba(112,45,255,1)] transition-colors cursor-pointer relative">
            <svg
              className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <label
          htmlFor={props.id}
          className="text-[rgba(32,32,32,1)] font-normal text-sm cursor-pointer"
        >
          {label}
        </label>
      </div>
    );
  }
);

CustomCheckbox.displayName = 'CustomCheckbox';

export { CustomCheckbox };
