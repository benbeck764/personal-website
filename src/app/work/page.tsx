import { Container } from "@/components/layout/container";
import { PhoenixTimeline } from "./components/phoenix-timeline";
import { experienceTimeline } from "./experience-data";

export const metadata = {
  title: "Work",
  description: "Projects and experience",
};

export default function WorkPage() {
  return (
    <Container>
      <div className="py-16">
        {/* <h1 className="mb-4 font-bold font-heading text-4xl md:text-5xl">
          Work
        </h1> */}
        {/* <p className="mb-12 text-foreground/70 text-xl">
          Projects I've built and places I've worked
        </p> */}

        {/* Projects Section */}
        {/* <section className="mb-16">
          <h2 className="mb-8 font-bold font-heading text-3xl">Projects</h2>
          <p className="text-foreground/70">Project content coming soon...</p>
        </section> */}

        {/* Experience Section */}
        <section>
          <h2 className="mb-8 font-bold font-heading text-3xl">Experience</h2>
          <PhoenixTimeline experiences={experienceTimeline} />
        </section>
      </div>
    </Container>
  );
}
