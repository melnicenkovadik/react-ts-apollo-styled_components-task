import { gql } from '@apollo/client';

export const UPDATE_POST_TITLE = gql`
  mutation ($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_POST_BODY = gql`
  mutation ($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      body
    }
  }
`;

// likes are not implemented on the backend yet
export const UPDATE_POST_LIKED = gql`
  mutation ($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      liked
    }
  }
`;
