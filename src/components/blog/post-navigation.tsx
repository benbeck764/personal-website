import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PostNavigationProps = {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
};

export function PostNavigation({ prev, next }: PostNavigationProps) {
  return (
    <nav className="mt-12 flex justify-between gap-4 border-border border-t pt-8">
      {prev ? (
        <Link href={`/blog/${prev.slug}`}>
          <Button variant="outline" className="group p-6">
            <ArrowLeft className="group-hover:-translate-x-1 mr-2 h-4 w-4 transition-transform" />
            <div className="text-left">
              <div className="text-foreground/60 text-xs">Previous</div>
              <div className="font-medium">{prev.title}</div>
            </div>
          </Button>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link href={`/blog/${next.slug}`}>
          <Button variant="outline" className="group p-6">
            <div className="text-right">
              <div className="text-foreground/60 text-xs">Next</div>
              <div className="font-medium">{next.title}</div>
            </div>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
