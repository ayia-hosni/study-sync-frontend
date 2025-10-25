import React from 'react';
import { SessionCard } from './SessionCard';

interface Session {
  id: string;
  emoji: string;
  subject: string;
  time: string;
  status: 'starting-soon' | 'scheduled';
}

interface UpcomingSessionsProps {
  sessions?: Session[];
  onViewAll?: () => void;
  onViewDetails?: (sessionId: string) => void;
}

export const UpcomingSessions: React.FC<UpcomingSessionsProps> = ({
  sessions = [],
  onViewAll,
  onViewDetails
}) => {
  if (!sessions.length) {
    return (
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-foreground max-sm:text-lg">
            Your Upcoming Sessions
          </h2>
        </div>
        <p className="text-muted-foreground text-sm">No upcoming sessions.</p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground max-sm:text-lg">
          Your Upcoming Sessions
        </h2>
        {onViewAll && (
          <button 
            className="text-sm text-primary cursor-pointer hover:text-primary/80 transition-colors font-medium"
            onClick={onViewAll}
          >
            View All
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            emoji={session.emoji}
            subject={session.subject}
            time={session.time}
            status={session.status}
            onViewDetails={() => onViewDetails?.(session.id)}
          />
        ))}
      </div>
    </section>
  );
};
