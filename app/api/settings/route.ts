import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        userName: true,
        email: true,
        bio: true,
        location: true,
        website: true,
        image: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      userName,
      name,
      bio,
      location,
      website,
      email,
    } = body;

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        userName: true,
        name: true,
        email: true,
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

    if (userName && userName !== currentUser.userName) {
      const existingUser = await prisma.user.findUnique({
        where: { userName },
        select: { id: true },
      });

      if (existingUser && existingUser.id !== session.user.id) {
        return NextResponse.json(
          { error: "Username is already taken" },
          { status: 409 }
        );
      }
    }

    if (email && email !== currentUser.email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (existingEmail && existingEmail.id !== session.user.id) {
        return NextResponse.json(
          { error: "Email is already in use" },
          { status: 409 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        userName: userName !== undefined ? userName : currentUser.userName,
        name: name !== undefined ? name : currentUser.name,
        bio: bio !== undefined ? bio : currentUser.bio,
        location: location !== undefined ? location : currentUser.location,
        website: website !== undefined ? website : currentUser.website,
        email: email !== undefined ? email : currentUser.email,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
