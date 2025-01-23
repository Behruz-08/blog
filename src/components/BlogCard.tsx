import React from "react";
import { Post } from "@/types";
import Image from "next/image";
import { Card, CardContent, Typography } from "@mui/material";

interface BlogCardProps {
  post: Post;
  onClick: () => void;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick ,  className}) => {
  return (
    <div      className={`bg-white rounded-lg overflov-hiden ${className}`} onClick={onClick}>
      {post.imageUrl ? (
        <Card sx={{ maxWidth: 400, height: 500 }}>
          <Image
            className="card-image"
            src={post.imageUrl}
            alt={post.title}
            width={400}
            height={300}
            priority
            unoptimized
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ marginBottom: 2 }}
              component="div"
            >
              {post.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {post.body.slice(0, 100)}...
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <div className="placeholder">No Image Available</div>
      )}
    </div>
  );
};

export default BlogCard;
