import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchRoom } from '@/graphql/roomApi';
import axiosInstance from "@/lib/axios";
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; // ✅ import your auth context

export const StudyRooms: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth(); // ✅ get logged-in user from context

  const { data, isLoading, isError } = useQuery({
    queryKey: ['room', id],
    queryFn: () => fetchRoom(id!),
    enabled: !!id,
  });

  const handleJoinMeeting = async (sessionId: string) => {
    try {
      const userName = user?.first_name + ' ' + user?.last_name|| 'Guest';
      console.log('Joining meeting as:', userName);
      const role = 'participant';

      const response = await axiosInstance.post('/join', {
        session_id: sessionId,
        user_name: userName,
        role,
      });

      if (response.data.join_url) {
        window.location.href = response.data.join_url;
      } else {
        alert(response.data.msg || 'Unable to join meeting');
      }
    } catch (error) {
      console.error(error);
      alert('Error joining meeting');
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-40 text-gray-600">
        <Loader2 className="animate-spin mr-2" /> Loading sessions...
      </div>
    );

  if (isError || !data) return <div className="text-red-500 text-center">Failed to load sessions.</div>;

  const sessions = data.studySessions || [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#202020] mb-2">Study Sessions</h2>
      {sessions.length === 0 && <div className="text-gray-500">No sessions found.</div>}

      {sessions.map((session: any) => (
        <div
          key={session.id}
          className="w-full border bg-white p-6 rounded-2xl shadow-md flex items-center justify-between"
        >
          <div>
            <h3 className="text-[#202020] text-lg font-semibold mb-1">{session.subject}</h3>
            <p className="text-[#7E7E7E] text-sm">{session.memberCount} members</p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                session.isActive ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {session.isActive ? 'Active' : 'Scheduled'}
            </span>
            <button
              onClick={() => handleJoinMeeting(session.id)}
              className="w-[100px] h-[37px] bg-[#702DFF] text-white rounded-xl text-sm font-bold hover:bg-[#5a24cc] transition-colors"
            >
              Join
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
