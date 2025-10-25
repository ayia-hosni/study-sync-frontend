import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import { CreateRoomModal } from '../CreateRoomModal';

interface Room {
  id: string;
  name: string;
  initial: string;
  status: 'online' | 'offline';
  memberType: 'active' | 'member';
}

interface DiscoverRoom {
  id: string;
  emoji: string;
  name: string;
  description: string;
  memberCount: number;
}

interface ActivityItem {
  id: string;
  userInitial: string;
  userName: string;
  action: string;
  roomName: string;
  timeAgo: string;
  bgColor: string;
}

export const StudyRoomsSection: React.FC = () => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  const userRooms: Room[] = [
    { id: '1', name: 'Daily Writing Club', initial: 'D', status: 'online', memberType: 'active' },
    { id: '2', name: 'Code Every Day', initial: 'C', status: 'online', memberType: 'active' },
    { id: '3', name: 'Morning Routine Masters', initial: 'M', status: 'online', memberType: 'active' }
  ];

  const discoverRooms: DiscoverRoom[] = [
    { id: '1', emoji: '📚', name: 'Book Club Readers', description: 'Read 30 minutes daily', memberCount: 127 },
    { id: '2', emoji: '💪', name: 'Fitness Warriors', description: 'Daily workout routine', memberCount: 89 },
    { id: '3', emoji: '🗣️', name: 'Language Learners', description: 'Practice new language daily', memberCount: 156 }
  ];

  const activities: ActivityItem[] = [
    { id: '1', userInitial: 'M', userName: 'Mike Rodriguez', action: 'completed meditation', roomName: 'Morning Routine Masters', timeAgo: '2h ago', bgColor: '#962DFF' },
    { id: '2', userInitial: 'E', userName: 'Emma Thompson', action: 'shared progress', roomName: 'Daily Writing Club', timeAgo: '3h ago', bgColor: '#C893FD' }
  ];

  return (
    <aside className="w-[387px] shrink-0">
      <h2 className="text-[#202020] dark:text-white text-lg font-bold leading-7 mb-6">
        Study Rooms
      </h2>
      
      {/* Your Rooms */}
      <section className="w-full border shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] bg-white dark:bg-[#232329] mb-6 p-6 rounded-[20px] border-solid border-[#F0F0F0] dark:border-[#232329]">
        <header className="flex items-center justify-between mb-6">
          <h3 className="text-[#202020] dark:text-white text-base font-bold leading-6">
            Your Rooms
          </h3>
          <button
            className="flex items-center gap-2 h-8 cursor-pointer bg-[#702DFF] px-4 py-0 rounded-lg hover:bg-[#5a24cc] transition-colors"
            onClick={() => setShowCreateRoom(true)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2V14M2 8H14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-white text-xs font-bold leading-4">
              Create Room
            </span>
          </button>
        </header>
        
        <div className="space-y-4">
          {userRooms.map((room) => (
            <div key={room.id} className="w-full border bg-[#F8F9FA] dark:bg-neutral-800 p-4 rounded-xl border-solid border-[#E9ECEF] dark:border-neutral-700">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[#702DFF] rounded-[50%]">
                  <span className="text-white text-sm font-bold leading-5">
                    {room.initial}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-[#202020] dark:text-white text-sm font-bold leading-5">
                    {room.name}
                  </h4>
                  <p className="text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4">
                    Active member
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-[50%]" />
                  <span className="text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4">
                    Online
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showCreateRoom && (
          <>
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40" onClick={() => setShowCreateRoom(false)} />
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              <div className="pointer-events-auto">
                <CreateRoomModal onClose={() => setShowCreateRoom(false)} />
              </div>
            </div>
          </>
        )}
      </section>
      
      {/* Discover Rooms */}
      <section className="w-full border shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] bg-white dark:bg-[#232329] mb-6 p-6 rounded-[20px] border-solid border-[#F0F0F0] dark:border-[#232329]">
        <h3 className="text-[#202020] dark:text-white text-base font-bold leading-6 mb-6">
          Discover Rooms
        </h3>
        
        <div className="space-y-4">
          {discoverRooms.map((room) => (
            <div key={room.id} className="w-full border p-4 rounded-xl border-solid border-[#E9ECEF] dark:border-neutral-700 bg-[#F8F9FA] dark:bg-neutral-800">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-2xl font-normal leading-8">
                  {room.emoji}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[#202020] dark:text-white text-sm font-bold leading-5">
                      {room.name}
                    </h4>
                    <span className="text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4">
                      {room.memberCount} members
                    </span>
                  </div>
                  <p className="text-[#7E7E7E] dark:text-neutral-300 text-xs font-normal leading-4">
                    {room.description}
                  </p>
                </div>
              </div>
              <button className="w-full h-[34px] border flex items-center justify-center bg-[#F8F9FA] dark:bg-neutral-900 rounded-lg border-solid border-[#E9ECEF] dark:border-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors">
                <span className="text-[#702DFF] dark:text-[#A259FF] text-xs font-bold leading-4">
                  Join Room
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>
      
      {/* Room Activity */}
      <section className="w-full border shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] bg-white dark:bg-[#232329] p-6 rounded-[20px] border-solid border-[#F0F0F0] dark:border-[#232329]">
        <h3 className="text-[#202020] dark:text-white text-base font-bold leading-6 mb-6">
          Room Activity
        </h3>
        
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="w-full bg-[#F8F9FA] dark:bg-neutral-800 p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 flex items-center justify-center rounded-[50%]"
                  style={{ backgroundColor: activity.bgColor }}
                >
                  <span className="text-white text-xs font-bold leading-4">
                    {activity.userInitial}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[#202020] dark:text-white text-xs font-bold leading-4">
                      {activity.userName}
                    </span>
                    <span className="text-[#202020] dark:text-white text-xs font-normal leading-4">
                      {activity.action}
                    </span>
                  </div>
                  <p className="text-[#7E7E7E] dark:text-neutral-300 text-[10px] font-normal leading-[15px]">
                    {activity.roomName} • {activity.timeAgo}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
};
