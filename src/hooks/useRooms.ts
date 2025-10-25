import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;
console.log("GRAPHQL ENDPOINT:", endpoint);

const ROOMS_QUERY = gql`
  query Rooms($page: Int, $limit: Int!) {
    rooms(first: $limit, page: $page) {
      data {
        id
        name
        description
        subject
        level
        max_members
        status
        visibility
        created_at
        updated_at
        studySessions {
          id
          subject
          start_time
          end_time
          status
          members {
            id
          }
        }
      }
      paginatorInfo {
        currentPage
        lastPage
        total
      }
    }
  }
`;

interface RoomsQueryResult {
  rooms: {
    data: Array<any>;
    paginatorInfo: {
      currentPage: number;
      lastPage: number;
      total: number;
    };
  };
}

export const useRooms = (page: number, limit: number) =>
  useQuery({
    queryKey: ['rooms', page, limit],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const client = new GraphQLClient(endpoint, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          authorization: token ? `Bearer ${token}` : '',
        },
      });
      try {
        const data = await client.request<RoomsQueryResult>(ROOMS_QUERY, { page, limit });
        return data.rooms ?? {
          data: [],
          paginatorInfo: { currentPage: 1, lastPage: 1, total: 0 },
        };
      } catch (error) {
        console.error('GraphQL fetch error:', error);
        throw error;
      }
    },
  });
