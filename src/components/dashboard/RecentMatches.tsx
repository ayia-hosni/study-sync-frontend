import React from 'react';
import { MatchCard } from './MatchCard';

interface Match {
  id: string;
  initial: string;
  name: string;
  matchedTime: string;
  subject: string;
}

interface RecentMatchesProps {
  matches?: Match[];
  onSeeAll?: () => void;
  onMessage?: (matchId: string) => void;
}

export const RecentMatches: React.FC<RecentMatchesProps> = ({
  matches = [
    { id: '1', initial: 'A', name: 'Ali', matchedTime: 'Matched 2h ago', subject: 'PHYSICS' },
    { id: '2', initial: 'S', name: 'Sarah', matchedTime: 'Matched 4h ago', subject: 'MATH' },
    { id: '3', initial: 'M', name: 'Mike', matchedTime: 'Matched 1d ago', subject: 'CHEMISTRY' },
    { id: '4', initial: 'E', name: 'Emma', matchedTime: 'Matched 2d ago', subject: 'BIOLOGY' },
    { id: '5', initial: 'J', name: 'John', matchedTime: 'Matched 3d ago', subject: 'MATH' }
  ],
  onSeeAll,
  onMessage
}) => {
  return (
    <section className="mb-10 px-4 bg-white dark:bg-zinc-900 rounded-2xl border border-[rgba(240,240,240,1)] dark:border-zinc-800 transition-colors duration-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white max-sm:text-lg">Your Study Partners</h2>
        <button
          className="text-sm text-primary dark:text-violet-300 hover:underline transition-colors"
          onClick={onSeeAll}
        >
          See All
        </button>
      </div>

      {/* Match Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fade-in">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            initial={match.initial}
            name={match.name}
            matchedTime={match.matchedTime}
            subject={match.subject}
            onMessage={() => onMessage?.(match.id)}
          />
        ))}
      </div>
    </section>
  );
};
