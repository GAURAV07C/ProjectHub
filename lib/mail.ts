import {Resend}      from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResendEmail = async (
  email : string,
  token : string
) =>  {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

   await resend.emails.send({
     from: "onboarding@resend.dev",
     to: email,
     subject: "Reset password",
     html: `<p> <a href="${resetLink}" > click </a> to reset password  </P`,
   });
}


export const sendVerificationEmail = async (email : string , token: string) =>  {

    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
    
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to:email,
      subject:"lkjl",
      html:`<p> <a href="${confirmLink}" > click </a> to confirm email  </P`
    });

}