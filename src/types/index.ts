export interface Post {
  category?: string;
  id: number;
  title: string;
  body: string;
  imageUrl: string;
  tags: string[];
}

export interface PostsState {
  posts: Post[];
  filteredPosts: Post[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  selectedTags: string[];
  searchQuery: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}
