"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import "./timeline.css";
import { AnimatedPhoenix } from "./components/animated-phoenix";
import { EmberBurst } from "./components/ember-burst";
import { ExperienceInfo } from "./components/experience-info";
import { MilestoneTooltip } from "./components/milestone-tooltip";
import { TimelineMilestone } from "./components/timeline-milestone";
import { experienceTimeline } from "./data";
import type { MilestoneKey } from "./types";
import { milestoneKey } from "./types";
import { formatDate } from "./utils";

type MilestonePosition = {
  top: number;
  year: number;
};

export const Timeline = () => {
  const experiences = experienceTimeline;

  const [activeCompanyIndex, setActiveCompanyIndex] = useState(0);
  const [activeRoleIndex, setActiveRoleIndex] = useState<
    Record<number, number>
  >(
    { 0: 0 }, // Start with latest role of latest company
  );
  const [phoenixPosition, setPhoenixPosition] = useState({ x: 0, y: 0 });
  const [milestonePositions, setMilestonePositions] = useState<
    Map<MilestoneKey, MilestonePosition>
  >(new Map());
  const [emberBursts, setEmberBursts] = useState<
    Array<{ id: string; x: number; y: number }>
  >([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const milestoneRefs = useRef<Map<MilestoneKey, HTMLButtonElement | null>>(
    new Map(),
  );
  const prevMilestoneRef = useRef({ companyIndex: 0, roleIndex: 0 });

  // Calculate milestone positions based on card positions
  const calculatePositions = useCallback(() => {
    if (!containerRef.current || !timelineRef.current) return;

    const newPositions = new Map<MilestoneKey, MilestonePosition>();
    const containerRect = containerRef.current.getBoundingClientRect();

    experiences.forEach((experience, companyIndex) => {
      const cardKey = `card-${companyIndex}`;
      const card = cardRefs.current.get(cardKey);

      if (card) {
        const cardRect = card.getBoundingClientRect();
        const topPosition = cardRect.top - containerRect.top;

        // Company milestone position
        newPositions.set(milestoneKey.company(companyIndex), {
          top: topPosition,
          year: experience.startYear,
        });

        // Role sub-milestone positions (temporal)
        if (experience.roles.length > 1) {
          const cardHeight = cardRect.height;

          // Company start = earliest role start date
          const companyStartTime = Math.min(
            ...experience.roles.map((r) => r.startDate.getTime()),
          );
          // Company end = latest role end date (or now for current roles)
          const companyEndTime = Math.max(
            ...experience.roles.map((r) => r.endDate?.getTime() || Date.now()),
          );
          const timeSpan = companyEndTime - companyStartTime;

          experience.roles.forEach((role, roleIndex) => {
            const roleStartTime = role.startDate.getTime();
            // Reverse chronological: newest roles at top, oldest at bottom
            const timeOffset = companyEndTime - roleStartTime;
            const positionRatio = timeSpan > 0 ? timeOffset / timeSpan : 0;
            const roleTopOffset = positionRatio * cardHeight;

            newPositions.set(milestoneKey.role(companyIndex, roleIndex), {
              top: topPosition + roleTopOffset,
              year: role.startDate.getFullYear(),
            });
          });
        }
      }
    });

    setMilestonePositions(newPositions);
  }, [experiences]);

  // Spawn ember burst effect
  const spawnEmberBurst = useCallback((key: MilestoneKey) => {
    const milestone = milestoneRefs.current.get(key);
    const container = containerRef.current;
    if (!milestone || !container) return;

    const milestoneRect = milestone.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const x = milestoneRect.left - containerRect.left + milestoneRect.width / 2;
    const y = milestoneRect.top - containerRect.top + milestoneRect.height / 2;

    const burstId = `burst-${Date.now()}`;
    setEmberBursts((prev) => [...prev, { id: burstId, x, y }]);
  }, []);

  // Remove ember burst after animation completes
  const removeEmberBurst = useCallback((burstId: string) => {
    setEmberBursts((prev) => prev.filter((burst) => burst.id !== burstId));
  }, []);

  // Calculate phoenix position
  const updatePhoenixPosition = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeExperience = experiences[activeCompanyIndex];
    if (!activeExperience) return;

    let activeMilestone: HTMLButtonElement | null = null;
    const activeRoleIdx = activeRoleIndex[activeCompanyIndex] ?? 0;
    const lastRoleIndex = activeExperience.roles.length - 1;

    // Last role (first chronologically) uses company milestone, others use role milestones
    if (activeRoleIdx === lastRoleIndex) {
      const companyMilestoneKey = milestoneKey.company(activeCompanyIndex);
      activeMilestone = milestoneRefs.current.get(companyMilestoneKey) ?? null;
    } else {
      const roleMilestoneKey = milestoneKey.role(
        activeCompanyIndex,
        activeRoleIdx,
      );
      activeMilestone = milestoneRefs.current.get(roleMilestoneKey) ?? null;
    }

    if (activeMilestone) {
      const milestoneRect = activeMilestone.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Center phoenix on milestone
      // Note: transform origin is "center center", so x/y position the phoenix's center
      const milestoneCenterX = milestoneRect.left + milestoneRect.width / 2;
      const milestoneCenterY = milestoneRect.top + milestoneRect.height / 2;

      const x = milestoneCenterX - containerRect.left;
      const y = milestoneCenterY - containerRect.top;

      setPhoenixPosition({ x, y });
    }
  }, [activeCompanyIndex, activeRoleIndex, experiences]);

  // Initial position calculation and recalculation on resize
  useEffect(() => {
    calculatePositions();

    const handleResize = () => {
      calculatePositions();
    };

    window.addEventListener("resize", handleResize);
    // Small delay to ensure cards are rendered
    const timeout = setTimeout(calculatePositions, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, [calculatePositions]);

  // Update phoenix position when active milestone or scroll changes
  useEffect(() => {
    updatePhoenixPosition();

    const handleScroll = () => {
      updatePhoenixPosition();
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [updatePhoenixPosition]);

  // Scroll-based activation: Find nearest milestone to viewport center
  useEffect(() => {
    if (milestonePositions.size === 0) return;

    const handleScrollActivation = () => {
      // If at the very top of the page, keep the default state (latest role of latest company)
      if (window.scrollY === 0) {
        setActiveCompanyIndex(0);
        setActiveRoleIndex((prev) => ({ ...prev, 0: 0 }));
        return;
      }

      const viewportCenter = window.innerHeight / 2;

      // Find the milestone closest to viewport center
      let closestMilestone: {
        companyIndex: number;
        roleIndex: number;
        distance: number;
      } | null = null;

      experiences.forEach((experience, companyIndex) => {
        const lastRoleIndex = experience.roles.length - 1;

        // Check company milestone (always at last role position)
        const companyKey = milestoneKey.company(companyIndex);
        const companyMilestone = milestoneRefs.current.get(companyKey);
        if (companyMilestone) {
          const rect = companyMilestone.getBoundingClientRect();
          const milestoneCenter = rect.top + rect.height / 2;
          const distance = Math.abs(milestoneCenter - viewportCenter);

          if (!closestMilestone || distance < closestMilestone.distance) {
            closestMilestone = {
              companyIndex,
              roleIndex: lastRoleIndex,
              distance,
            };
          }
        }

        // Check role sub-milestones (all roles except last)
        if (experience.roles.length > 1) {
          experience.roles.slice(0, -1).forEach((_, roleIndex) => {
            const roleKey = milestoneKey.role(companyIndex, roleIndex);
            const roleMilestone = milestoneRefs.current.get(roleKey);
            if (roleMilestone) {
              const rect = roleMilestone.getBoundingClientRect();
              const milestoneCenter = rect.top + rect.height / 2;
              const distance = Math.abs(milestoneCenter - viewportCenter);

              if (!closestMilestone || distance < closestMilestone.distance) {
                closestMilestone = {
                  companyIndex,
                  roleIndex,
                  distance,
                };
              }
            }
          });
        }
      });

      // Activate the closest milestone and spawn ember burst if changed
      if (closestMilestone) {
        const { companyIndex, roleIndex } = closestMilestone;

        // Check if milestone changed
        const hasChanged =
          prevMilestoneRef.current.companyIndex !== companyIndex ||
          prevMilestoneRef.current.roleIndex !== roleIndex;

        if (hasChanged) {
          setActiveCompanyIndex(companyIndex);
          setActiveRoleIndex((prev) => ({
            ...prev,
            [companyIndex]: roleIndex,
          }));

          // Spawn ember burst on scroll activation
          const lastRoleIndex = experiences[companyIndex].roles.length - 1;
          const activeMilestoneKey =
            roleIndex === lastRoleIndex
              ? milestoneKey.company(companyIndex)
              : milestoneKey.role(companyIndex, roleIndex);
          spawnEmberBurst(activeMilestoneKey);

          // Update previous milestone
          prevMilestoneRef.current = { companyIndex, roleIndex };
        }
      }
    };

    // Run on scroll only (no initial timeout to prevent jump on load)
    window.addEventListener("scroll", handleScrollActivation, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScrollActivation);
    };
  }, [milestonePositions, experiences, spawnEmberBurst]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Timeline Layout */}
      <div className="grid grid-cols-[60px_1fr] gap-4 md:grid-cols-[10%_20%_70%] md:gap-4">
        {/* Spacer Column (optional) */}
        <div
          className="relative hidden md:block"
          style={{ minHeight: "100vh" }}
        />

        {/* Timeline Column */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute top-0 bottom-0 left-5.5 w-0.5 bg-border md:left-5" />

          {/* Company Milestones */}
          {experiences.map((experience, companyIndex) => {
            const companyPosition = milestonePositions.get(
              milestoneKey.company(companyIndex),
            );

            return (
              <div key={`company-milestone-${experience.id}`}>
                {/* Company Milestone - Show at LAST role (first chronologically) */}
                {(() => {
                  const lastRoleIndex = experience.roles.length - 1;
                  // For multiple roles, use last role's position; for single role, use company position
                  const position =
                    experience.roles.length > 1
                      ? milestonePositions.get(
                          milestoneKey.role(companyIndex, lastRoleIndex),
                        )
                      : companyPosition;

                  return position ? (
                    <div
                      className="absolute"
                      style={{ top: `${position.top}px`, left: 0 }}
                    >
                      <div className="relative">
                        <MilestoneTooltip
                          content={`${experience.companyName} - ${experience.roles[lastRoleIndex]?.title || "First Role"}`}
                        >
                          <TimelineMilestone
                            ref={(el) => {
                              milestoneRefs.current.set(
                                milestoneKey.company(companyIndex),
                                el,
                              );
                            }}
                            isActive={
                              activeCompanyIndex === companyIndex &&
                              (activeRoleIndex[companyIndex] ?? 0) ===
                                lastRoleIndex
                            }
                            onClick={() => {
                              setActiveCompanyIndex(companyIndex);
                              setActiveRoleIndex((prev) => ({
                                ...prev,
                                [companyIndex]: lastRoleIndex,
                              }));
                              spawnEmberBurst(milestoneKey.company(companyIndex));
                            }}
                            label={`View ${experience.companyName} - ${experience.roles[lastRoleIndex]?.title || "First Role"}`}
                            variant="company"
                          />
                        </MilestoneTooltip>
                        <span className="-translate-y-1/2 absolute top-1/2 right-[calc(100%+0.75rem)] hidden whitespace-nowrap font-heading text-foreground/70 text-lg tabular-nums md:inline">
                          {formatDate(
                            experience.roles[lastRoleIndex]?.startDate ||
                              new Date(),
                          )}
                        </span>
                      </div>
                    </div>
                  ) : null;
                })()}

                {/* Role Sub-Milestones (for all roles except the last) */}
                {experience.roles.length > 1 &&
                  experience.roles.slice(0, -1).map((role, roleIndex) => {
                    // roleIndex is 0 to length-2
                    const rolePosition = milestonePositions.get(
                      milestoneKey.role(companyIndex, roleIndex),
                    );

                    return rolePosition ? (
                      <div
                        key={`role-milestone-${experience.id}-${role.title}`}
                        className="absolute flex items-center gap-2 md:gap-3"
                        style={{
                          top: `${rolePosition.top}px`,
                          left: "6px",
                        }}
                      >
                        <MilestoneTooltip
                          content={`${role.title} at ${experience.companyName}`}
                        >
                          <TimelineMilestone
                            ref={(el) => {
                              milestoneRefs.current.set(
                                milestoneKey.role(companyIndex, roleIndex),
                                el,
                              );
                            }}
                            isActive={
                              activeCompanyIndex === companyIndex &&
                              (activeRoleIndex[companyIndex] ?? 0) === roleIndex
                            }
                            onClick={() => {
                              setActiveCompanyIndex(companyIndex);
                              setActiveRoleIndex((prev) => ({
                                ...prev,
                                [companyIndex]: roleIndex,
                              }));
                              spawnEmberBurst(
                                milestoneKey.role(companyIndex, roleIndex),
                              );
                            }}
                            label={`View ${role.title} role at ${experience.companyName}`}
                            variant="role"
                          />
                        </MilestoneTooltip>
                        <span className="hidden font-heading font-medium text-foreground/60 text-sm tabular-nums md:inline">
                          {formatDate(role.startDate)}
                        </span>
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
            <EmberBurst
              key={burst.id}
              x={burst.x}
              y={burst.y}
              onComplete={() => removeEmberBurst(burst.id)}
            />
          ))}
        </div>

        {/* Content Column */}
        <div className="space-y-12">
          {experiences.map((experience, companyIndex) => (
            <div
              key={experience.id}
              ref={(el) => {
                cardRefs.current.set(`card-${companyIndex}`, el);
              }}
              className="relative"
            >
              {/* Experience Content */}
              <div
                className={`transition-all duration-300 ${
                  activeCompanyIndex === companyIndex
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-75"
                }`}
              >
                <ExperienceInfo
                  roles={experience.roles}
                  companyName={experience.companyName}
                  companyUrl={experience.companyUrl}
                  contractCompany={experience.contractCompany}
                  contractCompanyUrl={experience.contractCompanyUrl}
                  technologies={experience.technologies}
                  contract={experience.contract}
                  internship={experience.internship}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
