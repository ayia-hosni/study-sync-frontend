import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphql-client';
import { GET_SESSIONS } from '@/graphql/queries/getSessions';

export const useSessions = () => {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const data = await graphqlClient.request(GET_SESSIONS, {
        first: 10,
        page: 1
      });
      return data.sessions;
    }
  });
};
