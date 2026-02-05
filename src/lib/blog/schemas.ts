import { z } from "zod";

export const BlogPostSchema = z.object({
  title: z.string().max(60, "Title must be 60 characters or less"),
  description: z
    .string()
    .max(155, "Description must be 155 characters or less"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  order: z.number().int().default(0),
  image: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  authors: z.array(z.string()).optional().default(["default"]),
  draft: z.boolean().optional().default(false),
});

export type BlogPostFrontmatter = z.infer<typeof BlogPostSchema>;
