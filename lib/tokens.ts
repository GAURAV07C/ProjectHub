import { getVerificationTokenByEmail } from "@/data/verification-token";
import { prisma } from "@/lib/prisma";
import { v4 as uuid } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();

  const expires = new Date(new Date().getTime() * 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
