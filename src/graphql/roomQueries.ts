import { gql } from 'graphql-request';

export const ROOM_QUERY = gql`
  query Room($id: ID!) {
    room(id: $id) {
      id
      name
      description
      subject
      level
      max_members
      visibility
      thumbnail_url
      status
      created_at
      updated_at
      studySessions {
      id
      subject
      status
      memberCount
      isActive
    }
    }
  }
`;
