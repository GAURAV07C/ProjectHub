import { NextResponse } from "next/server";
import { ResetSchema } from "@/schemas/AuthSchema";
import { getUserByEmail } from "@/data/user";
import { generatePasswordToken } from "@/lib/tokens";
import { sendPasswordResendEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedFields = ResetSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 404 }
      );
    }

    const passwordResetToken = await generatePasswordToken(email);

    await sendPasswordResendEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );

    return NextResponse.json(
      { success: "Reset email sent!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to send reset email" },
      { status: 500 }
    );
  }
}
