"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { TOCHeading } from "@/types/blog";

interface TOCHeaderProps {
  headings: TOCHeading[];
}

export function TOCHeader({ headings }: TOCHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8 overflow-hidden rounded-lg border border-border xl:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between bg-muted p-4"
        type="button"
      >
        <span className="font-semibold">Table of Contents</span>
        <ChevronDown
          className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <ul className="space-y-2 p-4 text-sm">
          {headings.map(({ id, text, level }) => (
            <li key={id} style={{ paddingLeft: `${(level - 2) * 0.75}rem` }}>
              <a
                href={`#${id}`}
                onClick={() => setIsOpen(false)}
                className="block py-1 text-foreground/70 hover:text-foreground"
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
