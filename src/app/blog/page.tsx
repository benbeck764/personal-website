import { PostCard } from "@/components/blog/post-card";
import { Container } from "@/components/layout/container";
import {
  getAllPosts,
  getPostWithSubposts,
  hasSubposts,
} from "@/lib/blog/posts";

export const metadata = {
  title: "Blog",
  description: "Articles and tutorials",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const allPostIds = posts.map((p) => p.id);

  return (
    <Container>
      <div className="py-16">
        <h1 className="mb-4 font-bold font-heading text-4xl md:text-5xl">
          Blog
        </h1>
        <p className="mb-12 text-foreground/70 text-xl">
          Thoughts, tutorials, and explorations
        </p>

        <div className="grid gap-8">
          {posts.map((post) => {
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
      </div>
    </Container>
  );
}
