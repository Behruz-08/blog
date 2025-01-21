import React from 'react';
import { Post } from '@/types';
import Image from 'next/image';

interface BlogCardProps {
  post: Post;
  onClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  return (
   
    <div className="card" onClick={onClick}>
      {post.imageUrl ? (
        // <Image  src={post.imageUrl} alt={post.title}  />
        <Image
        className="card-image"
        src={post.imageUrl} // URL of the image
        alt={post.title}
        width={150} // Specify width
        height={150} // Specify height
      />
      ) : (
        <div className="placeholder">No Image Available</div>
      )}
      <h3 className="card-title">{post.title}</h3>
      <p className="card-body">{post.body.slice(0, 100)}...</p>
    </div>
  );
};

export default BlogCard;





