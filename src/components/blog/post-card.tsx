import { format } from "date-fns";
import { Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { BlogPost } from "@/types/blog";

type PostCardProps = {
  post: BlogPost;
  combinedReadingTime?: number;
};

export function PostCard({ post, combinedReadingTime }: PostCardProps) {
  const { frontmatter, readingTime, slug } = post;
  const displayReadingTime = combinedReadingTime || readingTime;

  return (
    <Card className="transition-colors hover:border-accent">
      <Link href={`/blog/${slug}`} className="block">
        <h3 className="mb-2 font-bold font-heading text-2xl hover:text-accent">
          {frontmatter.title}
        </h3>
        <p className="mb-4 text-foreground/70">{frontmatter.description}</p>

        <div className="mb-4 flex items-center gap-4 text-foreground/60 text-sm">
          <time dateTime={frontmatter.date}>
            {format(new Date(frontmatter.date), "MMM dd, yyyy")}
          </time>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {displayReadingTime} min read
          </span>
        </div>

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Link>
    </Card>
  );
}
