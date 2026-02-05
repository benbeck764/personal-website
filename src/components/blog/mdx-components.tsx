import Image from "next/image";
import Link from "next/link";

export const mdxComponents = {
  // Custom link component
  a: ({ href, children, ...props }: React.ComponentProps<"a">) => {
    const isInternal = href?.startsWith("/");

    if (isInternal) {
      return (
        <Link href={href} className="text-accent hover:underline">
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline"
        {...props}
      >
        {children}
      </a>
    );
  },

  // Custom image component
  img: ({ src, alt, ...props }: React.ComponentProps<"img">) => {
    return (
      <Image
        src={src || ""}
        alt={alt || ""}
        width={800}
        height={600}
        className="my-4 rounded-lg"
        {...props}
      />
    );
  },

  // Custom code block wrapper
  pre: ({ children, ...props }: React.ComponentProps<"pre">) => {
    return (
      <pre className="my-4 overflow-x-auto rounded-lg p-4" {...props}>
        {children}
      </pre>
    );
  },

  // Headings with custom styling
  h1: ({ children, ...props }: React.ComponentProps<"h1">) => (
    <h1 className="mt-8 mb-4 font-bold font-heading text-4xl" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.ComponentProps<"h2">) => (
    <h2 className="mt-6 mb-3 font-bold font-heading text-3xl" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.ComponentProps<"h3">) => (
    <h3 className="mt-4 mb-2 font-heading font-semibold text-2xl" {...props}>
      {children}
    </h3>
  ),

  // Callout/aside component
  blockquote: ({ children, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="my-4 border-accent border-l-4 bg-muted py-2 pl-4 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
};
