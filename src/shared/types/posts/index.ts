import { Dispatch, SetStateAction } from 'react';

interface Post {
  id: string;
  title: string;
  body: string;
  liked: boolean;
}

interface IPostList {
  posts: Post[];
  search: string;
  setPosts: Dispatch<SetStateAction<Post[]>>;
}

interface IPostItem {
  post: Post;
  toggleLike: (id: string) => void;
  deletePost: (id: string) => void;
}

export type { Post, IPostItem, IPostList };
