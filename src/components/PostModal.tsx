import React from "react";
import Modal from "@mui/material/Modal";
import { Post } from "@/types";
import Image from "next/image";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface PostModalProps {
  open: boolean;
  post: Post | null;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ open, post, onClose }) => {
  if (!post) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <Card sx={{ maxWidth: 350, height: 450 }}>
          <Image
            className="card-image"
            src={post.imageUrl}
            alt={post.title}
            width={350}
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
            <Typography>{post.body}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default PostModal;
