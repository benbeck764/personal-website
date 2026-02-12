"use client";

import { useEffect, useRef } from "react";
import "./timeline.css";
import { Tooltip } from "@/components/ui/tooltip";
import { AnimatedPhoenix } from "./components/animated-phoenix";
import { Ashes } from "./components/ashes";
import { EmberBurst } from "./components/ember-burst";
import { ExperienceInfo } from "./components/experience-info";
import { TimelineMilestone } from "./components/timeline-milestone";
import { experienceTimeline } from "./data";
import { useMilestonePositions } from "./hooks/useMilestonePositions";
import { usePhoenixAnimation } from "./hooks/usePhoenixAnimation";
import { useScrollActivation } from "./hooks/useScrollActivation";
import { milestoneKey } from "./types";
import { formatDate } from "./utils";

export const Timeline = () => {
  const experiences = experienceTimeline;

  // Milestone positions & refs
  const { milestonePositions, timelineHeight, containerRef, timelineRef, milestoneRefs, calculatePositions } =
    useMilestonePositions(experiences);

  // Scroll-based activation (manages active state)
  const { activeCompanyIndex, activeRoleIndex, setActiveCompanyIndex, setActiveRoleIndex, lastActiveMilestone } =
    useScrollActivation(experiences, milestonePositions, milestoneRefs);

  // Phoenix animation & ember bursts (uses active state from activation)
  const { phoenixPosition, emberBursts, spawnEmberBurst, removeEmberBurst, updatePhoenixPosition } =
    usePhoenixAnimation(activeCompanyIndex, activeRoleIndex, experiences, {
      containerRef,
      milestoneRefs,
    });

  // Card ref for active card
  const activeCardRef = useRef<HTMLDivElement>(null);

  // Force scroll to top on mount/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  }, []);

  // Spawn ember burst when active milestone changes from scroll
  useEffect(() => {
    if (lastActiveMilestone) {
      const { key, companyIndex, roleIndex } = lastActiveMilestone;
      spawnEmberBurst(key, companyIndex, roleIndex);
    }
  }, [lastActiveMilestone, spawnEmberBurst]);

  // Initial position calculation and recalculation on resize
  useEffect(() => {
    calculatePositions();
    updatePhoenixPosition();

    const handleResize = () => {
      calculatePositions();
      updatePhoenixPosition();
    };

    window.addEventListener("resize", handleResize);
    // Small delay to ensure cards are rendered, then spawn initial ember burst
    const timeout = setTimeout(() => {
      calculatePositions();
      updatePhoenixPosition();
      // Spawn ember burst at initial position (latest role of first company)
      spawnEmberBurst(milestoneKey.role(0, 0), 0, 0);
    }, 150);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, [calculatePositions, updatePhoenixPosition, spawnEmberBurst]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Timeline Layout */}
      <div className="grid grid-cols-[60px_1fr] gap-4 md:grid-cols-[7.5%_12.5%_80%] md:gap-4">
        {/* Spacer Column (optional) */}
        <div className="relative hidden min-h-screen md:block" />

        {/* Timeline Column */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute top-0 bottom-0 left-5.5 w-0.5 bg-border md:left-5" />
          {/* Shimmer Effect */}
          <div className="timeline-shimmer absolute top-0 bottom-0 left-5.5 w-0.5 md:left-5" />

          {/* Company Milestones */}
          {experiences.map((experience, companyIndex) => {
            const companyPosition = milestonePositions.get(milestoneKey.company(companyIndex));

            return (
              <div key={`company-milestone-${experience.id}`}>
                {/* Company Milestone - Show at LAST role (first chronologically) */}
                {(() => {
                  const lastRoleIndex = experience.roles.length - 1;
                  // For multiple roles, use last role's position; for single role, use company position
                  const position =
                    experience.roles.length > 1
                      ? milestonePositions.get(milestoneKey.role(companyIndex, lastRoleIndex))
                      : companyPosition;

                  return position ? (
                    <div className="absolute left-px" style={{ top: `${position.top}px` }}>
                      <div className="relative">
                        <Tooltip
                          content={`${experience.companyName} - ${experience.roles[lastRoleIndex]?.title || "First Role"}`}
                          sideOffset={10}
                        >
                          <TimelineMilestone
                            ref={(el) => {
                              milestoneRefs.current.set(milestoneKey.company(companyIndex), el);
                            }}
                            isActive={
                              activeCompanyIndex === companyIndex &&
                              (activeRoleIndex[companyIndex] ?? 0) === lastRoleIndex
                            }
                            onClick={() => {
                              setActiveCompanyIndex(companyIndex);
                              setActiveRoleIndex((prev) => ({
                                ...prev,
                                [companyIndex]: lastRoleIndex,
                              }));
                              spawnEmberBurst(milestoneKey.company(companyIndex), companyIndex, lastRoleIndex);
                            }}
                            label={`View ${experience.companyName} - ${experience.roles[lastRoleIndex]?.title || "First Role"}`}
                            variant="company"
                          />
                        </Tooltip>
                        {/* Desktop date - to the left */}
                        <span className="-translate-y-1/2 absolute top-1/2 right-[calc(100%+0.75rem)] hidden whitespace-nowrap font-heading text-foreground/70 text-lg tabular-nums md:inline">
                          {formatDate(experience.roles[lastRoleIndex]?.startDate || new Date())}
                        </span>
                        {/* Mobile date - below milestone */}
                        <span className="-translate-x-1/2 absolute top-full left-1/2 mt-1 whitespace-nowrap font-heading text-foreground/70 text-xs tabular-nums md:hidden">
                          {formatDate(experience.roles[lastRoleIndex]?.startDate || new Date())}
                        </span>
                      </div>
                    </div>
                  ) : null;
                })()}

                {/* Role Sub-Milestones (for all roles except the last) */}
                {experience.roles.length > 1 &&
                  experience.roles.slice(0, -1).map((role, roleIndex) => {
                    // roleIndex is 0 to length-2
                    const rolePosition = milestonePositions.get(milestoneKey.role(companyIndex, roleIndex));

                    return rolePosition ? (
                      <div
                        key={`role-milestone-${experience.id}-${role.title}`}
                        className="absolute left-1.75 md:left-2.25"
                        style={{
                          top: `${rolePosition.top}px`,
                        }}
                      >
                        <div className="relative flex items-center gap-2 md:gap-3">
                          <Tooltip content={`${role.title} at ${experience.companyName}`} sideOffset={10}>
                            <TimelineMilestone
                              ref={(el) => {
                                milestoneRefs.current.set(milestoneKey.role(companyIndex, roleIndex), el);
                              }}
                              isActive={
                                activeCompanyIndex === companyIndex && (activeRoleIndex[companyIndex] ?? 0) === roleIndex
                              }
                              onClick={() => {
                                setActiveCompanyIndex(companyIndex);
                                setActiveRoleIndex((prev) => ({
                                  ...prev,
                                  [companyIndex]: roleIndex,
                                }));
                                spawnEmberBurst(milestoneKey.role(companyIndex, roleIndex), companyIndex, roleIndex);
                              }}
                              label={`View ${role.title} role at ${experience.companyName}`}
                              variant="role"
                            />
                          </Tooltip>
                          {/* Desktop date - inline */}
                          <span className="hidden font-heading font-medium text-foreground/60 text-sm tabular-nums md:inline">
                            {formatDate(role.startDate)}
                          </span>
                          {/* Mobile date - below milestone */}
                          <span className="-translate-x-1/2 absolute top-full left-1/2 mt-1 whitespace-nowrap font-heading text-foreground/70 text-xs tabular-nums md:hidden">
                            {formatDate(role.startDate)}
                          </span>
                        </div>
                      </div>
                    ) : null;
                  })}
              </div>
            );
          })}

          {/* Animated Phoenix */}
          <AnimatedPhoenix targetPosition={phoenixPosition} isActive={true} />

          {/* Ember Bursts */}
          {emberBursts.map((burst) => (
            <EmberBurst key={burst.id} x={burst.x} y={burst.y} onComplete={() => removeEmberBurst(burst.id)} />
          ))}

          {/* Ashes at the bottom */}
          <Ashes />
        </div>

        {/* Content Column - Single active card sticky */}
        <div className="relative" style={{ minHeight: `${timelineHeight}px` }}>
          {/* Active card */}
          <div
            ref={activeCardRef}
            className="sticky top-[calc(var(--header-height)+5rem)] z-20 mb-12 flex max-h-[calc(100vh-var(--header-height)-5rem-1rem)] flex-col bg-background shadow-lg transition-all duration-300"
          >
            <ExperienceInfo
              key={`${activeCompanyIndex}-${activeRoleIndex[activeCompanyIndex] ?? 0}`}
              experience={experiences[activeCompanyIndex]}
              activeRoleIndex={activeRoleIndex[activeCompanyIndex] ?? 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
