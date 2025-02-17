"use server";

import { prisma } from "@/lib/prisma"; // Import Prisma instance
import { z } from "zod";
import { projectSchema } from "@/schemas/projectSchema";
import { auth } from "@/lib/auth";

export async function createProject(values: z.infer<typeof projectSchema>) {
  try {
    const validateFields = projectSchema.safeParse(values);

    if (!validateFields.success) {
      return { error: "Invalid fields!" };
    }

    const { category, description, imageurl, title, details } =
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
        userId: userId,
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
      select: {
        id: true,
        name: true,
        email: true,
        image: true, 
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
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        userName:true,
        
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



export const getProjectsByUserId = async (userId: string) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true, // Include more fields if needed,
        userId: true,
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
      where: { id: Number(projectId) },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        details: true,
        category: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,

            image: true,
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
        authorId: project.user.id,
        authorName: project.user.name,

        authorImage: project.user.image || "/default-avatar.png",
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
    where: { id: Number(projectId) },
  });

  if (!project) {
    return { success: false, message: "Project not found" };
  }

  if (project.userId !== session.user?.id) {
    return { success: false, message: "Not allowed" };
  }

  await prisma.project.delete({
    where: { id: Number(projectId) },
  });

  return { success: true, message: "Project deleted successfully" };
};
