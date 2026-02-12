import Link from "next/link";
import { PhoenixIconSmall } from "@/components/icons/phoenix-icon-small";
import { Container } from "./container";

export function Header() {
  const navItems = [
    //{ label: "Blog", href: "/blog" },
    { label: "Experience", href: "/experience" },
  ];

  return (
    <header className="sticky top-0 z-50 border-border border-b bg-background/80 backdrop-blur-sm">
      <Container>
        <div className="flex h-(--header-height) items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <PhoenixIconSmall className="h-8 w-8 text-accent" />
            <div className="flex flex-col">
              <span className="font-bold font-heading text-xl leading-none">
                Ben Beck
              </span>
              <span className="font-heading font-medium text-accent text-xs tracking-wider">
                PARADIGM
              </span>
            </div>
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
