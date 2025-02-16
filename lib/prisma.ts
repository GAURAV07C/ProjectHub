import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  globalThis.prisma ||
  new PrismaClient({
   // log: ["query", "info", "warn", "error"], // ✅ Enable logging for debugging
  });

if (process.env.NODE_ENV !==   "production") globalThis.prisma = prisma;

export { prisma };
