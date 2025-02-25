import { PrismaClient } from "@prisma/client";

// ✅ Ensure global instance exists
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// ✅ Use existing instance OR create a new one
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// ✅ Store in global scope (Only in development)
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
