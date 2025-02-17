// import { Resend } from "resend";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResendEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.BASE_URL}/auth/new-password?token=${token}`;

  //  await resend.emails.send({
  await transporter.sendMail({
    from: process.env.FROM_EMAIL, //"onboarding@resend.dev",
    to: email,
    subject: "Reset password",
    html: `<p> <a href="${resetLink}" > click </a> to reset password  </P`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.BASE_URL}/auth/new-verification?token=${token}`;

  await transporter.sendMail({
    from: process.env.FROM_EMAIL, //"onboarding@resend.dev",
    to: email,
    subject: "verification",
    html: `<p> <a href="${confirmLink}" > click </a> to confirm email  </P`,
  });
};
