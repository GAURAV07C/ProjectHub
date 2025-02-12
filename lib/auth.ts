import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./db/db";

const adapter = PrismaAdapter(db);

async function testDB() {
  try {
    await db.$connect();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

testDB();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github,
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error("Missing email or password");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email as string,
            password: credentials.password as string, // Direct password match (not recommended for production)
          },
        });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        return user; // NextAuth handles JWT automatically
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user = {
          ...session.user,
          id: token.id as string,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
