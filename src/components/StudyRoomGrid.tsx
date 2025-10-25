import React from 'react';
import { StudyRoomCard, StudyRoom } from './StudyRoomCard';

interface StudyRoomGridProps {
  rooms: StudyRoom[];
  onJoinRoom: (roomId: string) => void;
  className?: string;
}

export const StudyRoomGrid: React.FC<StudyRoomGridProps> = ({ 
  rooms, 
  onJoinRoom, 
  className = '' 
}) => {
  return (
    <section className={`w-full space-y-6 ${className}`}>
      {Array.from({ length: Math.ceil(rooms.length / 2) }, (_, rowIndex) => (
        <div key={rowIndex} className="gap-5 flex max-md:flex-col max-md:items-stretch">
          {rooms.slice(rowIndex * 2, rowIndex * 2 + 2).map((room, colIndex) => (
            <div 
              key={room.id}
              className={`w-6/12 ${colIndex === 1 ? 'ml-5' : ''} max-md:w-full max-md:ml-0`}
            >
              <StudyRoomCard 
                room={room}
                onJoin={onJoinRoom}
                className="max-md:mt-6"
              />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};
