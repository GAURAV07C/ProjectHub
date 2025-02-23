import { z } from "zod";
 
export const projectSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  category: z.string().min(1, { message: "Category is required" }),
  imageurl: z
    .string()
    .min(1, { message: "Image URL is required" })
    .url({ message: "Invalid URL format" }),
  details: z.string().optional(), // Allow empty details
  Link: z
    .string()
    .url({ message: "Invalid URL format" })
    .min(1, { message: "Link is required" }),
});
