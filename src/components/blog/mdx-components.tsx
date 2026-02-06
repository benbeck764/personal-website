import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";

export const mdxComponents = {
  // Custom link component
  a: ({ href, children, ...props }: ComponentProps<"a">) => {
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
  img: ({ src, alt, ...props }: ComponentProps<"img">) => {
    if (!src) return null;
    return (
      <Image
        src={src}
        alt={alt || ""}
        width={800}
        height={400}
        className="rounded-lg"
        {...props}
      />
    );
  },
};
