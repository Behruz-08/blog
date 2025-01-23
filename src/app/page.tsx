"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchPosts, setCurrentPage } from "@/features/posts/postsSlice";
import BlogCard from "@/components/BlogCard";
import PostModal from "@/components/PostModal";
import PaginationControls from "@/components/PaginationControls";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import { Post } from "@/types";
import Loading from "@/components/loading";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, currentPage, pageSize, status, error } = useSelector(
    (state: RootState) => state.posts
  );

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  if (status === "loading")
    return (
      <div className="text-center text-lg font-semibold text-red-500 mt-10">
        {" "}
        <Loading />
      </div>
    );
  if (status === "failed")
    return (
      <p className="text-center text-lg font-semibold text-red-500 mt-10">
        Failed to load posts: {error}
      </p>
    );

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <header className="mb-6 bg-sky-500 h-20 flex items-center justify-center">
        <h1 className="text-3xl font-bold inline-flex items-center  text-neutral-100 ">
          Blog List
        </h1>
      </header>

      <section className="mb-6 flex flex-col gap-4 sm:flex-row justify-between items-center">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <FilterPanel
          categories={["Tech", "Lifestyle", "Travel"]}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </section>

      <section className="posts-container  grid w-full grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {paginatedPosts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            onClick={() => setSelectedPost(post)}
            className="sm:mr-0 xs:mr-0 md:mr-4"
          />
        ))}
      </section>

      <footer className="mt-8 bg-sky-50 ">
        <PaginationControls
          currentPage={currentPage}
          totalPages={Math.ceil(filteredPosts.length / pageSize)}
          onPageChange={(page) => dispatch(setCurrentPage(page))}
        />
      </footer>

      {selectedPost && (
        <PostModal
          open={!!selectedPost}
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </main>
  );
};

export default HomePage;
