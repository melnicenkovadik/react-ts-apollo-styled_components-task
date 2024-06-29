import { describe, it, expect, vi } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DELETE_POST } from '../../../../shared/mutations/deletePost';
import { Post } from 'shared/types/posts/index';
import PostsList from '.';

describe('PostsList', () => {
  const mockPosts: Post[] = [
    {
      id: '1',
      title: 'First post',
      body: 'First post body',
      liked: false,
    },
  ];
  const mocks = [
    {
      request: {
        query: DELETE_POST,
        variables: { id: 1 }, // ID как число
      },
      result: {
        data: { deletePost: { id: '1' } }, // ID как строка
      },
    },
    {
      request: {
        query: DELETE_POST,
        variables: { id: 2 }, // ID как число
      },
      result: {
        data: { deletePost: { id: '2' } }, // ID как строка
      },
    },
  ];

  it('deletes a specific post when its delete button is triggered', async () => {
    const setPosts = vi.fn();
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostsList posts={mockPosts} search="" setPosts={setPosts} />
      </MockedProvider>
    );

    // Получаем кнопку удаления для поста с ID '1'
    const deleteButton = getByTestId('delete-button-1');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(setPosts).toHaveBeenCalled();
    });
  });

  it('toggles like status when like is triggered', async () => {
    const setPosts = vi.fn();
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostsList posts={mockPosts} search="" setPosts={setPosts} />
      </MockedProvider>
    );

    // Получаем кнопку лайка через data-testid
    const likeButton = getByTestId('like-button-1');
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(setPosts).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ id: '1', liked: true }),
        ])
      );
    });
  });
});
