import { gql } from "graphql-request";

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      token_type
      user {
        id
        first_name
        last_name
        email
      }
    }
  }
`;