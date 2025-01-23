

"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchPosts, setCurrentPage } from '@/features/posts/postsSlice';
import BlogCard from '@/components/BlogCard';
import PostModal from '@/components/PostModal';
import PaginationControls from '@/components/PaginationControls';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import { Post } from '@/types';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, currentPage, pageSize, status, error } = useSelector(
    (state: RootState) => state.posts
  );

  const [selectedPost, setSelectedPost] = useState<Post|null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedCategory || post.category === selectedCategory)
    );
  }, [posts, searchTerm, selectedCategory]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage, pageSize]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Failed to load posts: {error}</p>;

  return (
    <main>
      <header>
        <h1>Blog List</h1>
      </header>

      <section>
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <FilterPanel
          categories={['Tech', 'Lifestyle', 'Travel']}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </section>

      <section className="posts-container">
        {paginatedPosts.map((post) => (
          <BlogCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
        ))}
      </section>

      <footer>
        <PaginationControls
          currentPage={currentPage}
          totalPages={Math.ceil(filteredPosts.length / pageSize)}
          onPageChange={(page) => dispatch(setCurrentPage(page))}
        />
      </footer>

      {selectedPost && (
        <PostModal open={!!selectedPost} post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </main>
  );
};

export default HomePage;
