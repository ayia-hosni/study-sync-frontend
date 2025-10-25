// hooks/usePostComments.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

const COMMENTS_QUERY = gql`
  query PostComments($postId: ID!, $first: Int!, $page: Int) {
    post(id: $postId) {    # If you don't have a post() field, call the relation directly on Post via a field below.
      id
      commentsPage(first: $first, page: $page, orderBy: [{ column: "created_at", order: DESC }]) {
        data {
          id
          content
          commenter_id
          created_at
          commenter { id }  # add name/avatar later if your User type exposes them
        }
        paginatorInfo {
          currentPage
          hasMorePages
        }
      }
    }
  }
`;

type Comment = {
  id: string;
  content: string;
  commenter_id: string;
  created_at: string;
  commenter?: { id: string | null } | null;
};

interface QueryRes {
  post: {
    id: string;
    commentsPage: {
      data: Comment[];
      paginatorInfo: { currentPage: number; hasMorePages: boolean };
    };
  };
}

export function usePostComments(postId: string, first = 10) {
  return useInfiniteQuery({
    queryKey: ['post-comments', postId, first],
    queryFn: async ({ pageParam = 1 }) => {
      const token = localStorage.getItem('token');
      const client = new GraphQLClient(endpoint, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      const data = await client.request<QueryRes>(COMMENTS_QUERY, {
        postId,
        first,
        page: pageParam,
      });
      return data.post.commentsPage;
    },
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last?.paginatorInfo?.hasMorePages
        ? last.paginatorInfo.currentPage + 1
        : undefined,
    select: (q) => q.pages.flatMap((p) => p.data),
    staleTime: 15_000,
    gcTime: 5 * 60_000,
  });
}
