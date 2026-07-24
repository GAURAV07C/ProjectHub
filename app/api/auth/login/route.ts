import { NextResponse } from "next/server";
import { LoginSchema } from "@/schemas/AuthSchema";
import { getUserByEmail } from "@/data/user";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedFields = LoginSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Invalid fields!" },
        { status: 400 }
      );
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return NextResponse.json(
        { error: "Email does not exist!" },
        { status: 400 }
      );
    }

    if (!existingUser.emailVerified) {
      const verficationToken = await generateVerificationToken(
        existingUser.email
      );

      console.log("Sending verification email to:", existingUser.email);
      const emailResult = await sendVerificationEmail(
        verficationToken.email,
        verficationToken.token
      );
      console.log("Verification email result:", emailResult);

      return NextResponse.json(
        { success: "Confirmation email Sent!", emailVerified: false },
        { status: 200 }
      );
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/feed",
      });
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "digest" in error &&
        typeof (error as { digest?: string }).digest === "string" &&
        (error as { digest?: string }).digest!.startsWith("NEXT_REDIRECT")
      ) {
        return NextResponse.json({ success: true, emailVerified: true }, { status: 200 });
      }
      throw error;
    }

    return NextResponse.json(
      { success: "Login successful", emailVerified: true },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json(
            { error: "Invalid credentials!" },
            { status: 400 }
          );
        default:
          return NextResponse.json(
            { error: "Something went wrong!" },
            { status: 400 }
          );
      }
    }

    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
