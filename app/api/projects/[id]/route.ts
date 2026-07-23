import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { projectSchema } from "@/schemas/projectSchema";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const project = await prisma.project.findFirst({
      where: {
        OR: [
          { id },
          { slug: id },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        excerpt: true,
        content: true,
        image: true,
        company: true,
        year: true,
        techStack: true,
        tags: true,
        liveLink: true,
        sourceLink: true,
        demoLink: true,
        isRecent: true,
        category: true,
        views: true,
        challenges: true,
        features: true,
        outcomes: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            userName: true,
            bio: true,
          },
        },
        skills: {
          include: {
            skill: true,
          },
        },
        comments: {
          where: {
            parentId: null,
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
            replies: {
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                    userName: true,
                  },
                },
                replies: {
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
                },
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
        likes: { select: { userId: true } },
        _count: { select: { comments: true, likes: true } },
      },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, project: null },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project: {
        ...project,
        authorId: project.author.id,
        authorName: project.author.name,
        authorImage: project.author.image || `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(project.author.name || "")}`,
      },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { success: false, project: null },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedFields = projectSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Invalid fields!", errors: validatedFields.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    if (project.authorId !== session.user.id) {
      return NextResponse.json(
        { success: false, message: "Not allowed" },
        { status: 403 }
      );
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: validatedFields.data,
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
    });

    if (validatedFields.data.techStack) {
      try {
        const techStackArray = JSON.parse(validatedFields.data.techStack);
        
        await prisma.projectSkill.deleteMany({
          where: { projectId: id },
        });

        for (const techTitle of techStackArray) {
          let skill = await prisma.skill.findUnique({
            where: { title: techTitle },
          });
          if (!skill) {
            skill = await prisma.skill.create({
              data: { title: techTitle },
            });
          }
          await prisma.projectSkill.create({
            data: {
              projectId: id,
              skillId: skill.id,
            },
          });
        }
      } catch (error) {
        console.error("Error updating project skills:", error);
      }
    }

    return NextResponse.json({
      success: true,
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const project = await prisma.project.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    if (project.authorId !== session.user.id) {
      return NextResponse.json(
        { success: false, message: "Not allowed" },
        { status: 403 }
      );
    }

    await prisma.project.delete({ where: { id } });

    return NextResponse.json(
      { success: true, message: "Project deleted successfully" }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
