import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        bio: true,
        name: true,
        image: true,
        userName: true,
        location: true,
        website: true,
        email: true,
        emailVerified: true,
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
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(null, { status: 500 });
  }
}
