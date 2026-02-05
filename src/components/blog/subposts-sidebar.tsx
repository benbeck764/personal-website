import Link from "next/link";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

interface SubpostsSidebarProps {
  parentPost: BlogPost;
  subposts: BlogPost[];
  currentId: string;
}

export function SubpostsSidebar({
  parentPost,
  subposts,
  currentId,
}: SubpostsSidebarProps) {
  return (
    <nav>
      <h4 className="mb-4 font-semibold text-sm uppercase tracking-wide">
        In this series
      </h4>
      <ul className="space-y-1">
        <li>
          <Link
            href={`/blog/${parentPost.slug}`}
            className={cn(
              "block rounded px-3 py-2 text-sm transition-colors",
              currentId === parentPost.id
                ? "bg-accent font-medium text-white"
                : "text-foreground/70 hover:bg-muted hover:text-foreground",
            )}
          >
            {parentPost.frontmatter.title}
          </Link>
        </li>
        {subposts.map((subpost) => (
          <li key={subpost.id} className="pl-4">
            <Link
              href={`/blog/${subpost.slug}`}
              className={cn(
                "block rounded px-3 py-2 text-sm transition-colors",
                currentId === subpost.id
                  ? "bg-accent font-medium text-white"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground",
              )}
            >
              {subpost.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
