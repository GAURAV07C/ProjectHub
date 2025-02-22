import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  userName: string;
  bio: string;
  _count: {
    following: number;
    followers: number;
  };
  location: string;
  website: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    userName?: string;
    bio?: string;
    _count: {
      following: number;
      followers: number;
    };
    location: string;
    website: string;
  }
}
