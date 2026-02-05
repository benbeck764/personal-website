import { Container } from "./container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-border border-t">
      <Container>
        <div className="py-8 text-center text-foreground/60 text-sm">
          <p>© {currentYear} Ben Beck. Built with Next.js and Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
