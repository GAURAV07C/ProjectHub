"use server";

import * as z from "zod";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { LoginSchema, RegisterSchema } from "@/schemas/AuthSchema";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";


export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validateFields.data;
  
   const existingUser = await getUserByEmail(email);

    if (existingUser === null) {
      return { error: "Email  is not register" };
    }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credintials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }   
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, name } = validateFields.data;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await getUserByEmail(email);

  if (existingUser !== null) {
    return { error: "Email already in use!" };
  }

  // const userName = email.split("@")[0];

  await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      // userName: userName
    },
  });

  // const verficationToken = generateVerificationToken(email)

  // return { sucess: "Confirmation email.sent" };
};
