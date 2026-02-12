import { type RefObject, useCallback, useEffect, useState } from "react";
import type { MilestoneKey, TimelineExperience } from "../types";

type PhoenixAnimationRefs = {
  containerRef: RefObject<HTMLDivElement | null>;
  milestoneRefs: RefObject<Map<MilestoneKey, HTMLButtonElement | null>>;
};

type UsePhoenixAnimationResult = {
  phoenixPosition: { x: number; y: number };
  emberBursts: Array<{ id: string; x: number; y: number }>;
  spawnEmberBurst: (
    key: MilestoneKey,
    companyIndex: number,
    roleIndex: number,
  ) => void;
  removeEmberBurst: (burstId: string) => void;
  updatePhoenixPosition: () => void;
};

/**
 * Calculates the X offset for phoenix/ember positioning based on milestone index and type.
 * Company milestones go to the right (positive offset), role sub-milestones go left (negative).
 */
const calculateOffset = (
  milestoneIndex: number,
  isCompanyMilestone: boolean,
  isMobile: boolean,
): number => {
  const baseAmplitude = isMobile ? 20 : 40;
  const variation = isMobile ? 5 : 10;

  // Ensure minimum magnitude to keep phoenix away from center line
  const sineValue = Math.sin(milestoneIndex * 0.8);
  const minMagnitude = 0.4; // Ensure at least 40% of amplitude away from center
  const adjustedSine =
    sineValue >= 0
      ? Math.max(sineValue, minMagnitude)
      : Math.min(sineValue, -minMagnitude);

  let offset =
    baseAmplitude * adjustedSine + variation * Math.cos(milestoneIndex * 1.3);

  // Force direction based on milestone type to avoid text overlap
  // Company milestones have text on left, so phoenix goes right (positive offset)
  // Role sub-milestones have text on right, so phoenix goes left (negative offset)
  if (isCompanyMilestone) {
    // Ensure positive offset and add extra padding for company milestones
    offset = Math.abs(offset) + (isMobile ? 6 : 12);
  } else {
    // Ensure negative offset for role sub-milestones
    offset = -Math.abs(offset);
  }

  return offset;
};

export const usePhoenixAnimation = (
  activeCompanyIndex: number,
  activeRoleIndex: Record<number, number>,
  experiences: TimelineExperience[],
  refs: PhoenixAnimationRefs,
): UsePhoenixAnimationResult => {
  const [phoenixPosition, setPhoenixPosition] = useState({ x: 0, y: 0 });
  const [emberBursts, setEmberBursts] = useState<
    Array<{ id: string; x: number; y: number }>
  >([]);

  const { containerRef, milestoneRefs } = refs;

  // Spawn ember burst effect
  const spawnEmberBurst = useCallback(
    (key: MilestoneKey, companyIndex: number, roleIndex: number) => {
      const milestone = milestoneRefs.current.get(key);
      const container = containerRef.current;
      if (!milestone || !container) return;

      const milestoneRect = milestone.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Get Y position from milestone
      const y =
        milestoneRect.top - containerRect.top + milestoneRect.height / 2;

      // Calculate X position same as phoenix (relative to timeline line with weaving)
      const isMobile = window.innerWidth < 768;
      const timelineLineX = isMobile ? 22 : 20;

      // Use same weaving logic as phoenix
      const milestoneIndex = companyIndex * 10 + roleIndex;

      // Determine if this is a company milestone or role sub-milestone
      const experience = experiences[companyIndex];
      const lastRoleIndex = experience.roles.length - 1;
      const isCompanyMilestone = roleIndex === lastRoleIndex;

      const offset = calculateOffset(
        milestoneIndex,
        isCompanyMilestone,
        isMobile,
      );
      const x = timelineLineX + offset;

      const burstId = crypto.randomUUID();
      setEmberBursts((prev) => [...prev, { id: burstId, x, y }]);
    },
    [experiences, containerRef, milestoneRefs],
  );

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
      const companyMilestoneKey = `company-${activeCompanyIndex}` as const;
      activeMilestone = milestoneRefs.current.get(companyMilestoneKey) ?? null;
    } else {
      const roleMilestoneKey =
        `role-${activeCompanyIndex}-${activeRoleIdx}` as const;
      activeMilestone = milestoneRefs.current.get(roleMilestoneKey) ?? null;
    }

    if (activeMilestone) {
      const milestoneRect = activeMilestone.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Get Y position from milestone
      const milestoneCenterY = milestoneRect.top + milestoneRect.height / 2;
      const y = milestoneCenterY - containerRect.top;

      // Position phoenix relative to timeline line, not milestone button
      // Timeline line is at left-5.5 (22px) on mobile, left-5 (20px) on desktop
      const isMobile = window.innerWidth < 768;
      const timelineLineX = isMobile ? 22 : 20;

      // Calculate weaving offset
      const milestoneIndex = activeCompanyIndex * 10 + activeRoleIdx;
      const isCompanyMilestone = activeRoleIdx === lastRoleIndex;

      const offset = calculateOffset(
        milestoneIndex,
        isCompanyMilestone,
        isMobile,
      );
      const x = timelineLineX + offset;

      setPhoenixPosition({ x, y });
    }
  }, [
    activeCompanyIndex,
    activeRoleIndex,
    experiences,
    containerRef,
    milestoneRefs,
  ]);

  // Update phoenix position when active milestone changes
  useEffect(() => {
    updatePhoenixPosition();

    const handleScroll = () => updatePhoenixPosition();

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [updatePhoenixPosition]);

  return {
    phoenixPosition,
    emberBursts,
    spawnEmberBurst,
    removeEmberBurst,
    updatePhoenixPosition,
  };
};
