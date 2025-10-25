export const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

export async function fetchRoom(id: string) {
  const { GraphQLClient } = await import('graphql-request');
  const { ROOM_QUERY } = await import('@/graphql/roomQueries');
  const token = localStorage.getItem('token');
  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      authorization: token ? `Bearer ${token}` : '',
    },
  });
  const result: any = await client.request(ROOM_QUERY, { id });
  return result.room;
}
