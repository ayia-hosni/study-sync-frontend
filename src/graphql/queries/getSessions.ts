import { gql } from 'graphql-request';

export const GET_SESSIONS = gql`
  query GetSessions($first: Int = 10, $page: Int = 1) {
    sessions(first: $first, page: $page) {
      data {
        id
        subject
        emoji
        time
        status
      }
      paginatorInfo {
        currentPage
        lastPage
        total
      }
    }
  }
`;
