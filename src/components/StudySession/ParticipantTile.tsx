import React from 'react';

interface ParticipantTileProps {
  name: string;
  initial: string;
  backgroundColor: string;
  isOnline: boolean;
  isAway?: boolean;
  cameraOff?: boolean;
  isCurrentUser?: boolean;
}

export const ParticipantTile: React.FC<ParticipantTileProps> = ({
  name,
  initial,
  backgroundColor,
  isOnline,
  isAway = false,
  cameraOff = false,
  isCurrentUser = false
}) => {
  return (
    <article className="w-[402px] h-[226px] border shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] relative overflow-hidden bg-neutral-100 rounded-[20px] border-solid border-[#F0F0F0]">
      {cameraOff ? (
        <div className="w-[400px] h-56 absolute flex flex-col items-center justify-center gap-3 bg-neutral-100 left-px top-px">
          <div className="w-[60px] h-[60px] flex items-center justify-center bg-[#C893FD] rounded-[50%]">
            <span className="text-white text-2xl font-bold leading-9">
              {initial}
            </span>
          </div>
          <span className="text-[#7E7E7E] text-sm font-normal leading-[21px]">
            Camera off
          </span>
        </div>
      ) : (
        <div className={`w-[400px] h-56 absolute flex items-center justify-center left-px top-px`} style={{ backgroundColor }}>
          <span className="text-white text-5xl font-bold leading-[72px]">
            {initial}
          </span>
        </div>
      )}
      
      {isOnline && !isAway && (
        <div 
          className="w-2 h-2 absolute bg-[#28A745] rounded-[50%] left-4 top-4"
          aria-label="Online status indicator"
        />
      )}
      
      {isAway && (
        <div className="w-[45px] h-[23px] absolute flex items-center justify-center bg-[rgba(112,45,255,0.10)] rounded-lg right-4 top-4">
          <span className="text-[#702DFF] text-[10px] font-bold leading-[15px] uppercase">
            AWAY
          </span>
        </div>
      )}
      
      <div className={`absolute flex items-center justify-center bg-[rgba(0,0,0,0.70)] rounded-lg left-4 bottom-4 px-3 h-[26px]`}>
        <span className="text-white text-xs font-bold leading-[18px]">
          {isCurrentUser ? 'You' : name}
        </span>
      </div>
    </article>
  );
};
