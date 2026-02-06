import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type TimelineMilestoneProps = {
  isActive: boolean;
  onClick: () => void;
  label: string;
  variant?: "company" | "role";
  className?: string;
};

export const TimelineMilestone = forwardRef<
  HTMLButtonElement,
  TimelineMilestoneProps
>(({ isActive, onClick, label, variant = "company", className }, ref) => {
  const sizeClasses = variant === "company" ? "h-10 w-10" : "h-6 w-6";

  return (
    <button
      ref={ref}
      className={cn(
        "relative z-10 cursor-pointer rounded-full border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        sizeClasses,
        isActive
          ? "animate-pulse border-accent bg-accent shadow-lg"
          : "border-accent bg-background hover:scale-110 hover:shadow-md",
        className,
      )}
      onClick={onClick}
      aria-label={label}
      aria-current={isActive}
      type="button"
    />
  );
});

TimelineMilestone.displayName = "TimelineMilestone";
