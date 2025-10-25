import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label htmlFor={props.id} className="text-[rgba(32,32,32,1)] font-semibold text-sm">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "bg-white border flex w-full text-[rgba(153,153,153,1)] font-normal pb-3.5 pt-3.5 px-3.5 rounded-xl border-[rgba(240,240,240,1)] border-solid focus:outline-none focus:ring-2 focus:ring-[rgba(112,45,255,0.2)] focus:border-[rgba(112,45,255,1)] transition-colors",
              error && "border-red-500 focus:border-red-500 focus:ring-red-200",
              className
            )}
            {...props}
          />
          {icon && (
            <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export { InputField };
