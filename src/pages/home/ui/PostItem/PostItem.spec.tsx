import { describe, it, expect, vi } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';

import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  UPDATE_POST_BODY,
  UPDATE_POST_TITLE,
} from '../../../../shared/mutations/updatePost';
import PostItem from '.';

// Моки для Apollo Client
const mocks = [
  {
    request: {
      query: UPDATE_POST_TITLE,
      variables: { id: 1, input: { title: 'Updated Title' } },
    },
    result: {
      data: {
        updatePost: {
          id: '1',
          title: 'Updated Title',
          body: 'This is a test post body',
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_POST_BODY,
      variables: { id: 1, input: { body: 'Updated Body' } },
    },
    result: {
      data: {
        updatePost: {
          id: '1',
          title: 'Test Post',
          body: 'Updated Body',
        },
      },
    },
  },
];

describe('PostItem', () => {
  it('should render post and allow liking, updating and deleting', async () => {
    const post = {
      id: '1',
      title: 'Test Post',
      body: 'This is a test post body',
      liked: false,
    };

    const toggleLike = vi.fn();
    const deletePost = vi.fn();

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostItem post={post} toggleLike={toggleLike} deletePost={deletePost} />
      </MockedProvider>
    );

    expect(getByTestId('post-title')).toHaveValue('Test Post');
    expect(getByTestId('post-description')).toHaveValue(
      'This is a test post body'
    );

    fireEvent.click(getByTestId('like-button-1'));
    await waitFor(() => {
      expect(toggleLike).toHaveBeenCalledWith('1');
    });

    const titleInput = getByTestId('post-title') as HTMLTextAreaElement;
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.blur(titleInput);

    await waitFor(() => {
      expect(getByTestId('post-title')).toHaveValue('Updated Title');
    });

    const descriptionInput = getByTestId(
      'post-description'
    ) as HTMLTextAreaElement;
    fireEvent.change(descriptionInput, { target: { value: 'Updated Body' } });
    fireEvent.blur(descriptionInput);

    await waitFor(() => {
      expect(getByTestId('post-description')).toHaveValue('Updated Body');
    });

    fireEvent.click(getByTestId('delete-button-1'));
    await waitFor(() => {
      expect(deletePost).toHaveBeenCalledWith('1');
    });
  });
});
