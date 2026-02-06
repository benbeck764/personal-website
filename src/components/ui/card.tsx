import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-border bg-background p-6 transition-all",
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";
