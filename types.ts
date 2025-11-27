import React from 'react';

export interface NavItem {
  label: string;
  path: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TemplateItem {
  id: string;
  title: string;
  category: string;
  description: string;
  prompt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface SuccessStory {
  title: string;
  description: string;
  author: string;
  image: string;
}

export interface CommunityPost {
  id: number;
  title: string;
  category: string;
  author: string;
  likes: number;
  comments: number;
  date: string;
}

// --- New Types for Gallery & Comments ---
export interface GalleryPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorDept: string;
  date: string;
  likes: number;
  tags: string[];
  imageUrl?: string; 
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

// --- Site Configuration Types ---
export interface SiteConfig {
  mainTitle: string;
  mainSubtitle: string;
  mainDescription: string;
  noticeTitle: string;
  noticeContent: string;
  showNotice: boolean;
}

// --- Auth & Gamification Types ---
export type UserRole = 'guest' | 'pending' | 'member' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  level: number;
  xp: number;
  maxXp: number;
}

export interface AuthContextType {
  user: User | null;
  login: (name: string, email: string, department: string) => void;
  logout: () => void;
  approveUser: (userId: string) => void; 
  gainXp: (amount: number) => void;
  isAuthenticated: boolean;
  isApproved: boolean;
  isAdmin: boolean;
  pendingUsers: User[]; // For admin to see
}
