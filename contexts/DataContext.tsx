import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GalleryPost, Comment } from '../types';
import { INITIAL_GALLERY_POSTS } from '../constants';

interface DataContextType {
  posts: GalleryPost[];
  addPost: (post: GalleryPost) => void;
  addComment: (postId: string, comment: Comment) => void;
  toggleLike: (postId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<GalleryPost[]>(() => {
    const saved = localStorage.getItem('galleryPosts');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY_POSTS;
  });

  useEffect(() => {
    localStorage.setItem('galleryPosts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: GalleryPost) => {
    setPosts(prev => [post, ...prev]);
  };

  const addComment = (postId: string, comment: Comment) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    }));
  };

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
        if (post.id === postId) {
            return { ...post, likes: post.likes + 1 }; // Simple increment for demo
        }
        return post;
    }));
  }

  return (
    <DataContext.Provider value={{ posts, addPost, addComment, toggleLike }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
