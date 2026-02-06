import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { PostNavigation } from "@/components/blog/post-navigation";
import { SubpostsHeader } from "@/components/blog/subposts-header";
import { SubpostsSidebar } from "@/components/blog/subposts-sidebar";
import { TOCHeader } from "@/components/blog/toc-header";
import { TOCSidebar } from "@/components/blog/toc-sidebar";
import { Container } from "@/components/layout/container";
import {
  getAdjacentPosts,
  getParentId,
  hasSubposts,
  isSubpost,
} from "@/lib/blog/hierarchy";
import { compileMDXContent, extractTOC } from "@/lib/blog/mdx";
import {
  getAllPostIds,
  getPostById,
  getPostWithSubposts,
} from "@/lib/blog/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const ids = getAllPostIds();
  return ids.map((id) => ({ slug: id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  try {
    const post = getPostById(slug);
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const allIds = getAllPostIds();

  if (!allIds.includes(slug)) {
    notFound();
  }

  const post = getPostById(slug);
  const isSubpostFlag = isSubpost(slug);
  const parentId = isSubpostFlag ? getParentId(slug) : null;

  // Get parent and subposts if applicable
  let parentPost = null;
  let subposts: ReturnType<typeof getPostById>[] = [];

  if (isSubpostFlag && parentId) {
    const parentData = getPostWithSubposts(parentId);
    parentPost = parentData;
    subposts = parentData.subposts;
  } else if (hasSubposts(slug, allIds)) {
    const data = getPostWithSubposts(slug);
    subposts = data.subposts;
  }

  // Compile MDX
  const { content } = await compileMDXContent(post.content);
  const toc = extractTOC(post.content);

  // Get adjacent posts for navigation
  const { prev, next } = getAdjacentPosts(slug, allIds);
  const prevPost = prev ? getPostById(prev) : null;
  const nextPost = next ? getPostById(next) : null;

  // Build breadcrumbs
  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    ...(parentPost
      ? [
          {
            label: parentPost.frontmatter.title,
            href: `/blog/${parentId}`,
          },
        ]
      : []),
    { label: post.frontmatter.title },
  ];

  return (
    <Container className="py-12">
      <Breadcrumbs items={breadcrumbItems} className="mb-8" />

      <div className="grid grid-cols-1 gap-12 xl:grid-cols-[1fr_250px]">
        {/* Main Content */}
        <article>
          {/* Header */}
          <header className="mb-8">
            <h1 className="mb-4 font-bold font-heading text-4xl md:text-5xl">
              {post.frontmatter.title}
            </h1>
            <p className="mb-4 text-foreground/70 text-xl">
              {post.frontmatter.description}
            </p>
            <div className="flex items-center gap-4 text-foreground/60 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(post.frontmatter.date), "MMMM dd, yyyy")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </span>
            </div>
          </header>

          {/* Subposts navigation (mobile) */}
          {(parentPost || subposts.length > 0) && (
            <SubpostsHeader
              parentPost={parentPost || post}
              subposts={subposts}
              currentId={slug}
            />
          )}

          {/* TOC (mobile) */}
          {toc.length > 0 && <TOCHeader headings={toc} />}

          {/* MDX Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {content}
          </div>

          {/* Navigation */}
          <PostNavigation
            prev={
              prevPost
                ? { slug: prevPost.slug, title: prevPost.frontmatter.title }
                : null
            }
            next={
              nextPost
                ? { slug: nextPost.slug, title: nextPost.frontmatter.title }
                : null
            }
          />
        </article>

        {/* Sidebar */}
        <aside className="sticky top-24 hidden h-fit space-y-8 xl:block">
          {/* Subposts sidebar (desktop) */}
          {(parentPost || subposts.length > 0) && (
            <SubpostsSidebar
              parentPost={parentPost || post}
              subposts={subposts}
              currentId={slug}
            />
          )}

          {/* TOC sidebar (desktop) */}
          {toc.length > 0 && <TOCSidebar headings={toc} />}
        </aside>
      </div>
    </Container>
  );
}
