import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 character required",
  }),

    confirm_password: z.string({ message: "Confirm Password is required" }),
  }).superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Confirm password not matched",
        path: ["confirm_password"],
      });
    }
  });

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});




export const NewPasswordSchema = z
  .object({
    
    password: z.string().min(6, {
      message: "Minimum 6 character required",
    }),

    confirm_password: z.string({ message: "Confirm Password is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Confirm password not matched",
        path: ["confirm_password"],
      });
    }
  });