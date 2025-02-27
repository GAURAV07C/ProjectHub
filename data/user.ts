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

export const getUserByUserName = async (userName: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { userName },
      select: {
        id: true,
        bio: true,
        name: true,
        image: true,
        userName: true,
        location: true,
        website: true,
        email: true,
        createdAt: true,
        followers: true,
        following: true,
        _count: {
          select: {
            followers: true,
            following: true,
            projects: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        bio: true,
        name: true,
        image: true,
        userName: true,
        location: true,
        website: true,
        email: true,
        emailVerified:true,
        createdAt: true,
        followers: true,
        following: true,
        _count: {
          select: {
            followers: true,
            following: true,
            projects: true,
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

    revalidatePath("/feed");

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred" };
  }
};

export async function updateProfile(formData: FormData, userId: string) {
  try {
    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const location = formData.get("location") as string;
    const website = formData.get("website") as string;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        bio,
        location,
        website,
      },
    });

    revalidatePath("/");
    return { success: true, user };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function isFollowing(targetUserId: string, userId: string) {
  try {
    const follow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: targetUserId,
        },
      },
    });

    return !!follow;
  } catch (error) {
    console.error("Error checking follow status:", error);
    return false;
  }
}

export async function isFollowed(targetUserId: string, userId: string) {
  try {
    const follow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: targetUserId,
          followingId: userId,
        },
      },
    });

    return !!follow;
  } catch (error) {
    console.error("Error checking follow status:", error);
    return false;
  }
}




