import React from 'react';

export const Members = () => {
  const members = [
    { id: 1, name: 'Sarah Chen', role: 'Study Group Leader', avatar: 'S', status: 'online' },
    { id: 2, name: 'Mike Johnson', role: 'Member', avatar: 'M', status: 'online' },
    { id: 3, name: 'Emma Williams', role: 'Member', avatar: 'E', status: 'offline' },
    { id: 4, name: 'David Brown', role: 'Member', avatar: 'D', status: 'away' },
    { id: 5, name: 'Lisa Garcia', role: 'Moderator', avatar: 'L', status: 'online' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[#202020] mb-4">Group Members</h2>
      {members.map((member) => (
        <div key={member.id} className="w-full border shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] bg-white p-6 rounded-[20px] border-solid border-[#F0F0F0]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-[#702DFF] rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">{member.avatar}</span>
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></div>
              </div>
              <div>
                <h3 className="text-[#202020] text-sm font-bold leading-6">{member.name}</h3>
                <p className="text-[#7E7E7E] text-xs">{member.role}</p>
              </div>
            </div>
            <button className="w-[100px] h-[37px] bg-[#702DFF] text-white rounded-xl text-sm font-bold hover:bg-[#5a24cc] transition-colors">
              Message
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};