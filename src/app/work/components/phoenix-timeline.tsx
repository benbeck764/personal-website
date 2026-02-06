"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedPhoenix } from "./animated-phoenix";
import { TimelineMilestone } from "./timeline-milestone";
import { TimelineYearMarker } from "./timeline-year-marker";

export type TimelineExperience = {
  id: string;
  companyName: string;
  roles: Array<{
    title: string;
    accomplishments: string[];
    startDate: Date;
    endDate?: Date;
  }>;
  startYear: number;
  endYear: number | null;
  content: ReactNode;
};

type PhoenixTimelineProps = {
  experiences: TimelineExperience[];
  className?: string;
};

export const PhoenixTimeline = ({
  experiences,
  className,
}: PhoenixTimelineProps) => {
  const [activeCompanyIndex, setActiveCompanyIndex] = useState(0);
  const [phoenixPosition, setPhoenixPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Calculate phoenix position when active milestone changes
  useEffect(() => {
    const activeMilestone = milestoneRefs.current[activeCompanyIndex];
    const container = containerRef.current;

    if (activeMilestone && container) {
      const milestoneRect = activeMilestone.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Calculate position relative to container
      // Center the phoenix on the milestone
      const x = milestoneRect.left - containerRect.left - 32; // -32 to center (24px phoenix / 2 = 12, but accounting for offset)
      const y = milestoneRect.top - containerRect.top - 32;

      setPhoenixPosition({ x, y });
    }
  }, [activeCompanyIndex]);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Timeline Layout */}
      <div className="grid grid-cols-[auto_1fr] gap-8 md:grid-cols-[10%_20%_70%] md:gap-4">
        {/* Year Column */}
        <div className="space-y-12">
          {experiences.map((experience) => (
            <div
              key={`year-${experience.id}`}
              className="flex items-start pt-2"
            >
              <TimelineYearMarker year={experience.startYear} />
            </div>
          ))}
        </div>

        {/* Timeline Column */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-border" />

          {/* Milestones */}
          <div className="relative space-y-12">
            {experiences.map((experience, companyIndex) => (
              <div key={experience.id} className="relative">
                <TimelineMilestone
                  ref={(el) => {
                    milestoneRefs.current[companyIndex] = el;
                  }}
                  isActive={activeCompanyIndex === companyIndex}
                  onClick={() => setActiveCompanyIndex(companyIndex)}
                  label={`View ${experience.companyName} experience`}
                  variant="company"
                />
              </div>
            ))}
          </div>

          {/* Animated Phoenix */}
          <AnimatedPhoenix targetPosition={phoenixPosition} isActive={true} />
        </div>

        {/* Content Column */}
        <div className="space-y-12">
          {experiences.map((experience, companyIndex) => (
            <div key={experience.id} className="relative">
              {/* Experience Content */}
              <div
                className={cn(
                  "transition-all duration-300",
                  activeCompanyIndex === companyIndex
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-75",
                )}
              >
                {experience.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
