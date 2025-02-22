import NextAuth from "next-auth";

import authConfig from "@/lib/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

import { getUserById } from "@/data/user";

async function testprisma() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

testprisma();

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      const email = user.email?.split("@")[0];
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date(), userName: email },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.id) return false;

      if (account?.provider !== "credentials") {
        return true;
      }

      /***
       * if user use credentials to login
       * Prevent sign in without email verificaton
       */
      if (account?.provider === "credentials") {
        const existingUser = await getUserById(user.id);

        if (!existingUser?.emailVerified) return false;
      }
      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.userName && session.user) {
        session.user.userName = token.userName;
      }
      if (token.bio && session.user) {
        session.user.bio = token.bio;
      }

      if (token._count && session.user) {
        session.user._count = token._count;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      if (existingUser.userName !== null) {
        token.userName = existingUser.userName;
      }

      if (existingUser.bio !== null) {
        token.bio = existingUser.bio;
      }

      if (existingUser._count !== null) {
        token._count = existingUser._count;
      }

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
