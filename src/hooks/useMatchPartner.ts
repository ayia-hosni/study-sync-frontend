import { gql, GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

const MATCH_MUTATION = gql`
  mutation RetryMatch($input: RetryMatchInput!) {
    retryMatch(input: $input) {
      matched
      session_id
      message
      matched_user {
        id
        first_name
        last_name
        avatar_url
      }
    }
  }
`;

interface RetryMatchInput {
  subject: string;
  time_slot: string;
  level: string;
  study_mode: string;
  group_size: number;
  communication: string;
  study_style: string;
  preferred_language: string;
  timezone: string;
  desired_time: string;
  time_flex_minutes: number;
  excluded_user_ids?: number[];
  priority_weights: {
    level: number;
    communication: number;
    study_mode: number;
    timezone: number;
  };
}

interface RetryMatchResponse {
  retryMatch: {
    matched: boolean;
    session_id: number;
    message: string;
    matched_user: null | {
      id: number;
      first_name: string;
      last_name: string;
      avatar_url: string;
    };
  };
}

export const useMatchPartner = () => {
  const retryMatch = async (input: RetryMatchInput): Promise<RetryMatchResponse> => {
    if (!input.subject?.trim()) {
      throw new Error('Subject is required.');
    }

    // 🔐 Add token handling
    const token = localStorage.getItem('token'); 

    if (!token) {
      throw new Error('User is not authenticated.');
    }

    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await graphQLClient.request<RetryMatchResponse>(MATCH_MUTATION, { input });
  };

  return { retryMatch };
};
