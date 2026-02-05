import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost, BlogPostWithSubposts } from "@/types/blog";
import {
  getParentId,
  getSubpostIds,
  hasSubposts,
  isSubpost,
} from "./hierarchy";
import { calculateReadingTime } from "./reading-time";
import { BlogPostSchema } from "./schemas";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Get all post IDs (including subposts)
 */
export function getAllPostIds(): string[] {
  // Check if content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const postDirs = fs.readdirSync(CONTENT_DIR);
  const ids: string[] = [];

  for (const dir of postDirs) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.statSync(dirPath).isDirectory()) continue;

    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;

      if (file === "index.mdx") {
        ids.push(dir);
      } else {
        const subpostName = file.replace(".mdx", "");
        ids.push(`${dir}/${subpostName}`);
      }
    }
  }

  return ids;
}

/**
 * Get post data by ID
 */
export function getPostById(id: string): BlogPost {
  const isSubpostFlag = isSubpost(id);
  const [parentDir, subpostFile] = isSubpostFlag ? id.split("/") : [id, null];
  const fileName = subpostFile ? `${subpostFile}.mdx` : "index.mdx";
  const filePath = path.join(CONTENT_DIR, parentDir, fileName);

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  // Validate frontmatter
  const frontmatter = BlogPostSchema.parse(data);

  return {
    id,
    slug: id,
    frontmatter,
    content,
    readingTime: calculateReadingTime(content),
    isSubpost: isSubpostFlag,
    parentId: isSubpostFlag ? getParentId(id) : null,
  };
}

/**
 * Get all posts (parent posts only, sorted by date)
 */
export function getAllPosts(): BlogPost[] {
  const allIds = getAllPostIds();
  const parentIds = allIds.filter((id) => !isSubpost(id));

  return parentIds
    .map((id) => getPostById(id))
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });
}

/**
 * Get post with subposts
 */
export function getPostWithSubposts(id: string): BlogPostWithSubposts {
  const post = getPostById(id);
  const allIds = getAllPostIds();

  if (isSubpost(id)) {
    throw new Error(`Cannot get subposts for a subpost: ${id}`);
  }

  const subpostIds = getSubpostIds(id, allIds);
  const subposts = subpostIds
    .map((subId) => getPostById(subId))
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);

  const combinedReadingTime = calculateReadingTime(
    [post.content, ...subposts.map((s) => s.content)].join("\n"),
  );

  return {
    ...post,
    subposts,
    combinedReadingTime,
  };
}

export { hasSubposts };
