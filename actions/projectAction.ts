"use server";

import { prisma } from "@/lib/prisma"; // Import Prisma instance
import { z } from "zod";
import { projectSchema } from "@/schemas/projectSchema";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createProject(values: z.infer<typeof projectSchema>) {
  try {
    const validateFields = projectSchema.safeParse(values);

    if (!validateFields.success) {
      return { error: "Invalid fields!" };
    }

    const { category, description, imageurl, title, details, Link } =
      validateFields.data;

    // Fetch the user session
    const session = await auth();

    if (!session || !session.user) {
      return { error: "User not authenticated" };
    }

    const userId = session.user.id as string;

    await prisma.project.create({
      data: {
        title: title,
        category: category,
        description: description,
        imageUrl: imageurl,
        details: details,
        authorId: userId,
        Link: Link,
      },
    });

    return { sucess: "Project created SucessFully" };
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      success: false,
      message:
        error instanceof z.ZodError
          ? (error as z.ZodError).errors
          : (error as Error).message,
    };
  }
}

export const getUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
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

export const getUserByUserName = async (userName: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { userName },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
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

export const getProjectsByUserId = async (authorId: string) => {
  try {
    const projects = await prisma.project.findMany({
      where: { authorId },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true, // Include more fields if needed,
        authorId: true,
      },
    });

    return {
      success: true,
      projects,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      success: false,
      projects: [],
    };
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        details: true,
        category: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,

            image: true,
            bio: true,
          },
        },
      },
    });

    if (!project) {
      return { success: false, project: null };
    }

    return {
      success: true,
      project: {
        ...project,
        authorId: project.author.id,
        authorName: project.author.name,

        authorImage: project.author.image || "/default-avatar.png",
      },
    };
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return { success: false, project: null };
  }
};

export const deleteProjects = async (projectId: string) => {
  const session = await auth();
  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    return { success: false, message: "Project not found" };
  }

  if (project.authorId !== session.user?.id) {
    return { success: false, message: "Not allowed" };
  }

  await prisma.project.delete({
    where: { id: projectId },
  });

  return { success: true, message: "Project deleted successfully" };
};

export const getProjects = async () => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            userName: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
                userName: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return []; // Ensure return is always an array
  }
};

export const toggleLike = async (projectId: string, userId: string) => {
  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { authorId: true },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_projectId: {
            userId,
            projectId,
          },
        },
      });
    } else {
      await prisma.$transaction([
        prisma.like.create({
          data: {
            userId,
            projectId,
          },
        }),
        ...(project?.authorId === userId
          ? [
              prisma.notification.create({
                data: {
                  type: "LIKE",
                  userId: project.authorId,
                  creatorId: userId,
                  projectId,
                },
              }),
            ]
          : []),
      ]);
    }

    revalidatePath("/feed");

    return { success: true };
  } catch (error) {
    console.error("Failed to toggle like ");
    return { success: false, error };
  }
};

export const createComment = async (
  projectId: string,
  content: string,
  userId: string
) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { authorId: true },
    });

    if (!project) throw new Error("Project not found");

    const [comment] = await prisma.$transaction(async (tx) => {
      const newComment = await tx.comment.create({
        data: {
          content,
          authorId: userId,
          projectId,
        },
      });

      if (project.authorId !== userId) {
        await tx.notification.create({
          data: {
            type: "COMMENT",
            userId: project.authorId,
            creatorId: userId,
            projectId,
            commentId: newComment.id,
          },
        });
      }

      return [newComment];
    });

    revalidatePath("/feed");

    return { success: true, comment };
  } catch (error) {
    console.error("Failed to create comment:", error);
    return { success: false, error: "Failed to create comment" };
  }
};
