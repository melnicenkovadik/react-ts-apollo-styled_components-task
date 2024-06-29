import { gql } from '@apollo/client';

export const DELETE_POST = gql`
  mutation ($id: ID!) {
    deletePost(id: $id)
  }
`;
