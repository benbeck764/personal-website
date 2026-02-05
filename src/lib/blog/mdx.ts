import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import type { TOCHeading } from "@/types/blog";

// Shiki theme configuration
const rehypePrettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: false,
};

/**
 * Compile MDX content to React component
 */
export async function compileMDXContent(source: string) {
  return await compileMDX({
    source,
    options: {
      parseFrontmatter: false, // Already parsed with gray-matter
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
          [rehypePrettyCode, rehypePrettyCodeOptions],
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [
            rehypeExternalLinks,
            { target: "_blank", rel: ["noopener", "noreferrer"] },
          ],
        ],
      },
    },
    components: {}, // Will add custom components later
  });
}

/**
 * Extract TOC headings from MDX content
 */
export function extractTOC(content: string): TOCHeading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: TOCHeading[] = [];
  let match: RegExpExecArray | null = headingRegex.exec(content);

  while (match !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ id, text, level });
    match = headingRegex.exec(content);
  }

  return headings;
}
