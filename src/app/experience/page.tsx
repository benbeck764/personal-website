import { Container } from "@/components/layout/container";
import { Timeline } from "./timeline/timeline";

export const metadata = {
  title: "Experience",
  description: "Resume and work experience of Ben Beck, Software Engineer",
};

export default function WorkPage() {
  return (
    <Container>
      <div className="pb-16">
        {/* Experience Section */}
        <section>
          <h2 className="sticky top-(--header-height) z-30 mb-2 bg-background py-4 font-bold font-heading text-3xl">
            Experience
          </h2>
          <Timeline />
        </section>
      </div>
    </Container>
  );
}
