"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
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
  content: React.ReactNode;
};

type PhoenixTimelineProps = {
  experiences: TimelineExperience[];
  className?: string;
};

export const PhoenixTimeline = ({
  experiences,
  className,
}: PhoenixTimelineProps) => {
  const [activeCompanyIndex, setActiveCompanyIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

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
                  isActive={activeCompanyIndex === companyIndex}
                  onClick={() => setActiveCompanyIndex(companyIndex)}
                  label={`View ${experience.companyName} experience`}
                  variant="company"
                />
              </div>
            ))}
          </div>
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
