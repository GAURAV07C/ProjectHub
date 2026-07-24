import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { projectSchema } from "@/schemas/projectSchema";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: skip,
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
          orderBy: { createdAt: "asc" },
        },
        likes: { select: { userId: true } },
        skills: {
          include: {
            skill: true,
          },
        },
        _count: { select: { comments: true, likes: true } },
      },
    });
    return NextResponse.json(projects, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, private",
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedFields = projectSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Invalid fields!", errors: validatedFields.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      title,
      slug,
      description,
      excerpt,
      content,
      image,
      company,
      year,
      techStack,
      tags,
      liveLink,
      sourceLink,
      demoLink,
      isRecent,
      category,
      challenges,
      features,
      outcomes,
    } = validatedFields.data;

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        excerpt: excerpt || "",
        content: content || "",
        image,
        company,
        year,
        techStack: techStack || "[]",
        tags: tags || "[]",
        liveLink: liveLink || null,
        sourceLink: sourceLink || null,
        demoLink: demoLink || null,
        isRecent: isRecent || false,
        category,
        challenges: challenges || "",
        features: features || "",
        outcomes: outcomes || "",
        authorId: session.user.id,
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
      },
    });

    if (techStack) {
      try {
        const techStackArray = JSON.parse(techStack);
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
              projectId: project.id,
              skillId: skill.id,
            },
          });
        }
      } catch (error) {
        console.error("Error creating project skills:", error);
      }
    }

    return NextResponse.json(
      { success: "Project created successfully", project },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
