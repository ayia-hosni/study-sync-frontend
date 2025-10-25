import React, { useState } from 'react';
import { EyeIcon } from '../icons/eye-icon';

interface FormFieldProps {
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  className = ""
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`flex-1 ${className}`}>
      <label className="text-[#202020] text-sm font-semibold leading-[21px] mb-2 block">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full h-12 border box-border text-sm text-[#999] bg-white px-4 py-0 rounded-xl border-solid border-[#F0F0F0] focus:outline-none focus:border-[#702DFF] transition-colors max-sm:h-11 max-sm:text-[13px]"
          aria-label={label}
        />
        {type === 'password' && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <EyeIcon 
              onClick={() => setShowPassword(!showPassword)}
              className="hover:opacity-70 transition-opacity"
            />
          </div>
        )}
      </div>
    </div>
  );
};
