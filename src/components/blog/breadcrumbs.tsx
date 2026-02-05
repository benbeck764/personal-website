import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      className={cn(
        "flex items-center gap-2 text-foreground/60 text-sm",
        className,
      )}
    >
      {items.map((item, index) => (
        <span
          key={`${item.label}-${item.href || index}`}
          className="flex items-center gap-2"
        >
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
