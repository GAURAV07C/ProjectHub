import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const currentUserId = session?.user?.id;

    const { searchParams } = new URL(req.url);
    const excludeId = searchParams.get("excludeId") || "";

    const randomUsers = await prisma.user.findMany({
      where: {
        AND: [
          { NOT: { id: excludeId } },
          ...(currentUserId
            ? [{ NOT: { followers: { some: { followerId: currentUserId } } } }]
            : []),
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

    return NextResponse.json(randomUsers);
  } catch (error) {
    console.error("Error fetching random users:", error);
    return NextResponse.json([], { status: 500 });
  }
}
