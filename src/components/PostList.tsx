
"use client";

import React, { useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/UseAppDispatch';
import { fetchPosts } from '@/features/posts/postsSlice';
import { RootState } from '../store';

const PostList = () => {
  const dispatch = useAppDispatch();
  const { posts, status } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Failed to load posts.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border rounded">
          <h3 className="text-lg font-bold">{post.title}</h3>
          <p>{post.body.slice(0, 50)}...</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
