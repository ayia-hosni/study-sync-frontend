import React from 'react';
import { Clock, Calendar, Users } from 'lucide-react';

export interface StudyRoom {
  id: string;
  title: string;
  host: string;
  description: string;
  subject: string;
  level: string;
  participants: {
    current: number;
    max: number;
  };
  status: 'active' | 'scheduled';
  timeRemaining?: string;
  startsIn?: string;
  hostInitial: string;
  hostColor: string;
}

interface StudyRoomCardProps {
  room: StudyRoom;
  onJoin: (roomId: string) => void;
  className?: string;
}

export const StudyRoomCard: React.FC<StudyRoomCardProps> = ({ 
  room, 
  onJoin, 
  className = '' 
}) => {
  const getSubjectEmoji = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'mathematics': return '📚';
      case 'physics': return '⚛️';
      case 'chemistry': return '🧪';
      case 'biology': return '🧬';
      default: return '📚';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'text-green-600 bg-green-50';
      case 'intermediate': return 'text-blue-600 bg-blue-50';
      case 'advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const isRoomFull = room.participants.current >= room.participants.max;

  const handleJoinClick = () => {
    onJoin(room.id);
  };

  return (
    <article className={`bg-white shadow-[0px_14px_42px_rgba(8,15,52,0.06)] border w-full p-[25px] rounded-[20px] border-[rgba(240,240,240,1)] border-solid hover:shadow-lg transition-shadow ${className}`}>
      <div className="flex items-stretch gap-[40px_41px] flex-wrap">
        <div className="flex flex-col grow shrink-0 basis-0 w-fit">
          <div className="flex items-stretch gap-3 mb-4">
            <div 
              className="flex flex-col items-center text-sm text-white font-semibold whitespace-nowrap justify-center w-10 h-10 px-4 rounded-full"
              style={{ backgroundColor: room.hostColor }}
            >
              <div>{room.hostInitial}</div>
            </div>
            <div className="flex flex-col items-stretch grow shrink-0 basis-0 w-fit">
              <h3 className="text-[rgba(32,32,32,1)] text-base font-semibold">
                {room.title}
              </h3>
              <div className="flex items-stretch gap-0.5 text-xs text-[rgba(126,126,126,1)] font-normal">
                <span className="grow">Hosted by</span>
                <span className="font-medium">{room.host}</span>
              </div>
            </div>
          </div>
          
          <p className="text-[rgba(32,32,32,1)] text-sm font-normal self-stretch mb-4">
            {room.description}
          </p>
          
          <div className="flex items-center gap-4 flex-wrap mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getSubjectEmoji(room.subject)}</span>
              <span className="text-xs text-[rgba(126,126,126,1)]">{room.subject}</span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(room.level)}`}>
              {room.level}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 text-[rgba(126,126,126,1)]" />
              <span className="text-xs text-[rgba(126,126,126,1)]">
                {room.participants.current}/{room.participants.max}
                {isRoomFull && <span className="text-red-500 ml-1">(Full)</span>}
              </span>
            </div>
          </div>
        </div>
        
        <div className={`flex flex-col items-center text-[10px] font-semibold whitespace-nowrap uppercase justify-center px-3 py-2 rounded-lg border ${getStatusColor(room.status)}`}>
          <div className="flex items-center gap-1">
            {room.status === 'active' ? <div className="w-2 h-2 bg-green-500 rounded-full"></div> : <Calendar className="w-3 h-3" />}
            {room.status}
          </div>
        </div>
      </div>
      
      <div className="flex w-full items-stretch gap-5 flex-wrap justify-between mt-6 pt-4 border-t">
        <div className="flex items-center gap-2 text-xs text-[rgba(126,126,126,1)] font-normal my-auto">
          {room.status === 'active' ? (
            <>
              <Clock className="w-4 h-4" />
              <span>{room.timeRemaining || 'remaining'}</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              <span>Starts in {room.startsIn}</span>
            </>
          )}
        </div>
        <button 
          onClick={handleJoinClick}
          disabled={isRoomFull && room.status === 'active'}
          className="bg-[rgba(112,45,255,1)] flex flex-col items-stretch text-sm text-white font-semibold text-center justify-center px-6 py-2 rounded-xl hover:bg-[rgba(112,45,255,0.9)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>
            {isRoomFull && room.status === 'active' ? 'Full' : 'Open Room'}
          </span>
        </button>
      </div>
    </article>
  );
};
