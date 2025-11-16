import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
});

export interface JoinResponse {
  join_url: string;
  status?: boolean;
  message?: string;
}

export async function joinMeeting(sessionId?: string): Promise<JoinResponse> {
  const endpoint = sessionId ? `/join/${sessionId}` : '/join';
  const { data } = await api.get<JoinResponse>(endpoint);
  return data;
}
