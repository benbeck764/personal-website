"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type MilestoneTooltipProps = {
  content: string;
  children: React.ReactNode;
  className?: string;
};

export const MilestoneTooltip = ({
  content,
  children,
  className,
}: MilestoneTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "-translate-x-1/2 pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 whitespace-nowrap rounded-md bg-surface px-3 py-1.5 font-medium text-foreground text-sm shadow-lg ring-1 ring-border",
            "after:-translate-x-1/2 after:absolute after:top-full after:left-1/2 after:border-4 after:border-transparent after:border-t-surface",
            className,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};
