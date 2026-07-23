export interface User {
  id: string;
  name: string | null;
  email: string | null;
  userName: string | null;
  image: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: Date;
  emailVerified: Date | null;
  followers: Follower[];
  following: Following[];
  _count: {
    followers: number;
    following: number;
    projects: number;
  };
}

export interface Follower {
  followerId: string;
  createdAt: Date;
}

export interface Following {
  followingId: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  details: string | null;
  authorId: string;
  Link: string | null;
  author: {
    id: string;
    name: string | null;
    userName: string | null;
    image: string | null;
  };
  comments: Comment[];
  likes: Like[];
  createdAt: Date;
  updatedAt: Date;
  _count: {
    likes: number;
    comments: number;
  };
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  projectId: string;
  createdAt: Date;
  author: {
    id: string;
    name: string | null;
    userName: string | null;
    image: string | null;
  };
}

export interface Like {
  userId: string;
  projectId: string;
}

export interface Notification {
  id: string;
  userId: string;
  creatorId: string;
  type: string;
  read: boolean;
  projectId: string | null;
  commentId: string | null;
  createdAt: Date;
  creator: {
    id: string;
    name: string | null;
    userName: string | null;
    image: string | null;
  };
  poroject: {
    title: string;
    id: string;
    imageUrl: string | null;
    Link: string | null;
    description: string;
  } | null;
  comment: {
    id: string;
    content: string;
    createdAt: Date;
  } | null;
}
