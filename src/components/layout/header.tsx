import Link from "next/link";
import { Container } from "./container";

export function Header() {
  const navItems = [
    { label: "Blog", href: "/blog" },
    { label: "Work", href: "/work" },
  ];

  return (
    <header className="sticky top-0 z-50 border-border border-b bg-background/80 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-bold font-heading text-xl">
            Ben Beck
          </Link>

          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/70 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
