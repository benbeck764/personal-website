import { type RefObject, useCallback, useRef, useState } from "react";
import type { MilestoneKey, TimelineExperience } from "../types";
import { milestoneKey } from "../types";

export type MilestonePosition = {
  top: number;
  year: number;
};

type UseMilestonePositionsReturn = {
  milestonePositions: Map<MilestoneKey, MilestonePosition>;
  containerRef: RefObject<HTMLDivElement | null>;
  timelineRef: RefObject<HTMLDivElement | null>;
  cardRefs: RefObject<Map<string, HTMLDivElement | null>>;
  milestoneRefs: RefObject<Map<MilestoneKey, HTMLButtonElement | null>>;
  calculatePositions: () => void;
};

export const useMilestonePositions = (
  experiences: TimelineExperience[],
): UseMilestonePositionsReturn => {
  const [milestonePositions, setMilestonePositions] = useState<
    Map<MilestoneKey, MilestonePosition>
  >(new Map());

  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const milestoneRefs = useRef<Map<MilestoneKey, HTMLButtonElement | null>>(
    new Map(),
  );

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

  return {
    milestonePositions,
    containerRef,
    timelineRef,
    cardRefs,
    milestoneRefs,
    calculatePositions,
  };
};
