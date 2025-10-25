import { GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

export const graphqlClient = (token?: string) =>
  new GraphQLClient(endpoint, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

export const authorizedRequest = async (query: any, variables?: any) => {
  const token = localStorage.getItem('token');
  const client = graphqlClient(token || undefined);
  return client.request(query, variables);
};

export const publicRequest = async (query: any, variables?: any) => {
  const client = graphqlClient(); // no token
  return client.request(query, variables);
};
