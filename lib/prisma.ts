import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma =
  globalThis.prisma ||
  new PrismaClient({
   // log: ["query", "info", "warn", "error"], // ✅ Enable logging for debugging
  });

if (process.env.NODE_ENV !==   "production") globalThis.prisma = prisma;

export { prisma };
