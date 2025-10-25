import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchRoom } from '@/graphql/roomApi';

export const StudyRooms = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['room', id],
    queryFn: () => fetchRoom(id!),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading sessions...</div>;
  if (isError || !data) return <div>Failed to load sessions.</div>;

  const sessions = data.studySessions || [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[#202020] mb-4">Study Sessions</h2>
      {sessions.length === 0 && <div className="text-gray-500">No sessions found.</div>}
      {sessions.map((session: any) => (
        <div key={session.id} className="w-full border shadow-[0px_14px_42px_0px_rgba(8,15,52,0.06)] bg-white p-6 rounded-[20px] border-solid border-[#F0F0F0]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[#202020] text-lg font-bold leading-6 mb-2">{session.subject}</h3>
              <p className="text-[#7E7E7E] text-sm">{session.memberCount} members</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                session.isActive ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {session.isActive ? 'active' : 'scheduled'}
              </span>
              <button
                className="w-[100px] h-[37px] bg-[#702DFF] text-white rounded-xl text-sm font-bold hover:bg-[#5a24cc] transition-colors"
                onClick={() => navigate(`/session/${session.id}`)}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};