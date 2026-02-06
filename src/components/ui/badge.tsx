import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold text-xs transition-colors",
  {
    variants: {
      variant: {
        default: "bg-accent text-white",
        secondary: "bg-muted text-foreground",
        outline: "border border-border text-foreground",
        phoenix:
          "bg-gradient-to-r from-accent-ember via-accent to-accent-secondary text-white shadow-accent/40 shadow-lg",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  },
);

export type BadgeProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
