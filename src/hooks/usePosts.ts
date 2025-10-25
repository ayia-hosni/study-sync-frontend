import { useInfiniteQuery } from '@tanstack/react-query';
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

const POSTS_QUERY = gql`
  query Posts(
    $page: Int
    $limit: Int!
    $authorId: ID
    $roomId: ID
    $visibility: Visibility
    $orderBy: [OrderByClause!]
  ) {
    posts(
      first: $limit
      page: $page
      author_id: $authorId
      room_id: $roomId
      visibility: $visibility
      orderBy: $orderBy
    ) {
      data {
        id
        content
        visibility
        type
        author_id
        room_id
        created_at
        media_urls
        author { id }   # keep lean for perf
        room { id }
      }
      paginatorInfo {
        currentPage
        lastPage
        perPage
        total
        hasMorePages
      }
    }
  }
`;

export type VisibilityEnum = 'public' | 'private' | 'room_only' | 'friends' | 'custom';

export interface PostGql {
  id: string;
  content: string;
  visibility: VisibilityEnum | string;
  type: string;
  author_id: string;
  room_id: string | null;
  created_at: string;
  media_urls?: string[] | null;
  author?: { id: string | null } | null;
  room?: { id: string | null } | null;
}

interface PostsQueryResult {
  posts: {
    data: PostGql[];
    paginatorInfo: {
      currentPage: number;
      lastPage: number;
      perPage: number;
      total: number;
      hasMorePages: boolean;
    };
  };
}

interface UseInfinitePostsArgs {
  limit?: number;
  authorId?: string | number;
  roomId?: string | number;
  visibility?: VisibilityEnum;
  orderBy?: Array<{ column: string; order?: 'ASC' | 'DESC' }>;
}

export const useInfinitePosts = ({
  limit = 10,
  authorId,
  roomId,
  visibility,
  orderBy = [{ column: 'created_at', order: 'DESC' }],
}: UseInfinitePostsArgs = {}) =>
  useInfiniteQuery({
    queryKey: ['posts-infinite', limit, authorId, roomId, visibility, orderBy],
    queryFn: async ({ pageParam = 1 }) => {
      const token = localStorage.getItem('token');
      const client = new GraphQLClient(endpoint, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });

      // Omit null filters – only send when defined
      const vars: Record<string, any> = { page: pageParam, limit, orderBy };
      if (authorId !== undefined) vars.authorId = authorId;
      if (roomId !== undefined) vars.roomId = roomId;
      if (visibility !== undefined) vars.visibility = visibility;

      const res = await client.request<PostsQueryResult>(POSTS_QUERY, vars);
      return res.posts;
    },

    initialPageParam: 1,
    getNextPageParam: (last) =>
      last?.paginatorInfo?.hasMorePages
        ? last.paginatorInfo.currentPage + 1
        : undefined,

    // Keep already-fetched items visible while fetching the next page
    placeholderData: (prev) => prev,

    // Reasonable defaults for UX & perf
    staleTime: 15_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,

    // Flatten pages for easy consumption
    select: (data) => {
      const flat = data.pages.flatMap((p) => p.data);
      const pageInfo = data.pages.at(-1)?.paginatorInfo;
      return { flat, pageInfo };
    },
  });
