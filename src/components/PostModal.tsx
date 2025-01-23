import React from 'react';
import Modal from '@mui/material/Modal';
import { Post } from '@/types';
import Image from 'next/image';

interface PostModalProps {
  open: boolean;
  post: Post | null;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ open, post, onClose }) => {
  if (!post) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-content">
        <h2>{post.title}</h2>
        <Image src={post.imageUrl} alt={post.title}     width={150} // Укажите ширину
    height={150}  />
        <p>{post.body}</p>
      </div>
    </Modal>
  );
};

export default PostModal;
