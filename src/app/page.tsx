import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/blog/post-card";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  getAllPosts,
  getPostWithSubposts,
  hasSubposts,
} from "@/lib/blog/posts";

export default function HomePage() {
  const allPosts = getAllPosts();
  const allPostIds = allPosts.map((p) => p.id);
  const recentPosts = allPosts.slice(0, 3);

  return (
    <Container>
      {/* Hero Section */}
      <section className="py-24 text-center">
        <h1 className="mb-6 font-bold font-heading text-5xl md:text-6xl">
          Hi, I'm Ben Beck
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-foreground/70 text-xl">
          Software engineer and developer
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/blog">
            <Button size="lg">
              Read Blog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/work">
            <Button size="lg" variant="outline">
              View Work
            </Button>
          </Link>
        </div>
      </section>

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-bold font-heading text-3xl">Recent Posts</h2>
            <Link href="/blog" className="text-accent hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => {
              const withSubposts = hasSubposts(post.id, allPostIds)
                ? getPostWithSubposts(post.id)
                : null;

              return (
                <PostCard
                  key={post.id}
                  post={post}
                  combinedReadingTime={withSubposts?.combinedReadingTime}
                />
              );
            })}
          </div>
        </section>
      )}
    </Container>
  );
}
