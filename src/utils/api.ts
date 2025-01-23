import { Post } from "@/types";

export const fetchPostsWithImages = async (): Promise<Post[]> => {
  try {
    const postsResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    if (!postsResponse.ok) {
      throw new Error(`Failed to fetch posts: ${postsResponse.statusText}`);
    }

    const photosResponse = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=100"
    );
    if (!photosResponse.ok) {
      throw new Error(`Failed to fetch photos: ${photosResponse.statusText}`);
    }

    const posts = await postsResponse.json();
    const photos = await photosResponse.json();

    return posts.map((post: Post, index: number) => ({
      id: post.id,
      title: post.title,
      body: post.body,
      imageUrl: photos[index]?.download_url || "",
      tags: ["Tech", "Lifestyle", "Travel"][index % 3],
      category: ["Tech", "Lifestyle", "Travel"][index % 3],
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
