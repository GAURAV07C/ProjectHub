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
    const { userName, name, bio, location, website, userId } = body;

    const targetUserId = userId || session.user.id;

    const currentUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: {
        userName: true,
        name: true,
        bio: true,
        location: true,
        website: true,
        updatedAt: true,
      },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const isUserNameUnchanged = userName === currentUser.userName;
    const isOtherFieldsUnchanged =
      name === currentUser.name &&
      bio === currentUser.bio &&
      location === currentUser.location &&
      website === currentUser.website;

    if (isUserNameUnchanged && isOtherFieldsUnchanged) {
      return NextResponse.json({
        success: true,
        user: currentUser,
        message: "No changes made",
        updatedAt: currentUser.updatedAt,
      });
    }

    if (!isUserNameUnchanged && userName) {
      const existingUser = await prisma.user.findUnique({
        where: { userName },
        select: { id: true },
      });

      if (existingUser && existingUser.id !== targetUserId) {
        return NextResponse.json(
          { error: "Username is already taken" },
          { status: 409 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: targetUserId },
      data: {
        userName: userName !== undefined ? userName : currentUser.userName,
        name,
        bio,
        location,
        website,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
