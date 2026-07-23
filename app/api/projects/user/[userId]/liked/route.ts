import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;

    const likedprojects = await prisma.project.findMany({
      where: {
        likes: { some: { userId } },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            userName: true,
            image: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                userName: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
        likes: { select: { userId: true } },
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(likedprojects);
  } catch (error) {
    console.error("Error fetching liked projects:", error);
    return NextResponse.json([], { status: 500 });
  }
}
