import React from 'react';
import { ParticipantTile } from './ParticipantTile';

interface Participant {
  id: string;
  name: string;
  initial: string;
  backgroundColor: string;
  isOnline: boolean;
  isAway?: boolean;
  cameraOff?: boolean;
  isCurrentUser?: boolean;
}

interface ParticipantsGridProps {
  participants: Participant[];
}

export const ParticipantsGrid: React.FC<ParticipantsGridProps> = ({ participants }) => {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-[#202020] text-lg font-bold leading-[27px] mb-2">
          Active Participants
        </h2>
        <p className="text-[#7E7E7E] text-xs font-normal leading-[18px]">
          {participants.length} people in this session
        </p>
      </div>
      
      <div className="grid grid-cols-[1fr_1fr] gap-6 mb-6">
        {participants.slice(0, 2).map((participant) => (
          <ParticipantTile
            key={participant.id}
            name={participant.name}
            initial={participant.initial}
            backgroundColor={participant.backgroundColor}
            isOnline={participant.isOnline}
            isAway={participant.isAway}
            cameraOff={participant.cameraOff}
            isCurrentUser={participant.isCurrentUser}
          />
        ))}
      </div>
      
      {participants.length > 2 && (
        <div className="grid grid-cols-[1fr_1fr] gap-6">
          {participants.slice(2, 4).map((participant) => (
            <ParticipantTile
              key={participant.id}
              name={participant.name}
              initial={participant.initial}
              backgroundColor={participant.backgroundColor}
              isOnline={participant.isOnline}
              isAway={participant.isAway}
              cameraOff={participant.cameraOff}
              isCurrentUser={participant.isCurrentUser}
            />
          ))}
        </div>
      )}
    </section>
  );
};
