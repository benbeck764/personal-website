"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

interface SubpostsHeaderProps {
  parentPost: BlogPost;
  subposts: BlogPost[];
  currentId: string;
}

export function SubpostsHeader({
  parentPost,
  subposts,
  currentId,
}: SubpostsHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8 overflow-hidden rounded-lg border border-border xl:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between bg-muted p-4"
        type="button"
      >
        <span className="font-semibold">Posts in this series</span>
        <ChevronDown
          className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <ul className="space-y-2 p-4">
          <li>
            <Link
              href={`/blog/${parentPost.slug}`}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block rounded px-3 py-2 text-sm transition-colors",
                currentId === parentPost.id
                  ? "bg-accent font-medium text-white"
                  : "text-foreground/70 hover:bg-muted",
              )}
            >
              {parentPost.frontmatter.title}
            </Link>
          </li>
          {subposts.map((subpost) => (
            <li key={subpost.id} className="pl-4">
              <Link
                href={`/blog/${subpost.slug}`}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block rounded px-3 py-2 text-sm transition-colors",
                  currentId === subpost.id
                    ? "bg-accent font-medium text-white"
                    : "text-foreground/70 hover:bg-muted",
                )}
              >
                {subpost.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
