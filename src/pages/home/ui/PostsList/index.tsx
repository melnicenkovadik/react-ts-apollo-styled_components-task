import { FC, useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { IPostList } from '../../../../shared/types/posts';
import { DELETE_POST } from '../../../../shared/mutations/deletePost';
import { notify, notifyError } from '../../../../utils/notifications';
import PostItem from '../PostItem';

import { PostsListWrapper } from './styles';

const PostsList: FC<IPostList> = ({ posts, search, setPosts }) => {
  const [deletePost] = useMutation(DELETE_POST);
  // const [updatePostLiked] = useMutation(UPDATE_POST_LIKED);

  const deletePostHandler = useCallback(
    async (id: string) => {
      await deletePost({
        variables: {
          id: +id,
        },
      })
        .then(() => {
          setPosts(posts.filter(post => post.id !== id));
          notify(`Post with id ${id} deleted successfully!`);
        })
        .catch(e => {
          notifyError(e.message);
        });
    },
    [posts, setPosts, deletePost]
  );

  const toggleLike = useCallback(
    async (id: string) => {
      // await updatePostLiked({
      //     variables: {
      //         id: +id,
      //         input: {
      //             liked: !posts.find(post => post.id === id)?.liked
      //         }
      //     }
      // }).then(() => {
      //
      // }).catch((e) => {
      //     notifyError(e.message);
      // });
      setPosts(
        posts.map(post =>
          post.id === id ? { ...post, liked: !post.liked } : post
        )
      );
      notify(`Post with id ${id} liked successfully!`);
    },
    [posts, setPosts]
  );

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PostsListWrapper>
      {filteredPosts.map(post => (
        <PostItem
          key={post.id}
          post={post}
          toggleLike={toggleLike}
          deletePost={deletePostHandler}
        />
      ))}
    </PostsListWrapper>
  );
};

export default PostsList;
