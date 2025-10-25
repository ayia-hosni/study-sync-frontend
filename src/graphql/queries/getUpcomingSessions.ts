// graphql/queries/getUpcomingSessions.ts
import { gql } from 'graphql-request';

export const GET_UPCOMING_SESSIONS = gql`
  query GetUpcomingSessions {
    upcomingSessions(first: 3) {
      data {
        id
        emoji
        subject
        time
        status
      }
    }
  }
`;
