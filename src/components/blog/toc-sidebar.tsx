"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TOCHeading } from "@/types/blog";

type TOCSidebarProps = {
  headings: TOCHeading[];
};

export function TOCSidebar({ headings }: TOCSidebarProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );

    for (const { id } of headings) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav>
      <h4 className="mb-4 font-semibold text-sm uppercase tracking-wide">
        Table of Contents
      </h4>
      <ul className="space-y-2 text-sm">
        {headings.map(({ id, text, level }) => (
          <li key={id} style={{ paddingLeft: `${(level - 2) * 0.75}rem` }}>
            <a
              href={`#${id}`}
              className={cn(
                "block rounded px-3 py-1.5 text-sm transition-all",
                activeId === id
                  ? "font-medium text-accent shadow-accent/20 shadow-sm"
                  : "text-foreground/60 hover:text-foreground",
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
