import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/blog/post-card";
import { PhoenixIcon } from "@/components/icons/phoenix-icon";
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
    <>
      {/* Hero Section with Radial Gradient Background */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-24 text-center"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(255,120,0,0.08) 0%, transparent 60%), radial-gradient(ellipse at 50% 50%, rgba(255,180,0,0.04) 0%, transparent 50%), #0c0a09",
        }}
      >
        {/* Floating Ember Particles */}
        <div className="embers">
          <div className="ember" style={{ left: "20%", bottom: "30%" }} />
          <div
            className="ember"
            style={{ left: "35%", bottom: "25%", animationDelay: "1.2s" }}
          />
          <div
            className="ember"
            style={{ left: "50%", bottom: "35%", animationDelay: "0.6s" }}
          />
          <div
            className="ember"
            style={{ left: "65%", bottom: "28%", animationDelay: "2s" }}
          />
          <div
            className="ember"
            style={{ left: "80%", bottom: "32%", animationDelay: "1.8s" }}
          />
          <div
            className="ember"
            style={{ left: "45%", bottom: "20%", animationDelay: "3s" }}
          />
          <div
            className="ember"
            style={{ left: "28%", bottom: "40%", animationDelay: "0.4s" }}
          />
          <div
            className="ember"
            style={{ left: "72%", bottom: "22%", animationDelay: "2.5s" }}
          />
        </div>

        {/* Phoenix Icon with Glow */}
        <div className="relative mb-8 h-48 w-48 md:h-56 md:w-56">
          <div className="phoenix-glow-container absolute top-1/2 left-1/2 h-72 w-72 md:h-80 md:w-80" />
          <PhoenixIcon className="relative z-10 h-full w-full drop-shadow-[0_0_30px_rgba(255,120,0,0.4)]" />
        </div>

        <h1 className="mb-4 font-bold font-heading text-5xl text-phoenix-gradient md:text-6xl">
          Ben Beck
        </h1>
        <p className="mb-3 font-heading text-accent text-xl tracking-wider">
          PARADIGM
        </p>
        <p className="mb-8 text-foreground/60 text-lg font-light uppercase tracking-[0.35em]">
          Rise · Evolve · Transform
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/blog">
            <Button size="lg" className="phoenix-glow">
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
      <Container>
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
    </>
  );
}
