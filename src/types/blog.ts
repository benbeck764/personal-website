import type { BlogPostFrontmatter } from "@/lib/blog/schemas";

export interface BlogPost {
  id: string;
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  readingTime: number;
  isSubpost: boolean;
  parentId: string | null;
}

export interface BlogPostWithSubposts extends BlogPost {
  subposts: BlogPost[];
  combinedReadingTime: number;
}

export interface TOCHeading {
  id: string;
  text: string;
  level: number;
}
