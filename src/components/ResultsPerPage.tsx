
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ResultsPerPageProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export const ResultsPerPage: React.FC<ResultsPerPageProps> = ({ 
  value, 
  onChange, 
  className = '' 
}) => {
  const options = [6, 12, 24, 48];

  return (
    <div className={`flex items-center gap-[15px] text-xs text-[rgba(126,126,126,1)] font-normal ${className}`}>
      <span className="self-stretch grow my-auto">Show</span>
      <Select value={value.toString()} onValueChange={(val) => onChange(Number(val))}>
        <SelectTrigger className="w-[60px] h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option} value={option.toString()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="self-stretch my-auto">per page</span>
    </div>
  );
};
