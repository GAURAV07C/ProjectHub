import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { RegisterSchema } from "@/schemas/AuthSchema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedFields = RegisterSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Invalid fields!" },
        { status: 400 }
      );
    }

    const { email, password, name } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser !== null) {
      return NextResponse.json(
        { error: "Email already in use!" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userName = email.split("@")[0];

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        userName,
      },
    });

    const verficationToken = await generateVerificationToken(email);

    console.log("Generating verification token for:", email);
    const emailResult = await sendVerificationEmail(
      verficationToken.email,
      verficationToken.token
    );
    console.log("Verification email result:", emailResult);

    return NextResponse.json(
      { success: "Confirmation email sent", messageId: emailResult?.messageId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Failed to register" },
      { status: 500 }
    );
  }
}
