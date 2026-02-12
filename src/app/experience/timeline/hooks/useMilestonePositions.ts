import { type RefObject, useCallback, useRef, useState } from "react";
import type { MilestoneKey, TimelineExperience } from "../types";
import { milestoneKey } from "../types";

export type MilestonePosition = {
  top: number;
  year: number;
};

type UseMilestonePositionsResult = {
  milestonePositions: Map<MilestoneKey, MilestonePosition>;
  timelineHeight: number;
  containerRef: RefObject<HTMLDivElement | null>;
  timelineRef: RefObject<HTMLDivElement | null>;
  milestoneRefs: RefObject<Map<MilestoneKey, HTMLButtonElement | null>>;
  calculatePositions: () => void;
};

/**
 * Calculates chronologically accurate milestone positions based on actual dates,
 * independent of card heights or layout.
 */
export const useMilestonePositions = (
  experiences: TimelineExperience[],
): UseMilestonePositionsResult => {
  const [milestonePositions, setMilestonePositions] = useState<
    Map<MilestoneKey, MilestonePosition>
  >(new Map());
  const [timelineHeight, setTimelineHeight] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<Map<MilestoneKey, HTMLButtonElement | null>>(
    new Map(),
  );

  // Calculate milestone positions based on chronological time
  const calculatePositions = useCallback(() => {
    if (!containerRef.current) return;

    // Collect all dates to find the overall time span
    const allDates = experiences.flatMap((experience) =>
      experience.roles.flatMap((role) =>
        role.endDate ? [role.startDate, role.endDate] : [role.startDate],
      ),
    );

    if (!allDates.length) return;

    // Find latest date to use as baseline (reverse chronology: newest at top)
    const timestamps = allDates.map((d) => d.getTime());
    const maxTime = Math.max(...timestamps, Date.now()); // Include present for ongoing roles

    // Define vertical scale: pixels per millisecond
    // Aim for ~200px per year for reasonable spacing
    const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
    const pixelsPerYear = 200;
    const pixelsPerMs = pixelsPerYear / msPerYear;

    const newPositions = new Map<MilestoneKey, MilestonePosition>();

    experiences.forEach((experience, companyIndex) => {
      // Find the earliest role start date for this company
      const companyStartTime = Math.min(
        ...experience.roles.map((r) => r.startDate.getTime()),
      );

      // Company milestone - reverse chronology (newest at top)
      const companyTimeFromLatest = maxTime - companyStartTime;
      const companyTopPosition = companyTimeFromLatest * pixelsPerMs;

      newPositions.set(milestoneKey.company(companyIndex), {
        top: companyTopPosition,
        year: new Date(companyStartTime).getFullYear(),
      });

      // Role sub-milestones for each role - reverse chronology
      experience.roles.forEach((role, roleIndex) => {
        const roleStartTime = role.startDate.getTime();
        const roleTimeFromLatest = maxTime - roleStartTime;
        const roleTopPosition = roleTimeFromLatest * pixelsPerMs;

        newPositions.set(milestoneKey.role(companyIndex, roleIndex), {
          top: roleTopPosition,
          year: role.startDate.getFullYear(),
        });
      });
    });

    setMilestonePositions(newPositions);

    // Calculate total timeline height (max milestone position + padding for ashes)
    const maxPosition = Math.max(
      ...Array.from(newPositions.values()).map((pos) => pos.top),
      0,
    );
    setTimelineHeight(maxPosition + 200); // Add 200px padding for ashes at bottom
  }, [experiences]);

  return {
    milestonePositions,
    timelineHeight,
    containerRef,
    timelineRef,
    milestoneRefs,
    calculatePositions,
  };
};
