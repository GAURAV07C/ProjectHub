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
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date(), userName: user.email },
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

      // if (token.userName && session.user) {
      //   session.user.userName = token.userName;
      // }
      return session;
    },

    async jwt({ token }) {
      // if (!token.sub) return token;

      // const existingUser = await getUserById(token.sub);

      // if (!existingUser) return token;

      // token.userName = existingUser.userName;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
