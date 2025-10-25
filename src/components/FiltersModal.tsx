import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export interface FilterOptions {
  subject: string[];
  level: string[];
  status: string[];
  participants: string;
}

interface FiltersPanelProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  onApply: () => void;
  onClear: () => void;
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ filters, onChange, onApply, onClear }) => {
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const statuses = ['Active', 'Scheduled'];

  const handleSubjectChange = (subject: string, checked: boolean) => {
    onChange({
      ...filters,
      subject: checked
        ? [...filters.subject, subject]
        : filters.subject.filter(s => s !== subject)
    });
  };

  const handleLevelChange = (level: string, checked: boolean) => {
    onChange({
      ...filters,
      level: checked
        ? [...filters.level, level]
        : filters.level.filter(l => l !== level)
    });
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    onChange({
      ...filters,
      status: checked
        ? [...filters.status, status]
        : filters.status.filter(s => s !== status)
    });
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-wrap gap-4">
        {/* Subject Filter */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="font-semibold mb-3">Subject</h3>
          <select
            className="border rounded px-3 py-2 text-sm w-full mt-1"
            value={filters.subject[0] || ''}
            onChange={e => onChange({ ...filters, subject: e.target.value ? [e.target.value] : [] })}
          >
            <option value="">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
          </select>
        </div>
        {/* Level Filter */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="font-semibold mb-3">Level</h3>
          <select
            className="border rounded px-3 py-2 text-sm w-full mt-1"
            value={filters.level[0] || ''}
            onChange={e => onChange({ ...filters, level: e.target.value ? [e.target.value] : [] })}
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {/* Status Filter */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="font-semibold mb-3">Status</h3>
          <select
            className="border rounded px-3 py-2 text-sm w-full mt-1"
            value={filters.status[0] || ''}
            onChange={e => onChange({ ...filters, status: e.target.value ? [e.target.value] : [] })}
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>
        {/* Participants Filter */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="font-semibold mb-3">Room Availability</h3>
          <select
            className="border rounded px-3 py-2 text-sm w-full mt-1"
            value={filters.participants}
            onChange={e => onChange({ ...filters, participants: e.target.value })}
          >
            <option value="all">All rooms</option>
            <option value="available">Available spaces</option>
            <option value="full">Full rooms</option>
          </select>
        </div>
      </div>
      <div className="flex space-x-2 pt-4">
        <Button onClick={onApply} className="flex-1">
          Apply Filters
        </Button>
        <Button onClick={onClear} variant="outline" className="flex-1">
          Clear All
        </Button>
      </div>
    </div>
  );
};
