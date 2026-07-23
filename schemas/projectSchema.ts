import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug can only contain lowercase letters, numbers, and hyphens" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  image: z
    .string()
    .min(1, { message: "Image is required" }),
  company: z.string().optional(),
  year: z.string().optional(),
  techStack: z.string().optional(),
  tags: z.string().optional(),
  liveLink: z.string().url({ message: "Invalid URL format" }).optional().or(z.literal("")),
  sourceLink: z.string().url({ message: "Invalid URL format" }).optional().or(z.literal("")),
  demoLink: z.string().url({ message: "Invalid URL format" }).optional().or(z.literal("")),
  isRecent: z.boolean().optional().default(false),
  category: z.string().optional(),
  challenges: z.string().optional(),
  features: z.string().optional(),
  outcomes: z.string().optional(),
});

