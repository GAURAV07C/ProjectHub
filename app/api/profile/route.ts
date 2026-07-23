import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, bio, location, website, userId } = body;

    const targetUserId = userId || session.user.id;

    const user = await prisma.user.update({
      where: { id: targetUserId },
      data: {
        name,
        bio,
        location,
        website,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
