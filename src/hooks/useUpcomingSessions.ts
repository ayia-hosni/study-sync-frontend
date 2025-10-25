// hooks/useUpcomingSessions.ts
import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphql-client';
import { GET_UPCOMING_SESSIONS } from '@/graphql/queries/getUpcomingSessions';

export const useUpcomingSessions = () => {
  return useQuery({
    queryKey: ['upcomingSessions'],
    queryFn: async () => {
      const response = await graphqlClient.request(GET_UPCOMING_SESSIONS);
          console.log('Fetching upcoming sessions...');

      return response.upcomingSessions.data; // ✅ important
    }
  });
};
