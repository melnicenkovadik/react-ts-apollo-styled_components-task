import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_POSTS } from '../../shared/queries/getPosts.ts';
import type { Post } from '../../shared/types/posts';
import Loader from '../../shared/ui/Loader';
import PostsList from './ui/PostsList';

import { Container, Title, SearchInput } from './styles';

const Home: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS, {
    fetchPolicy: 'cache-and-network',
  });
  const [postsLoading, setPostsLoading] = useState<boolean>(loading);
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (data) {
      setPostsLoading(false);
      setPosts(
        data.posts.data.map((post: Post) => ({ ...post, liked: false }))
      );
    }
  }, [data]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Title>Posts</Title>
      <SearchInput
        disabled={loading}
        type="text"
        placeholder="Search posts"
        value={search}
        onChange={e => {
          setPostsLoading(true);
          setSearch(e.target.value);
          setTimeout(() => {
            setPostsLoading(false);
          }, 1000);
        }}
      />
      {postsLoading ? (
        <Loader />
      ) : (
        <PostsList posts={posts} search={search} setPosts={setPosts} />
      )}
    </Container>
  );
};

export default Home;
