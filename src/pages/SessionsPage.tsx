import { SessionsList } from '@/components/SessionsList';

export default function SessionsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Study Sessions</h1>
      <SessionsList />
    </div>
  );
}
