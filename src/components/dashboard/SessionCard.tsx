import React from 'react';

interface SessionCardProps {
  emoji: string;
  subject: string;
  time: string;
  status: 'starting-soon' | 'scheduled';
  onViewDetails?: () => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  emoji,
  subject,
  time,
  status,
  onViewDetails
}) => {
  const getStatusText = () => {
    switch (status) {
      case 'starting-soon':
        return 'STARTS IN 30M';
      case 'scheduled':
        return 'SCHEDULED';
      default:
        return 'SCHEDULED';
    }
  };

  return (
    <article className="w-full h-[150px] bg-card border border-border flex flex-col justify-between p-5 rounded-2xl hover:border-primary/50 transition-all duration-300 group hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <span className="text-2xl group-hover:scale-110 transition-transform duration-200" role="img" aria-label={subject}>
            {emoji}
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold text-card-foreground">
              {subject}
            </h3>
            <time className="text-xs text-muted-foreground">
              {time}
            </time>
          </div>
        </div>
        <div className="flex items-center justify-center px-3 py-1 bg-primary/20 rounded-lg">
          <span className="text-xs font-semibold text-primary uppercase">
            {getStatusText()}
          </span>
        </div>
      </div>
      <button 
        className="w-full h-12 flex items-center justify-center cursor-pointer bg-secondary/50 rounded-xl hover:bg-secondary transition-all duration-200 hover:scale-[1.02]"
        onClick={onViewDetails}
      >
        <span className="text-sm font-semibold text-card-foreground">
          Join
        </span>
      </button>
    </article>
  );
};
