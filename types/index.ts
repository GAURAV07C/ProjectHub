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
  userSkills?: UserSkill[];
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

export interface UserSkill {
  id: string;
  userId: string;
  skillId: string;
  skill: Skill;
}

export interface Skill {
  id: string;
  title: string;
  iconName: string | null;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  content: string;
  image: string | null;
  company: string | null;
  year: string | null;
  techStack: string;
  tags: string;
  liveLink: string | null;
  sourceLink: string | null;
  demoLink: string | null;
  isRecent: boolean;
  category: string | null;
  views: number;
  challenges: string;
  features: string;
  outcomes: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string | null;
    userName: string | null;
    image: string | null;
  };
  skills: ProjectSkill[];
  comments: Comment[];
  likes: Like[];
  _count: {
    likes: number;
    comments: number;
  };
}

export interface ProjectSkill {
  id: string;
  projectId: string;
  skillId: string;
  skill: Skill;
}

export interface Comment {
  id: string;
  content: string;
  name: string;
  email: string;
  parentId: string | null;
  projectId: string;
  authorId: string | null;
  createdAt: Date;
  author: {
    id: string;
    name: string | null;
    userName: string | null;
    image: string | null;
  } | null;
  replies: Comment[];
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
