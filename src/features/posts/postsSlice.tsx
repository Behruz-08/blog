import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostsState } from "@/types";
import { fetchPostsWithImages } from "@/utils/api";

const initialState: PostsState = {
  posts: [],
  filteredPosts: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  selectedTags: [],
  searchQuery: "",
  status: "idle",
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const posts = await fetchPostsWithImages();
  return posts;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    toggleTag(state, action: PayloadAction<string>) {
      const tag = action.payload;
      state.selectedTags = state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag];
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded";
        state.posts = action.payload;
        state.filteredPosts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});

export const { setSearchQuery, toggleTag, setCurrentPage } = postsSlice.actions;
export default postsSlice.reducer;
