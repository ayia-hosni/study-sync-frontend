import React, { useEffect, useState } from 'react';
import { CloseButton } from './CloseButton';
import { SuccessMatchCard } from './SuccessMatchCard';
import { LoadingMatchState } from './LoadingMatchState';
import { NoMatchFoundState } from './NoMatchFoundState';

export type MatchState = 'loading' | 'success' | 'no-match';

export interface MatchedPartner {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  subject: string;
  subjectIcon: string;
  scheduledTime: string;
  compatibilityScore: number;
  matchReason: string;
}

interface MatchResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinSession?: (partnerId: string) => void;
  onViewDetails?: (partnerId: string) => void;
  onEditPreferences?: () => void;
  onJoinPublicRoom?: () => void;
}

export const MatchResultModal: React.FC<MatchResultModalProps> = ({
  isOpen,
  onClose,
  onJoinSession,
  onViewDetails,
  onEditPreferences,
  onJoinPublicRoom,
}) => {
  const [matchState, setMatchState] = useState<MatchState>('loading');
  const [matchedPartner, setMatchedPartner] = useState<MatchedPartner | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(15);

  useEffect(() => {
    if (!isOpen) {
      setMatchState('loading');
      setTimeRemaining(15);
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          if (Math.random() > 0.3) {
            setMatchedPartner({
              id: '1',
              name: 'Sarah A.',
              initials: 'SA',
              subject: 'Physics',
              subjectIcon: '📐',
              scheduledTime: 'Today at 6:00 PM',
              compatibilityScore: 92,
              matchReason: 'You both prefer collaborative study mode and evening sessions.',
            });
            setMatchState('success');
          } else {
            setMatchState('no-match');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[90px] pb-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className="relative w-full max-w-md md:max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl animate-scale-in transition-colors duration-300"
        style={{
          maxHeight: 'calc(100vh - 120px)',
          overflowY: 'auto',
          padding: '2rem 1.5rem',
        }}
      >
        <div className="absolute right-4 top-4 z-10">
          <CloseButton onClick={onClose} />
        </div>

        {matchState === 'loading' && (
          <LoadingMatchState timeRemaining={timeRemaining} onEditPreferences={onEditPreferences} />
        )}

        {matchState === 'success' && matchedPartner && (
          <SuccessMatchCard
            partner={matchedPartner}
            onJoinSession={() => onJoinSession?.(matchedPartner.id)}
            onViewDetails={() => onViewDetails?.(matchedPartner.id)}
          />
        )}

        {matchState === 'no-match' && (
          <NoMatchFoundState
            onEditPreferences={onEditPreferences}
            onJoinPublicRoom={onJoinPublicRoom}
          />
        )}
      </div>
    </div>
  );
};
