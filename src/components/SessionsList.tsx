// src/components/SessionsList.tsx
import { useSessions } from '@/hooks/useSessions';

export function SessionsList() {
  const { data, isLoading, isError } = useSessions();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading sessions</div>;

  return (
    <div className="grid gap-4">
      {data.data.map((session) => (
        <div key={session.id} className="p-4 border rounded-xl shadow">
          <div className="text-2xl">{session.emoji}</div>
          <div className="font-semibold">{session.subject}</div>
          <div className="text-gray-600 text-sm">{new Date(session.time).toLocaleString()}</div>
          <div className="text-xs uppercase tracking-wide text-blue-500">{session.status}</div>
        </div>
      ))}
    </div>
  );
}
