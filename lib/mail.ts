
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



export const sendPasswordResendEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.BASE_URL}/auth/new-password?token=${token}`;

   const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #333;">🔒 Password Reset Request</h2>
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the button below to reset it:</p>
      <a href="${resetLink}" 
        style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Reset Password
      </a>
      <p>If you didn’t request this, you can safely ignore this email.</p>
      <hr style="margin-top: 20px;"/>
      <p style="font-size: 12px; color: #777;">If you have any questions, contact our support team.</p>
    </div>
  `;

  //  await resend.emails.send({
  await transporter.sendMail({
    from: process.env.FROM_EMAIL, //"onboarding@resend.dev",
    to: email,
    subject: "🔒 Reset Your Password",
    html: htmlContent,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.BASE_URL}/auth/new-verification?token=${token}`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #333;">✅ Confirm Your Email</h2>
      <p>Hello,</p>
      <p>Thank you for signing up! Click the button below to verify your email address:</p>
      <a href="${confirmLink}" 
        style="display: inline-block; padding: 10px 20px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Verify Email
      </a>
      <p>If you did not create an account, you can ignore this email.</p>
      <hr style="margin-top: 20px;"/>
      <p style="font-size: 12px; color: #777;">If you have any questions, contact our support team.</p>
    </div>
  `;
  

  await transporter.sendMail({
    from: process.env.FROM_EMAIL, //"onboarding@resend.dev",
    to: email,
    subject: "✅ Verify Your Email Address",
    html: htmlContent,
  });
};
