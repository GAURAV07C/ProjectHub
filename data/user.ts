"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getRandomUsers = async (id: string) => {
  try {
    const randomusers = await prisma.user.findMany({
      where: {
        AND: [
          { NOT: { id: id } },
          { NOT: { followers: { some: { followerId: id } } } },
        ],
      },
      select: {
        id: true,
        name: true,
        userName: true,
        image: true,
        _count: {
          select: {
            followers: true,
          },
        },
      },
      take: 3,
    });

    return randomusers;
  } catch {
    return [];
  }
};

export const toggleFollowButton = async (
  targetUserId: string,
  userId: string
) => {
  console.log("target " + targetUserId, "usr id " + userId);
  try {
    if (userId === targetUserId) throw new Error("You can't follow yourself");

    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: targetUserId,
        },
      },
    });

    if (existingFollow) {
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: targetUserId,
          },
        },
      });
    } else {
      await prisma.$transaction([
        prisma.follows.create({
          data: {
            followerId: userId,
            followingId: targetUserId,
          },
        }),

        prisma.notification.create({
          data: {
            type: "FOLLOW",
            userId: targetUserId, // user being followed
            creatorId: userId, // user following
          },
        }),
      ]);
    }

    revalidatePath("/feed")

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred" };

  }
};
