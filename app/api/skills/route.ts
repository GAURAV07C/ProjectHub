import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json([], { status: 200 });
    }

    const userSkills = await prisma.userSkill.findMany({
      where: { userId: session.user.id },
      include: {
        skill: true,
      },
    });

    return NextResponse.json(userSkills);
  } catch (error) {
    console.error("Error fetching user skills:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { skillId, title } = await req.json();

    if (!skillId && !title) {
      return NextResponse.json({ error: "Skill ID or title is required" }, { status: 400 });
    }

    let finalSkillId = skillId;

    if (!finalSkillId && title) {
      const existingSkill = await prisma.skill.findUnique({
        where: { title: title.toLowerCase().trim() },
      });

      if (existingSkill) {
        finalSkillId = existingSkill.id;
      } else {
        const newSkill = await prisma.skill.create({
          data: {
            title: title.trim(),
          },
        });
        finalSkillId = newSkill.id;
      }
    }

    const existingUserSkill = await prisma.userSkill.findUnique({
      where: {
        userId_skillId: {
          userId: session.user.id,
          skillId: finalSkillId,
        },
      },
      include: {
        skill: true,
      },
    });

    if (existingUserSkill) {
      return NextResponse.json({ skill: existingUserSkill.skill, message: "Skill already added" });
    }

    const userSkill = await prisma.userSkill.create({
      data: {
        userId: session.user.id,
        skillId: finalSkillId,
      },
      include: {
        skill: true,
      },
    });

    return NextResponse.json(userSkill);
  } catch (error) {
    console.error("Error adding skill:", error);
    return NextResponse.json(
      { error: "Failed to add skill" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { skillId } = await req.json();

    if (!skillId) {
      return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });
    }

    await prisma.userSkill.delete({
      where: {
        userId_skillId: {
          userId: session.user.id,
          skillId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing skill:", error);
    return NextResponse.json(
      { error: "Failed to remove skill" },
      { status: 500 }
    );
  }
}
